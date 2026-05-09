# Agent Operating Guide

This file defines how AI coding agents should work in this repository. It is intended for OpenAI Codex, Claude Code, Cursor, and similar tools.

Customize the placeholders before using this in a production project.

## Project Context

- Project name: `<PROJECT_NAME>`
- Product summary: `<ONE_SENTENCE_PRODUCT_SUMMARY>`
- Primary stack: MERN by default unless changed
  - Frontend: React, Vite, Tailwind CSS
  - Backend: Node.js, Express, MongoDB, Mongoose
  - Testing: Vitest/React Testing Library for frontend, Jest/Supertest for backend
- Deployment: `<DEPLOYMENT_TARGETS>`
- Important docs:
  - `docs/SPEC.md`
  - `docs/ARCHITECTURE.md`
  - `docs/TASKS.md`
  - `docs/VERIFY.md`
  - `docs/DECISIONS.md`

## Operating Rules

1. Read `docs/SPEC.md`, `docs/ARCHITECTURE.md`, and `docs/TASKS.md` before implementation.
2. Implement exactly one task at a time from `docs/TASKS.md`.
3. Do not start a second task until the current task is implemented, verified, and documented.
4. Keep changes scoped to the selected task.
5. Avoid unrelated refactors, formatting churn, file moves, dependency changes, and architecture rewrites.
6. Preserve existing behavior unless the task explicitly requires changing it.
7. Prefer existing project conventions over new patterns.
8. Ask for clarification when acceptance criteria are ambiguous or conflicting.
9. Stop if required secrets, credentials, external services, or destructive actions are needed.
10. Update `docs/VERIFY.md` after each task with commands run, results, bugs found, and unresolved issues.

## Required Workflow

For every implementation task, follow this loop:

1. Identify the task ID and acceptance criteria from `docs/TASKS.md`.
2. Check repository status before editing:

   ```bash
   git status --short
   ```

3. Inspect relevant files only.
4. Make the smallest coherent change that satisfies the task.
5. Run relevant validation commands, or explain why they cannot be run.
6. Update `docs/VERIFY.md`.
7. Check repository status after editing:

   ```bash
   git status --short
   ```

8. Summarize changed files, validation results, and remaining risks.

## Implementation Boundaries

Agents must not:

- Implement more than one task per prompt.
- Rewrite large parts of the application without explicit approval.
- Introduce new dependencies unless the task requires them and the reason is documented.
- Change deployment configuration unless the task requires it.
- Hard-code secrets, API keys, tokens, credentials, or environment-specific URLs.
- Duplicate server state into client global state.
- Expose sensitive fields such as `passwordHash`, tokens, or private user data.
- Remove tests or weaken validation to make a task pass.
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

- Keep UI components focused on rendering and interaction.
- Put frontend API calls in `client/src/services/`.
- Use a shared frontend API client in `client/src/lib/api.js`.
- Use TanStack Query or equivalent for server state.
- Use Redux Toolkit or equivalent only for global client state.
- Keep backend route handlers thin; move business logic into services or utilities when it grows.
- Validate input at API boundaries.
- Keep database models authoritative for persistence rules.
- Document major architectural decisions in `docs/DECISIONS.md`.

## Testing Expectations

Use the narrowest validation that proves the task works, then broaden when risk is higher.

Preferred commands:

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
```

If tests or scripts are missing:

- State that they are missing.
- Recommend the command that should exist.
- Use available manual verification.
- Record the gap in `docs/VERIFY.md`.

## Verification Requirements

After every task, append an entry to `docs/VERIFY.md` containing:

- Task ID and title.
- Date.
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
  feat: add organization invite flow
  fix: handle expired reset tokens
  docs: document deployment variables
  test: cover subscription downgrade rules
  ```

- Before preparing a commit, summarize:
  - Files changed.
  - Validation run.
  - Risks or follow-up work.

## Task Scoping Rules

Each task in `docs/TASKS.md` should include:

- Task ID.
- Objective.
- Files or areas likely to change.
- Acceptance criteria.
- Verification commands.
- Stop conditions.

Agents must keep implementation aligned to those fields.

If a task reveals necessary follow-up work, add a new proposed task instead of expanding the current task.

## Stop Conditions

Stop and ask for direction when:

- Acceptance criteria conflict with the specification.
- The implementation requires credentials or access that is unavailable.
- A destructive migration or data loss is possible.
- The task requires changing public API contracts beyond the stated scope.
- The task requires introducing a new paid service or dependency.
- Existing uncommitted changes overlap with the files needed and intent is unclear.
- Tests fail for reasons unrelated to the current task and the fix would be out of scope.

## Final Response Format

At the end of a task, agents should report:

- Task completed.
- Files changed.
- Validation commands and results.
- Updates made to `docs/VERIFY.md`.
- Any unresolved issues or recommended next task.
