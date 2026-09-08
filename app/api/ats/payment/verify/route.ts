import { NextResponse } from "next/server";
import { getOrderByToken, updateOrder } from "@/lib/google/sheets";
import { verifyRazorpaySignature } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const { token, razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!token || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing required payment details" }, { status: 400 });
    }

    const order = await getOrderByToken(token);

    if (!order) {
      return NextResponse.json({ error: "Invalid token" }, { status: 404 });
    }

    const isValid = await verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    await updateOrder(order.id, {
      paymentStatus: 'PAID',
      paymentId: razorpay_payment_id,
      status: 'PAID'
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("[ATS Payment Verify Error]:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
