import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag, Cake, DollarSign, Clock } from "lucide-react";
import { getAdminStats, getOrders } from "@/lib/queries";
import { formatCurrency, formatDateTime } from "@/lib/helpers";
import { ORDER_STATUSES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const [stats, orders] = await Promise.all([
    getAdminStats(),
    getOrders(),
  ]);

  const recentOrders = orders.slice(0, 5);

  const statCards = [
    {
      label: "Total Orders",
      value: String(stats.totalOrders),
      icon: ShoppingBag,
      color: "text-info",
      bgColor: "bg-info-light",
    },
    {
      label: "Active Products",
      value: String(stats.totalProducts),
      icon: Cake,
      color: "text-rose",
      bgColor: "bg-rose-pale",
    },
    {
      label: "Pending Orders",
      value: String(stats.pendingOrders),
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning-light",
    },
    {
      label: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: "text-success",
      bgColor: "bg-success-light",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${stat.bgColor}`}
                >
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="rounded-xl border border-border bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Recent Orders
          </h2>
          <Link
            href="/admin/orders"
            className="text-sm text-rose hover:underline"
          >
            View all →
          </Link>
        </div>
        {recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">Ref</th>
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">Customer</th>
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">Status</th>
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">Total</th>
                  <th className="text-left px-3 py-2 font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order: any) => {
                  const statusConfig = ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES];
                  return (
                    <tr key={order.id} className="border-b border-border last:border-0">
                      <td className="px-3 py-3">
                        <Link href={`/admin/orders/${order.id}`} className="text-rose hover:underline font-medium">
                          {order.reference_number}
                        </Link>
                      </td>
                      <td className="px-3 py-3 text-muted-foreground">
                        {order.customer?.first_name} {order.customer?.last_name}
                      </td>
                      <td className="px-3 py-3">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig?.bgColor} ${statusConfig?.color}`}>
                          {statusConfig?.label || order.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 font-medium">{formatCurrency(order.total)}</td>
                      <td className="px-3 py-3 text-muted-foreground text-xs">
                        {order.created_at ? formatDateTime(order.created_at) : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground text-center py-8">
            No orders yet. Orders will appear here once customers place them.
          </div>
        )}
      </div>
    </div>
  );
}
