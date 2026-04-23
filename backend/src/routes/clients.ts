import { Router } from 'express';
import { body, param } from 'express-validator';
import { ClientController } from '../controllers/index';
import { authMiddleware, validationErrorHandler } from '../middleware/index';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Create Client
router.post(
  '/',
  [
    body('name').trim().notEmpty(),
    body('email').isEmail().normalizeEmail(),
    body('phone').optional().trim(),
    body('address').optional().trim(),
    body('paymentTerms').optional().isInt({ min: 1 }),
  ],
  validationErrorHandler,
  ClientController.createClient
);

// Get All Clients
router.get('/', ClientController.getClients);

// Get Client by ID
router.get(
  '/:id',
  [param('id').isMongoId()],
  validationErrorHandler,
  ClientController.getClientById
);

// Update Client
router.put(
  '/:id',
  [
    param('id').isMongoId(),
    body('name').optional().trim(),
    body('email').optional().isEmail().normalizeEmail(),
    body('phone').optional().trim(),
    body('address').optional().trim(),
    body('paymentTerms').optional().isInt({ min: 1 }),
  ],
  validationErrorHandler,
  ClientController.updateClient
);

// Delete Client
router.delete(
  '/:id',
  [param('id').isMongoId()],
  validationErrorHandler,
  ClientController.deleteClient
);

export default router;
