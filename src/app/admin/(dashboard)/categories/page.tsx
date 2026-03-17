import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { CategoryManager } from "@/components/category-manager";

export const metadata: Metadata = {
  title: "Manage Categories",
};

export default async function AdminCategoriesPage() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("*, products(id)")
    .order("sort_order", { ascending: true });

  const formatted = (categories || []).map((cat: any) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    sort_order: cat.sort_order,
    productCount: cat.products?.length || 0,
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Categories</h1>
        <span className="text-sm text-muted-foreground">
          {formatted.length} categories
        </span>
      </div>

      <CategoryManager categories={formatted} />
    </div>
  );
}
