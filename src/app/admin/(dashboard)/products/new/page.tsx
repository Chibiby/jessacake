import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCategories } from "@/lib/queries";
import { ProductForm } from "@/components/product-form";

export const metadata: Metadata = {
  title: "Add Product",
};

export default async function AdminNewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-rose mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <h1 className="text-2xl font-bold text-foreground mb-6">Add Product</h1>

      <ProductForm mode="create" categories={categories} />
    </div>
  );
}
