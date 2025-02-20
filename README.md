# AI-Powered Task Management System

A comprehensive real-time task management platform that leverages AI to enhance productivity and collaboration.

## Features

- **User Authentication**
  - Secure session-based authentication
  - User registration and login
  - Protected routes and API endpoints

- **Task Management**
  - Create, update, and delete tasks
  - Mark tasks as complete/incomplete
  - Real-time updates across clients
  - Tasks associated with specific users

- **AI Integration**
  - OpenAI GPT-4o powered task suggestions
  - Smart task breakdown recommendations
  - Intelligent task description generation

- **Real-time Updates**
  - WebSocket integration for live updates
  - Instant task synchronization across clients
  - Real-time collaboration features

## Tech Stack

- **Frontend**: React with TypeScript
- **Backend**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Real-time**: WebSocket (ws)
- **AI**: OpenAI/GPT-4o
- **Authentication**: Secure session-based auth
- **Styling**: Tailwind CSS + shadcn/ui

## Environment Variables

The following environment variables are required:

```env
DATABASE_URL=postgresql://...
SESSION_SECRET=your-session-secret
OPENAI_API_KEY=your-openai-api-key
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Codujjwal/full_stack_project_21BCE0352.git
   cd full_stack_project_21BCE0352
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npm run db:push
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `/client` - Frontend React application
  - `/src/components` - Reusable UI components
  - `/src/pages` - Page components
  - `/src/hooks` - Custom React hooks
  - `/src/lib` - Utility functions and configurations

- `/server` - Backend Express application
  - `/auth.ts` - Authentication setup
  - `/routes.ts` - API routes
  - `/storage.ts` - Database interactions
  - `/openai.ts` - AI integration

- `/shared` - Shared code between frontend and backend
  - `/schema.ts` - Database schema and types

## License

MIT
