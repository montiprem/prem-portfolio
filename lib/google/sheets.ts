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
// The getter uses a non-null assertion since we'll validate it at runtime in functions
const getSpreadsheetId = () => {
  const id = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!id) throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID is not defined in environment variables.");
  return id;
};
const RANGE = "Orders!A:T"; // Assuming sheet is named Orders and has 20 columns

// Helper to convert sheet row array to ResumeOrder object
function rowToOrder(row: string[] | undefined | null): ResumeOrder | null {
  if (!row || row.length === 0 || !row[0]) return null;

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
function orderToRow(order: ResumeOrder): (string | number)[] {
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
  const spreadsheetId = getSpreadsheetId();
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: "Orders!A1:T1",
    });

    // Check if headers are missing or sheet is empty
    if (!res.data.values || res.data.values.length === 0) {
      const headers = [
        "id", "name", "email", "phone", "targetRole", "yearsOfExperience", "jobDescription",
        "originalResumePath", "jobDescriptionFilePath", "finalResumePdfPath", "finalResumeDocxPath",
        "status", "price", "currency", "paymentStatus", "paymentId", "secureToken",
        "secureTokenExpiresAt", "createdAt", "updatedAt"
      ];
      await sheets.spreadsheets.values.update({
        spreadsheetId: spreadsheetId,
        range: "Orders!A1:T1",
        valueInputOption: "RAW",
        requestBody: { values: [headers] },
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    // Bubble up error to fail explicitly rather than silently ignoring if sheet 'Orders' doesn't exist or permission denied
    throw new Error(`[Google Sheets] Failed to verify or create headers. Make sure a sheet named "Orders" exists. Details: ${message}`);
  }
}

export async function createOrder(
  order: Omit<ResumeOrder, 'id' | 'status' | 'paymentStatus' | 'createdAt' | 'updatedAt' | 'price' | 'currency' | 'secureToken' | 'secureTokenExpiresAt'>
): Promise<ResumeOrder> {
  const spreadsheetId = getSpreadsheetId();
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
    spreadsheetId: spreadsheetId,
    range: RANGE,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });

  console.log(`[Google Sheets] Created order ${id}`);
  return newOrder;
}

export async function getOrder(id: string): Promise<ResumeOrder | null> {
  const spreadsheetId = getSpreadsheetId();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: RANGE,
  });

  const rows = res.data.values;
  if (!rows || rows.length === 0) return null;

  for (let i = 1; i < rows.length; i++) { // Skip header row
    if (rows[i] && rows[i][0] === id) {
      return rowToOrder(rows[i] as string[]);
    }
  }
  return null;
}

export async function getOrderByToken(token: string): Promise<ResumeOrder | null> {
  const spreadsheetId = getSpreadsheetId();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: RANGE,
  });

  const rows = res.data.values;
  if (!rows || rows.length === 0) return null;

  for (let i = 1; i < rows.length; i++) { // Skip header row
    if (rows[i] && rows[i][16] === token) { // secureToken is at index 16
      return rowToOrder(rows[i] as string[]);
    }
  }
  return null;
}

export async function updateOrder(id: string, updates: Partial<ResumeOrder>): Promise<ResumeOrder | null> {
  const spreadsheetId = getSpreadsheetId();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: RANGE,
  });

  const rows = res.data.values;
  if (!rows || rows.length === 0) return null;

  let rowIndex = -1;
  let currentOrder: ResumeOrder | null = null;

  for (let i = 1; i < rows.length; i++) {
    if (rows[i] && rows[i][0] === id) {
      rowIndex = i + 1; // +1 because arrays are 0-indexed and Sheets rows are 1-indexed (A1 is row 1)
      currentOrder = rowToOrder(rows[i] as string[]);
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
    spreadsheetId: spreadsheetId,
    range: `Orders!A${rowIndex}:T${rowIndex}`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [updatedRow] },
  });

  console.log(`[Google Sheets] Updated order ${id}`);
  return updatedOrder;
}

export async function getAllOrders(): Promise<ResumeOrder[]> {
  const spreadsheetId = getSpreadsheetId();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: RANGE,
  });

  const rows = res.data.values;
  if (!rows || rows.length <= 1) return []; // Only headers or empty

  const orders: ResumeOrder[] = [];
  for (let i = 1; i < rows.length; i++) {
    const order = rowToOrder(rows[i] as string[]);
    if (order) {
      orders.push(order);
    }
  }

  return orders.sort((a, b) => b.createdAt - a.createdAt);
}
