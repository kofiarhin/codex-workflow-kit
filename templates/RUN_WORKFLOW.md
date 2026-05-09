# Run Workflow

This is the master orchestration prompt for a reusable AI engineering workflow. It turns either the latest direct user prompt or `WORK_REQUEST.md` into scoped, verified engineering work.

## Command To Agent

Use the latest direct user prompt as the primary request source when it looks like project work. Sync it into `WORK_REQUEST.md`, then execute this workflow exactly. Keep the work lightweight, scoped, and sequential.

Execution mode may be stated in the direct prompt or `WORK_REQUEST.md`. If execution mode is missing, assume `single-task`.

## Pipeline

```txt
direct user prompt or WORK_REQUEST
-> sync WORK_REQUEST
-> classify
-> repo intake
-> generate/update spec
-> generate/update architecture
-> generate tasks
-> execute one task at a time
-> verify
-> critique/fix
-> update ACTIVE_TASK.md
-> update VERIFY.md
-> final summary
```

## 1. Resolve Active Request

Read:

- Latest user prompt in the current conversation
- `WORK_REQUEST.md`
- `AGENTS.md`
- `docs/PROJECT_CONTEXT.md`
- `docs/SPEC.md`
- `docs/ARCHITECTURE.md`
- `docs/TASKS.md`
- `docs/ACTIVE_TASK.md`
- `docs/VERIFY.md`

If a file is missing, create it from the workflow template shape before continuing.

Request source rules:

- If the latest user prompt looks like project work, it is the active request.
- Project work includes prompts like `generate mern boilerplate`, `implement login feature`, `fix dashboard bug`, `audit security`, or `refactor auth`.
- If there is no direct project-work prompt, use the request stored in `WORK_REQUEST.md`.
- Do not require the user to manually edit workflow docs before proceeding.

Sync the active request into `WORK_REQUEST.md` before planning. Preserve useful optional context when present, but make the latest active request obvious.

Read execution mode from the direct prompt first, then `WORK_REQUEST.md`:

- `plan-only`: classify request, inspect repo, update docs, generate tasks, then stop.
- `single-task`: generate tasks, implement only the first ready task, verify, critique/fix, update logs, then stop.
- `full-auto`: execute generated tasks sequentially until complete, blocked, risky, unclear, unverified, or outside scope.

If execution mode is missing or empty, use `single-task`. Treat unknown execution modes as unclear scope and stop for clarification.

## 2. Classify Request

Classify the request as one primary type:

- `feature`: Adds user-facing or system behavior.
- `bugfix`: Fixes broken behavior.
- `boilerplate`: Creates project structure or starter configuration.
- `security`: Audits or improves security.
- `refactor`: Improves structure without intentional behavior change.
- `test`: Adds or repairs tests.
- `docs`: Updates documentation only.
- `ops`: Changes deployment, CI, environment, or infrastructure.
- `research`: Investigates and reports without implementation.

Also identify:

- Scope: `small`, `medium`, or `large`.
- Risk: `low`, `medium`, or `high`.
- Whether implementation is allowed now.
- Whether clarification is required.

Stop if the request is too broad, unsafe, destructive, or unclear.

## 3. Repo Intake

Inspect the repository before planning changes.

Required intake:

- Check `git status --short`.
- Identify package manager and major languages/frameworks.
- Identify test, lint, build, and typecheck commands from package/config files.
- Identify existing architecture conventions.
- Identify likely files affected by the request.
- Note constraints, missing tooling, and unknowns.

Update `docs/PROJECT_CONTEXT.md` with durable findings. Do not turn temporary observations into permanent rules unless they are clear from the repo.

## 4. Generate Or Update Docs

Before implementation, generate or update workflow docs automatically. The user should not need to manually edit `SPEC.md`, `ARCHITECTURE.md`, or `TASKS.md` before execution.

- `docs/SPEC.md`: Generate or refine product requirements implied by the active request and repo context.
- `docs/ARCHITECTURE.md`: Generate or refine architecture notes if the request affects structure, data flow, APIs, state, security, or deployment.
- `docs/DECISIONS.md`: Add an ADR only for meaningful architecture or dependency decisions.
- `docs/VERIFY.md`: Prepare to append verification results for executed tasks.

Do not over-document routine edits.

## 5. Generate Tasks

Update `docs/TASKS.md` with scoped tasks. Each generated task must include:

- Task ID.
- Status.
- Request type.
- Objective.
- Files likely affected.
- Checklist.
- Acceptance criteria.
- Verification commands.
- Stop condition.

Tasks must be sequential and independently reviewable. If multiple safe tasks are required, execute them one by one only when the selected execution mode allows it. Stop before the next task if the current task is blocked, unverified, risky, or outside the request scope.

Execution mode rules:

- In `plan-only`, stop after updating `docs/TASKS.md`. Do not edit implementation files and do not execute tasks.
- In `single-task`, execute only the first `Ready` task. If no task is `Ready`, prepare the safest next task and stop.
- In `full-auto`, execute sequential `Ready` tasks until all generated tasks are complete or a stop condition is reached.

## 6. Execute One Task At A Time

For each task allowed by the selected execution mode:

1. Move the task into `docs/ACTIVE_TASK.md`.
2. Mark status as `In progress`.
3. Check `git status --short`.
4. Inspect only relevant files.
5. Make the smallest coherent change.
6. Record files touched in `docs/ACTIVE_TASK.md`.
7. Run verification commands or record why they could not run.
8. Update `docs/VERIFY.md`.
9. Critique the result.
10. Fix defects that are within the task scope.
11. Re-run relevant verification if fixes were made.
12. Mark `docs/ACTIVE_TASK.md` as `Done`, `Blocked`, or `Needs review`.

Never continue to another task unless the current task is done, verified, critiqued, and logged. Do not start the next task if the current task is blocked, risky, unclear, unverified, outside scope, or has unresolved in-scope defects.

Mode-specific stopping:

- `plan-only`: stop before this section.
- `single-task`: stop after one task is done, verified, critiqued/fixed, and logged.
- `full-auto`: continue only through sequential `Ready` tasks while each previous task satisfies the continuation rule above.

## 7. Verify

Verification should match the task risk.

Use available commands such as:

```bash
npm test
npm run lint
npm run build
npm run typecheck
```

For split apps, use project-specific commands such as:

```bash
cd client && npm test
cd client && npm run build
cd server && npm test
```

If commands are missing or cannot run, document the reason and provide the best manual verification available.

## 8. Critique And Fix

Review the task result before finalizing.

Check for:

- Scope creep.
- Broken acceptance criteria.
- Security regressions.
- Missing error states.
- Test gaps.
- Over-complex implementation.
- Inconsistent project conventions.

Fix only defects within the active task. Create follow-up tasks for anything larger.

## 9. Final Summary

End with:

- Execution mode.
- Request classification.
- Tasks created or updated.
- Tasks completed.
- Files changed.
- Verification commands and results.
- Known blockers or unresolved issues.
- Recommended next step.
- Suggested commit message.

Do not claim a commit was made unless the user explicitly asked for a commit and it was actually created.
