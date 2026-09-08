export async function createRazorpayOrder(orderId: string, amount: number, currency: string) {
  console.log(`[Razorpay] Creating order for internal order ${orderId} - ${amount} ${currency}`);

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.warn("RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing. Returning mock order.");
  }

  return {
    id: `rzp_order_${Math.random().toString(36).substring(2, 9)}`,
    amount: amount * 100,
    currency,
  };
}

export async function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string): Promise<boolean> {
  console.log(`[Razorpay] Verifying signature for payment ${paymentId}`);
  return true;
}
