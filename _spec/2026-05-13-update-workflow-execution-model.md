# Update Workflow Execution Model Spec

## Request Summary

Change the workflow kit default execution behavior from `single-task` to `complete-workflow`, while keeping `plan-only` and explicit `single-task` modes available.

## Date

2026-05-13

## Source Prompt

User requested workflow docs/templates only updates so generated tasks execute sequentially by default until the full request/spec is completed or a stop condition is reached. Required files are `AGENTS.md`, `RUN_WORKFLOW.md`, `WORK_REQUEST.md`, `README.md`, `templates/AGENTS.md`, `templates/RUN_WORKFLOW.md`, `templates/WORK_REQUEST.md`, `templates/_handoff/current.md`, `templates/_progress/progress.md`, `templates/_task/README.md`, and `templates/_summary/README.md`.

## Questions Asked And Answers Received

- No blocking clarifying questions were asked. The prompt provided exact files, execution modes, stop conditions, verification requirements, and output requirements.

## Assumptions

- This is a documentation and workflow-template change only.
- Workflow memory artifacts for this run may be updated as required by the workflow.
- `complete-workflow` replaces `full-auto`; if old references to `full-auto` exist in touched files, they should be replaced or clarified as the new mode.
- Historical progress and summary entries do not need rewriting unless they are part of the active workflow run.

## Goal

Make `complete-workflow` the documented default execution mode throughout the root workflow docs and templates so agents do not stop after `TASK-001` unless explicitly asked or stopped by a documented condition.

## Non-Goals

- Do not change app implementation code.
- Do not remove support for `single-task`.
- Do not remove `_spec`, `_task`, `_progress`, `_review`, `_summary`, `_handoff`, `_decisions`, the health check, or the artifact checklist.
- Do not change deployment setup.

## Users

- AI coding agents using this workflow kit.
- Developers installing or reading the workflow kit.
- Future sessions resuming workflows through `_handoff/current.md`.

## Functional Requirements

- Define execution modes:
  - `plan-only`: ask questions, write spec, write task plan, then stop.
  - `single-task`: execute only the next ready task, verify/review it, update artifacts, then stop.
  - `complete-workflow`: execute all generated tasks sequentially until the request/spec is complete or a stop condition is reached.
- Set default execution preference to `complete-workflow`.
- Update `RUN_WORKFLOW.md` with complete-workflow default rules, task lifecycle continuation rules, stop conditions, summary timing, and health status meanings.
- Update `AGENTS.md` so agents must not stop after `TASK-001` unless mode is explicitly `single-task` or a stop condition is reached.
- Update `WORK_REQUEST.md` optional execution preference text and default.
- Update `continue workflow` behavior so it continues remaining tasks sequentially until completion or stop condition.
- Update `README.md` to explain the new default and show a multi-task example.
- Update all listed templates consistently.
- Keep `single-task` documented as an explicit optional mode.

## UI Expectations

None. This is documentation-only.

## API Expectations

None.

## Data Model Expectations

None.

## Edge Cases

- If a task is `Blocked`, `Needs Human Review`, fails verification, becomes risky, becomes unclear, or needs external access, the workflow stops and documents the reason.
- If all tasks complete, workflow health is `Passed`.
- If tasks remain because of a documented blocker, workflow health is `Partial`.
- If required artifacts are missing or scope was violated, workflow health is `Failed`.
- `continue workflow` must resume from the next incomplete task and keep going by default.

## Constraints

- Only workflow docs/templates and workflow artifacts may be changed.
- Do not modify app implementation code.
- Use existing workflow folder names and artifact checklist.
- Do not remove backward compatibility for explicit `single-task` mode.

## Success Criteria

- All updated root workflow files mention `complete-workflow`.
- All updated template workflow files mention `complete-workflow`.
- `single-task` remains documented as an explicit optional mode.
- No app implementation files are modified.
- Applicable syntax/check command passes.
- Review and summary artifacts represent the full request, not only the first task.

## Out-Of-Scope Items

- Refactoring app source files.
- Changing package scripts or dependencies.
- Editing unrelated examples unless verification identifies required consistency gaps.

## Open Questions

- None blocking.
