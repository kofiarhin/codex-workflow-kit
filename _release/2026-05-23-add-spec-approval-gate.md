# Release Notes: Add Mandatory Spec Approval Gate

## Request

Implement a mandatory user approval gate after spec generation and before task planning.

## User-Facing Changes

- Workflow now stops after saving `_spec/<file>.md`.
- The agent must show the spec path, summary, and exact approval options in chat.
- `_task/` generation is blocked until explicit user approval.
- `continue workflow` resumes at the approval gate when a spec exists without a task plan.

## Developer Changes

- Updated root and template `RUN_WORKFLOW.md`.
- Updated README, AGENTS, prompt docs, spec/task folder docs, work request template, and handoff template.
- Added health-check rules for skipped approval gates.

## New Routes/APIs

none

## New Env Vars

none

## Database/Schema Changes

none

## Dependencies Added/Removed

none

## Test Commands Run

- `rg` approval-gate and stale wording checks.
- `git diff --check`
- `git status --short client server`

## Known Limitations

Existing historical workflow artifacts still reflect the workflow version active when they were created.

## Follow-Up Work

none

## Suggested Commit Message

`docs: require spec approval before task planning`
