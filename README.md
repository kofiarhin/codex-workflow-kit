# Codex Workflow Kit

A portable AI engineering workflow kit for software projects that use OpenAI Codex, Claude Code, Cursor, or similar coding agents.

The kit gives a project a lightweight operating system for agentic development:

```txt
spec -> architecture -> tasks -> implement -> verify -> critique -> refine -> commit
```

It is intentionally documentation-first. It does not generate an application, install dependencies, or force a framework. The default examples assume a MERN SaaS stack, but the templates are editable for any stack.

## What This Provides

- `AGENTS.md`: Repository operating rules for coding agents.
- `docs/SPEC.md`: Product specification template.
- `docs/ARCHITECTURE.md`: Architecture planning template.
- `docs/TASKS.md`: One-task-at-a-time implementation plan.
- `docs/VERIFY.md`: Verification log for tests, checks, bugs, and follow-up work.
- `docs/PROMPTS.md`: Reusable prompts for planning, implementation, review, fixes, commits, and summaries.
- `docs/DECISIONS.md`: ADR-style architecture decision log.
- `scripts/install.sh`: Installer that copies templates into another repository.
- `examples/mern-saas`: Filled-in examples for a realistic MERN SaaS project.

## Why Use It

AI coding agents work better when the repository gives them clear boundaries. This kit helps by making scope explicit, requiring verification, and keeping implementation tied to accepted tasks.

It is designed to prevent common agent failure modes:

- Implementing too much at once.
- Refactoring unrelated code.
- Skipping tests.
- Ignoring architecture constraints.
- Losing track of what was verified.
- Making commits that are too large to review.

## Repository Structure

```txt
templates/
  AGENTS.md
  docs/
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

## Installation

From this workflow kit repository:

```bash
./scripts/install.sh ../my-project
```

Use `--force` only when you want to overwrite existing workflow files:

```bash
./scripts/install.sh ../my-project --force
```

The installer copies:

```txt
AGENTS.md
docs/SPEC.md
docs/ARCHITECTURE.md
docs/TASKS.md
docs/VERIFY.md
docs/PROMPTS.md
docs/DECISIONS.md
```

Existing files are skipped by default.

## Manual Installation

If you do not want to use the script, copy the template files manually:

```bash
cp templates/AGENTS.md ../my-project/AGENTS.md
mkdir -p ../my-project/docs
cp templates/docs/*.md ../my-project/docs/
```

## Setup In A Fresh Repo

1. Install the workflow files.
2. Edit `AGENTS.md` for the project's stack, rules, deployment targets, and test commands.
3. Fill in `docs/SPEC.md` with the product requirements.
4. Fill in `docs/ARCHITECTURE.md` with the intended structure and technical decisions.
5. Break the first feature into scoped tasks in `docs/TASKS.md`.
6. Start the coding agent with one task only.
7. After each task, require updates to `docs/VERIFY.md`.
8. Review, refine, and commit a task-sized change.

## Recommended Codex Loop

Use this loop for each unit of work:

1. Spec: Define what the product or feature should do in `docs/SPEC.md`.
2. Architecture: Decide where the behavior belongs in `docs/ARCHITECTURE.md`.
3. Tasks: Split the work into small entries in `docs/TASKS.md`.
4. Implement: Ask the agent to implement exactly one task.
5. Verify: Run tests, builds, linters, or manual checks.
6. Critique: Ask for a review of the task-sized diff.
7. Refine: Fix only issues found in review or verification.
8. Commit: Commit the verified task.

## First Recommended Agent Prompt

After installation, use this prompt:

```txt
Read AGENTS.md, docs/SPEC.md, docs/ARCHITECTURE.md, and docs/TASKS.md.

Summarize:
1. What this project is.
2. The intended architecture.
3. Any gaps or contradictions in the docs.
4. The first task you recommend implementing.

Do not edit files yet.
```

When the docs are ready and you want implementation:

```txt
Follow AGENTS.md.

Implement exactly one task:
<TASK-ID> - <TASK_TITLE>

Before editing:
- Read the task acceptance criteria.
- Check git status.
- Inspect only relevant files.

After editing:
- Run or recommend verification commands.
- Update docs/VERIFY.md.
- Check git status again.
- Summarize changed files, validation results, and risks.

Do not implement any other task.
```

## Example Commands

Plan a feature:

```txt
Using docs/SPEC.md and docs/ARCHITECTURE.md, break the team invitation feature into one-task-at-a-time entries in docs/TASKS.md. Do not implement code.
```

Implement a task:

```txt
Follow AGENTS.md. Implement exactly one task: TASK-002 - Create Shared Frontend API Client.
```

Review a completed task:

```txt
Review the changes for TASK-002 as a senior engineer. Prioritize bugs, security issues, missing edge cases, test gaps, and unnecessary complexity. Do not edit files.
```

Fix failed tests:

```txt
Follow AGENTS.md. The command `cd server && npm test -- projects` failed. Fix only the cause of this failure, rerun the relevant test if possible, and update docs/VERIFY.md.
```

Prepare a commit:

```txt
Prepare a commit summary for TASK-002. Include suggested commit message, files changed, behavior changed, verification run, and known risks. Do not run git commit.
```

## Recommended Git Workflow

Use task-sized branches and commits:

```bash
git checkout -b task/TASK-002-api-client
```

Before asking an agent to edit:

```bash
git status --short
```

After verification:

```bash
git diff --stat
git status --short
git add AGENTS.md docs/SPEC.md docs/ARCHITECTURE.md docs/TASKS.md docs/VERIFY.md
git commit -m "feat: add shared frontend api client"
```

Adjust the files you add based on the task. Do not commit unrelated changes.

## Integrating With Codex, Claude Code, And Cursor

Most coding agents automatically read `AGENTS.md` or can be instructed to read it. For best results:

- Keep `AGENTS.md` at the repository root.
- Keep task instructions in `docs/TASKS.md`.
- Tell the agent which task ID to implement.
- Require updates to `docs/VERIFY.md`.
- Use a separate review prompt before committing.

Recommended implementation prompt:

```txt
Follow AGENTS.md and implement exactly one task: <TASK-ID>.
```

Recommended review prompt:

```txt
Review the current diff against AGENTS.md and docs/TASKS.md. Report bugs, regressions, missing tests, and scope creep first. Do not edit files.
```

## Example MERN SaaS Workflow

See `examples/mern-saas` for:

- A realistic product spec.
- A scoped task backlog.
- A practical MERN architecture plan.

These examples show the expected level of detail. They are not application code.

## Customizing For Other Stacks

To use this kit outside MERN:

- Replace the stack defaults in `AGENTS.md`.
- Update folder structure in `docs/ARCHITECTURE.md`.
- Replace test commands in `AGENTS.md` and task entries.
- Replace API, state, and deployment rules with the project's conventions.
- Keep the same one-task verification loop.

## Design Principles

- Lightweight over comprehensive.
- Explicit scope over broad autonomy.
- Verification over assumptions.
- Documentation close to implementation.
- Small commits over large agent-generated drops.
- Reusable templates over project-specific automation.

## License

Add your preferred license here.
