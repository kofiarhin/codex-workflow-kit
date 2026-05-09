# Add Login And Logout Toasts

## Request Summary

Add in-app toast/banner notifications for successful login and successful logout.

## Date

2026-05-11

## Source Prompt

User requested: `add notification`

Clarified requirements:

- In-app toast/banner notifications only for now.
- Trigger on successful login and successful logout.
- Only authenticated users should see them.
- Show them at the top-right of the dashboard.
- Notifications should disappear automatically after 4 seconds.
- Notifications should not persist in the database.
- Continue with the default single-task workflow.

## Questions Asked And Answers Received

- What kind of notification? Answer: In-app toast/banner only.
- What event should trigger it? Answer: Successful login and successful logout.
- Who should see it, and where? Answer: Only authenticated users, top-right of dashboard.
- Should it persist? Answer: Auto-dismiss after 4 seconds, no database persistence.
- Workflow mode? Answer: Default single-task workflow.

## Assumptions

- "Dashboard" means the existing `/` route rendered by `DashboardPage`.
- Login success should navigate the user to the dashboard so the top-right dashboard toast can be seen.
- Logout success should call the existing backend logout endpoint, clear the client auth state, and show a short success toast as feedback for the completed authenticated action.
- No new third-party notification package is needed.

## Goal

Provide clear, transient user feedback after successful session actions without adding persistence or backend notification features.

## Non-Goals

- Browser push notifications.
- Email notifications.
- Notification center/history.
- Database-backed notification records.
- Route protection or full auth-flow redesign.
- New deployment or environment changes.

## Users

- Users signing in through the existing login page.
- Authenticated dashboard users signing out.

## Functional Requirements

- On successful login, enqueue a success toast.
- On successful login, send the user to the dashboard.
- On successful logout, enqueue a success toast.
- On successful logout, clear client auth session state.
- Toasts automatically dismiss after 4 seconds.
- Toasts are client-only Redux UI state.
- Toasts must not call or require notification persistence APIs.

## UI Expectations

- Toast/banner appears at the top-right of the dashboard area.
- Toast styling follows the existing Tailwind, rounded-md, border, subtle shadow, zinc/emerald palette.
- Toast includes a success icon from the installed `@phosphor-icons/react` package.
- Toast has accessible status semantics.
- Login/logout errors remain inline where applicable.

## API Expectations

- Login continues through `authService.login`.
- Logout uses existing `authService.logout`.
- No new backend endpoints.

## Data Model Expectations

- No database schema changes.
- No persistent notification records.

## Edge Cases

- Failed login must not show a success toast.
- Failed logout must not show a success toast.
- Multiple success actions should replace or update the visible transient notification rather than persisting a stack.
- Auto-dismiss should clean up timers when components unmount.

## Constraints

- Follow repo AGENTS workflow.
- Frontend work must apply `design-taste-frontend`.
- Tailwind CSS remains the styling system.
- Redux Toolkit is appropriate for global client-only UI notification state.
- Do not hard-code API URLs.
- Avoid unrelated refactors.

## Success Criteria

- Login success displays a dashboard toast and navigates to `/`.
- Logout success displays a dashboard toast and clears session.
- Toast auto-dismisses after 4 seconds.
- Existing dashboard and login tests still pass or are updated for the new behavior.
- Client build passes.

## Out Of Scope

- Backend notification models/controllers/routes.
- Notification preferences changes.
- Full auth route guarding.
- Persistent notification drawer.

## Open Questions

- Should logout redirect to the login page in a future task? Not required for this task.
