# Task Plan

This file controls implementation scope. Agents should complete one task at a time, verify it, update `docs/VERIFY.md`, and stop.

## Workflow Rules

1. Select exactly one task.
2. Confirm the task has clear acceptance criteria.
3. Implement only the files and behavior needed for that task.
4. Avoid unrelated refactors.
5. Run or recommend the listed verification commands.
6. Append verification results to `docs/VERIFY.md`.
7. Stop after the task summary.

## Scoped Implementation Strategy

Each task should be small enough to review independently. Prefer tasks that can be completed in one focused change set.

Good task scope:

- Add one endpoint.
- Build one screen.
- Fix one bug.
- Add tests for one behavior.
- Extract one shared helper because the current task needs it.

Poor task scope:

- Rebuild authentication.
- Clean up the whole frontend.
- Improve all tests.
- Refactor the API.
- Make the app production ready.

## Acceptance Criteria System

Every task must define observable completion criteria.

Use this format:

```txt
Acceptance criteria:
- [ ] User/system can do <specific behavior>.
- [ ] Edge case <specific edge case> is handled.
- [ ] Tests or manual verification cover <specific path>.
- [ ] Documentation or verification log is updated.
```

## Stop Conditions

Stop and ask for direction when:

- Acceptance criteria are unclear.
- Required files or services are missing.
- The task requires credentials or unavailable access.
- The task requires a dependency or architecture change not listed here.
- Existing uncommitted work overlaps with the task.
- Tests fail outside the task scope.

## Task Backlog

### TASK-001: `<Task title>`

Status: `Planned`

Objective:
`<One-sentence objective.>`

Likely files:

- `<path/to/file>`
- `<path/to/file>`

Acceptance criteria:

- [ ] `<Criterion 1>`
- [ ] `<Criterion 2>`
- [ ] `<Criterion 3>`

Verification:

```bash
<command>
```

Stop conditions:

- `<Condition>`

### TASK-002: `<Task title>`

Status: `Planned`

Objective:
`<One-sentence objective.>`

Likely files:

- `<path/to/file>`

Acceptance criteria:

- [ ] `<Criterion 1>`
- [ ] `<Criterion 2>`

Verification:

```bash
<command>
```

Stop conditions:

- `<Condition>`

## Reusable Task Examples

### Example: Add Health Check Endpoint

Objective:
Add a backend health endpoint for deployment monitoring.

Acceptance criteria:

- [ ] `GET /api/health` returns HTTP 200.
- [ ] Response includes service status and timestamp.
- [ ] Endpoint does not expose secrets or database credentials.
- [ ] A Supertest test covers the endpoint.

Verification:

```bash
cd server && npm test -- health
```

### Example: Add Shared API Client

Objective:
Create a single frontend API client that reads the base URL from environment configuration.

Acceptance criteria:

- [ ] `client/src/lib/api.js` exports a configured API client.
- [ ] API base URL uses `import.meta.env.VITE_API_URL`.
- [ ] Components do not hard-code API URLs.
- [ ] At least one service uses the shared client.

Verification:

```bash
cd client && npm test
cd client && npm run build
```

### Example: Add Login Form Validation

Objective:
Improve login form validation without changing the authentication API.

Acceptance criteria:

- [ ] Email is required and must be a valid email format.
- [ ] Password is required.
- [ ] Validation errors are accessible to screen readers.
- [ ] Existing login behavior still works.

Verification:

```bash
cd client && npm test -- login
```
