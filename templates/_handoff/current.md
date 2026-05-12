# Current Workflow Handoff

This file is the live resume state for the active workflow. Keep it current after each task and after the final summary. If this file conflicts with `_progress/progress.md`, trust `_progress/progress.md` for completed task history and update this file.

## Current Request

`<CURRENT_REQUEST>`

## Request ID

`<REQUEST_ID>`

## Current Phase

`<Intake / Spec / Planning / Execution / Review / Summary / Complete / Blocked>`

## Execution Mode

`<complete-workflow by default / plan-only / single-task>`

## Current Spec File

`<path or none>`

## Current Task Plan File

`<path or none>`

## Current Review File

`<path or none>`

## Current Release Notes File

`<path or none>`

## Current Summary File

`<path or none>`

## Last Completed Task

`<task id and title, or none>`

## Current Task

`<task id and title, or none>`

## Current Iteration

`<Iteration 1 - Build / Iteration 2 - Refine / Iteration 3 - Polish / none>`

## Next Task

`<task id and title, review, summary, health check, or none>`

## Dirty Worktree Status

`<git status --short result, existing dirty files, planned files, overlap risk>`

## Acceptance Status

`<not started / all required criteria met / partial / blocked>`

## Iteration Evidence Status

`<per-task Build / Refine / Polish evidence status and any missing evidence>`

## Blockers

`<none or details>`

## Verification Status

`<not run / passed / failed / blocked / partial, with command summary>`

## Workflow Health Status

`<Pending / Passed / Partial / Failed>`

## Suggested Next Prompt

`continue workflow`

## Notes For Continuation

- Default execution mode is `complete-workflow`.
- If the next task is not `Done`, continue executing remaining tasks sequentially until all tasks are complete or a stop condition is reached.
- Use `single-task` only when the user explicitly requested one-task execution.
- Resume from the current task and current iteration.
- Every executable task must complete Build -> Refine -> Polish with documented goal, changes made, verification command/result, review findings, acceptance status, remaining issues, and next action before `Done`.
- Preserve dirty worktree protection: stop before editing if dirty files overlap with planned files.
- Preserve acceptance results: no task is `Done` unless every required criterion is checked `[x]`.
- If verification fails, follow the failure recovery protocol inside the current iteration and record the result in progress, review, and summary.
- Before final review and summary, run or document the final diff audit.
- Completed workflows must include `_release/<request-id>.md`.
- `<what the next agent/session needs to know>`
