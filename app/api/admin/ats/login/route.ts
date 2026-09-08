import { NextResponse } from "next/server";
import { setAdminCookie } from "@/lib/adminAuth";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }

    const isValid = await setAdminCookie(password);

    if (isValid) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
  } catch (error) {
    console.error("Admin Login Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
