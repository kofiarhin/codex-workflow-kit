# Task Plan: Add Workflow Quality Controls

## Spec File Used

`_spec/2026-05-13-add-workflow-quality-controls.md`

## Planning Date

2026-05-13

## Progress And Summary Files Read

- `_progress/progress.md`
- `_summary/2026-05-13-update-workflow-execution-model.md`
- `_handoff/current.md`

## Dirty Worktree Check

- Command: `git status --short`
- Existing dirty files: none before implementation.
- Files planned for this workflow: `AGENTS.md`, `RUN_WORKFLOW.md`, `WORK_REQUEST.md`, `README.md`, template workflow docs, `scripts/install.sh`, `_release/README.md`, `templates/_release/README.md`, and workflow run artifacts for this request.
- Overlap risk: none detected.

## Task List

### TASK-001: Add quality gates to root workflow docs

- Status: Done
- Objective: Update root workflow docs so agents must run dirty worktree checks, record acceptance results, follow failure recovery, complete final diff audits, and create release notes.
- Files likely affected: `AGENTS.md`, `RUN_WORKFLOW.md`, `WORK_REQUEST.md`, `README.md`, `_handoff/current.md`, `_progress/progress.md`
- Checklist:
  - Add final diff audit requirements.
  - Add dirty worktree protection requirements.
  - Add acceptance result requirements.
  - Add failure recovery protocol.
  - Add release notes and health-check requirements.
- Acceptance criteria:
  - Root workflow docs mention final diff audit.
  - Root workflow docs mention dirty worktree protection.
  - Root workflow docs mention acceptance results.
  - Root workflow docs mention failure recovery protocol.
  - Root workflow docs mention `_release`.
- Acceptance result:
  - [x] Root workflow docs mention final diff audit.
  - [x] Root workflow docs mention dirty worktree protection.
  - [x] Root workflow docs mention acceptance results.
  - [x] Root workflow docs mention failure recovery protocol.
  - [x] Root workflow docs mention `_release`.
- Verification commands:
  - `rg "final diff audit|dirty worktree|acceptance result|failure recovery|_release" AGENTS.md RUN_WORKFLOW.md WORK_REQUEST.md README.md`
- Stop condition: Stop if root docs require behavior that conflicts with backward compatibility.
- Out-of-scope items: App implementation code.

### TASK-002: Add quality gates to templates and installer

- Status: Done
- Objective: Update installable templates and installer script so new projects receive the same quality-control workflow and release folder.
- Files likely affected: `templates/AGENTS.md`, `templates/RUN_WORKFLOW.md`, `templates/WORK_REQUEST.md`, `templates/_progress/progress.md`, `templates/_summary/README.md`, `templates/_task/README.md`, `templates/_review/README.md`, `templates/_handoff/current.md`, `templates/_release/README.md`, `scripts/install.sh`
- Checklist:
  - Mirror QC rules into template workflow docs.
  - Add template release notes README.
  - Make installer copy `_release/README.md`.
  - Update installer completion message.
- Acceptance criteria:
  - Template workflow files mention final diff audit.
  - Template workflow files mention dirty worktree protection.
  - Template workflow files mention acceptance results.
  - Template workflow files mention failure recovery protocol.
  - Template workflow files mention `_release`.
  - Installer copies `templates/_release/README.md` to `_release/README.md`.
- Acceptance result:
  - [x] Template workflow files mention final diff audit.
  - [x] Template workflow files mention dirty worktree protection.
  - [x] Template workflow files mention acceptance results.
  - [x] Template workflow files mention failure recovery protocol.
  - [x] Template workflow files mention `_release`.
  - [x] Installer copies `templates/_release/README.md` to `_release/README.md`.
- Verification commands:
  - `rg "final diff audit|dirty worktree|acceptance result|failure recovery|_release" templates/AGENTS.md templates/RUN_WORKFLOW.md templates/WORK_REQUEST.md templates/_progress/progress.md templates/_summary/README.md templates/_task/README.md templates/_review/README.md templates/_handoff/current.md templates/_release/README.md`
  - `rg "templates/_release/README.md|_release/README.md|_release/" scripts/install.sh`
  - `bash -n scripts/install.sh`
- Stop condition: Stop if installer changes require destructive overwrite behavior.
- Out-of-scope items: Changing installer behavior beyond copying the new release README and messaging.

### TASK-003: Finalize workflow artifacts and verify docs-only scope

- Status: Done
- Objective: Create release notes, review, summary, complete final diff audit, update handoff/progress, and verify no app implementation files changed.
- Files likely affected: `_release/2026-05-13-add-workflow-quality-controls.md`, `_review/2026-05-13-add-workflow-quality-controls.md`, `_summary/2026-05-13-add-workflow-quality-controls.md`, `_handoff/current.md`, `_progress/progress.md`, `_task/2026-05-13-add-workflow-quality-controls.md`
- Checklist:
  - Run required root/template content checks.
  - Run installer syntax check.
  - Run final `git diff --stat` and `git diff`.
  - Confirm no app implementation files changed.
  - Write release notes, review, and summary.
  - Update final handoff and progress entries.
- Acceptance criteria:
  - Release notes artifact exists.
  - Final diff audit is documented in review, summary, and final response.
  - No app implementation files were modified.
  - Workflow health check is completed.
- Acceptance result:
  - [x] Release notes artifact exists.
  - [x] Final diff audit is documented in review, summary, and final response.
  - [x] No app implementation files were modified.
  - [x] Workflow health check is completed.
- Verification commands:
  - `git diff --stat`
  - `git diff`
  - `git status --short`
  - `rg "final diff audit|dirty worktree|acceptance result|failure recovery|_release" AGENTS.md RUN_WORKFLOW.md WORK_REQUEST.md README.md templates/AGENTS.md templates/RUN_WORKFLOW.md templates/WORK_REQUEST.md templates/_progress/progress.md templates/_summary/README.md templates/_task/README.md templates/_review/README.md templates/_handoff/current.md templates/_release/README.md`
  - `bash -n scripts/install.sh`
- Stop condition: Stop if final diff shows app implementation changes or unrelated files that cannot be explained.
- Out-of-scope items: App code, deployment, dependency changes.
