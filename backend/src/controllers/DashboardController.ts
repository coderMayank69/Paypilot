import { Response } from 'express';
import { AuthRequest } from '../middleware/index';
import { DashboardService } from '../services/index';
import { HTTP_STATUS, ERROR_MESSAGES } from '../../shared/constants/index';

export class DashboardController {
  async getMetrics(req: AuthRequest, res: Response) {
    try {
      const metrics = await DashboardService.getDashboardMetrics(req.userId!);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Dashboard metrics retrieved successfully',
        data: metrics,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }

  async getRecentActivity(req: AuthRequest, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const activity = await DashboardService.getRecentActivity(req.userId!, limit);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Recent activity retrieved successfully',
        data: activity,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }

  async getCashflowForecast(req: AuthRequest, res: Response) {
    try {
      const forecast = await DashboardService.getCashflowForecast(req.userId!);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Cashflow forecast retrieved successfully',
        data: forecast,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }

  async getClientPerformance(req: AuthRequest, res: Response) {
    try {
      const performance = await DashboardService.getClientPerformance(req.userId!);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Client performance retrieved successfully',
        data: performance,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }
}

export default new DashboardController();
