-- =============================================================
-- Jessa Cakes — Database Schema & Seed Data
-- Run this in your Supabase SQL Editor
-- =============================================================

-- Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. CATEGORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 2. PRODUCTS
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  base_price NUMERIC(10,2) NOT NULL CHECK (base_price > 0),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  lead_time_days INTEGER DEFAULT 2,
  is_visible BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 3. PRODUCT SIZES
-- ============================================================
CREATE TABLE IF NOT EXISTS product_sizes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL CHECK (price > 0),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 4. PRODUCT FLAVORS
-- ============================================================
CREATE TABLE IF NOT EXISTS product_flavors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 5. PRODUCT IMAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  is_main BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 6. ORDERS
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready_for_pickup', 'out_for_delivery', 'completed', 'cancelled')),
  fulfillment_type TEXT NOT NULL
    CHECK (fulfillment_type IN ('pickup', 'delivery')),
  payment_method TEXT NOT NULL DEFAULT 'cash'
    CHECK (payment_method IN ('cash')),
  payment_status TEXT NOT NULL DEFAULT 'unpaid'
    CHECK (payment_status IN ('unpaid', 'paid')),
  subtotal NUMERIC(10,2) NOT NULL CHECK (subtotal >= 0),
  delivery_fee NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (delivery_fee >= 0),
  total NUMERIC(10,2) NOT NULL CHECK (total >= 0),
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  special_instructions TEXT,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 7. ORDER ITEMS (snapshotted product data)
-- ============================================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  size_name TEXT NOT NULL,
  flavor_name TEXT NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL CHECK (unit_price > 0),
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  line_total NUMERIC(10,2) NOT NULL CHECK (line_total > 0),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 8. CUSTOMER DETAILS (1:1 with orders)
-- ============================================================
CREATE TABLE IF NOT EXISTS customer_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  facebook_link TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 9. DELIVERY DETAILS (only for delivery orders)
-- ============================================================
CREATE TABLE IF NOT EXISTS delivery_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
  street_address TEXT NOT NULL,
  barangay TEXT NOT NULL,
  city TEXT NOT NULL,
  landmarks TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 10. SITE SETTINGS (key-value)
-- ============================================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- TRIGGERS: Auto-update updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_flavors ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access for catalog data
CREATE POLICY "Public can read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public can read visible products" ON products FOR SELECT USING (is_visible = true AND is_deleted = false);
CREATE POLICY "Public can read product sizes" ON product_sizes FOR SELECT USING (true);
CREATE POLICY "Public can read product flavors" ON product_flavors FOR SELECT USING (true);
CREATE POLICY "Public can read product images" ON product_images FOR SELECT USING (true);
CREATE POLICY "Public can read site settings" ON site_settings FOR SELECT USING (true);

-- Public can create orders (guest ordering)
CREATE POLICY "Public can insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert order items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert customer details" ON customer_details FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert delivery details" ON delivery_details FOR INSERT WITH CHECK (true);

-- Authenticated (admin) full access
CREATE POLICY "Admin full access categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access product_sizes" ON product_sizes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access product_flavors" ON product_flavors FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access product_images" ON product_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access orders" ON orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access order_items" ON order_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access customer_details" ON customer_details FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access delivery_details" ON delivery_details FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA: Categories
-- ============================================================
INSERT INTO categories (name, slug, description, sort_order) VALUES
  ('Birthday Cakes', 'birthday-cakes', 'Custom cakes for birthday celebrations', 1),
  ('Christening Cakes', 'christening-cakes', 'Cakes for baptism and christening events', 2),
  ('Graduation Cakes', 'graduation-cakes', 'Celebratory cakes for graduates', 3),
  ('Valentine''s Specials', 'valentines-specials', 'Heart-shaped cakes and desserts for Valentine''s', 4),
  ('Formal/Celebration', 'formal-celebration', 'Elegant multi-layer cakes for formal events', 5),
  ('Character-Themed', 'character-themed', 'Cakes with character designs (Kuromi, Disney, etc.)', 6),
  ('Cupcake Sets', 'cupcake-sets', 'Cupcake bundles and cake + cupcake packages', 7)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- SEED DATA: Site Settings
-- ============================================================
INSERT INTO site_settings (key, value) VALUES
  ('business_name', 'Jessa Cakes'),
  ('business_address', 'Malandag, Malungon, Sarangani Province, Philippines'),
  ('business_phone', ''),
  ('business_email', ''),
  ('operating_hours', 'Mon-Sat 8:00 AM - 6:00 PM'),
  ('delivery_fee', '100.00'),
  ('delivery_areas', 'Within Malandag and nearby areas'),
  ('pickup_address', 'Jessa Cakes Shop, Malandag, Malungon, Sarangani Province'),
  ('social_facebook', ''),
  ('social_instagram', ''),
  ('minimum_lead_time_days', '2')
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- STORAGE: Create product-images bucket
-- (Run this in Supabase Dashboard > Storage, or via API)
-- ============================================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);
