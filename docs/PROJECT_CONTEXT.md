# Project Context

This file captures durable repository facts discovered during workflow runs. Keep it concise and update it when repo conventions become clear.

## Project Summary

- Project name: `codex-workflow-kit-mern-boilerplate`
- Purpose: MERN boilerplate with React dashboard, auth baseline, notification preferences, and Express API.
- Current maturity: MVP/starter

## Stack

- Frontend: React with Vite
- Backend: Express
- Database: MongoDB with Mongoose
- Runtime: Node.js
- Languages: JavaScript and JSX
- Styling: Tailwind CSS
- Deployment: Frontend to Namecheap and backend to Heroku per repository instructions

## Package Manager

- Detected package manager: npm workspaces
- Lockfiles: `package-lock.json`
- Install command: `npm install`

## Common Commands

```bash
# Local development
npm run dev
# Frontend dev URL: http://127.0.0.1:5175/

# Test
npm test

# Lint
No lint script is currently defined.

# Build
npm run build

# Typecheck
No typecheck script is currently defined.
```

## Testing Tools

- Unit tests: Vitest for frontend, Jest for backend
- Integration tests: React Testing Library for frontend components, Supertest available for backend API tests
- End-to-end tests: none detected
- Manual verification notes: Use focused workspace commands such as `npm run test --workspace client` and `npm run build --workspace client`.

## Repo Conventions

- Folder conventions: Frontend lives in `client/src`; backend lives flat under `server/`.
- Naming conventions: React components use PascalCase `.jsx`; hooks use `use*.js`.
- API conventions: Frontend API calls go through services and shared `client/src/lib/api.js`.
- State management conventions: Redux Toolkit for client-owned global state; TanStack Query for server state.
- Error handling conventions: Current UI uses inline form/dashboard alerts for mutation errors.
- Profile conventions: User records include an optional `avatarUrl` string; profile avatar updates use the protected `/api/auth/profile` endpoint and store URL strings only.
- Dev server conventions: Vite client dev server is pinned to `127.0.0.1:5175` with strict port behavior.

## Architecture Rules

- Keep notification toasts as client-only UI state unless a future task explicitly adds persistence.
- Use existing auth service functions for login/logout workflows.
- Store user avatar images as URL strings only until a future media storage task is explicitly requested.

## Known Constraints

- Frontend work must follow Tailwind CSS and the mandatory `design-taste-frontend` skill.
- Do not move backend code into `server/src/`.

## Open Questions

- Should logout redirect to `/login` after showing success feedback?
