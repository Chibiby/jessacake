# Project Memory — Jessa Cakes Delights

> Long-term context file for AI assistants and developers working on this project.
> Always read this file first before making changes to the codebase.

---

## What This Project Is

**Jessa Cakes Delights** is the official website for a local cake and desserts business based in **Malandag, Malungon, Sarangani Province, Philippines**. It combines:
1. A **public-facing marketing website** where customers browse cakes and place orders
2. A **protected admin dashboard** where the owner manages products and orders

This is a **real business tool** — not a demo or portfolio piece. Every decision should prioritize the business owner's ability to run her shop efficiently.

### Business History
- **2018**: Founded as a home-based cake business by Jessa. Orders through personal contacts and social media.
- **Pandemic era**: Demand for home-delivered cakes grew. Business adapted with online ordering and delivery, gaining wider recognition.
- **2021**: Expanded to a **dedicated physical shop** in Malandag, Malungon, Sarangani Province due to growing popularity.
- **Today**: Thrives combining homemade charm with professional service.

### Brand Assets (Available in `files/` folder)
- **Logo**: `files/logo.jpg` — "Jessa Cakes" in pink cursive script, cupcake illustration, pink flowers, gold leaf accents, whisk, piping bag
- **Product catalog descriptions**: `files/jessa_cakes_image_descriptions.txt` — 16 cake images with pricing and event types
- **Business history**: `files/history.txt` — Written brand story
- **Images folder**: `files/images/` — Currently empty; actual cake photos need to be extracted from PDF catalog

---

## Main Business Rules

1. **Cash only** — No online payments. All payments are cash on pickup or cash on delivery.
2. **No customer accounts** — Guests order without registering. Contact info is collected per order.
3. **Made-to-order cakes** — Most products require advance ordering (2–3 days default lead time).
4. **Two fulfillment types** — Pickup (at the shop in Malandag, Malungon, Sarangani Province) or Delivery (within Malandag, Malungon, Sarangani Province area).
5. **Delivery fee** — Flat rate, configurable by admin. Applied only to delivery orders.
6. **Single location** — One physical shop in **Malandag, Malungon, Sarangani Province, Philippines** (since 2021).
7. **Small team** — 1 admin (owner Jessa), possibly 1–2 staff. No complex role hierarchy in MVP.
8. **Low volume** — Orders are manageable through a dashboard without automation.
9. **Product visibility** — Admin can show/hide products without deleting them.
10. **Order data snapshots** — Product name, size, flavor, and price are snapshotted in order items to preserve history even if the product changes later.
11. **Price range** — ₱180 (small desserts) to ₱3,000+ (3-layer formal cakes) based on existing catalog.
12. **Product sizing** — Products use layer-based sizing (1-layer, 2-layer, 3-layer) and/or inch-based (6", 8", 10").
13. **Cupcake bundles** — Some products are cake + cupcake packages priced as a set.

---

## Main User Roles

| Role           | Access                  | Description                              |
| -------------- | ----------------------- | ---------------------------------------- |
| **Guest**      | Public pages only       | Browses products, places orders          |
| **Admin**      | Full dashboard access   | Manages products, categories, orders     |
| **Staff** (future) | Limited dashboard  | Views/updates orders only (not in MVP)   |

---

## Important Design Direction

- **Color theme**: Pink-based, feminine, sweet, modern, professional
- **Primary brand color**: `#D4276A` (Rose — matches logo script gradient)
- **Accent color**: `#C9A96E` (Gold — matches logo leaf accents)
- **Logo font style**: Flowing cursive script (use Dancing Script for digital wordmark)
- **Heading font**: Playfair Display (serif, elegant)
- **Body font**: Inter (sans-serif, readable)
- **UI library**: shadcn/ui components with Tailwind CSS
- **Icons**: Lucide React
- **Design feel**: Clean, spacious, inviting — matching the logo's cupcake-and-flowers aesthetic
- **Mobile-first**: Most customers browse on mobile
- **Logo file**: `files/logo.jpg` — use as-is for navbar and branding

---

## Technical Stack

| Layer            | Technology                |
| ---------------- | ------------------------- |
| Framework        | Next.js 14+ (App Router)  |
| Language         | TypeScript                |
| Styling          | Tailwind CSS              |
| Components       | shadcn/ui                 |
| Icons            | Lucide React              |
| Backend/DB       | Supabase (PostgreSQL)     |
| Auth             | Supabase Auth             |
| File Storage     | Supabase Storage          |
| Validation       | Zod                       |
| Deployment       | Vercel                    |
| Version Control  | GitHub                    |

---

## Core Workflows

### Customer Orders a Cake
1. Browse products on `/cakes`
2. View product detail on `/cakes/[slug]`
3. Click "Order This Cake" → goes to `/order?product=[slug]`
4. Fill out: customer info, product details, fulfillment type, date/time
5. If delivery → fill address, delivery fee added
6. Review order summary → submit
7. See confirmation page with reference number
8. Order appears in admin dashboard as `pending`

### Admin Manages Products
1. Log in at `/admin/login`
2. Go to `/admin/products`
3. Add/edit/delete/hide products
4. Upload images to Supabase Storage
5. Changes reflect on public site immediately

### Admin Manages Orders
1. View orders at `/admin/orders`
2. Filter by status, type, date
3. Click order → view full details
4. Update status: pending → confirmed → preparing → ready/out → completed
5. Mark as paid when cash received
6. Cancel if needed

---

## Order Status Flow

```
pending → confirmed → preparing → ready_for_pickup → completed
                                → out_for_delivery  → completed
Any active status → cancelled
```

---

## Key Constraints

1. **No online payments** — Cash only. Do not build payment gateway integration.
2. **No customer accounts** — Do not add registration/login for customers.
3. **No inventory tracking** — Products are shown/hidden manually by admin.
4. **No real-time notifications** — No SMS, email, or push notifications in MVP.
5. **No multi-item cart** — MVP: one product per order. (Multi-item is a post-MVP enhancement.)
6. **Free tier limits** — Stay within Supabase free tier (500 MB DB, 1 GB storage) and Vercel free tier.
7. **Single admin** — No role-based access control in MVP. Any authenticated user is admin.
8. **Philippine context** — Phone numbers are PH format (09XX or +639XX). Currency is PHP (₱).

---

## What Should NEVER Be Forgotten

1. **Payment is always cash** — Never add payment forms or gateways to MVP.
2. **Snapshot order data** — Always copy product name, price, size, flavor into `order_items` at order time. Never rely on a live product reference for historical orders.
3. **Protect admin routes** — All `/admin/*` routes (except login) must check authentication via middleware.
4. **Validate server-side** — Never trust client-side validation alone. All form data must be validated with Zod on the server.
5. **Soft delete products** — Don't hard-delete products that have orders. Use `is_deleted` flag.
6. **Images are required** — Every product must have at least one main image.
7. **Lead time enforcement** — Order date picker must prevent selecting dates before today + product lead time.
8. **Delivery fee from settings** — Don't hardcode the delivery fee. Read it from `site_settings` table.
9. **Reference number format** — `JCD-YYYYMMDD-NNN` (e.g., JCD-20260318-001).
10. **Mobile first** — Always test on mobile. Most customers will use phones.
11. **Rose brand color `#D4276A`** — This is the primary brand color (derived from logo). Use it consistently.
12. **Gold accent `#C9A96E`** — For premium elements, featured badges, decorative accents (from logo leaves).
13. **Supabase RLS** — Always enable and test Row Level Security. Public users must not access admin data.
14. **Logo is available** — Use `files/logo.jpg` directly. Do not recreate the logo.
15. **Location is Malandag** — The business is in Malandag, Zamboanga del Sur, Philippines. Use this in all address/location references.
16. **Real categories** — Birthday, Christening, Graduation, Valentine's, Formal/Celebration, Character-Themed, Cupcake Sets.
17. **Real price range** — ₱180 to ₱3,000+. Small desserts start at ₱180, standard cakes ₱500–₱850, multi-layer ₱1,150–₱3,000.

---

## Database Tables (Quick Reference)

- `categories` — Product categories (Birthday, Christening, Graduation, Valentine's, Formal/Celebration, Character-Themed, Cupcake Sets)
- `products` — Cake products with name, description, price, visibility, featured flag
- `product_sizes` — Available sizes per product with individual prices
- `product_flavors` — Available flavors per product
- `product_images` — Image URLs per product (main + gallery)
- `orders` — Customer orders with status, fulfillment type, totals, payment status
- `order_items` — Individual items in an order (snapshotted product data)
- `customer_details` — Customer contact info per order (1:1 with orders)
- `delivery_details` — Delivery address per order (only for delivery orders)
- `site_settings` — Key-value settings (business info, delivery fee, etc.)

---

## Environment Variables Needed

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
```

---

## Key File Paths (Planned)

```
src/app/                    → Next.js App Router pages
src/components/             → Reusable React components
src/lib/actions/            → Server actions (mutations)
src/lib/queries/            → Data fetching functions
src/lib/validators/         → Zod validation schemas
src/lib/supabase/           → Supabase client utilities
src/types/                  → TypeScript type definitions
```
