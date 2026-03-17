import { z } from "zod";

// --- Category Schemas ---

export const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  description: z.string().max(500).nullable().optional(),
  image_url: z.string().url().nullable().optional(),
  sort_order: z.number().int().min(0).default(0),
});

// --- Product Schemas ---

export const productSizeSchema = z.object({
  name: z.string().min(1, "Size name is required").max(50),
  price: z.number().positive("Price must be positive"),
  sort_order: z.number().int().min(0).default(0),
});

export const productFlavorSchema = z.object({
  name: z.string().min(1, "Flavor name is required").max(50),
  sort_order: z.number().int().min(0).default(0),
});

export const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(150),
  slug: z.string().min(2).max(150).regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  description: z.string().min(10, "Description must be at least 10 characters").max(2000),
  base_price: z.number().min(100, "Minimum price is ₱100").positive(),
  category_id: z.string().uuid("Invalid category"),
  lead_time_days: z.number().int().min(0).max(30).default(2),
  is_visible: z.boolean().default(true),
  is_featured: z.boolean().default(false),
  sizes: z.array(productSizeSchema).min(1, "At least one size is required"),
  flavors: z.array(productFlavorSchema).min(1, "At least one flavor is required"),
});

// --- Order Schemas ---

export const customerDetailsSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters").max(100),
  last_name: z.string().min(2, "Last name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15)
    .regex(/^(\+?63|0)\d{9,10}$/, "Enter a valid Philippine phone number"),
});

export const deliveryDetailsSchema = z.object({
  street_address: z.string().min(5, "Street address must be at least 5 characters").max(200),
  barangay: z.string().min(2, "Barangay is required").max(100),
  city: z.string().min(2, "City is required").max(100),
  landmarks: z.string().max(200).nullable().optional(),
});

export const orderItemSchema = z.object({
  product_id: z.string().uuid().nullable().optional(),
  product_name: z.string().min(1),
  size_name: z.string().min(1, "Please select a size"),
  flavor_name: z.string().min(1, "Please select a flavor"),
  unit_price: z.number().positive(),
  quantity: z.number().int().min(1).max(20),
});

export const orderSchema = z
  .object({
    fulfillment_type: z.enum(["pickup", "delivery"]),
    preferred_date: z.string().min(1, "Please select a date"),
    preferred_time: z.string().min(1, "Please select a time"),
    special_instructions: z.string().max(500).nullable().optional(),
    customer: customerDetailsSchema,
    items: z.array(orderItemSchema).min(1, "At least one item is required"),
    delivery: deliveryDetailsSchema.optional(),
  })
  .refine(
    (data) => {
      if (data.fulfillment_type === "delivery") {
        return !!data.delivery;
      }
      return true;
    },
    { message: "Delivery details are required for delivery orders", path: ["delivery"] }
  );

// --- Auth Schema ---

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// --- Inferred Types ---

export type CategoryFormData = z.infer<typeof categorySchema>;
export type ProductFormData = z.infer<typeof productSchema>;
export type OrderFormData = z.infer<typeof orderSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
