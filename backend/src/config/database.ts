import mongoose from 'mongoose';
import config from './index';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      retryWrites: true,
      w: 'majority',
    });
    console.log('✓ Database connected successfully');
  } catch (error) {
    console.error('✗ Database connection failed:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  try {
    await mongoose.disconnect();
    console.log('✓ Database disconnected successfully');
  } catch (error) {
    console.error('✗ Database disconnection failed:', error);
    process.exit(1);
  }
};
