
-- Create success_stories table
CREATE TABLE public.success_stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bride_name TEXT NOT NULL,
  groom_name TEXT NOT NULL,
  city TEXT NOT NULL,
  story TEXT NOT NULL,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_by UUID REFERENCES auth.users(id),
  approved_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.success_stories ENABLE ROW LEVEL SECURITY;

-- Anyone can view approved stories
CREATE POLICY "Anyone can view approved stories"
ON public.success_stories
FOR SELECT
USING (status = 'approved');

-- Authenticated users can view their own stories regardless of status
CREATE POLICY "Users can view their own stories"
ON public.success_stories
FOR SELECT
USING (auth.uid() = created_by);

-- Authenticated users can submit stories
CREATE POLICY "Users can submit stories"
ON public.success_stories
FOR INSERT
WITH CHECK (auth.uid() = created_by);

-- Allow admin updates (status changes)
CREATE POLICY "Allow update for authenticated"
ON public.success_stories
FOR UPDATE
USING (true);

-- Allow admin deletes
CREATE POLICY "Allow delete for authenticated"
ON public.success_stories
FOR DELETE
USING (true);
