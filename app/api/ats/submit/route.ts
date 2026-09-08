import { NextResponse } from "next/server";
import { uploadToDrive } from "@/lib/google/drive";
import { createOrder } from "@/lib/google/sheets";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const targetRole = formData.get("targetRole") as string;
    const resumeFile = formData.get("resume") as File;

    const phone = formData.get("phone") as string | undefined;
    const yearsOfExperience = formData.get("yearsOfExperience") as string | undefined;
    const jobDescription = formData.get("jobDescription") as string | undefined;
    const jdFile = formData.get("jobDescriptionFile") as File | null;

    if (!name || !email || !targetRole || !resumeFile) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (resumeFile.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Resume file must be under 5MB." }, { status: 400 });
    }
    const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowedTypes.includes(resumeFile.type)) {
      return NextResponse.json({ error: "Only PDF and DOCX files are allowed." }, { status: 400 });
    }

    const originalResumePath = await uploadToDrive(resumeFile, "Original_Resumes");

    let jobDescriptionFilePath;
    if (jdFile && jdFile.size > 0) {
      if (jdFile.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "Job description file must be under 5MB." }, { status: 400 });
      }
      jobDescriptionFilePath = await uploadToDrive(jdFile, "Job_Descriptions");
    }

    const order = await createOrder({
      name,
      email,
      phone,
      targetRole,
      yearsOfExperience,
      jobDescription,
      originalResumePath,
      jobDescriptionFilePath
    });

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error: any) {
    console.error("[ATS Submit Error]:", error.message || error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
