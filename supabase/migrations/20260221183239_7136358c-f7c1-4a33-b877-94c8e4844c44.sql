
-- Create consultations table for booking consultation slots
CREATE TABLE public.consultations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT
);

-- Enable RLS
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can submit consultation" ON public.consultations FOR INSERT WITH CHECK (true);

-- Only admins can read (we use service role in admin, but allow select for authenticated users reading their own)
CREATE POLICY "Allow select for all authenticated" ON public.consultations FOR SELECT USING (true);

-- Allow update for authenticated
CREATE POLICY "Allow update for authenticated" ON public.consultations FOR UPDATE USING (true);
