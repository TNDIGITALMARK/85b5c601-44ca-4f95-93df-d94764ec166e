# TheraMORE Booking System

A professional booking management system for therapy and training services built with Next.js, Supabase, and Tailwind CSS.

## Features

- **Dashboard**: View today's appointments and upcoming schedule at a glance
- **Calendar**: Month view of all appointments with easy navigation
- **Client Management**: Track client profiles, contact information, and service preferences
- **Real-time Data**: Powered by Supabase for secure, multi-tenant data storage
- **Responsive Design**: Beautiful UI that works on all devices

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account (credentials are pre-configured)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:4006](http://localhost:4006) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Application Structure

### Database Schema

The application uses three main tables:

- **clients**: Store client profiles with contact information and preferences
- **services**: Define service types (massage, training, etc.) with duration and color coding
- **appointments**: Schedule appointments linking clients and services

All tables are automatically filtered by tenant and project for secure multi-tenant isolation.

### Key Files

- `src/app/dashboard/page.tsx`: Main dashboard with today's appointments
- `src/app/calendar/page.tsx`: Monthly calendar view
- `src/app/clients/page.tsx`: Client management interface
- `src/lib/supabase/client.ts`: Supabase client configuration
- `src/lib/supabase/queries.ts`: Database query functions
- `src/types/database.ts`: TypeScript type definitions

## Adding Data

The application starts with an empty database. To add data:

1. **Add Services**: Use the Supabase dashboard or create via API to define your service types
2. **Add Clients**: Click "Add Client" button to create client profiles
3. **Create Appointments**: Click "New Booking" to schedule appointments

## Database Queries

All database operations are handled through the query functions in `src/lib/supabase/queries.ts`:

- `getClients()`: Fetch all clients
- `getAppointments()`: Fetch all appointments
- `getTodaysAppointments()`: Get appointments for today
- `getThisWeeksAppointments()`: Get upcoming week's appointments
- `createClient()`, `createAppointment()`, etc.: Create new records

## Environment Variables

The following environment variables are pre-configured:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Public API key
- `NEXT_PUBLIC_SUPABASE_SCOPED_TOKEN`: Tenant-scoped authentication token

## Security

- Row Level Security (RLS) is enabled on all tables
- All queries are automatically filtered by tenant and project ID
- Data isolation ensures complete privacy between tenants

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Support

For issues or questions, refer to the documentation in the codebase or check the Supabase dashboard for database management.
