import { google } from "googleapis";
import { ATS_CONFIG } from "../config/ats";
import { oauth2Client } from "./auth";

export type OrderStatus = 'SUBMITTED' | 'IN_REVIEW' | 'PROCESSING' | 'READY_FOR_PAYMENT' | 'PAID' | 'COMPLETED';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED';

export interface ResumeOrder {
  id: string;
  name: string;
  email: string;
  phone?: string;
  targetRole: string;
  yearsOfExperience?: string;
  jobDescription?: string;
  originalResumePath: string;
  jobDescriptionFilePath?: string;
  finalResumePdfPath?: string;
  finalResumeDocxPath?: string;
  status: OrderStatus;
  price: number;
  currency: string;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  secureToken: string;
  secureTokenExpiresAt: number;
  createdAt: number;
  updatedAt: number;
}

const sheets = google.sheets({ version: "v4", auth: oauth2Client });
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const RANGE = "Orders!A:T"; // Assuming sheet is named Orders and has 20 columns

// Helper to convert sheet row array to ResumeOrder object
function rowToOrder(row: any[]): ResumeOrder {
  return {
    id: row[0] || "",
    name: row[1] || "",
    email: row[2] || "",
    phone: row[3] || undefined,
    targetRole: row[4] || "",
    yearsOfExperience: row[5] || undefined,
    jobDescription: row[6] || undefined,
    originalResumePath: row[7] || "",
    jobDescriptionFilePath: row[8] || undefined,
    finalResumePdfPath: row[9] || undefined,
    finalResumeDocxPath: row[10] || undefined,
    status: (row[11] as OrderStatus) || "SUBMITTED",
    price: Number(row[12]) || 0,
    currency: row[13] || "",
    paymentStatus: (row[14] as PaymentStatus) || "PENDING",
    paymentId: row[15] || undefined,
    secureToken: row[16] || "",
    secureTokenExpiresAt: Number(row[17]) || 0,
    createdAt: Number(row[18]) || 0,
    updatedAt: Number(row[19]) || 0,
  };
}

// Helper to convert ResumeOrder object to sheet row array
function orderToRow(order: ResumeOrder): any[] {
  return [
    order.id,
    order.name,
    order.email,
    order.phone || "",
    order.targetRole,
    order.yearsOfExperience || "",
    order.jobDescription || "",
    order.originalResumePath,
    order.jobDescriptionFilePath || "",
    order.finalResumePdfPath || "",
    order.finalResumeDocxPath || "",
    order.status,
    order.price,
    order.currency,
    order.paymentStatus,
    order.paymentId || "",
    order.secureToken,
    order.secureTokenExpiresAt,
    order.createdAt,
    order.updatedAt,
  ];
}

async function ensureHeaders() {
  if (!SPREADSHEET_ID) throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID is not defined.");
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Orders!A1:T1",
    });
    if (!res.data.values || res.data.values.length === 0) {
      const headers = [
        "id", "name", "email", "phone", "targetRole", "yearsOfExperience", "jobDescription",
        "originalResumePath", "jobDescriptionFilePath", "finalResumePdfPath", "finalResumeDocxPath",
        "status", "price", "currency", "paymentStatus", "paymentId", "secureToken",
        "secureTokenExpiresAt", "createdAt", "updatedAt"
      ];
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: "Orders!A1:T1",
        valueInputOption: "RAW",
        requestBody: { values: [headers] },
      });
    }
  } catch (error: any) {
    // If sheet doesn't exist, this might fail, but let's assume it exists or fails gracefully.
    console.error("[Google Sheets] Error ensuring headers:", error.message);
  }
}

export async function createOrder(
  order: Omit<ResumeOrder, 'id' | 'status' | 'paymentStatus' | 'createdAt' | 'updatedAt' | 'price' | 'currency' | 'secureToken' | 'secureTokenExpiresAt'>
): Promise<ResumeOrder> {
  if (!SPREADSHEET_ID) throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID is not defined.");
  await ensureHeaders();

  const id = `ORD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
  const secureToken = crypto.randomUUID();
  const now = Date.now();

  const newOrder: ResumeOrder = {
    ...order,
    id,
    status: 'SUBMITTED',
    price: ATS_CONFIG.price,
    currency: ATS_CONFIG.currency,
    paymentStatus: 'PENDING',
    secureToken,
    secureTokenExpiresAt: now + (30 * 24 * 60 * 60 * 1000), // 30 days
    createdAt: now,
    updatedAt: now,
  };

  const row = orderToRow(newOrder);

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });

  console.log(`[Google Sheets] Created order ${id}`);
  return newOrder;
}

export async function getOrder(id: string): Promise<ResumeOrder | null> {
  if (!SPREADSHEET_ID) return null;
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
  });

  const rows = res.data.values;
  if (!rows || rows.length === 0) return null;

  for (let i = 1; i < rows.length; i++) { // Skip header row
    if (rows[i][0] === id) {
      return rowToOrder(rows[i]);
    }
  }
  return null;
}

export async function getOrderByToken(token: string): Promise<ResumeOrder | null> {
  if (!SPREADSHEET_ID) return null;
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
  });

  const rows = res.data.values;
  if (!rows || rows.length === 0) return null;

  for (let i = 1; i < rows.length; i++) { // Skip header row
    if (rows[i][16] === token) { // secureToken is at index 16
      return rowToOrder(rows[i]);
    }
  }
  return null;
}

export async function updateOrder(id: string, updates: Partial<ResumeOrder>): Promise<ResumeOrder | null> {
  if (!SPREADSHEET_ID) return null;
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
  });

  const rows = res.data.values;
  if (!rows || rows.length === 0) return null;

  let rowIndex = -1;
  let currentOrder: ResumeOrder | null = null;

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === id) {
      rowIndex = i + 1; // +1 because rows array is 0-indexed, Sheets is 1-indexed (and we started fetching from A1 typically, though A:T fetches all. If row[0] is A1, rowIndex is 1)
      currentOrder = rowToOrder(rows[i]);
      break;
    }
  }

  if (rowIndex === -1 || !currentOrder) return null;

  const updatedOrder: ResumeOrder = {
    ...currentOrder,
    ...updates,
    updatedAt: Date.now(),
  };

  const updatedRow = orderToRow(updatedOrder);

  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `Orders!A${rowIndex}:T${rowIndex}`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [updatedRow] },
  });

  console.log(`[Google Sheets] Updated order ${id}`);
  return updatedOrder;
}

export async function getAllOrders(): Promise<ResumeOrder[]> {
  if (!SPREADSHEET_ID) return [];
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
  });

  const rows = res.data.values;
  if (!rows || rows.length <= 1) return []; // Only headers or empty

  const orders: ResumeOrder[] = [];
  for (let i = 1; i < rows.length; i++) {
    // Basic validation to skip empty rows
    if (rows[i][0]) {
      orders.push(rowToOrder(rows[i]));
    }
  }

  return orders.sort((a, b) => b.createdAt - a.createdAt);
}
