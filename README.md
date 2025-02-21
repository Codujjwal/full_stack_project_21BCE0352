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
- **State Management**: In-memory storage
- **Real-time**: WebSocket (ws)
- **AI**: OpenAI/GPT-4o
- **Authentication**: Secure session-based auth
- **Styling**: Tailwind CSS + shadcn/ui

## Environment Variables

The following environment variables are required:

```env
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

3. Start the development server:
   ```bash
   npm run dev
   ```

## Using GitHub Codespaces

1. Click the green "Code" button in your repository
2. Select "Codespaces" tab
3. Click "Create codespace on main"

The Codespace will automatically:
- Install Node.js and dependencies
- Set up the development environment
- Start the development server

Make sure to add your OpenAI API key in Codespaces:
1. Go to repository Settings
2. Navigate to Secrets and Variables > Codespaces
3. Add a new secret named `OPENAI_API_KEY`

## Project Structure

- `/client` - Frontend React application
  - `/src/components` - Reusable UI components
  - `/src/pages` - Page components
  - `/src/hooks` - Custom React hooks
  - `/src/lib` - Utility functions and configurations

- `/server` - Backend Express application
  - `/auth.ts` - Authentication setup
  - `/routes.ts` - API routes
  - `/storage.ts` - In-memory data storage
  - `/openai.ts` - AI integration

- `/shared` - Shared code between frontend and backend
  - `/schema.ts` - Data types and validation schemas

## License

MIT