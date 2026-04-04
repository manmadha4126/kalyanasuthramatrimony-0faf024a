CREATE POLICY "Staff can insert profiles"
ON public.profiles
FOR INSERT TO authenticated
WITH CHECK (is_staff_or_admin(auth.uid()));