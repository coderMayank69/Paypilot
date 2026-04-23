// API Constants
export const API_BASE_PATH = '/api';
export const AUTH_ENDPOINT = `${API_BASE_PATH}/auth`;
export const CLIENTS_ENDPOINT = `${API_BASE_PATH}/clients`;
export const INVOICES_ENDPOINT = `${API_BASE_PATH}/invoices`;
export const DASHBOARD_ENDPOINT = `${API_BASE_PATH}/dashboard`;

// Risk Scoring Thresholds
export const RISK_THRESHOLDS = {
  LOW: 30,
  MEDIUM: 60,
  HIGH: 80,
  CRITICAL: 100,
};

// Risk Scoring Weights
export const RISK_WEIGHTS = {
  DAYS_OVERDUE: 0.35,
  PAYMENT_HISTORY: 0.25,
  INVOICE_AGE: 0.2,
  OUTSTANDING_AMOUNT: 0.2,
};

// Invoice Constants
export const DEFAULT_PAYMENT_TERMS = 30; // days
export const MAX_REMINDERS = 5;
export const REMINDER_INTERVALS = [
  0, // immediately on due date
  3, // 3 days after due date
  7, // 7 days after due date
  14, // 14 days after due date
  21, // 21 days after due date
];

// Auth Constants
export const JWT_EXPIRY = '24h';
export const REFRESH_TOKEN_EXPIRY = '7d';
export const PASSWORD_MIN_LENGTH = 6;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_ALREADY_EXISTS: 'User with this email already exists',
  USER_NOT_FOUND: 'User not found',
  INVALID_TOKEN: 'Invalid or expired token',
  UNAUTHORIZED: 'Unauthorized access',
  CLIENT_NOT_FOUND: 'Client not found',
  INVOICE_NOT_FOUND: 'Invoice not found',
  INVALID_REQUEST: 'Invalid request parameters',
  INTERNAL_ERROR: 'Internal server error',
  VALIDATION_ERROR: 'Validation error',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  SIGNUP_SUCCESS: 'Account created successfully',
  LOGOUT_SUCCESS: 'Logout successful',
  CLIENT_CREATED: 'Client created successfully',
  CLIENT_UPDATED: 'Client updated successfully',
  CLIENT_DELETED: 'Client deleted successfully',
  INVOICE_CREATED: 'Invoice created successfully',
  INVOICE_UPDATED: 'Invoice updated successfully',
  INVOICE_SENT: 'Invoice sent successfully',
  PAYMENT_RECORDED: 'Payment recorded successfully',
};
