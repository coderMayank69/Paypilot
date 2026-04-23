import { Router } from 'express';
import { body, param } from 'express-validator';
import { InvoiceController } from '../controllers/index';
import { authMiddleware, validationErrorHandler } from '../middleware/index';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Create Invoice
router.post(
  '/',
  [
    body('clientId').isMongoId(),
    body('amount').isFloat({ min: 0 }),
    body('dueDate').isISO8601(),
    body('items').isArray({ min: 1 }),
    body('items.*.description').notEmpty(),
    body('items.*.quantity').isFloat({ min: 0 }),
    body('items.*.unitPrice').isFloat({ min: 0 }),
    body('items.*.amount').isFloat({ min: 0 }),
    body('notes').optional().trim(),
  ],
  validationErrorHandler,
  InvoiceController.createInvoice
);

// Get All Invoices
router.get('/', InvoiceController.getInvoices);

// Get Invoice by ID
router.get(
  '/:id',
  [param('id').isMongoId()],
  validationErrorHandler,
  InvoiceController.getInvoiceById
);

// Update Invoice
router.put(
  '/:id',
  [
    param('id').isMongoId(),
    body('status').optional().trim(),
    body('notes').optional().trim(),
  ],
  validationErrorHandler,
  InvoiceController.updateInvoice
);

// Send Invoice
router.post(
  '/:id/send',
  [param('id').isMongoId()],
  validationErrorHandler,
  InvoiceController.sendInvoice
);

// Record Payment
router.post(
  '/:id/payment',
  [
    param('id').isMongoId(),
    body('amount').isFloat({ min: 0 }),
  ],
  validationErrorHandler,
  InvoiceController.recordPayment
);

// Send Reminder
router.post(
  '/:id/reminder',
  [param('id').isMongoId()],
  validationErrorHandler,
  InvoiceController.sendReminder
);

// Get Overdue Invoices
router.get('/status/overdue', InvoiceController.getOverdueInvoices);

export default router;
