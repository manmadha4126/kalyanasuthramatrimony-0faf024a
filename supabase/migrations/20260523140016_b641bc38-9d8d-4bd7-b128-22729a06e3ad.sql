
-- Replace restrictive profile-photos INSERT policy with one supporting profileId folders
DROP POLICY IF EXISTS "Users can upload to their own profile photo folder" ON storage.objects;

CREATE POLICY "Users and staff can upload profile photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-photos'
  AND (
    public.is_staff_or_admin(auth.uid())
    OR (auth.uid())::text = (storage.foldername(name))[1]
    OR EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = auth.uid()
        AND p.id::text = (storage.foldername(name))[1]
    )
  )
);

DROP POLICY IF EXISTS "Users and staff can update profile photos" ON storage.objects;
CREATE POLICY "Users and staff can update profile photos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-photos'
  AND (
    public.is_staff_or_admin(auth.uid())
    OR (auth.uid())::text = (storage.foldername(name))[1]
    OR EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = auth.uid()
        AND p.id::text = (storage.foldername(name))[1]
    )
  )
);

DROP POLICY IF EXISTS "Users and staff can delete profile photos" ON storage.objects;
CREATE POLICY "Users and staff can delete profile photos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-photos'
  AND (
    public.is_staff_or_admin(auth.uid())
    OR (auth.uid())::text = (storage.foldername(name))[1]
    OR EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.user_id = auth.uid()
        AND p.id::text = (storage.foldername(name))[1]
    )
  )
);
