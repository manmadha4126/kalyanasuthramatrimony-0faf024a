import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { setupActivityTracking, isSessionExpired } from "@/lib/security";

/**
 * Hook that monitors session activity and auto-logs out inactive users.
 * Use in authenticated pages (dashboards).
 */
export const useSessionSecurity = (redirectTo: string = "/login") => {
  const navigate = useNavigate();

  const checkSession = useCallback(async () => {
    if (isSessionExpired()) {
      await supabase.auth.signOut();
      sessionStorage.clear();
      navigate(redirectTo);
    }
  }, [navigate, redirectTo]);

  useEffect(() => {
    const cleanup = setupActivityTracking();
    const interval = setInterval(checkSession, 60000); // Check every minute

    return () => {
      cleanup();
      clearInterval(interval);
    };
  }, [checkSession]);
};
