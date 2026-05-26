# Release Notes: Conditional Frontend Skill Routing

## Request
Implement conditional frontend skill routing in this repo.

## User-Facing Changes
No application user-facing changes.

## Developer Changes
- Updated root workflow docs and install templates to apply `.skills/design-taste-frontend/SKILL.md` only for frontend UI code generation, JSX/TSX markup, CSS/Tailwind styling, UI redesign, or UI polish.
- Added explicit exclusions for backend-only, API-only, database-only, auth-only, test-only, and docs-only tasks.
- Added mixed frontend/backend guidance so the skill applies only to frontend UI work.
- Added the exact required record line: `Applied skill: design-taste-frontend`.
- Added `scripts/validate-frontend-skill-routing.js`.
- Added `npm run test:workflow-routing`.

## New Routes/APIs
none

## New Env Vars
none

## Database/Schema Changes
none

## Dependencies Added/Removed
none

## Test Commands Run
- `node scripts/validate-frontend-skill-routing.js`
- `npm run test:workflow-routing`
- Targeted stale wording `rg`
- Targeted required routing `rg`
- `npm test`
- `git diff --check`
- `git diff --stat`
- `git diff`
- `git status --short`

## Known Limitations
The validation script is intentionally small and checks the required examples plus required doc contract terms; it is not a general natural-language classifier.

## Follow-Up Work
none

## Suggested Commit Message
`feat: add conditional frontend taste skill routing`
