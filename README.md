# Codex Workflow Kit

A lightweight reusable AI engineering workflow system for OpenAI Codex, Claude Code, Cursor, and similar coding agents.

The kit turns a plain-English request into a clarified, specified, task-by-task workflow:

```txt
request -> grill-me intake skill -> shared understanding handoff -> sync WORK_REQUEST -> dirty worktree check -> detailed execution blueprint in _spec -> vertical plan/tasks derived from the blueprint in _task -> execute each task through Build -> Refine -> Polish, with Red -> Green -> Refactor inside every code-changing iteration -> acceptance results + _progress/_handoff after each task -> final diff audit -> review in _review -> release notes in _release -> final summary in _summary -> update _handoff -> health check
```

The grill-me skill is the workflow intake engine. It stress-tests a rough request through focused questions (one at a time, each with a recommended answer), inspects the repo when the answer is already there, and produces a Shared Understanding Handoff that feeds the rest of the workflow. It replaces the old generic clarification phase.

It does not generate an app, install dependencies, or force a framework. MERN is the default example, but the workflow is stack-neutral.

## What This Provides

- `WORK_REQUEST.md`: Auto-managed record of the latest active request and optional preferences.
- `RUN_WORKFLOW.md`: The master orchestration prompt that tells the agent how to run the workflow.
- `AGENTS.md`: Repository operating rules for coding agents.
- `.agents/skills/grill-me/SKILL.md`: The workflow intake skill. Replaces the old generic clarification phase with focused, one-question-at-a-time intake that produces a Shared Understanding Handoff before the spec is written.
- `_handoff/current.md`: Live workflow state used to resume with `continue workflow`.
- `_spec/`: Saved detailed execution blueprints generated after intake questions and repo intake.
- `_task/`: Saved vertical task plans generated from detailed specs.
- `_parallel/`: Optional parallel workflow coordination files for task claims, file locks, and worker status.
- `_progress/progress.md`: Append-only task progress log.
- `_review/`: Required workflow reviews written after implementation and before summaries.
- `_release/`: Release notes for completed workflow runs.
- `_summary/`: Workflow completion summaries.
- `_decisions/`: Decision logs for meaningful architecture or product decisions.
- `docs/PROJECT_CONTEXT.md`: Durable facts about stack, commands, conventions, constraints, and architecture rules.
- `docs/ARCHITECTURE.md`: Architecture planning support.
- `docs/VERIFY.md`: Legacy/supporting verification notes when useful.
- `docs/PROMPTS.md`: Reusable prompts for intake, specs, planning, execution, critique, repair, and summaries.
- `docs/DECISIONS.md`: Legacy/supporting project-level decision guidance when useful.
- `scripts/install.sh`: Installer that copies workflow files into another repository.
- `examples/mern-saas`: Filled-in examples for a realistic MERN SaaS project.

## Why Use It

AI coding agents work better with clear scope and a repeatable loop. This kit makes the agent slow down before code changes:

- Run the grill-me intake skill before implementation to build shared understanding.
- Cover goal, users, behavior, edge cases, UI/API expectations, data model, constraints, success criteria, and out-of-scope work through focused one-at-a-time grill-me questions with recommended answers.
- Save a detailed, implementation-aware execution blueprint in `_spec/`.
- Read `_progress/` and `_summary/` before planning.
- Generate vertical tasks in `_task/` from the detailed spec's affected surfaces, execution strategy, verification strategy, acceptance criteria, risks, and task extraction notes.
- Execute one Ralph Wiggum-style task at a time through Build -> Refine -> Polish, continuing through all generated tasks by default.
- For code-changing tasks, follow TDD-first inside every Build, Refine, and Polish iteration: write or update the failing test first, verify the expected failure, implement the smallest passing change, verify tests pass, refactor without behavior change, and verify tests still pass.
- Move each task through `Planned -> Ready -> In Progress -> Verified -> Reviewed -> Done`.
- Protect dirty worktrees by checking `git status --short`, documenting existing dirty files, planned files, and overlap risk before implementation.
- Record explicit acceptance checklist results for every task.
- Follow a fixed failure recovery protocol when verification fails.
- Verify, critique, and harden every task in three documented passes.
- Append progress after each task.
- Run a final diff audit with `git diff --stat` and `git diff` before review and summary.
- Write a review in `_review/`.
- Write release notes in `_release/`.
- Produce a final summary, workflow health status, final artifact checklist, and suggested commit message.

## Repository Structure

```txt
templates/
  WORK_REQUEST.md
  RUN_WORKFLOW.md
  AGENTS.md
  .agents/
    skills/
      grill-me/
        SKILL.md
  _handoff/
    current.md
  _spec/
    README.md
  _task/
    README.md
  _parallel/
    README.md
    claims.md
    locks.md
    agent-status.md
  _progress/
    progress.md
  _review/
    README.md
  _release/
    README.md
  _summary/
    README.md
  _decisions/
    README.md
  docs/
    PROJECT_CONTEXT.md
    ACTIVE_TASK.md
    SPEC.md
    TASKS.md
    VERIFY.md
    PROMPTS.md
    ARCHITECTURE.md
    DECISIONS.md

scripts/
  install.sh

examples/
  mern-saas/
    SPEC.example.md
    TASKS.example.md
    ARCHITECTURE.example.md
```

The older `docs/SPEC.md`, `docs/TASKS.md`, and `docs/ACTIVE_TASK.md` templates may remain useful for compatibility, but `_handoff/`, `_spec/`, `_task/`, `_progress/`, `_review/`, `_release/`, `_summary/`, and `_decisions/` are the main workflow memory.

## Install Into A Project

From this workflow kit repository:

```bash
bash scripts/install.sh ../my-project
```

Overwrite existing workflow files only when intentional:

```bash
bash scripts/install.sh ../my-project --force
```

Existing files are skipped by default.

## Usage

### Step 1: Install Workflow Kit

```bash
bash scripts/install.sh ../my-project
```

### Step 2: Type A Direct Request Into Codex

Example:

```txt
workflow add battle history with saved results, detail view, and delete action
```

Codex should automatically treat that prompt as the active request, invoke the grill-me intake skill at `.agents/skills/grill-me/SKILL.md` to build shared understanding, sync the normalized request into `WORK_REQUEST.md`, run dirty worktree protection, generate a detailed execution blueprint spec, generate a vertical task plan from that blueprint, execute all tasks sequentially through Build -> Refine -> Polish, record iteration evidence and acceptance results, update progress and handoff after each task, run a final diff audit, write a workflow review only after the full request is complete or stopped, create release notes, summarize, and run a health check.

Manual editing of `WORK_REQUEST.md`, `_spec/`, `_task/`, `_progress/`, `_review/`, `_summary/`, or `_decisions/` is optional, not required.

### Step 3: Answer Grill-Me Questions

The agent invokes the grill-me skill at `.agents/skills/grill-me/SKILL.md` before writing code. Grill-me asks one focused question at a time, includes a recommended answer with every question, and inspects the repo instead of asking when the answer is already discoverable. It covers:

- Goal.
- Users.
- Exact behavior.
- Edge cases.
- UI expectations.
- API expectations.
- Data model expectations.
- Constraints.
- Success criteria.
- Out-of-scope work.

Grill-me ends with a Shared Understanding Handoff (Original Request, Confirmed Understanding, Decisions Made, Assumptions, In Scope, Out Of Scope, Acceptance Criteria, Risks And Edge Cases, Remaining Open Questions, Normalized Workflow Request). The normal workflow continues from the Normalized Workflow Request. Tiny obvious requests use a shorter grill-me pass. No implementation should happen during this phase.

### Step 4: Review Spec And Task Plan

The agent writes:

```txt
_spec/<date-or-slug>.md
_task/<date-or-slug>.md
```

The spec is a detailed, implementation-aware execution blueprint. It captures metadata, the original and normalized request, questions and answers, problem definition, current state analysis, desired end state, scope, users and use cases, functional and non-functional requirements, affected surfaces, dependencies and integrations, data/state impact, UX/API/workflow expectations, execution strategy, verification strategy, acceptance criteria, edge cases and failure modes, risks and mitigations, assumptions, open questions, and task extraction notes. Irrelevant sections should say `Not applicable` instead of being deleted.

The task plan breaks the detailed spec into vertical slices. It should derive tasks especially from affected surfaces, execution strategy, verification strategy, acceptance criteria, risks, and task extraction notes, and cite or reference the detailed spec sections used. Each task includes objective, likely files, checklist, an Iteration plan for Build -> Refine -> Polish, test plan, Red phase evidence, Green phase evidence, Refactor phase evidence, test commands run, acceptance criteria, acceptance result, verification commands, stop condition, and out-of-scope items.

Each task iteration records goal, changes made, verification command/result, review findings, acceptance status, remaining issues, and next action.

Tasks must use this status flow:

```txt
Planned -> Ready -> In Progress -> Verified -> Reviewed -> Done
```

Allowed terminal states are `Done`, `Blocked`, and `Needs Human Review`. A task cannot be `Done` unless Build, Refine, and Polish are complete, verification was attempted and reviewed in each iteration, and every required acceptance criterion is checked `[x]`. If any acceptance result is `[ ]` or `[~]`, the task is `Blocked` or `Needs Human Review`.

Acceptance results use:

```md
Acceptance result:
- [x] Criterion met
- [ ] Criterion not met
- [~] Partially met with notes
```

### Step 5: Execute Tasks Sequentially

Before each task, the agent reads:

```txt
_progress/progress.md
_summary/
_spec/<active-spec>.md
_task/<active-task-plan>.md
```

Default execution mode is `complete-workflow`, so the agent executes every generated task in order. For each task, the agent inspects relevant code and runs the required hardening loop:

1. Build the smallest working vertical slice, using Red -> Green -> Refactor for code-changing work, then verify, review, and record gaps.
2. Refine correctness, edge cases, tests, structure, naming, typing, reliability, and project consistency with another Red -> Green -> Refactor pass where code changes are needed, then verify and review again.
3. Polish remaining rough edges with final Red -> Green -> Refactor coverage for code-changing cleanup, confirm no regressions, run final verification, and produce the final task verdict.

For code-changing tasks, `Done` is blocked unless relevant tests were added or updated before implementation, the failing test was observed before implementation when possible, passing verification was recorded after implementation and after refactor, and any missing-test exception is explicitly justified.

Progress records each iteration separately, handoff records the current task and current iteration, and the agent continues automatically only when the current task is `Done`.

If verification fails during any iteration, the agent follows the failure recovery protocol inside that iteration: identify the failing command, capture the error, classify it as in-scope or unrelated, fix only in-scope failures, rerun the exact failing command, and stop with `Needs Human Review` if targeted recovery cannot prove the task. The workflow stops if a task is `Blocked`, `Needs Human Review`, remains failed after recovery, becomes risky or unclear, or requires external access.

### Optional Parallel Workflow

Sequential `complete-workflow` remains the fallback and still executes tasks one at a time. Use parallel modes only when the orchestrator can prove tasks are parallel-safe, unblocked, and have non-overlapping file locks.

Parallel execution uses:

- `parallel-workflow`: orchestrator plans tasks, creates `_parallel/claims.md`, `_parallel/locks.md`, and `_parallel/agent-status.md`, assigns safe tasks to workers, then performs merge review and final artifacts.
- `parallel-worker`: worker claims exactly one eligible task, records claim and file locks before editing, completes Build -> Refine -> Polish, records final status, releases locks, and stops.
- `parallel-orchestrator`: orchestrator validates queue, claims, locks, worker outputs, merge review, final verification, review, release notes, summary, handoff, and health check.

Worker pool rules:

- The default worker count is 3; the minimum parallel worker count is 2 when 2 or more safe tasks exist; the maximum worker count is 5; fallback is 1 when safety requires it.
- Default worker agents: 3.
- Minimum parallel workers: 2 when 2 or more parallel-safe unblocked tasks exist with non-overlapping file locks.
- Maximum worker agents: 5.
- Fallback worker count: 1 only when dependency or file-lock safety requires sequential execution.

No two workers may claim tasks with overlapping file locks. P0 tasks are claimed before P1 tasks, and P1 tasks before P2 tasks. Among same-priority tasks, choose the lowest dependency risk and lowest merge risk first.

### Step 6: Write Review, Summary, And Health Check

After each task, the agent appends to:

```txt
_progress/progress.md
```

Before the final review and summary, the agent runs the final diff audit:

```bash
git diff --stat
git diff
```

The audit documents whether the diff matches the saved spec, unrelated files were touched, workflow artifacts were updated correctly, tests were added or updated for changed behavior, accidental scope creep occurred, generated junk or temporary files appeared, or sensitive values/secrets were added.

After the workflow completes, the agent creates or appends:

```txt
_review/<date-or-slug>.md
_release/<date-or-slug>.md
_summary/<date-or-slug>.md
```

The review file records request, spec file used, task plan used, tasks reviewed, bugs found, scope creep check, final diff audit, failure recovery notes, missing tests, security concerns, architecture concerns, follow-up tasks, and final review verdict.

The release notes file records request, user-facing changes, developer changes, iteration evidence summary, new routes/APIs, new env vars, database/schema changes, dependencies added/removed, test commands run, known limitations, follow-up work, and suggested commit message. If none apply, the file says `none` or states that there are no user-facing changes.

The final health check reports `Passed`, `Partial`, or `Failed`.

- `Passed`: all executable tasks completed, required iteration evidence exists, and required artifacts exist.
- `Partial`: some tasks remain because of a documented blocker, human-review need, verification gap, missing iteration evidence, or follow-up risk.
- `Failed`: required artifacts are missing or scope was violated.

Health checks confirm:

- `WORK_REQUEST.md` synced.
- Spec, task plan, progress, review, release notes, and summary artifacts exist.
- The detailed spec includes every required section, or missing sections were repaired before planning.
- Dirty worktree protection ran.
- Acceptance results were completed.
- Iteration evidence was completed for every executable task.
- TDD-first evidence was completed for every code-changing task, or a missing-test exception was explicitly justified.
- Final diff audit was completed or documented.
- Verification commands ran or were documented.
- Scope was respected.
- Decisions were recorded when needed.

If release notes, final diff audit, dirty worktree check, iteration evidence, TDD-first evidence for code-changing tasks, or acceptance results are missing, health is `Partial` or `Failed` depending on severity. If any required artifact is missing, health is `Failed`.

## Final Artifact Checklist

Every final response must include an iteration evidence summary and exact artifact paths:

```txt
Work request: WORK_REQUEST.md
Handoff: _handoff/current.md
Spec: _spec/<file>.md
Task plan: _task/<file>.md
Progress: _progress/progress.md
Review: _review/<file>.md
Release notes: _release/<file>.md
Summary: _summary/<file>.md
Decisions: _decisions/<file>.md or none
```

Use `none` for decisions when no meaningful architecture or product decision was made.

## Decisions Folder

Use `_decisions/` for meaningful architecture or product decisions only. Routine edits do not need decision files.

Each decision file should include date, decision, context, options considered, selected option, consequences, affected files, and follow-up tasks.

## Handoff / Resume

`_handoff/current.md` stores the live workflow state for the active request. It should name the current request, request ID, phase, active spec, task plan, review and summary files, last completed task, current task, current iteration, next task, blockers, iteration evidence status, verification status, workflow health status, suggested next prompt, and notes for continuation.

Use this prompt to resume interrupted work:

```txt
continue workflow
```

The agent starts from `_handoff/current.md`, then checks `_progress/progress.md` for completed task and iteration history. If handoff and progress disagree, progress is trusted for completed task history and the handoff is updated.

The handoff is updated after each task and after the summary. `_progress/progress.md` is append-only task history, `_handoff/current.md` is current live state, and `_summary/` is completed workflow history.

## Continue Workflow

Use this prompt to resume an interrupted workflow:

```txt
continue workflow
```

The agent should read `_handoff/current.md` first, verify completed task history against `_progress/progress.md`, read the referenced task plan and spec, find the next task and current iteration that is not `Done`, and continue executing remaining tasks sequentially until every task is complete or a stop condition is reached. `continue workflow` does not re-invoke the grill-me intake skill; the agent resumes directly from the handoff state. The agent should not ask the original intake questions again unless needed, and it should not regenerate the entire spec unless the request changed.

## Question Control

By default, the workflow runs the grill-me intake skill at `.agents/skills/grill-me/SKILL.md` before any spec, task plan, or implementation.

To bypass grill-me, include `skip questions` in the prompt:

```txt
skip questions
add dark theme for the app
```

When questions are skipped, the agent must generate the best possible detailed spec and record assumptions/open questions before planning or implementation.

To resume an interrupted run without re-running grill-me, use `continue workflow`. That command skips grill-me and resumes from `_handoff/current.md`.

## Execution Preferences

Direct prompts and `WORK_REQUEST.md` can include an optional execution preference:

- `plan-only`: Ask questions, write the detailed spec, write the task plan derived from it, then stop.
- `single-task`: Ask questions, write the detailed spec, write the task plan derived from it, execute only the next ready task through the full Build -> Refine -> Polish loop, update artifacts, then stop.
- `complete-workflow`: Ask questions, write the detailed spec, write the task plan derived from it, execute all generated tasks sequentially until the request/spec is complete or a stop condition is reached; each task completes Build -> Refine -> Polish before the next starts.
- `parallel-workflow`: Ask questions, write the detailed spec, write the task plan derived from it, create queue/claims/locks, use up to the safe worker count, then complete merge review and final artifacts.
- `parallel-worker`: Claim and execute one eligible parallel-safe task only, then stop.
- `parallel-orchestrator`: Manage queue, validate claims/locks, merge worker outputs, run final verification, and complete final artifacts.

Default: `complete-workflow`.

`single-task` is optional for manual control and must be explicitly requested.

## Recommended Agent Loop

1. Treat the latest direct prompt as the active request.
2. Invoke the grill-me skill at `.agents/skills/grill-me/SKILL.md` unless the prompt says `skip questions` or `continue workflow`, and produce a Shared Understanding Handoff.
3. Sync the normalized request into `WORK_REQUEST.md`.
4. Generate a saved detailed execution blueprint in `_spec/`.
5. Read `_progress/progress.md` and the latest relevant `_summary/`.
6. Read or create `_handoff/current.md`.
7. Generate vertical tasks in `_task/` from the detailed spec, with acceptance result fields and per-iteration fields.
8. Execute every task sequentially by default, or use `parallel-workflow` only when dependencies and file locks are safe.
9. Run each executable task through Build -> Refine -> Polish, using the failure recovery protocol inside the iteration where verification fails.
10. Append iteration evidence to `_progress/progress.md` and update `_handoff/current.md`.
11. Continue to the next task automatically only when the current task is `Done`.
12. Run the final diff audit.
13. Write the workflow review in `_review/` after all executable tasks complete or a stop condition is reached.
14. Write release notes in `_release/`.
15. Write the final summary in `_summary/` and update `_handoff/current.md`.
16. Run the workflow health check and include the final artifact checklist.

## Request Types

The workflow classifies requests as:

- `feature`
- `bugfix`
- `boilerplate`
- `security`
- `refactor`
- `test`
- `docs`
- `ops`
- `research`

This helps the agent choose the right level of planning, verification, and caution.

## Example Work Requests

```txt
Implement login with JWT auth.
```

```txt
Fix the dashboard bug where totals do not update after filtering completed tasks.
```

```txt
Create a lightweight MERN boilerplate with client and server folders, but do not add dependencies.
```

```txt
Audit authentication for sensitive data exposure and add tests for any issue found.
```

```txt
Refactor auth middleware for readability without changing behavior.
```

## Test Prompts

Prompt with grill-me intake:

```txt
Add dark theme to the app.
Follow RUN_WORKFLOW.md.
Run the grill-me intake skill first, then generate the detailed spec in _spec/ and the vertical task plan derived from it in _task/.
```

Prompt that skips questions:

```txt
skip questions
Add dark theme to the app.
Follow RUN_WORKFLOW.md.
Generate a best-effort detailed spec with assumptions, then create the vertical task plan from it and execute all tasks in complete-workflow mode.
```

Prompt that forces single-task mode:

```txt
Execution preference: single-task.
Add dark theme to the app.
Follow RUN_WORKFLOW.md.
Stop after the next ready task completes Build -> Refine -> Polish, has iteration evidence recorded, and is documented.
```

Resume prompt:

```txt
continue workflow
```

## Zero-Edit Workflow

You can run the workflow without manually editing any docs:

```txt
add dark theme
```

Codex automatically runs:

```txt
direct prompt -> grill-me intake skill -> shared understanding handoff -> sync WORK_REQUEST -> dirty worktree check -> detailed _spec -> spec-derived _task -> all task execution through Build -> Refine -> Polish -> acceptance results + _progress + _handoff after each task -> final diff audit -> _review -> _release -> _summary -> _handoff -> health check
```

Manual editing remains useful when you want to predefine constraints, architecture rules, detailed current-state notes, success criteria, or acceptance criteria.

## Git Workflow

Use task-sized branches and commits:

```bash
git checkout -b task/dark-theme-workflow
```

Before and after agent work:

```bash
git status --short
```

Review the diff:

```bash
git diff --stat
git diff
```

Commit only after verification:

```bash
git add AGENTS.md WORK_REQUEST.md RUN_WORKFLOW.md _handoff/ _spec/ _task/ _progress/ _review/ _release/ _summary/ _decisions/ docs/
git commit -m "docs: add clarified workflow memory"
```

Adjust staged files and commit message for the actual task. Do not commit unrelated changes.

## Integrating With Codex, Claude Code, And Cursor

Keep these files at the project root:

- `AGENTS.md`
- `WORK_REQUEST.md`
- `RUN_WORKFLOW.md`
- `.agents/skills/grill-me/SKILL.md`
- `_handoff/`
- `_spec/`
- `_task/`
- `_progress/`
- `_review/`
- `_release/`
- `_summary/`
- `_decisions/`
- `docs/`

Most agents can be started with:

```txt
add dark theme
```

Or explicitly:

```txt
Read RUN_WORKFLOW.md and execute it using this request: add dark theme
```

For review-only work:

```txt
Review the current diff against AGENTS.md, RUN_WORKFLOW.md, _spec/, _task/, _progress/progress.md, _review/, _summary/, and _decisions/. Report bugs, regressions, missing tests, and scope creep first. Do not edit files.
Review the current diff against AGENTS.md, RUN_WORKFLOW.md, _spec/, _task/, _progress/progress.md, _review/, _release/, _summary/, and _decisions/. Report bugs, regressions, missing tests, final diff audit gaps, acceptance result gaps, and scope creep first. Do not edit files.
```

## Customizing For Other Stacks

To use this kit outside MERN:

- Replace stack defaults in `AGENTS.md`.
- Fill in discovered conventions in `docs/PROJECT_CONTEXT.md`.
- Update folder structure and architecture rules in `docs/ARCHITECTURE.md`.
- Replace verification commands in generated `_task/` plans.
- Keep the same questions, detailed spec, vertical tasks, progress, review, summary, decisions, and health-check loop.
- Keep the same dirty worktree protection, acceptance results, failure recovery protocol, final diff audit, release notes, and health-check loop.

## Example MERN SaaS Workflow

See `examples/mern-saas` for:

- A realistic product spec.
- A scoped task backlog.
- A practical MERN architecture plan.

These examples show the expected level of detail. They are not application code.

## Design Principles

- Grill-me intake before building.
- Plain English request in.
- Shared Understanding Handoff before WORK_REQUEST sync, spec, or task plan.
- Detailed execution blueprint before task planning and implementation.
- Vertical tasks over vague layers.
- Ralph Wiggum-style steps over broad autonomy.
- Build -> Refine -> Polish before `Done`.
- Complete workflow execution by default.
- Verification over assumptions.
- Dirty worktree protection before edits.
- Acceptance results before `Done`.
- Failure recovery without broad refactors.
- Progress after every task.
- Final diff audit before review.
- Review before summary.
- Release notes before summary.
- Summary after every workflow.
- Health check before final response.
- Reusable across stacks.

## License

Add your preferred license here.
