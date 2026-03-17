import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { getProducts } from "@/lib/queries";
import { formatCurrency } from "@/lib/helpers";

export const metadata: Metadata = {
  title: "Manage Products",
};

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Products</h1>
        <Link
          href="/admin/products/new"
          className={cn(buttonVariants({ size: "sm" }))}
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Add Product
        </Link>
      </div>

      {/* Products Table */}
      <div className="rounded-xl border border-border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Image</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Category</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Base Price</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Visible</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Featured</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product: any) => {
                  const mainImage = product.images?.find((img: any) => img.is_main);
                  const firstImage = product.images?.[0];
                  const imageUrl = mainImage?.url || firstImage?.url;
                  return (
                    <tr key={product.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="h-10 w-10 rounded-lg bg-muted overflow-hidden relative">
                          {imageUrl ? (
                            <Image src={imageUrl} alt={product.name} fill className="object-cover" sizes="40px" />
                          ) : (
                            <div className="flex items-center justify-center h-full text-xs text-muted-foreground">—</div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium">
                        <Link href={`/cakes/${product.slug}`} className="hover:text-rose" target="_blank">
                          {product.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{product.category?.name || "—"}</td>
                      <td className="px-4 py-3 font-medium">{formatCurrency(product.base_price)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block h-2 w-2 rounded-full ${product.is_visible ? "bg-success" : "bg-muted-foreground"}`} />
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block h-2 w-2 rounded-full ${product.is_featured ? "bg-warning" : "bg-muted-foreground"}`} />
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/admin/products/${product.id}/edit`} className="text-xs text-rose hover:underline">
                          Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                    No products yet. Click &quot;Add Product&quot; to create your first product.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
