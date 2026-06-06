# Release Notes (run: work)

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
