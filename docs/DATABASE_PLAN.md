# Database Plan — Jessa Cakes Delights

> Supabase (PostgreSQL) database design for the cake business website.

---

## Overview

The database supports:
- Product catalog with categories, sizes, flavors, and images
- Customer orders with pickup/delivery handling
- Cash-only payment tracking
- Admin authentication (via Supabase Auth — separate from app tables)
- Site settings for configurable business info

Design principles:
- Keep it simple — no over-normalization
- Use meaningful table and column names
- Include audit fields (`created_at`, `updated_at`) on all tables
- Use UUIDs for primary keys (Supabase default)
- Use enums or text fields for statuses (keep it practical)
- Soft delete where data preservation matters (orders, products)

---

## Entity Relationship Diagram (Text)

```
categories ──────┐
                  │ 1:M
                  ▼
              products ──────────┬──────────┬──────────┐
                  │              │          │          │
                  │ 1:M         │ 1:M      │ 1:M      │ 1:M
                  ▼              ▼          ▼          ▼
          product_images   product_sizes  product_flavors  order_items
                                                           │
                                                           │ M:1
                                                           ▼
                                                        orders
                                                           │
                                                     ┌─────┼─────┐
                                                     │     │     │
                                                     ▼     ▼     ▼
                                            customer_details  delivery_details  order_items
                                              (1:1)              (0..1:1)         (1:M)

site_settings (standalone key-value or single row)
```

---

## Tables

### 1. `categories`

Organizes products into browsable groups.

**Seed categories (from actual product catalog):**

| Name                    | Slug                  | Description                                      |
| ----------------------- | --------------------- | ------------------------------------------------ |
| Birthday Cakes          | `birthday-cakes`      | Custom cakes for birthday celebrations           |
| Christening Cakes       | `christening-cakes`   | Cakes for baptism and christening events         |
| Graduation Cakes        | `graduation-cakes`    | Celebratory cakes for graduates                  |
| Valentine's Specials    | `valentines-specials` | Heart-shaped cakes and desserts for Valentine's  |
| Formal/Celebration      | `formal-celebration`  | Elegant multi-layer cakes for formal events      |
| Character-Themed        | `character-themed`    | Cakes with character designs (Kuromi, Disney, etc.) |
| Cupcake Sets            | `cupcake-sets`        | Cupcake bundles and cake + cupcake packages      |

| Column        | Type          | Constraints               | Description                    |
| ------------- | ------------- | ------------------------- | ------------------------------ |
| `id`          | `uuid`        | PK, default `gen_random_uuid()` | Unique identifier         |
| `name`        | `text`        | NOT NULL, UNIQUE          | Category display name          |
| `slug`        | `text`        | NOT NULL, UNIQUE          | URL-friendly name              |
| `description` | `text`        | NULLABLE                  | Optional description           |
| `image_url`   | `text`        | NULLABLE                  | Optional category image        |
| `sort_order`  | `integer`     | DEFAULT 0                 | Display order                  |
| `created_at`  | `timestamptz` | DEFAULT now()             | Record creation time           |
| `updated_at`  | `timestamptz` | DEFAULT now()             | Last update time               |

---

### 2. `products`

Core product table for all cake/dessert items.

| Column          | Type          | Constraints               | Description                          |
| --------------- | ------------- | ------------------------- | ------------------------------------ |
| `id`            | `uuid`        | PK, default `gen_random_uuid()` | Unique identifier               |
| `category_id`   | `uuid`        | FK → categories.id, NULLABLE | Primary category                  |
| `name`          | `text`        | NOT NULL                  | Product display name                 |
| `slug`          | `text`        | NOT NULL, UNIQUE          | URL-friendly name                    |
| `description`   | `text`        | NOT NULL                  | Full product description             |
| `base_price`    | `decimal(10,2)` | NOT NULL                | Starting price (smallest size)       |
| `lead_time_days`| `integer`     | NOT NULL, DEFAULT 2       | Minimum advance order days           |
| `is_visible`    | `boolean`     | NOT NULL, DEFAULT true    | Show on public site                  |
| `is_featured`   | `boolean`     | NOT NULL, DEFAULT false   | Show on homepage featured section    |
| `is_deleted`    | `boolean`     | NOT NULL, DEFAULT false   | Soft delete flag                     |
| `created_at`    | `timestamptz` | DEFAULT now()             | Record creation time                 |
| `updated_at`    | `timestamptz` | DEFAULT now()             | Last update time                     |

**Indexes:**
- `idx_products_slug` on `slug` (unique)
- `idx_products_category` on `category_id`
- `idx_products_visible` on `is_visible, is_deleted`

---

### 3. `product_sizes`

Available sizes and their prices for each product.

| Column        | Type          | Constraints               | Description                    |
| ------------- | ------------- | ------------------------- | ------------------------------ |
| `id`          | `uuid`        | PK, default `gen_random_uuid()` | Unique identifier         |
| `product_id`  | `uuid`        | FK → products.id, NOT NULL, ON DELETE CASCADE | Parent product |
| `name`        | `text`        | NOT NULL                  | Size name (e.g., "6 inch", "8 inch", "10 inch") |
| `price`       | `decimal(10,2)` | NOT NULL                | Price for this size            |
| `sort_order`  | `integer`     | DEFAULT 0                 | Display order                  |
| `created_at`  | `timestamptz` | DEFAULT now()             | Record creation time           |

---

### 4. `product_flavors`

Available flavors for each product.

| Column        | Type          | Constraints               | Description                    |
| ------------- | ------------- | ------------------------- | ------------------------------ |
| `id`          | `uuid`        | PK, default `gen_random_uuid()` | Unique identifier         |
| `product_id`  | `uuid`        | FK → products.id, NOT NULL, ON DELETE CASCADE | Parent product |
| `name`        | `text`        | NOT NULL                  | Flavor name (e.g., "Chocolate", "Vanilla", "Ube") |
| `sort_order`  | `integer`     | DEFAULT 0                 | Display order                  |
| `created_at`  | `timestamptz` | DEFAULT now()             | Record creation time           |

---

### 5. `product_images`

Images associated with a product (main image + gallery).

| Column        | Type          | Constraints               | Description                    |
| ------------- | ------------- | ------------------------- | ------------------------------ |
| `id`          | `uuid`        | PK, default `gen_random_uuid()` | Unique identifier         |
| `product_id`  | `uuid`        | FK → products.id, NOT NULL, ON DELETE CASCADE | Parent product |
| `url`         | `text`        | NOT NULL                  | Public URL from Supabase Storage |
| `storage_path`| `text`        | NOT NULL                  | Path in Supabase Storage bucket  |
| `is_main`     | `boolean`     | NOT NULL, DEFAULT false   | True for the primary display image |
| `sort_order`  | `integer`     | DEFAULT 0                 | Gallery display order          |
| `created_at`  | `timestamptz` | DEFAULT now()             | Record creation time           |

**Constraint:** Each product should have exactly one image where `is_main = true`.

---

### 6. `orders`

Core order table tracking each customer order.

| Column             | Type          | Constraints               | Description                          |
| ------------------ | ------------- | ------------------------- | ------------------------------------ |
| `id`               | `uuid`        | PK, default `gen_random_uuid()` | Unique identifier               |
| `reference_number` | `text`        | NOT NULL, UNIQUE          | Human-readable order ref (e.g., JCD-20260318-001) |
| `status`           | `text`        | NOT NULL, DEFAULT 'pending' | Order status (see enum below)     |
| `fulfillment_type` | `text`        | NOT NULL                  | "pickup" or "delivery"               |
| `subtotal`         | `decimal(10,2)` | NOT NULL                | Sum of order items                   |
| `delivery_fee`     | `decimal(10,2)` | NOT NULL, DEFAULT 0     | Delivery fee (0 for pickup)          |
| `total`            | `decimal(10,2)` | NOT NULL                | subtotal + delivery_fee              |
| `payment_method`   | `text`        | NOT NULL, DEFAULT 'cash'  | Always "cash" in MVP                 |
| `payment_status`   | `text`        | NOT NULL, DEFAULT 'unpaid'| "unpaid" or "paid"                   |
| `preferred_date`   | `date`        | NOT NULL                  | Requested pickup/delivery date       |
| `preferred_time`   | `text`        | NOT NULL                  | Requested time (e.g., "10:00 AM")    |
| `special_instructions` | `text`    | NULLABLE                  | Additional notes from customer       |
| `cancellation_reason`  | `text`    | NULLABLE                  | Reason if cancelled                  |
| `created_at`       | `timestamptz` | DEFAULT now()             | Order placement time                 |
| `updated_at`       | `timestamptz` | DEFAULT now()             | Last update time                     |

**Status enum values:**
- `pending`
- `confirmed`
- `preparing`
- `ready_for_pickup`
- `out_for_delivery`
- `completed`
- `cancelled`

**Payment status values:**
- `unpaid`
- `paid`

**Reference Number Format:** `JCD-YYYYMMDD-NNN` (e.g., JCD-20260318-001)
- JCD = Jessa Cakes Delights initials
- Date of order
- Sequential number per day (padded to 3 digits)

**Indexes:**
- `idx_orders_status` on `status`
- `idx_orders_created` on `created_at`
- `idx_orders_reference` on `reference_number` (unique)

---

### 7. `order_items`

Individual items within an order (a single order can have multiple items).

| Column          | Type          | Constraints               | Description                          |
| --------------- | ------------- | ------------------------- | ------------------------------------ |
| `id`            | `uuid`        | PK, default `gen_random_uuid()` | Unique identifier               |
| `order_id`      | `uuid`        | FK → orders.id, NOT NULL, ON DELETE CASCADE | Parent order          |
| `product_id`    | `uuid`        | FK → products.id, NULLABLE | Product ref (nullable for deleted products) |
| `product_name`  | `text`        | NOT NULL                  | Snapshot of product name at order time |
| `size`          | `text`        | NOT NULL                  | Selected size name                   |
| `flavor`        | `text`        | NOT NULL                  | Selected flavor                      |
| `quantity`       | `integer`     | NOT NULL, DEFAULT 1       | Number of items                      |
| `unit_price`    | `decimal(10,2)` | NOT NULL                | Price per unit at order time         |
| `line_total`    | `decimal(10,2)` | NOT NULL                | quantity × unit_price                |
| `cake_message`  | `text`        | NULLABLE                  | Custom message on cake               |
| `created_at`    | `timestamptz` | DEFAULT now()             | Record creation time                 |

> **Important:** `product_name`, `size`, `flavor`, and `unit_price` are snapshotted at order time. This ensures order history remains accurate even if the product is later edited or deleted.

---

### 8. `customer_details`

Customer contact information per order. Not a user account — just contact info.

| Column        | Type          | Constraints               | Description                    |
| ------------- | ------------- | ------------------------- | ------------------------------ |
| `id`          | `uuid`        | PK, default `gen_random_uuid()` | Unique identifier         |
| `order_id`    | `uuid`        | FK → orders.id, NOT NULL, UNIQUE, ON DELETE CASCADE | 1:1 with order |
| `full_name`   | `text`        | NOT NULL                  | Customer full name             |
| `phone`       | `text`        | NOT NULL                  | Phone number                   |
| `email`       | `text`        | NOT NULL                  | Email address                  |
| `created_at`  | `timestamptz` | DEFAULT now()             | Record creation time           |

---

### 9. `delivery_details`

Delivery address info — only created for delivery orders.

| Column          | Type          | Constraints               | Description                    |
| --------------- | ------------- | ------------------------- | ------------------------------ |
| `id`            | `uuid`        | PK, default `gen_random_uuid()` | Unique identifier         |
| `order_id`      | `uuid`        | FK → orders.id, NOT NULL, UNIQUE, ON DELETE CASCADE | 1:1 with order |
| `street_address` | `text`       | NOT NULL                  | Street and house number        |
| `barangay`      | `text`        | NULLABLE                  | Barangay or area               |
| `city`          | `text`        | NOT NULL                  | City / municipality            |
| `landmarks`     | `text`        | NULLABLE                  | Nearby landmarks for navigation |
| `created_at`    | `timestamptz` | DEFAULT now()             | Record creation time           |

---

### 10. `site_settings`

Key-value store for configurable business settings.

| Column        | Type          | Constraints               | Description                    |
| ------------- | ------------- | ------------------------- | ------------------------------ |
| `id`          | `uuid`        | PK, default `gen_random_uuid()` | Unique identifier         |
| `key`         | `text`        | NOT NULL, UNIQUE          | Setting key                    |
| `value`       | `text`        | NOT NULL                  | Setting value (JSON string for complex values) |
| `updated_at`  | `timestamptz` | DEFAULT now()             | Last update time               |

**Initial settings:**

| Key                    | Example Value                              |
| ---------------------- | ------------------------------------------ |
| `business_name`        | `"Jessa Cakes Delights"`                   |
| `business_phone`       | `"+639XXXXXXXXX"` *(confirm with owner)*   |
| `business_email`       | `"jessacakesdelights@gmail.com"` *(confirm)* |
| `business_address`     | `"Malandag, Zamboanga del Sur, Philippines"` |
| `operating_hours`      | `"Mon-Sat 8:00 AM - 6:00 PM"`             |
| `delivery_fee`         | `"100.00"` *(confirm with owner)*          |
| `delivery_areas`       | `"Within Malandag and nearby areas"`       |
| `pickup_address`       | `"Jessa Cakes Delights Shop, Malandag, Zamboanga del Sur"` |
| `social_facebook`      | `"https://facebook.com/jessacakesmalandag"` *(confirm)* |
| `social_instagram`     | `""` *(confirm if exists)*                 |
| `minimum_lead_time_days` | `"2"`                                    |

---

## Pickup vs. Delivery Data Handling

### Pickup Orders
- `orders.fulfillment_type` = `"pickup"`
- `orders.delivery_fee` = `0`
- **No `delivery_details` record created**
- Pickup address comes from `site_settings` (key: `pickup_address`)
- Customer chooses date/time stored in `orders.preferred_date` and `orders.preferred_time`

### Delivery Orders
- `orders.fulfillment_type` = `"delivery"`
- `orders.delivery_fee` = value from `site_settings` (key: `delivery_fee`)
- **A `delivery_details` record is created** with full address
- Customer chooses date/time stored in `orders.preferred_date` and `orders.preferred_time`
- Total = subtotal + delivery_fee

---

## Cash Payment Representation

Since all payments are cash (no online transactions):

- `orders.payment_method` is always `"cash"` in MVP
- `orders.payment_status` starts as `"unpaid"` when order is placed
- Admin manually sets `payment_status` to `"paid"` when cash is received (at pickup or delivery)
- There is no payment gateway, transaction ID, or payment processing table
- The field exists as `payment_method` to support future payment methods (GCash, etc.) without schema changes

---

## Authentication & Roles

### Supabase Auth (Built-in)
- Admin users are created in **Supabase Auth** (not in a custom users table)
- Supabase provides: `auth.users` table (managed by Supabase), JWT tokens, session management
- Admin is identified by their Supabase Auth user ID

### Role Handling (MVP)
- **MVP:** Single role — any authenticated user is an admin
- All authenticated users have full dashboard access
- No custom `users` table needed for MVP

### Future Enhancement
- Add a `profiles` table linked to `auth.users` for role-based access:

| Column        | Type          | Description                    |
| ------------- | ------------- | ------------------------------ |
| `id`          | `uuid`        | FK → auth.users.id             |
| `full_name`   | `text`        | Display name                   |
| `role`        | `text`        | "admin" or "staff"             |
| `created_at`  | `timestamptz` | Record creation time           |

---

## File / Image Storage

### Supabase Storage Setup
- **Bucket name:** `product-images`
- **Access:** Public bucket (images need to be viewable by all visitors)
- **File naming convention:** `products/{product_id}/{timestamp}_{filename}`
- **Allowed types:** `image/jpeg`, `image/png`, `image/webp`
- **Max file size:** 5 MB

**Existing assets to migrate:**
- 16 product images from the existing PDF catalog (described in `files/jessa_cakes_image_descriptions.txt`)
- Business logo (`files/logo.jpg`) — store in a `branding` bucket or serve as a static asset

**Note:** The `files/images/` folder is currently empty. The actual cake images from the PDF catalog will need to be extracted/provided by the owner and uploaded to Supabase Storage during initial setup.

### Storage Flow
1. Admin uploads image via dashboard form
2. Client sends file to Supabase Storage via `supabase.storage.from('product-images').upload()`
3. On success, get the public URL
4. Save the URL and storage path in `product_images` table
5. On deletion, remove from both `product_images` table and Supabase Storage

---

## Audit Fields

All tables include:
- `created_at` (`timestamptz`, DEFAULT `now()`) — set once at insert
- `updated_at` (`timestamptz`, DEFAULT `now()`) — updated on every modification

### Auto-Update `updated_at`

Create a Postgres trigger to automatically update `updated_at`:

```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to each table:
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Repeat for: categories, orders, site_settings
```

---

## Row Level Security (RLS)

Supabase uses RLS by default. Recommended policies:

| Table              | Public (anon) Access           | Authenticated Access          |
| ------------------ | ------------------------------ | ----------------------------- |
| `categories`       | SELECT (all)                   | ALL (CRUD)                    |
| `products`         | SELECT (where visible & not deleted) | ALL (CRUD)              |
| `product_sizes`    | SELECT (all)                   | ALL (CRUD)                    |
| `product_flavors`  | SELECT (all)                   | ALL (CRUD)                    |
| `product_images`   | SELECT (all)                   | ALL (CRUD)                    |
| `orders`           | INSERT (create order)          | ALL (CRUD)                    |
| `order_items`      | INSERT (with order)            | SELECT, UPDATE                |
| `customer_details` | INSERT (with order)            | SELECT                        |
| `delivery_details` | INSERT (with order)            | SELECT                        |
| `site_settings`    | SELECT (all)                   | ALL (CRUD)                    |

> Public users can only read product data and insert orders. All other operations require authentication.
