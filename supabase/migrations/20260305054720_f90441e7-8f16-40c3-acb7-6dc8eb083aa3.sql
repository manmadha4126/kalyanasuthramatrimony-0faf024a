
-- Add new columns to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS citizenship text DEFAULT NULL;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS visa_type text DEFAULT NULL;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS residence_type text DEFAULT NULL;

-- Update the RPC function to accept new parameters
CREATE OR REPLACE FUNCTION public.create_profile_on_register(
  p_user_id uuid,
  p_full_name text,
  p_gender text,
  p_email text,
  p_phone text,
  p_profile_created_by text DEFAULT 'Self',
  p_date_of_birth text DEFAULT NULL,
  p_mother_tongue text DEFAULT NULL,
  p_height_cm integer DEFAULT NULL,
  p_marital_status text DEFAULT 'Never Married',
  p_religion text DEFAULT 'Hindu',
  p_caste text DEFAULT NULL,
  p_sub_caste text DEFAULT NULL,
  p_country text DEFAULT 'India',
  p_state text DEFAULT NULL,
  p_city text DEFAULT NULL,
  p_native_place text DEFAULT NULL,
  p_education text DEFAULT NULL,
  p_education_detail text DEFAULT NULL,
  p_occupation text DEFAULT NULL,
  p_company_name text DEFAULT NULL,
  p_annual_income text DEFAULT NULL,
  p_family_status text DEFAULT NULL,
  p_family_type text DEFAULT NULL,
  p_father_name text DEFAULT NULL,
  p_father_occupation text DEFAULT NULL,
  p_mother_name text DEFAULT NULL,
  p_mother_occupation text DEFAULT NULL,
  p_siblings text DEFAULT NULL,
  p_gothra text DEFAULT NULL,
  p_raasi text DEFAULT NULL,
  p_star text DEFAULT NULL,
  p_dosham text DEFAULT NULL,
  p_whatsapp text DEFAULT NULL,
  p_profile_photo_url text DEFAULT NULL,
  p_citizenship text DEFAULT NULL,
  p_visa_type text DEFAULT NULL,
  p_residence_type text DEFAULT NULL
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_id uuid;
BEGIN
  INSERT INTO public.profiles (
    user_id, full_name, gender, email, phone, profile_created_by,
    date_of_birth, mother_tongue, height_cm, marital_status, religion,
    caste, sub_caste, country, state, city, native_place,
    education, education_detail, occupation, company_name, annual_income,
    family_status, family_type, father_name, father_occupation,
    mother_name, mother_occupation, siblings,
    gothra, raasi, star, dosham, whatsapp, profile_photo_url,
    citizenship, visa_type, residence_type
  ) VALUES (
    p_user_id, p_full_name, p_gender, p_email, p_phone, p_profile_created_by,
    p_date_of_birth::date, p_mother_tongue, p_height_cm, p_marital_status, p_religion,
    p_caste, p_sub_caste, p_country, p_state, p_city, p_native_place,
    p_education, p_education_detail, p_occupation, p_company_name, p_annual_income,
    p_family_status, p_family_type, p_father_name, p_father_occupation,
    p_mother_name, p_mother_occupation, p_siblings,
    p_gothra, p_raasi, p_star, p_dosham, p_whatsapp, p_profile_photo_url,
    p_citizenship, p_visa_type, p_residence_type
  )
  RETURNING id INTO new_id;

  RETURN new_id::text;
END;
$$;
