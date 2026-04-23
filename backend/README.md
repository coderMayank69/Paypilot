# PayPilot Backend

Express.js backend for the PayPilot invoicing platform.

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create a `.env` file:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/paypilot
JWT_SECRET=your-secret-key
JWT_EXPIRY=24h
REFRESH_TOKEN_SECRET=your-refresh-secret-key
REFRESH_TOKEN_EXPIRY=7d
CORS_ORIGIN=http://localhost:3000
```

3. Start development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Clients
- `POST /api/clients` - Create client
- `GET /api/clients` - List clients
- `GET /api/clients/:id` - Get client details
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Invoices
- `POST /api/invoices` - Create invoice
- `GET /api/invoices` - List invoices
- `GET /api/invoices/:id` - Get invoice details
- `PUT /api/invoices/:id` - Update invoice
- `POST /api/invoices/:id/send` - Send invoice
- `POST /api/invoices/:id/payment` - Record payment
- `POST /api/invoices/:id/reminder` - Send reminder
- `GET /api/invoices/status/overdue` - Get overdue invoices

### Dashboard
- `GET /api/dashboard/metrics` - Get dashboard metrics
- `GET /api/dashboard/activity` - Get recent activity
- `GET /api/dashboard/forecast` - Get cashflow forecast
- `GET /api/dashboard/clients/performance` - Get client performance

## Database Models

- **User** - User accounts with authentication
- **Client** - Client information
- **Invoice** - Invoice data with line items
- **RiskScore** - Risk assessment for invoices
- **TimelineEvent** - Activity timeline

## Architecture

- `src/config/` - Configuration files
- `src/models/` - Mongoose schemas
- `src/services/` - Business logic
- `src/controllers/` - Request handlers
- `src/routes/` - API routes
- `src/middleware/` - Express middleware
- `src/utils/` - Utility functions
