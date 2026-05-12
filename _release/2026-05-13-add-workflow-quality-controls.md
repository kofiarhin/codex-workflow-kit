# Release Notes: Add Workflow Quality Controls

## Request

Update the reusable workflow with final diff audit, dirty worktree protection, acceptance checklist results, failure recovery protocol, and release notes artifacts.

## User-Facing Changes

No application user-facing changes. This release changes the workflow documentation and installable workflow templates used by agents and maintainers.

## Developer Changes

- Added final diff audit requirements using `git diff --stat` and `git diff`.
- Added dirty worktree protection before implementation.
- Added explicit acceptance checklist results to task plans and progress.
- Added a fixed failure recovery protocol for failed verification.
- Added `_release/` release notes artifacts and template support.
- Updated installer to copy `templates/_release/README.md` to `_release/README.md`.
- Expanded workflow health checks and final artifact checklist.

## New Routes/APIs

none

## New Env Vars

none

## Database/Schema Changes

none

## Dependencies Added/Removed

none

## Test Commands Run

- `rg "final diff audit|dirty worktree|acceptance result|failure recovery|_release" AGENTS.md RUN_WORKFLOW.md WORK_REQUEST.md README.md`
- `rg "final diff audit|dirty worktree|acceptance result|failure recovery|_release" templates/AGENTS.md templates/RUN_WORKFLOW.md templates/WORK_REQUEST.md templates/_progress/progress.md templates/_summary/README.md templates/_task/README.md templates/_review/README.md templates/_handoff/current.md templates/_release/README.md`
- `rg "templates/_release/README.md|_release/README.md|_release/" scripts/install.sh`
- `bash -n scripts/install.sh`
- `git diff --check`
- `git diff --stat`
- `git diff`
- `git status --short`

## Known Limitations

- `git diff` does not include untracked files, so the workflow also uses `git status --short` during final audit to account for newly created artifacts.

## Follow-Up Work

none

## Suggested Commit Message

`docs: add workflow quality-control gates`
