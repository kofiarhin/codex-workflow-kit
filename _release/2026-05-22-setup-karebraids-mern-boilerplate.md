# Release Notes: Setup KareBraids MERN Boilerplate

## Request

Set up the existing `client/` and `server/` folders as a KareBraids MERN boilerplate.

## User-Facing Changes

- Rebranded the starter UI to KareBraids.
- Added a `/services` page with a braid service catalog, create/edit/delete controls, loading, empty, and error states.
- Updated dashboard copy and navigation for the KareBraids starter concept.

## Developer Changes

- Added `BraidService` Mongoose model, controller, routes, and tests.
- Added frontend braid service API service and TanStack Query hooks.
- Updated env examples and boilerplate docs for optional local MongoDB startup.
- Updated project context with the new domain and database conventions.

## New Routes/APIs

- Backend: `GET /api/braid-services`
- Backend: `POST /api/braid-services`
- Backend: `PATCH /api/braid-services/:id`
- Backend: `DELETE /api/braid-services/:id`
- Frontend: `/services`

## New Env Vars

none

## Database/Schema Changes

- Added `BraidService` model with `name`, `description`, `durationMinutes`, `priceDollars`, and `isActive`.

## Dependencies Added/Removed

none

## Test Commands Run

- `npm run test --workspace server`
- `npm run test --workspace client`
- `npm test`
- `npm run build`
- `git diff --check`
- `git diff --stat`
- `git diff`
- `git status --short`

## Known Limitations

- Braid services CRUD is public starter functionality; production admin authorization is a follow-up.
- No seed command is included.

## Follow-Up Work

- Add auth protection for service mutations if needed.
- Add seed/demo data for first-run local development.

## Suggested Commit Message

`feat: add karebraids mern boilerplate crud`
