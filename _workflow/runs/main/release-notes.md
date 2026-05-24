# Release Notes: Fix Missing Parallel Template Files

## Request
Fix the missing parallel template file issue in codex-workflow-kit.

## User-Facing Changes
- Added complete parallel coordination source templates under `templates/_workflow/runs/parallel/`.
- Clarified source and installed parallel template paths in README and workflow docs.

## Developer Changes
- Added `Notes` fields to `claims.md`, `locks.md`, and `agent-status.md`.
- Confirmed `scripts/install.sh` already installs all three templates.
- Updated root/template workflow docs so parallel templates are described consistently.

## New Routes/APIs
none

## New Env Vars
none

## Database/Schema Changes
none

## Dependencies Added/Removed
none

## Test Commands Run
- `Test-Path` template existence checks
- `rg` required field checks
- `rg` installer copy checks
- `bash -n scripts/install.sh`
- `rg` docs consistency checks
- `git diff --no-index -- RUN_WORKFLOW.md templates\RUN_WORKFLOW.md`
- `git diff --check`
- `git diff --stat`
- `git diff`
- `git status --short`

## Known Limitations
None for requested scope.

## Follow-Up Work
None required.

## Suggested Commit Message
`docs: add parallel workflow templates`
