# User Flows — Jessa Cakes Delights

---

## 1. Guest Browsing Products

**Actor:** Guest (unauthenticated visitor)

### Steps

1. Guest lands on the **Homepage** (`/`)
2. Guest sees hero banner, featured cakes, and business info
3. Guest clicks **"View All Cakes"** or **"Cakes"** in the navbar
4. Guest arrives at the **Product Catalog** (`/cakes`)
5. Guest sees a grid of product cards (image, name, starting price, category)
6. Guest optionally clicks a **category filter** to narrow results
7. Guest clicks on a **product card**
8. Guest arrives at the **Product Detail** page (`/cakes/[slug]`)
9. Guest views images, description, sizes/prices, flavors, and lead time
10. Guest decides to order → clicks **"Order This Cake"** CTA

### Flow Diagram

```
Homepage → [View All Cakes] → Product Catalog → [Click Product] → Product Detail
                                     ↑
                               [Filter by Category]
```

---

## 2. Guest Ordering a Cake (General)

**Actor:** Guest / Customer

### Steps

1. Guest clicks **"Order This Cake"** from a product detail page (or navigates to `/order` directly)
2. Order form loads; product is pre-selected if coming from product detail
3. Guest fills in **Customer Info**:
   - Full name
   - Phone number
   - Email address
4. Guest confirms or selects **Product Details**:
   - Product (pre-filled or selected from dropdown)
   - Size (with price shown)
   - Flavor
   - Quantity
   - Custom cake message (optional, e.g., "Happy Birthday!")
5. Guest selects **Fulfillment Type**: Pickup or Delivery
6. Guest selects **Preferred Date and Time**
   - Date picker enforces minimum lead time
   - Time picker shows available slots within operating hours
7. If Delivery → Guest fills in delivery address fields
8. Guest adds **Special Instructions** (optional)
9. Guest reviews **Order Summary** (items, subtotal, delivery fee if applicable, total)
10. Guest sees **"Payment: Cash Only"** notice
11. Guest clicks **"Place Order"**
12. System validates all fields (client + server)
13. If valid → Order saved to database with status `pending`
14. Guest sees **Order Confirmation** page with reference number
15. Guest receives next-step instructions (e.g., "We'll contact you to confirm")

### Flow Diagram

```
Product Detail → [Order This Cake] → Order Form
                                        ├── Customer Info
                                        ├── Product Selection
                                        ├── Fulfillment Type (Pickup / Delivery)
                                        ├── Date & Time
                                        ├── Delivery Address (if delivery)
                                        ├── Special Instructions
                                        └── Order Summary
                                              ↓
                                        [Place Order]
                                              ↓
                                    Validation (client + server)
                                              ↓
                                    Order saved (status: pending)
                                              ↓
                                    Confirmation Page (ref #)
```

---

## 3. Pickup Order Flow

**Actor:** Guest selecting Pickup

### Steps

1. In the order form, guest selects **"Pickup"** as fulfillment type
2. System displays:
   - Pickup address: `Jessa Cakes Delights, Malandag, Zamboanga del Sur`
   - Operating hours: `Mon–Sat, 8:00 AM – 6:00 PM`
3. Guest selects preferred **pickup date** (enforced: today + lead time minimum)
4. Guest selects preferred **pickup time** (within operating hours)
5. **No delivery fee** is added to the order total
6. Payment method shown: **"Cash on Pickup"**
7. Guest reviews order summary → total = items subtotal only
8. Guest submits order
9. Order saved with:
   - `fulfillment_type: "pickup"`
   - `delivery_fee: 0`
   - `payment_method: "cash"`
   - `payment_status: "unpaid"`
10. Confirmation page shows pickup instructions

### Flow Diagram

```
Order Form → [Select Pickup] → Show pickup address & hours
                                 → Select date & time
                                 → No delivery fee
                                 → Summary (subtotal only)
                                 → [Place Order]
                                 → Confirmation: "Pick up at [address] on [date] at [time]"
```

---

## 4. Delivery Order Flow

**Actor:** Guest selecting Delivery

### Steps

1. In the order form, guest selects **"Delivery"** as fulfillment type
2. System shows **delivery address fields**:
   - Street address
   - Barangay / Area
   - City
   - Landmarks / notes
3. Guest fills in delivery address
4. System displays **delivery fee** (flat rate, e.g., ₱100 — within Malandag and nearby areas)
5. Guest selects preferred **delivery date** (enforced: today + lead time minimum)
6. Guest selects preferred **delivery time** (within delivery hours)
7. Payment method shown: **"Cash on Delivery"**
8. Guest reviews order summary → total = items subtotal + delivery fee
9. Guest submits order
10. Order saved with:
    - `fulfillment_type: "delivery"`
    - `delivery_fee: [configured amount]`
    - `delivery_address: [full address]`
    - `payment_method: "cash"`
    - `payment_status: "unpaid"`
11. Confirmation page shows delivery details

### Flow Diagram

```
Order Form → [Select Delivery] → Show delivery address form
                                   → Enter address details
                                   → Delivery fee added
                                   → Select date & time
                                   → Summary (subtotal + delivery fee)
                                   → [Place Order]
                                   → Confirmation: "Delivering to [address] on [date]"
```

---

## 5. Admin Login

**Actor:** Admin (business owner / staff)

### Steps

1. Admin navigates to `/admin/login`
2. Login page displays email and password fields
3. Admin enters credentials
4. Admin clicks **"Log In"**
5. System authenticates via Supabase Auth
6. **If success:**
   - Session created
   - Redirect to `/admin` (Dashboard Home)
7. **If failure:**
   - Error message: "Invalid email or password"
   - Form remains with email pre-filled
8. Admin is now authenticated for all `/admin/*` routes

### Flow Diagram

```
/admin/login → [Enter credentials] → [Log In]
                                         ├── Success → /admin (Dashboard)
                                         └── Failure → Error message, stay on login
```

### Session Handling

```
Any /admin/* page → Middleware checks session
                      ├── Valid session → Allow access
                      └── No/expired session → Redirect to /admin/login
```

---

## 6. Admin Adding a Product

**Actor:** Authenticated Admin

### Steps

1. Admin is on the Dashboard or Product List page
2. Admin clicks **"Add Product"** button
3. System navigates to `/admin/products/new`
4. Admin fills in the product form:
   - **Product name** (e.g., "Pink Ribbon Birthday Cake")
   - **Slug** (auto-generated from name, editable)
   - **Description** (rich text or plain textarea)
   - **Category** (select from existing categories)
   - **Base price** (starting price for smallest size)
   - **Sizes** (add rows: size name + price, e.g., "1 Layer — ₱500", "2 Layers — ₱750", "3 Layers — ₱2,500")
   - **Flavors** (add tags: Chocolate, Vanilla, Red Velvet, etc.)
   - **Lead time** (number of days, e.g., 2)
   - **Main image** (upload, required)
   - **Gallery images** (upload, up to 4, optional)
   - **Visibility** (toggle: visible / hidden)
   - **Featured** (toggle: show on homepage or not)
5. Admin clicks **"Save Product"**
6. System validates all fields
7. **If valid:**
   - Images uploaded to Supabase Storage
   - Product record + related data saved to database
   - Redirect to `/admin/products` with success toast
8. **If invalid:**
   - Inline error messages shown
   - Form data preserved

### Flow Diagram

```
Product List → [Add Product] → Product Form (empty)
                                  → Fill all fields
                                  → Upload images
                                  → [Save Product]
                                       ├── Valid → Save to DB → Upload images → Redirect to list + toast
                                       └── Invalid → Show errors, stay on form
```

---

## 7. Admin Editing a Product

**Actor:** Authenticated Admin

### Steps

1. Admin is on the **Product List** (`/admin/products`)
2. Admin clicks **"Edit"** on a product row
3. System navigates to `/admin/products/[id]/edit`
4. Form loads pre-filled with existing product data and images
5. Admin modifies fields as needed
6. Admin can:
   - Change text fields
   - Add/remove sizes or flavors
   - Replace or delete images
   - Upload new images
   - Toggle visibility or featured status
7. Admin clicks **"Save Changes"**
8. System validates and saves updates
9. Redirect to product list with success toast

### Additional Actions

- **Delete Product**: Admin clicks "Delete" → Confirmation dialog → Product removed (soft delete)
- **Toggle Visibility**: Admin clicks visibility toggle directly from the product list (no form needed)

---

## 8. Admin Managing Orders

**Actor:** Authenticated Admin

### Steps

1. Admin navigates to **Orders** (`/admin/orders`)
2. Order list displays all orders (newest first)
3. Admin can filter by:
   - Status (Pending, Confirmed, Preparing, Ready, Completed, Cancelled)
   - Fulfillment type (Pickup, Delivery)
   - Date range
4. Admin clicks on an order row
5. System navigates to **Order Detail** (`/admin/orders/[id]`)
6. Admin views:
   - Customer info (name, phone, email)
   - Order items (product, size, flavor, qty, price, cake message)
   - Fulfillment details (pickup or delivery address)
   - Order total breakdown
   - Current status and payment status
7. Admin takes action (see next flow)

### Flow Diagram

```
/admin/orders → [Filter orders] → [Click order row] → /admin/orders/[id]
                                                          → View full details
                                                          → Take action (update status, mark paid, cancel)
```

---

## 9. Admin Updating Order Status

**Actor:** Authenticated Admin

### Status Flow

```
pending → confirmed → preparing → ready_for_pickup   → completed
                                → out_for_delivery    → completed

Any active status → cancelled
```

### Steps

1. Admin is on the **Order Detail** page
2. Current status is displayed as a badge
3. Admin sees available **next status** options as buttons:
   - If `pending` → "Confirm Order" button
   - If `confirmed` → "Start Preparing" button
   - If `preparing` → "Mark Ready for Pickup" or "Send Out for Delivery" (based on fulfillment type)
   - If `ready_for_pickup` or `out_for_delivery` → "Mark Completed" button
4. Admin clicks the appropriate status button
5. Confirmation dialog appears (optional for destructive actions)
6. Status updated in database
7. Page refreshes with new status badge
8. **Cancel flow:**
   - Admin clicks "Cancel Order" at any active status
   - Confirmation dialog with optional reason field
   - Order status set to `cancelled`

### Payment Status

- Admin can toggle **payment status** independently:
  - "Mark as Paid" → `payment_status: "paid"`
  - "Mark as Unpaid" → `payment_status: "unpaid"`
- Payment status is typically updated at or after completion

### Detailed Status Transition Diagram

```
┌─────────┐     ┌───────────┐     ┌────────────┐     ┌──────────────────┐     ┌───────────┐
│ PENDING  │────▶│ CONFIRMED │────▶│ PREPARING  │────▶│ READY_FOR_PICKUP │────▶│ COMPLETED │
└─────────┘     └───────────┘     └────────────┘     └──────────────────┘     └───────────┘
                                         │
                                         │            ┌──────────────────┐
                                         └───────────▶│OUT_FOR_DELIVERY  │────▶ COMPLETED
                                                      └──────────────────┘
     ╳                ╳                   ╳                    ╳
     │                │                   │                    │
     └────────────────┴───────────────────┴────────────────────┘
                              │
                       ┌──────────┐
                       │CANCELLED │
                       └──────────┘
```

---

## 10. Complete Order Lifecycle (End-to-End)

```
CUSTOMER                                    ADMIN
────────                                    ─────
Browse cakes
     │
Select product
     │
Fill order form
     │
Place order ──────────────────────────▶ Order appears (PENDING)
     │                                        │
Receives confirmation                   Reviews order
(reference number)                            │
     │                                  Confirms order (CONFIRMED)
     │                                        │
     │                                  Starts preparation (PREPARING)
     │                                        │
     │                                  ┌─────┴──────┐
     │                            Pickup?      Delivery?
     │                                  │            │
     │                           READY_FOR     OUT_FOR
     │                            PICKUP       DELIVERY
     │                                  │            │
Picks up cake / Receives delivery       └─────┬──────┘
     │                                        │
Pays cash ──────────────────────────▶ Marks as PAID
                                              │
                                        Marks as COMPLETED
```
