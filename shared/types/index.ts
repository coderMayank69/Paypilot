// User Types
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  role: UserRole;
  company?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Client Types
export interface IClient {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  buyerId?: string;
  paymentTerms?: number; // in days
  totalInvoices: number;
  totalOutstanding: number;
  lastInvoiceDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Invoice Types
export enum InvoiceStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  VIEWED = 'viewed',
  PARTIALLY_PAID = 'partially_paid',
  PAID = 'paid',
  OVERDUE = 'overdue',
  CANCELLED = 'cancelled',
}

export enum PaymentMethod {
  BANK_TRANSFER = 'bank_transfer',
  CARD = 'card',
  CASH = 'cash',
  CHEQUE = 'cheque',
  OTHER = 'other',
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface IInvoice {
  _id: string;
  userId: string;
  clientId: string;
  invoiceNumber: string;
  dueDate: Date;
  issueDate: Date;
  amount: number;
  paidAmount: number;
  status: InvoiceStatus;
  items: InvoiceItem[];
  notes?: string;
  riskScore?: number;
  lastReminder?: Date;
  remindersCount: number;
  paymentMethod?: PaymentMethod;
  createdAt: Date;
  updatedAt: Date;
}

// Risk Scoring Types
export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export interface IRiskScore {
  invoiceId: string;
  score: number; // 0-100
  level: RiskLevel;
  factors: {
    daysOverdue: number;
    clientPaymentHistory: number;
    invoiceAge: number;
    outstandingAmount: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Event/Timeline Types
export enum EventType {
  INVOICE_CREATED = 'invoice_created',
  INVOICE_SENT = 'invoice_sent',
  INVOICE_VIEWED = 'invoice_viewed',
  REMINDER_SENT = 'reminder_sent',
  PAYMENT_RECEIVED = 'payment_received',
  INVOICE_OVERDUE = 'invoice_overdue',
  CLIENT_ADDED = 'client_added',
}

export interface ITimelineEvent {
  _id: string;
  userId: string;
  invoiceId?: string;
  clientId?: string;
  type: EventType;
  description: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  company?: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  user: IUser;
}

// Pagination
export interface PaginationQuery {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}
