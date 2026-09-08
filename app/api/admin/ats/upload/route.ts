import { NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/adminAuth";
import { uploadToDrive } from "@/lib/google/drive";
import { updateOrder, getOrder } from "@/lib/google/sheets";

export async function POST(req: Request) {
  try {
    const isAuth = await checkAdminAuth();
    if (!isAuth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const id = formData.get("id") as string;
    const pdfFile = formData.get("pdfFile") as File | null;
    const docxFile = formData.get("docxFile") as File | null;

    if (!id || (!pdfFile && !docxFile)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const order = await getOrder(id);
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    let finalResumePdfPath = undefined;
    let finalResumeDocxPath = undefined;

    if (pdfFile) {
      finalResumePdfPath = await uploadToDrive(pdfFile, "Final Resumes");
    }

    if (docxFile) {
      finalResumeDocxPath = await uploadToDrive(docxFile, "Final Resumes");
    }

    // Update the sheet record and move status to READY_FOR_PAYMENT
    const updates: any = { status: "READY_FOR_PAYMENT" };
    if (finalResumePdfPath) updates.finalResumePdfPath = finalResumePdfPath;
    if (finalResumeDocxPath) updates.finalResumeDocxPath = finalResumeDocxPath;

    await updateOrder(id, updates);

    // Note: Here we would trigger the email notification service
    // await sendResumeReadyEmail(order.email, order.name, order.id, order.secureToken);

    return NextResponse.json({ success: true, message: "Files uploaded and order marked ready." });
  } catch (error: any) {
    console.error("Admin Upload Error:", error);
    return NextResponse.json({ error: "An error occurred while uploading files." }, { status: 500 });
  }
}
