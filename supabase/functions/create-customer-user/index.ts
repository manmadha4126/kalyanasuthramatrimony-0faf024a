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
    const errCode = ((error as { code?: string } | null)?.code || "").toLowerCase();
    const isDuplicate =
      errCode === "user_already_exists" ||
      errCode === "email_exists" ||
      errMsg.includes("already") ||
      errMsg.includes("exists") ||
      errMsg.includes("registered") ||
      errMsg.includes("duplicate");

    if (isDuplicate) {
      console.log("User exists, looking up:", normalizedEmail);

      let existingId: string | undefined;

      // 1) Secure RPC lookup (fast, no pagination)
      const { data: rpcId, error: rpcErr } = await supabaseAdmin.rpc("get_auth_user_id_by_email", {
        p_email: normalizedEmail,
      });
      if (rpcErr) console.error("rpc lookup error:", rpcErr);
      if (rpcId) existingId = rpcId as string;

      // 2) Fallback: paginate listUsers
      if (!existingId) {
        for (let page = 1; page <= 50; page++) {
          const { data: list, error: listErr } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 1000 });
          if (listErr) {
            console.error("listUsers error:", listErr);
            break;
          }
          const found = list?.users?.find((u: any) => (u.email || "").toLowerCase() === normalizedEmail);
          if (found) {
            existingId = found.id;
            break;
          }
          if (!list?.users?.length || list.users.length < 1000) break;
        }
      }

      if (!existingId) {
        return jsonResponse({
          error: "This email is already registered with another account. Please use a different email address.",
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
    if (errCode === "weak_password" || errMsg.includes("weak") || errMsg.includes("easy to guess")) {
      return jsonResponse({
        error: "This password is too easy to guess. Use at least 10 characters with uppercase, lowercase, a number, and a symbol.",
      });
    }
    return jsonResponse({ error: error?.message || "Failed to create user account" });
  } catch (err) {
    console.error("create-customer-user error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return jsonResponse({ error: `Internal error: ${message}` });
  }
});
