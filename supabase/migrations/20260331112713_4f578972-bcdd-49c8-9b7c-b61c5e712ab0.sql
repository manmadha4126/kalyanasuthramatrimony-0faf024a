
-- 1. Fix profiles: Remove overly permissive "Authenticated users can update all profiles" policy
DROP POLICY IF EXISTS "Authenticated users can update all profiles" ON public.profiles;

-- 2. Fix success_stories: Restrict DELETE and UPDATE to authenticated story owners
DROP POLICY IF EXISTS "Allow delete for authenticated" ON public.success_stories;
DROP POLICY IF EXISTS "Allow update for authenticated" ON public.success_stories;

CREATE POLICY "Authenticated users can delete their own stories"
  ON public.success_stories FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

CREATE POLICY "Authenticated users can update their own stories"
  ON public.success_stories FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- 3. Create a public view that hides sensitive contact fields
CREATE OR REPLACE VIEW public.profiles_public
WITH (security_invoker = on) AS
  SELECT id, full_name, gender, date_of_birth, height_cm, weight_kg,
         complexion, blood_group, marital_status, mother_tongue, religion,
         caste, sub_caste, gothra, star, raasi, dosham,
         education, education_detail, occupation, company_name, annual_income,
         working_city, father_name, father_occupation, mother_name, mother_occupation,
         siblings, family_type, family_status, country, state, district, city,
         native_place, profile_photo_url, additional_photos, horoscope_url,
         profile_status, profile_id, about_me, partner_expectations,
         is_featured, subscription_type, created_at, updated_at,
         citizenship, visa_type, residence_type, profile_created_by
  FROM public.profiles;

-- 4. Replace the public SELECT policy - keep it but now unauthenticated users should use the view
DROP POLICY IF EXISTS "Active profiles are publicly viewable" ON public.profiles;

CREATE POLICY "Active profiles publicly viewable for anon"
  ON public.profiles FOR SELECT
  TO anon
  USING (profile_status = 'active');
