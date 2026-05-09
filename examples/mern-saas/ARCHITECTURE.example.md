# Architecture Plan Example: TeamPilot

Project: TeamPilot

Last updated: 2026-05-10

## System Overview

TeamPilot is a MERN SaaS application with a React frontend, Express API, MongoDB persistence, and organization-scoped authorization. The frontend talks to the backend through a shared API client. The backend owns authentication, authorization, and all organization data rules.

## Folder Structure

```txt
client/
  src/
    components/
      layout/
      forms/
      tasks/
    hooks/
      queries/
      mutations/
    lib/
      api.js
    pages/
      DashboardPage.jsx
      LoginPage.jsx
      ProjectDetailPage.jsx
      ProjectsPage.jsx
    redux/
      store.js
      providers.jsx
      auth/
      ui/
    routes/
      AppRoutes.jsx
    services/
      authService.js
      projectService.js
      taskService.js
    styles/
    utils/
  test/

server/
  config/
    db.js
  controllers/
    authController.js
    projectController.js
    taskController.js
  middleware/
    requireAuth.js
    requireOrgRole.js
    errorHandler.js
  models/
    User.js
    Organization.js
    Membership.js
    Project.js
    Task.js
  routes/
    authRoutes.js
    projectRoutes.js
    taskRoutes.js
  tests/
  utils/
```

## Frontend Architecture

- Framework: React with Vite
- Styling: Tailwind CSS
- Routing: React Router
- Client state: Redux Toolkit for auth session metadata and UI preferences
- Server state: TanStack Query for API data
- API client: `client/src/lib/api.js`
- Services: `client/src/services/*`

Frontend rules:

- Components call hooks, not raw API endpoints.
- Services use the shared API client.
- Query hooks live in `client/src/hooks/queries`.
- Mutation hooks live in `client/src/hooks/mutations`.
- Protected pages redirect when the auth session is missing.
- Forms show inline validation errors and preserve server error messages.

## Backend Architecture

- Runtime: Node.js
- Framework: Express
- Database: MongoDB with Mongoose
- Authentication: HTTP-only session cookie
- Authorization: Organization membership and role checks
- Validation: Route-level request validation before controllers
- Error handling: Central error middleware with consistent response shape

Backend rules:

- `requireAuth` loads the current user.
- `requireOrgRole` checks organization access before controllers mutate data.
- Controllers translate requests to model operations and response DTOs.
- Models define persistence shape and indexes.
- API responses never include `passwordHash`, reset tokens, or invite tokens.

## State Management

Redux stores:

- Auth session summary: user ID, active organization ID, display name.
- UI preferences: sidebar state, theme preference.

TanStack Query stores:

- Organizations.
- Projects.
- Tasks.
- Dashboard summaries.
- Members and invitations.

Server data is not duplicated in Redux.

## API Strategy

- API style: REST
- Base path: `/api`
- Versioning: No version prefix for MVP
- Auth transport: HTTP-only cookie
- Frontend base URL: `import.meta.env.VITE_API_URL`

Error shape:

```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "You do not have access to this organization"
  }
}
```

Authorization rules:

- Every project belongs to an organization.
- Every task belongs to a project.
- A user can access a project only through organization membership.
- Admin-only routes require an owner or admin membership role.

## Testing Strategy

Frontend:

- Component tests for forms and important UI states.
- Hook tests for query and mutation behavior.
- Build validation before deployment.

Backend:

- Supertest tests for auth, project, task, and invitation endpoints.
- Cross-organization access tests for every protected resource.
- Model tests only where schema behavior is non-trivial.

Manual verification:

- Register a new account.
- Create an organization.
- Invite a user.
- Create and complete a task.
- Confirm unauthorized users cannot view private organization data.

## Deployment Strategy

- Frontend: Namecheap static hosting through GitHub Actions FTP deploy
- Backend: Heroku
- Database: MongoDB Atlas
- CI/CD: GitHub Actions runs tests before deployment

Required environment variables:

- `MONGODB_URI`
- `SESSION_SECRET`
- `CLIENT_ORIGIN`
- `EMAIL_API_KEY`
- `VITE_API_URL`

Release expectations:

- Backend tests pass.
- Frontend build passes.
- Environment variables are documented.
- Smoke test confirms `/api/health` and login flow.

## Scaling Considerations

Near-term:

- Add indexes for organization ID, project ID, assignee ID, and due date.
- Paginate task lists before teams exceed large workspaces.
- Rate-limit auth and invitation endpoints.

Future:

- Add background jobs for email and reminders.
- Add audit logs for admin actions.
- Add caching for dashboard summaries if needed.
- Add plan limits before billing launch.

## Open Architecture Questions

- Should users support multiple active organizations at launch?
- Should invitations create pending memberships or separate invitation records?
- Should task comments be part of MVP?
