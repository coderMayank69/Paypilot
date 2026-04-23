# PayPilot Frontend

Next.js frontend application for the PayPilot invoicing platform.

## Setup

1. Install dependencies:
```bash
cd app
npm install
```

2. Create a `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_XXXXX
```

3. Start development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
app/
├── src/
│   ├── app/              → Next.js app directory
│   ├── pages/            → Application pages
│   ├── components/       → Reusable components
│   ├── lib/
│   │   ├── api/          → API client
│   │   └── utils/        → Utility functions
│   ├── store/            → Zustand store
│   ├── types/            → TypeScript types
│   └── styles/           → CSS files
├── public/               → Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Features

- User authentication (login/signup)
- Dashboard with metrics and charts
- Client management
- Invoice creation and tracking
- Payment tracking
- Risk scoring visualization
- Responsive design with Tailwind CSS

## Environment Variables

| Variable | Description |
|----------|-------------|
| NEXT_PUBLIC_API_URL | Backend API URL |
| NEXT_PUBLIC_RAZORPAY_KEY_ID | Razorpay test key |

## Building for Production

```bash
npm run build
npm start
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Zustand** - State management
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Lucide Icons** - Icon library
