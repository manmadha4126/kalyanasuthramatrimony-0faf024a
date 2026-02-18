
-- =============================================
-- SCALABLE MATRIMONIAL PROFILES DATABASE
-- =============================================

CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  full_name TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('Male', 'Female')),
  date_of_birth DATE NOT NULL,
  height_cm SMALLINT,
  weight_kg SMALLINT,
  complexion TEXT,
  blood_group TEXT,
  marital_status TEXT NOT NULL DEFAULT 'Never Married',
  mother_tongue TEXT,
  
  religion TEXT NOT NULL DEFAULT 'Hindu',
  caste TEXT,
  sub_caste TEXT,
  gothra TEXT,
  star TEXT,
  raasi TEXT,
  dosham TEXT,
  
  education TEXT,
  education_detail TEXT,
  occupation TEXT,
  company_name TEXT,
  annual_income TEXT,
  working_city TEXT,
  
  father_name TEXT,
  father_occupation TEXT,
  mother_name TEXT,
  mother_occupation TEXT,
  siblings TEXT,
  family_type TEXT,
  family_status TEXT,
  
  country TEXT NOT NULL DEFAULT 'India',
  state TEXT,
  district TEXT,
  city TEXT,
  native_place TEXT,
  
  phone TEXT,
  email TEXT,
  whatsapp TEXT,
  
  about_me TEXT,
  partner_expectations TEXT,
  profile_photo_url TEXT,
  additional_photos TEXT[] DEFAULT '{}',
  horoscope_url TEXT,
  
  profile_status TEXT NOT NULL DEFAULT 'pending' CHECK (profile_status IN ('pending', 'active', 'inactive', 'blocked', 'married')),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  profile_created_by TEXT DEFAULT 'Self',
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Performance indexes
CREATE INDEX idx_profiles_gender ON public.profiles (gender);
CREATE INDEX idx_profiles_dob ON public.profiles (date_of_birth);
CREATE INDEX idx_profiles_religion_caste ON public.profiles (religion, caste);
CREATE INDEX idx_profiles_marital_status ON public.profiles (marital_status);
CREATE INDEX idx_profiles_state_city ON public.profiles (state, city);
CREATE INDEX idx_profiles_status ON public.profiles (profile_status);
CREATE INDEX idx_profiles_featured ON public.profiles (is_featured) WHERE is_featured = true;
CREATE INDEX idx_profiles_created ON public.profiles (created_at DESC);
CREATE INDEX idx_profiles_user_id ON public.profiles (user_id);
CREATE INDEX idx_profiles_mother_tongue ON public.profiles (mother_tongue);
CREATE INDEX idx_profiles_education ON public.profiles (education);
CREATE INDEX idx_profiles_occupation ON public.profiles (occupation);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active profiles are publicly viewable"
  ON public.profiles FOR SELECT
  USING (profile_status = 'active');

CREATE POLICY "Users can create their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile"
  ON public.profiles FOR DELETE
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Profile Interests / Shortlist
CREATE TABLE public.profile_interests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  from_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  to_profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  interest_type TEXT NOT NULL DEFAULT 'shortlist' CHECK (interest_type IN ('shortlist', 'interest_sent', 'accepted', 'declined')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(from_user_id, to_profile_id)
);

CREATE INDEX idx_interests_from ON public.profile_interests (from_user_id);
CREATE INDEX idx_interests_to ON public.profile_interests (to_profile_id);

ALTER TABLE public.profile_interests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own interests"
  ON public.profile_interests FOR SELECT
  USING (auth.uid() = from_user_id);

CREATE POLICY "Users can create interests"
  ON public.profile_interests FOR INSERT
  WITH CHECK (auth.uid() = from_user_id);

CREATE POLICY "Users can update their own interests"
  ON public.profile_interests FOR UPDATE
  USING (auth.uid() = from_user_id);

CREATE POLICY "Users can delete their own interests"
  ON public.profile_interests FOR DELETE
  USING (auth.uid() = from_user_id);

-- Profile Views
CREATE TABLE public.profile_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  viewer_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  viewed_profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_views_viewer ON public.profile_views (viewer_user_id);
CREATE INDEX idx_views_profile ON public.profile_views (viewed_profile_id);
CREATE INDEX idx_views_time ON public.profile_views (viewed_at DESC);

ALTER TABLE public.profile_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own view history"
  ON public.profile_views FOR SELECT
  USING (auth.uid() = viewer_user_id);

CREATE POLICY "Users can log profile views"
  ON public.profile_views FOR INSERT
  WITH CHECK (auth.uid() = viewer_user_id);

-- Storage for profile photos
INSERT INTO storage.buckets (id, name, public) VALUES ('profile-photos', 'profile-photos', true);

CREATE POLICY "Anyone can view profile photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile-photos');

CREATE POLICY "Authenticated users can upload profile photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'profile-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own photos"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own photos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
