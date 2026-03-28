CREATE POLICY "Authenticated users can update all interests"
ON public.profile_interests
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);