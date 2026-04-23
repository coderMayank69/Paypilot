import { Router } from 'express';
import { body } from 'express-validator';
import { AuthController } from '../controllers/index';
import { authMiddleware, validationErrorHandler } from '../middleware/index';

const router = Router();

// Signup
router.post(
  '/signup',
  [
    body('email').isEmail().normalizeEmail(),
    body('firstName').trim().notEmpty(),
    body('lastName').trim().notEmpty(),
    body('password').isLength({ min: 6 }),
  ],
  validationErrorHandler,
  AuthController.signup
);

// Login
router.post(
  '/login',
  [body('email').isEmail().normalizeEmail(), body('password').notEmpty()],
  validationErrorHandler,
  AuthController.login
);

// Get Profile
router.get('/profile', authMiddleware, AuthController.getProfile);

// Update Profile
router.put(
  '/profile',
  authMiddleware,
  [
    body('firstName').optional().trim(),
    body('lastName').optional().trim(),
    body('company').optional().trim(),
    body('phone').optional().trim(),
  ],
  validationErrorHandler,
  AuthController.updateProfile
);

export default router;
