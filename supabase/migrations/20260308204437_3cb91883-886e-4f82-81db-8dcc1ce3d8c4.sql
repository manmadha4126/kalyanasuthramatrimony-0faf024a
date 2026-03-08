
CREATE TABLE public.detail_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  viewer_user_id uuid NOT NULL,
  viewed_profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  view_type text NOT NULL, -- 'contact' or 'horoscope'
  viewed_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(viewer_user_id, viewed_profile_id, view_type)
);

ALTER TABLE public.detail_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own detail views"
ON public.detail_views FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = viewer_user_id);

CREATE POLICY "Users can view their own detail views"
ON public.detail_views FOR SELECT
TO authenticated
USING (auth.uid() = viewer_user_id);
