import { NextResponse } from "next/server";
import { getOrderByToken } from "@/lib/google/sheets";
import { createRazorpayOrder } from "@/lib/razorpay";
import { ATS_CONFIG } from "@/lib/config/ats";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const order = await getOrderByToken(token);

    if (!order) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 404 });
    }

    if (order.paymentStatus === 'PAID') {
      return NextResponse.json({ error: "Order is already paid" }, { status: 400 });
    }

    if (order.status !== 'READY_FOR_PAYMENT') {
      return NextResponse.json({ error: "Order is not ready for payment yet" }, { status: 400 });
    }

    const razorpayOrder = await createRazorpayOrder(order.id, ATS_CONFIG.price, ATS_CONFIG.currency);

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID || "mock_key_id"
    });

  } catch (error: any) {
    console.error("[ATS Payment Create Error]:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
