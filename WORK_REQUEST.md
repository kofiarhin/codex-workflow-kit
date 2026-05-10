# Work Request

This file is auto-managed by the workflow. It stores the latest active work request, usually copied from the user's direct Codex prompt.

Users do not need to edit this file manually. You may edit it when you want to stage a request before asking the agent to run the workflow.

The workflow will ask clarifying questions, generate a saved spec in `_spec/`, create a vertical task plan in `_task/`, execute tasks one by one, update `_progress/progress.md`, write a workflow review in `_review/`, and write a final summary in `_summary/`.

## Request

Add workflow handoff support.

Goal:
Create a `_handoff/` workflow memory folder so the agent can stop and resume work cleanly with `continue workflow`.

Do not modify app implementation code.
Update workflow templates/docs only.

Create/update:
- `_handoff/`
- `_handoff/current.md`
- `templates/_handoff/`
- `templates/_handoff/current.md`
- `AGENTS.md`
- `RUN_WORKFLOW.md`
- `README.md`
- `templates/AGENTS.md`
- `templates/RUN_WORKFLOW.md`
- `templates/_progress/progress.md`
- `templates/_summary/README.md`
- `scripts/install.sh`

Requirements:

1. `_handoff/current.md`

Create a handoff template with:

- Current request
- Request ID
- Current phase
- Current spec file
- Current task plan file
- Current review file
- Current summary file
- Last completed task
- Current task
- Next task
- Blockers
- Verification status
- Workflow health status
- Suggested next prompt
- Notes for continuation

2. `RUN_WORKFLOW.md`

Update the workflow so:
- Before planning, read `_handoff/current.md` if it exists.
- Before touching code, read `_handoff/current.md`.
- After each task, update `_handoff/current.md`.
- After summary, update `_handoff/current.md`.
- `continue workflow` must use `_handoff/current.md` as the primary resume source.
- If `_handoff/current.md` conflicts with `_progress/progress.md`, trust `_progress/progress.md` for completed task history and update handoff accordingly.
- If no handoff exists, create it.

3. `AGENTS.md`

Add rules:
- Always keep `_handoff/current.md` current.
- Do not leave handoff stale after task execution.
- The handoff file should allow another agent/session to resume without rereading the entire conversation.
- `continue workflow` must start from `_handoff/current.md`.

4. Progress and Summary

Update docs so:
- `_progress/progress.md` is append-only task history.
- `_summary/` is completed workflow history.
- `_handoff/current.md` is the live resume state.

5. Installer

Update `scripts/install.sh` so it copies:
- `templates/_handoff/current.md` to `_handoff/current.md`

6. README

Add a section called `Handoff / Resume`.

Explain:
- `_handoff/current.md` stores live workflow state
- use `continue workflow` to resume
- handoff is updated after each task
- progress is history, handoff is current state, summary is completed work

Do not add scope budget.
Do not add max-file limits.
Do not change app code.

After changes:
1. summarize updated files
2. explain the handoff flow in 8 lines
3. show how to test `continue workflow`
4. show the expected `_handoff/current.md` fields
5. suggest commit message
6. stop

## Question Preference

Choose one:

- `ask questions`: default. Ask focused questions until about 90% understanding before writing the spec.
- `skip questions`: do not ask questions; generate a best-effort spec and record assumptions.

Default: `ask questions`

## Optional Execution Preference

Choose one:

- `plan-only`: ask questions, write spec, write task plan, then stop.
- `single-task`: ask questions, write spec, write task plan, execute only the first ready task, verify, update progress, write review, write summary, then stop.
- `full-auto`: ask questions, write spec, write task plan, execute tasks sequentially until complete, blocked, risky, unclear, or unverified.

Default: `full-auto`

## Optional Context

- Latest direct prompt from user: `Add workflow handoff support. Goal: Create a _handoff/ workflow memory folder so the agent can stop and resume work cleanly with continue workflow. Do not modify app implementation code. Update workflow templates/docs only.`

## Out Of Scope

- App implementation code changes.
- Scope budget.
- Max-file limits.
- Deployment changes.
