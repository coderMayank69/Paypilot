import { Router } from 'express';
import { DashboardController } from '../controllers/index';
import { authMiddleware } from '../middleware/index';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Get Dashboard Metrics
router.get('/metrics', DashboardController.getMetrics);

// Get Recent Activity
router.get('/activity', DashboardController.getRecentActivity);

// Get Cashflow Forecast
router.get('/forecast', DashboardController.getCashflowForecast);

// Get Client Performance
router.get('/clients/performance', DashboardController.getClientPerformance);

export default router;
