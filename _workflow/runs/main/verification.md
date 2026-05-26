# Verification: polish-ui Workflow

## Request
Add a reusable `polish-ui` workflow path while preserving the default workflow and existing conditional frontend skill routing.

## Commands Run

- `node scripts/validate-frontend-skill-routing.js`
  - Red 1: failed with `RUN_WORKFLOW.md must document the polish-ui workflow path`.
  - Red 2: failed with `AGENTS.md must document the polish-ui screenshot fallback`.
  - Final result: passed.
- `npm run test:workflow-routing`
  - Result: passed.
- Targeted `rg` checks for `polish-ui`, `.workflow/artifacts/polish-ui/`, `.skills/design-taste-frontend/SKILL.md`, `Applied skill: design-taste-frontend`, screenshot fallback, and no new taste skill.
  - Result: passed.
- `Get-ChildItem .workflow/artifacts/polish-ui -Recurse -File`
  - Result: required scaffold files exist, including `before/.gitkeep` and `after/.gitkeep`.
- Helper import check with `node -e`
  - Result: passed.
- `npm test`
  - Result: passed. Client: 7 tests passed. Server: 14 tests passed. React Router future-flag warnings were emitted by existing client tests.
- `npm run build`
  - Result: passed.
- `git diff --check`
  - Result: passed with line-ending warnings only.
- `git diff --stat`
  - Result: ran.
- `git diff`
  - Result: ran.
- `git status --short`
  - Result: ran.

## Acceptance Verification

- [x] `polish ui` and equivalent prompts classify as `polish-ui`.
- [x] Backend-only tasks do not classify as `polish-ui`.
- [x] Frontend generation tasks still use existing conditional frontend taste routing and are not swallowed by `polish-ui`.
- [x] `polish-ui` reuses `.skills/design-taste-frontend/SKILL.md`.
- [x] No `.skills/polish-ui` or `.skills/polish-ui/SKILL.md` exists.
- [x] `.workflow/artifacts/polish-ui/` scaffold exists.
- [x] Default workflow preservation is documented.
- [x] Screenshot fallback is documented.

## Final Status
Passed.
