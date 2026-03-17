import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your order has been placed successfully.",
};

interface ConfirmationPageProps {
  searchParams: Promise<{ ref?: string }>;
}

export default async function OrderConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  const { ref } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8 text-center">
      <div className="flex justify-center mb-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-light">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-foreground">
        Order Placed Successfully!
      </h1>

      <p className="mt-4 text-muted-foreground">
        Thank you for your order. We&apos;ll review it and confirm shortly.
      </p>

      <div className="mt-8 rounded-xl border border-border bg-white p-6 inline-block">
        <p className="text-sm text-muted-foreground">Your Reference Number</p>
        <p className="mt-1 text-2xl font-bold text-rose tracking-wider">
          {ref || "JCD-XXXXXXXX-XXX"}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Please save this number for tracking your order.
        </p>
      </div>

      <div className="mt-8 space-y-3">
        <p className="text-sm text-muted-foreground">
          <strong>What&apos;s next?</strong> We will confirm your order via
          phone or text. Payment is <strong>cash on pickup/delivery</strong>.
        </p>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/cakes"
          className={cn(buttonVariants({ variant: "outline" }), "text-base")}
        >
          Browse More Cakes
        </Link>
        <Link
          href="/"
          className={cn(buttonVariants(), "text-base")}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
