# Codex Workflow Kit

A lightweight reusable AI engineering workflow system for OpenAI Codex, Claude Code, Cursor, and similar coding agents.

The kit turns a plain-English request into a clarified, specified, task-by-task workflow:

```txt
request -> questions -> spec in _spec -> vertical plan/tasks in _task -> execute one task at a time -> update _progress -> final summary in _summary
```

It does not generate an app, install dependencies, or force a framework. MERN is the default example, but the workflow is stack-neutral.

## What This Provides

- `WORK_REQUEST.md`: Auto-managed record of the latest active request and optional preferences.
- `RUN_WORKFLOW.md`: The master orchestration prompt that tells the agent how to run the workflow.
- `AGENTS.md`: Repository operating rules for coding agents.
- `_spec/`: Saved specs generated after intake questions.
- `_task/`: Saved vertical task plans generated from specs.
- `_progress/progress.md`: Append-only task progress log.
- `_summary/`: Workflow completion summaries.
- `docs/PROJECT_CONTEXT.md`: Durable facts about stack, commands, conventions, constraints, and architecture rules.
- `docs/ARCHITECTURE.md`: Architecture planning support.
- `docs/VERIFY.md`: Legacy/supporting verification notes when useful.
- `docs/PROMPTS.md`: Reusable prompts for intake, specs, planning, execution, critique, repair, and summaries.
- `docs/DECISIONS.md`: ADR-style architecture decision log.
- `scripts/install.sh`: Installer that copies workflow files into another repository.
- `examples/mern-saas`: Filled-in examples for a realistic MERN SaaS project.

## Why Use It

AI coding agents work better with clear scope and a repeatable loop. This kit makes the agent slow down before code changes:

- Ask clarifying questions before implementation.
- Build about 90% understanding of goal, users, behavior, edge cases, UI/API expectations, data model, constraints, success criteria, and out-of-scope work.
- Save a detailed spec in `_spec/`.
- Read `_progress/` and `_summary/` before planning.
- Generate vertical tasks in `_task/`.
- Execute one Ralph Wiggum-style task at a time.
- Verify every task.
- Critique and fix in-scope issues.
- Append progress after each task.
- Produce a final summary and suggested commit message.

## Repository Structure

```txt
templates/
  WORK_REQUEST.md
  RUN_WORKFLOW.md
  AGENTS.md
  _spec/
    README.md
  _task/
    README.md
  _progress/
    progress.md
  _summary/
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

The older `docs/SPEC.md`, `docs/TASKS.md`, and `docs/ACTIVE_TASK.md` templates may remain useful for compatibility, but `_spec/`, `_task/`, `_progress/`, and `_summary/` are the main workflow memory.

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
add dark theme
```

Codex should automatically treat that prompt as the active request, sync it into `WORK_REQUEST.md`, ask clarifying questions, generate a spec, generate a vertical task plan, execute one task at a time, verify, critique, update progress, and summarize.

Manual editing of `WORK_REQUEST.md`, `_spec/`, `_task/`, `_progress/`, or `_summary/` is optional, not required.

### Step 3: Answer Questions

The agent should ask focused questions before writing code. It should clarify:

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

Tiny obvious requests can use fewer questions. No implementation should happen during this phase.

### Step 4: Review Spec And Task Plan

The agent writes:

```txt
_spec/<date-or-slug>.md
_task/<date-or-slug>.md
```

The spec captures the request, answers, assumptions, requirements, edge cases, constraints, success criteria, and out-of-scope work.

The task plan breaks the spec into vertical slices. Each task includes objective, likely files, checklist, acceptance criteria, verification commands, stop condition, and out-of-scope items.

### Step 5: Execute One Task At A Time

Before each task, the agent reads:

```txt
_progress/progress.md
_summary/
_spec/<active-spec>.md
_task/<active-task-plan>.md
```

For each task, the agent inspects relevant code, implements only the current task, verifies, critiques/fixes, appends progress, and continues only if safe.

### Step 6: Review Progress And Summary

After each task, the agent appends to:

```txt
_progress/progress.md
```

After the workflow completes, the agent creates or appends:

```txt
_summary/<date-or-slug>.md
```

## Question Control

By default, the workflow asks questions first.

To skip questions, include `skip questions` in the prompt:

```txt
skip questions
add dark theme for the app
```

When questions are skipped, the agent must generate a best-effort spec and record assumptions before planning or implementation.

## Execution Preferences

Direct prompts and `WORK_REQUEST.md` can include an optional execution preference:

- `plan-only`: Ask questions, write spec, write task plan, then stop.
- `single-task`: Ask questions, write spec, write task plan, execute only the first ready task, verify, update progress, write summary, then stop.
- `full-auto`: Ask questions, write spec, write task plan, execute tasks sequentially until complete, blocked, risky, unclear, or unverified.

Default: `single-task`.

## Recommended Agent Loop

1. Treat the latest direct prompt as the active request.
2. Sync the request into `WORK_REQUEST.md`.
3. Ask clarifying questions unless the prompt says `skip questions`.
4. Generate a saved spec in `_spec/`.
5. Read `_progress/progress.md` and the latest relevant `_summary/`.
6. Generate vertical tasks in `_task/`.
7. Execute one task at a time.
8. Verify and critique each task.
9. Append progress to `_progress/progress.md`.
10. Write the final summary in `_summary/`.

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

Prompt with questions:

```txt
Add dark theme to the app.
Follow RUN_WORKFLOW.md.
Ask clarifying questions first, then generate the spec in _spec/ and the vertical task plan in _task/.
```

Prompt that skips questions:

```txt
skip questions
Add dark theme to the app.
Follow RUN_WORKFLOW.md.
Generate a best-effort spec with assumptions, then create the vertical task plan and execute one task at a time.
```

## Zero-Edit Workflow

You can run the workflow without manually editing any docs:

```txt
add dark theme
```

Codex automatically runs:

```txt
direct prompt -> questions -> _spec -> _task -> task execution -> _progress -> _summary
```

Manual editing remains useful when you want to predefine constraints, architecture rules, success criteria, or detailed acceptance criteria.

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
git add AGENTS.md WORK_REQUEST.md RUN_WORKFLOW.md _spec/ _task/ _progress/ _summary/ docs/
git commit -m "docs: add clarified workflow memory"
```

Adjust staged files and commit message for the actual task. Do not commit unrelated changes.

## Integrating With Codex, Claude Code, And Cursor

Keep these files at the project root:

- `AGENTS.md`
- `WORK_REQUEST.md`
- `RUN_WORKFLOW.md`
- `_spec/`
- `_task/`
- `_progress/`
- `_summary/`
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
Review the current diff against AGENTS.md, RUN_WORKFLOW.md, _spec/, _task/, _progress/progress.md, and _summary/. Report bugs, regressions, missing tests, and scope creep first. Do not edit files.
```

## Customizing For Other Stacks

To use this kit outside MERN:

- Replace stack defaults in `AGENTS.md`.
- Fill in discovered conventions in `docs/PROJECT_CONTEXT.md`.
- Update folder structure and architecture rules in `docs/ARCHITECTURE.md`.
- Replace verification commands in generated `_task/` plans.
- Keep the same questions, spec, vertical tasks, progress, and summary loop.

## Example MERN SaaS Workflow

See `examples/mern-saas` for:

- A realistic product spec.
- A scoped task backlog.
- A practical MERN architecture plan.

These examples show the expected level of detail. They are not application code.

## Design Principles

- Ask before building.
- Plain English request in.
- Detailed spec before implementation.
- Vertical tasks over vague layers.
- Ralph Wiggum-style steps over broad autonomy.
- Verification over assumptions.
- Progress after every task.
- Summary after every workflow.
- Reusable across stacks.

## License

Add your preferred license here.
