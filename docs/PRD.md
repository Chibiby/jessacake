# Product Requirements Document (PRD) — Jessa Cakes Delights

---

## Product Summary

Jessa Cakes Delights is a responsive web application for a local cake business based in **Malandag, Malungon, Sarangani Province, Philippines**. Founded in 2018 as a home-based bakery and operating from a dedicated shop since 2021, the business specializes in custom-designed cakes for birthdays, christenings, graduations, Valentine's Day, formal celebrations, and character-themed events.

The website combines a public-facing marketing storefront with an admin dashboard. Customers can browse products (priced from ₱180 to ₱3,000+) and place orders for pickup or delivery (cash only). The admin manages products, categories, and orders through a protected dashboard.

---

## Problem Statement

The business currently relies on social media and messaging apps to showcase products and take orders. This creates several problems:

1. **No centralized product catalog** — Customers scroll through social media posts and a PDF catalog to find products and prices
2. **Inefficient ordering** — Orders come through chat messages, leading to miscommunication and lost orders
3. **No order tracking** — The owner manually tracks orders on paper or spreadsheets
4. **Unprofessional image** — Lack of a website reduces trust with potential customers (the business has been growing since 2018 and deserves a proper online presence)
5. **Limited reach** — Social media algorithms limit organic visibility beyond Malandag and nearby areas

A dedicated website solves these by providing a structured catalog, a clear ordering flow, and a management dashboard.

---

## Goals

| #  | Goal                                    | Priority |
| -- | --------------------------------------- | -------- |
| G1 | Launch a professional public website    | High     |
| G2 | Showcase products with rich details     | High     |
| G3 | Enable structured online ordering       | High     |
| G4 | Provide admin tools for product mgmt    | High     |
| G5 | Provide admin tools for order mgmt      | High     |
| G6 | Mobile-first responsive design          | High     |
| G7 | Achieve fast page loads (Lighthouse 85+)| Medium   |
| G8 | SEO fundamentals for discoverability    | Medium   |
| G9 | Deploy with zero hosting cost (MVP)     | Medium   |

---

## User Types

### Guest / Customer
- Anyone visiting the website
- No login required
- Can browse all public pages
- Can view product catalog and details
- Can place orders via the order form
- Provides contact info per order (not stored as an account)

### Admin (Owner)
- The business owner (Jessa)
- Logs in via email/password
- Full access to the admin dashboard
- Can manage products, categories, orders, and site content
- Single admin account for MVP

### Staff (Future — Not MVP)
- Employees with limited dashboard access
- Can view and update order statuses
- Cannot manage products or settings

---

## Functional Requirements

### FR-01: Public Website

| ID      | Requirement                                                        | Priority |
| ------- | ------------------------------------------------------------------ | -------- |
| FR-01.1 | Homepage with hero banner, featured products, business info        | High     |
| FR-01.2 | About page with business story, team, and location                 | High     |
| FR-01.3 | Contact page with phone, email, address, social links, map         | High     |
| FR-01.4 | FAQ page with common questions about ordering and delivery         | Medium   |
| FR-01.5 | Footer with business info, links, and social media                 | High     |
| FR-01.6 | Navigation bar with logo, links, and mobile hamburger menu         | High     |
| FR-01.7 | SEO meta tags and Open Graph tags on all pages                     | Medium   |

### FR-02: Product Catalog

| ID      | Requirement                                                        | Priority |
| ------- | ------------------------------------------------------------------ | -------- |
| FR-02.1 | Product listing page showing all visible products                  | High     |
| FR-02.2 | Category filtering (Birthday, Christening, Graduation, Valentine's, Formal/Celebration, Character-Themed, Cupcake Sets) | High |
| FR-02.3 | Search/filter by name (optional for MVP)                           | Low      |
| FR-02.4 | Product card showing image, name, price range, category badge      | High     |
| FR-02.5 | Product detail page with gallery, description, sizes, flavors      | High     |
| FR-02.6 | Price display per size/variant                                     | High     |
| FR-02.7 | Lead time / advance order notice on product detail                 | Medium   |
| FR-02.8 | "Order This Cake" CTA button on product detail page                | High     |
| FR-02.9 | Related products section on product detail page                    | Low      |

### FR-03: Ordering System

| ID      | Requirement                                                        | Priority |
| ------- | ------------------------------------------------------------------ | -------- |
| FR-03.1 | Order form accessible from product detail page or standalone       | High     |
| FR-03.2 | Customer info: full name, phone number, email                      | High     |
| FR-03.3 | Product selection: product, size, flavor, quantity                  | High     |
| FR-03.4 | Custom cake message field (e.g., "Happy Birthday, Maria!")         | High     |
| FR-03.5 | Special instructions / notes field                                 | Medium   |
| FR-03.6 | Fulfillment type selection: Pickup or Delivery                     | High     |
| FR-03.7 | Preferred date and time for pickup/delivery                        | High     |
| FR-03.8 | Order summary with itemized total before submission                | High     |
| FR-03.9 | Order confirmation screen after submission                         | High     |
| FR-03.10| Order reference number generated upon submission                   | High     |

### FR-04: Pickup Flow

| ID      | Requirement                                                        | Priority |
| ------- | ------------------------------------------------------------------ | -------- |
| FR-04.1 | When "Pickup" is selected, show pickup address and hours           | High     |
| FR-04.2 | Customer selects preferred pickup date and time                    | High     |
| FR-04.3 | Minimum lead time enforced (e.g., at least 2 days for custom)     | High     |
| FR-04.4 | No delivery fee applied                                            | High     |
| FR-04.5 | Payment: cash on pickup                                            | High     |

### FR-05: Delivery Flow

| ID      | Requirement                                                        | Priority |
| ------- | ------------------------------------------------------------------ | -------- |
| FR-05.1 | When "Delivery" is selected, show delivery address form            | High     |
| FR-05.2 | Delivery address fields: street, barangay/area, city, landmarks   | High     |
| FR-05.3 | Delivery fee displayed (flat rate or configurable by admin)        | High     |
| FR-05.4 | Delivery fee added to order total                                  | High     |
| FR-05.5 | Customer selects preferred delivery date and time                  | High     |
| FR-05.6 | Minimum lead time enforced                                         | High     |
| FR-05.7 | Payment: cash on delivery                                          | High     |

### FR-06: Payment Handling

| ID      | Requirement                                                        | Priority |
| ------- | ------------------------------------------------------------------ | -------- |
| FR-06.1 | Payment method is cash only (no online transactions)               | High     |
| FR-06.2 | Payment is collected at pickup or delivery                         | High     |
| FR-06.3 | Order form clearly states "Cash Payment Only"                      | High     |
| FR-06.4 | Admin can mark an order as "Paid" in the dashboard                 | High     |
| FR-06.5 | Payment status tracked per order: Unpaid / Paid                    | High     |

### FR-07: Admin Authentication

| ID      | Requirement                                                        | Priority |
| ------- | ------------------------------------------------------------------ | -------- |
| FR-07.1 | Admin login page with email and password                           | High     |
| FR-07.2 | Authentication via Supabase Auth                                   | High     |
| FR-07.3 | Session-based auth with automatic redirect if not logged in        | High     |
| FR-07.4 | Logout functionality                                               | High     |
| FR-07.5 | Protected routes — all `/admin/*` pages require auth               | High     |
| FR-07.6 | Password reset via Supabase (email link)                           | Medium   |

### FR-08: Admin Dashboard

| ID      | Requirement                                                        | Priority |
| ------- | ------------------------------------------------------------------ | -------- |
| FR-08.1 | Dashboard home with quick stats (total orders, pending, today's)   | High     |
| FR-08.2 | Recent orders list on dashboard home                               | High     |
| FR-08.3 | Navigation sidebar for dashboard sections                          | High     |
| FR-08.4 | Responsive dashboard layout                                        | High     |

### FR-09: Product Management (Admin)

| ID      | Requirement                                                        | Priority |
| ------- | ------------------------------------------------------------------ | -------- |
| FR-09.1 | List all products with search, filter by category, and status      | High     |
| FR-09.2 | Add new product with all fields                                    | High     |
| FR-09.3 | Edit existing product                                              | High     |
| FR-09.4 | Delete product (soft delete or hard delete)                        | High     |
| FR-09.5 | Toggle product visibility (show/hide on public site)               | High     |
| FR-09.6 | Upload product images (1 main + up to 4 gallery images)            | High     |
| FR-09.7 | Set product sizes with individual pricing                          | High     |
| FR-09.8 | Set available flavors                                              | High     |
| FR-09.9 | Assign product to one or more categories                           | High     |
| FR-09.10| Set lead time / advance order requirement                          | Medium   |
| FR-09.11| Set product as "featured" for homepage display                     | Medium   |

### FR-10: Category Management (Admin)

| ID      | Requirement                                                        | Priority |
| ------- | ------------------------------------------------------------------ | -------- |
| FR-10.1 | List all categories                                                | High     |
| FR-10.2 | Add new category (name, slug, optional image)                      | High     |
| FR-10.3 | Edit category                                                      | High     |
| FR-10.4 | Delete category (with product reassignment warning)                | Medium   |
| FR-10.5 | Set display order for categories                                   | Low      |

### FR-11: Order Management (Admin)

| ID      | Requirement                                                        | Priority |
| ------- | ------------------------------------------------------------------ | -------- |
| FR-11.1 | List all orders with filters (status, date, fulfillment type)      | High     |
| FR-11.2 | View full order details                                            | High     |
| FR-11.3 | Update order status                                                | High     |
| FR-11.4 | Mark order as paid/unpaid                                          | High     |
| FR-11.5 | Cancel order with optional reason                                  | High     |
| FR-11.6 | View customer contact info and delivery details                    | High     |
| FR-11.7 | Order status flow: Pending → Confirmed → Preparing → Ready/Out → Completed | High |

---

## Non-Functional Requirements

| ID     | Requirement                                            | Target                        |
| ------ | ------------------------------------------------------ | ----------------------------- |
| NFR-01 | Page load time                                         | < 3 seconds on 4G mobile      |
| NFR-02 | Mobile responsiveness                                  | 320px to 1440px+ breakpoints   |
| NFR-03 | Lighthouse performance score                           | ≥ 85 (mobile)                  |
| NFR-04 | Accessibility                                          | WCAG 2.1 Level AA basics       |
| NFR-05 | Image optimization                                     | WebP/AVIF, lazy loading, Next/Image |
| NFR-06 | SEO                                                    | Meta tags, OG tags, sitemap    |
| NFR-07 | Security — admin routes protected                      | Supabase Auth + middleware     |
| NFR-08 | Security — input validation                            | Server-side validation on all forms |
| NFR-09 | Security — SQL injection prevention                    | Parameterized queries via Supabase SDK |
| NFR-10 | Uptime                                                 | 99.9% (Vercel + Supabase SLA)  |
| NFR-11 | Data backup                                            | Supabase automatic backups     |
| NFR-12 | Browser support                                        | Chrome, Safari, Firefox, Edge (latest 2 versions) |

---

## Order Statuses

| Status              | Description                                       | Triggered By |
| ------------------- | ------------------------------------------------- | ------------ |
| `pending`           | Order submitted, awaiting admin review            | System       |
| `confirmed`         | Admin has confirmed the order                     | Admin        |
| `preparing`         | Cake is being prepared/baked                      | Admin        |
| `ready_for_pickup`  | Order is ready; customer can pick up              | Admin        |
| `out_for_delivery`  | Order is being delivered                          | Admin        |
| `completed`         | Order fulfilled and (optionally) paid             | Admin        |
| `cancelled`         | Order cancelled by admin or customer request      | Admin        |

---

## Validation Rules

### Customer Order Form

| Field                 | Rules                                                        |
| --------------------- | ------------------------------------------------------------ |
| Full Name             | Required, 2–100 characters                                   |
| Phone Number          | Required, valid phone format (PH mobile: 09XX or +639XX)     |
| Email                 | Required, valid email format                                 |
| Product               | Required, must be a valid product ID                         |
| Size                  | Required, must match available sizes for selected product    |
| Flavor                | Required, must match available flavors for selected product  |
| Quantity              | Required, integer, 1–20                                      |
| Cake Message          | Optional, max 100 characters                                 |
| Special Instructions  | Optional, max 500 characters                                 |
| Fulfillment Type      | Required, "pickup" or "delivery"                             |
| Preferred Date        | Required, must be today + lead time or later                 |
| Preferred Time        | Required, must be within operating hours                     |
| Delivery Address      | Required if delivery, min 10 characters                      |
| Delivery City         | Required if delivery                                         |

### Admin Product Form

| Field           | Rules                                                |
| --------------- | ---------------------------------------------------- |
| Product Name    | Required, 2–150 characters, unique                   |
| Description     | Required, 10–2000 characters                         |
| Category        | Required, at least one category                      |
| Base Price      | Required, positive number (₱), min ₱100, max 2 decimal places |
| Sizes           | At least one size with a price (e.g., 1-layer, 2-layer, 3-layer, or 6"/8"/10") |
| Flavors         | At least one flavor                                  |
| Lead Time       | Required, integer days (0 = same day available)      |
| Main Image      | Required, max 5 MB, JPG/PNG/WebP                    |
| Gallery Images  | Optional, max 4 images, max 5 MB each               |
| Visibility      | Default: visible                                     |

---

## Error States

| Scenario                                  | Behavior                                                  |
| ----------------------------------------- | --------------------------------------------------------- |
| Order form validation fails               | Inline error messages per field, form not submitted        |
| Order submission fails (server error)     | Toast error notification, form data preserved              |
| Product not found (invalid URL)           | 404 page displayed                                        |
| Admin login fails (wrong credentials)     | Error message on login form                               |
| Admin session expired                     | Redirect to login page with session expired message       |
| Image upload fails                        | Error toast, upload retry option                          |
| Image exceeds size limit                  | Client-side validation before upload, error message       |
| Delivery date is before minimum lead time | Date picker disables invalid dates, inline error message  |
| Product has been hidden after user opened it | Show "product unavailable" message                     |
| Duplicate order submission (double click) | Disable submit button after first click, debounce         |

---

## Edge Cases

| Edge Case                                           | Handling                                              |
| --------------------------------------------------- | ----------------------------------------------------- |
| Customer orders a product that admin hides mid-session | Validate product availability at submission time     |
| Admin deletes a product that has pending orders       | Soft delete; product hidden but order data preserved  |
| Multiple orders placed with same contact info         | Allowed — no customer accounts in MVP                 |
| Order placed outside operating hours                  | Allowed — order is queued; preferred date must be valid |
| Very long custom cake message                         | Enforce 100-character limit                           |
| Customer enters delivery address outside service area | MVP: no geo-validation; rely on admin review          |
| Admin updates order that was just cancelled           | Use optimistic locking or last-write-wins             |
| Image upload interrupted                              | Show retry option; don't save partial data            |
| Zero products in catalog                              | Show friendly empty state message                     |
| Browser back button after order submission            | Order form resets; no duplicate submission             |

---

## Acceptance Criteria

### AC-01: Homepage
- [ ] Hero section renders with image/text and CTA
- [ ] Featured products section shows up to 6 featured products
- [ ] Business info section displays location, hours, and contact
- [ ] Page is fully responsive (mobile and desktop)
- [ ] All links navigate correctly

### AC-02: Product Catalog
- [ ] All visible products display in a grid layout
- [ ] Category filter works and updates product list
- [ ] Each product card shows image, name, starting price, and category
- [ ] Clicking a product card navigates to product detail page
- [ ] Empty state displays when no products match filter

### AC-03: Product Detail
- [ ] Product images display in a gallery format
- [ ] All product info is shown (name, description, sizes, flavors, price, lead time)
- [ ] "Order This Cake" button navigates to order form with product pre-selected
- [ ] Page handles invalid product ID gracefully (404)

### AC-04: Order Placement
- [ ] Customer can fill out all required fields
- [ ] Pickup flow hides delivery fields, shows pickup info
- [ ] Delivery flow shows address fields and adds delivery fee
- [ ] Date picker enforces minimum lead time
- [ ] Order summary shows correct itemized total
- [ ] Successful submission shows confirmation with reference number
- [ ] Order appears in admin dashboard as "pending"

### AC-05: Admin Login
- [ ] Login page renders with email and password fields
- [ ] Successful login redirects to dashboard
- [ ] Failed login shows error message
- [ ] Accessing `/admin/*` without auth redirects to login
- [ ] Logout clears session and redirects to login

### AC-06: Product Management
- [ ] Admin can view list of all products
- [ ] Admin can create a new product with all fields and images
- [ ] Admin can edit an existing product
- [ ] Admin can delete a product
- [ ] Admin can toggle product visibility
- [ ] Product changes reflect on the public site

### AC-07: Order Management
- [ ] Admin can view list of all orders with filters
- [ ] Admin can view full order details
- [ ] Admin can update order status through the defined flow
- [ ] Admin can mark order as paid
- [ ] Admin can cancel an order
- [ ] Status changes are saved immediately
