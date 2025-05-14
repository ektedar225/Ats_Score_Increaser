/*
  # Create messages table for chat functionality

  1. New Tables
    - `messages`
      - `id` (uuid, primary key)
      - `user_id` (text, references auth.users)
      - `content` (text)
      - `is_expert` (boolean)
      - `attachment_url` (text, optional)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on messages table
    - Add policies for authenticated users to:
      - Read their own messages
      - Create new messages
*/

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text REFERENCES auth.users(id) NOT NULL,
  content text NOT NULL,
  is_expert boolean DEFAULT false,
  attachment_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own messages"
  ON messages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create messages"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);