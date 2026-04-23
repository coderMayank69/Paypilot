import { Response } from 'express';
import { AuthRequest } from '../middleware/index';
import { ClientService } from '../services/index';
import { HTTP_STATUS, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../../shared/constants';

export class ClientController {
  async createClient(req: AuthRequest, res: Response) {
    try {
      const { name, email, phone, address, paymentTerms } = req.body;

      const client = await ClientService.createClient(
        req.userId!,
        name,
        email,
        phone,
        address,
        paymentTerms
      );

      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: SUCCESS_MESSAGES.CLIENT_CREATED,
        data: client,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: error.message || ERROR_MESSAGES.VALIDATION_ERROR,
      });
    }
  }

  async getClients(req: AuthRequest, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const { clients, total } = await ClientService.getClientsByUserId(req.userId!, page, limit);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Clients retrieved successfully',
        data: {
          clients,
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

  async getClientById(req: AuthRequest, res: Response) {
    try {
      const client = await ClientService.getClientById(req.params.id, req.userId!);

      if (!client) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: ERROR_MESSAGES.CLIENT_NOT_FOUND,
        });
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Client retrieved successfully',
        data: client,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }

  async updateClient(req: AuthRequest, res: Response) {
    try {
      const { name, email, phone, address, paymentTerms } = req.body;

      const client = await ClientService.updateClient(req.params.id, req.userId!, {
        name,
        email,
        phone,
        address,
        paymentTerms,
      });

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.CLIENT_UPDATED,
        data: client,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }

  async deleteClient(req: AuthRequest, res: Response) {
    try {
      const deleted = await ClientService.deleteClient(req.params.id, req.userId!);

      if (!deleted) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: ERROR_MESSAGES.CLIENT_NOT_FOUND,
        });
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.CLIENT_DELETED,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }
}

export default new ClientController();
