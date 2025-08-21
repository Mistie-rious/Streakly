# Streakly

## Project Description
This is a full-stack Habit Tracker application built with **NestJS** for the backend and **React (Vite + TypeScript)** for the frontend.
It allows users to register, log in, manage habits, track daily progress, and view detailed habit statistics.
The architecture follows modular principles, separating frontend pages, shared/UI components, state management, and backend features.

---

## Tech Stack

### Frontend
- React 18 + Vite
- TypeScript
- React Router
- Redux Toolkit + RTK Query
- ShadCN UI components

### Backend
- NestJS
- TypeScript
- Prisma ORM (PostgreSQL)
- JWT Authentication

---

## Folder Structure 

### Frontend (`src/`)
```
src/
├── pages/        # Feature pages (auth, dashboard, habits)
├── components/   # Shared & UI components
├── store/        # Redux slices & RTK Query APIs
├── lib/          # Utilities, API client, types
```

### Backend (`src/`)
```
src/
├── auth/         # Auth controllers, services, DTOs, strategies
├── users/        # User controllers, services, DTOs, entities
├── habits/       # Habit controllers, services, DTOs, types
├── tracks/       # Habit tracking controllers, services, DTOs
├── reminders/    # Reminder controllers, services, DTOs
├── common/       # Decorators, guards, filters, interceptors
├── prisma/       # Prisma module and service
```

---


---
## Setup Instructions

### Frontend

```bash
# Clone the repository
git clone <repository-url>
cd <repository-folder>/frontend
```
```bash
# Install dependencies
pnpm install
```
```bash
# Run development server
pnpm dev
```


### Backend


```bash
# Clone the repository:
git clone <repository-url> 
cd <repository-folder>/backend
```

```bash
# Install dependencies
pnpm install
```

```bash
# Run migrations
npx prisma migrate dev
```

```bash
# Start backend server
pnpm start:dev
```

### Environment Variables
Create a `.env` file in the backend root with:
```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
PORT=you_port_number
```

Create a `.env` file in the frontend root with:
```
VITE_API_BASE_URL=your_api_url
```
---

## Notes
- Frontend and backend communicate via REST APIs.
- JWT token is required for protected routes.
- Redux Toolkit + RTK Query is used for state management and API calls.
- Prisma handles database interactions and migrations.

