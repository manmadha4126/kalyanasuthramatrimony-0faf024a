
-- 1. Fix success_stories: remove user self-management, only admin/staff can manage
DROP POLICY IF EXISTS "Authenticated users can delete their own stories" ON public.success_stories;
DROP POLICY IF EXISTS "Authenticated users can update their own stories" ON public.success_stories;
DROP POLICY IF EXISTS "Users can submit stories" ON public.success_stories;
DROP POLICY IF EXISTS "Users can view their own stories" ON public.success_stories;

-- Staff/admin can insert stories
CREATE POLICY "Staff can insert stories"
  ON public.success_stories FOR INSERT
  TO authenticated
  WITH CHECK (public.is_staff_or_admin(auth.uid()));

-- 2. Fix consultations: remove the stale public SELECT policy
DROP POLICY IF EXISTS "Allow select for all authenticated" ON public.consultations;

-- 3. Enable RLS on profiles_public view (views inherit from base table RLS with security_invoker)
-- The view already uses security_invoker=on, so it respects base table RLS. No action needed.

-- 4. Fix consultation INSERT to restrict phone exposure - keep public insert but that's fine
-- The remaining "Anyone can submit consultation" WITH CHECK(true) is intentional for public forms
