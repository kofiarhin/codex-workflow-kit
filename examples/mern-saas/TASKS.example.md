# Task Plan Example: TeamPilot

This example shows how to split a MERN SaaS project into small, agent-friendly tasks.

## Workflow Rules

1. Implement one task only.
2. Keep the task scoped to its acceptance criteria.
3. Run the listed verification command or document why it cannot run.
4. Append results to `docs/VERIFY.md`.
5. Stop after summarizing the task.

## Task Backlog

### TASK-001: Add Backend Health Endpoint

Status: `Ready`

Objective:
Add a deployment-friendly health endpoint to confirm the API process is running.

Likely files:

- `server/routes/healthRoutes.js`
- `server/app.js`
- `server/tests/health.test.js`

Acceptance criteria:

- [ ] `GET /api/health` returns HTTP 200.
- [ ] Response includes `status: "ok"` and an ISO timestamp.
- [ ] Endpoint does not require authentication.
- [ ] Supertest covers the endpoint.
- [ ] `docs/VERIFY.md` is updated.

Verification:

```bash
cd server && npm test -- health
```

Stop conditions:

- Server app entry point cannot be identified.
- Test runner is not configured.

### TASK-002: Create Shared Frontend API Client

Status: `Ready`

Objective:
Create a shared Axios API client configured from the Vite environment.

Likely files:

- `client/src/lib/api.js`
- `client/.env.example`
- `client/src/services/healthService.js`

Acceptance criteria:

- [ ] `client/src/lib/api.js` exports a configured Axios instance.
- [ ] Base URL uses `import.meta.env.VITE_API_URL`.
- [ ] No component hard-codes `http://localhost:5000`.
- [ ] `.env.example` documents `VITE_API_URL`.
- [ ] `docs/VERIFY.md` is updated.

Verification:

```bash
cd client && npm run build
```

Stop conditions:

- Axios is not installed and dependency changes are not approved.
- Existing API client already exists with conflicting behavior.

### TASK-003: Add Login Form Validation

Status: `Planned`

Objective:
Add accessible client-side validation to the login form without changing backend auth behavior.

Likely files:

- `client/src/pages/LoginPage.jsx`
- `client/test/LoginPage.test.jsx`

Acceptance criteria:

- [ ] Email is required.
- [ ] Email must be valid.
- [ ] Password is required.
- [ ] Errors are associated with the relevant fields.
- [ ] Existing submit behavior still works when inputs are valid.
- [ ] `docs/VERIFY.md` is updated.

Verification:

```bash
cd client && npm test -- LoginPage
```

Stop conditions:

- Login page does not exist.
- Existing auth flow is unclear.

### TASK-004: Add Project List Endpoint

Status: `Planned`

Objective:
Return projects visible to the authenticated user's active organization.

Likely files:

- `server/models/Project.js`
- `server/controllers/projectController.js`
- `server/routes/projectRoutes.js`
- `server/tests/projects.test.js`

Acceptance criteria:

- [ ] Authenticated users can list projects for organizations they belong to.
- [ ] Users cannot see projects from other organizations.
- [ ] Unauthenticated requests return 401.
- [ ] Test coverage includes success, unauthorized, and cross-organization cases.
- [ ] `docs/VERIFY.md` is updated.

Verification:

```bash
cd server && npm test -- projects
```

Stop conditions:

- Auth middleware is missing or incomplete.
- Organization membership model is not defined.

### TASK-005: Add Dashboard Query Hook

Status: `Planned`

Objective:
Add a frontend query hook that loads dashboard summary data from the backend.

Likely files:

- `client/src/hooks/queries/useDashboardSummary.js`
- `client/src/services/dashboardService.js`
- `client/test/useDashboardSummary.test.jsx`

Acceptance criteria:

- [ ] Service uses the shared API client.
- [ ] Query hook exposes loading, error, and data states.
- [ ] Query key includes organization scope.
- [ ] Test covers success and failure states.
- [ ] `docs/VERIFY.md` is updated.

Verification:

```bash
cd client && npm test -- dashboard
```

Stop conditions:

- TanStack Query provider is not configured.
- Backend dashboard endpoint does not exist.
