import type { OrderStatus, FulfillmentType, PaymentStatus } from "@/types/database";

// --- Order Status Config ---

export const ORDER_STATUSES: Record<
  OrderStatus,
  { label: string; color: string; bgColor: string }
> = {
  pending: { label: "Pending", color: "text-warning", bgColor: "bg-warning-light" },
  confirmed: { label: "Confirmed", color: "text-info", bgColor: "bg-info-light" },
  preparing: { label: "Preparing", color: "text-warning", bgColor: "bg-warning-light" },
  ready_for_pickup: { label: "Ready for Pickup", color: "text-success", bgColor: "bg-success-light" },
  out_for_delivery: { label: "Out for Delivery", color: "text-success", bgColor: "bg-success-light" },
  completed: { label: "Completed", color: "text-success", bgColor: "bg-success-light" },
  cancelled: { label: "Cancelled", color: "text-destructive", bgColor: "bg-red-50" },
};

// Valid status transitions
export const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["preparing", "cancelled"],
  preparing: ["ready_for_pickup", "out_for_delivery", "cancelled"],
  ready_for_pickup: ["completed", "cancelled"],
  out_for_delivery: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
};

// --- Fulfillment Types ---

export const FULFILLMENT_TYPES: Record<FulfillmentType, string> = {
  pickup: "Pickup",
  delivery: "Delivery",
};

// --- Payment Status ---

export const PAYMENT_STATUSES: Record<PaymentStatus, { label: string; color: string }> = {
  unpaid: { label: "Unpaid", color: "text-warning" },
  paid: { label: "Paid", color: "text-success" },
};

// --- Product Categories (for reference/seeding) ---

export const DEFAULT_CATEGORIES = [
  { name: "Birthday Cakes", slug: "birthday-cakes", description: "Custom cakes for birthday celebrations" },
  { name: "Christening Cakes", slug: "christening-cakes", description: "Cakes for baptism and christening events" },
  { name: "Graduation Cakes", slug: "graduation-cakes", description: "Celebratory cakes for graduates" },
  { name: "Valentine's Specials", slug: "valentines-specials", description: "Heart-shaped cakes and desserts for Valentine's" },
  { name: "Formal/Celebration", slug: "formal-celebration", description: "Elegant multi-layer cakes for formal events" },
  { name: "Character-Themed", slug: "character-themed", description: "Cakes with character designs (Kuromi, Disney, etc.)" },
  { name: "Cupcake Sets", slug: "cupcake-sets", description: "Cupcake bundles and cake + cupcake packages" },
] as const;

// --- Business Info ---

export const BUSINESS = {
  name: "Jessa Cakes",
  tagline: "Making Every Celebration Sweeter",
  address: "Malandag, Malungon, Sarangani Province, Philippines",
  phone: "", // To be confirmed with owner
  email: "", // To be confirmed with owner
  operatingHours: "Mon–Sat, 8:00 AM – 6:00 PM",
  socialFacebook: "https://www.facebook.com/jessa.vlog.384061",
  socialInstagram: "", // To be confirmed
} as const;

// --- Reference Number ---

export const REFERENCE_PREFIX = "JCD";

// --- Image Upload ---

export const IMAGE_CONFIG = {
  maxSizeBytes: 5 * 1024 * 1024, // 5 MB
  maxSizeMB: 5,
  allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  maxGalleryImages: 4,
  bucket: "product-images",
} as const;

// --- Navigation Links ---

export const PUBLIC_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/cakes", label: "Our Cakes" },
  { href: "/order", label: "Order Now" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
] as const;

export const ADMIN_NAV_LINKS = [
  { href: "/admin", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/admin/orders", label: "Orders", icon: "ShoppingBag" },
  { href: "/admin/products", label: "Products", icon: "Cake" },
  { href: "/admin/categories", label: "Categories", icon: "Tag" },
  { href: "/admin/flavors", label: "Flavors", icon: "IceCreamCone" },
] as const;
