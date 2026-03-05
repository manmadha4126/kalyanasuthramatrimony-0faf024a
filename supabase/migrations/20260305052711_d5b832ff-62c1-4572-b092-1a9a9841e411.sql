
-- Add profile_id column with auto-generated sequential ID
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS profile_id text;

-- Create a sequence for profile IDs
CREATE SEQUENCE IF NOT EXISTS profile_id_seq START WITH 1001;

-- Create function to auto-generate profile_id on insert
CREATE OR REPLACE FUNCTION public.generate_profile_id()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  IF NEW.profile_id IS NULL THEN
    NEW.profile_id := 'KS' || LPAD(nextval('profile_id_seq')::text, 4, '0');
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger
DROP TRIGGER IF EXISTS set_profile_id ON public.profiles;
CREATE TRIGGER set_profile_id
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_profile_id();

-- Backfill existing profiles that don't have a profile_id
UPDATE public.profiles
SET profile_id = 'KS' || LPAD(nextval('profile_id_seq')::text, 4, '0')
WHERE profile_id IS NULL;
