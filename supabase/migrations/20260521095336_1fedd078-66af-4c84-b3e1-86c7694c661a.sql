-- Stricter admin check
CREATE OR REPLACE FUNCTION public.is_admin(check_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.staff_members
    WHERE email = (SELECT email FROM auth.users WHERE id = check_user_id)
      AND role = 'admin'
      AND is_active = true
  )
  OR (SELECT email FROM auth.users WHERE id = check_user_id) IN (
    'menda.manmadha21@gmail.com',
    'drakshayani@gmail.com',
    'kalyanasuthra@gmail.com'
  )
$$;

-- Tighten staff_members write policies to admin-only
DROP POLICY IF EXISTS "Staff can insert staff members" ON public.staff_members;
DROP POLICY IF EXISTS "Staff can update staff members" ON public.staff_members;
DROP POLICY IF EXISTS "Staff can delete staff members" ON public.staff_members;

CREATE POLICY "Admins can insert staff members"
ON public.staff_members FOR INSERT TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update staff members"
ON public.staff_members FOR UPDATE TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete staff members"
ON public.staff_members FOR DELETE TO authenticated
USING (public.is_admin(auth.uid()));

-- Lock down profile_interests: remove the global SELECT-all policy and add staff SELECT
DROP POLICY IF EXISTS "Authenticated users can view all interests" ON public.profile_interests;

CREATE POLICY "Staff can view all interests"
ON public.profile_interests FOR SELECT TO authenticated
USING (public.is_staff_or_admin(auth.uid()));