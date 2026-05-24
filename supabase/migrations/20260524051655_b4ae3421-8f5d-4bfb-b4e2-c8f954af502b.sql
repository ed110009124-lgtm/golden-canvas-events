-- Explicit deny for anon/authenticated writes on site-media (service_role bypasses RLS)
CREATE POLICY "site-media admin insert only"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (false);

CREATE POLICY "site-media admin update only"
ON storage.objects FOR UPDATE TO anon, authenticated
USING (false) WITH CHECK (false);

CREATE POLICY "site-media admin delete only"
ON storage.objects FOR DELETE TO anon, authenticated
USING (false);

-- Explicit deny SELECT on leads for anon/authenticated (service_role bypasses RLS for admin reads)
CREATE POLICY "leads no public read"
ON public.leads FOR SELECT TO anon, authenticated
USING (false);