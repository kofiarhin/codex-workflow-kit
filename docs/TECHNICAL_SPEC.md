# Codex Workflow Kit Technical Specification

## Status

This document describes the kit itself. It replaces no installed project-specific architecture document and should not be confused with the generic `templates/docs/ARCHITECTURE.md` file copied into target repositories.

## Implementation shape

The kit is a repository of Markdown instructions, JSON memory schemas and seeds, reusable skills, quality-layer references, templates, examples, and a Bash installer. It is consumed by copying selected files into another repository and then directing a coding agent to execute `RUN_WORKFLOW.md`.

## Main components

### Installer

`scripts/install.sh`:

- accepts one target directory and optional `--force`;
- resolves the kit and template roots;
- rejects missing targets and unexpected arguments;
- creates parent directories;
- skips existing files by default;
- copies committed templates into deterministic target paths;
- reports next steps and preservation behavior.

The installer uses `set -euo pipefail`. It currently requires a Bash-compatible environment and standard utilities such as `cp`, `mkdir`, `dirname`, and `pwd`.

### Workflow orchestrator

`templates/RUN_WORKFLOW.md` defines the stage order and transition rules. Installed agents should treat discovery, approval, planning, implementation, verification, review, quality audit, release notes, summary, and handoff as separate stages.

### Repository rules

`templates/AGENTS.md` establishes the operating constraints used by the coding agent inside the target repository.

### Intake and design skills

- `.agents/skills/grill-me/SKILL.md` performs focused discovery and creates the Shared Understanding Handoff.
- `.agents/skills/design-taste-frontend/SKILL.md` adds frontend-specific design and implementation quality rules when UI scope is present.

### Fallow Quality layer

`layers/fallow-quality/` contains the quality skill and reference materials. Installed workflows write the resulting audit to `.workflow/fallow-audit.md` after conventional tests, linting, type checking, building, and review.

### Run artifacts

Each active run writes to `_workflow/runs/<run-id>/`:

- `request.md`
- `spec.md`
- `tasks.md`
- `progress.md`
- `handoff.md`
- `review.md`
- `verification.md`
- `release-notes.md`
- `summary.md`
- optional parallel coordination files

The run directory is the unit of isolation and resumption.

### Project Brain

Durable project memory lives under `_workflow/project-brain/`:

- `project.json` — current structured memory;
- `history.json` — append-only events;
- `conflicts.json` — unresolved and resolved contradictions;
- `categories.json` — category contract and custom namespace rules;
- `PROJECT_BRAIN.md` — generated human-readable projection.

Each run also receives local `brain.json`, `activity.md`, and `checkpoints.md` artifacts.

## Run identity

The workflow selects a run ID in this order:

1. `CODEX_WORKFLOW_RUN_ID`;
2. current Git branch;
3. current worktree directory name.

Slash and backslash are converted to `__`; other unsafe characters are converted to `-`. The implementation must determine this identity before writing generated artifacts.

## State and authority

- Project Brain JSON is authoritative for durable project memory and current workflow state.
- `progress.md` is authoritative for completed task execution evidence.
- The approved run specification is authoritative for implementation scope and acceptance criteria.
- Chat history is not a durable source of truth.
- Legacy root and folder artifacts are compatibility inputs or historical records, not the default active state model.

## Installation behavior

Without `--force`, installation is additive and preserves existing files. With `--force`, every listed target file may be replaced, including Project Brain seeds. The user must therefore treat force installation as a destructive operation requiring intentional review and backup.

## Parallel execution

Parallel workers may use run-scoped claim, lock, and status files. Active workflow artifacts remain isolated by run. Shared aggregate files should be static, append-only, or updated after merge to reduce branch conflicts.

## Failure handling

- Invalid installer arguments fail before copying.
- Missing target or template directories fail clearly.
- Existing files are skipped unless force is enabled.
- Verification failures remain recorded and block completion.
- Interrupted runs resume from durable run artifacts and Project Brain state.
- Conflicting memories remain in `conflicts.json` rather than being silently overwritten.

## Security and safety

- Templates and prompts must not include credentials.
- Agents inspect dirty worktree state before changing code.
- Material product, security, migration, and release decisions require explicit approval.
- Installer force mode is explicit and off by default.
- Generated summaries may not replace test and verification evidence.

## Verification strategy

The kit should maintain automated checks for:

- installer argument validation;
- default skip behavior;
- force replacement behavior;
- missing-directory failures;
- complete template-copy coverage;
- Project Brain preservation;
- run-ID sanitization rules;
- internal link and path consistency;
- stale legacy-path references;
- required workflow stage and approval gates.

An end-to-end fixture should install into a temporary Git repository, execute health checks, and confirm the expected file tree without modifying files outside the target.

## Compatibility and migration

The repository still contains legacy path references and compatibility templates. Any removal should include a versioned migration guide, installer behavior for upgrades, and explicit deprecation dates. Generic project templates must remain separate from the kit's own product and architecture documentation.
