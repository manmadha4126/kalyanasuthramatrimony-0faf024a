import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function jsonResponse(body: object, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function extractStoragePath(url: string, bucket: string): string | null {
  if (!url) return null;
  const marker = `/storage/v1/object/public/${bucket}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return decodeURIComponent(url.substring(idx + marker.length));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    // Verify the caller is staff/admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return jsonResponse({ error: "Unauthorized: missing token" }, 401);
    }

    const callerClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: callerData, error: callerErr } = await callerClient.auth.getUser();
    if (callerErr || !callerData?.user) {
      return jsonResponse({ error: "Session expired. Please log out and log back in." }, 401);
    }
    const caller = callerData.user;

    const { data: isStaff, error: roleErr } = await supabaseAdmin.rpc("is_staff_or_admin", { check_user_id: caller.id });
    if (roleErr || !isStaff) {
      return jsonResponse({ error: "Forbidden: not staff/admin" }, 403);
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON body" }, 400);
    }
    const profileId: string | undefined = body?.profile_id;
    if (!profileId) {
      return jsonResponse({ error: "profile_id is required" }, 400);
    }

    // Fetch the profile to get user_id and photo paths
    const { data: profile, error: fetchErr } = await supabaseAdmin
      .from("profiles")
      .select("id, user_id, profile_photo_url, additional_photos, horoscope_url")
      .eq("id", profileId)
      .maybeSingle();

    if (fetchErr) {
      return jsonResponse({ error: `Failed to fetch profile: ${fetchErr.message}` }, 500);
    }
    if (!profile) {
      return jsonResponse({ error: "Profile not found" }, 404);
    }

    // 1. Delete dependent rows first (avoid FK errors)
    await supabaseAdmin.from("profile_interests").delete().eq("to_profile_id", profileId);
    await supabaseAdmin.from("profile_views").delete().eq("viewed_profile_id", profileId);
    await supabaseAdmin.from("detail_views").delete().eq("viewed_profile_id", profileId);

    if (profile.user_id) {
      await supabaseAdmin.from("profile_interests").delete().eq("from_user_id", profile.user_id);
      await supabaseAdmin.from("profile_views").delete().eq("viewer_user_id", profile.user_id);
      await supabaseAdmin.from("detail_views").delete().eq("viewer_user_id", profile.user_id);
      await supabaseAdmin.from("notifications").delete().eq("user_id", profile.user_id);
    }

    // 2. Delete storage objects
    const photoPaths: string[] = [];
    const horoscopePaths: string[] = [];
    const p1 = extractStoragePath(profile.profile_photo_url || "", "profile-photos");
    if (p1) photoPaths.push(p1);
    if (Array.isArray(profile.additional_photos)) {
      for (const url of profile.additional_photos) {
        const p = extractStoragePath(url || "", "profile-photos");
        if (p) photoPaths.push(p);
      }
    }
    const hp = extractStoragePath(profile.horoscope_url || "", "profile-photos");
    if (hp) photoPaths.push(hp);

    if (photoPaths.length > 0) {
      await supabaseAdmin.storage.from("profile-photos").remove(photoPaths);
    }

    // 3. Delete the profile row
    const { error: delProfileErr } = await supabaseAdmin.from("profiles").delete().eq("id", profileId);
    if (delProfileErr) {
      return jsonResponse({ error: `Failed to delete profile: ${delProfileErr.message}` }, 500);
    }

    // 4. Delete the auth user (if any)
    if (profile.user_id) {
      const { error: authDelErr } = await supabaseAdmin.auth.admin.deleteUser(profile.user_id);
      if (authDelErr) {
        console.error("Auth user delete failed:", authDelErr);
        // Profile is gone; report partial success
        return jsonResponse({ success: true, warning: `Profile deleted but auth user removal failed: ${authDelErr.message}` });
      }
    }

    return jsonResponse({ success: true });
  } catch (e: any) {
    console.error("delete-customer-user error:", e);
    return jsonResponse({ error: e?.message || "Internal error" }, 500);
  }
});