
-- Allow authenticated admins to insert profiles (for admin-added profiles without user_id)
CREATE POLICY "Authenticated users can insert profiles"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (true);
