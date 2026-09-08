import { NextResponse } from "next/server";
import { getOrderByToken } from "@/lib/google/sheets";
import { downloadFromDrive } from "@/lib/google/drive";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const type = searchParams.get("type");

    if (!token || !type || !['pdf', 'docx'].includes(type)) {
      return new NextResponse("Invalid request", { status: 400 });
    }

    const order = await getOrderByToken(token);

    if (!order) {
      return new NextResponse("Invalid or expired link", { status: 404 });
    }

    if (order.paymentStatus !== 'PAID') {
      return new NextResponse("Payment required to download", { status: 403 });
    }

    let fileId;
    let contentType;
    let extension;

    if (type === 'pdf') {
      fileId = order.finalResumePdfPath;
      contentType = 'application/pdf';
      extension = 'pdf';
    } else {
      fileId = order.finalResumeDocxPath;
      contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      extension = 'docx';
    }

    if (!fileId) {
      return new NextResponse("File not found", { status: 404 });
    }

    const fileBuffer = await downloadFromDrive(fileId);

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Content-Disposition", `attachment; filename="Optimized_Resume_${order.name.replace(/\s+/g, '_')}.${extension}"`);

    // We must pass the buffer as a Blob, string, or Uint8Array.
    // Buffer is essentially a Uint8Array in modern Node, but Next.js/Fetch API Response
    // handles Uint8Array or Blob more reliably for binary data.
    return new NextResponse(new Uint8Array(fileBuffer), { headers });

  } catch (error: any) {
    console.error("[ATS Download Error]:", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
