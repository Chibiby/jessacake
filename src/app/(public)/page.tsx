import Link from "next/link";
import { Cake, Truck, Clock, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { getFeaturedProducts } from "@/lib/queries";
import { ProductCard } from "@/components/product-card";

export default async function HomePage() {
  let featuredProducts = [];
  try {
    featuredProducts = await getFeaturedProducts(6);
  } catch (error) {
    console.error("Failed to load featured products:", error);
    // Continue with empty products array
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-rose-faint to-white py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p
            className="text-rose text-lg mb-2"
            style={{ fontFamily: "var(--font-accent)" }}
          >
            Welcome to
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Jessa Cakes
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Making every celebration sweeter. Handcrafted cakes for birthdays,
            christenings, graduations, and all your special moments — delivered
            fresh in Malandag.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cakes"
              className={cn(buttonVariants({ size: "lg" }), "text-base px-8")}
            >
              View Our Cakes
            </Link>
            <Link
              href="/order"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "text-base px-8"
              )}
            >
              Order Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features / Value Props */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-pale">
                <Cake className="h-6 w-6 text-rose" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">
                Custom Designs
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                From princess castles to character themes — we bring your vision to
                life.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-pale">
                <Star className="h-6 w-6 text-rose" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">
                Homemade Quality
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Baked with love using quality ingredients since 2018.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-pale">
                <Truck className="h-6 w-6 text-rose" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">
                Pickup or Delivery
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Pick up from our shop or get it delivered within Malandag.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-pale">
                <Clock className="h-6 w-6 text-rose" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">
                Easy Ordering
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Browse, choose, and order online — cash payment on pickup or
                delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-rose-faint/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">
              Our Popular Cakes
            </h2>
            <p className="mt-2 text-muted-foreground">
              Browse our most-loved creations
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product: any) => {
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
            <div className="text-center py-12 text-muted-foreground">
              <Cake className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
              <p>Our cake catalog is being prepared. Check back soon!</p>
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              href="/cakes"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "text-base"
              )}
            >
              View All Cakes
            </Link>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Jessa Cakes began in 2018 as a small home-based cake
            business. What started as a passion for baking has grown into a
            beloved local bakery with a dedicated shop in Malandag, serving the
            community with high-quality cakes and creative designs.
          </p>
          <Link
            href="/about"
            className={cn(
              buttonVariants({ variant: "link" }),
              "mt-4 text-base"
            )}
          >
            Read Our Full Story →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-t from-rose-faint to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground">
            Ready to Order?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Browse our selection and place your order today.
          </p>
          <Link
            href="/order"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-6 text-base px-10"
            )}
          >
            Order Now
          </Link>
        </div>
      </section>
    </>
  );
}
