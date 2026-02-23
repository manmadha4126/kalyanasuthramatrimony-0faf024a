
-- Add permissive policy for authenticated users to view ALL profiles (for admin dashboard)
CREATE POLICY "Authenticated users can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

-- Add permissive policy for authenticated users to update ALL profiles (for admin edits)
CREATE POLICY "Authenticated users can update all profiles"
ON public.profiles
FOR UPDATE
TO authenticated
USING (true);
