ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS partner_min_age smallint,
  ADD COLUMN IF NOT EXISTS partner_max_age smallint,
  ADD COLUMN IF NOT EXISTS partner_min_height smallint,
  ADD COLUMN IF NOT EXISTS partner_max_height smallint,
  ADD COLUMN IF NOT EXISTS partner_religion text,
  ADD COLUMN IF NOT EXISTS partner_caste text,
  ADD COLUMN IF NOT EXISTS partner_education text,
  ADD COLUMN IF NOT EXISTS partner_occupation text,
  ADD COLUMN IF NOT EXISTS partner_city text;