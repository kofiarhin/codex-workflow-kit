# Task Plan: Worktree-Safe Workflow Model Completion

- Spec file used: `_workflow/runs/main/spec.md`
- Planning date: 2026-05-24
- Progress and summary files read: `_workflow/runs/main/progress.md`, `_workflow/runs/main/summary.md`
- Detailed spec sections used: 6 Desired End State, 9 Functional Requirements, 11 Affected Surfaces, 15 Execution Strategy, 16 Verification Strategy, 17 Acceptance Criteria, 18 Edge Cases, 19 Risks.

## TASK-001: Complete run-scoped request and parallel template model

- Status: Done
- Objective: Make request state run-scoped, add parallel templates, update installer, and align workflow docs.
- Files likely affected: `README.md`, `RUN_WORKFLOW.md`, `AGENTS.md`, `WORK_REQUEST.md`, `docs/PROMPTS.md`, `scripts/install.sh`, `templates/**`, `_workflow/**`.
- Checklist:
  - [x] Replace active root `WORK_REQUEST.md` assumptions with `<artifact-root>/request.md`.
  - [x] Mark root `WORK_REQUEST.md` compatibility/manual only.
  - [x] Add `claims.md`, `locks.md`, and `agent-status.md` templates.
  - [x] Update installer copy list and setup messaging.
  - [x] Add merge safety rules.
  - [x] Run final audit.
- Iteration plan for Iteration 1 Build: Update canonical docs/templates and add missing files.
- Iteration plan for Iteration 2 Refine: Search for stale shared request assumptions and repair inconsistencies.
- Iteration plan for Iteration 3 Polish: Run syntax, existence, mirror, diff, and final audit checks.
- Test plan: Documentation searches, template existence checks, installer syntax, final diff audit.
- Red phase evidence: Docs-only missing-test exception; no runtime code changed.
- Green phase evidence: Required searches and template checks passed.
- Refactor phase evidence: Root/template RUN_WORKFLOW mirror check passed.
- Test commands run: recorded in `_workflow/runs/main/verification.md`.
- Acceptance criteria:
  - [x] Active workflow artifacts are run-scoped.
  - [x] Root `WORK_REQUEST.md` is compatibility-only.
  - [x] Parallel templates exist.
  - [x] Installer ships required templates.
  - [x] README and RUN_WORKFLOW are consistent.
  - [x] dev/redesign/main worktrees avoid workflow-state merge conflicts.
- Acceptance result: all criteria met.
- Verification commands: recorded in `_workflow/runs/main/verification.md`.
- Stop condition: stop if stale root auto-sync remains or required templates are missing.
- Out-of-scope items: app code, commits, deleting legacy artifacts.
