
CREATE TABLE public.matches (
  id text PRIMARY KEY,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read matches (overlay needs public read access)
CREATE POLICY "Anyone can read matches"
  ON public.matches FOR SELECT
  USING (true);

-- Allow anyone to insert matches (admin page, no auth required for this use case)
CREATE POLICY "Anyone can insert matches"
  ON public.matches FOR INSERT
  WITH CHECK (true);

-- Allow anyone to update matches (admin page controls)
CREATE POLICY "Anyone can update matches"
  ON public.matches FOR UPDATE
  USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.matches;
