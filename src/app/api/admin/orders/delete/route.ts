import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { deleteOrder } from "@/lib/queries";

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    await deleteOrder(orderId);

    return NextResponse.json(
      { success: true, message: "Order deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete order" },
      { status: 500 }
    );
  }
}
