# PayPilot Development Guide

## Quick Start

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Start MongoDB (if using local MongoDB)
# On Windows with MongoDB installed:
# mongod

# Or use MongoDB Atlas connection string in .env

# Start development server
npm run dev
```

The API will be available at `http://localhost:5000`

### 2. API Testing

Use Postman, Thunder Client, or any HTTP client to test the API.

#### Example: User Registration

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "password": "password123",
    "company": "Acme Corp"
  }'
```

**Response**:
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user"
    }
  }
}
```

#### Example: User Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

#### Example: Create Client

```bash
curl -X POST http://localhost:5000/api/clients \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "name": "Acme Corporation",
    "email": "contact@acme.com",
    "phone": "+1-234-567-8900",
    "address": "123 Main St, City, Country",
    "paymentTerms": 30
  }'
```

#### Example: Create Invoice

```bash
curl -X POST http://localhost:5000/api/invoices \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "clientId": "507f1f77bcf86cd799439012",
    "amount": 5000,
    "dueDate": "2024-05-23",
    "items": [
      {
        "description": "Web Development Services",
        "quantity": 1,
        "unitPrice": 3000,
        "amount": 3000
      },
      {
        "description": "UI/UX Design",
        "quantity": 1,
        "unitPrice": 2000,
        "amount": 2000
      }
    ],
    "notes": "Thank you for your business!"
  }'
```

#### Example: Record Payment

```bash
curl -X POST http://localhost:5000/api/invoices/507f1f77bcf86cd799439013/payment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "amount": 2500
  }'
```

#### Example: Get Dashboard Metrics

```bash
curl -X GET http://localhost:5000/api/dashboard/metrics \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response**:
```json
{
  "success": true,
  "message": "Dashboard metrics retrieved successfully",
  "data": {
    "summary": {
      "totalInvoices": 10,
      "paidInvoices": 6,
      "overduInvoices": 2,
      "totalClients": 5
    },
    "financials": {
      "totalAmount": 50000,
      "totalPaid": 30000,
      "outstanding": 20000
    },
    "risk": {
      "critical": 1,
      "high": 2,
      "medium": 3,
      "low": 4,
      "totalAtRisk": 6
    }
  }
}
```

## Frontend Integration Checklist

- [ ] Set up Next.js in `app/` directory
- [ ] Create API client/SDK (`app/src/lib/api/client.ts`)
- [ ] Install shadcn/ui components
- [ ] Create authentication pages (login, signup)
- [ ] Create client management pages
- [ ] Create invoice management pages
- [ ] Create dashboard page
- [ ] Implement state management (Context API or Redux)
- [ ] Connect frontend to backend API
- [ ] Test all authentication flows
- [ ] Test CRUD operations for clients and invoices
- [ ] Test dashboard metrics and analytics

## API Response Format

All API responses follow this standard format:

**Success Response**:
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { /* response data */ }
}
```

**Error Response**:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error (only in development)"
}
```

## HTTP Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `404` - Not Found
- `500` - Internal Server Error

## Authentication

All protected routes require a JWT token in the `Authorization` header:

```
Authorization: Bearer <accessToken>
```

## Database

The backend uses MongoDB. Update the `MONGODB_URI` in your `.env` file:

- **Local**: `mongodb://localhost:27017/paypilot`
- **MongoDB Atlas**: `mongodb+srv://username:password@cluster.mongodb.net/paypilot`

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| MONGODB_URI | Database connection | mongodb://localhost:27017/paypilot |
| JWT_SECRET | JWT signing key | your-secret-key |
| CORS_ORIGIN | Frontend URL | http://localhost:3000 |

## Troubleshooting

### "Cannot connect to database"
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network access (if using MongoDB Atlas)

### "Invalid token" error
- Make sure token is included in Authorization header
- Check that JWT_SECRET matches between signup and login
- Verify token hasn't expired

### CORS errors
- Update CORS_ORIGIN in .env to match your frontend URL
- Restart the backend server

## Useful Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Next Steps

1. Install backend dependencies and start the server
2. Test API endpoints using Postman or similar tool
3. Once frontend is ready, update CORS_ORIGIN
4. Create API client in frontend
5. Build UI pages and connect to backend

---

For any issues or questions, refer to the backend README.md or create an issue.
