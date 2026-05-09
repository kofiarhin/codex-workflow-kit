# Add Login And Logout Toasts Task Plan

## Spec File Used

`_spec/2026-05-11-add-login-logout-toasts.md`

## Planning Date

2026-05-11

## Progress And Summary Files Read

- `_progress/progress.md`
- `_summary/README.md`

## Request Classification

- Type: feature
- Scope: small
- Risk: low
- Execution mode: single-task
- Implementation allowed after spec and plan: yes
- Blocking open questions: none

## Task List

### TASK-001: Show session success toast on the dashboard

Status: Done

Objective:
Add one transient dashboard toast path that fires after successful login and successful logout.

Files likely affected:

- `client/src/redux/ui/uiSlice.js`
- `client/src/pages/LoginPage.jsx`
- `client/src/pages/DashboardPage.jsx`
- `client/src/hooks/mutations/useLogout.js`
- `client/test/App.test.jsx`

Checklist:

- Add Redux UI state/actions for a single active toast.
- Add a logout mutation hook using the existing auth service.
- Dispatch a success toast after login succeeds.
- Navigate to the dashboard after login succeeds.
- Add a top-right dashboard toast component with a 4-second auto-dismiss timer.
- Add a dashboard logout control for authenticated users.
- Dispatch a success toast after logout succeeds and clear auth session state.
- Update focused frontend tests.

Acceptance Criteria:

- Successful login creates a success toast visible on the dashboard.
- Successful logout creates a success toast from the dashboard flow.
- Toast dismisses after 4 seconds.
- No notification persistence or backend changes are added.

Verification Commands:

```bash
npm run test --workspace client
npm run build --workspace client
```

Stop Condition:

- Stop if existing auth state shape prevents a safe dashboard-only notification without broader auth routing changes.

Out-of-scope items:

- Browser push, email, database persistence, notification history, and route-guard redesign.
