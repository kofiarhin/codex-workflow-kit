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
- Important docs:
  - `docs/PROJECT_CONTEXT.md`
  - `docs/ACTIVE_TASK.md`
  - `docs/SPEC.md`
  - `docs/ARCHITECTURE.md`
  - `docs/TASKS.md`
  - `docs/VERIFY.md`
  - `docs/DECISIONS.md`

## Operating Rules

1. For plain-English work requests, always read `WORK_REQUEST.md` and `RUN_WORKFLOW.md` before planning or editing.
2. Read `docs/PROJECT_CONTEXT.md`, `docs/SPEC.md`, `docs/ARCHITECTURE.md`, and `docs/TASKS.md` before implementation.
3. Classify the request before changing code or docs.
4. Inspect the repository before generating tasks.
5. Implement tasks sequentially, one task at a time.
6. Keep changes scoped to the active task.
7. Never implement unrelated work.
8. Never skip verification. If verification cannot run, document the reason and the best available manual check.
9. Update `docs/ACTIVE_TASK.md` during task execution.
10. Update `docs/VERIFY.md` after each task.
11. Do not start a second task until the current task is implemented, verified, critiqued, and documented.
12. Stop if scope is unclear, risky, destructive, or requires unavailable access.

## Required Workflow

For a work request:

1. Read `WORK_REQUEST.md` and `RUN_WORKFLOW.md`.
2. Classify the request as `feature`, `bugfix`, `boilerplate`, `security`, `refactor`, `test`, `docs`, `ops`, or `research`.
3. Check repository status:

   ```bash
   git status --short
   ```

4. Perform repo intake and update `docs/PROJECT_CONTEXT.md` with durable findings.
5. Update `docs/SPEC.md`, `docs/ARCHITECTURE.md`, and `docs/DECISIONS.md` only as needed.
6. Generate or update scoped tasks in `docs/TASKS.md`.
7. Move the next valid task into `docs/ACTIVE_TASK.md`.
8. Implement only that task.
9. Run or recommend validation commands.
10. Critique the result and fix only in-scope defects.
11. Update `docs/VERIFY.md`.
12. Check repository status again:

    ```bash
    git status --short
    ```

13. Summarize results and suggest a commit message.

## Implementation Boundaries

Agents must not:

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
- Record the gap in `docs/VERIFY.md`.

## Verification Requirements

After every task, append an entry to `docs/VERIFY.md` containing:

- Work request summary.
- Request classification.
- Task ID and title.
- Date.
- Files touched.
- Commands run.
- Result of each command.
- Manual checks performed.
- Bugs found.
- Fixes applied.
- Unresolved issues.
- Recommended next step.

Do not claim a task is verified unless validation was actually run or a manual check is clearly described.

## Git Workflow Guidance

- Check `git status --short` before and after edits.
- Do not overwrite user changes.
- Keep commits task-sized.
- Use clear commit messages:

  ```txt
  <type>: <short task summary>
  ```

  Examples:

  ```txt
  feat: add login flow
  fix: repair dashboard totals
  docs: add workflow request template
  test: cover subscription downgrade rules
  ```

- Do not commit unless explicitly instructed.
- Before preparing a commit, summarize files changed, validation run, risks, and follow-up work.

## Task Scoping Rules

Each task in `docs/TASKS.md` must include:

- Task ID.
- Status.
- Request type.
- Objective.
- Files likely affected.
- Checklist.
- Acceptance criteria.
- Verification commands.
- Stop condition.

Agents must keep implementation aligned to those fields. If follow-up work is discovered, add or recommend a new task instead of expanding the active task.

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
- The request is a broad command such as "refactor auth" but no safe first task can be identified.

## Final Response Format

At the end of a workflow run, report:

- Request classification.
- Tasks created or updated.
- Task completed.
- Files changed.
- Verification commands and results.
- Updates made to `docs/ACTIVE_TASK.md` and `docs/VERIFY.md`.
- Unresolved issues or recommended next task.
- Suggested commit message.
