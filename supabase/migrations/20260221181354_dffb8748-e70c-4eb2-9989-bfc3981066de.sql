
-- Create a SECURITY DEFINER function to insert profile during registration
-- This bypasses RLS since the user may not have a confirmed session yet
CREATE OR REPLACE FUNCTION public.create_profile_on_register(
  p_user_id UUID,
  p_full_name TEXT,
  p_gender TEXT,
  p_email TEXT,
  p_phone TEXT,
  p_profile_created_by TEXT DEFAULT 'Self',
  p_date_of_birth DATE DEFAULT NULL,
  p_mother_tongue TEXT DEFAULT NULL,
  p_height_cm SMALLINT DEFAULT NULL,
  p_marital_status TEXT DEFAULT 'Never Married',
  p_religion TEXT DEFAULT 'Hindu',
  p_caste TEXT DEFAULT NULL,
  p_sub_caste TEXT DEFAULT NULL,
  p_country TEXT DEFAULT 'India',
  p_state TEXT DEFAULT NULL,
  p_city TEXT DEFAULT NULL,
  p_native_place TEXT DEFAULT NULL,
  p_education TEXT DEFAULT NULL,
  p_occupation TEXT DEFAULT NULL,
  p_company_name TEXT DEFAULT NULL,
  p_annual_income TEXT DEFAULT NULL,
  p_family_status TEXT DEFAULT NULL,
  p_family_type TEXT DEFAULT NULL,
  p_father_name TEXT DEFAULT NULL,
  p_father_occupation TEXT DEFAULT NULL,
  p_mother_name TEXT DEFAULT NULL,
  p_mother_occupation TEXT DEFAULT NULL,
  p_siblings TEXT DEFAULT NULL,
  p_gothra TEXT DEFAULT NULL,
  p_raasi TEXT DEFAULT NULL,
  p_star TEXT DEFAULT NULL,
  p_dosham TEXT DEFAULT NULL,
  p_whatsapp TEXT DEFAULT NULL,
  p_profile_photo_url TEXT DEFAULT NULL,
  p_education_detail TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  new_id UUID;
BEGIN
  -- Verify the user_id exists in auth.users
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = p_user_id) THEN
    RAISE EXCEPTION 'Invalid user ID';
  END IF;

  INSERT INTO public.profiles (
    user_id, full_name, gender, email, phone, profile_created_by,
    date_of_birth, mother_tongue, height_cm, marital_status, religion,
    caste, sub_caste, country, state, city, native_place,
    education, occupation, company_name, annual_income,
    family_status, family_type, father_name, father_occupation,
    mother_name, mother_occupation, siblings,
    gothra, raasi, star, dosham, whatsapp, profile_photo_url,
    education_detail, profile_status
  ) VALUES (
    p_user_id, p_full_name, p_gender, p_email, p_phone, p_profile_created_by,
    p_date_of_birth, p_mother_tongue, p_height_cm, p_marital_status, p_religion,
    p_caste, p_sub_caste, p_country, p_state, p_city, p_native_place,
    p_education, p_occupation, p_company_name, p_annual_income,
    p_family_status, p_family_type, p_father_name, p_father_occupation,
    p_mother_name, p_mother_occupation, p_siblings,
    p_gothra, p_raasi, p_star, p_dosham, p_whatsapp, p_profile_photo_url,
    p_education_detail, 'pending'
  )
  RETURNING id INTO new_id;

  RETURN new_id;
END;
$$;

-- Also add a SELECT policy for pending profiles so the owner can see their own
CREATE POLICY "Users can view their own profile regardless of status"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);
