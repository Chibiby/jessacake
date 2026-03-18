import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/queries";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/helpers";
import { ORDER_STATUSES, ORDER_STATUS_TRANSITIONS, FULFILLMENT_TYPES, PAYMENT_STATUSES } from "@/lib/constants";
import { OrderStatusUpdate } from "@/components/order-status-update";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Order Detail",
};

export default async function AdminOrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  const statusConfig = ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES];
  const paymentConfig = PAYMENT_STATUSES[order.payment_status as keyof typeof PAYMENT_STATUSES];

  return (
    <div>
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-rose mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Orders
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-foreground">
                {order.reference_number}
              </h1>
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusConfig?.bgColor} ${statusConfig?.color}`}>
                {statusConfig?.label || order.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Fulfillment</span>
                <p className="font-medium capitalize">
                  {FULFILLMENT_TYPES[order.fulfillment_type as keyof typeof FULFILLMENT_TYPES] || order.fulfillment_type}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Payment</span>
                <p className={`font-medium ${paymentConfig?.color}`}>
                  {paymentConfig?.label || order.payment_status}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Preferred Date</span>
                <p className="font-medium">
                  {order.preferred_date ? formatDate(order.preferred_date) : "—"}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Preferred Time</span>
                <p className="font-medium">{order.preferred_time || "—"}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Order Placed</span>
                <p className="font-medium">
                  {order.created_at ? formatDateTime(order.created_at) : "—"}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Total</span>
                <p className="font-bold text-rose text-lg">
                  {formatCurrency(order.total)}
                </p>
              </div>
            </div>
            {order.special_instructions && (
              <div className="mt-4 rounded-lg bg-cream p-3">
                <span className="text-xs font-medium text-muted-foreground">Special Instructions</span>
                <p className="text-sm mt-1">{order.special_instructions}</p>
              </div>
            )}
          </div>

          {/* Order Items */}
          <div className="rounded-xl border border-border bg-white p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Order Items
            </h2>
            {order.items && order.items.length > 0 ? (
              <div className="space-y-3">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-sm">{item.product?.name || "Unknown Product"}</p>
                      <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                        {item.size_name && <span>Size: {item.size_name}</span>}
                        {item.flavor_name && <span>Flavor: {item.flavor_name}</span>}
                        <span>Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <p className="font-medium text-sm">{formatCurrency(item.line_total)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No items found.</p>
            )}
          </div>
        </div>

        {/* Sidebar: Status Update, Customer & Delivery */}
        <div className="space-y-6">
          {/* Status & Payment Update */}
          <div className="rounded-xl border border-border bg-white p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Manage Order
            </h2>
            <OrderStatusUpdate
              orderId={order.id}
              currentStatus={order.status}
              currentPaymentStatus={order.payment_status}
              statusTransitions={ORDER_STATUS_TRANSITIONS}
              statusLabels={ORDER_STATUSES}
            />
          </div>

          <div className="rounded-xl border border-border bg-white p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Customer
            </h2>
            {order.customer ? (
              <div className="space-y-2 text-sm">
                <p className="font-medium">
                  {order.customer.first_name} {order.customer.last_name}
                </p>
                {order.customer.phone && (
                  <p className="text-muted-foreground">📱 {order.customer.phone}</p>
                )}
                {order.customer.email && (
                  <p className="text-muted-foreground">✉️ {order.customer.email}</p>
                )}
                {order.customer.facebook_link && (
                  <div className="pt-2">
                    <a
                      href={order.customer.facebook_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-rose hover:text-rose/80 hover:underline transition-colors"
                    >
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      View Facebook Profile
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No customer info.</p>
            )}
          </div>

          {order.fulfillment_type === "delivery" && order.delivery && (
            <div className="rounded-xl border border-border bg-white p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Delivery Details
              </h2>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>{order.delivery.street_address || "No street address"}</p>
                <p>{order.delivery.barangay}, {order.delivery.city}</p>
                {order.delivery.landmarks && (
                  <p className="text-xs mt-2">Landmarks: {order.delivery.landmarks}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
