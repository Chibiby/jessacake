import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { FlavorManager } from "@/components/flavor-manager";

export const metadata: Metadata = {
  title: "Manage Flavors",
};

export default async function AdminFlavorsPage() {
  const supabase = await createClient();

  // Get all product_flavors with their product associations
  const { data: allFlavors } = await supabase
    .from("product_flavors")
    .select("id, name, product_id")
    .order("name");

  // Group by unique flavor name and count products
  const flavorMap = new Map<string, { id: string; name: string; productCount: number }>();
  for (const f of allFlavors || []) {
    if (flavorMap.has(f.name)) {
      const existing = flavorMap.get(f.name)!;
      existing.productCount += 1;
    } else {
      flavorMap.set(f.name, { id: f.id, name: f.name, productCount: 1 });
    }
  }

  const flavors = Array.from(flavorMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Flavors</h1>
        <span className="text-sm text-muted-foreground">
          {flavors.length} unique flavors
        </span>
      </div>

      <FlavorManager flavors={flavors} />
    </div>
  );
}
