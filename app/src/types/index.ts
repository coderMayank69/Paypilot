export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  company?: string;
  phone?: string;
}

export interface IClient {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  paymentTerms?: number;
  totalInvoices: number;
  totalOutstanding: number;
  lastInvoiceDate?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface IInvoice {
  _id: string;
  invoiceNumber: string;
  clientId: IClient;
  amount: number;
  paidAmount: number;
  status: 'draft' | 'sent' | 'viewed' | 'partially_paid' | 'paid' | 'overdue' | 'cancelled';
  dueDate: string;
  issueDate: string;
  items: InvoiceItem[];
  notes?: string;
  riskScore?: number;
  remindersCount: number;
}

export interface IDashboardMetrics {
  summary: {
    totalInvoices: number;
    paidInvoices: number;
    overduInvoices: number;
    totalClients: number;
  };
  financials: {
    totalAmount: number;
    totalPaid: number;
    outstanding: number;
  };
  risk: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    totalAtRisk: number;
  };
}
