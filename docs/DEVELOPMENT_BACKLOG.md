# Development Backlog — Jessa Cakes Delights

> Structured backlog with epics, user stories, developer tasks, and priorities.

---

## Legend

| Priority | Meaning                                     | MVP? |
| -------- | ------------------------------------------- | ---- |
| **High** | Must have for MVP launch                    | Yes  |
| **Medium** | Important but can launch without          | Yes* |
| **Low**  | Nice to have, post-MVP                      | No   |

---

## Epic 1: Project Foundation

> Set up the technical foundation for the entire project.

### User Stories

| ID     | Story                                                                | Priority | MVP |
| ------ | -------------------------------------------------------------------- | -------- | --- |
| E1-S01 | As a developer, I want a configured Next.js project so I can start building | High | Yes |
| E1-S02 | As a developer, I want Supabase connected so I can read/write data   | High     | Yes |
| E1-S03 | As a developer, I want a design system so the UI is consistent       | High     | Yes |

### Developer Tasks

| ID       | Task                                          | Story  | Priority | Status  |
| -------- | --------------------------------------------- | ------ | -------- | ------- |
| E1-T01   | Init Next.js with TypeScript                  | E1-S01 | High     | Pending |
| E1-T02   | Configure Tailwind CSS with custom theme      | E1-S01 | High     | Pending |
| E1-T03   | Install and configure shadcn/ui               | E1-S01 | High     | Pending |
| E1-T04   | Install Lucide React, Zod                     | E1-S01 | High     | Pending |
| E1-T05   | Set up folder structure                       | E1-S01 | High     | Pending |
| E1-T06   | Create Supabase project                       | E1-S02 | High     | Pending |
| E1-T07   | Run database migrations (all tables)          | E1-S02 | High     | Pending |
| E1-T08   | Configure Supabase Storage bucket             | E1-S02 | High     | Pending |
| E1-T09   | Set up RLS policies                           | E1-S02 | High     | Pending |
| E1-T10   | Create Supabase client utilities              | E1-S02 | High     | Pending |
| E1-T11   | Configure `.env.local`                        | E1-S02 | High     | Pending |
| E1-T12   | Init Git repo and push to GitHub              | E1-S01 | High     | Pending |
| E1-T13   | Set up Google Fonts (Playfair Display + Inter)| E1-S03 | High     | Pending |
| E1-T14   | Create TypeScript type definitions            | E1-S03 | High     | Pending |
| E1-T15   | Create constants file                         | E1-S03 | High     | Pending |
| E1-T16   | Set up ESLint + Prettier                      | E1-S01 | Medium   | Pending |

---

## Epic 2: Shared UI Components

> Build the reusable design system and layout components.

### User Stories

| ID     | Story                                                                | Priority | MVP |
| ------ | -------------------------------------------------------------------- | -------- | --- |
| E2-S01 | As a visitor, I want a clear navigation bar so I can find pages      | High     | Yes |
| E2-S02 | As a visitor, I want a consistent footer with business info          | High     | Yes |
| E2-S03 | As a developer, I want reusable UI components to build pages faster  | High     | Yes |

### Developer Tasks

| ID       | Task                                          | Story  | Priority | Status  |
| -------- | --------------------------------------------- | ------ | -------- | ------- |
| E2-T01   | Build root layout with fonts and metadata     | E2-S01 | High     | Pending |
| E2-T02   | Build Navbar (logo, links, mobile menu)       | E2-S01 | High     | Pending |
| E2-T03   | Build Footer (info, links, social icons)      | E2-S02 | High     | Pending |
| E2-T04   | Build Button component variants               | E2-S03 | High     | Pending |
| E2-T05   | Build Card component                          | E2-S03 | High     | Pending |
| E2-T06   | Build form components (Input, Select, etc.)   | E2-S03 | High     | Pending |
| E2-T07   | Build toast/notification system               | E2-S03 | Medium   | Pending |
| E2-T08   | Build loading skeleton components             | E2-S03 | Medium   | Pending |
| E2-T09   | Build empty state component                   | E2-S03 | Medium   | Pending |
| E2-T10   | Build status badge component                  | E2-S03 | Medium   | Pending |

---

## Epic 3: Public Marketing Pages

> Build the informational pages that market the business.

### User Stories

| ID     | Story                                                                | Priority | MVP |
| ------ | -------------------------------------------------------------------- | -------- | --- |
| E3-S01 | As a visitor, I want to see a beautiful homepage that shows what the business offers | High | Yes |
| E3-S02 | As a visitor, I want to learn about the business on an About page    | High     | Yes |
| E3-S03 | As a visitor, I want to find contact info and social links easily    | High     | Yes |
| E3-S04 | As a visitor, I want to read FAQs so I don't need to message        | Medium   | Yes |

### Developer Tasks

| ID       | Task                                          | Story  | Priority | Status  |
| -------- | --------------------------------------------- | ------ | -------- | ------- |
| E3-T01   | Build Homepage — Hero section                 | E3-S01 | High     | Pending |
| E3-T02   | Build Homepage — Featured products section    | E3-S01 | High     | Pending |
| E3-T03   | Build Homepage — About teaser section         | E3-S01 | High     | Pending |
| E3-T04   | Build Homepage — CTA section                  | E3-S01 | High     | Pending |
| E3-T05   | Build About page                              | E3-S02 | High     | Pending |
| E3-T06   | Build Contact page                            | E3-S03 | High     | Pending |
| E3-T07   | Build FAQ page with accordion                 | E3-S04 | Medium   | Pending |
| E3-T08   | Build 404 Not Found page                      | E3-S01 | Medium   | Pending |
| E3-T09   | Add SEO meta tags to all public pages         | E3-S01 | Medium   | Pending |

---

## Epic 4: Product Catalog (Public)

> Allow visitors to browse and view cake products.

### User Stories

| ID     | Story                                                                | Priority | MVP |
| ------ | -------------------------------------------------------------------- | -------- | --- |
| E4-S01 | As a visitor, I want to browse all cakes in a grid layout            | High     | Yes |
| E4-S02 | As a visitor, I want to filter cakes by category                     | High     | Yes |
| E4-S03 | As a visitor, I want to view full details of a specific cake         | High     | Yes |

### Developer Tasks

| ID       | Task                                          | Story  | Priority | Status  |
| -------- | --------------------------------------------- | ------ | -------- | ------- |
| E4-T01   | Create product queries (getProducts, etc.)    | E4-S01 | High     | Pending |
| E4-T02   | Create category queries                       | E4-S02 | High     | Pending |
| E4-T03   | Build ProductCard component                   | E4-S01 | High     | Pending |
| E4-T04   | Build Product Catalog page (/cakes)           | E4-S01 | High     | Pending |
| E4-T05   | Build category filter (tabs/pills)            | E4-S02 | High     | Pending |
| E4-T06   | Build Product Detail page (/cakes/[slug])     | E4-S03 | High     | Pending |
| E4-T07   | Build Product Gallery component               | E4-S03 | High     | Pending |
| E4-T08   | Build size/price table display                | E4-S03 | High     | Pending |
| E4-T09   | Build flavor list display                     | E4-S03 | High     | Pending |
| E4-T10   | Seed database with sample products            | E4-S01 | High     | Pending |
| E4-T11   | Add loading skeletons to product pages        | E4-S01 | Medium   | Pending |
| E4-T12   | Build related products section                | E4-S03 | Low      | Pending |

---

## Epic 5: Authentication

> Secure the admin area with login/logout functionality.

### User Stories

| ID     | Story                                                                | Priority | MVP |
| ------ | -------------------------------------------------------------------- | -------- | --- |
| E5-S01 | As an admin, I want to log in with email/password to access the dashboard | High | Yes |
| E5-S02 | As an admin, I want to log out securely                              | High     | Yes |
| E5-S03 | As a system, I want to protect admin routes from unauthorized access | High     | Yes |

### Developer Tasks

| ID       | Task                                          | Story  | Priority | Status  |
| -------- | --------------------------------------------- | ------ | -------- | ------- |
| E5-T01   | Create admin user in Supabase Auth            | E5-S01 | High     | Pending |
| E5-T02   | Build auth utility functions (signIn, signOut) | E5-S01 | High     | Pending |
| E5-T03   | Build Admin Login page                        | E5-S01 | High     | Pending |
| E5-T04   | Implement login server action                 | E5-S01 | High     | Pending |
| E5-T05   | Implement logout server action                | E5-S02 | High     | Pending |
| E5-T06   | Build middleware for route protection          | E5-S03 | High     | Pending |
| E5-T07   | Handle session expiry and redirect             | E5-S03 | High     | Pending |
| E5-T08   | Test auth flow end-to-end                      | E5-S01 | High     | Pending |

---

## Epic 6: Admin Dashboard

> Provide the admin with an overview and navigation hub.

### User Stories

| ID     | Story                                                                | Priority | MVP |
| ------ | -------------------------------------------------------------------- | -------- | --- |
| E6-S01 | As an admin, I want to see key stats (orders today, pending, etc.)   | High     | Yes |
| E6-S02 | As an admin, I want to see recent orders at a glance                 | High     | Yes |
| E6-S03 | As an admin, I want easy navigation to all management sections       | High     | Yes |

### Developer Tasks

| ID       | Task                                          | Story  | Priority | Status  |
| -------- | --------------------------------------------- | ------ | -------- | ------- |
| E6-T01   | Build dashboard layout (sidebar + content)    | E6-S03 | High     | Pending |
| E6-T02   | Build sidebar navigation with icons           | E6-S03 | High     | Pending |
| E6-T03   | Build stat cards (orders today, pending, etc.)| E6-S01 | High     | Pending |
| E6-T04   | Create dashboard stats query                  | E6-S01 | High     | Pending |
| E6-T05   | Build recent orders table                     | E6-S02 | High     | Pending |
| E6-T06   | Build quick action buttons                    | E6-S03 | Medium   | Pending |
| E6-T07   | Make sidebar responsive (collapsible mobile)  | E6-S03 | Medium   | Pending |

---

## Epic 7: Product Management (Admin)

> Allow the admin to manage cake products through the dashboard.

### User Stories

| ID     | Story                                                                | Priority | MVP |
| ------ | -------------------------------------------------------------------- | -------- | --- |
| E7-S01 | As an admin, I want to see all my products in a list                 | High     | Yes |
| E7-S02 | As an admin, I want to add a new product with images and details     | High     | Yes |
| E7-S03 | As an admin, I want to edit an existing product                      | High     | Yes |
| E7-S04 | As an admin, I want to delete a product                              | High     | Yes |
| E7-S05 | As an admin, I want to show/hide products on the public site         | High     | Yes |
| E7-S06 | As an admin, I want to manage product categories                     | High     | Yes |

### Developer Tasks

| ID       | Task                                          | Story  | Priority | Status  |
| -------- | --------------------------------------------- | ------ | -------- | ------- |
| E7-T01   | Build Product List page (admin)               | E7-S01 | High     | Pending |
| E7-T02   | Build Add Product form page                   | E7-S02 | High     | Pending |
| E7-T03   | Build Edit Product form page                  | E7-S03 | High     | Pending |
| E7-T04   | Build image upload component                  | E7-S02 | High     | Pending |
| E7-T05   | Create image upload/delete API routes         | E7-S02 | High     | Pending |
| E7-T06   | Build size management UI (dynamic rows)       | E7-S02 | High     | Pending |
| E7-T07   | Build flavor management UI (tags)             | E7-S02 | High     | Pending |
| E7-T08   | Create product server actions (CRUD)          | E7-S02 | High     | Pending |
| E7-T09   | Create product validation schemas             | E7-S02 | High     | Pending |
| E7-T10   | Build visibility toggle on product list       | E7-S05 | High     | Pending |
| E7-T11   | Build delete with confirmation dialog         | E7-S04 | High     | Pending |
| E7-T12   | Build Category Management page                | E7-S06 | High     | Pending |
| E7-T13   | Create category server actions                | E7-S06 | High     | Pending |
| E7-T14   | Test full product CRUD flow                   | E7-S02 | High     | Pending |

---

## Epic 8: Ordering System (Customer)

> Allow customers to place cake orders through the website.

### User Stories

| ID     | Story                                                                | Priority | MVP |
| ------ | -------------------------------------------------------------------- | -------- | --- |
| E8-S01 | As a customer, I want to order a cake through a form                 | High     | Yes |
| E8-S02 | As a customer, I want to choose pickup or delivery                   | High     | Yes |
| E8-S03 | As a customer, I want to select my preferred date and time           | High     | Yes |
| E8-S04 | As a customer, I want to see an order summary before submitting      | High     | Yes |
| E8-S05 | As a customer, I want a confirmation with a reference number         | High     | Yes |

### Developer Tasks

| ID       | Task                                          | Story  | Priority | Status  |
| -------- | --------------------------------------------- | ------ | -------- | ------- |
| E8-T01   | Build Order Form page (/order)                | E8-S01 | High     | Pending |
| E8-T02   | Build customer info section                   | E8-S01 | High     | Pending |
| E8-T03   | Build product selection section               | E8-S01 | High     | Pending |
| E8-T04   | Build fulfillment type toggle                 | E8-S02 | High     | Pending |
| E8-T05   | Build date/time picker with lead time logic   | E8-S03 | High     | Pending |
| E8-T06   | Build delivery address section (conditional)  | E8-S02 | High     | Pending |
| E8-T07   | Build order summary component                 | E8-S04 | High     | Pending |
| E8-T08   | Create order validation schema                | E8-S01 | High     | Pending |
| E8-T09   | Create order submission server action         | E8-S01 | High     | Pending |
| E8-T10   | Build reference number generation logic       | E8-S05 | High     | Pending |
| E8-T11   | Build Order Confirmation page                 | E8-S05 | High     | Pending |
| E8-T12   | Test pickup flow end-to-end                   | E8-S02 | High     | Pending |
| E8-T13   | Test delivery flow end-to-end                 | E8-S02 | High     | Pending |
| E8-T14   | Test validation and error handling            | E8-S01 | High     | Pending |

---

## Epic 9: Order Management (Admin)

> Allow the admin to view, track, and manage customer orders.

### User Stories

| ID     | Story                                                                | Priority | MVP |
| ------ | -------------------------------------------------------------------- | -------- | --- |
| E9-S01 | As an admin, I want to see all orders with filters                   | High     | Yes |
| E9-S02 | As an admin, I want to view full order details                       | High     | Yes |
| E9-S03 | As an admin, I want to update order status step by step              | High     | Yes |
| E9-S04 | As an admin, I want to mark orders as paid                           | High     | Yes |
| E9-S05 | As an admin, I want to cancel an order with a reason                 | High     | Yes |

### Developer Tasks

| ID       | Task                                          | Story  | Priority | Status  |
| -------- | --------------------------------------------- | ------ | -------- | ------- |
| E9-T01   | Build Order List page (admin)                 | E9-S01 | High     | Pending |
| E9-T02   | Build order filters (status, type, date)      | E9-S01 | High     | Pending |
| E9-T03   | Build Order Detail page (admin)               | E9-S02 | High     | Pending |
| E9-T04   | Build status update buttons                   | E9-S03 | High     | Pending |
| E9-T05   | Build payment status toggle                   | E9-S04 | High     | Pending |
| E9-T06   | Build cancel order dialog                     | E9-S05 | High     | Pending |
| E9-T07   | Create order management server actions        | E9-S03 | High     | Pending |
| E9-T08   | Create order queries (list, detail, stats)    | E9-S01 | High     | Pending |
| E9-T09   | Test order lifecycle end-to-end               | E9-S03 | High     | Pending |

---

## Epic 10: Deployment & Polish

> Finalize, test, and deploy the application.

### User Stories

| ID      | Story                                                                | Priority | MVP |
| ------- | -------------------------------------------------------------------- | -------- | --- |
| E10-S01 | As a user, I want the site to work on all major browsers and devices | High     | Yes |
| E10-S02 | As the owner, I want the site deployed and accessible online         | High     | Yes |

### Developer Tasks

| ID       | Task                                          | Story   | Priority | Status  |
| -------- | --------------------------------------------- | ------- | -------- | ------- |
| E10-T01  | Cross-browser testing                         | E10-S01 | High     | Pending |
| E10-T02  | Mobile responsiveness testing                 | E10-S01 | High     | Pending |
| E10-T03  | Lighthouse performance audit                  | E10-S01 | Medium   | Pending |
| E10-T04  | Accessibility fixes                           | E10-S01 | Medium   | Pending |
| E10-T05  | Connect GitHub to Vercel                      | E10-S02 | High     | Pending |
| E10-T06  | Set Vercel environment variables              | E10-S02 | High     | Pending |
| E10-T07  | Deploy to Vercel                              | E10-S02 | High     | Pending |
| E10-T08  | Create production admin user                  | E10-S02 | High     | Pending |
| E10-T09  | Seed production data                          | E10-S02 | High     | Pending |
| E10-T10  | Final end-to-end production test              | E10-S02 | High     | Pending |

---

## Future Enhancements (Post-MVP Backlog)

| ID      | Feature                                    | Priority | Effort  |
| ------- | ------------------------------------------ | -------- | ------- |
| F-01    | Email order confirmations (Resend)         | High     | 1–2 days |
| F-02    | Admin site settings management page        | High     | 1 day    |
| F-03    | Customer order lookup (by reference #)     | Medium   | 1–2 days |
| F-04    | Product search on catalog                  | Medium   | 0.5 day  |
| F-05    | Related products section                   | Low      | 0.5 day  |
| F-06    | Staff role with limited permissions        | Medium   | 2–3 days |
| F-07    | GCash/PayMaya payment                      | Medium   | 3–5 days |
| F-08    | Admin analytics/reporting                  | Low      | 2–3 days |
| F-09    | Blog section                               | Low      | 2–3 days |
| F-10    | Reviews and ratings                        | Low      | 2–3 days |
| F-11    | SMS notifications (Semaphore)              | Medium   | 1–2 days |
| F-12    | Promo codes and discounts                  | Low      | 2–3 days |
| F-13    | Multi-item orders (cart-like experience)   | Medium   | 2–3 days |
| F-14    | Order timeline/history log                 | Low      | 1 day    |
