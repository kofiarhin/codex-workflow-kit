# Run Workflow

This is the master orchestration prompt for a reusable AI engineering workflow. It turns either the latest direct user prompt or `WORK_REQUEST.md` into clarified, specified, planned, verified engineering work.

## Command To Agent

Use the latest direct user prompt as the primary request source when it looks like project work. Sync it into `WORK_REQUEST.md`, then execute this workflow exactly.

Before touching code, ask focused clarifying questions until you reach about 90% understanding. If the user explicitly says `skip questions`, generate a best-effort spec and record assumptions.

Do not implement without:

1. A saved spec in `_spec/`.
2. A saved vertical task plan in `_task/`.
3. A current read of `_progress/progress.md`.
4. A current read of the latest relevant `_summary/` entry.

## Pipeline

```txt
direct user prompt or WORK_REQUEST
-> sync WORK_REQUEST
-> questions
-> spec in _spec
-> read _progress and _summary
-> vertical plan in _task
-> execute one task at a time
-> verify
-> critique/fix
-> update _progress
-> final summary in _summary
```

## 1. Resolve Active Request

Read:

- Latest user prompt in the current conversation.
- `WORK_REQUEST.md`.
- `AGENTS.md`.
- `docs/PROJECT_CONTEXT.md`.
- `_progress/progress.md`, creating it if missing.
- The latest relevant file in `_summary/`, if any.

If `_spec/`, `_task/`, `_summary/`, or `_progress/` is missing, create it before continuing. If `_progress/progress.md` is missing, create it with an initial heading.

Request source rules:

- If the latest user prompt looks like project work, it is the active request.
- Project work includes prompts like `generate mern boilerplate`, `implement login feature`, `fix dashboard bug`, `audit security`, or `refactor auth`.
- If there is no direct project-work prompt, use the request stored in `WORK_REQUEST.md`.
- Do not require the user to manually edit workflow docs before proceeding.

Sync the active request into `WORK_REQUEST.md` before questioning and planning. Preserve useful optional context when present, but make the latest active request obvious.

## 2. Intake And Questioning

Do not touch code in this phase.

Ask focused clarifying questions until there is about 90% understanding of the request. Ask fewer questions for tiny, obvious requests. Group questions so the user can answer efficiently.

Clarify:

- Goal.
- Users.
- Exact behavior.
- Edge cases.
- UI expectations.
- API expectations.
- Data model expectations.
- Constraints.
- Success criteria.
- What is out of scope.

If the prompt explicitly says `skip questions`:

- Do not ask questions.
- Generate the best possible spec from available context.
- Record assumptions and open questions in the spec.

Stop questioning when:

- The user has answered enough to proceed.
- The remaining unknowns are minor and can be documented as assumptions.
- The user explicitly says to proceed.

## 3. Classify Request

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
- Whether implementation is allowed after spec and plan.
- Whether any open question blocks implementation.

Stop if the request is too broad, unsafe, destructive, or unclear.

## 4. Repo Intake

Inspect the repository before planning changes.

Required intake:

- Check `git status --short`.
- Identify package manager and major languages/frameworks.
- Identify test, lint, build, and typecheck commands from package/config files.
- Identify existing architecture conventions.
- Identify likely files affected by the request.
- Note constraints, missing tooling, and unknowns.

Update `docs/PROJECT_CONTEXT.md` only with durable findings. Do not turn temporary observations into permanent rules unless they are clear from the repo.

## 5. Spec Phase

Generate a detailed spec from the active request, the answers, and repo context.

Save the spec in `_spec/` using a timestamped or slugged filename:

```txt
_spec/2026-05-10-add-dark-theme.md
```

The spec must include:

- Request summary.
- Date.
- Source prompt.
- Questions asked and answers received.
- Assumptions.
- Goal.
- Non-goals.
- Users.
- Functional requirements.
- UI expectations, when relevant.
- API expectations, when relevant.
- Data model expectations, when relevant.
- Edge cases.
- Constraints.
- Success criteria.
- Out-of-scope items.
- Open questions.

No implementation may happen until this file exists.

## 6. Planning Phase

Before planning, read:

- `_progress/progress.md`.
- The latest relevant `_summary/` entry.
- The saved spec in `_spec/`.
- Relevant durable docs in `docs/`.

Generate a vertical implementation plan from the saved spec.

Save the task breakdown in `_task/` using a timestamped or slugged filename that matches the spec when practical:

```txt
_task/2026-05-10-add-dark-theme.md
```

Tasks must be vertical slices, not vague layers. A vertical task should produce a user-visible or independently verifiable result.

Each task must include:

- Task ID.
- Status.
- Objective.
- Files likely affected.
- Checklist.
- Acceptance criteria.
- Verification commands.
- Stop condition.
- Out-of-scope items.

Use Ralph Wiggum-style task phrasing: small, literal, concrete steps with simple verbs and clear boundaries.

No implementation may happen until this file exists.

## 7. Execution Phase

Execute one task at a time.

For each task:

1. Read latest `_progress/progress.md`.
2. Read the latest relevant `_summary/` entry.
3. Read the saved spec and task plan.
4. Inspect only the relevant codebase area.
5. Implement only the current task.
6. Run verification commands or record why they could not run.
7. Critique the result.
8. Fix only in-scope defects.
9. Re-run relevant verification if fixes were made.
10. Append progress to `_progress/progress.md`.
11. Continue only if safe.

Do not start the next task if the current task is blocked, risky, unclear, unverified, outside scope, or has unresolved in-scope defects.

## 8. Verification

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

If commands are missing or cannot run, document the reason in `_progress/progress.md` and the final `_summary/` entry. Provide the best manual verification available.

## 9. Progress Tracking

Maintain `_progress/progress.md`.

After each task, append:

- Task ID.
- Status.
- Files changed.
- Verification result.
- Blockers.
- Next step.

Do not rewrite previous progress entries except to correct factual errors.

## 10. Summary Phase

After the workflow completes, create or append a summary in `_summary/`.

The summary should include:

- Request.
- Spec file used.
- Task plan used.
- Tasks completed.
- Files changed.
- Verification run.
- Unresolved issues.
- Next recommended work.

Use a timestamped or slugged filename when creating a new summary:

```txt
_summary/2026-05-10-add-dark-theme.md
```

## 11. Critique And Fix

Before finalizing each task, review the result.

Check for:

- Scope creep.
- Broken acceptance criteria.
- Security regressions.
- Missing error states.
- Test gaps.
- Over-complex implementation.
- Inconsistent project conventions.

Fix only defects within the active task. Create follow-up tasks for anything larger.

## 12. Final Response

End with:

- Request classification.
- Spec file used.
- Task plan used.
- Tasks completed.
- Files changed.
- Verification commands and results.
- Progress update location.
- Summary location.
- Known blockers or unresolved issues.
- Recommended next step.
- Suggested commit message.

Do not claim a commit was made unless the user explicitly asked for a commit and it was actually created.
