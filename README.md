# CTRCraft

CTRCraft is an AI-powered YouTube thumbnail generator built with Next.js, featuring user authentication, credit system, and Google Gemini AI integration for creating compelling YouTube thumbnails.

## Features

- 🎨 **AI-Powered Thumbnail Generation**: Generate high-quality YouTube thumbnails using Google Gemini AI
- 🔐 **User Authentication**: Secure authentication with BetterAuth supporting email/password, Google, and GitHub
- 💳 **Credit System**: Built-in credit system for managing thumbnail generation usage
- 📱 **Modern UI**: Beautiful, responsive interface built with Tailwind CSS and Radix UI
- 🚀 **Cloudflare Deployment**: Optimized for Cloudflare Pages deployment
- 🗄️ **Database**: PostgreSQL database with Prisma ORM

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Authentication**: BetterAuth
- **Database**: PostgreSQL with Prisma ORM
- **AI**: Google Gemini AI for image generation
- **Deployment**: Cloudflare Pages with OpenNext.js
- **Icons**: Tabler Icons, Lucide React

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18+ 
- npm or yarn
- PostgreSQL database
- Google Cloud Platform account (for Gemini AI)
- Google OAuth credentials (for Google sign-in)
- GitHub OAuth credentials (for GitHub sign-in)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ctrcraft"

# Google OAuth (for authentication)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# GitHub OAuth (for authentication)
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# Google AI API
GOOGLE_AI_API_KEY="your_google_ai_api_key"

# BetterAuth Secret (generate a random string)
BETTER_AUTH_SECRET="your_random_secret_string"

# App URL (for development)
BETTER_AUTH_URL="http://localhost:3000"
```

### Environment Variables Explanation

- **DATABASE_URL**: PostgreSQL connection string for your database
- **GOOGLE_CLIENT_ID/SECRET**: OAuth credentials from Google Cloud Console
- **GITHUB_CLIENT_ID/SECRET**: OAuth credentials from GitHub Developer Settings
- **GOOGLE_AI_API_KEY**: API key for Google Gemini AI (get from Google AI Studio)
- **BETTER_AUTH_SECRET**: Random secret string for session encryption
- **BETTER_AUTH_URL**: Your app's URL (use `http://localhost:3000` for development)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ctrcraft
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

1. Create a PostgreSQL database
2. Update the `DATABASE_URL` in your `.env.local` file
3. Run database migrations:

```bash
npx prisma migrate dev
```

4. Generate Prisma client:

```bash
npx prisma generate
```

### 4. OAuth Setup

#### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy Client ID and Client Secret to your `.env.local`

#### GitHub OAuth Setup
1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Set Authorization callback URL:
   - `http://localhost:3000/api/auth/callback/github` (development)
   - `https://yourdomain.com/api/auth/callback/github` (production)
4. Copy Client ID and Client Secret to your `.env.local`

### 5. Google AI Setup

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create an API key
3. Add the API key to your `.env.local` as `GOOGLE_AI_API_KEY`

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
ctrcraft/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   └── generate-image/ # AI image generation
│   │   ├── auth/              # Authentication pages
│   │   └── create/            # Thumbnail creation page
│   ├── components/            # React components
│   │   └── ui/                # Reusable UI components
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts            # BetterAuth configuration
│   │   └── auth-client.ts     # Client-side auth
│   └── generated/             # Generated Prisma client
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── secrets/                   # Service account files
└── public/                    # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run preview` - Preview Cloudflare build locally
- `npm run deploy` - Deploy to Cloudflare Pages

## Database Schema

The application uses the following main models:

- **User**: User accounts with credits system
- **Session**: User sessions for authentication
- **Account**: OAuth provider accounts
- **Thumbnail**: Generated thumbnails
- **CreditTransaction**: Credit usage tracking

## Deployment

### Cloudflare Pages

1. Build the project:
```bash
npm run build
```

2. Deploy to Cloudflare:
```bash
npm run deploy
```

3. Set environment variables in Cloudflare Pages dashboard:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `GOOGLE_AI_API_KEY`
   - `DATABASE_URL`
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the development team.

---

**Note**: Make sure to keep your environment variables secure and never commit them to version control. The `.env.local` file should be added to your `.gitignore`.