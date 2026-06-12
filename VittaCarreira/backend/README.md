# Backend API - PWA App

Node.js/Express backend with MongoDB for the PWA application.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
```bash
cp .env.example .env
```
Then edit `.env` with your MongoDB connection string and other settings.

### 3. Install MongoDB
- **Local**: Download from https://www.mongodb.com/try/download/community
- **Cloud**: Use MongoDB Atlas (https://www.mongodb.com/cloud/atlas) - Free tier available

### 4. Start the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm run build
npm start
```

## Project Structure
```
backend/
├── src/
│   ├── server.ts          # Main entry point
│   ├── config/            # Configuration files
│   ├── routes/            # API route definitions
│   ├── controllers/        # Business logic
│   ├── models/            # MongoDB schemas
│   ├── middlewares/        # Custom middlewares
│   └── utils/             # Utility functions
├── dist/                  # Compiled JavaScript (auto-generated)
├── package.json
├── tsconfig.json
└── .env
```

## API Endpoints
Endpoints will be added as you develop features.

## Common Commands
- `npm run dev` - Start development server
- `npm run build` - Compile TypeScript
- `npm run lint` - Check code quality
- `npm run format` - Format code with Prettier

## Next Steps
1. Set up your `.env` file with MongoDB connection
2. Create your first API route in `src/routes/`
3. Define data models in `src/models/`
4. Implement controllers in `src/controllers/`
