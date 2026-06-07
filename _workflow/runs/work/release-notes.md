# Release Notes: Implement Fallow Quality Layer

## Fallow Quality Release

- Request: Implement Fallow as a reusable workflow quality layer.
- User-facing changes: Workflow now includes a mandatory Fallow Quality gate after review and before handoff/release/health.
- Developer changes: Official Fallow skill files are stored locally; installer copies the layer; docs and templates include command rules, report format, and health checks.
- New routes/APIs: none.
- New env vars: none.
- Database/schema changes: none.
- Dependencies added/removed: none.
- Test commands run: `npm test`; `npm run build`; `npm run test:workflow-routing`; `npm run lint` (missing script); `npm run typecheck` (missing script); Fallow primary/fallback commands.
- Known limitations: Fallow primary `audit` needs an explicit base branch in this checkout; fallback was used. Non-blocking Fallow findings remain documented.
- Follow-up work: dedicated cleanup workflow for unused candidates and complexity hotspots.
- Fallow verdict: PARTIAL.
- Suggested commit message: `feat: add fallow quality workflow layer`
---

# Release Notes: Project Brain Memory

## Request
Add Project Brain memory to `codex-workflow-kit`.

## User-Facing Changes
- Agents now maintain project and run memory automatically while users remain in CLI chat.
- Compact Activity blocks combine stage, memory, artifact, checkpoint, and next action.
- Checkpoints are saved at intake, spec, task planning, task completion, conflict resolution, and workflow completion.

## Developer Changes
- Added versioned project/run JSON templates, Markdown projection/activity/checkpoint templates, category governance, history, and conflict schemas.
- Added mandatory initialization, context injection, extraction, reconciliation, and non-destructive update rules to workflow and agent guides.
- Added installer mappings with default preservation and intentional `--force` replacement.
- Added `npm run test:project-brain` with temp-install smoke coverage.

## New Routes/APIs
none

## New Env Vars
none

## Database/Schema Changes
- Local workflow JSON schemas version `1.0.0`; no application database change.

## Dependencies Added/Removed
none

## Test Commands Run
- `npm run test:project-brain`
- `npm run test:workflow-routing`
- `bash -n scripts/install.sh`
- `npm test`
- live JSON parse check
- `git diff --check`

## Known Limitations
- Memory mutation remains agent-driven workflow behavior rather than an atomic runtime service.

## Follow-Up Work
- Optional future helper for atomic JSON writes/locks if executable concurrent mutation is introduced.

## Suggested Commit Message
`feat: add Project Brain workflow memory`
