# Feature Breakdown — Jessa Cakes Delights

---

## Module 1: Marketing Website

### Purpose
Serve as the public-facing storefront that builds brand credibility, showcases the business, and drives customers toward ordering.

### Features
- Hero section with banner image, tagline, and CTA
- Featured products section on homepage
- About Us page (brand story, owner bio, values)
- Contact page (phone, email, address, hours, social links, optional map)
- FAQ page (accordion-style Q&A)
- Responsive navbar with logo and mobile hamburger menu
- Footer with business info, quick links, social icons
- SEO meta tags and Open Graph tags on every page

### Inputs
- Static content (text, images) — provided by the business owner
- Featured products — pulled from database (`is_featured = true`)
- Business settings — from DB or hardcoded config

### Outputs
- Fully rendered public pages accessible to all visitors
- SEO-optimized HTML served to search engines

### Dependencies
- Product catalog module (for featured products on homepage)
- Supabase (for dynamic content if not hardcoded)
- Image assets (hero banners, about photos)

### Risks
- Missing brand assets (logo, hero images) at launch → use placeholders
- Static content may need frequent updates → consider making it admin-editable later

---

## Module 2: Product Catalog

### Purpose
Display all available cake products in an organized, browsable, and visually appealing format.

### Features
- Product listing page with grid layout
- Category-based filtering (Birthday, Christening, Graduation, Valentine's, Formal/Celebration, Character-Themed, Cupcake Sets)
- Product cards (image, name, starting price, category badge)
- Product detail page with image gallery
- Size/layer and pricing table per product (e.g., 1-layer ₱500, 2-layer ₱750, 3-layer ₱2,500)
- Available flavors display
- Lead time / advance order notice
- "Order This Cake" CTA linking to order form
- Empty state for categories with no products

### Inputs
- Products from database (where `is_visible = true`)
- Categories from database
- Product images from Supabase Storage
- URL query params for category filtering

### Outputs
- Rendered product grid with real-time data
- Individual product detail pages (dynamic routes)
- Pre-selected product context passed to order form

### Dependencies
- Database: `products`, `product_images`, `categories`, `product_sizes`, `product_flavors` tables
- Supabase Storage for image URLs
- Admin product management module (data source)

### Risks
- Slow image loading if images aren't optimized → use Next.js Image component
- Too few products at launch → design looks sparse → 16 products available from existing catalog
- Missing product photos → 16 cake image descriptions available but actual files need to be extracted from PDF catalog; mandate main image as required field

---

## Module 3: Ordering System

### Purpose
Allow customers to place structured cake orders through a form-based flow, replacing chat-based ordering.

### Features
- Order form page (standalone or pre-filled from product)
- Customer info collection (name, phone, email)
- Product selection with size, flavor, quantity
- Custom cake message field
- Special instructions field
- Fulfillment type selection (Pickup or Delivery)
- Date and time picker with lead time enforcement
- Order summary with calculated totals
- Cash payment notice
- Form validation (client + server)
- Order submission and confirmation page
- Order reference number generation

### Inputs
- Customer-entered data (contact, product choices, fulfillment details)
- Product data (available sizes, flavors, prices) from database
- Business settings (delivery fee, lead time, operating hours)

### Outputs
- Order record saved to database (status: `pending`)
- Order items saved to database
- Customer details saved to database
- Delivery details saved (if delivery)
- Order confirmation displayed with reference number

### Dependencies
- Product catalog module (product data for form)
- Database: `orders`, `order_items`, `customer_details`, `delivery_details` tables
- Business settings (delivery fee, hours, lead time)

### Risks
- Form abandonment if too long → keep it focused, use clear sections
- Invalid dates submitted → enforce with date picker constraints + server validation
- Double submission → disable button after click, debounce
- Product unavailable at submission time → validate availability server-side

---

## Module 4: Pickup / Delivery Handling

### Purpose
Handle the two fulfillment methods with appropriate data collection, fee calculation, and display logic.

### Features

#### Pickup
- Display pickup location (Malandag, Malungon, Sarangani Province) and hours when selected
- Date and time picker for preferred pickup
- No delivery fee applied
- Payment label: "Cash on Pickup"

#### Delivery
- Show delivery address fields (street, barangay, city, landmarks)
- Apply configurable delivery fee to order total (within Malandag and nearby areas)
- Date and time picker for preferred delivery
- Payment label: "Cash on Delivery"

### Inputs
- Fulfillment type selection from user
- Delivery address fields (if delivery)
- Delivery fee from business settings
- Operating hours for date/time validation

### Outputs
- Correct total calculation (with or without delivery fee)
- Delivery details saved in database (if delivery)
- Fulfillment-specific confirmation messaging

### Dependencies
- Ordering system module
- Business settings (delivery fee amount, pickup address, hours)
- Database: `delivery_details` table

### Risks
- Delivery to addresses outside service area → MVP relies on admin review (no geo-validation)
- Delivery fee changes → make it admin-configurable
- Customer confusion about fulfillment type → clear UI toggle with contextual info

---

## Module 5: Authentication

### Purpose
Secure the admin dashboard with email/password authentication using Supabase Auth.

### Features
- Admin login page (email + password)
- Supabase Auth integration (signIn, signOut, getSession)
- Session management with cookies
- Middleware-based route protection for `/admin/*`
- Automatic redirect to login when unauthenticated
- Automatic redirect to dashboard when already authenticated (on login page)
- Logout functionality
- Password reset via email (Supabase built-in)

### Inputs
- Admin credentials (email, password)
- Supabase Auth configuration (URL, keys)

### Outputs
- Authenticated session (JWT stored in cookie)
- Protected routes accessible only to authenticated users
- Login/logout state management

### Dependencies
- Supabase Auth service
- Next.js middleware for route protection
- Environment variables (Supabase URL, anon key)

### Risks
- Session expiry handling → implement silent refresh or redirect to login
- Supabase Auth downtime → users locked out → low risk with Supabase SLA
- Admin forgets password → password reset flow must work
- No rate limiting on login → Supabase handles this natively

---

## Module 6: Admin Dashboard

### Purpose
Provide the admin with an overview of business activity and quick access to all management tools.

### Features
- Dashboard home with stat cards:
  - Total orders today
  - Pending orders count
  - Total products count
  - Revenue today (sum of completed orders)
- Recent orders table (last 10 orders)
- Quick action buttons (Add Product, View All Orders)
- Sidebar navigation to all admin sections
- Responsive layout (sidebar collapses on mobile)
- Breadcrumb navigation
- Logout button in top bar

### Inputs
- Aggregated data from `orders` table
- Product count from `products` table
- Session data for user display

### Outputs
- Rendered dashboard with real-time stats
- Navigation to all admin subsections

### Dependencies
- Authentication module (session required)
- Database: `orders`, `products` tables
- All admin sub-modules (products, orders, categories, settings)

### Risks
- Stats calculation performance → use database aggregation, not client-side
- Stale data → refresh on page load (server-side rendering)

---

## Module 7: Product Management (Admin)

### Purpose
Enable the admin to create, edit, delete, and manage the visibility of cake products.

### Features
- Product list with table/grid view
- Search by product name
- Filter by category and visibility status
- Add new product form with all fields:
  - Name, slug, description
  - Category assignment
  - Sizes with individual pricing
  - Available flavors
  - Lead time (days)
  - Main image + gallery images (upload)
  - Visibility toggle (show/hide)
  - Featured toggle (homepage display)
- Edit product form (pre-filled)
- Delete product (with confirmation dialog)
- Toggle visibility directly from product list
- Image upload to Supabase Storage
- Image reordering and deletion

### Inputs
- Admin-entered product data
- Uploaded image files
- Category list for assignment

### Outputs
- Product records in database
- Images stored in Supabase Storage
- Updated product catalog on public site

### Dependencies
- Authentication module
- Database: `products`, `product_sizes`, `product_flavors`, `product_images`, `categories`
- Supabase Storage bucket for product images
- Validation schemas (Zod)

### Risks
- Large image uploads → enforce size limits (5 MB), compress client-side if possible
- Orphaned images when product is deleted → cleanup strategy needed
- Slug conflicts → enforce unique slugs with validation

---

## Module 8: Order Management (Admin)

### Purpose
Enable the admin to view, track, and manage customer orders through their lifecycle.

### Features
- Order list with filters:
  - Status (Pending, Confirmed, Preparing, Ready, Completed, Cancelled)
  - Fulfillment type (Pickup, Delivery)
  - Date range
- Order detail view:
  - Customer info (name, phone, email)
  - Order items with product details, size, flavor, qty, price, cake message
  - Fulfillment details (pickup info or delivery address)
  - Total breakdown (subtotal + delivery fee)
  - Status badge and history
  - Payment status
- Status update buttons (following the defined flow)
- Mark as Paid / Unpaid toggle
- Cancel order with optional reason
- Order reference number display

### Inputs
- Order data from database
- Admin actions (status updates, payment toggles, cancellations)

### Outputs
- Updated order records in database
- Status changes reflected in admin UI
- Order lifecycle tracked

### Dependencies
- Authentication module
- Database: `orders`, `order_items`, `customer_details`, `delivery_details`
- Ordering system module (creates the orders)

### Risks
- Concurrent updates if multiple admin users → last-write-wins for MVP
- Missing customer contact info → enforce required fields on order form
- Order cancellation after preparation started → admin judgment call, system allows it

---

## Module 9: Media / Image Handling

### Purpose
Manage the upload, storage, retrieval, and display of product images and other media assets.

### Features
- Image upload component (drag-and-drop or file picker)
- File type validation (JPG, PNG, WebP only)
- File size validation (max 5 MB)
- Upload to Supabase Storage (`product-images` bucket)
- Generate and store public URL in database
- Display images with Next.js `<Image>` for optimization
- Image deletion from storage and database
- Thumbnail generation (rely on Next.js Image resizing)
- Lazy loading for product grids
- Blur placeholder while loading

### Inputs
- Image files from admin uploads
- Supabase Storage bucket configuration

### Outputs
- Stored images in Supabase Storage
- Public URLs in `product_images` table
- Optimized image rendering on public and admin pages

### Dependencies
- Supabase Storage
- Next.js Image component
- Product management module (triggers upload)

### Risks
- Supabase Storage quota on free tier (1 GB) → monitor usage, compress images
- Broken image URLs if storage bucket misconfigured → validate on upload
- Slow uploads on poor connections → show upload progress indicator
- Orphaned files → implement cleanup on product deletion
