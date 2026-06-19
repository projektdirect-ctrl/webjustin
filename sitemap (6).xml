/*
  # Create gallery storage bucket and seed contact data

  1. Storage
    - Creates a public 'gallery' storage bucket for photo uploads
    - Policies for public read and authenticated write

  2. Data
    - Seeds default contact info (phone, email) into site_texts
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Anyone can view gallery images' AND tablename = 'objects'
  ) THEN
    CREATE POLICY "Anyone can view gallery images"
      ON storage.objects FOR SELECT
      TO public
      USING (bucket_id = 'gallery');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can upload gallery images' AND tablename = 'objects'
  ) THEN
    CREATE POLICY "Authenticated users can upload gallery images"
      ON storage.objects FOR INSERT
      TO authenticated
      WITH CHECK (bucket_id = 'gallery');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can delete gallery images' AND tablename = 'objects'
  ) THEN
    CREATE POLICY "Authenticated users can delete gallery images"
      ON storage.objects FOR DELETE
      TO authenticated
      USING (bucket_id = 'gallery');
  END IF;
END $$;

INSERT INTO site_texts (key, value) VALUES
  ('contact_phone', '+420 739 389 993'),
  ('contact_email', 'jrbprace@seznam.cz'),
  ('contact_hours_main', 'Po–Pá: 7:00 – 18:00'),
  ('contact_hours_sub', 'So: po domluvě'),
  ('contact_area_main', 'Celá Česká republika'),
  ('contact_area_sub', 'Primárně Ústecký kraj')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
