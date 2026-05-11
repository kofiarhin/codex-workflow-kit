# Work Request

This file is auto-managed by the workflow. It stores the latest active work request, usually copied from the user's direct Codex prompt.

Users do not need to edit this file manually. You may edit it when you want to stage a request before asking the agent to run the workflow.

The workflow will ask clarifying questions, generate a saved spec in `_spec/`, create a vertical task plan in `_task/`, execute tasks one by one until the request is complete or stopped, update `_progress/progress.md` and `_handoff/current.md` after each task, write a workflow review in `_review/`, and write a final summary in `_summary/`.

## Request

Update the workflow execution model so the default behavior is `complete-workflow` instead of `single-task`.

The workflow should:

- Ask clarifying questions first.
- Generate a detailed spec in `_spec/`.
- Generate a full vertical task plan in `_task/`.
- Execute every task in order by default.
- Verify each task.
- Review each task.
- Update `_progress/progress.md` and `_handoff/current.md` after each task.
- Stop only when all tasks are `Done`, `Blocked`, `Needs Human Review`, risky, unclear, or verification fails.
- Create final `_review/`, `_summary/`, workflow health check, and final artifact checklist after the full request is complete or stopped.

Update workflow templates/docs only. Do not modify app implementation code.

Files to update:

- `AGENTS.md`
- `RUN_WORKFLOW.md`
- `WORK_REQUEST.md`
- `README.md`
- `templates/AGENTS.md`
- `templates/RUN_WORKFLOW.md`
- `templates/WORK_REQUEST.md`
- `templates/_handoff/current.md`
- `templates/_progress/progress.md`
- `templates/_task/README.md`
- `templates/_summary/README.md`

## Question Preference

Choose one:

- `ask questions`: default. Ask focused questions until about 90% understanding before writing the spec.
- `skip questions`: do not ask questions; generate a best-effort spec and record assumptions.

Default: `ask questions`

## Optional Execution Preference

Choose one:

- `plan-only`: ask questions, write spec, write task plan, then stop.
- `single-task`: ask questions, write spec, write task plan, execute only the next ready task, verify and review it, update artifacts, then stop.
- `complete-workflow`: ask questions, write spec, write task plan, then execute all generated tasks sequentially until the request/spec is complete or a stop condition is reached.

Selected: `complete-workflow`

Default: `complete-workflow`

## Optional Context

- Latest direct prompt from user: update workflow execution model from default single-task execution to default complete-workflow execution.
- Clarification handling: The request names the exact files, required behavior, verification expectations, and out-of-scope boundary. No blocking clarifying question is needed; assumptions are recorded in the saved spec.
- Verification expectations: confirm root and template workflow files mention `complete-workflow`; confirm `single-task` remains documented as an explicit optional mode; confirm no app implementation files changed; run syntax/check command if applicable.

## Out Of Scope

- App implementation code.
- Deployment changes.
- Removing existing workflow artifact folders.
- Removing `single-task` support.
