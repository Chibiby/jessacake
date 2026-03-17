"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

interface OrderStatusUpdateProps {
  orderId: string;
  currentStatus: string;
  currentPaymentStatus: string;
  statusTransitions: Record<string, string[]>;
  statusLabels: Record<string, { label: string; color: string; bgColor: string }>;
}

export function OrderStatusUpdate({
  orderId,
  currentStatus,
  currentPaymentStatus,
  statusTransitions,
  statusLabels,
}: OrderStatusUpdateProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validNextStatuses = statusTransitions[currentStatus] || [];

  async function updateStatus(newStatus: string) {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (updateError) throw updateError;

      setSuccess(`Status updated to "${statusLabels[newStatus]?.label || newStatus}"`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to update status.");
    } finally {
      setSaving(false);
    }
  }

  async function togglePayment() {
    setSaving(true);
    setError("");
    setSuccess("");

    const newPayment = currentPaymentStatus === "paid" ? "unpaid" : "paid";

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("orders")
        .update({ payment_status: newPayment })
        .eq("id", orderId);

      if (updateError) throw updateError;

      setSuccess(`Payment marked as "${newPayment}"`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to update payment status.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-xs text-destructive">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg bg-success-light px-3 py-2 text-xs text-success">
          {success}
        </div>
      )}

      {/* Status Transitions */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-2">
          Update Status
        </h3>
        {validNextStatuses.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {validNextStatuses.map((status) => {
              const config = statusLabels[status];
              const isCancelled = status === "cancelled";
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => updateStatus(status)}
                  disabled={saving}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors disabled:opacity-50 ${
                    isCancelled
                      ? "border-destructive text-destructive hover:bg-red-50"
                      : "border-rose text-rose hover:bg-rose-faint"
                  }`}
                >
                  {config?.label || status}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            No further status transitions available.
          </p>
        )}
      </div>

      {/* Payment Toggle */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-2">
          Payment Status
        </h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={togglePayment}
          disabled={saving}
          className="text-xs"
        >
          {currentPaymentStatus === "paid"
            ? "Mark as Unpaid"
            : "Mark as Paid"}
        </Button>
      </div>
    </div>
  );
}
