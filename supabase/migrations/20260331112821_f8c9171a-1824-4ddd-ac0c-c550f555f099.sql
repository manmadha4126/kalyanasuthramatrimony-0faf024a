
-- Fix consultations: anyone can submit is fine (public form), but remove stale update policy
DROP POLICY IF EXISTS "Allow update for authenticated" ON public.consultations;

-- Fix profile_interests: restrict broad update to own interests or staff
DROP POLICY IF EXISTS "Authenticated users can update all interests" ON public.profile_interests;

CREATE POLICY "Staff can update all interests"
  ON public.profile_interests FOR UPDATE
  TO authenticated
  USING (public.is_staff_or_admin(auth.uid()))
  WITH CHECK (public.is_staff_or_admin(auth.uid()));
