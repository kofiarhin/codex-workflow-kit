# Spec: Add 3-Pass Task Hardening Loop

## Request Summary

Update the workflow kit documentation, templates, and workflow memory templates so every executable task must complete a required 3-pass hardening loop before it can be marked `Done`.

## Date

2026-05-15

## Source Prompt

The user requested updates to `AGENTS.md`, `RUN_WORKFLOW.md`, `README.md`, `docs/PROMPTS.md`, template copies, current handoff/progress files, and relevant workflow README/template files so task execution changes from a single execute -> verify -> review pass to a required Build -> Refine -> Polish loop for every executable task.

## Questions Asked And Answers Received

No clarifying questions were asked. The prompt specified the target behavior, files, acceptance criteria, verification expectations, execution mode, and out-of-scope constraints.

## Assumptions

- This is a docs/template workflow change only.
- Existing execution modes stay intact:
  - `plan-only` stops after spec and task plan.
  - `single-task` executes exactly one task through the full 3-pass loop.
  - `complete-workflow` executes all tasks sequentially, with each task completing the full 3-pass loop before the next starts.
- Root files and template files should be kept semantically aligned.
- The active workflow artifacts for this request should themselves document iteration evidence.
- Existing historical progress entries do not need retroactive rewriting.

## Goal

Make the workflow clearly require three documented iterations for each executable task:

1. Iteration 1 - Build.
2. Iteration 2 - Refine.
3. Iteration 3 - Polish.

## Non-Goals

- Do not modify application behavior.
- Do not change frontend or backend code.
- Do not add dependencies.
- Do not change deployment setup.
- Do not remove spec-first planning, dirty worktree protection, acceptance results, failure recovery, final diff audit, review, release notes, summary, handoff, or health-check concepts.

## Users

- AI coding agents using this workflow kit.
- Developers installing the workflow kit into project repositories.
- Maintainers reviewing workflow artifacts and progress history.

## Functional Requirements

- `RUN_WORKFLOW.md` must describe the 3-pass task hardening loop in the pipeline, planning phase, execution phase, verification, progress tracking, handoff, review, summary, health check, and final response.
- `templates/RUN_WORKFLOW.md` must mirror the root workflow changes.
- `docs/PROMPTS.md` must add or update reusable prompts for:
  - 3-Pass Task Hardening Loop.
  - Iteration 1 Build Pass.
  - Iteration 2 Refine Pass.
  - Iteration 3 Polish Pass.
  - Iteration Evidence Review.
- `templates/docs/PROMPTS.md` must mirror the root prompt changes.
- Existing prompts for Single-Task Execution, Ralph Wiggum Task Execution, Critique Loop, Verification Repair, and Final Summary must mention iteration evidence.
- `README.md` must concisely explain the new Build -> Refine -> Polish task loop in overview, value proposition, usage, sequential execution, recommended agent loop, health check, and final artifact descriptions.
- Relevant template/readme files under workflow memory folders must reflect per-iteration task planning, progress, handoff resume state, review, summary, release notes, and health evidence.
- Task plan templates must include per-iteration fields.
- Progress tracking templates must record each iteration separately.
- Handoff must be able to resume from both current task and current iteration.
- Health check must be `Partial` or `Failed` if required iteration evidence is missing.
- Final response requirements must include an iteration evidence summary.

## UI Expectations

Not applicable.

## API Expectations

Not applicable.

## Data Model Expectations

Not applicable.

## Edge Cases

- Verification fails during an iteration: failure recovery must happen inside that iteration and be documented there.
- Verification cannot run: the task cannot be `Done`; mark `Needs Human Review` unless another safe path is explicitly documented.
- A task becomes unsafe, unclear, or outside scope during any iteration: stop with `Blocked` or `Needs Human Review`.
- In `single-task` mode, exactly one task must complete the full 3-pass loop, then stop.
- In `complete-workflow` mode, every task must complete the full 3-pass loop before the next task starts.

## Constraints

- Preserve current artifact folders and lifecycle states.
- Keep language concise and practical.
- No unrelated behavior or app code changes.
- Use existing markdown style.
- No commit.

## Success Criteria

- Required files consistently describe the Build -> Refine -> Polish loop.
- Task plan template includes per-iteration fields.
- Progress tracking requires separate iteration records.
- Handoff can resume at current task and current iteration.
- Review, summary, health check, and final response require iteration evidence.
- Old single-pass wording is removed or updated where it implies one verify/review pass.
- Root/template copies remain aligned.
- Verification searches pass.
- Available repo verification commands run or documented.
- Final diff audit is completed.

## Out-Of-Scope Items

- Application feature work.
- New code-generation tools.
- Installer behavior unless a docs/template file copy issue is discovered.
- Historical artifact rewrites beyond the active handoff/progress files and README/template guidance requested.

## Open Questions

None blocking.
