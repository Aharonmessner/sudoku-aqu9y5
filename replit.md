# Sudoku Game Application

## Overview

This is a full-stack web application featuring a Sudoku game with a React frontend and Express backend. The application provides an interactive Sudoku experience with multiple difficulty levels, grid sizes, and features like game persistence, conflict detection, and theming.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks with local state and TanStack Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: Radix UI primitives with custom shadcn/ui components

### Backend Architecture
- **Runtime**: Node.js with Express framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful endpoints with JSON responses
- **Development**: Hot reload with Vite middleware integration

## Key Components

### Game Logic
- **Sudoku Engine**: Custom implementation supporting both 4x4 and 9x9 grids
- **Puzzle Generation**: Algorithmic puzzle creation with configurable difficulty
- **Validation**: Real-time conflict detection and solution verification
- **Timer**: Built-in game timer with pause/resume functionality

### Database Schema
- **Users Table**: User authentication and profile storage
- **Games Table**: Game state persistence with puzzle, solution, and progress tracking
- **Shared Types**: Common TypeScript interfaces between frontend and backend

### UI Components
- **SudokuGrid**: Interactive grid with cell selection and input handling
- **NumberBar**: Number input interface with clear functionality
- **Settings Modal**: Game configuration (difficulty, grid size, preferences)
- **Win Modal**: Victory celebration with statistics display
- **Theme Provider**: Light/dark mode toggle with persistent preferences

## Data Flow

1. **Game Creation**: Frontend requests new game → Backend generates puzzle → Database stores game state
2. **Game State**: Frontend manages local game state with automatic persistence to localStorage
3. **Game Persistence**: Periodic saves to backend API for cross-device continuity
4. **Conflict Detection**: Client-side validation with visual feedback
5. **Theme Management**: CSS variables with localStorage persistence

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React ecosystem (react-dom, react-router via wouter)
- **Styling**: Tailwind CSS with PostCSS processing
- **Component Library**: Radix UI primitives for accessibility
- **State Management**: TanStack Query for server state caching
- **Form Handling**: React Hook Form with Zod validation
- **Utilities**: date-fns for time formatting, clsx for conditional classes

### Backend Dependencies
- **Database**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod for schema validation
- **Database Provider**: Neon Database serverless connection
- **Session Management**: Connect-pg-simple for PostgreSQL session storage

### Development Dependencies
- **Build Tools**: Vite, esbuild for production builds
- **TypeScript**: Full type safety across the stack
- **Development**: TSX for TypeScript execution, Replit integration plugins

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with HMR (Hot Module Replacement)
- **Backend**: Express server with Vite middleware integration
- **Database**: Neon Database with connection pooling
- **File Structure**: Monorepo with shared types and utilities

### Production Build
- **Frontend**: Vite builds to `dist/public` directory
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Static Serving**: Express serves built frontend assets
- **Database**: Production PostgreSQL connection via environment variables

### Key Features
- **Progressive Difficulty**: Escalating levels with increasing complexity
- **Hint System**: Limited hints per game based on difficulty (Easy: 5, Medium: 3, Hard: 2, Expert: 1)
- **Level Progression**: Automatic level advancement with streak tracking
- **Game Statistics**: Completion time, level, streak, and hints used tracking
- **Responsive Design**: Mobile-friendly interface with touch support
- **Accessibility**: ARIA-compliant components via Radix UI
- **Performance**: Optimized bundle sizes and efficient re-renders
- **Error Handling**: Comprehensive error boundaries and API error handling
- **Persistence**: Multiple layers of state persistence (localStorage, database)

## Recent Changes (January 2025)
- Added hint system with difficulty-based limits
- Implemented level progression and streak tracking
- Enhanced win modal with detailed statistics
- Added visual indicators for game progress in header
- Improved number bar with hint and clear buttons
- Added perfect game bonuses and streak emojis
- Migrated from in-memory storage to PostgreSQL database
- Implemented database connection with Drizzle ORM
- Added number completion detection with cross-out visual feedback
- Created comprehensive info modal with game rules and progression system
- Added info button to header for easy access to help content
- Replaced difficulty buttons with non-interactive color-coded slider (Easy=Green, Expert=Red)
- Implemented "STUPID MODE" feature with real-time correctness feedback (Green=Correct, Red=Wrong)
- Added audio controls for background music and sound effects in settings
- Changed app name from "Sudoku Master" to "Sudoku"
- Updated logo with custom design provided by user
- Enhanced UI with faded difficulty levels showing current selection