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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    // Verify the caller is staff/admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return jsonResponse({ error: "Unauthorized: missing token" });
    }

    const callerClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: callerData, error: callerErr } = await callerClient.auth.getUser();
    if (callerErr || !callerData?.user) {
      console.error("getUser failed:", callerErr);
      return jsonResponse({ error: "Session expired. Please log out and log back in." });
    }
    const caller = callerData.user;

    const { data: isStaff, error: roleErr } = await supabaseAdmin.rpc("is_staff_or_admin", { check_user_id: caller.id });
    if (roleErr) {
      console.error("is_staff_or_admin error:", roleErr);
      return jsonResponse({ error: "Permission check failed. Please try again." });
    }
    if (!isStaff) {
      return jsonResponse({ error: "Forbidden: not staff/admin" });
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return jsonResponse({ error: "Invalid request body" });
    }

    const { email, password } = body;
    if (!email || !password) {
      return jsonResponse({ error: "Email and password are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    console.log("create-customer-user: caller=", caller.email, " target=", normalizedEmail);

    // Try to create the user
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: normalizedEmail,
      password,
      email_confirm: true,
    });

    if (!error && data?.user) {
      console.log("Created new user:", data.user.id);
      return jsonResponse({ user_id: data.user.id });
    }

    const errMsg = (error?.message || "").toLowerCase();
    const isDuplicate =
      errMsg.includes("already") ||
      errMsg.includes("exists") ||
      errMsg.includes("registered") ||
      errMsg.includes("duplicate") ||
      (error as any)?.status === 422;

    if (isDuplicate) {
      console.log("User exists, looking up via SQL:", normalizedEmail);

      // Look up directly in auth.users via service-role SQL — avoids listUsers pagination
      const { data: existingRows, error: lookupErr } = await supabaseAdmin
        .schema("auth" as any)
        .from("users" as any)
        .select("id")
        .ilike("email", normalizedEmail)
        .limit(1);

      const existingId = existingRows?.[0]?.id;

      if (!existingId) {
        console.error("Lookup failed for existing user:", lookupErr);
        return jsonResponse({
          error: "An account with this email already exists but could not be located. Please use a different email.",
        });
      }

      const { error: updateErr } = await supabaseAdmin.auth.admin.updateUserById(existingId, {
        password,
        email_confirm: true,
      });
      if (updateErr) {
        console.error("updateUserById error:", updateErr);
        return jsonResponse({ error: "Could not update existing account password. Please try again." });
      }
      console.log("Updated existing user:", existingId);
      return jsonResponse({ user_id: existingId, existing: true });
    }

    console.error("createUser error:", error);
    return jsonResponse({ error: error?.message || "Failed to create user account" });
  } catch (err) {
    console.error("create-customer-user error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return jsonResponse({ error: `Internal error: ${message}` });
  }
});
