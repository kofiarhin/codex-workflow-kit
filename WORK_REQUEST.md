# Work Request

This file is auto-managed by the workflow. It stores the latest active work request, usually copied from the user's direct Codex prompt.

Users do not need to edit this file manually. You may edit it when you want to stage a request before asking the agent to run the workflow.

The workflow will ask clarifying questions, generate a saved spec in `_spec/`, create a vertical task plan in `_task/`, execute tasks one by one, update `_progress/progress.md`, write a workflow review in `_review/`, and write a final summary in `_summary/`.

## Request

Add workflow audit improvements.

Goal:
Improve the workflow without adding scope budget restrictions.

Add:
1. `_review/` folder
2. final artifact checklist
3. stricter task status transitions
4. `_decisions/` folder
5. continue workflow command
6. workflow health check

Do NOT add scope budget.
Do NOT modify app implementation code.
Update workflow templates/docs only.

Create/update:
- `_review/`
- `_decisions/`
- `templates/_review/`
- `templates/_decisions/`
- `AGENTS.md`
- `RUN_WORKFLOW.md`
- `README.md`
- `templates/AGENTS.md`
- `templates/RUN_WORKFLOW.md`
- `templates/README` if it exists
- `templates/_task/README.md`
- `templates/_summary/README.md`
- `templates/_progress/progress.md`
- `scripts/install.sh`

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

- Review files must include request, spec file used, task plan used, tasks reviewed, bugs found, scope creep check, missing tests, security concerns, architecture concerns, follow-up tasks, and final review verdict.
- Every final response must include exact paths for work request, spec, task plan, progress, review, summary, and decisions or `none`.
- If any artifact is missing, workflow health must be failed.
- Task statuses must move through `Planned -> Ready -> In Progress -> Verified -> Reviewed -> Done`.
- Terminal task states are `Done`, `Blocked`, and `Needs Human Review`.
- A task cannot be `Done` unless verified and reviewed.
- A task cannot move to `Reviewed` unless verification was attempted.
- If verification cannot run, task can be `Needs Human Review`, not `Done`.
- Decision files are for meaningful architecture/product decisions only, not routine edits.
- `continue workflow` resumes from the next task that is not `Done` using existing progress, latest summary, and latest task plan.
- Before final response, run a workflow health check for required artifacts, verification documentation, scope, and decisions.
- Update the installer to copy review and decision folders/templates.
- Update README with review phase, decisions folder, continue command, health check, final artifact checklist, and task status transitions.
- Do not add scope budget, max files touched, max folder limits, or app implementation changes.

## Out Of Scope

- Scope budget restrictions.
- Max file or max folder limits.
- Application implementation code.
- Deployment behavior changes.
