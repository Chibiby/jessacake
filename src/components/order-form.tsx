"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/helpers";
import { BUSINESS } from "@/lib/constants";

interface Product {
  id: string;
  name: string;
  slug: string;
  base_price: number;
  lead_time_days: number;
  sizes: { id: string; name: string; price: number; sort_order: number }[];
  flavors: { id: string; name: string; sort_order: number }[];
}

export function OrderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedProduct = searchParams.get("product");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedSizeId, setSelectedSizeId] = useState("");
  const [selectedFlavorId, setSelectedFlavorId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">("pickup");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Load products from Supabase
  useEffect(() => {
    async function loadProducts() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("products")
        .select(`
          id, name, slug, base_price, lead_time_days,
          sizes:product_sizes(id, name, price, sort_order),
          flavors:product_flavors(id, name, sort_order)
        `)
        .eq("is_visible", true)
        .order("name");

      if (!error && data) {
        setProducts(data as Product[]);
        // Pre-select product from URL
        if (preselectedProduct) {
          const found = data.find((p: any) => p.slug === preselectedProduct);
          if (found) {
            setSelectedProductId(found.id);
          }
        }
      }
      setLoading(false);
    }
    loadProducts();
  }, [preselectedProduct]);

  const selectedProduct = products.find((p) => p.id === selectedProductId);
  const selectedSize = selectedProduct?.sizes?.find((s) => s.id === selectedSizeId);
  const selectedFlavor = selectedProduct?.flavors?.find((f) => f.id === selectedFlavorId);

  // Calculate pricing
  const quantityNum = parseInt(quantity) || 1;
  const unitPrice = selectedSize?.price ?? selectedProduct?.base_price ?? 0;
  const subtotal = unitPrice * quantityNum;
  const deliveryFee = fulfillment === "delivery" ? 100 : 0;
  const total = subtotal + deliveryFee;

  // Get min date based on lead time
  const minDate = selectedProduct
    ? (() => {
        const d = new Date();
        d.setDate(d.getDate() + (selectedProduct.lead_time_days || 2));
        return d.toISOString().split("T")[0];
      })()
    : (() => {
        const d = new Date();
        d.setDate(d.getDate() + 2);
        return d.toISOString().split("T")[0];
      })();

  // Reset size/flavor when product changes
  useEffect(() => {
    setSelectedSizeId("");
    setSelectedFlavorId("");
  }, [selectedProductId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Validation
    if (!firstName || !lastName || !phone) {
      setError("Please fill in your name and phone number.");
      return;
    }
    if (!selectedProductId) {
      setError("Please select a cake.");
      return;
    }
    if (!preferredDate) {
      setError("Please select a preferred date.");
      return;
    }
    if (selectedProduct && selectedProduct.sizes?.length > 0 && !selectedSizeId) {
      setError("Please select a size.");
      return;
    }
    if (selectedProduct && selectedProduct.flavors?.length > 0 && !selectedFlavorId) {
      setError("Please select a flavor.");
      return;
    }
    if (!quantity || parseInt(quantity) < 1) {
      setError("Please enter a valid quantity.");
      return;
    }

    setSubmitting(true);

    try {
      const supabase = createClient();

      // Generate reference number
      const now = new Date();
      const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
      const rand = String(Math.floor(Math.random() * 999) + 1).padStart(3, "0");
      const referenceNumber = `JCD-${dateStr}-${rand}`;

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          reference_number: referenceNumber,
          status: "pending",
          fulfillment_type: fulfillment,
          payment_method: "cash",
          payment_status: "unpaid",
          subtotal: subtotal,
          delivery_fee: deliveryFee,
          total: total,
          preferred_date: preferredDate,
          preferred_time: preferredTime || "Not specified",
          special_instructions: specialInstructions || null,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create customer details
      const { error: custError } = await supabase
        .from("customer_details")
        .insert({
          order_id: order.id,
          first_name: firstName,
          last_name: lastName,
          email: email || null,
          phone: phone,
        });

      if (custError) throw custError;

      // Create order item
      const selectedProduct = products.find((p) => p.id === selectedProductId);
      const { error: itemError } = await supabase
        .from("order_items")
        .insert({
          order_id: order.id,
          product_id: selectedProductId,
          product_name: selectedProduct?.name || "Unknown Product",
          size_name: selectedSize?.name || "Standard",
          flavor_name: selectedFlavor?.name || null,
          quantity: quantityNum,
          unit_price: unitPrice,
          line_total: subtotal,
        });

      if (itemError) throw itemError;

      // Create delivery details if delivery
      if (fulfillment === "delivery" && deliveryAddress) {
        const { error: delError } = await supabase
          .from("delivery_details")
          .insert({
            order_id: order.id,
            street_address: deliveryAddress,
            barangay: "Malandag",
            city: "Malungon",
            landmarks: null,
          });

        if (delError) throw delError;
      }

      // Redirect to confirmation
      router.push(`/order/confirmation?ref=${referenceNumber}`);
    } catch (err: any) {
      setError(err.message || "Failed to submit order. Please try again.");
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Loading products...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error */}
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Step 1: Customer Info */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          1. Your Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              First Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g., Maria"
              required
              className="w-full rounded-lg border border-input px-3 py-2 text-sm focus:border-rose focus:ring-1 focus:ring-rose/30 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Last Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="e.g., Cruz"
              required
              className="w-full rounded-lg border border-input px-3 py-2 text-sm focus:border-rose focus:ring-1 focus:ring-rose/30 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., maria@email.com"
              className="w-full rounded-lg border border-input px-3 py-2 text-sm focus:border-rose focus:ring-1 focus:ring-rose/30 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Phone <span className="text-destructive">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g., 09171234567"
              required
              className="w-full rounded-lg border border-input px-3 py-2 text-sm focus:border-rose focus:ring-1 focus:ring-rose/30 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Step 2: Product Selection */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          2. Select Your Cake <span className="text-destructive">*</span>
        </h2>

        {products.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No products available yet. Please check back later.
          </p>
        ) : (
          <>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              required
              className="w-full rounded-lg border border-input px-3 py-2 text-sm focus:border-rose focus:ring-1 focus:ring-rose/30 outline-none"
            >
              <option value="">— Select a cake —</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {formatCurrency(p.base_price)}
                </option>
              ))}
            </select>

            {/* Size Picker */}
            {selectedProduct && selectedProduct.sizes?.length > 0 && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizes
                    .sort((a, b) => a.sort_order - b.sort_order)
                    .map((size) => (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => setSelectedSizeId(size.id)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm transition-colors ${
                          selectedSizeId === size.id
                            ? "border-rose bg-rose-faint text-rose font-medium"
                            : "border-border hover:border-rose-soft"
                        }`}
                      >
                        {size.name} — {formatCurrency(size.price)}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Flavor Picker */}
            {selectedProduct && selectedProduct.flavors?.length > 0 && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Flavor
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.flavors
                    .sort((a, b) => a.sort_order - b.sort_order)
                    .map((flavor) => (
                      <button
                        key={flavor.id}
                        type="button"
                        onClick={() => setSelectedFlavorId(flavor.id)}
                        className={`rounded-full border-2 px-4 py-1.5 text-sm transition-colors ${
                          selectedFlavorId === flavor.id
                            ? "border-rose bg-rose-faint text-rose font-medium"
                            : "border-border hover:border-rose-soft"
                        }`}
                      >
                        {flavor.name}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            {selectedProduct && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-foreground mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={quantity}
                  onChange={(e) => {
                    const value = e.target.value;
                    setQuantity(value);
                  }}
                  className="w-24 rounded-lg border border-input px-3 py-2 text-sm focus:border-rose focus:ring-1 focus:ring-rose/30 outline-none"
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Step 3: Fulfillment */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          3. Pickup or Delivery
        </h2>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setFulfillment("pickup")}
            className={`flex-1 rounded-lg border-2 p-4 text-center text-sm font-medium transition-colors ${
              fulfillment === "pickup"
                ? "border-rose bg-rose-faint text-rose"
                : "border-border text-muted-foreground hover:border-rose-soft"
            }`}
          >
            Pickup
            <span className="block text-xs mt-1 font-normal">
              {BUSINESS.address}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setFulfillment("delivery")}
            className={`flex-1 rounded-lg border-2 p-4 text-center text-sm font-medium transition-colors ${
              fulfillment === "delivery"
                ? "border-rose bg-rose-faint text-rose"
                : "border-border text-muted-foreground hover:border-rose-soft"
            }`}
          >
            Delivery
            <span className="block text-xs mt-1 font-normal">
              Within Malandag area
            </span>
          </button>
        </div>

        {fulfillment === "delivery" && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-foreground mb-1">
              Delivery Address <span className="text-destructive">*</span>
            </label>
            <textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Full delivery address..."
              required={fulfillment === "delivery"}
              rows={2}
              className="w-full rounded-lg border border-input px-3 py-2 text-sm focus:border-rose focus:ring-1 focus:ring-rose/30 outline-none resize-none"
            />
          </div>
        )}
      </div>

      {/* Step 4: Date & Time */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          4. Preferred Date & Time <span className="text-destructive">*</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Date
            </label>
            <input
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              min={minDate}
              required
              className="w-full rounded-lg border border-input px-3 py-2 text-sm focus:border-rose focus:ring-1 focus:ring-rose/30 outline-none"
            />
            {selectedProduct && (
              <p className="text-xs text-muted-foreground mt-1">
                Minimum {selectedProduct.lead_time_days} day{selectedProduct.lead_time_days !== 1 ? "s" : ""} advance
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Time (optional)
            </label>
            <input
              type="time"
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full rounded-lg border border-input px-3 py-2 text-sm focus:border-rose focus:ring-1 focus:ring-rose/30 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Special Instructions */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Special Instructions (optional)
        </label>
        <textarea
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          placeholder="Custom text on cake, design preferences, allergies, etc."
          rows={3}
          className="w-full rounded-lg border border-input px-3 py-2 text-sm focus:border-rose focus:ring-1 focus:ring-rose/30 outline-none resize-none"
        />
      </div>

      {/* Order Summary */}
      <div className="rounded-lg bg-muted p-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">
          Order Summary
        </h3>
        {selectedProduct ? (
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{selectedProduct.name}</span>
              <span>{formatCurrency(unitPrice)}</span>
            </div>
            {selectedSize && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size: {selectedSize.name}</span>
              </div>
            )}
            {selectedFlavor && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Flavor: {selectedFlavor.name}</span>
              </div>
            )}
            {quantityNum > 1 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Qty: ×{quantityNum}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fulfillment</span>
              <span className="capitalize">{fulfillment}</span>
            </div>
            {deliveryFee > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>{formatCurrency(deliveryFee)}</span>
              </div>
            )}
            <hr className="border-border my-2" />
            <div className="flex justify-between font-bold text-foreground">
              <span>Total</span>
              <span className="text-rose">{formatCurrency(total)}</span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Select a cake to see the summary.
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={submitting || !selectedProductId || !preferredDate}
        className="w-full"
        size="lg"
      >
        {submitting ? "Submitting Order..." : "Submit Order"}
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        Payment: Cash on Pickup / Cash on Delivery
      </p>
    </form>
  );
}
