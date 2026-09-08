import { ATS_CONFIG } from "../config/ats";

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
  originalResumePath: string; // Drive ID
  jobDescriptionFilePath?: string; // Drive ID
  finalResumePdfPath?: string; // Drive ID
  finalResumeDocxPath?: string; // Drive ID
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

const mockDatabase: Map<string, ResumeOrder> = new Map();

export async function createOrder(order: Omit<ResumeOrder, 'id' | 'status' | 'paymentStatus' | 'createdAt' | 'updatedAt' | 'price' | 'currency' | 'secureToken' | 'secureTokenExpiresAt'>): Promise<ResumeOrder> {
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

  mockDatabase.set(id, newOrder);
  console.log(`[Google Sheets] Created order ${id}`);
  return newOrder;
}

export async function getOrder(id: string): Promise<ResumeOrder | null> {
  return mockDatabase.get(id) || null;
}

export async function getOrderByToken(token: string): Promise<ResumeOrder | null> {
  for (const order of mockDatabase.values()) {
    if (order.secureToken === token) {
      return order;
    }
  }
  return null;
}

export async function updateOrder(id: string, updates: Partial<ResumeOrder>): Promise<ResumeOrder | null> {
  const order = mockDatabase.get(id);
  if (!order) return null;

  const updatedOrder = { ...order, ...updates, updatedAt: Date.now() };
  mockDatabase.set(id, updatedOrder);
  console.log(`[Google Sheets] Updated order ${id}`);
  return updatedOrder;
}

export async function getAllOrders(): Promise<ResumeOrder[]> {
  return Array.from(mockDatabase.values()).sort((a, b) => b.createdAt - a.createdAt);
}
