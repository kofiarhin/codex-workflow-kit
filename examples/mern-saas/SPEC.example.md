# Product Specification Example: TeamPilot

Project: TeamPilot

Last updated: 2026-05-10

Owner: Product and Engineering

## Product Overview

TeamPilot is a lightweight SaaS workspace for small teams to manage projects, invite members, and track task progress from a shared dashboard.

## Goals

- Let a user create an account and organization.
- Let organization admins invite team members.
- Let team members create, assign, and complete project tasks.
- Provide a simple dashboard with project status and overdue work.

## Users

Primary users:

- Organization owner
- Team admin
- Team member

User needs:

- Understand what work is assigned to them.
- See project progress quickly.
- Invite and manage teammates without support help.
- Keep project data private to the organization.

## Features

### Core Features

1. Authentication
   - Description: Users can register, log in, log out, and reset passwords.
   - User value: Secure access to private workspaces.
   - Priority: Must

2. Organization Workspace
   - Description: Users belong to one or more organizations with roles.
   - User value: Teams can separate their data and permissions.
   - Priority: Must

3. Project Tasks
   - Description: Users can create, assign, update, and complete tasks within projects.
   - User value: Teams can manage work in one place.
   - Priority: Must

4. Dashboard
   - Description: Users can see assigned tasks, overdue tasks, and project status.
   - User value: Users know what needs attention.
   - Priority: Should

### Supporting Features

- Email invitations
- Basic role management
- Activity timestamps
- Account settings

## Frontend Requirements

- Framework: React with Vite
- Styling: Tailwind CSS
- Routing: React Router
- State management: Redux Toolkit for auth/session UI state
- Server state: TanStack Query
- API client: `client/src/lib/api.js`
- Accessibility requirements:
  - Forms have labels and accessible error messages.
  - Interactive controls are keyboard reachable.
  - Loading and error states are visible.
- Responsive requirements:
  - Dashboard works at mobile, tablet, and desktop widths.
  - Tables collapse or adapt on narrow screens.
- Key screens:
  - Login: User authentication.
  - Dashboard: Assigned work and project status.
  - Projects: Project list and task counts.
  - Project Detail: Task list, assignment, and completion.
  - Members: Invite and manage organization users.

## Backend Requirements

- Runtime/framework: Node.js and Express
- Database: MongoDB with Mongoose
- Authentication: HTTP-only session cookie or JWT with refresh strategy
- Authorization: Organization role checks on protected resources
- Background jobs: Not required for MVP
- File storage: Not required for MVP
- Email/notifications: Transactional email for invitations and password reset
- Logging/monitoring: Structured request logs and error logs

## Infrastructure

- Frontend hosting: Namecheap shared hosting or equivalent static host
- Backend hosting: Heroku
- Database hosting: MongoDB Atlas
- CI/CD: GitHub Actions
- Environments:
  - Local
  - Production
- Required environment variables:
  - `MONGODB_URI`: MongoDB connection string
  - `SESSION_SECRET`: Session signing secret
  - `CLIENT_ORIGIN`: Allowed frontend origin
  - `EMAIL_API_KEY`: Transactional email provider key
  - `VITE_API_URL`: Frontend API base URL

## API Expectations

- API style: REST
- Base URL strategy: Frontend reads `VITE_API_URL`
- Authentication mechanism: HTTP-only cookie
- Error format:

  ```json
  {
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Email is required"
    }
  }
  ```

- Expected endpoints:
  - `POST /api/auth/register`: Create user and first organization.
  - `POST /api/auth/login`: Start a session.
  - `POST /api/auth/logout`: End a session.
  - `GET /api/me`: Return current user and organizations.
  - `GET /api/projects`: List projects for active organization.
  - `POST /api/projects`: Create a project.
  - `GET /api/projects/:projectId/tasks`: List project tasks.
  - `POST /api/projects/:projectId/tasks`: Create a task.
  - `PATCH /api/tasks/:taskId`: Update task fields.
  - `POST /api/invitations`: Invite a team member.

## Constraints

- MVP should avoid paid infrastructure beyond hosting and database.
- API must not expose `passwordHash` or invitation tokens.
- Organization data must be isolated by membership.
- Frontend must not hard-code localhost API URLs.

## Non-Goals

- Real-time collaboration.
- Billing and subscriptions.
- Native mobile apps.
- Advanced reporting.
- Third-party project management imports.

## Success Criteria

- A new user can register and create an organization.
- An admin can invite a member.
- A member can create and complete a task.
- Protected routes reject unauthenticated users.
- Core backend API tests pass.
- Frontend builds successfully for production.

## Future Improvements

- Billing with plan limits.
- Real-time task updates.
- Project templates.
- Audit log.
- Advanced search and filters.
