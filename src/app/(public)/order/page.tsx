import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderForm } from "@/components/order-form";

export const metadata: Metadata = {
  title: "Place an Order",
  description:
    "Order a custom cake from Jessa Cakes. Choose pickup or delivery in Malandag, Malungon, Sarangani Province.",
};

export default function OrderPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-foreground">Place an Order</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Fill out the form below and we&apos;ll prepare your cake
        </p>
      </div>

      <div className="rounded-xl border border-border bg-white p-6 sm:p-8 shadow-sm">
        <Suspense
          fallback={
            <div className="text-center py-12 text-muted-foreground">
              Loading order form...
            </div>
          }
        >
          <OrderForm />
        </Suspense>
      </div>
    </div>
  );
}
