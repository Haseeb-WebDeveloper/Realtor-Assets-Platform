# Realtor Assets Platform

A Next.js 13+ platform for real estate professionals to manage and access marketing assets, templates, and resources.

## Features

- 🔐 Authentication (NextAuth.js)
  - User & Admin authentication flows
  - Protected routes and API endpoints
  - Role-based access control

- 👥 User Management
  - User registration and login
  - Profile management
  - Subscription handling
  - Resource access tracking

- 💼 Asset Management
  - Upload and manage marketing templates
  - Categories and tags organization
  - Resource favorites and downloads
  - Usage analytics

- 🎨 Modern UI
  - Dark/Light mode support
  - Responsive design
  - Animated components with Framer Motion
  - Tailwind CSS styling

## Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animation**: Framer Motion
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide Icons

## Project Structure

```
src/
├── app/                   # Next.js app router pages
├── components/           
│   ├── admin/            # Admin dashboard components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # User dashboard components
│   ├── layout/           # Layout components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility functions
├── models/               # Mongoose models
└── types/                # TypeScript type definitions
```

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```env
# Database
MONGODB_URI=

# Authentication
AUTH_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
NEXT_PUBLIC_CLOUDINARY_API_SECRET=
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run create-admin` - Create admin user
- `npm run hash-password` - Hash password utility

## API Routes

- `/api/auth/*` - Authentication endpoints
- `/api/admin/*` - Admin-only endpoints
- `/api/schedule` - Resource scheduling
- `/api/assets` - Asset management

## Environment Setup

The application requires Node.js version 18.17.0 or higher.

## Database Models

- **User**: Handles user data, subscriptions, and resource access
- **Asset**: Manages marketing resources and templates
- **Category**: Organizes assets into categories
- **Transaction**: Tracks subscription payments
- **Notification**: Manages user notifications
- **ScheduledAsset**: Handles content calendar scheduling

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
