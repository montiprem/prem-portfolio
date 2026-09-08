import { NextResponse } from "next/server";
import { oauth2Client } from "@/lib/google/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "Missing authorization code" }, { status: 400 });
    }

    const { tokens } = await oauth2Client.getToken(code);

    // In a real application, you might want to store this securely in a database.
    // For this setup, we'll return it so the user can copy it into their Vercel environment variables.

    return NextResponse.json({
      message: "Authorization successful! Add this refresh token to your Vercel Environment Variables as GOOGLE_REFRESH_TOKEN",
      refresh_token: tokens.refresh_token || "No refresh token returned. Try revoking app access and authorizing again with prompt=consent.",
      access_token: tokens.access_token,
      expiry_date: tokens.expiry_date,
    });
  } catch (error: any) {
    console.error("[Google Auth Callback Error]:", error);
    return NextResponse.json({ error: "Failed to exchange authorization code for tokens" }, { status: 500 });
  }
}
