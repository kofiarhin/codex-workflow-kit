# Release Notes: Add Parallel Multi-Agent Workflow

## Request

Update codex-workflow-kit to support parallel multi-agent execution.

## User-Facing Changes

- Added documentation for `parallel-workflow`, `parallel-worker`, and `parallel-orchestrator` modes.
- Documented default 3 workers, minimum 2 workers when 2+ safe tasks exist, maximum 5 workers, and fallback 1 worker when safety requires sequential execution.
- Added `_parallel` coordination templates for claims, locks, and agent status.
- Added copy-paste-ready parallel orchestrator, worker, lock conflict, merge review, and health check prompts.

## Developer Changes

- Updated workflow docs, templates, prompt docs, task/progress/handoff guidance, and installer template copy support.
- Preserved existing sequential `complete-workflow`, `single-task`, and `plan-only` behavior.

## New Routes/APIs

none

## New Env Vars

none

## Database/Schema Changes

none

## Dependencies Added/Removed

none

## Test Commands Run

- `rg "complete-workflow" RUN_WORKFLOW.md templates/RUN_WORKFLOW.md README.md _task/README.md templates/_task/README.md` passed.
- `rg "parallel-workflow" -g '!node_modules' -g '!.git' .` passed.
- `rg "parallel-worker" -g '!node_modules' -g '!.git' .` passed.
- `rg "default worker" -g '!node_modules' -g '!.git' .` passed.
- `rg "maximum" -g '!node_modules' -g '!.git' .` passed.
- `rg "file locks" -g '!node_modules' -g '!.git' .` passed.
- `bash -n scripts/install.sh` passed.
- `npm test` passed.
- `npm run build` passed.
- `git diff --check` passed with line-ending normalization warnings only.
- `git diff --stat` and `git diff` ran.

## Known Limitations

Parallel execution is documented as a workflow/prompt model. No runtime scheduler or CLI command was added.

## Follow-Up Work

none

## Suggested Commit Message

`docs: add parallel multi-agent workflow`
