import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "ats_admin_session";

export function getAdminPasswordHash() {
  const pwd = process.env.ATS_ADMIN_PASSWORD;
  if (!pwd) return null;
  return crypto.createHash("sha256").update(pwd).digest("hex");
}

export async function setAdminCookie(password: string): Promise<boolean> {
  const storedPwd = process.env.ATS_ADMIN_PASSWORD;
  if (!storedPwd || password !== storedPwd) return false;

  const hash = getAdminPasswordHash();
  if (!hash) return false;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, hash, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return true;
}

export async function checkAdminAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);
  const expectedHash = getAdminPasswordHash();

  if (!sessionCookie || !expectedHash) return false;
  return sessionCookie.value === expectedHash;
}

export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
