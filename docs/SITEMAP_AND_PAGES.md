# Sitemap & Pages — Jessa Cakes Delights

---

## Full Sitemap

```
/                              → Homepage
/cakes                         → Product Catalog (all cakes)
/cakes/[slug]                  → Product Detail Page
/order                         → Order Form Page
/order/confirmation            → Order Confirmation Page
/about                         → About Us
/contact                       → Contact Us
/faq                           → Frequently Asked Questions
/admin/login                   → Admin Login
/admin                         → Admin Dashboard Home
/admin/products                → Product List (Admin)
/admin/products/new            → Add New Product (Admin)
/admin/products/[id]/edit      → Edit Product (Admin)
/admin/categories              → Category Management (Admin)
/admin/orders                  → Order List (Admin)
/admin/orders/[id]             → Order Detail (Admin)
/admin/settings                → Site Settings (Admin)
```

---

## Public Pages

### `/` — Homepage

| Attribute       | Detail                                                            |
| --------------- | ----------------------------------------------------------------- |
| **Purpose**     | First impression; showcase brand, featured products, and CTA      |
| **Route**       | `/` (root)                                                        |
| **Auth**        | None                                                              |
| **Key Components** | Hero banner with CTA, Featured products grid, About teaser, Testimonials section (static for MVP), Call-to-action section, Footer |
| **Data Source** | Featured products from DB (where `is_featured = true`)            |

### `/cakes` — Product Catalog

| Attribute       | Detail                                                            |
| --------------- | ----------------------------------------------------------------- |
| **Purpose**     | Browse all available cake products                                |
| **Route**       | `/cakes`                                                          |
| **Auth**        | None                                                              |
| **Key Components** | Page header, Category filter tabs/pills, Product grid (cards), Empty state for no results |
| **Data Source** | Products from DB (where `is_visible = true`), Categories from DB  |
| **Query Params**| `?category=<slug>` for filtering                                  |

### `/cakes/[slug]` — Product Detail

| Attribute       | Detail                                                            |
| --------------- | ----------------------------------------------------------------- |
| **Purpose**     | Show full details of a single product                             |
| **Route**       | `/cakes/[slug]` (dynamic)                                         |
| **Auth**        | None                                                              |
| **Key Components** | Image gallery, Product name and description, Size/price table, Available flavors list, Lead time notice, "Order This Cake" CTA button, Related products (optional) |
| **Data Source** | Single product + images from DB                                   |
| **Error State** | 404 if slug is invalid or product is hidden                       |

### `/order` — Order Form

| Attribute       | Detail                                                            |
| --------------- | ----------------------------------------------------------------- |
| **Purpose**     | Allow customers to place a cake order                             |
| **Route**       | `/order`                                                          |
| **Auth**        | None                                                              |
| **Key Components** | Multi-section form: Customer info, Product selection (pre-filled if coming from product page), Size, flavor, quantity, cake message, Fulfillment type toggle (Pickup / Delivery), Date and time picker, Delivery address fields (conditional), Special instructions, Order summary sidebar/section, Submit button, Cash payment notice |
| **Query Params**| `?product=<slug>` to pre-select product                           |
| **Validation**  | Client-side + server-side (see PRD validation rules)              |

### `/order/confirmation` — Order Confirmation

| Attribute       | Detail                                                            |
| --------------- | ----------------------------------------------------------------- |
| **Purpose**     | Confirm order was placed successfully                             |
| **Route**       | `/order/confirmation`                                             |
| **Auth**        | None                                                              |
| **Key Components** | Success icon/illustration, Order reference number, Order summary, Next steps instructions, "Back to Home" / "Browse More Cakes" buttons |
| **Data Source** | Order data passed via state or query param (reference number)     |

### `/about` — About Us

| Attribute       | Detail                                                            |
| --------------- | ----------------------------------------------------------------- |
| **Purpose**     | Tell the brand story, build trust                                 |
| **Route**       | `/about`                                                          |
| **Auth**        | None                                                              |
| **Key Components** | Brand story section, Owner/baker photo and bio, Values / what makes us special, Location image or map embed |
| **Data Source** | Static content (hardcoded or from settings)                       |

### `/contact` — Contact Us

| Attribute       | Detail                                                            |
| --------------- | ----------------------------------------------------------------- |
| **Purpose**     | Provide all contact information and location                      |
| **Route**       | `/contact`                                                        |
| **Auth**        | None                                                              |
| **Key Components** | Phone number, Email address, Physical address, Operating hours, Social media links (Facebook, Instagram), Google Maps embed (optional), Simple contact form (optional — sends to email or stores in DB) |
| **Data Source** | Static content or site settings from DB                           |

### `/faq` — FAQ

| Attribute       | Detail                                                            |
| --------------- | ----------------------------------------------------------------- |
| **Purpose**     | Answer common questions to reduce customer inquiries              |
| **Route**       | `/faq`                                                            |
| **Auth**        | None                                                              |
| **Key Components** | Accordion-style FAQ list grouped by topic (Ordering, Delivery, Payment, Products) |
| **Data Source** | Static content (hardcoded or from settings table)                 |
| **Topics**      | How to order, Lead times, Delivery areas, Payment info, Custom cakes, Cancellations |

---

## Auth Pages

### `/admin/login` — Admin Login

| Attribute       | Detail                                                            |
| --------------- | ----------------------------------------------------------------- |
| **Purpose**     | Authenticate admin/staff users                                    |
| **Route**       | `/admin/login`                                                    |
| **Auth**        | Public (redirects to dashboard if already logged in)              |
| **Key Components** | Login form (email + password), Error message display, "Forgot password" link (optional), Jessa Cakes branding |
| **Behavior**    | On success → redirect to `/admin`. On fail → show error.         |

---

## Dashboard Pages (Admin — Protected)

> All `/admin/*` routes (except `/admin/login`) require authentication. Unauthenticated users are redirected to `/admin/login`.

### `/admin` — Dashboard Home

| Attribute       | Detail                                                            |
| --------------- | ----------------------------------------------------------------- |
| **Purpose**     | Overview of business activity                                     |
| **Route**       | `/admin`                                                          |
| **Key Components** | Stat cards (Total orders today, Pending orders, Total products, Revenue today), Recent orders table (last 10), Quick action buttons (Add Product, View Orders) |
| **Data Source** | Aggregated order data, recent orders from DB                      |

### `/admin/products` — Product List

| Attribute       | Detail                                                            |
| --------------- | ----------------------------------------------------------------- |
| **Purpose**     | View and manage all products                                      |
| **Route**       | `/admin/products`                                                 |
| **Key Components** | Product table (image thumb, name, category, price, status, actions), Search bar, Category filter dropdown, "Add Product" button, Visibility toggle per row, Edit/Delete action buttons |
| **Data Source** | All products from DB (visible and hidden)                         |

### `/admin/products/new` — Add New Product

| Attribute       | Detail                                                            |
| --------------- | ----------------------------------------------------------------- |
| **Purpose**     | Create a new product                                              |
| **Route**       | `/admin/products/new`                                             |
| **Key Components** | Product form: name, slug (auto-generated), description (rich text or textarea), category selection, base price, sizes with individual prices, flavors (multi-select or tag input), lead time (days), image uploader (main + gallery), visibility toggle, featured toggle, Save / Cancel buttons |
| **Behavior**    | On save → redirect to product list with success toast             |

### `/admin/products/[id]/edit` — Edit Product

| Attribute       | Detail                                                            |
| --------------- | ----------------------------------------------------------------- |
| **Purpose**     | Edit an existing product                                          |
| **Route**       | `/admin/products/[id]/edit`                                       |
| **Key Components** | Same form as Add Product, pre-filled with existing data, Image management (reorder, delete, add new), Save / Cancel / Delete buttons |
| **Data Source** | Single product + images from DB                                   |
| **Behavior**    | On save → redirect to product list with success toast             |

### `/admin/categories` — Category Management

| Attribute       | Detail                                                            |
| --------------- | ----------------------------------------------------------------- |
| **Purpose**     | Manage product categories                                         |
| **Route**       | `/admin/categories`                                               |
| **Key Components** | Category list/table, Inline add/edit form (or modal), Delete button with confirmation, Product count per category |
| **Data Source** | Categories from DB with product counts                            |

### `/admin/orders` — Order List

| Attribute       | Detail                                                            |
| --------------- | ----------------------------------------------------------------- |
| **Purpose**     | View and manage all customer orders                               |
| **Route**       | `/admin/orders`                                                   |
| **Key Components** | Order table (ref#, customer name, date, status, total, type, payment status), Status filter tabs (All, Pending, Confirmed, Preparing, Ready, Completed, Cancelled), Fulfillment type filter (All, Pickup, Delivery), Date range filter, Click row to view detail |
| **Data Source** | Orders from DB with customer and item details                     |

### `/admin/orders/[id]` — Order Detail

| Attribute       | Detail                                                            |
| --------------- | ----------------------------------------------------------------- |
| **Purpose**     | View full order details and manage status                         |
| **Route**       | `/admin/orders/[id]`                                              |
| **Key Components** | Order reference number and date, Customer info (name, phone, email), Order items list (product, size, flavor, qty, price, cake message), Fulfillment details (pickup address or delivery address), Order total breakdown (items + delivery fee), Status badge and status update buttons, Payment status toggle (Paid / Unpaid), Cancel order button, Order timeline/history (optional for MVP) |
| **Data Source** | Single order with items, customer, and delivery details from DB   |

### `/admin/settings` — Site Settings

| Attribute       | Detail                                                            |
| --------------- | ----------------------------------------------------------------- |
| **Purpose**     | Configure site-wide settings                                      |
| **Route**       | `/admin/settings`                                                 |
| **Key Components** | Business info (name, phone, email, address, hours), Delivery fee amount, Delivery areas / notes, Social media links, Operating hours |
| **Data Source** | Settings table or JSON config in DB                               |
| **Priority**    | Medium (can be hardcoded for initial MVP)                         |

---

## Next.js App Router Structure

```
src/
├── app/
│   ├── layout.tsx                    → Root layout (public)
│   ├── page.tsx                      → Homepage (/)
│   ├── cakes/
│   │   ├── page.tsx                  → Product Catalog (/cakes)
│   │   └── [slug]/
│   │       └── page.tsx              → Product Detail (/cakes/[slug])
│   ├── order/
│   │   ├── page.tsx                  → Order Form (/order)
│   │   └── confirmation/
│   │       └── page.tsx              → Order Confirmation (/order/confirmation)
│   ├── about/
│   │   └── page.tsx                  → About Us (/about)
│   ├── contact/
│   │   └── page.tsx                  → Contact Us (/contact)
│   ├── faq/
│   │   └── page.tsx                  → FAQ (/faq)
│   └── admin/
│       ├── login/
│       │   └── page.tsx              → Admin Login (/admin/login)
│       ├── layout.tsx                → Dashboard layout (sidebar, auth guard)
│       ├── page.tsx                  → Dashboard Home (/admin)
│       ├── products/
│       │   ├── page.tsx              → Product List (/admin/products)
│       │   ├── new/
│       │   │   └── page.tsx          → Add Product (/admin/products/new)
│       │   └── [id]/
│       │       └── edit/
│       │           └── page.tsx      → Edit Product (/admin/products/[id]/edit)
│       ├── categories/
│       │   └── page.tsx              → Categories (/admin/categories)
│       ├── orders/
│       │   ├── page.tsx              → Order List (/admin/orders)
│       │   └── [id]/
│       │       └── page.tsx          → Order Detail (/admin/orders/[id])
│       └── settings/
│           └── page.tsx              → Site Settings (/admin/settings)
├── components/
│   ├── ui/                           → shadcn/ui components
│   ├── layout/                       → Navbar, Footer, Sidebar
│   ├── products/                     → ProductCard, ProductGrid, ProductGallery
│   ├── order/                        → OrderForm, OrderSummary
│   └── admin/                        → Dashboard widgets, data tables
├── lib/
│   ├── supabase/                     → Supabase client, server client, middleware
│   ├── utils.ts                      → Utility functions
│   ├── constants.ts                  → App-wide constants
│   └── validators.ts                 → Zod schemas for validation
├── types/
│   └── index.ts                      → TypeScript type definitions
└── styles/
    └── globals.css                   → Global styles, Tailwind imports
```
