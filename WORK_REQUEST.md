# Work Request

This file is auto-managed by the workflow. It stores the latest active work request, usually copied from the user's direct Codex prompt.

Users do not need to edit this file manually. You may edit it when you want to stage a request before asking the agent to run the workflow.

The workflow will ask clarifying questions, generate a saved detailed spec in `_spec/`, create a vertical task plan in `_task/`, execute tasks one by one until the request is complete or stopped, update `_progress/progress.md` and `_handoff/current.md` after each task, write a workflow review in `_review/`, create release notes in `_release/`, and write a final summary in `_summary/`.

## Request

Update the workflow kit so code generation follows a strict TDD-first approach while preserving the existing workflow structure.

Do not replace the workflow. Extend it.

Required changes:

1. In `RUN_WORKFLOW.md`, update task execution so every code-changing task must follow:
   - Red: write or update the failing test first
   - Verify the test fails for the expected reason
   - Green: implement the smallest change to pass
   - Verify tests pass
   - Refactor: clean structure/naming/types without changing behavior
   - Verify tests still pass
2. Update Build -> Refine -> Polish so TDD is embedded inside each iteration, not treated as optional.
3. Update `_task` templates so each task includes:
   - Test plan
   - Red phase evidence
   - Green phase evidence
   - Refactor phase evidence
   - Test commands run
   - Acceptance result
4. Update review/health-check rules so a code task cannot be Done unless:
   - relevant tests were added or updated first
   - the failing test was observed before implementation, when possible
   - passing verification was recorded after implementation
   - any missing-test exception is explicitly justified
5. Keep existing artifacts, statuses, complete-workflow mode, dirty worktree protection, progress, handoff, review, release notes, summary, and health check behavior.
6. Update README/docs only where needed to explain the new TDD-first code generation rule.

Run a final diff audit and report changed files.

## Execution Preference

`complete-workflow`

## Scope Boundaries

- Extend the existing workflow; do not replace it.
- Preserve existing artifacts, statuses, execution modes, dirty worktree protection, progress, handoff, review, release notes, summary, and health check behavior.
- Do not change app/runtime code.
- Do not commit changes.
