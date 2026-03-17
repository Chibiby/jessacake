# Project Overview — Jessa Cakes Delights

---

## Business Overview

**Jessa Cakes Delights** is a local cake and desserts business based in **Malandag, Zamboanga del Sur, Philippines**. The business specializes in custom-designed cakes for birthdays, christenings, graduations, Valentine's Day, formal celebrations, and character-themed events, along with cupcake sets and desserts.

### Business History

- **2018** — Founded as a small home-based cake business. Orders came through personal contacts and social media.
- **Pandemic era** — Demand for home-delivered cakes grew significantly. The business adapted with online ordering and delivery services, gaining wider recognition and a loyal customer base.
- **2021** — Expanded to a **dedicated physical shop** due to increasing orders and growing popularity, improving production capacity and customer experience.
- **Today** — Continues to thrive, combining homemade charm with professional service. Offers high-quality cakes, creative designs, and convenient online and in-store ordering.

The owner ("Jessa") manages the business with a small team. The business currently relies on social media (Facebook, Instagram) for marketing and takes orders via chat/messaging. This website will formalize the online presence, provide a professional storefront, and streamline the ordering process.

### Brand Assets Available

- **Logo**: "Jessa Cakes" logo with pink cupcake, flowers, gold leaf accents, whisk, and piping bag (`files/logo.jpg`)
- **Product catalog images**: 16 cake product photos with descriptions and pricing (`files/jessa_cakes_image_descriptions.txt`)
- **Business history**: Written brand story (`files/history.txt`)

---

## Website Purpose

Build a public-facing marketing website with integrated product catalog and ordering system, plus a private admin dashboard for managing products and orders.

The website will:
1. **Showcase** — Present cakes and desserts beautifully to attract customers
2. **Inform** — Provide business info, pricing, policies, and contact details
3. **Convert** — Allow customers to place orders directly through the site
4. **Manage** — Give the owner/staff tools to manage products and fulfill orders

---

## Target Users

| User Type       | Description                                                      | Access Level     |
| --------------- | ---------------------------------------------------------------- | ---------------- |
| **Guest**       | Potential or returning customer browsing the site                | Public pages     |
| **Customer**    | Guest who is actively placing or has placed an order             | Public + order form |
| **Admin/Owner** | Business owner who manages all products, orders, and content     | Full dashboard   |
| **Staff**       | (Future) Employee with limited dashboard access for order mgmt   | Limited dashboard |

> **MVP focuses on Guest and Admin roles only.** Staff role is a future enhancement.

---

## Main Objectives

1. **Establish online presence** — Professional website that builds trust and credibility
2. **Product showcase** — High-quality product catalog with images, descriptions, pricing
3. **Streamline ordering** — Replace chat-based ordering with a structured order form
4. **Operational efficiency** — Dashboard for managing products and tracking orders
5. **Mobile-first reach** — Responsive design since most customers browse on mobile
6. **Low-cost infrastructure** — Free-tier hosting and services (Vercel, Supabase)

---

## Value Proposition

| For Customers                              | For the Business                           |
| ------------------------------------------ | ------------------------------------------ |
| Easy browsing of available cakes            | Professional online storefront             |
| Clear pricing and product details           | Structured order intake (fewer back-and-forth messages) |
| Simple order placement with pickup/delivery | Centralized order tracking and management  |
| Mobile-friendly experience                  | Product catalog that's easy to update       |
| No account registration required            | Low maintenance and hosting costs          |

---

## Success Criteria

| Criteria                          | Measurement                                              |
| --------------------------------- | -------------------------------------------------------- |
| Website is live and accessible    | Deployed on Vercel, accessible via URL                   |
| Products are browsable            | At least 10 products listed with images and details      |
| Orders can be placed              | End-to-end order flow works (form → admin dashboard)     |
| Admin can manage products         | CRUD operations work from the dashboard                  |
| Admin can manage orders           | Order status updates work from the dashboard             |
| Mobile responsive                 | Site is fully usable on mobile devices (320px–768px)     |
| Page load performance             | Lighthouse score ≥ 85 on mobile                          |
| Brand consistency                 | Pink-themed, feminine, professional design throughout    |

---

## Assumptions

1. The business operates from a **single physical shop in Malandag, Zamboanga del Sur, Philippines** (opened 2021)
2. **Product photos are available** — 16 cake images with descriptions and pricing from an existing PDF catalog
3. **Logo is available** — "Jessa Cakes" logo in JPG format (`files/logo.jpg`)
4. Most cakes are **made-to-order** with a typical lead time of **2–3 days**
5. Some products (Valentine's desserts, cupcakes) may be **ready-made** and available for same-day pickup
6. **Delivery area** is limited to Malandag and surrounding areas
7. **Delivery fee** is either flat-rate or zone-based, configurable by admin
8. **Payment** is exclusively **cash** — no online payments, no card, no e-wallet in MVP
9. **No customer accounts** — guests order without registration
10. The admin is **tech-comfortable enough** to use a simple dashboard
11. **Order volume** is low enough to manage through a dashboard (no automation needed)
12. **Operating hours** affect order lead times but the site is accessible 24/7
13. The website is in **English**
14. **No inventory tracking** in MVP — products are shown/hidden manually
15. **No loyalty program, discounts, or promo codes** in MVP
16. **Price range** is ₱180–₱3,000+ based on existing product catalog
17. **Product categories** include: Birthday, Christening, Graduation, Valentine's, Formal/Celebration, Character-Themed, Cupcake Sets

---

## Scope

### In Scope (MVP)

- Public marketing pages (home, about, contact, FAQ)
- Product catalog with categories, images, pricing, and details
- Product detail pages
- Order placement form (pickup or delivery, cash payment)
- Customer info collection (name, phone, email, address for delivery)
- Admin authentication (email/password login)
- Admin dashboard with overview stats
- Product management (CRUD + hide/show toggle)
- Category management
- Order management with status tracking
- Image upload and storage via Supabase Storage
- Responsive design (mobile + desktop)
- SEO basics (meta tags, Open Graph)
- Deployment on Vercel + Supabase

### Out of Scope (MVP)

- Online payment processing (GCash, PayMaya, credit card)
- Customer account registration and login
- Customer order history / tracking page
- Real-time notifications (SMS, email, push)
- Multi-branch / multi-location support
- Inventory management and stock tracking
- Promo codes, discounts, or loyalty programs
- Blog or content management system
- Multi-language support (Bisaya/Filipino)
- Advanced analytics or reporting
- Staff role with limited permissions
- Automated email confirmations
- Chat or messaging integration
- Reviews and ratings system

### Future Enhancements (Post-MVP)

- Customer accounts with order history
- Email/SMS order confirmations
- GCash/PayMaya payment integration
- Promo codes and seasonal discounts
- Order tracking page for customers
- Staff accounts with role-based access
- Analytics dashboard
- Blog section for content marketing
- Reviews and testimonials system
- WhatsApp/Messenger integration for order updates
