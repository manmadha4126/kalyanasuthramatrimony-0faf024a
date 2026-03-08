
INSERT INTO storage.buckets (id, name, public) VALUES ('success-story-photos', 'success-story-photos', true);

CREATE POLICY "Anyone can view success story photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'success-story-photos');

CREATE POLICY "Authenticated users can upload success story photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'success-story-photos');
