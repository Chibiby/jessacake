import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getProductById, getCategories } from "@/lib/queries";
import { ProductForm } from "@/components/product-form";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Product",
};

export default async function AdminEditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-rose mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <h1 className="text-2xl font-bold text-foreground mb-6">
        Edit Product: {product.name}
      </h1>

      <ProductForm mode="edit" product={product} categories={categories} />
    </div>
  );
}
