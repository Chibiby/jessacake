# Implementation Plan — Jessa Cakes Delights

> Phased development plan from project setup to deployment.

---

## Phase Overview

| Phase | Name                    | Duration (Est.) | Focus                              |
| ----- | ----------------------- | --------------- | ---------------------------------- |
| 1     | Project Setup           | 1–2 days        | Tooling, config, Supabase, Git     |
| 2     | UI Foundation           | 2–3 days        | Design system, shared components   |
| 3     | Public Pages            | 3–4 days        | Marketing pages, product catalog   |
| 4     | Auth & Dashboard Shell  | 2–3 days        | Login, layout, route protection    |
| 5     | Product Management      | 3–4 days        | Admin CRUD, image upload           |
| 6     | Ordering System         | 3–4 days        | Order form, order management       |
| 7     | Testing & Deployment    | 2–3 days        | QA, polish, deploy                 |

**Total estimated duration:** 16–23 working days (3–5 weeks for a solo developer)

---

## Phase 1: Project Setup

### Tasks

| #   | Task                                              | Priority |
| --- | ------------------------------------------------- | -------- |
| 1.1 | Initialize Next.js project with TypeScript        | High     |
| 1.2 | Install and configure Tailwind CSS                | High     |
| 1.3 | Install shadcn/ui and configure theme             | High     |
| 1.4 | Install Lucide React icons                        | High     |
| 1.5 | Set up project folder structure (`src/app`, `src/components`, `src/lib`, `src/types`) | High |
| 1.6 | Create Supabase project (free tier)               | High     |
| 1.7 | Set up Supabase database tables (run SQL migrations) | High  |
| 1.8 | Create Supabase Storage bucket (`product-images`) | High     |
| 1.9 | Configure Supabase RLS policies                   | High     |
| 1.10| Install `@supabase/supabase-js` and `@supabase/ssr` | High  |
| 1.11| Create Supabase client utilities (browser + server) | High  |
| 1.12| Set up `.env.local` with Supabase keys            | High     |
| 1.13| Initialize Git repository                         | High     |
| 1.14| Create `.gitignore` (exclude `.env.local`, `node_modules`, `.next`) | High |
| 1.15| Push initial commit to GitHub                     | High     |
| 1.16| Set up ESLint and Prettier                        | Medium   |
| 1.17| Configure `next.config.ts` (images domains, etc.) | Medium   |
| 1.18| Install Zod for validation                        | High     |
| 1.19| Set up Google Fonts (Playfair Display + Inter)    | Medium   |

### Deliverables
- Running Next.js dev server with Tailwind and shadcn/ui
- Supabase project with all tables, RLS, and storage
- Git repo on GitHub with initial commit
- Environment variables configured

### Dependencies
- Supabase account created
- GitHub account and repo created

---

## Phase 2: UI Foundation

### Tasks

| #   | Task                                              | Priority |
| --- | ------------------------------------------------- | -------- |
| 2.1 | Configure Tailwind theme with custom colors (rose palette, neutrals, semantic colors) | High |
| 2.2 | Set up global CSS (fonts, base styles)            | High     |
| 2.3 | Build public layout (`src/app/layout.tsx`) — root layout with fonts | High |
| 2.4 | Build Navbar component (logo, nav links, mobile hamburger menu) | High |
| 2.5 | Build Footer component (business info, links, social icons) | High |
| 2.6 | Build reusable Button variants (primary, secondary, ghost, danger) | High |
| 2.7 | Build reusable Card component                     | High     |
| 2.8 | Build reusable form components (Input, Select, Textarea, Toggle, DatePicker) | High |
| 2.9 | Build Section/Container wrapper components        | Medium   |
| 2.10| Build loading skeleton components                 | Medium   |
| 2.11| Build toast/notification system (using shadcn Sonner or Toast) | Medium |
| 2.12| Build empty state component                       | Medium   |
| 2.13| Build badge/pill component for statuses and categories | Medium |
| 2.14| Create TypeScript type definitions (`src/types/index.ts`) | High |
| 2.15| Create constants file (order statuses, payment statuses, etc.) | High |

### Deliverables
- Complete design system with reusable components
- Public layout with Navbar and Footer
- TypeScript types for all database entities
- Consistent styling matching the UI/UX Style Guide

### Dependencies
- Phase 1 complete (project setup, Tailwind configured)

---

## Phase 3: Public Pages

### Tasks

| #   | Task                                              | Priority |
| --- | ------------------------------------------------- | -------- |
| 3.1 | Build Homepage (`/`) — Hero, Featured Products, About teaser, CTA | High |
| 3.2 | Build About page (`/about`) — Brand story, owner bio | High   |
| 3.3 | Build Contact page (`/contact`) — Info, social links, optional map | High |
| 3.4 | Build FAQ page (`/faq`) — Accordion Q&A           | Medium   |
| 3.5 | Build Product Catalog page (`/cakes`) — Grid layout with category filter | High |
| 3.6 | Build ProductCard component (image, name, price, category badge) | High |
| 3.7 | Build Product Detail page (`/cakes/[slug]`) — Gallery, info, sizes, flavors, CTA | High |
| 3.8 | Build ProductGallery component (main image + thumbnails) | High |
| 3.9 | Create product data queries (`src/lib/queries/products.ts`) | High |
| 3.10| Create category data queries (`src/lib/queries/categories.ts`) | High |
| 3.11| Add SEO meta tags to all public pages             | Medium   |
| 3.12| Build 404 page (`not-found.tsx`)                  | Medium   |
| 3.13| Add loading states (skeletons) to product pages   | Medium   |
| 3.14| Seed database with real categories (Birthday, Christening, Graduation, Valentine's, Formal, Character-Themed, Cupcake Sets) and products from existing catalog (16 items with pricing from `files/jessa_cakes_image_descriptions.txt`) | High |
| 3.15| Test all public pages on mobile and desktop        | High    |

### Deliverables
- All public pages built and rendering with real data
- Product catalog with category filtering
- Product detail pages with image galleries
- Responsive layouts tested on mobile and desktop
- Real category and product data seeded in Supabase from existing catalog

### Dependencies
- Phase 2 complete (UI components, layout)
- Supabase tables created and seeded with sample data

---

## Phase 4: Auth & Dashboard Shell

### Tasks

| #   | Task                                              | Priority |
| --- | ------------------------------------------------- | -------- |
| 4.1 | Create Supabase Auth admin user (via Supabase dashboard) | High |
| 4.2 | Build auth utility functions (`src/lib/actions/auth.ts`) | High |
| 4.3 | Build Admin Login page (`/admin/login`)           | High     |
| 4.4 | Implement sign-in server action with Supabase Auth | High    |
| 4.5 | Implement sign-out server action                  | High     |
| 4.6 | Build Next.js middleware for route protection (`middleware.ts`) | High |
| 4.7 | Build Dashboard layout (`/admin/layout.tsx`) — Sidebar + top bar + content area | High |
| 4.8 | Build Sidebar component with navigation links     | High     |
| 4.9 | Build Dashboard Home page (`/admin`) — Stats cards + recent orders | High |
| 4.10| Create dashboard stats query (`getDashboardStats`) | High    |
| 4.11| Test auth flow: login → dashboard → logout → redirect | High |
| 4.12| Test middleware: unauthenticated access → redirect to login | High |
| 4.13| Build responsive sidebar (collapsible on mobile)  | Medium   |
| 4.14| Build breadcrumb component for dashboard          | Low      |

### Deliverables
- Working admin login/logout flow
- Protected dashboard routes with middleware
- Dashboard layout with sidebar navigation
- Dashboard home with stats (may show zeros until orders exist)

### Dependencies
- Phase 1 complete (Supabase Auth configured)
- Phase 2 complete (UI components)

---

## Phase 5: Product Management (Admin)

### Tasks

| #   | Task                                              | Priority |
| --- | ------------------------------------------------- | -------- |
| 5.1 | Build Product List page (`/admin/products`) — Table with filters | High |
| 5.2 | Build Add Product page (`/admin/products/new`) — Full form | High |
| 5.3 | Build Edit Product page (`/admin/products/[id]/edit`) — Pre-filled form | High |
| 5.4 | Build image upload component (file picker, preview, progress) | High |
| 5.5 | Create image upload API route (`/api/upload-image`) | High    |
| 5.6 | Create image delete API route (`/api/delete-image`) | High    |
| 5.7 | Create product server actions (create, update, delete, toggle visibility) | High |
| 5.8 | Create product validation schema (Zod) | High |
| 5.9 | Build size management UI (add/remove size rows with prices) | High |
| 5.10| Build flavor management UI (add/remove flavor tags) | High   |
| 5.11| Build Category Management page (`/admin/categories`) | High  |
| 5.12| Create category server actions (CRUD)              | High    |
| 5.13| Create category validation schema                  | High    |
| 5.14| Test full product CRUD flow                        | High    |
| 5.15| Test image upload/delete flow                      | High    |
| 5.16| Verify products appear correctly on public pages   | High    |

### Deliverables
- Full product CRUD from admin dashboard
- Image upload to Supabase Storage working
- Category management working
- Product changes reflected on public site immediately

### Dependencies
- Phase 3 complete (public product pages exist to verify)
- Phase 4 complete (auth and dashboard shell)
- Supabase Storage bucket configured

---

## Phase 6: Ordering System

### Tasks

| #   | Task                                              | Priority |
| --- | ------------------------------------------------- | -------- |
| 6.1 | Build Order Form page (`/order`) — Multi-section form | High  |
| 6.2 | Build customer info section (name, phone, email)  | High     |
| 6.3 | Build product selection section (product, size, flavor, qty, cake message) | High |
| 6.4 | Build fulfillment type toggle (Pickup / Delivery) | High     |
| 6.5 | Build date/time picker with lead time enforcement | High     |
| 6.6 | Build delivery address section (conditional)      | High     |
| 6.7 | Build order summary section (itemized, totals)    | High     |
| 6.8 | Create order validation schema (Zod)              | High     |
| 6.9 | Create order submission server action (`createOrder`) | High  |
| 6.10| Generate order reference number logic              | High    |
| 6.11| Build Order Confirmation page (`/order/confirmation`) | High |
| 6.12| Build Order List page (`/admin/orders`) — Table with status/type/date filters | High |
| 6.13| Build Order Detail page (`/admin/orders/[id]`) — Full detail with actions | High |
| 6.14| Create order management server actions (status update, payment toggle, cancel) | High |
| 6.15| Build status update buttons with proper flow logic | High   |
| 6.16| Build payment status toggle                       | High     |
| 6.17| Create settings queries for delivery fee and business info | Medium |
| 6.18| Test full order flow: form → submit → admin view → status updates | High |
| 6.19| Test pickup flow end-to-end                       | High     |
| 6.20| Test delivery flow end-to-end                     | High     |
| 6.21| Test validation and error states                  | High     |

### Deliverables
- Working order form with pickup/delivery flows
- Order confirmation page with reference number
- Admin order list with filters
- Admin order detail with status management
- Full end-to-end ordering flow tested

### Dependencies
- Phase 3 complete (product data for order form)
- Phase 4 complete (dashboard for order management)
- Phase 5 complete (products exist to order)

---

## Phase 7: Testing & Deployment

### Tasks

| #   | Task                                              | Priority |
| --- | ------------------------------------------------- | -------- |
| 7.1 | Cross-browser testing (Chrome, Safari, Firefox, Edge) | High  |
| 7.2 | Mobile responsiveness testing (320px – 1440px)    | High     |
| 7.3 | Run Lighthouse audit — target score ≥ 85          | Medium   |
| 7.4 | Fix any accessibility issues (contrast, labels, focus) | Medium |
| 7.5 | Test all forms with invalid data (validation)     | High     |
| 7.6 | Test edge cases (empty states, 404s, session expiry) | High  |
| 7.7 | Review and fix any console errors or warnings     | High     |
| 7.8 | Optimize images and loading performance           | Medium   |
| 7.9 | Add Open Graph meta tags for social sharing       | Medium   |
| 7.10| Connect GitHub repo to Vercel                     | High     |
| 7.11| Configure environment variables on Vercel         | High     |
| 7.12| Deploy to Vercel (initial deployment)             | High     |
| 7.13| Test production deployment end-to-end             | High     |
| 7.14| Configure Supabase for production (check RLS, storage policies) | High |
| 7.15| Create admin user in production Supabase          | High     |
| 7.16| Seed production data (7 categories, 16 products from catalog, site settings with Malandag address) | High   |
| 7.17| Final review and sign-off                         | High     |

### Deliverables
- Fully tested application across browsers and devices
- Production deployment on Vercel
- Production Supabase with data and admin user
- All critical flows working in production

### Dependencies
- All previous phases complete
- Vercel account set up
- Production Supabase ready

---

## Recommended Development Order

```
Week 1:  Phase 1 (Setup) → Phase 2 (UI Foundation)
Week 2:  Phase 3 (Public Pages)
Week 3:  Phase 4 (Auth & Dashboard) → Phase 5 Start (Products)
Week 4:  Phase 5 Complete (Products) → Phase 6 Start (Ordering)
Week 5:  Phase 6 Complete (Ordering) → Phase 7 (Test & Deploy)
```

> This timeline assumes a solo developer working full-time. Adjust for part-time or team development.

---

## Post-MVP Enhancements (Prioritized)

| Priority | Enhancement                                   | Estimated Effort |
| -------- | --------------------------------------------- | ---------------- |
| 1        | Email order confirmations (Resend or similar) | 1–2 days         |
| 2        | Admin site settings management page           | 1 day            |
| 3        | Customer order tracking page (by ref number)  | 1–2 days         |
| 4        | Product search on catalog page                | 0.5 day          |
| 5        | Related products on product detail            | 0.5 day          |
| 6        | Staff role with limited permissions           | 2–3 days         |
| 7        | GCash/PayMaya payment integration             | 3–5 days         |
| 8        | Analytics dashboard for admin                 | 2–3 days         |
| 9        | Blog section for content marketing            | 2–3 days         |
| 10       | Reviews and ratings system                    | 2–3 days         |
