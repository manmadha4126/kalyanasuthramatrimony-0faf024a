ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS subscription_package text,
  ADD COLUMN IF NOT EXISTS subscription_amount numeric,
  ADD COLUMN IF NOT EXISTS subscription_start_date date,
  ADD COLUMN IF NOT EXISTS subscription_end_date date,
  ADD COLUMN IF NOT EXISTS subscription_notes text;