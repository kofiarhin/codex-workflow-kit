# Work Request

This file is auto-managed by the workflow. It stores the latest active work request, usually copied from the user's direct Codex prompt.

Users do not need to edit this file manually. You may edit it when you want to stage a request before asking the agent to run the workflow.

The workflow will ask clarifying questions, generate a saved spec in `_spec/`, create a vertical task plan in `_task/`, execute tasks one by one until the request is complete or stopped, update `_progress/progress.md` and `_handoff/current.md` after each task, write a workflow review in `_review/`, create release notes in `_release/`, and write a final summary in `_summary/`.

## Request

Update the reusable workflow with five high-leverage quality-control optimizations:

1. Final diff audit.
2. Dirty worktree protection.
3. Acceptance checklist results.
4. Failure recovery protocol.
5. Release notes artifact.

Update workflow templates/docs only. Do not modify app implementation code.

Files and folders to create or update:

- `AGENTS.md`
- `RUN_WORKFLOW.md`
- `WORK_REQUEST.md`
- `README.md`
- `templates/AGENTS.md`
- `templates/RUN_WORKFLOW.md`
- `templates/WORK_REQUEST.md`
- `templates/_progress/progress.md`
- `templates/_summary/README.md`
- `templates/_task/README.md`
- `templates/_review/README.md`
- `templates/_handoff/current.md`
- `scripts/install.sh`
- `_release/`
- `_release/README.md`
- `templates/_release/`
- `templates/_release/README.md`

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

- Clarification handling: The user provided exact requested optimizations, files, artifact requirements, backward-compatibility constraints, and verification expectations. No blocking clarifying question is needed; assumptions are recorded in the saved spec.
- Dirty worktree check before implementation: `git status --short` returned no existing dirty files.
- Planned workflow files: root workflow docs, template workflow docs, installer script, release README folders, and workflow run artifacts for this request.
- Overlap risk: none detected before edits.
- Verification expectations: confirm root and template workflow files mention final diff audit, dirty worktree protection, acceptance results, failure recovery protocol, and `_release`; confirm installer copies `_release/README.md`; confirm no app implementation files changed; run applicable syntax/check commands.

## Out Of Scope

- App implementation code.
- Removing existing workflow artifact folders.
- Removing `complete-workflow`, `single-task`, `plan-only`, or `continue workflow`.
- Deployment changes.
- New dependencies.
