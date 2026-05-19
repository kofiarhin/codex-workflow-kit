# Release Notes: Add TDD-First Workflow Rule

## Request

Update the workflow kit so code generation follows a strict TDD-first approach while preserving the existing workflow structure.

## User-Facing Changes

- README now explains that code-changing tasks must use TDD-first Red -> Green -> Refactor inside every Build, Refine, and Polish iteration.
- Task documentation now shows required TDD evidence fields.

## Developer Changes

- `RUN_WORKFLOW.md` and template workflow docs now require Red, expected failing-test verification, Green, passing verification, Refactor, and post-refactor verification for code-changing tasks.
- Task/progress templates now require test plan, Red phase evidence, Green phase evidence, Refactor phase evidence, test commands run, and acceptance result.
- Review and health-check rules now block code tasks from `Done` without TDD evidence or an explicitly justified missing-test exception.
- Prompt docs and AGENTS docs now carry the TDD-first rule for generated workflow use.

## New Routes/APIs

none

## New Env Vars

none

## Database/Schema Changes

none

## Dependencies Added/Removed

none

## Test Commands Run

- `rg "TDD-first|Red phase|Green phase|Refactor phase|missing-test exception|failing test was observed|post-refactor verification" RUN_WORKFLOW.md templates/RUN_WORKFLOW.md _task/README.md templates/_task/README.md _progress/progress.md templates/_progress/progress.md README.md docs/PROMPTS.md templates/docs/PROMPTS.md AGENTS.md templates/AGENTS.md`
- `rg "complete-workflow|single-task|parallel-workflow|dirty worktree|_handoff|_release|health check|Planned -> Ready -> In Progress -> Verified -> Reviewed -> Done" RUN_WORKFLOW.md templates/RUN_WORKFLOW.md README.md AGENTS.md templates/AGENTS.md _task/README.md templates/_task/README.md`
- `npm test`
- `npm run build`
- `git diff --check`
- `git diff --stat`
- `git diff`
- `git status --short client server`

## Known Limitations

- TDD enforcement is workflow/prompt enforcement, not a separate automated validator.
- This was a documentation-only workflow update; no app tests were added.

## Follow-Up Work

none

## Suggested Commit Message

`docs: add tdd-first workflow rules`
