import { Response } from 'express';
import { AuthRequest } from '../middleware/index';
import { AuthService } from '../services/index';
import { generateAccessToken, generateRefreshToken } from '../utils/auth';
import { HTTP_STATUS, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../../shared/constants/index';

export class AuthController {
  async signup(req: AuthRequest, res: Response) {
    try {
      const { email, firstName, lastName, password, company } = req.body;

      const user = await AuthService.signup(email, firstName, lastName, password, company);

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: SUCCESS_MESSAGES.SIGNUP_SUCCESS,
        data: {
          accessToken,
          refreshToken,
          user: {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          },
        },
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: error.message || ERROR_MESSAGES.VALIDATION_ERROR,
      });
    }
  }

  async login(req: AuthRequest, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await AuthService.login(email, password);

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
        data: {
          accessToken,
          refreshToken,
          user: {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          },
        },
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: error.message || ERROR_MESSAGES.INVALID_CREDENTIALS,
      });
    }
  }

  async getProfile(req: AuthRequest, res: Response) {
    try {
      const user = await AuthService.getUserById(req.userId!);

      if (!user) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: ERROR_MESSAGES.USER_NOT_FOUND,
        });
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Profile retrieved successfully',
        data: {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          company: user.company,
        },
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }

  async updateProfile(req: AuthRequest, res: Response) {
    try {
      const { firstName, lastName, company, phone } = req.body;

      const user = await AuthService.updateUser(req.userId!, {
        firstName,
        lastName,
        company,
        phone,
      });

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Profile updated successfully',
        data: {
          _id: user?._id,
          email: user?.email,
          firstName: user?.firstName,
          lastName: user?.lastName,
          role: user?.role,
          company: user?.company,
        },
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }
}

export default new AuthController();
