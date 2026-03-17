-- ============================================================
-- Jessa Cake Delights — Product Seed Data
-- Run this AFTER running seed.sql (requires categories to exist)
-- ============================================================

-- This file seeds 16 real products based on the catalog images
-- Images are stored in public/products/ folder

-- ============================================================
-- PRODUCTS
-- ============================================================

-- Product 1: Princess Castle Cake
INSERT INTO products (name, slug, description, base_price, category_id, lead_time_days, is_visible, is_featured)
VALUES (
  'Princess Castle Cake',
  'princess-castle-cake',
  'Beautiful pink princess castle cake with character cutouts, perfect for your little princess''s special day.',
  2000,
  (SELECT id FROM categories WHERE slug = 'birthday-cakes'),
  3,
  true,
  true
);

INSERT INTO product_sizes (product_id, name, price, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'princess-castle-cake'), '3 Layers', 2000, 1),
  ((SELECT id FROM products WHERE slug = 'princess-castle-cake'), '3 Layers (Premium)', 2500, 2);

INSERT INTO product_flavors (product_id, name, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'princess-castle-cake'), 'Chocolate', 1),
  ((SELECT id FROM products WHERE slug = 'princess-castle-cake'), 'Vanilla', 2),
  ((SELECT id FROM products WHERE slug = 'princess-castle-cake'), 'Ube', 3);

INSERT INTO product_images (product_id, url, storage_path, is_main, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'princess-castle-cake'), '/products/princess-castle-pink-3layer.jpg', 'products/princess-castle-pink-3layer.jpg', true, 1);

-- Product 2: Butterfly Birthday Cake
INSERT INTO products (name, slug, description, base_price, category_id, lead_time_days, is_visible, is_featured)
VALUES (
  'Butterfly Birthday Cake',
  'butterfly-birthday-cake',
  'Charming pink and white round cake decorated with delicate butterflies and gold accents.',
  500,
  (SELECT id FROM categories WHERE slug = 'birthday-cakes'),
  2,
  true,
  false
);

INSERT INTO product_sizes (product_id, name, price, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'butterfly-birthday-cake'), 'Standard', 500, 1);

INSERT INTO product_flavors (product_id, name, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'butterfly-birthday-cake'), 'Chocolate', 1),
  ((SELECT id FROM products WHERE slug = 'butterfly-birthday-cake'), 'Vanilla', 2),
  ((SELECT id FROM products WHERE slug = 'butterfly-birthday-cake'), 'Mocha', 3);

INSERT INTO product_images (product_id, url, storage_path, is_main, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'butterfly-birthday-cake'), '/products/butterfly-pink-white-birthday.jpg', 'products/butterfly-pink-white-birthday.jpg', true, 1);

-- Product 3: Elegant Red Roses Cake
INSERT INTO products (name, slug, description, base_price, category_id, lead_time_days, is_visible, is_featured)
VALUES (
  'Elegant Red Roses Cake',
  'elegant-red-roses-cake',
  'Stunning two-layer white cake adorned with large red roses and white flowers, perfect for formal celebrations.',
  1200,
  (SELECT id FROM categories WHERE slug = 'formal-celebration'),
  3,
  true,
  true
);

INSERT INTO product_sizes (product_id, name, price, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'elegant-red-roses-cake'), '2 Layers (6 inch)', 1200, 1),
  ((SELECT id FROM products WHERE slug = 'elegant-red-roses-cake'), '2 Layers (8 inch)', 1500, 2),
  ((SELECT id FROM products WHERE slug = 'elegant-red-roses-cake'), '2 Layers (10 inch)', 1800, 3);

INSERT INTO product_flavors (product_id, name, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'elegant-red-roses-cake'), 'Vanilla', 1),
  ((SELECT id FROM products WHERE slug = 'elegant-red-roses-cake'), 'Red Velvet', 2),
  ((SELECT id FROM products WHERE slug = 'elegant-red-roses-cake'), 'Chocolate', 3);

INSERT INTO product_images (product_id, url, storage_path, is_main, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'elegant-red-roses-cake'), '/products/elegant-white-red-roses-2layer.jpg', 'products/elegant-white-red-roses-2layer.jpg', true, 1);

-- Product 4: Butterfly Two-Tier Cake
INSERT INTO products (name, slug, description, base_price, category_id, lead_time_days, is_visible, is_featured)
VALUES (
  'Butterfly Two-Tier Cake',
  'butterfly-two-tier-cake',
  'Eye-catching red and white butterfly-themed two-tier cake, ideal for milestone birthdays.',
  800,
  (SELECT id FROM categories WHERE slug = 'birthday-cakes'),
  3,
  true,
  false
);

INSERT INTO product_sizes (product_id, name, price, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'butterfly-two-tier-cake'), '2 Tiers', 800, 1);

INSERT INTO product_flavors (product_id, name, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'butterfly-two-tier-cake'), 'Chocolate', 1),
  ((SELECT id FROM products WHERE slug = 'butterfly-two-tier-cake'), 'Vanilla', 2),
  ((SELECT id FROM products WHERE slug = 'butterfly-two-tier-cake'), 'Strawberry', 3);

INSERT INTO product_images (product_id, url, storage_path, is_main, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'butterfly-two-tier-cake'), '/products/butterfly-red-white-2tier.jpg', 'products/butterfly-red-white-2tier.jpg', true, 1);

-- Product 5: Chocolate Drip Birthday Cake
INSERT INTO products (name, slug, description, base_price, category_id, lead_time_days, is_visible, is_featured)
VALUES (
  'Chocolate Drip Birthday Cake',
  'chocolate-drip-birthday-cake',
  'Decadent chocolate drip cake with "Happy Birthday" topper, a chocolate lover''s dream.',
  400,
  (SELECT id FROM categories WHERE slug = 'birthday-cakes'),
  2,
  true,
  false
);

INSERT INTO product_sizes (product_id, name, price, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'chocolate-drip-birthday-cake'), 'Standard', 400, 1);

INSERT INTO product_flavors (product_id, name, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'chocolate-drip-birthday-cake'), 'Chocolate', 1),
  ((SELECT id FROM products WHERE slug = 'chocolate-drip-birthday-cake'), 'Double Chocolate', 2);

INSERT INTO product_images (product_id, url, storage_path, is_main, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'chocolate-drip-birthday-cake'), '/products/chocolate-drip-birthday.jpg', 'products/chocolate-drip-birthday.jpg', true, 1);

-- Product 6: Pink Christening Cake
INSERT INTO products (name, slug, description, base_price, category_id, lead_time_days, is_visible, is_featured)
VALUES (
  'Pink Christening Cake',
  'pink-christening-cake',
  'Delicate pink two-layer christening cake with gold cross topper and pastel piping, perfect for baptism celebrations.',
  600,
  (SELECT id FROM categories WHERE slug = 'christening-cakes'),
  3,
  true,
  true
);

INSERT INTO product_sizes (product_id, name, price, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'pink-christening-cake'), '2 Layers (Small)', 600, 1),
  ((SELECT id FROM products WHERE slug = 'pink-christening-cake'), '2 Layers (Large)', 750, 2);

INSERT INTO product_flavors (product_id, name, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'pink-christening-cake'), 'Vanilla', 1),
  ((SELECT id FROM products WHERE slug = 'pink-christening-cake'), 'Strawberry', 2),
  ((SELECT id FROM products WHERE slug = 'pink-christening-cake'), 'Ube', 3);

INSERT INTO product_images (product_id, url, storage_path, is_main, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'pink-christening-cake'), '/products/pink-christening-cross-2layer.jpg', 'products/pink-christening-cross-2layer.jpg', true, 1);

-- Product 7: Pink Ribbon Birthday Cake
INSERT INTO products (name, slug, description, base_price, category_id, lead_time_days, is_visible, is_featured)
VALUES (
  'Pink Ribbon Birthday Cake',
  'pink-ribbon-birthday-cake',
  'Sweet pink ribbon-style birthday cake with elegant design.',
  550,
  (SELECT id FROM categories WHERE slug = 'birthday-cakes'),
  2,
  true,
  false
);

INSERT INTO product_sizes (product_id, name, price, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'pink-ribbon-birthday-cake'), 'Standard', 550, 1);

INSERT INTO product_flavors (product_id, name, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'pink-ribbon-birthday-cake'), 'Vanilla', 1),
  ((SELECT id FROM products WHERE slug = 'pink-ribbon-birthday-cake'), 'Strawberry', 2),
  ((SELECT id FROM products WHERE slug = 'pink-ribbon-birthday-cake'), 'Chocolate', 3);

INSERT INTO product_images (product_id, url, storage_path, is_main, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'pink-ribbon-birthday-cake'), '/products/pink-ribbon-birthday.jpg', 'products/pink-ribbon-birthday.jpg', true, 1);

-- Product 8: Heart Valentine's Dessert
INSERT INTO products (name, slug, description, base_price, category_id, lead_time_days, is_visible, is_featured)
VALUES (
  'Heart Valentine''s Dessert',
  'heart-valentines-dessert',
  'Adorable heart-shaped Valentine''s dessert in foil tray, perfect for expressing your love.',
  180,
  (SELECT id FROM categories WHERE slug = 'valentines-specials'),
  2,
  true,
  false
);

INSERT INTO product_sizes (product_id, name, price, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'heart-valentines-dessert'), 'Single', 180, 1);

INSERT INTO product_flavors (product_id, name, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'heart-valentines-dessert'), 'Chocolate', 1),
  ((SELECT id FROM products WHERE slug = 'heart-valentines-dessert'), 'Red Velvet', 2),
  ((SELECT id FROM products WHERE slug = 'heart-valentines-dessert'), 'Strawberry', 3);

INSERT INTO product_images (product_id, url, storage_path, is_main, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'heart-valentines-dessert'), '/products/heart-valentines-dessert.jpg', 'products/heart-valentines-dessert.jpg', true, 1);

-- Product 9: Heart Valentine's with Balloon
INSERT INTO products (name, slug, description, base_price, category_id, lead_time_days, is_visible, is_featured)
VALUES (
  'Heart Valentine''s with Balloon',
  'heart-valentines-balloon',
  'Romantic heart-shaped Valentine''s cake with red balloon decoration.',
  250,
  (SELECT id FROM categories WHERE slug = 'valentines-specials'),
  2,
  true,
  false
);

INSERT INTO product_sizes (product_id, name, price, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'heart-valentines-balloon'), 'Standard', 250, 1);

INSERT INTO product_flavors (product_id, name, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'heart-valentines-balloon'), 'Red Velvet', 1),
  ((SELECT id FROM products WHERE slug = 'heart-valentines-balloon'), 'Chocolate', 2),
  ((SELECT id FROM products WHERE slug = 'heart-valentines-balloon'), 'Strawberry', 3);

INSERT INTO product_images (product_id, url, storage_path, is_main, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'heart-valentines-balloon'), '/products/heart-valentines-balloon.jpg', 'products/heart-valentines-balloon.jpg', true, 1);

-- Product 10: Graduation Celebration Cake
INSERT INTO products (name, slug, description, base_price, category_id, lead_time_days, is_visible, is_featured)
VALUES (
  'Graduation Celebration Cake',
  'graduation-celebration-cake',
  'Celebratory graduation cake in white and yellow with "Class of 2023" and personalized congratulations message.',
  500,
  (SELECT id FROM categories WHERE slug = 'graduation-cakes'),
  2,
  true,
  true
);

INSERT INTO product_sizes (product_id, name, price, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'graduation-celebration-cake'), 'Standard', 500, 1);

INSERT INTO product_flavors (product_id, name, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'graduation-celebration-cake'), 'Vanilla', 1),
  ((SELECT id FROM products WHERE slug = 'graduation-celebration-cake'), 'Chocolate', 2),
  ((SELECT id FROM products WHERE slug = 'graduation-celebration-cake'), 'Mocha', 3);

INSERT INTO product_images (product_id, url, storage_path, is_main, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'graduation-celebration-cake'), '/products/graduation-white-yellow-2023.jpg', 'products/graduation-white-yellow-2023.jpg', true, 1);

-- Product 11: Kuromi Pink Birthday Cake
INSERT INTO products (name, slug, description, base_price, category_id, lead_time_days, is_visible, is_featured)
VALUES (
  'Kuromi Pink Birthday Cake',
  'kuromi-pink-birthday-cake',
  'Adorable Kuromi-themed pink birthday cake, perfect for Sanrio fans.',
  550,
  (SELECT id FROM categories WHERE slug = 'character-themed'),
  3,
  true,
  true
);

INSERT INTO product_sizes (product_id, name, price, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'kuromi-pink-birthday-cake'), 'Standard', 550, 1);

INSERT INTO product_flavors (product_id, name, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'kuromi-pink-birthday-cake'), 'Vanilla', 1),
  ((SELECT id FROM products WHERE slug = 'kuromi-pink-birthday-cake'), 'Strawberry', 2),
  ((SELECT id FROM products WHERE slug = 'kuromi-pink-birthday-cake'), 'Ube', 3);

INSERT INTO product_images (product_id, url, storage_path, is_main, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'kuromi-pink-birthday-cake'), '/products/kuromi-pink-birthday.jpg', 'products/kuromi-pink-birthday.jpg', true, 1);

-- Product 12: Kuromi Tall Cake
INSERT INTO products (name, slug, description, base_price, category_id, lead_time_days, is_visible, is_featured)
VALUES (
  'Kuromi Tall Cake',
  'kuromi-tall-cake',
  'Impressive tall Kuromi-themed cake in black, cream, and purple colors.',
  500,
  (SELECT id FROM categories WHERE slug = 'character-themed'),
  3,
  true,
  false
);

INSERT INTO product_sizes (product_id, name, price, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'kuromi-tall-cake'), 'Tall', 500, 1);

INSERT INTO product_flavors (product_id, name, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'kuromi-tall-cake'), 'Chocolate', 1),
  ((SELECT id FROM products WHERE slug = 'kuromi-tall-cake'), 'Ube', 2),
  ((SELECT id FROM products WHERE slug = 'kuromi-tall-cake'), 'Vanilla', 3);

INSERT INTO product_images (product_id, url, storage_path, is_main, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'kuromi-tall-cake'), '/products/kuromi-tall-black-purple.jpg', 'products/kuromi-tall-black-purple.jpg', true, 1);

-- Product 13: Pink Doll Cake with Cupcakes
INSERT INTO products (name, slug, description, base_price, category_id, lead_time_days, is_visible, is_featured)
VALUES (
  'Pink Doll Cake with Cupcakes',
  'pink-doll-cake-cupcakes',
  'Delightful pink birthday cake with doll topper and surrounding cupcakes, perfect for a princess party.',
  850,
  (SELECT id FROM categories WHERE slug = 'cupcake-sets'),
  3,
  true,
  true
);

INSERT INTO product_sizes (product_id, name, price, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'pink-doll-cake-cupcakes'), 'Cake + Cupcakes', 850, 1);

INSERT INTO product_flavors (product_id, name, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'pink-doll-cake-cupcakes'), 'Vanilla', 1),
  ((SELECT id FROM products WHERE slug = 'pink-doll-cake-cupcakes'), 'Strawberry', 2),
  ((SELECT id FROM products WHERE slug = 'pink-doll-cake-cupcakes'), 'Chocolate', 3);

INSERT INTO product_images (product_id, url, storage_path, is_main, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'pink-doll-cake-cupcakes'), '/products/pink-doll-cupcakes-6th-birthday.jpg', 'products/pink-doll-cupcakes-6th-birthday.jpg', true, 1);

-- Product 14: Safari Wild One Cake with Cupcakes
INSERT INTO products (name, slug, description, base_price, category_id, lead_time_days, is_visible, is_featured)
VALUES (
  'Safari Wild One Cake with Cupcakes',
  'safari-wild-one-cupcakes',
  'Fun safari/jungle themed two-layer cake with matching cupcakes, perfect for first birthday celebrations.',
  1150,
  (SELECT id FROM categories WHERE slug = 'cupcake-sets'),
  3,
  true,
  true
);

INSERT INTO product_sizes (product_id, name, price, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'safari-wild-one-cupcakes'), '2 Layers + Cupcakes', 1150, 1);

INSERT INTO product_flavors (product_id, name, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'safari-wild-one-cupcakes'), 'Vanilla', 1),
  ((SELECT id FROM products WHERE slug = 'safari-wild-one-cupcakes'), 'Chocolate', 2),
  ((SELECT id FROM products WHERE slug = 'safari-wild-one-cupcakes'), 'Mocha', 3);

INSERT INTO product_images (product_id, url, storage_path, is_main, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'safari-wild-one-cupcakes'), '/products/safari-jungle-wild-one-cupcakes.jpg', 'products/safari-jungle-wild-one-cupcakes.jpg', true, 1);

-- Product 15: Elegant White & Green Floral Cake
INSERT INTO products (name, slug, description, base_price, category_id, lead_time_days, is_visible, is_featured)
VALUES (
  'Elegant White & Green Floral Cake',
  'elegant-white-green-floral-cake',
  'Sophisticated 3-layer white and green floral cake, perfect for weddings and formal celebrations.',
  2500,
  (SELECT id FROM categories WHERE slug = 'formal-celebration'),
  4,
  true,
  true
);

INSERT INTO product_sizes (product_id, name, price, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'elegant-white-green-floral-cake'), '3 Layers (Medium)', 2500, 1),
  ((SELECT id FROM products WHERE slug = 'elegant-white-green-floral-cake'), '3 Layers (Large)', 3000, 2);

INSERT INTO product_flavors (product_id, name, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'elegant-white-green-floral-cake'), 'Vanilla', 1),
  ((SELECT id FROM products WHERE slug = 'elegant-white-green-floral-cake'), 'Red Velvet', 2),
  ((SELECT id FROM products WHERE slug = 'elegant-white-green-floral-cake'), 'Chocolate', 3);

INSERT INTO product_images (product_id, url, storage_path, is_main, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'elegant-white-green-floral-cake'), '/products/elegant-white-green-floral-3layer.jpg', 'products/elegant-white-green-floral-3layer.jpg', true, 1);

-- Product 16: Formal 3-Layer Cake with Cupcakes
INSERT INTO products (name, slug, description, base_price, category_id, lead_time_days, is_visible, is_featured)
VALUES (
  'Formal 3-Layer Cake with Cupcakes',
  'formal-3layer-cupcakes',
  'Grand 3-layer formal celebration cake with matching cupcakes, perfect for large events and celebrations.',
  2000,
  (SELECT id FROM categories WHERE slug = 'cupcake-sets'),
  4,
  true,
  true
);

INSERT INTO product_sizes (product_id, name, price, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'formal-3layer-cupcakes'), '3 Layers + Cupcakes (Small)', 2000, 1),
  ((SELECT id FROM products WHERE slug = 'formal-3layer-cupcakes'), '3 Layers + Cupcakes (Medium)', 2500, 2),
  ((SELECT id FROM products WHERE slug = 'formal-3layer-cupcakes'), '3 Layers + Cupcakes (Large)', 3000, 3);

INSERT INTO product_flavors (product_id, name, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'formal-3layer-cupcakes'), 'Vanilla', 1),
  ((SELECT id FROM products WHERE slug = 'formal-3layer-cupcakes'), 'Chocolate', 2),
  ((SELECT id FROM products WHERE slug = 'formal-3layer-cupcakes'), 'Red Velvet', 3),
  ((SELECT id FROM products WHERE slug = 'formal-3layer-cupcakes'), 'Mocha', 4);

INSERT INTO product_images (product_id, url, storage_path, is_main, sort_order) VALUES
  ((SELECT id FROM products WHERE slug = 'formal-3layer-cupcakes'), '/products/formal-3layer-cupcakes-event.jpg', 'products/formal-3layer-cupcakes-event.jpg', true, 1);
