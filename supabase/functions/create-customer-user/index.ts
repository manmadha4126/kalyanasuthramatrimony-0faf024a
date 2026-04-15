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
      return jsonResponse({ error: "Unauthorized" }, 401);
    }

    const callerClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user: caller } } = await callerClient.auth.getUser();
    if (!caller) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }

    const { data: isStaff } = await supabaseAdmin.rpc("is_staff_or_admin", { check_user_id: caller.id });
    if (!isStaff) {
      return jsonResponse({ error: "Forbidden" }, 403);
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return jsonResponse({ error: "Invalid request body" }, 400);
    }

    const { email, password } = body;
    if (!email || !password) {
      return jsonResponse({ error: "Email and password are required" }, 400);
    }

    const normalizedEmail = email.toLowerCase().trim();

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

    // If user already exists, find them and update password
    if (error && (error.message.includes("already") || error.message.includes("exists") || error.message.includes("registered") || error.message.includes("duplicate"))) {
      console.log("User exists, looking up:", normalizedEmail);
      
      // Use listUsers to find the user
      const { data: listData, error: listError } = await supabaseAdmin.auth.admin.listUsers({
        page: 1,
        perPage: 1000,
      });

      if (listError) {
        console.error("listUsers error:", listError);
        return jsonResponse({ error: "User already exists but could not retrieve account." });
      }

      const existingUser = listData?.users?.find((u: any) => u.email?.toLowerCase() === normalizedEmail);
      
      if (existingUser) {
        // Update password
        await supabaseAdmin.auth.admin.updateUserById(existingUser.id, {
          password,
          email_confirm: true,
        });
        console.log("Updated existing user:", existingUser.id);
        return jsonResponse({ user_id: existingUser.id, existing: true });
      }

      return jsonResponse({ error: "User account exists but could not be located. Please try a different email." });
    }

    // Other creation errors
    console.error("createUser error:", error);
    return jsonResponse({ error: error?.message || "Failed to create user account" });
  } catch (err) {
    console.error("create-customer-user error:", err);
    return jsonResponse({ error: "Internal server error. Please try again." });
  }
});
