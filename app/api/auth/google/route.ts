import { NextResponse } from "next/server";
import { oauth2Client } from "@/lib/google/auth";

export async function GET() {
  const scopes = [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/spreadsheets",
  ];

  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    include_granted_scopes: true,
    prompt: "consent", // Force consent screen to get refresh token
  });

  return NextResponse.redirect(authorizationUrl);
}
