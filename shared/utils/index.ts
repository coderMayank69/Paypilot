import { RiskLevel, RiskWeight } from '../types/index';

// Risk Scoring Utility
export function calculateRiskScore(factors: {
  daysOverdue: number;
  clientPaymentHistory: number;
  invoiceAge: number;
  outstandingAmount: number;
}): { score: number; level: RiskLevel } {
  const weights = {
    DAYS_OVERDUE: 0.35,
    PAYMENT_HISTORY: 0.25,
    INVOICE_AGE: 0.2,
    OUTSTANDING_AMOUNT: 0.2,
  };

  let score = 0;

  // Days overdue contribution (max 35 points)
  // Each day overdue adds 1 point, capped at 35
  score += Math.min(factors.daysOverdue * 1, 35) * weights.DAYS_OVERDUE;

  // Client payment history (0-25 points)
  score += factors.clientPaymentHistory * weights.PAYMENT_HISTORY;

  // Invoice age contribution (0-20 points)
  const ageScore = Math.min(factors.invoiceAge / 30, 20);
  score += ageScore * weights.INVOICE_AGE;

  // Outstanding amount contribution (0-20 points)
  // Normalized on a scale (assuming max 10000)
  const amountScore = Math.min((factors.outstandingAmount / 10000) * 20, 20);
  score += amountScore * weights.OUTSTANDING_AMOUNT;

  const normalizedScore = Math.min(score, 100);

  let level: RiskLevel = RiskLevel.LOW;
  if (normalizedScore >= 80) {
    level = RiskLevel.CRITICAL;
  } else if (normalizedScore >= 60) {
    level = RiskLevel.HIGH;
  } else if (normalizedScore >= 30) {
    level = RiskLevel.MEDIUM;
  }

  return {
    score: Math.round(normalizedScore * 10) / 10,
    level,
  };
}

// Email validation utility
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Generate invoice number
export function generateInvoiceNumber(userId: string, sequence: number): string {
  const userHash = userId.substring(userId.length - 4).toUpperCase();
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
  return `INV-${userHash}-${dateStr}-${String(sequence).padStart(4, '0')}`;
}

// Format currency
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

// Calculate days until due
export function calculateDaysUntilDue(dueDate: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  const diff = due.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// Calculate days overdue
export function calculateDaysOverdue(dueDate: Date): number {
  const daysUntilDue = calculateDaysUntilDue(dueDate);
  return Math.max(0, -daysUntilDue);
}

// Parse pagination query
export function parsePaginationQuery(query: any) {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
  const sort = query.sort || '-createdAt';
  const order = (query.order === 'asc' ? 1 : -1) as 1 | -1;

  return { page, limit, sort, order };
}

// Calculate pagination metadata
export function calculatePaginationMetadata(total: number, page: number, limit: number) {
  return {
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
  };
}

// Sanitize user input
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

// Hash email for consistency
export function hashEmail(email: string): string {
  return email.toLowerCase().trim();
}

// Generate random string
export function generateRandomString(length: number = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
