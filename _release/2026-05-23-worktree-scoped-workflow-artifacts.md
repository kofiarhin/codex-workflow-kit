# Release Notes: Worktree-Scoped Workflow Artifacts

## Request

Support long-lived git worktrees without workflow artifact merge conflicts.

## User-Facing Changes

- Documented branch/worktree-scoped workflow artifacts under `_workflow/runs/<run-id>/`.
- Added bare repo plus worktree setup commands.
- Added conflict recovery guidance for `_workflow` merges.
- Documented `CODEX_WORKFLOW_RUN_ID` override behavior.

## Developer Changes

- Updated `RUN_WORKFLOW.md`, README, AGENTS, prompt docs, templates, and installer support.
- Added `_workflow/index.md` and `_workflow/runs/README.md` with matching templates.
- Installer now copies `_workflow` guidance instead of legacy shared active-state files.

## New Routes/APIs

none

## New Env Vars

- `CODEX_WORKFLOW_RUN_ID` documented as an optional workflow run-id override.

## Database/Schema Changes

none

## Dependencies Added/Removed

none

## Test Commands Run

- `rg "_workflow/runs|CODEX_WORKFLOW_RUN_ID|git branch --show-current|git worktree add|release-notes.md|verification.md" README.md RUN_WORKFLOW.md templates/RUN_WORKFLOW.md`
- `rg "_workflow/runs/dev|_workflow/runs/redesign|_workflow/runs/<run-id>|spec.md|tasks.md|progress.md|review.md|verification.md|summary.md|handoff.md|release-notes.md" README.md RUN_WORKFLOW.md _workflow/runs/README.md templates/_workflow/runs/README.md`
- `bash -n scripts/install.sh`
- `git diff --check`
- `git diff --stat`
- `git diff`
- `git status --short`

## Known Limitations

Legacy workflow artifact folders remain as historical compatibility files.

## Follow-Up Work

Consider a future cleanup release that removes legacy active-state templates after migration.

## Suggested Commit Message

`docs: scope workflow artifacts by worktree run id`
