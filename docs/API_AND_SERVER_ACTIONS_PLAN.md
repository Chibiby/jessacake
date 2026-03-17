# API & Server Actions Plan — Jessa Cakes Delights

> Backend logic plan using Next.js Server Actions, Route Handlers, and Supabase.

---

## Architecture Decision

**Primary approach:** Next.js **Server Actions** for mutations (create, update, delete) and **Server Components** for data fetching.

**Why Server Actions over API Routes:**
- Simpler code — no need to manage separate API endpoints
- Built-in form handling with progressive enhancement
- Type-safe with TypeScript end-to-end
- Automatic revalidation with `revalidatePath` / `revalidateTag`
- Better DX with Next.js App Router

**When to use Route Handlers (`/api/*`):**
- Image upload (multipart form data)
- Webhook endpoints (if needed later)
- Third-party integrations

---

## Server Actions Overview

### File Organization

```
src/
├── lib/
│   ├── actions/
│   │   ├── products.ts        → Product CRUD actions
│   │   ├── categories.ts      → Category CRUD actions
│   │   ├── orders.ts          → Order creation and management actions
│   │   ├── settings.ts        → Site settings actions
│   │   └── auth.ts            → Auth-related actions
│   ├── queries/
│   │   ├── products.ts        → Product read queries (for server components)
│   │   ├── categories.ts      → Category read queries
│   │   ├── orders.ts          → Order read queries
│   │   └── settings.ts        → Settings read queries
│   └── validators/
│       ├── product.ts         → Zod schemas for product data
│       ├── order.ts           → Zod schemas for order data
│       └── category.ts        → Zod schemas for category data
```

---

## Product Operations

### Queries (Read — Server Components)

| Function                      | Auth Required | Description                                    |
| ----------------------------- | ------------- | ---------------------------------------------- |
| `getProducts()`               | No            | All visible, non-deleted products (public)     |
| `getProductsByCategory(slug)` | No            | Visible products filtered by category          |
| `getProductBySlug(slug)`      | No            | Single product with sizes, flavors, images     |
| `getFeaturedProducts()`       | No            | Products where `is_featured = true`            |
| `getAllProductsAdmin()`       | Yes           | All products including hidden/deleted (admin)  |
| `getProductByIdAdmin(id)`     | Yes           | Single product by ID for editing (admin)       |

### Actions (Write — Server Actions)

| Action                         | Auth Required | Description                                    |
| ------------------------------ | ------------- | ---------------------------------------------- |
| `createProduct(formData)`      | Yes           | Create product + sizes + flavors + images      |
| `updateProduct(id, formData)`  | Yes           | Update product and related data                |
| `deleteProduct(id)`            | Yes           | Soft delete (set `is_deleted = true`)          |
| `toggleProductVisibility(id)`  | Yes           | Toggle `is_visible`                            |
| `toggleProductFeatured(id)`    | Yes           | Toggle `is_featured`                           |

### Product Creation Logic

```
createProduct(formData):
  1. Validate auth session → reject if not authenticated
  2. Parse and validate form data with Zod schema
  3. Generate slug from product name (handle uniqueness)
  4. Upload images to Supabase Storage
  5. Begin transaction:
     a. Insert into `products` table
     b. Insert sizes into `product_sizes`
     c. Insert flavors into `product_flavors`
     d. Insert image records into `product_images`
  6. Revalidate `/cakes` and `/admin/products` paths
  7. Return success with product ID, or error
```

### Product Update Logic

```
updateProduct(id, formData):
  1. Validate auth session
  2. Parse and validate form data with Zod schema
  3. Upload any new images to Supabase Storage
  4. Delete removed images from Storage and DB
  5. Begin transaction:
     a. Update `products` table
     b. Delete existing sizes → re-insert (simpler than diff)
     c. Delete existing flavors → re-insert
     d. Update `product_images` (add new, remove deleted, update order)
  6. Revalidate relevant paths
  7. Return success or error
```

---

## Category Operations

### Queries

| Function                   | Auth Required | Description                          |
| -------------------------- | ------------- | ------------------------------------ |
| `getCategories()`          | No            | All categories ordered by sort_order |
| `getCategoryBySlug(slug)`  | No            | Single category by slug              |
| `getCategoriesAdmin()`     | Yes           | All categories with product counts   |

### Actions

| Action                          | Auth Required | Description                          |
| ------------------------------- | ------------- | ------------------------------------ |
| `createCategory(formData)`      | Yes           | Create a new category                |
| `updateCategory(id, formData)`  | Yes           | Update category name/slug/image      |
| `deleteCategory(id)`            | Yes           | Delete category (check for products) |
| `reorderCategories(orderedIds)` | Yes           | Update sort_order for all categories |

---

## Order Operations

### Queries

| Function                        | Auth Required | Description                                |
| ------------------------------- | ------------- | ------------------------------------------ |
| `getOrdersAdmin(filters)`       | Yes           | All orders with filters (status, type, date) |
| `getOrderByIdAdmin(id)`         | Yes           | Full order detail with items and customer  |
| `getDashboardStats()`           | Yes           | Aggregated stats for dashboard home        |
| `getRecentOrders(limit)`        | Yes           | Last N orders for dashboard                |

### Actions

| Action                            | Auth Required | Description                              |
| --------------------------------- | ------------- | ---------------------------------------- |
| `createOrder(formData)`           | **No**        | Customer places an order (public action) |
| `updateOrderStatus(id, status)`   | Yes           | Update order status                      |
| `togglePaymentStatus(id)`         | Yes           | Toggle paid/unpaid                       |
| `cancelOrder(id, reason)`         | Yes           | Cancel order with optional reason        |

### Order Creation Logic (Public — No Auth)

```
createOrder(formData):
  1. Parse and validate form data with Zod schema:
     - Customer info (name, phone, email)
     - Product selection (product_id, size, flavor, quantity)
     - Cake message (optional)
     - Fulfillment type (pickup or delivery)
     - Preferred date and time
     - Delivery address (if delivery)
     - Special instructions (optional)
  2. Validate product exists and is visible
  3. Validate size and flavor exist for selected product
  4. Validate preferred date meets lead time requirement
  5. Calculate pricing:
     - Look up unit_price from product_sizes
     - line_total = unit_price × quantity
     - subtotal = sum of all line_totals
     - delivery_fee = (fulfillment_type === 'delivery') ? settings.delivery_fee : 0
     - total = subtotal + delivery_fee
  6. Generate reference number (JCD-YYYYMMDD-NNN)
  7. Begin transaction:
     a. Insert into `orders` (status: pending, payment: unpaid)
     b. Insert into `order_items` (with snapshotted product data)
     c. Insert into `customer_details`
     d. If delivery → Insert into `delivery_details`
  8. Return success with reference number, or error
```

### Order Status Update Logic

```
updateOrderStatus(id, newStatus):
  1. Validate auth session
  2. Fetch current order
  3. Validate status transition is allowed:
     - pending → confirmed
     - confirmed → preparing
     - preparing → ready_for_pickup (if pickup) or out_for_delivery (if delivery)
     - ready_for_pickup → completed
     - out_for_delivery → completed
     - Any active status → cancelled
  4. Update order status in DB
  5. Set updated_at
  6. Revalidate admin order pages
  7. Return success or error
```

---

## Settings Operations

### Queries

| Function            | Auth Required | Description                    |
| ------------------- | ------------- | ------------------------------ |
| `getSettings()`     | No            | All settings (for public pages too) |
| `getSetting(key)`   | No            | Single setting by key          |

### Actions

| Action                          | Auth Required | Description                    |
| ------------------------------- | ------------- | ------------------------------ |
| `updateSettings(formData)`      | Yes           | Update one or more settings    |

---

## Authentication Actions

| Action                | Description                                  |
| --------------------- | -------------------------------------------- |
| `signIn(email, password)` | Sign in via Supabase Auth, set session cookie |
| `signOut()`           | Clear session, redirect to login             |
| `getSession()`        | Get current auth session (server-side)       |

### Auth Flow (Server-Side)

```
signIn(email, password):
  1. Call supabase.auth.signInWithPassword({ email, password })
  2. If success → session cookie set automatically by Supabase SSR helpers
  3. Redirect to /admin
  4. If failure → return error message

signOut():
  1. Call supabase.auth.signOut()
  2. Clear session cookie
  3. Redirect to /admin/login
```

### Middleware (Route Protection)

```
middleware.ts:
  1. Match all /admin/* routes (except /admin/login)
  2. Check for valid Supabase session
  3. If no session → redirect to /admin/login
  4. If valid session → continue to requested page
  
  Also: /admin/login with valid session → redirect to /admin
```

---

## Route Handlers (API Routes)

Only used where Server Actions are insufficient:

### `POST /api/upload-image`

```
Purpose: Handle image upload to Supabase Storage
Auth: Required
Input: FormData with file
Process:
  1. Validate auth session
  2. Validate file type (jpeg, png, webp) and size (≤ 5 MB)
  3. Generate unique filename: products/{product_id}/{timestamp}_{original_name}
  4. Upload to Supabase Storage bucket 'product-images'
  5. Get public URL
  6. Return { url, storagePath }
```

### `DELETE /api/delete-image`

```
Purpose: Remove image from Supabase Storage
Auth: Required
Input: { storagePath }
Process:
  1. Validate auth session
  2. Delete file from Supabase Storage
  3. Return success
```

---

## Validation (Zod Schemas)

### Product Schema

```typescript
const productSchema = z.object({
  name: z.string().min(2).max(150),
  description: z.string().min(10).max(2000),
  category_id: z.string().uuid(),
  base_price: z.number().positive().multipleOf(0.01),
  lead_time_days: z.number().int().min(0).max(30),
  is_visible: z.boolean().default(true),
  is_featured: z.boolean().default(false),
  sizes: z.array(z.object({
    name: z.string().min(1),
    price: z.number().positive(),
    sort_order: z.number().int().default(0),
  })).min(1, "At least one size is required"),
  flavors: z.array(z.object({
    name: z.string().min(1),
    sort_order: z.number().int().default(0),
  })).min(1, "At least one flavor is required"),
});
```

### Order Schema

```typescript
const orderSchema = z.object({
  customer: z.object({
    full_name: z.string().min(2).max(100),
    phone: z.string().regex(/^(\+63|0)9\d{9}$/, "Invalid PH phone number"),
    email: z.string().email(),
  }),
  items: z.array(z.object({
    product_id: z.string().uuid(),
    size: z.string().min(1),
    flavor: z.string().min(1),
    quantity: z.number().int().min(1).max(20),
    cake_message: z.string().max(100).optional(),
  })).min(1),
  fulfillment_type: z.enum(["pickup", "delivery"]),
  preferred_date: z.string().refine(/* must be >= today + lead_time */),
  preferred_time: z.string(),
  special_instructions: z.string().max(500).optional(),
  delivery_address: z.object({
    street_address: z.string().min(10),
    barangay: z.string().optional(),
    city: z.string().min(2),
    landmarks: z.string().optional(),
  }).optional(), // Required only when fulfillment_type === "delivery"
});
```

---

## Security Considerations

### Input Validation
- **All** user inputs validated with Zod on the server (even if client-side validation exists)
- Never trust client-side validation alone
- Sanitize text inputs to prevent XSS (React handles this by default with JSX)

### Authentication
- All admin actions check for valid Supabase session before executing
- Use Supabase SSR helpers (`@supabase/ssr`) for proper cookie-based sessions
- Middleware protects all `/admin/*` routes at the edge

### Authorization
- MVP: Any authenticated user = admin (single role)
- Future: Check role from `profiles` table before allowing actions

### Data Integrity
- Snapshot product data in `order_items` (name, price) to preserve order accuracy
- Use database transactions for multi-table inserts (orders)
- Soft delete products to preserve order history references

### Rate Limiting
- Supabase Auth has built-in rate limiting for login attempts
- Order submission: Consider simple client-side debounce + server-side duplicate detection
- No custom rate limiting needed for MVP (low traffic)

### Environment Variables
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client
- Use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for client-side
- Use `SUPABASE_SERVICE_ROLE_KEY` only in server-side code for admin operations

### File Upload Security
- Validate file MIME type server-side (not just extension)
- Enforce file size limit (5 MB)
- Use unique filenames to prevent overwrites
- Supabase Storage bucket policies control access

---

## Error Handling Pattern

```typescript
// Standard return type for server actions
type ActionResult<T = void> = 
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

// Usage in server action
export async function createProduct(formData: FormData): Promise<ActionResult<{ id: string }>> {
  try {
    // 1. Auth check
    // 2. Validate
    // 3. Execute
    return { success: true, data: { id: product.id } };
  } catch (error) {
    console.error('createProduct error:', error);
    return { success: false, error: 'Failed to create product. Please try again.' };
  }
}
```

---

## Caching & Revalidation Strategy

| Data Type          | Caching Strategy                                    |
| ------------------ | --------------------------------------------------- |
| Product list       | Cache with `revalidatePath('/cakes')` on product change |
| Product detail     | Cache with `revalidatePath('/cakes/[slug]')` on update |
| Categories         | Cache with `revalidateTag('categories')` on change  |
| Featured products  | Cache with `revalidateTag('featured')` on change    |
| Site settings      | Cache with `revalidateTag('settings')` on change    |
| Orders (admin)     | No cache — always fetch fresh (admin dashboard)     |
| Dashboard stats    | No cache — always fetch fresh                       |
