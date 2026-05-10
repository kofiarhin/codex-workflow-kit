# Fix Vite 5175 Connection Refused Spec

## Request Summary

Fix repeated browser console errors where the Vite client tries to reach `http://localhost:5175/` and receives `net::ERR_CONNECTION_REFUSED`.

## Date

2026-05-11

## Source Prompt

```txt
fix this error T http://localhost:5175/ net::ERR_CONNECTION_REFUSED
(anonymous) @ client:736
waitForSuccessfulPing @ client:755
await in waitForSuccessfulPing
(anonymous) @ client:561
...
```

The user then said `skip questions`.

## Questions Asked And Answers Received

- Asked whether to inspect/run the app or only provide restart commands; no direct answer.
- Asked what command was running; no direct answer.
- Asked whether `5175` is intended; no direct answer.
- User answered `skip questions`.

## Assumptions

- This is a local development Vite client issue, not a production deployment issue.
- The browser tab is pointed at `http://localhost:5175/`.
- The intended practical fix is to make the frontend dev server consistently serve on port `5175` and fail clearly if that port is unavailable.
- Backend/API behavior is out of scope unless the frontend cannot start because of it.

## Goal

Make the frontend dev server deterministic so `http://localhost:5175/` is a valid local development URL when the client dev command is running, preventing stale-port Vite ping loops caused by automatic port switching.

## Non-Goals

- Do not change deployment targets.
- Do not change backend routes, models, or authentication behavior.
- Do not redesign UI.
- Do not add new dependencies.

## Users

- Local developers running the Vite React frontend.

## Functional Requirements

- The client dev server must use port `5175`.
- The client dev server must use strict port behavior so another process occupying `5175` produces a clear startup failure instead of silently moving to a different port.
- Existing client build behavior must remain valid.

## UI Expectations

- No visual UI changes are expected.
- Existing frontend pages should remain unchanged.

## API Expectations

- No API contract changes.
- Existing `VITE_API_URL` usage remains unchanged.

## Data Model Expectations

- No data model changes.

## Edge Cases

- If port `5175` is already in use, Vite should fail clearly rather than starting on another port and confusing browser tabs.
- If no dev server is running, the browser will still show connection refused; the remedy is to start the client dev server.

## Constraints

- Follow the existing Vite React setup.
- Follow npm workspace commands.
- Keep changes minimal and scoped.
- Frontend-related changes must apply the mandatory `design-taste-frontend` skill.

## Success Criteria

- `npm run build --workspace client` passes.
- Starting the client dev server serves `http://localhost:5175/`.
- The final response includes the command/URL for the user.

## Out Of Scope Items

- Backend startup fixes.
- Database configuration.
- Deployment configuration.
- Browser cache or extension troubleshooting beyond noting stale tab behavior.

## Open Questions

- Whether the user intentionally chose `5175` or it was only the last port selected by Vite.
