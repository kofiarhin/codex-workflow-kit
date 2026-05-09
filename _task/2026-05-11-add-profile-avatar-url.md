# Add Profile Avatar URL Task Plan

## Spec File Used

`_spec/2026-05-11-add-profile-avatar-url.md`

## Planning Date

2026-05-11

## Progress And Summary Files Read

- `_progress/progress.md`
- `_summary/2026-05-11-add-login-logout-toasts.md`
- `docs/PROJECT_CONTEXT.md`
- `docs/ARCHITECTURE.md`
- `docs/VERIFY.md`

## Request Classification

- Type: feature
- Scope: medium
- Risk: medium
- Execution allowed: single-task only
- Blocking open questions: none

## Task List

### TASK-001: Save avatar URL and show it in the header

Status: Done

Objective:
Add one working profile/settings flow where an authenticated user can save an optional avatar URL and see that avatar in the header user area.

Files likely affected:

- `server/models/User.js`
- `server/controllers/authController.js`
- `server/routes/authRoutes.js`
- `server/tests/auth.test.js` or a new auth/profile test file
- `client/src/services/authService.js`
- `client/src/hooks/mutations/useUpdateProfile.js`
- `client/src/redux/auth/authSlice.js`
- `client/src/constants/constans.js`
- `client/src/routes/AppRoutes.jsx`
- `client/src/components/layout/AppShell.jsx`
- `client/src/pages/ProfileSettingsPage.jsx`
- `client/test/App.test.jsx`

Checklist:

- Add optional `avatarUrl` to the user model and public JSON response.
- Add server-side avatar URL validation for blank, JPG, JPEG, PNG, and WebP URL strings.
- Add a protected profile update endpoint that saves the current user's avatar URL.
- Add frontend service and mutation hook for the profile update endpoint.
- Store updated `avatarUrl` in auth session metadata after login and profile save.
- Add a profile/settings page route and navbar link.
- Add a square avatar preview with initials fallback.
- Add header user area avatar display with fallback.
- Add focused frontend and backend tests.
- Run relevant verification.

Acceptance criteria:

- Valid JPG/PNG/WebP URLs can be saved.
- Blank avatar URL clears the saved value.
- Invalid or unsupported URLs are rejected with a user-facing error.
- Header shows the saved avatar URL when available.
- Header falls back to initials when no avatar URL exists or an image fails to load.
- `passwordHash` remains excluded from all public responses.

Verification commands:

- `npm run test --workspace server`
- `npm run test --workspace client`
- `npm run build --workspace client`

Stop condition:

- Stop after this task is implemented, verified, reviewed, progress is updated, and review/summary artifacts are written.

Out-of-scope items:

- Binary file uploads.
- Cloud storage.
- Cropping or image editing.
- Editable display name or email.
- Avatar display outside the header user area.

### TASK-002: Polish avatar settings after review

Status: Planned

Objective:
Address any non-blocking avatar UX or validation follow-up discovered after TASK-001.

Files likely affected:

- To be determined after TASK-001 review.

Checklist:

- Review TASK-001 user flow.
- Identify only follow-up work that is still in scope.
- Implement if explicitly requested in a future workflow continuation.

Acceptance criteria:

- Any follow-up has clear scope and verification.

Verification commands:

- To be determined.

Stop condition:

- Do not execute in this run because the user requested single-task execution only.

Out-of-scope items:

- Any work not discovered or requested after TASK-001.
