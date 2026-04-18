# STEM-ED AI LMS

Production-grade Learning Management System built using a modern React monorepo architecture. 

## Structure
- `apps/web` - React 18 frontend with Vite and TypeScript
- `apps/api` - (Planned) Express.js backend 
- `packages/shared` - (Planned) Shared domain types and logic
- `supabase` - (Planned) Database migrations and config

## Setup Instructions

### Prerequisites
- Node.js >= 20
- pnpm >= 8

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server (web):
   ```bash
   pnpm --filter web run dev
   ```

3. Visit `http://localhost:5173` to view the application.

## Tech Stack
- Frontend: React 18, Vite, Typecript, Tailwind CSS, Framer Motion, Zustand, React Hook Form, Zod
- Workspace Manager: pnpm workspaces
