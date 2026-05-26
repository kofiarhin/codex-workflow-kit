# Release Notes: polish-ui Workflow

## Request
Add a reusable `polish-ui` workflow path.

## User-Facing Changes
- Added documented support for UI polish prompts such as `polish ui`, `redesign ui`, `improve this interface`, `make this screen production-ready`, `visual polish pass`, and `refine this frontend`.
- Added `.workflow/artifacts/polish-ui/` as the reusable artifact structure for polish-specific evidence and workflow outputs.

## Developer Changes
- Extended `scripts/validate-frontend-skill-routing.js` with a minimal `classifyWorkflowPath` helper and `polish-ui` validation.
- Preserved existing conditional frontend taste routing.
- Required `polish-ui` to reuse `.skills/design-taste-frontend/SKILL.md` before and after implementation.

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
- targeted `rg` checks
- `npm test`
- `npm run build`
- `git diff --check`
- `git diff --stat`
- `git diff`
- `git status --short`

## Known Limitations
- Browser screenshots are not forced; the workflow records code-surface review fallback when browser automation is unavailable.

## Follow-up Work
none

## Suggested Commit Message
`feat: add polish-ui workflow path`
