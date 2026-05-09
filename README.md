# Codex Workflow Kit

A lightweight reusable AI engineering workflow system for OpenAI Codex, Claude Code, Cursor, and similar coding agents.

The kit lets a user type one plain-English request directly into Codex:

```txt
Implement login
Fix the dashboard bug
Create a MERN boilerplate
Audit security
Refactor auth
```

Then the workflow guides the agent through:

```txt
request -> spec -> architecture -> tasks -> implementation -> verification -> critique -> summary
```

It does not generate an app, install dependencies, or force a framework. MERN is the default example, but the workflow is stack-neutral.

## What This Provides

- `WORK_REQUEST.md`: Auto-managed record of the latest active request.
- `RUN_WORKFLOW.md`: The master orchestration prompt that tells the agent how to run the workflow.
- `AGENTS.md`: Repository operating rules for coding agents.
- `docs/PROJECT_CONTEXT.md`: Durable facts about stack, commands, conventions, constraints, and architecture rules.
- `docs/ACTIVE_TASK.md`: The one task currently being executed.
- `docs/SPEC.md`: Product specification template.
- `docs/ARCHITECTURE.md`: Architecture planning template.
- `docs/TASKS.md`: Sequential scoped task backlog.
- `docs/VERIFY.md`: Verification log for commands, checks, bugs, fixes, and unresolved issues.
- `docs/PROMPTS.md`: Reusable prompts for classification, intake, tasking, execution, critique, repair, and summaries.
- `docs/DECISIONS.md`: ADR-style architecture decision log.
- `scripts/install.sh`: Installer that copies workflow files into another repository.
- `examples/mern-saas`: Filled-in examples for a realistic MERN SaaS project.

## Why Use It

AI coding agents work better with clear scope and a repeatable loop. This kit turns a broad request into controlled execution:

- Route direct user prompts into the workflow automatically.
- Classify the request before changing files.
- Inspect the repo before planning.
- Generate or update spec, architecture, and tasks automatically.
- Generate scoped tasks.
- Execute one task at a time.
- Verify every task.
- Critique and fix in-scope issues.
- Keep logs current.
- Produce a final summary and suggested commit message.

## Repository Structure

```txt
templates/
  WORK_REQUEST.md
  RUN_WORKFLOW.md
  AGENTS.md
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
generate mern boilerplate
```

Codex should automatically treat that prompt as the active request, sync it into `WORK_REQUEST.md`, generate or update workflow docs, create tasks, execute according to mode, verify, critique, and summarize.

Manual editing of `WORK_REQUEST.md`, `docs/SPEC.md`, `docs/ARCHITECTURE.md`, or `docs/TASKS.md` is optional, not required.

### Execution Modes

Direct prompts and `WORK_REQUEST.md` support explicit execution modes. If the mode is missing, the workflow defaults to `single-task`.

- `plan-only`: Classify the request, inspect the repo, update docs, generate tasks, then stop.
- `single-task`: Generate tasks, implement only the first ready task, verify, critique/fix, then stop.
- `full-auto`: Execute all generated tasks sequentially until complete, blocked, risky, unclear, unverified, or outside scope.

Use `single-task` for normal coding work. Use `plan-only` when you want a plan before edits. Use `full-auto` only when the request is well-scoped and you are comfortable with the agent completing multiple sequential tasks.

Plan-only example:

```md
## Execution Mode

`plan-only`
```

Single-task example:

```md
## Execution Mode

`single-task`
```

Full-auto example:

```md
## Execution Mode

`full-auto`
```

### Step 3: Optional Explicit Invocation

Default zero-edit usage is simply typing the work request:

```txt
implement login feature
```

If your agent does not automatically route direct prompts through `RUN_WORKFLOW.md`, use:

```txt
Read RUN_WORKFLOW.md and execute it using this request: implement login feature
```

The agent should use the latest direct prompt as the active request, sync it into `WORK_REQUEST.md`, classify it, inspect the repo, generate/update docs, generate tasks, obey the selected execution mode, verify, critique/fix, update logs, and produce a final summary.

### Step 4: Review, Verify, Commit

Review:

- `docs/ACTIVE_TASK.md`
- `docs/TASKS.md`
- `docs/VERIFY.md`
- The final summary
- The current diff

Then commit only the verified task-sized change.

## Recommended Agent Loop

1. Treat the latest direct prompt as the active request.
2. Sync the request into `WORK_REQUEST.md`.
3. Read execution mode, defaulting to `single-task`.
4. Classify the request.
5. Inspect repository conventions and commands.
6. Generate/update `docs/SPEC.md`, `docs/ARCHITECTURE.md`, and `docs/TASKS.md`.
7. Execute according to mode: none, one ready task, or sequential ready tasks.
8. Run verification and update `docs/VERIFY.md`.
9. Critique and fix only in-scope issues.
10. Summarize results and suggest a commit message.

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

## Zero-Edit Workflow

You can run the workflow without manually editing any docs:

```txt
generate mern boilerplate
```

Codex automatically runs:

```txt
direct prompt -> WORK_REQUEST.md -> SPEC.md -> ARCHITECTURE.md -> TASKS.md -> ACTIVE_TASK.md -> implementation -> VERIFY.md -> critique -> summary
```

Manual editing remains useful when you want to predefine constraints, execution mode, architecture rules, or detailed acceptance criteria.

## Git Workflow

Use task-sized branches and commits:

```bash
git checkout -b task/login-workflow
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
git add AGENTS.md WORK_REQUEST.md RUN_WORKFLOW.md docs/
git commit -m "feat: add scoped login workflow"
```

Adjust staged files and commit message for the actual task. Do not commit unrelated changes.

## Integrating With Codex, Claude Code, And Cursor

Keep these files at the project root:

- `AGENTS.md`
- `WORK_REQUEST.md`
- `RUN_WORKFLOW.md`
- `docs/`

Most agents can be started with:

```txt
generate mern boilerplate
```

Or explicitly:

```txt
Read RUN_WORKFLOW.md and execute it using this request: generate mern boilerplate
```

For review-only work:

```txt
Review the current diff against AGENTS.md, RUN_WORKFLOW.md, docs/ACTIVE_TASK.md, and docs/TASKS.md. Report bugs, regressions, missing tests, and scope creep first. Do not edit files.
```

## Customizing For Other Stacks

To use this kit outside MERN:

- Replace stack defaults in `AGENTS.md`.
- Fill in discovered conventions in `docs/PROJECT_CONTEXT.md`.
- Update folder structure and architecture rules in `docs/ARCHITECTURE.md`.
- Replace verification commands in `docs/TASKS.md`.
- Keep the same one-request, one-task-at-a-time workflow.

## Example MERN SaaS Workflow

See `examples/mern-saas` for:

- A realistic product spec.
- A scoped task backlog.
- A practical MERN architecture plan.

These examples show the expected level of detail. They are not application code.

## Design Principles

- Plain English request in.
- Scoped engineering work out.
- Lightweight docs over heavy process.
- Sequential tasks over broad autonomy.
- Verification over assumptions.
- Critique before final summary.
- Reusable across stacks.

## License

Add your preferred license here.
