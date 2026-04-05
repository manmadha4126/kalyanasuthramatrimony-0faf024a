
CREATE TABLE public.revenue_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  purpose TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
  transaction_details TEXT,
  screenshot_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.revenue_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view revenue" ON public.revenue_transactions
  FOR SELECT TO authenticated
  USING (is_staff_or_admin(auth.uid()));

CREATE POLICY "Only admins can insert revenue" ON public.revenue_transactions
  FOR INSERT TO authenticated
  WITH CHECK (is_staff_or_admin(auth.uid()));

CREATE POLICY "Only admins can update revenue" ON public.revenue_transactions
  FOR UPDATE TO authenticated
  USING (is_staff_or_admin(auth.uid()));

CREATE POLICY "Only admins can delete revenue" ON public.revenue_transactions
  FOR DELETE TO authenticated
  USING (is_staff_or_admin(auth.uid()));
