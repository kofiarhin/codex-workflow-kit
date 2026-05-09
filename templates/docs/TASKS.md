# Task Plan

This file controls implementation scope for the work request in `WORK_REQUEST.md`. Agents should generate scoped tasks, execute one task at a time, verify, critique, update logs, and stop or continue only when explicitly allowed by `RUN_WORKFLOW.md`.

Default execution mode is `single-task` unless `WORK_REQUEST.md` explicitly says otherwise.

## Workflow Rules

1. Classify the request before generating tasks.
2. Read execution mode from `WORK_REQUEST.md`; use `single-task` if missing.
3. Create tasks that are small enough to review independently.
4. Select one active task at a time.
5. Copy the active task into `docs/ACTIVE_TASK.md`.
6. Implement only the active task.
7. Avoid unrelated refactors.
8. Run or recommend the listed verification commands.
9. Append verification results to `docs/VERIFY.md`.
10. Stop if acceptance criteria, risk, or scope are unclear.

## Execution Modes

- `plan-only`: Create or update tasks but execute none. Stop after task generation.
- `single-task`: Execute one `Ready` task only. Verify, critique/fix, update logs, then stop.
- `full-auto`: Execute sequential `Ready` tasks until all are complete or stopped.

`full-auto` must be explicitly selected in `WORK_REQUEST.md`. Agents must not continue to another task unless the current task is `Done`, verified, critiqued, and logged.

## Task Status Rules

- `Planned`: Task is identified but not ready for execution.
- `Ready`: Task has enough scope, acceptance criteria, and verification commands to execute.
- `In progress`: Task is currently active in `docs/ACTIVE_TASK.md`.
- `Blocked`: Task cannot continue because of missing information, access, tooling, risk, or failed prerequisites.
- `Needs review`: Task is implemented but requires user or human review before it can be considered done.
- `Done`: Task is implemented, verified, critiqued, logged, and has no unresolved in-scope defects.

## Request Types

- `feature`: Adds user-facing or system behavior.
- `bugfix`: Fixes broken behavior.
- `boilerplate`: Creates starter structure or configuration.
- `security`: Audits or improves security.
- `refactor`: Improves structure without intentional behavior change.
- `test`: Adds or repairs tests.
- `docs`: Updates documentation only.
- `ops`: Changes deployment, CI, environment, or infrastructure.
- `research`: Investigates and reports without implementation.

## Task Template

### TASK-001: `<Task title>`

Status: `<Planned / Ready / In progress / Blocked / Needs review / Done>`

Request type: `<feature / bugfix / boilerplate / security / refactor / test / docs / ops / research>`

Objective:
`<One-sentence objective.>`

Files likely affected:

- `<path/to/file-or-folder>`

Checklist:

- [ ] `<Implementation step>`
- [ ] `<Documentation/log update>`
- [ ] `<Verification step>`

Acceptance criteria:

- [ ] `<Observable behavior or outcome>`
- [ ] `<Edge case or constraint>`
- [ ] `<Verification/logging requirement>`

Verification commands:

```bash
<command>
```

Stop condition:

- `<Condition that requires stopping or asking the user>`

Notes:

- `<Optional planning note>`

## Task Backlog

### TASK-001: `<Generated task title>`

Status: `Planned`

Request type: `<request type>`

Objective:
`<Generated from WORK_REQUEST.md.>`

Files likely affected:

- `<path/to/file-or-folder>`

Checklist:

- [ ] `<Step 1>`
- [ ] `<Step 2>`
- [ ] Update `docs/ACTIVE_TASK.md`.
- [ ] Update `docs/VERIFY.md`.

Acceptance criteria:

- [ ] `<Criterion 1>`
- [ ] `<Criterion 2>`
- [ ] `<Criterion 3>`

Verification commands:

```bash
<command>
```

Stop condition:

- `<Condition>`

Notes:

- `<Any assumptions or links to relevant docs.>`

## Reusable Task Examples

### Example: Feature Request

Status: `Ready`

Request type: `feature`

Objective:
Add a login endpoint and connect it to the existing auth flow.

Files likely affected:

- `server/routes/authRoutes.js`
- `server/controllers/authController.js`
- `server/tests/auth.test.js`

Checklist:

- [ ] Confirm existing auth model and password handling.
- [ ] Add the smallest endpoint/controller change.
- [ ] Add or update focused tests.
- [ ] Update `docs/VERIFY.md`.

Acceptance criteria:

- [ ] Valid credentials return a successful auth response.
- [ ] Invalid credentials return a safe error.
- [ ] Sensitive fields are not returned.
- [ ] Auth tests pass.

Verification commands:

```bash
cd server && npm test -- auth
```

Stop condition:

- Auth storage or session strategy is not identifiable.

### Example: Bugfix Request

Status: `Ready`

Request type: `bugfix`

Objective:
Fix dashboard totals when completed tasks are filtered out.

Files likely affected:

- `client/src/pages/DashboardPage.jsx`
- `client/src/services/dashboardService.js`
- `client/test/DashboardPage.test.jsx`

Checklist:

- [ ] Reproduce or locate the incorrect calculation.
- [ ] Fix only the dashboard total behavior.
- [ ] Add or update a focused regression test.
- [ ] Update verification logs.

Acceptance criteria:

- [ ] Dashboard totals match API data after filters change.
- [ ] Completed tasks are counted according to the spec.
- [ ] Regression test covers the broken case.

Verification commands:

```bash
cd client && npm test -- Dashboard
```

Stop condition:

- Expected dashboard counting rules are not documented or inferable.

### Example: Security Request

Status: `Ready`

Request type: `security`

Objective:
Audit authentication responses for sensitive data exposure.

Files likely affected:

- `server/controllers/authController.js`
- `server/models/User.js`
- `server/tests/auth.test.js`
- `docs/VERIFY.md`

Checklist:

- [ ] Inspect auth response serialization.
- [ ] Identify sensitive fields.
- [ ] Add tests preventing sensitive field exposure.
- [ ] Document findings.

Acceptance criteria:

- [ ] API responses do not expose `passwordHash`, reset tokens, or internal tokens.
- [ ] Tests cover sensitive fields.
- [ ] Any unresolved risk is documented.

Verification commands:

```bash
cd server && npm test -- auth
```

Stop condition:

- Security issue requires secret rotation or production access.
