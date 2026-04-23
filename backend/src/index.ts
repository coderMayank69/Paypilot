import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database';
import config from './config/index';
import { errorHandler, validationErrorHandler } from './middleware/index';
import { authRoutes, clientRoutes, invoiceRoutes, dashboardRoutes } from './routes/index';
import { API_BASE_PATH } from '../../shared/constants';

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.CORS_ORIGIN,
    credentials: true,
  })
);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use(`${API_BASE_PATH}/auth`, authRoutes);
app.use(`${API_BASE_PATH}/clients`, clientRoutes);
app.use(`${API_BASE_PATH}/invoices`, invoiceRoutes);
app.use(`${API_BASE_PATH}/dashboard`, dashboardRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use(errorHandler);

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDatabase();

    const server = app.listen(config.PORT, () => {
      console.log(`✓ PayPilot Backend running on http://localhost:${config.PORT}`);
      console.log(`✓ Environment: ${config.NODE_ENV}`);
      console.log(`✓ Database: ${config.MONGODB_URI}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
