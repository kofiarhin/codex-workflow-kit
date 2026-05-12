# Release Notes: Add 3-Pass Task Hardening Loop

## Request

Update the reusable workflow kit to require a 3-pass task hardening loop for every executable task.

## User-Facing Changes

Users of the workflow kit now see task execution described as Build -> Refine -> Polish instead of a single execute/verify/review pass.

## Developer Changes

- Updated root workflow docs and template workflow docs.
- Added reusable hardening-loop prompts.
- Updated task, progress, handoff, review, summary, and release memory templates for iteration evidence.
- Updated README usage and health-check guidance.

## Iteration Evidence Summary

- TASK-001 completed Build, Refine, and Polish for core workflow docs.
- TASK-002 completed Build, Refine, and Polish for prompts and workflow memory templates.
- TASK-003 completed Build, Refine, and Polish for README updates and final verification.

## New Routes/APIs

none

## New Env Vars

none

## Database/Schema Changes

none

## Dependencies Added/Removed

none

## Test Commands Run

- `rg "verify and review each task|verify each task|critique/fix and review each task|execute only the next ready task, verify|Stop after the next ready task is verified" ...`
- `rg "Build -> Refine -> Polish|3-pass|Iteration evidence|Current Iteration|Iteration plan" ...`
- `git diff --no-index -- docs/PROMPTS.md templates/docs/PROMPTS.md`
- `npm test`
- `git diff --check`
- `git diff --stat`
- `git diff`

## Known Limitations

Historical workflow artifacts were not retroactively rewritten beyond the active files requested.

## Follow-Up Work

none

## Suggested Commit Message

`docs: require three-pass task hardening loop`
