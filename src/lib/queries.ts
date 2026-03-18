import { createClient } from "@/lib/supabase/server";

// --- Categories ---

export async function getCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }
  return data ?? [];
}

// --- Products ---

export async function getFeaturedProducts(limit = 6) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(name, slug),
      images:product_images(url, is_main, sort_order),
      sizes:product_sizes(id, name, price, sort_order)
    `)
    .eq("is_visible", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured products:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getProducts(categorySlug?: string) {
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select(`
      *,
      category:categories(name, slug),
      images:product_images(url, is_main, sort_order),
      sizes:product_sizes(id, name, price, sort_order)
    `)
    .eq("is_visible", true)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (categorySlug && categorySlug !== "all") {
    // Need to get category ID first
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", categorySlug)
      .single();

    if (cat) {
      query = query.eq("category_id", cat.id);
    }
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getProductById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(id, name, slug),
      images:product_images(id, url, storage_path, is_main, sort_order),
      sizes:product_sizes(id, name, price, sort_order),
      flavors:product_flavors(id, name, sort_order)
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product by ID:", error.message);
    return null;
  }
  return data;
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(name, slug),
      images:product_images(url, is_main, sort_order),
      sizes:product_sizes(id, name, price, sort_order),
      flavors:product_flavors(id, name, sort_order)
    `)
    .eq("slug", slug)
    .eq("is_visible", true)
    .single();

  if (error) {
    console.error("Error fetching product:", error.message);
    return null;
  }
  return data;
}

// --- Orders ---

export async function getOrders() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      customer:customer_details(*),
      items:order_items(*, product:products(name, slug))
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getOrderById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      customer:customer_details(*),
      items:order_items(*, product:products(name, slug)),
      delivery:delivery_details(*)
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching order:", error.message);
    return null;
  }
  return data;
}

export async function deleteOrder(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting order:", error.message);
    throw new Error("Failed to delete order");
  }
  return true;
}

// --- Admin Stats ---

export async function getAdminStats() {
  const supabase = await createClient();

  const [ordersRes, productsRes, pendingRes] = await Promise.all([
    supabase.from("orders").select("id, total", { count: "exact" }),
    supabase.from("products").select("id", { count: "exact" }).eq("is_visible", true),
    supabase.from("orders").select("id", { count: "exact" }).eq("status", "pending"),
  ]);

  const totalOrders = ordersRes.count ?? 0;
  const totalProducts = productsRes.count ?? 0;
  const pendingOrders = pendingRes.count ?? 0;
  const totalRevenue = (ordersRes.data ?? [])
    .reduce((sum, o) => sum + (o.total ?? 0), 0);

  return { totalOrders, totalProducts, pendingOrders, totalRevenue };
}
