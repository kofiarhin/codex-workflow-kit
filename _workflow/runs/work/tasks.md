# Task Plan: Implement Fallow Quality Layer

- Spec file used: `_workflow/runs/work/spec.md`
- Planning date: 2026-06-03
- Progress and summary files read: none existed for this run before implementation.
- Detailed spec sections used: affected surfaces, dependency map, workflow expectations, execution strategy, verification strategy, acceptance criteria, risks, assumptions, task extraction notes.

## TASK-001: Add Fallow Quality as a mandatory workflow layer

- Status: Done
- Objective: Store official Fallow files locally, wire Fallow Quality into workflow docs/templates/installer, and create the audit report.
- Files likely affected: `layers/fallow-quality/**`, `templates/layers/fallow-quality/**`, `RUN_WORKFLOW.md`, `templates/RUN_WORKFLOW.md`, `AGENTS.md`, `templates/AGENTS.md`, `README.md`, `docs/PROMPTS.md`, `templates/docs/PROMPTS.md`, `scripts/install.sh`, `.workflow/fallow-audit.md`.
- Checklist:
  - [x] Fetch official Fallow files.
  - [x] Read files and extract rules.
  - [x] Document command rules and workflow order.
  - [x] Add installer coverage.
  - [x] Run verification and Fallow audit.
- Iteration 1 Build: Added fetched layer files and core workflow documentation.
- Iteration 2 Refine: Added template parity, installer copy steps, README and prompt guidance.
- Iteration 3 Polish: Ran verification, ran Fallow primary/fallback, wrote audit report, follow-up report, and workflow artifacts.
- Test plan: `npm test`, `npm run build`, `npm run test:workflow-routing`, `npm run lint`, `npm run typecheck`, Fallow primary with `--base main`/fallback JSON parse.
- Red phase evidence: Documentation-only workflow change; no code behavior unit was suitable for a failing test. Existing workflow routing validation was used as regression coverage.
- Green phase evidence: verification commands passed where scripts exist.
- Refactor phase evidence: template/root parity and installer integration reviewed.
- Test commands run: see progress and summary.
- Acceptance criteria: all spec criteria checked `[x]`.
- Acceptance result: Done.
- Verification commands: npm/Fallow commands listed in progress.
- Stop condition: none.
- Out-of-scope items: applying Fallow cleanup fixes.
