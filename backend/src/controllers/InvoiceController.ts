import { Response } from 'express';
import { AuthRequest } from '../middleware/index';
import { InvoiceService } from '../services/index';
import { HTTP_STATUS, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../../shared/constants/index';

export class InvoiceController {
  async createInvoice(req: AuthRequest, res: Response) {
    try {
      const { clientId, amount, dueDate, items, notes } = req.body;

      const invoice = await InvoiceService.createInvoice(
        req.userId!,
        clientId,
        amount,
        new Date(dueDate),
        items,
        notes
      );

      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: SUCCESS_MESSAGES.INVOICE_CREATED,
        data: invoice,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: error.message || ERROR_MESSAGES.VALIDATION_ERROR,
      });
    }
  }

  async getInvoices(req: AuthRequest, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as string | undefined;

      const { invoices, total } = await InvoiceService.getInvoicesByUserId(
        req.userId!,
        status as any,
        page,
        limit
      );

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Invoices retrieved successfully',
        data: {
          invoices,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        },
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }

  async getInvoiceById(req: AuthRequest, res: Response) {
    try {
      const invoice = await InvoiceService.getInvoiceById(req.params.id, req.userId!);

      if (!invoice) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: ERROR_MESSAGES.INVOICE_NOT_FOUND,
        });
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Invoice retrieved successfully',
        data: invoice,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }

  async updateInvoice(req: AuthRequest, res: Response) {
    try {
      const updates = req.body;

      const invoice = await InvoiceService.updateInvoice(req.params.id, req.userId!, updates);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.INVOICE_UPDATED,
        data: invoice,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }

  async sendInvoice(req: AuthRequest, res: Response) {
    try {
      const invoice = await InvoiceService.sendInvoice(req.params.id, req.userId!);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.INVOICE_SENT,
        data: invoice,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }

  async recordPayment(req: AuthRequest, res: Response) {
    try {
      const { amount } = req.body;

      const invoice = await InvoiceService.recordPayment(req.params.id, req.userId!, amount);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.PAYMENT_RECORDED,
        data: invoice,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }

  async sendReminder(req: AuthRequest, res: Response) {
    try {
      const invoice = await InvoiceService.sendReminder(req.params.id, req.userId!);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Reminder sent successfully',
        data: invoice,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }

  async getOverdueInvoices(req: AuthRequest, res: Response) {
    try {
      const invoices = await InvoiceService.getOverdueInvoices(req.userId!);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Overdue invoices retrieved successfully',
        data: invoices,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }
}

export default new InvoiceController();
