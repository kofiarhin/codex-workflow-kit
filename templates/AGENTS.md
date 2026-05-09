# Agent Operating Guide

This file defines how AI coding agents should work in this repository. It is intended for OpenAI Codex, Claude Code, Cursor, and similar tools.

Customize placeholders before using this in a production project. MERN is the default example stack, but these rules apply to any stack.

## Project Context

- Project name: `<PROJECT_NAME>`
- Product summary: `<ONE_SENTENCE_PRODUCT_SUMMARY>`
- Primary stack: MERN by default unless changed
  - Frontend: React, Vite, Tailwind CSS
  - Backend: Node.js, Express, MongoDB, Mongoose
  - Testing: Vitest/React Testing Library for frontend, Jest/Supertest for backend
- Deployment: `<DEPLOYMENT_TARGETS>`
- Workflow entrypoints:
  - `WORK_REQUEST.md`
  - `RUN_WORKFLOW.md`
- Main workflow memory:
  - `_spec/`
  - `_task/`
  - `_summary/`
  - `_progress/progress.md`
- Supporting docs:
  - `docs/PROJECT_CONTEXT.md`
  - `docs/ARCHITECTURE.md`
  - `docs/VERIFY.md`
  - `docs/DECISIONS.md`
  - `docs/PROMPTS.md`

## Operating Rules

1. If the latest user prompt looks like project work, treat it as the active work request and route it through `RUN_WORKFLOW.md`.
2. Project work includes requests such as `implement`, `fix`, `create`, `generate`, `audit`, `refactor`, `test`, `document`, `deploy`, `review`, or similar software changes.
3. Automatically sync the active user prompt into `WORK_REQUEST.md`. Do not ask the user to manually edit workflow docs first.
4. Ask focused clarifying questions before implementation unless the prompt explicitly says `skip questions`.
5. Keep asking until there is about 90% understanding of the request.
6. Clarify the goal, users, exact behavior, edge cases, UI/API expectations, data model, constraints, success criteria, and out-of-scope items.
7. If the request is tiny and obvious, ask fewer questions, but still avoid touching code until the spec and task plan exist.
8. Do not touch code during the questioning phase.
9. If the user says `skip questions`, generate a best-effort spec and clearly record assumptions.
10. No implementation is allowed without a saved spec in `_spec/`.
11. No implementation is allowed without a saved task plan in `_task/`.
12. Before planning, read `_progress/progress.md` and the latest relevant file in `_summary/`.
13. Before touching code for any task, read `_progress/progress.md` and the latest relevant file in `_summary/`.
14. Read `RUN_WORKFLOW.md` before planning or editing.
15. Read `docs/PROJECT_CONTEXT.md` and relevant supporting docs before implementation, updating them only when durable project facts change.
16. Generate a timestamped or slugged spec file in `_spec/`, for example `_spec/2026-05-10-add-dark-theme.md`.
17. Generate a vertical task plan in `_task/` from the saved spec.
18. Tasks must be vertical slices of user-visible or independently verifiable value, not vague frontend/backend/database layers.
19. Break work into Ralph Wiggum-style tasks: small, literal, safe, sequential steps that are easy to follow and hard to misinterpret.
20. Implement tasks sequentially, one task at a time.
21. Keep changes scoped to the active task.
22. Never implement unrelated work.
23. Never skip verification. If verification cannot run, document the reason and the best available manual check.
24. After each task, append progress to `_progress/progress.md`.
25. After the workflow completes, create or append a summary in `_summary/`.
26. Continue to the next task only when the current task is implemented, verified, critiqued, documented, and safe to continue.
27. Stop if scope is unclear, risky, destructive, unverified, blocked, or requires unavailable access.

## Required Workflow

For a work request:

1. Use the latest direct user prompt as the active request when it looks like project work; otherwise read `WORK_REQUEST.md`.
2. Sync the active request into `WORK_REQUEST.md`.
3. Read `RUN_WORKFLOW.md`.
4. Ask clarifying questions until there is about 90% understanding, unless the prompt explicitly says `skip questions`.
5. If questions are skipped, write assumptions into the spec.
6. Check repository status:

   ```bash
   git status --short
   ```

7. Read `_progress/progress.md`, the latest relevant `_summary/` entry, and durable supporting docs.
8. Generate a detailed spec in `_spec/`.
9. Generate a vertical task plan in `_task/`.
10. If execution is not allowed yet, stop after saving the spec and task plan.
11. Execute one task at a time.
12. For each task:
    - read latest `_progress/progress.md`
    - read relevant `_summary/`
    - inspect the codebase for the current task
    - implement only the current task
    - verify
    - critique the result
    - fix only in-scope defects
    - append progress to `_progress/progress.md`
    - continue only if safe
13. After all allowed tasks are complete or the workflow stops, create or append a summary in `_summary/`.
14. Check repository status again:

    ```bash
    git status --short
    ```

15. Summarize results and suggest a commit message.

## Questioning Rules

Questions should be focused and grouped. Do not ask a large questionnaire when a short set of questions will reach useful certainty.

Ask about:

- Goal and business/user value.
- Primary users and roles.
- Exact behavior and expected workflow.
- UI, API, data model, and state expectations.
- Edge cases and failure states.
- Constraints, dependencies, and compatibility requirements.
- Success criteria and verification.
- Explicitly out-of-scope work.

Stop questioning when the remaining unknowns are minor enough to document as assumptions, or when the user says to proceed.

## Spec Rules

Each spec in `_spec/` must include:

- Request summary.
- Date.
- Source prompt.
- Questions asked and answers received.
- Assumptions.
- Goal and non-goals.
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

Use timestamped or slugged filenames, such as:

```txt
_spec/2026-05-10-add-dark-theme.md
```

## Task Planning Rules

Each task plan in `_task/` must include:

- Spec file used.
- Planning date.
- Progress and summary files read.
- Task list.

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

Tasks must be vertical slices. Prefer tasks like `TASK-001: Add theme toggle through settings and persist preference` over tasks like `TASK-001: Update frontend`.

## Ralph Wiggum Task Style

Tasks should be small enough that the agent can say exactly what it is doing without interpretation.

Good task shape:

- One concrete outcome.
- One narrow set of files.
- Plain verbs.
- No bundled refactors.
- Clear stop condition.
- Clear verification.

Example:

```md
### TASK-001: Add dark theme toggle in settings

Objective:
Add one visible settings toggle that switches the app between light and dark themes.
```

## Progress Tracking

Maintain `_progress/progress.md`.

After each task, append:

- Task ID.
- Status.
- Files changed.
- Verification result.
- Blockers.
- Next step.

Do not replace previous progress entries.

## Summary Rules

After workflow completion, create or append a summary in `_summary/`.

The summary must include:

- Request.
- Spec file used.
- Tasks completed.
- Files changed.
- Verification run.
- Unresolved issues.
- Next recommended work.

## Implementation Boundaries

Agents must not:

- Touch implementation code before questions, spec, and task plan are complete.
- Implement without a saved spec in `_spec/`.
- Implement without a saved task plan in `_task/`.
- Implement more than one active task at a time.
- Expand scope beyond the request and active task.
- Rewrite large parts of the application without explicit approval.
- Introduce new dependencies unless the active task requires them and the reason is documented.
- Change deployment configuration unless the active task requires it.
- Hard-code secrets, API keys, tokens, credentials, or environment-specific URLs.
- Duplicate server state into client global state.
- Expose sensitive fields such as `passwordHash`, tokens, or private user data.
- Remove tests or weaken validation to make a task pass.
- Create fake application code to satisfy the workflow.
- Run destructive commands such as `git reset --hard`, `git clean -fd`, or force pushes unless explicitly instructed.

## Architecture Guidance

Default MERN structure:

```txt
client/
  src/
    components/
    hooks/
      queries/
      mutations/
    lib/
    pages/
    redux/
    routes/
    services/
    styles/
    utils/
  test/

server/
  config/
  controllers/
  middleware/
  models/
  routes/
  tests/
  utils/
```

Guidelines:

- Prefer existing project conventions over new patterns.
- Keep UI components focused on rendering and interaction.
- Put frontend API calls in service files or query/mutation hooks.
- Use a shared frontend API client when the stack supports it.
- Use a server-state library for fetched data when the project already has one.
- Use global client state only for client-owned state.
- Keep backend route handlers thin; move business logic into services or utilities when it grows.
- Validate input at API boundaries.
- Keep persistence models authoritative for data rules.
- Document meaningful architecture decisions in `docs/DECISIONS.md`.

## Testing Expectations

Use the narrowest validation that proves the active task works, then broaden when risk is higher.

Common commands:

```bash
# Frontend
cd client && npm test
cd client && npm run lint
cd client && npm run build

# Backend
cd server && npm test
cd server && npm run lint

# Full project, if configured
npm test
npm run lint
npm run build
npm run typecheck
```

If tests or scripts are missing:

- State that they are missing.
- Recommend the command that should exist.
- Use available manual verification.
- Record the gap in `_progress/progress.md` and the final `_summary/` entry.

## Git Workflow Guidance

- Check `git status --short` before and after edits.
- Do not overwrite user changes.
- Keep commits task-sized.
- Use clear commit messages:

  ```txt
  <type>: <short task summary>
  ```

- Do not commit unless explicitly instructed.
- Before preparing a commit, summarize files changed, validation run, risks, and follow-up work.

## Stop Conditions

Stop and ask for direction when:

- The work request is ambiguous enough that implementation could go in multiple incompatible directions.
- Acceptance criteria conflict with the specification.
- The implementation requires credentials or access that is unavailable.
- A destructive migration or data loss is possible.
- The task requires changing public API contracts beyond the stated scope.
- The task requires introducing a new paid service or dependency.
- Existing uncommitted changes overlap with the files needed and intent is unclear.
- Tests fail for reasons unrelated to the current task and the fix would be out of scope.
- The request is broad but no safe first vertical task can be identified.

## Final Response Format

At the end of a workflow run, report:

- Request classification.
- Spec file used.
- Task plan used.
- Tasks completed.
- Files changed.
- Verification commands and results.
- Progress updated in `_progress/progress.md`.
- Summary updated in `_summary/`.
- Unresolved issues or recommended next task.
- Suggested commit message.
