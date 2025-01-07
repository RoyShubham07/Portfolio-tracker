/*
  # Create stocks table

  1. New Tables
    - `stocks`
      - `id` (uuid, primary key)
      - `symbol` (text, not null)
      - `name` (text, not null)
      - `quantity` (integer, not null)
      - `buyPrice` (numeric, not null)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `stocks` table
    - Add policies for CRUD operations
*/

CREATE TABLE IF NOT EXISTS stocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol text NOT NULL,
  name text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  buyPrice numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE stocks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON stocks FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON stocks FOR INSERT 
  TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only" ON stocks FOR UPDATE
  TO authenticated USING (true);

CREATE POLICY "Enable delete for authenticated users only" ON stocks FOR DELETE
  TO authenticated USING (true);