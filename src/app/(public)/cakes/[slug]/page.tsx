import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { getProductBySlug } from "@/lib/queries";
import { formatCurrency } from "@/lib/helpers";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description:
      product.description ||
      `Order ${product.name} from Jessa Cake Delights. Pickup or delivery in Malandag.`,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const mainImage = product.images?.find((img: any) => img.is_main);
  const firstImage = product.images?.[0];
  const heroImage = mainImage || firstImage;
  const galleryImages = product.images?.filter(
    (img: any) => img.url !== heroImage?.url
  ) ?? [];
  const sizes = product.sizes?.sort(
    (a: any, b: any) => a.sort_order - b.sort_order
  ) ?? [];
  const flavors = product.flavors?.sort(
    (a: any, b: any) => a.sort_order - b.sort_order
  ) ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        href="/cakes"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-rose mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to All Cakes
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square rounded-xl bg-muted overflow-hidden relative">
            {heroImage ? (
              <Image
                src={heroImage.url}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No image available
              </div>
            )}
          </div>
          {galleryImages.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-2">
              {galleryImages.map((img: any, i: number) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-muted overflow-hidden relative"
                >
                  <Image
                    src={img.url}
                    alt={`${product.name} ${i + 2}`}
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          {product.category && (
            <Link
              href={`/cakes?category=${product.category.slug}`}
              className="inline-block rounded-full bg-rose-pale px-3 py-1 text-xs font-medium text-rose mb-3 hover:bg-rose-soft transition-colors"
            >
              {product.category.name}
            </Link>
          )}
          <h1 className="text-3xl font-bold text-foreground">
            {product.name}
          </h1>
          <p className="mt-2 text-2xl font-semibold text-rose">
            Starting at {formatCurrency(sizes.length > 0 ? Math.min(...sizes.map((s: any) => s.price)) : product.base_price)}
          </p>

          {product.description && (
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Sizes with Prices */}
          {sizes.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Available Sizes
              </h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size: any) => (
                  <div
                    key={size.id}
                    className="rounded-lg border border-border px-4 py-2 text-sm bg-white"
                  >
                    <span className="font-medium">{size.name}</span>
                    <span className="text-rose ml-2">
                      {formatCurrency(size.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Flavors */}
          {flavors.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Available Flavors
              </h3>
              <div className="flex flex-wrap gap-2">
                {flavors.map((flavor: any) => (
                  <span
                    key={flavor.id}
                    className="rounded-full bg-cream px-3 py-1 text-xs text-foreground"
                  >
                    {flavor.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Lead Time */}
          <p className="mt-6 text-sm text-muted-foreground">
            ⏱ Requires at least{" "}
            <strong>{product.lead_time_days} day{product.lead_time_days !== 1 ? "s" : ""}</strong>{" "}
            advance ordering
          </p>

          {/* CTA */}
          <Link
            href={`/order?product=${slug}`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full mt-8 text-base"
            )}
          >
            Order This Cake
          </Link>
        </div>
      </div>
    </div>
  );
}
