// ============================================================
// Database entity types for Jessa Cakes
// Mirrors the Supabase PostgreSQL schema
// ============================================================

// --- Enums ---

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready_for_pickup"
  | "out_for_delivery"
  | "completed"
  | "cancelled";

export type FulfillmentType = "pickup" | "delivery";

export type PaymentStatus = "unpaid" | "paid";

export type PaymentMethod = "cash";

// --- Categories ---

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface CategoryInsert {
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  sort_order?: number;
}

export interface CategoryUpdate {
  name?: string;
  slug?: string;
  description?: string | null;
  image_url?: string | null;
  sort_order?: number;
}

// --- Products ---

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  base_price: number;
  category_id: string;
  lead_time_days: number;
  is_visible: boolean;
  is_featured: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductWithRelations extends Product {
  category: Category;
  sizes: ProductSize[];
  flavors: ProductFlavor[];
  images: ProductImage[];
}

export interface ProductInsert {
  name: string;
  slug: string;
  description: string;
  base_price: number;
  category_id: string;
  lead_time_days?: number;
  is_visible?: boolean;
  is_featured?: boolean;
}

export interface ProductUpdate {
  name?: string;
  slug?: string;
  description?: string;
  base_price?: number;
  category_id?: string;
  lead_time_days?: number;
  is_visible?: boolean;
  is_featured?: boolean;
  is_deleted?: boolean;
}

// --- Product Sizes ---

export interface ProductSize {
  id: string;
  product_id: string;
  name: string;
  price: number;
  sort_order: number;
  created_at: string;
}

export interface ProductSizeInsert {
  product_id: string;
  name: string;
  price: number;
  sort_order?: number;
}

// --- Product Flavors ---

export interface ProductFlavor {
  id: string;
  product_id: string;
  name: string;
  sort_order: number;
  created_at: string;
}

export interface ProductFlavorInsert {
  product_id: string;
  name: string;
  sort_order?: number;
}

// --- Product Images ---

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  storage_path: string;
  is_main: boolean;
  sort_order: number;
  created_at: string;
}

export interface ProductImageInsert {
  product_id: string;
  url: string;
  storage_path: string;
  is_main?: boolean;
  sort_order?: number;
}

// --- Orders ---

export interface Order {
  id: string;
  reference_number: string;
  status: OrderStatus;
  fulfillment_type: FulfillmentType;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  subtotal: number;
  delivery_fee: number;
  total: number;
  preferred_date: string;
  preferred_time: string;
  special_instructions: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderWithRelations extends Order {
  items: OrderItem[];
  customer: CustomerDetails;
  delivery: DeliveryDetails | null;
}

export interface OrderInsert {
  reference_number: string;
  status?: OrderStatus;
  fulfillment_type: FulfillmentType;
  payment_method?: PaymentMethod;
  payment_status?: PaymentStatus;
  subtotal: number;
  delivery_fee: number;
  total: number;
  preferred_date: string;
  preferred_time: string;
  special_instructions?: string | null;
}

// --- Order Items ---

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  size_name: string;
  flavor_name: string;
  unit_price: number;
  quantity: number;
  line_total: number;
  created_at: string;
}

export interface OrderItemInsert {
  order_id: string;
  product_id?: string | null;
  product_name: string;
  size_name: string;
  flavor_name: string;
  unit_price: number;
  quantity: number;
  line_total: number;
}

// --- Customer Details ---

export interface CustomerDetails {
  id: string;
  order_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  created_at: string;
}

export interface CustomerDetailsInsert {
  order_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

// --- Delivery Details ---

export interface DeliveryDetails {
  id: string;
  order_id: string;
  street_address: string;
  barangay: string;
  city: string;
  landmarks: string | null;
  created_at: string;
}

export interface DeliveryDetailsInsert {
  order_id: string;
  street_address: string;
  barangay: string;
  city: string;
  landmarks?: string | null;
}

// --- Site Settings ---

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}
