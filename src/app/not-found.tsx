import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-rose">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-foreground">
        Page Not Found
      </h2>
      <p className="mt-2 text-muted-foreground max-w-md">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
        have been moved or doesn&apos;t exist.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/" className={cn(buttonVariants(), "text-base")}>
          Go Home
        </Link>
        <Link
          href="/cakes"
          className={cn(buttonVariants({ variant: "outline" }), "text-base")}
        >
          Browse Cakes
        </Link>
      </div>
    </div>
  );
}
