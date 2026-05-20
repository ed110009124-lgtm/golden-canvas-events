
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  message TEXT,
  source TEXT NOT NULL DEFAULT 'contact_form',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can create leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE public.site_content (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can read site content" ON public.site_content FOR SELECT TO anon, authenticated USING (true);
