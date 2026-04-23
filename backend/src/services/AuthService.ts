import { User } from '../models/index';
import { IUser, UserRole } from '../../shared/types/index';
import { hashPassword, comparePassword } from '../utils/auth';
import { isValidEmail } from '../../shared/utils/index';
import { ERROR_MESSAGES } from 'shared/constants';

export class AuthService {
  async signup(email: string, firstName: string, lastName: string, password: string, company?: string): Promise<IUser> {
    // Validate email
    if (!isValidEmail(email)) {
      throw new Error('Invalid email format');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new Error(ERROR_MESSAGES.USER_ALREADY_EXISTS);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = new User({
      email: email.toLowerCase(),
      firstName,
      lastName,
      password: hashedPassword,
      role: UserRole.USER,
      company: company || null,
    });

    await user.save();
    return user;
  }

  async login(email: string, password: string): Promise<IUser> {
    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password!);
    if (!isPasswordValid) {
      throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    return user;
  }

  async getUserById(userId: string): Promise<IUser | null> {
    return User.findById(userId);
  }

  async updateUser(userId: string, updates: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(userId, updates, { new: true });
  }
}

export default new AuthService();
