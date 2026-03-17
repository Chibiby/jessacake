# MVP Build Plan — Jessa Cakes Delights

> Refined, MVP-first build sequence. Follow this step-by-step.

---

## MVP Definition

The **Minimum Viable Product** is the smallest version of the website that delivers real value to the business:

1. Customers can **browse cakes** on a beautiful, mobile-friendly site
2. Customers can **place orders** (pickup or delivery, cash only)
3. Admin can **log in** and **manage products** (add, edit, delete, hide)
4. Admin can **view and manage orders** (status updates, payment tracking)

### What's IN the MVP

- Homepage, About, Contact, FAQ (public)
- Product catalog with category filtering (public)
- Product detail pages (public)
- Order form with pickup/delivery (public)
- Order confirmation page (public)
- Admin login (auth)
- Admin dashboard with stats (admin)
- Product CRUD + image upload (admin)
- Category management (admin)
- Order list + detail + status management (admin)
- Responsive design (mobile + desktop)
- Supabase backend (DB, auth, storage)
- Vercel deployment

### What's NOT in the MVP

- Email/SMS notifications
- Customer accounts
- Online payments (GCash, PayMaya)
- Staff roles
- Analytics/reporting
- Blog
- Promo codes
- Reviews/ratings
- Admin site settings page (hardcode for MVP)

---

## Build Sequence

### Step 1: Initialize Project (Day 1)

```
Goal: Running Next.js dev server with all dependencies configured
```

| Task | Detail |
| ---- | ------ |
| 1.1 | Initialize Next.js 14+ with TypeScript and App Router |
| 1.2 | Install Tailwind CSS, configure with brand colors (`#D4276A` rose, `#C9A96E` gold) |
| 1.3 | Install and init shadcn/ui |
| 1.4 | Install dependencies: `@supabase/supabase-js`, `@supabase/ssr`, `zod`, `lucide-react` |
| 1.5 | Set up folder structure: `src/app`, `src/components`, `src/lib`, `src/types` |
| 1.6 | Add Google Fonts: Playfair Display, Inter, Dancing Script |
| 1.7 | Create `.env.local` and `.env.example` |
| 1.8 | Create `.gitignore` |
| 1.9 | Create Supabase client utilities (browser + server) |
| 1.10 | Create TypeScript type definitions for all DB entities |
| 1.11 | Create constants file (order statuses, payment statuses, categories) |
| 1.12 | Create Zod validation schemas (product, order, category) |
| 1.13 | Create utility functions (slug generation, reference number, formatting) |
| 1.14 | Init Git, first commit, push to GitHub |

**Deliverable:** Running project skeleton with all config and utilities ready.

---

### Step 2: Supabase Setup (Day 1–2)

```
Goal: Database, auth, and storage fully configured
```

| Task | Detail |
| ---- | ------ |
| 2.1 | Create Supabase project (free tier) |
| 2.2 | Run SQL migration: create all 10 tables |
| 2.3 | Run SQL: create `update_updated_at` trigger function |
| 2.4 | Apply triggers to relevant tables |
| 2.5 | Configure RLS policies for all tables |
| 2.6 | Create `product-images` storage bucket (public) |
| 2.7 | Create admin user via Supabase Auth dashboard |
| 2.8 | Seed categories (7 real categories) |
| 2.9 | Seed site_settings (business name, address, delivery fee, hours) |
| 2.10 | Test Supabase connection from Next.js |

**Deliverable:** Fully configured Supabase with tables, RLS, storage, and seed data.

**SQL migration file:** `supabase/seed.sql` (included in project structure)

---

### Step 3: UI Foundation (Day 2–3)

```
Goal: Reusable components and layouts ready
```

| Task | Detail |
| ---- | ------ |
| 3.1 | Configure global CSS (Tailwind base, fonts, custom properties) |
| 3.2 | Build root layout (`src/app/layout.tsx`) with fonts and metadata |
| 3.3 | Build Navbar component (logo from `files/logo.jpg`, nav links, mobile menu) |
| 3.4 | Build Footer component (business info, social links, quick links) |
| 3.5 | Install shadcn/ui components: Button, Card, Input, Select, Textarea, Badge, Dialog, Toast, Tabs, Accordion, Table, DropdownMenu, Sheet, Switch, Separator |
| 3.6 | Build status badge component (order statuses with semantic colors) |
| 3.7 | Build empty state component |
| 3.8 | Build loading skeleton components (product card, table row) |
| 3.9 | Build page header/section container components |

**Deliverable:** Full component library, public layout with Navbar + Footer.

---

### Step 4: Public Pages (Day 3–5)

```
Goal: All public marketing pages live with real data
```

| Task | Detail |
| ---- | ------ |
| 4.1 | Build Homepage: Hero section, Featured products, About teaser, CTA |
| 4.2 | Build About page using content from `files/history.txt` |
| 4.3 | Build Contact page (Malandag address, phone, email, social, hours) |
| 4.4 | Build FAQ page with accordion (common cake ordering questions) |
| 4.5 | Build Product Catalog page (`/cakes`) with category filter tabs |
| 4.6 | Build ProductCard component |
| 4.7 | Build Product Detail page (`/cakes/[slug]`) with gallery, sizes, flavors |
| 4.8 | Build ProductGallery component (main image + thumbnails) |
| 4.9 | Create product query functions (`getProducts`, `getProductBySlug`, `getFeaturedProducts`) |
| 4.10 | Create category query functions (`getCategories`) |
| 4.11 | Build 404 page |
| 4.12 | Add SEO meta tags to all pages |
| 4.13 | Test responsiveness on mobile |

**Deliverable:** All public pages rendering with real product data from Supabase.

---

### Step 5: Auth & Dashboard Shell (Day 5–7)

```
Goal: Admin login working, dashboard layout built
```

| Task | Detail |
| ---- | ------ |
| 5.1 | Build Admin Login page (`/admin/login`) |
| 5.2 | Create auth server actions (signIn, signOut) |
| 5.3 | Build Next.js middleware for `/admin/*` route protection |
| 5.4 | Build Dashboard layout (`/admin/layout.tsx`) with sidebar + content area |
| 5.5 | Build Sidebar component (nav links with Lucide icons) |
| 5.6 | Build Dashboard Home (`/admin`) with stat cards and recent orders |
| 5.7 | Create dashboard stats query |
| 5.8 | Test: login → dashboard → logout → redirect cycle |

**Deliverable:** Working auth flow, protected dashboard with stats.

---

### Step 6: Product Management (Day 7–10)

```
Goal: Admin can fully manage products and categories
```

| Task | Detail |
| ---- | ------ |
| 6.1 | Build Product List page (`/admin/products`) with table |
| 6.2 | Build Add Product form (`/admin/products/new`) |
| 6.3 | Build Edit Product form (`/admin/products/[id]/edit`) |
| 6.4 | Build image upload component (file picker, preview) |
| 6.5 | Create image upload/delete API routes |
| 6.6 | Build size management UI (dynamic add/remove rows) |
| 6.7 | Build flavor management UI (tag input) |
| 6.8 | Create product server actions (create, update, delete, toggleVisibility) |
| 6.9 | Build Category Management page (`/admin/categories`) |
| 6.10 | Create category server actions (CRUD) |
| 6.11 | Seed initial products from catalog data (16 products) |
| 6.12 | Test full CRUD + verify changes on public site |

**Deliverable:** Full product CRUD with image upload, category management.

---

### Step 7: Ordering System (Day 10–14)

```
Goal: Customers can place orders, admin can manage them
```

| Task | Detail |
| ---- | ------ |
| 7.1 | Build Order Form page (`/order`) — multi-section form |
| 7.2 | Build customer info section |
| 7.3 | Build product selection section (pre-fill from query param) |
| 7.4 | Build fulfillment toggle (Pickup / Delivery) with conditional fields |
| 7.5 | Build date/time picker with lead time enforcement |
| 7.6 | Build delivery address section |
| 7.7 | Build order summary component with totals |
| 7.8 | Create order submission server action |
| 7.9 | Build order reference number generation |
| 7.10 | Build Order Confirmation page (`/order/confirmation`) |
| 7.11 | Build Order List page (`/admin/orders`) with filters |
| 7.12 | Build Order Detail page (`/admin/orders/[id]`) with status controls |
| 7.13 | Create order management server actions (status update, payment toggle, cancel) |
| 7.14 | Test: full order → admin view → status cycle → completion |
| 7.15 | Test: pickup flow end-to-end |
| 7.16 | Test: delivery flow end-to-end |

**Deliverable:** Complete ordering system — customer form to admin management.

---

### Step 8: Polish & Deploy (Day 14–16)

```
Goal: Production-ready and deployed
```

| Task | Detail |
| ---- | ------ |
| 8.1 | Cross-browser testing (Chrome, Safari, Firefox, Edge) |
| 8.2 | Mobile responsiveness audit (320px – 1440px) |
| 8.3 | Lighthouse audit — target ≥ 85 |
| 8.4 | Fix accessibility issues (contrast, labels, focus states) |
| 8.5 | Add Open Graph meta tags for social sharing |
| 8.6 | Connect GitHub → Vercel |
| 8.7 | Set environment variables on Vercel |
| 8.8 | Deploy to production |
| 8.9 | Create admin user on production Supabase |
| 8.10 | Seed production data (categories, products, settings) |
| 8.11 | Final end-to-end test on production |

**Deliverable:** Live website at `jessa-cakes-delights.vercel.app` (or custom domain).

---

## Timeline Summary

| Step | Focus | Days | Cumulative |
| ---- | ----- | ---- | ---------- |
| 1 | Project Init | 1 | 1 |
| 2 | Supabase Setup | 1 | 2 |
| 3 | UI Foundation | 1–2 | 3–4 |
| 4 | Public Pages | 2–3 | 5–7 |
| 5 | Auth & Dashboard | 2 | 7–9 |
| 6 | Product Management | 3 | 10–12 |
| 7 | Ordering System | 3–4 | 13–16 |
| 8 | Polish & Deploy | 2 | 15–18 |

**Total: ~16–18 working days** for a solo developer.

---

## Post-MVP Roadmap (Priority Order)

| # | Feature | Effort | Value |
| - | ------- | ------ | ----- |
| 1 | Email order confirmations (Resend) | 1–2 days | High |
| 2 | Admin site settings page | 1 day | High |
| 3 | Customer order lookup by ref # | 1 day | Medium |
| 4 | Product search on catalog | 0.5 day | Medium |
| 5 | Multi-item orders (cart) | 2–3 days | Medium |
| 6 | Staff role with limited access | 2–3 days | Medium |
| 7 | GCash/PayMaya payment | 3–5 days | Medium |
| 8 | SMS notifications (Semaphore) | 1–2 days | Medium |
| 9 | Analytics dashboard | 2–3 days | Low |
| 10 | Blog section | 2–3 days | Low |
