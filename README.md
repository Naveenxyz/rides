# BangaRide - Motorcycle Community App

BangaRide is a web application for motorcycle enthusiasts in Bangalore to discover scenic spots, plan day trips, and connect with fellow riders.

## Features

- Discover motorcycle-friendly spots around Bangalore
- View curated day trip plans
- User authentication with Google
- Rate and comment on spots and trips
- Mark trips as completed
- Mobile-responsive design

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons
- Google OAuth for authentication

### Backend
- NestJS framework
- TypeORM for database interactions
- PostgreSQL database
- JWT for authentication
- Passport.js for Google OAuth integration

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database

### Installation

1. Clone the repository
```
git clone https://github.com/Naveenxyz/rides
cd rides
```

2. Install dependencies for both frontend and backend
```
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

3. Configure environment variables
   - Create a `.env` file in the root directory for frontend variables
   - Create a `.env` file in the `server` directory for backend variables
   - Set up Google OAuth credentials and update the `.env` files

4. Start the development servers
```
# Start both frontend and backend concurrently
npm run dev:all

# Or start them separately
npm run dev        # Frontend
npm run server     # Backend
```

5. Open your browser and navigate to `http://localhost:5173`

## Setting up Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Navigate to "APIs & Services" > "Credentials"
4. Create an OAuth 2.0 Client ID
5. Add authorized JavaScript origins: `http://localhost:5173`
6. Add authorized redirect URIs: `http://localhost:3000/auth/google/callback`
7. Copy the Client ID and Client Secret to your `.env` files

## Database Setup

1. Create a PostgreSQL database named `bangaride`
2. Update the database connection details in `server/.env`
3. The application will automatically create the necessary tables on first run

## License

This project is licensed under the MIT License - see the LICENSE file for details.