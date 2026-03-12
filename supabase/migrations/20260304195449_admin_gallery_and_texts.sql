/*
  # Admin Gallery and Texts Management

  1. New Tables
    - `gallery_photos`
      - `id` (uuid, primary key)
      - `src` (text) - image path or URL
      - `label` (text) - photo caption
      - `sort_order` (int) - display order
      - `span` (text) - CSS grid span classes
      - `created_at` (timestamptz)
    - `site_texts`
      - `id` (uuid, primary key)
      - `key` (text, unique) - identifier for the text block
      - `value` (text) - the text content
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Public can SELECT gallery_photos and site_texts (needed for the public site)
    - Only authenticated users (admin) can INSERT, UPDATE, DELETE
*/

CREATE TABLE IF NOT EXISTS gallery_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  src text NOT NULL,
  label text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  span text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view gallery photos"
  ON gallery_photos FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can insert gallery photos"
  ON gallery_photos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update gallery photos"
  ON gallery_photos FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete gallery photos"
  ON gallery_photos FOR DELETE
  TO authenticated
  USING (true);


CREATE TABLE IF NOT EXISTS site_texts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_texts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view site texts"
  ON site_texts FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can insert site texts"
  ON site_texts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update site texts"
  ON site_texts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete site texts"
  ON site_texts FOR DELETE
  TO authenticated
  USING (true);

INSERT INTO gallery_photos (src, label, sort_order, span) VALUES
  ('/WhatsApp_Image_2026-03-02_at_15.36.28_(1).jpeg', 'Solární panely', 0, 'sm:col-span-2 sm:row-span-2'),
  ('/WhatsApp_Image_2026-03-02_at_15.36.28.jpeg', 'Pergola a terasa', 1, ''),
  ('/WhatsApp_Image_2026-03-02_at_15.36.29_(1).jpeg', 'Bourací práce', 2, ''),
  ('/WhatsApp_Image_2026-03-02_at_15.36.29_(2).jpeg', 'Rozvody a instalace', 3, 'sm:col-span-2')
ON CONFLICT DO NOTHING;
