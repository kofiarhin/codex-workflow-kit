# Release Notes: Worktree-Safe Workflow Model Completion

## Request
Audit and complete the worktree-safe workflow model in codex-workflow-kit.

## User-Facing Changes
- Active workflow request state is now documented at `_workflow/runs/<run-id>/request.md`.
- Root `WORK_REQUEST.md` is compatibility/manual only.
- README now shows `main`, `dev`, and `redesign` worktree run folders and explicit merge safety rules.

## Developer Changes
- RUN_WORKFLOW and AGENTS now use `<artifact-root>/request.md` for active request state.
- Added parallel templates for claims, locks, and agent status.
- Installer now copies `_workflow/index.md`, `_workflow/runs/README.md`, and parallel templates.
- Prompt docs and workflow guidance were aligned with the run-scoped model.

## New Routes/APIs
none

## New Env Vars
none

## Database/Schema Changes
none

## Dependencies Added/Removed
none

## Test Commands Run
- Template existence checks with `Test-Path`.
- Required field checks with `rg`.
- Stale request-state checks with `rg`.
- `bash -n scripts/install.sh`.
- `git diff --check`.
- `git diff --stat`.
- Scoped `git diff`.
- `git status --short`.
- `git status --short client server`.

## Known Limitations
Legacy folders and root `WORK_REQUEST.md` remain for compatibility.

## Follow-Up Work
None required.

## Suggested Commit Message
`docs: make workflow request state run-scoped`
