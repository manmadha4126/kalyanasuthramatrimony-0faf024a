
-- Allow authenticated admins to view all interests
CREATE POLICY "Authenticated users can view all interests"
ON public.profile_interests
FOR SELECT
TO authenticated
USING (true);
