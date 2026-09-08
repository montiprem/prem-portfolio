import { NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/adminAuth";
import { updateOrder } from "@/lib/google/sheets";
import type { OrderStatus } from "@/lib/google/sheets";

export async function POST(req: Request) {
  try {
    const isAuth = await checkAdminAuth();
    if (!isAuth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    await updateOrder(id, { status: status as OrderStatus });

    return NextResponse.json({ success: true, message: "Status updated successfully" });
  } catch (error: any) {
    console.error("Update Status Error:", error);
    return NextResponse.json({ error: "An error occurred while updating status." }, { status: 500 });
  }
}
