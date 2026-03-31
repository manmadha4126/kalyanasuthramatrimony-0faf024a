
-- Create a security definer function to check if user is staff/admin
CREATE OR REPLACE FUNCTION public.is_staff_or_admin(check_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.staff_members
    WHERE email = (SELECT email FROM auth.users WHERE id = check_user_id)
      AND is_active = true
  )
$$;

-- Allow staff/admin to update any profile
CREATE POLICY "Staff can update all profiles"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (public.is_staff_or_admin(auth.uid()));

-- Allow staff/admin to manage success stories
CREATE POLICY "Staff can update any story"
  ON public.success_stories FOR UPDATE
  TO authenticated
  USING (public.is_staff_or_admin(auth.uid()));

CREATE POLICY "Staff can delete any story"
  ON public.success_stories FOR DELETE
  TO authenticated
  USING (public.is_staff_or_admin(auth.uid()));

-- Allow staff to view all success stories (not just approved)
CREATE POLICY "Staff can view all stories"
  ON public.success_stories FOR SELECT
  TO authenticated
  USING (public.is_staff_or_admin(auth.uid()));

-- Tighten staff_members: only staff can manage staff
DROP POLICY IF EXISTS "Authenticated users can delete staff" ON public.staff_members;
DROP POLICY IF EXISTS "Authenticated users can insert staff" ON public.staff_members;
DROP POLICY IF EXISTS "Authenticated users can update staff" ON public.staff_members;
DROP POLICY IF EXISTS "Authenticated users can view staff" ON public.staff_members;

CREATE POLICY "Staff can view staff members"
  ON public.staff_members FOR SELECT
  TO authenticated
  USING (public.is_staff_or_admin(auth.uid()));

CREATE POLICY "Staff can insert staff members"
  ON public.staff_members FOR INSERT
  TO authenticated
  WITH CHECK (public.is_staff_or_admin(auth.uid()));

CREATE POLICY "Staff can update staff members"
  ON public.staff_members FOR UPDATE
  TO authenticated
  USING (public.is_staff_or_admin(auth.uid()));

CREATE POLICY "Staff can delete staff members"
  ON public.staff_members FOR DELETE
  TO authenticated
  USING (public.is_staff_or_admin(auth.uid()));

-- Tighten consultations UPDATE to staff only
DROP POLICY IF EXISTS "Authenticated users can update consultations" ON public.consultations;
CREATE POLICY "Staff can update consultations"
  ON public.consultations FOR UPDATE
  TO authenticated
  USING (public.is_staff_or_admin(auth.uid()));

-- Tighten consultations SELECT to staff only
DROP POLICY IF EXISTS "Authenticated users can view consultations" ON public.consultations;
CREATE POLICY "Staff can view consultations"
  ON public.consultations FOR SELECT
  TO authenticated
  USING (public.is_staff_or_admin(auth.uid()));

-- Tighten featured_profiles management to staff only
DROP POLICY IF EXISTS "Authenticated users can insert featured profiles" ON public.featured_profiles;
DROP POLICY IF EXISTS "Authenticated users can update featured profiles" ON public.featured_profiles;
DROP POLICY IF EXISTS "Authenticated users can delete featured profiles" ON public.featured_profiles;

CREATE POLICY "Staff can insert featured profiles"
  ON public.featured_profiles FOR INSERT
  TO authenticated
  WITH CHECK (public.is_staff_or_admin(auth.uid()));

CREATE POLICY "Staff can update featured profiles"
  ON public.featured_profiles FOR UPDATE
  TO authenticated
  USING (public.is_staff_or_admin(auth.uid()));

CREATE POLICY "Staff can delete featured profiles"
  ON public.featured_profiles FOR DELETE
  TO authenticated
  USING (public.is_staff_or_admin(auth.uid()));

-- Tighten profiles INSERT to own user only (remove the broad authenticated insert)
DROP POLICY IF EXISTS "Authenticated users can insert profiles" ON public.profiles;

-- Tighten notifications INSERT to staff
DROP POLICY IF EXISTS "Authenticated users can insert notifications" ON public.notifications;
CREATE POLICY "Staff can insert notifications"
  ON public.notifications FOR INSERT
  TO authenticated
  WITH CHECK (public.is_staff_or_admin(auth.uid()) OR auth.uid() = user_id);
