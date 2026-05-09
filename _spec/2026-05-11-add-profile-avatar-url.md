# Add Profile Avatar URL

## Request Summary

Add profile avatar support using URL strings only. Users should be able to set an avatar URL in a simple profile/settings UI, and the avatar should appear in the navbar/header user area.

## Date

2026-05-11

## Source Prompt

`add profile avatar upload`

Clarified by user:

1. Store avatar images as URL strings only for now. No local uploads or S3/Cloudinary yet.
2. Create a simple profile/settings UI if one does not already exist.
3. Show the avatar in the navbar/header user area only.
4. Constraints: accept JPG/PNG/WebP URL values, show a square preview, no cropping tool, no file upload, max simple validation only.
5. Stop after planning and single-task execution. Do not full-auto.

## Questions Asked And Answers Received

- Storage: User answered URL strings only; no local upload or cloud storage.
- UI location: User answered create simple profile/settings UI if missing.
- Display locations: User answered navbar/header user area only.
- Validation and preview: User answered JPG/PNG/WebP URL values, square preview, no cropper, no file upload, simple validation only.
- Execution preference: User answered stop after planning and single-task execution.

## Assumptions

- The avatar value may be blank to remove or leave the avatar unset.
- "Simple validation" means client and server should reject non-URL values and URL paths that do not end in `.jpg`, `.jpeg`, `.png`, or `.webp`, ignoring query strings and hashes.
- A remote image URL may fail to load after passing validation; the UI should fall back to initials in that case.
- Existing authentication state can carry `avatarUrl` as client-owned session metadata after login and profile updates, while the backend remains the source of truth for the stored value.
- Existing users should continue to work because `avatarUrl` is optional.

## Goal

Allow authenticated users to save an avatar image URL on their profile and see that avatar in the app header.

## Non-Goals

- No binary file upload.
- No local file storage.
- No S3, Cloudinary, or other media service.
- No image cropping or editing.
- No avatar display outside the header user area.
- No route guard changes unless required by the active task.

## Users

- Authenticated app users who want a visible profile avatar.

## Functional Requirements

- Add an optional `avatarUrl` field to the user model.
- Include `avatarUrl` in safe public user JSON responses.
- Add a protected API path that updates the authenticated user's profile avatar URL.
- Validate avatar URLs on the server.
- Add a frontend service and mutation hook for saving profile settings.
- Add a profile/settings route if none exists.
- Provide an input for avatar URL, a square preview, validation feedback, save state, empty state, and error state.
- Show the saved avatar in the header user area when the session has an avatar URL.
- Show an initials fallback when there is no avatar URL or the image fails to load.
- Keep API calls in services and hooks.

## UI Expectations

- Tailwind CSS only.
- Follow the existing Forgeboard app style and `design-taste-frontend` guidance.
- Use a compact profile/settings page rather than a marketing-style page.
- Labels must sit above inputs; errors must sit below inputs.
- The avatar preview must stay square at mobile and desktop sizes.
- Header avatar must not overlap navigation or theme controls.
- Include loading, empty/default, success, and error states where relevant.

## API Expectations

- Add a protected endpoint under the existing auth/profile area, such as `PATCH /api/auth/profile`.
- Request body should accept `{ avatarUrl: string }` or equivalent.
- Response should return `{ user: publicUser }`.
- Do not expose `passwordHash`.
- Use existing `AppError`, `asyncHandler`, `requireAuth`, and shared API error behavior.

## Data Model Expectations

- `User.avatarUrl` is optional.
- Stored value is a trimmed string.
- Maximum length should be bounded to avoid oversized payloads.
- Existing users without an avatar URL should serialize with an empty string or null consistently.

## Edge Cases

- Empty avatar URL clears the saved avatar.
- Invalid URLs are rejected.
- URLs with unsupported extensions are rejected.
- Uppercase extensions are accepted.
- URLs with query strings or hashes are accepted if the pathname extension is supported.
- Image load failure shows initials fallback without crashing the header or page.
- Unauthenticated users receive the existing authentication error behavior.

## Constraints

- Frontend: React, Vite, Tailwind CSS, Redux Toolkit for client session metadata, TanStack Query for server state, shared API client in `client/src/lib/api.js`.
- Backend: Express, Mongoose, flat `server/` structure, Jest/Supertest.
- Do not hard-code API URLs in components or services.
- Do not introduce a new dependency unless required.
- Stop after the first executable task, then create review and summary artifacts.

## Success Criteria

- A user can enter a valid JPG/PNG/WebP image URL on a profile/settings page and save it.
- The backend persists the URL string on the user record.
- The public user shape includes `avatarUrl` without exposing sensitive fields.
- The header user area displays the avatar or initials fallback.
- Invalid avatar URLs show validation errors.
- Relevant frontend and backend tests pass, or any verification gap is documented.

## Out Of Scope Items

- File upload UX.
- Media storage provider setup.
- Image transformations.
- Cropping.
- Public profile pages.
- Broader account settings beyond avatar URL.

## Open Questions

- Should a future profile page include editable display name and email?
- Should a future media storage task migrate stored URL strings to managed assets?
