import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/helpers";

interface ProductCardProps {
  name: string;
  slug: string;
  description: string | null;
  basePrice: number;
  categoryName?: string;
  imageUrl?: string;
  sizes?: { id: string; name: string; price: number; sort_order: number }[];
}

export function ProductCard({
  name,
  slug,
  description,
  basePrice,
  categoryName,
  imageUrl,
  sizes,
}: ProductCardProps) {
  // Derive starting price from sizes if available, otherwise use base_price
  const startingPrice = sizes && sizes.length > 0
    ? Math.min(...sizes.map((s) => s.price))
    : basePrice;
  return (
    <div className="rounded-xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      <Link href={`/cakes/${slug}`} className="block">
        <div className="aspect-square relative bg-muted overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              No image
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        {categoryName && (
          <span className="text-xs font-medium text-rose">{categoryName}</span>
        )}
        <Link href={`/cakes/${slug}`}>
          <h3 className="mt-1 text-sm font-semibold text-foreground line-clamp-1 hover:text-rose transition-colors">
            {name}
          </h3>
        </Link>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
        <p className="mt-2 text-sm font-bold text-rose">
          Starting at {formatCurrency(startingPrice)}
        </p>
        <Link
          href={`/cakes/${slug}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "w-full mt-3 text-xs"
          )}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
