# Work Request

This file is auto-managed by the workflow. It stores the latest active work request, usually copied from the user's direct Codex prompt.

Users do not need to edit this file manually. You may edit it when you want to stage a request before asking the agent to run the workflow.

The workflow will ask clarifying questions, generate a saved detailed spec in `_spec/`, create a vertical task plan in `_task/`, execute tasks one by one until the request is complete or stopped, update `_progress/progress.md` and `_handoff/current.md` after each task, write a workflow review in `_review/`, create release notes in `_release/`, and write a final summary in `_summary/`.

## Request

Update codex-workflow-kit to support parallel multi-agent execution.

Goal: add an orchestrator + worker-agent workflow where tasks can be claimed and executed in parallel when safe.

Current behavior:

- `complete-workflow` executes all tasks sequentially.
- `single-task` executes one task.
- Every task runs Build -> Refine -> Polish.

New behavior:

- Keep existing sequential behavior as fallback.
- Add parallel execution support with default worker agents: 3, minimum parallel workers: 2 when 2+ parallel-safe tasks exist, maximum worker agents: 5, and fallback to 1 worker only when dependency/file-lock safety requires it.

## Requested Files

- `RUN_WORKFLOW.md`
- `templates/RUN_WORKFLOW.md`
- `README.md`
- `docs/PROMPTS.md`
- `templates/docs/PROMPTS.md`
- `_task/README.md`
- `templates/_task/README.md`
- `_handoff/current.md`
- `templates/_handoff/current.md`
- `_progress/progress.md`
- `templates/_progress/progress.md`

Add new parallel templates if useful:

- `_parallel/README.md`
- `_parallel/claims.md`
- `_parallel/locks.md`
- `_parallel/agent-status.md`
- `templates/_parallel/README.md`
- `templates/_parallel/claims.md`
- `templates/_parallel/locks.md`
- `templates/_parallel/agent-status.md`

## Required Workflow Model

1. Orchestrator Phase
   - Intake, detailed spec, and task plan remain orchestrator-owned.
   - Orchestrator ranks tasks by priority.
   - Orchestrator marks tasks as parallel-safe or not.
   - Orchestrator detects dependencies and file overlap.
   - Orchestrator creates/updates task queue, claims file, locks file, and handoff.
2. Task Metadata
   - Every task must include Priority, Parallel safe, Depends on, Blocks, File locks, Claim status, Claimed by, Agent role, and Merge risk.
3. Agent Pool Rules
   - Recommended/default worker count is 3.
   - Spawn/use at least 2 workers when there are 2+ parallel-safe unblocked tasks.
   - Never use more than 5 workers.
   - Use fewer workers when tasks conflict, share files, or depend on each other.
   - Use 1 worker only when parallel safety fails.
   - A worker can claim exactly one task at a time.
   - No two workers may claim tasks with overlapping file locks.
   - P0 tasks are claimed before P1, P1 before P2.
   - Among same-priority tasks, pick the task with lowest dependency risk and lowest merge risk first.
4. Worker Agent Rules
   - Each worker reads AGENTS.md, RUN_WORKFLOW.md, the saved spec, task plan, `_parallel/claims.md`, `_parallel/locks.md`, `_progress/progress.md`, and `_handoff/current.md`.
   - Each worker claims one unclaimed high-priority parallel-safe task, records the claim before editing, runs Build -> Refine -> Polish, updates progress, marks final status, releases locks only after final status is recorded, and stops after one task.
   - Workers do not run final global review/release/summary unless acting as orchestrator.
5. Locking Rules
   - File locks must be declared before editing.
   - If a task needs a locked file owned by another agent, the worker must stop or choose another task.
   - If unexpected file overlap appears, worker stops and marks needs-review.
   - Locks are released only after worker records final task status.
6. Orchestrator Merge/Review Phase
   - After workers finish, the orchestrator reads all task outputs, checks claims and locks, runs final diff audit, resolves conflicts or creates follow-up tasks, runs final verification, writes review/release/summary/handoff/health check.
   - Health check must fail/partial if claims, locks, iteration evidence, or merge review are missing.
7. Execution Modes
   - Preserve `plan-only`, `single-task`, and `complete-workflow`.
   - Add `parallel-workflow`, `parallel-worker`, and `parallel-orchestrator`.
8. Prompts
   - Add reusable prompts for Parallel Orchestrator Planning, Parallel Worker Claim Task, Parallel Worker Execute Claimed Task, Parallel Lock Conflict Review, Parallel Merge Review, and Parallel Health Check.
9. Health Check
   - Validate task priorities, parallel-safe flags, dependencies, file locks, claims, no overlapping active file locks, Build -> Refine -> Polish evidence, orchestrator merge review, and final verification.

## Acceptance Criteria

- Existing sequential `complete-workflow` still works.
- New `parallel-workflow` mode is documented.
- New `parallel-worker` mode is documented.
- New `parallel-orchestrator` mode is documented.
- Task template includes priority, parallel safety, dependencies, locks, claim status, claimed by, and merge risk.
- README explains default 3 workers, minimum 2, maximum 5, fallback 1.
- Prompts include copy-paste-ready parallel orchestrator and worker prompts.
- Installer templates include any new `_parallel` files.
- No app/runtime code is changed.

## Verification

- `rg "complete-workflow"` confirms sequential behavior remains intact.
- `rg "parallel-workflow"` confirms new mode is documented.
- `rg "parallel-worker"` confirms worker mode is documented.
- `rg "default worker"` confirms default is 3.
- `rg "maximum"` confirms max workers is 5.
- `rg "file locks"` confirms lock rules exist.
- Run available lint/format checks if present.
- Run `git diff --stat` and `git diff`.

## Execution Preference

`complete-workflow`

## Scope Boundaries

- Do not change app/runtime code.
- Do not commit changes.
- Only update workflow documentation, templates, prompts, installer support for templates, and relevant workflow artifacts.
