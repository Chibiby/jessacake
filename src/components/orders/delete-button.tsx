"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface DeleteOrderButtonProps {
  orderId: string;
  referenceNumber: string;
}

export function DeleteOrderButton({ orderId, referenceNumber }: DeleteOrderButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (isDeleting) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete order ${referenceNumber}? This action cannot be undone.`
    );

    if (!confirmed) return;

    setIsDeleting(true);
    
    try {
      const response = await fetch("/api/admin/orders/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete order");
      }

      // Refresh the page to show updated data
      router.refresh();
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-xs text-destructive hover:text-destructive/80 hover:bg-red-50 px-2 py-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      title="Delete order"
    >
      <Trash2 className="h-3.5 w-3.5 inline mr-1" />
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
