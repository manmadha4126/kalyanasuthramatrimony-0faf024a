
CREATE POLICY "Users can view interests sent to their profile"
ON public.profile_interests FOR SELECT
TO authenticated
USING (
  to_profile_id IN (
    SELECT id FROM public.profiles WHERE user_id = auth.uid()
  )
);
