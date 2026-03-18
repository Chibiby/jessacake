import type { Metadata } from "next";
import Link from "next/link";
import { getOrders } from "@/lib/queries";
import { formatCurrency, formatDateTime } from "@/lib/helpers";
import { ORDER_STATUSES, FULFILLMENT_TYPES, PAYMENT_STATUSES } from "@/lib/constants";
import { DeleteOrderButton } from "@/components/orders/delete-button";

export const metadata: Metadata = {
  title: "Manage Orders",
};

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Orders</h1>
        <span className="text-sm text-muted-foreground">{orders.length} total</span>
      </div>

      {/* Orders Table */}
      <div className="rounded-xl border border-border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Reference</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Customer</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Type</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Total</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Payment</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order: any) => {
                  const statusConfig = ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES];
                  const paymentConfig = PAYMENT_STATUSES[order.payment_status as keyof typeof PAYMENT_STATUSES];
                  return (
                    <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium">
                        <Link href={`/admin/orders/${order.id}`} className="text-rose hover:underline">
                          {order.reference_number}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {order.customer?.first_name} {order.customer?.last_name}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig?.bgColor} ${statusConfig?.color}`}>
                          {statusConfig?.label || order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground capitalize">
                        {FULFILLMENT_TYPES[order.fulfillment_type as keyof typeof FULFILLMENT_TYPES] || order.fulfillment_type}
                      </td>
                      <td className="px-4 py-3 font-medium">{formatCurrency(order.total)}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium ${paymentConfig?.color}`}>
                          {paymentConfig?.label || order.payment_status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        {order.created_at ? formatDateTime(order.created_at) : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="text-xs text-rose hover:underline"
                          >
                            View
                          </Link>
                          <DeleteOrderButton 
                            orderId={order.id} 
                            referenceNumber={order.reference_number} 
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                    No orders yet. Orders will appear here once customers place them.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
