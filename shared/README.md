# PayPilot Shared

Shared types, constants, and utilities used across the PayPilot project.

## Contents

### Types (`types/index.ts`)
- User authentication types
- Client management types
- Invoice and payment types
- Risk scoring types
- Timeline event types
- API response types

### Constants (`constants/index.ts`)
- API endpoint paths
- Risk scoring thresholds and weights
- Invoice configuration constants
- HTTP status codes
- Error and success messages

### Utilities (`utils/index.ts`)
- Risk score calculation
- Email validation
- Invoice number generation
- Currency formatting
- Date calculations
- Pagination helpers
- Input sanitization

## Usage

Import types and utilities in both frontend and backend:

```typescript
import { IInvoice, InvoiceStatus } from '../../shared/types/index';
import { calculateRiskScore } from '../../shared/utils/index';
import { RISK_THRESHOLDS } from '../../shared/constants/index';
```
