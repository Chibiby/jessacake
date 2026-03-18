-- Add facebook_link column to customer_details table
ALTER TABLE customer_details ADD COLUMN IF NOT EXISTS facebook_link TEXT;
