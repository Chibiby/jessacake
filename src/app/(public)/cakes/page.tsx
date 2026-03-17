import type { Metadata } from "next";
import Link from "next/link";
import { Cake } from "lucide-react";
import { getProducts, getCategories } from "@/lib/queries";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Our Cakes",
  description:
    "Browse our full selection of custom cakes — birthday cakes, christening cakes, graduation cakes, character-themed cakes, and more.",
};

interface CakesPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function CakesPage({ searchParams }: CakesPageProps) {
  const { category } = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(category),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-foreground">Our Cakes</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Browse our collection of handcrafted cakes for every occasion
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <Link
          href="/cakes"
          className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
            !category
              ? "bg-rose text-white border-rose"
              : "border-border text-muted-foreground hover:bg-rose-pale hover:text-rose hover:border-rose-soft"
          }`}
        >
          All
        </Link>
        {categories.map((cat: any) => (
          <Link
            key={cat.slug}
            href={`/cakes?category=${cat.slug}`}
            className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
              category === cat.slug
                ? "bg-rose text-white border-rose"
                : "border-border text-muted-foreground hover:bg-rose-pale hover:text-rose hover:border-rose-soft"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => {
            const mainImage = product.images?.find((img: any) => img.is_main);
            const firstImage = product.images?.[0];
            return (
              <ProductCard
                key={product.id}
                name={product.name}
                slug={product.slug}
                description={product.description}
                basePrice={product.base_price}
                categoryName={product.category?.name}
                imageUrl={mainImage?.url || firstImage?.url}
                sizes={product.sizes}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <Cake className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
          <p className="text-lg font-medium">No cakes found</p>
          <p className="text-sm mt-1">
            {category
              ? "Try selecting a different category."
              : "Our cake catalog is being prepared. Check back soon!"}
          </p>
          {category && (
            <Link
              href="/cakes"
              className="inline-block mt-4 text-sm text-rose hover:underline"
            >
              View all cakes
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
