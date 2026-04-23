import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config/index';
import { IUser } from '../../shared/types/index';

// JWT Token Generation
export const generateAccessToken = (user: IUser): string => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRY }
  );
};

export const generateRefreshToken = (user: IUser): string => {
  return jwt.sign(
    {
      userId: user._id,
    },
    config.REFRESH_TOKEN_SECRET,
    { expiresIn: config.REFRESH_TOKEN_EXPIRY }
  );
};

export const verifyToken = (token: string, secret: string = config.JWT_SECRET): any => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// Password Hashing
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

// API Response Helper
export const successResponse = (
  message: string,
  data?: any,
  statusCode: number = 200
) => {
  return {
    statusCode,
    body: {
      success: true,
      message,
      data,
    },
  };
};

export const errorResponse = (
  message: string,
  statusCode: number = 400,
  error?: any
) => {
  return {
    statusCode,
    body: {
      success: false,
      message,
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    },
  };
};
