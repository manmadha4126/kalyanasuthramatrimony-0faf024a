import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const callerClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user: caller } } = await callerClient.auth.getUser();
    if (!caller) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { data: isStaff } = await supabaseAdmin.rpc("is_staff_or_admin", { check_user_id: caller.id });
    if (!isStaff) {
      return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid request body" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { email, password } = body;
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and password are required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Try to create the user
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: normalizedEmail,
      password,
      email_confirm: true,
    });

    if (!error && data?.user) {
      return new Response(JSON.stringify({ user_id: data.user.id }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // If user already exists, find them and update password
    if (error && (error.message.includes("already") || error.message.includes("exists") || error.message.includes("registered") || error.message.includes("duplicate"))) {
      try {
        // Use listUsers with filter to find the specific user
        const { data: listData, error: listError } = await supabaseAdmin.auth.admin.listUsers({
          page: 1,
          perPage: 1000,
        });

        if (listError) {
          console.error("listUsers error:", listError);
          return new Response(JSON.stringify({ error: "User already exists. Could not retrieve their account." }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        const existingUser = listData?.users?.find((u: any) => u.email?.toLowerCase() === normalizedEmail);
        
        if (existingUser) {
          // Update password silently
          try {
            await supabaseAdmin.auth.admin.updateUserById(existingUser.id, {
              password,
              email_confirm: true,
            });
          } catch (updateErr) {
            console.error("Password update error (non-critical):", updateErr);
          }
          return new Response(JSON.stringify({ user_id: existingUser.id, existing: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        // If we still can't find them, return error
        return new Response(JSON.stringify({ error: "User account exists but could not be located. Please try a different email." }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      } catch (findErr) {
        console.error("Find existing user error:", findErr);
        return new Response(JSON.stringify({ error: "User may already exist. Please try a different email." }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    // Other creation errors
    console.error("createUser error:", error);
    return new Response(JSON.stringify({ error: error?.message || "Failed to create user account" }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    console.error("create-customer-user error:", err);
    return new Response(JSON.stringify({ error: "Internal server error. Please try again." }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
