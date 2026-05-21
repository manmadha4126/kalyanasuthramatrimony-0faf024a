
-- 1) Drop overly-permissive anon SELECT on profiles
DROP POLICY IF EXISTS "Active profiles publicly viewable for anon" ON public.profiles;

-- 2) Tighten profile-photos INSERT (ownership by folder = auth.uid())
DROP POLICY IF EXISTS "Authenticated users can upload profile photos" ON storage.objects;
CREATE POLICY "Users can upload to their own profile photo folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-photos'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

-- 3) Lock down success-story-photos to staff/admin for write ops
DROP POLICY IF EXISTS "Authenticated users can upload success story photos" ON storage.objects;
CREATE POLICY "Staff can upload success story photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'success-story-photos'
  AND public.is_staff_or_admin(auth.uid())
);

CREATE POLICY "Staff can update success story photos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'success-story-photos'
  AND public.is_staff_or_admin(auth.uid())
);

CREATE POLICY "Staff can delete success story photos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'success-story-photos'
  AND public.is_staff_or_admin(auth.uid())
);
