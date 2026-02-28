
-- Create featured_profiles table for showcase profiles
CREATE TABLE public.featured_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  profession TEXT NOT NULL,
  city TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('Bride', 'Groom')),
  profile_photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.featured_profiles ENABLE ROW LEVEL SECURITY;

-- Anyone can view featured profiles (public showcase)
CREATE POLICY "Anyone can view featured profiles" ON public.featured_profiles
  FOR SELECT USING (true);

-- Only authenticated users (admins) can manage
CREATE POLICY "Authenticated users can insert featured profiles" ON public.featured_profiles
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update featured profiles" ON public.featured_profiles
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete featured profiles" ON public.featured_profiles
  FOR DELETE TO authenticated USING (true);
