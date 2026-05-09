# Add Profile Avatar URL Review

## Request

Add profile avatar upload behavior using URL strings only, create profile/settings UI if needed, show the avatar in the header user area, and stop after single-task execution.

## Spec File Used

`_spec/2026-05-11-add-profile-avatar-url.md`

## Task Plan Used

`_task/2026-05-11-add-profile-avatar-url.md`

## Tasks Reviewed

- `TASK-001: Save avatar URL and show it in the header`

## Bugs Found

- Found and fixed: `AvatarPreview` stayed on initials after one image load failure even when the user entered a new URL. Added a `useEffect` reset on `src` changes.

## Scope Creep Check

- Scope respected. The implementation stores URL strings only and does not add binary uploads, local storage, S3, Cloudinary, cropping, or editable name/email fields.

## Missing Tests

- No browser-level visual test was added. Coverage includes backend profile update behavior, public response safety, header avatar rendering, and client avatar URL validation.

## Security Concerns

- `passwordHash` remains excluded from public JSON responses.
- Server accepts only `http` and `https` avatar URLs with JPG, JPEG, PNG, or WebP path extensions.
- The avatar URL is still user-provided remote content; future media proxying or managed storage would improve privacy and reliability.

## Architecture Concerns

- Current Redux auth session is not persisted across refreshes, matching existing app behavior. The profile page refreshes session metadata from `/api/auth/me` when visited.
- Header avatar display depends on current client session metadata after login/profile update.

## Follow-Up Tasks

- `TASK-002` remains planned and unexecuted because the user requested single-task execution.
- Future task: add managed image uploads/storage if requested.

## Final Review Verdict

Passed. TASK-001 was implemented, verified, reviewed, and kept within scope.
