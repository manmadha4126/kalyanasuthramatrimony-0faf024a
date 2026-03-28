
CREATE TABLE public.staff_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  role text NOT NULL DEFAULT 'staff',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE public.staff_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view staff" ON public.staff_members FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert staff" ON public.staff_members FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update staff" ON public.staff_members FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete staff" ON public.staff_members FOR DELETE TO authenticated USING (true);
