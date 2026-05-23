# Task Plan: Worktree-Scoped Workflow Artifacts

## Plan Metadata

- Spec file used: `_spec/2026-05-23-worktree-scoped-workflow-artifacts.md`
- Planning date: 2026-05-23
- Execution mode: `complete-workflow`
- Progress and summary files read: `_progress/progress.md`, `_summary/2026-05-23-add-spec-approval-gate.md`
- Handoff read: `_handoff/current.md`
- Spec approval: Approved by user message: "lets not add this. lets proceed with the spec generated. spec approved"

## Spec Sections Used

- Section 6 Desired End State: future agents write active artifacts under `_workflow/runs/<run-id>/`.
- Section 9 Functional Requirements: branch/worktree/run-id/artifact-root detection, own-run-directory rule, optional shared files, post-merge aggregation.
- Section 11 Affected Surfaces: root docs, template docs, installer, new `_workflow` guidance.
- Section 14 Workflow Expectations: detection commands and canonical artifact filenames.
- Section 15 Execution Strategy: canonical workflow docs first, README/template/install support second, verification/final artifacts third.
- Section 16 Verification Strategy: targeted `rg`, mirror checks, installer syntax, final diff audit.
- Section 17 Acceptance Criteria: run-scoped docs, artifact names, override, shared file rules, conflict recovery, final audit.
- Section 18 Edge Cases And Failure Modes: branch slash sanitization, detached HEAD fallback, shared index conflicts, template omission.
- Section 20 Assumptions: no physical migration of historical artifacts; current run may use legacy artifacts while introducing the new model.

## Dirty Worktree Protection

Initial status before planning included existing unrelated or prior workflow files:

- `M notes.txt`
- `?? _release/2026-05-23-add-spec-approval-gate.md`
- `?? _review/2026-05-23-add-spec-approval-gate.md`
- `?? _summary/2026-05-23-add-spec-approval-gate.md`
- `?? _task/2026-05-23-add-spec-approval-gate.md`

This workflow also changed `WORK_REQUEST.md`, `_handoff/current.md`, and added `_spec/2026-05-23-worktree-scoped-workflow-artifacts.md` during intake. Planned files are workflow docs/templates/artifacts only. `notes.txt` is unrelated and must not be touched.

## Tasks

## Execution Result

- `TASK-001`: Done. Completed Build, Refine, and Polish; verification passed.
- `TASK-002`: Done. Completed Build, Refine, and Polish; verification passed.
- `TASK-003`: Done. Completed Build, Refine, and Polish; final audit passed.

Docs-only missing-test exception applies to all tasks because no runtime code changed.

### TASK-001: Add run-scoped artifact rules to workflow instructions

- Status: Done
- Priority: P0
- Parallel safe: no
- Depends on: none
- Blocks: TASK-002, TASK-003
- File locks: `RUN_WORKFLOW.md`, `templates/RUN_WORKFLOW.md`
- Claim status: claimed
- Claimed by: orchestrator
- Agent role: orchestrator
- Merge risk: medium
- Objective: Make the canonical workflow instructions detect branch/worktree/run-id/artifact-root first and write active artifacts under `_workflow/runs/<run-id>/`.
- Files likely affected: `RUN_WORKFLOW.md`, `templates/RUN_WORKFLOW.md`
- Checklist:
  - Add artifact scope detection before active request resolution.
  - Define run id derivation from `CODEX_WORKFLOW_RUN_ID` or current branch.
  - Define slash sanitization into double underscores.
  - Define fallback to sanitized worktree folder when branch is empty.
  - Replace active artifact path defaults with `_workflow/runs/<run-id>/` files.
  - Add own-run-directory and merge-safe shared file rules.
- Iteration plan for Iteration 1 Build:
  - Goal: Add the primary worktree artifact model to root/template `RUN_WORKFLOW.md`.
  - Changes made: Pending.
  - Test plan: Targeted `rg` for run id, artifact root, required files.
  - Red phase evidence: Not applicable; docs-only missing-test exception.
  - Green phase evidence: Pending.
  - Refactor phase evidence: Pending.
  - Test commands run: Pending.
  - Verification command/result: Pending.
  - Review findings: Pending.
  - Acceptance status: Pending.
  - Remaining issues: Pending.
  - Next action: Pending.
- Iteration plan for Iteration 2 Refine:
  - Goal: Remove or qualify conflicting active legacy path guidance.
  - Changes made: Pending.
  - Test plan: Search for legacy active paths in canonical docs.
  - Red phase evidence: Not applicable; docs-only missing-test exception.
  - Green phase evidence: Pending.
  - Refactor phase evidence: Pending.
  - Test commands run: Pending.
  - Verification command/result: Pending.
  - Review findings: Pending.
  - Acceptance status: Pending.
  - Remaining issues: Pending.
  - Next action: Pending.
- Iteration plan for Iteration 3 Polish:
  - Goal: Confirm root/template workflow docs match.
  - Changes made: Pending.
  - Test plan: Mirror check and targeted searches.
  - Red phase evidence: Not applicable; docs-only missing-test exception.
  - Green phase evidence: Pending.
  - Refactor phase evidence: Pending.
  - Test commands run: Pending.
  - Verification command/result: Pending.
  - Review findings: Pending.
  - Acceptance status: Pending.
  - Remaining issues: Pending.
  - Next action: Pending.
- Test plan: Documentation searches and mirror check.
- Red phase evidence: Not applicable; docs-only missing-test exception.
- Green phase evidence: Pending.
- Refactor phase evidence: Pending.
- Test commands run: Pending.
- Acceptance criteria:
  - [ ] `RUN_WORKFLOW.md` requires detecting branch, worktree path, run id, and artifact root.
  - [ ] `RUN_WORKFLOW.md` makes `_workflow/runs/<run-id>/` canonical for active artifacts.
  - [ ] `templates/RUN_WORKFLOW.md` mirrors the root workflow guidance.
- Acceptance result: Pending.
- Verification commands: `rg "_workflow/runs|CODEX_WORKFLOW_RUN_ID|git branch --show-current|git rev-parse --show-toplevel|release-notes.md|verification.md" RUN_WORKFLOW.md templates/RUN_WORKFLOW.md`; `git diff --no-index -- RUN_WORKFLOW.md templates/RUN_WORKFLOW.md`
- Stop condition: Stop if canonical docs cannot be updated without weakening spec approval, TDD, or 3-pass rules.
- Out-of-scope items: App code, physical migration of historical artifacts.

### TASK-002: Add worktree setup and template support

- Status: Done
- Priority: P1
- Parallel safe: no
- Depends on: TASK-001
- Blocks: TASK-003
- File locks: `README.md`, `AGENTS.md`, `docs/PROMPTS.md`, templates, `scripts/install.sh`, `_workflow/`
- Claim status: done
- Claimed by: orchestrator
- Agent role: orchestrator
- Merge risk: medium
- Objective: Document the worktree model for users and make templates/install support the new `_workflow` guidance.
- Files likely affected: `README.md`, `AGENTS.md`, `docs/PROMPTS.md`, `templates/AGENTS.md`, `templates/docs/PROMPTS.md`, `scripts/install.sh`, `_workflow/index.md`, `_workflow/runs/README.md`, template `_workflow` files.
- Checklist:
  - Add README worktree model and bare repo setup commands.
  - Add shared file and conflict recovery guidance.
  - Add root and template `_workflow` docs.
  - Update installer to copy `_workflow`.
  - Update supporting prompt/agent docs enough to avoid contradictory active artifact paths.
- Iteration plan for Iteration 1 Build:
  - Goal: Add README and `_workflow` docs.
  - Changes made: Pending.
  - Test plan: Targeted `rg` for required commands and filenames.
  - Red phase evidence: Not applicable; docs-only missing-test exception.
  - Green phase evidence: Pending.
  - Refactor phase evidence: Pending.
  - Test commands run: Pending.
  - Verification command/result: Pending.
  - Review findings: Pending.
  - Acceptance status: Pending.
  - Remaining issues: Pending.
  - Next action: Pending.
- Iteration plan for Iteration 2 Refine:
  - Goal: Add supporting template and installer consistency.
  - Changes made: Pending.
  - Test plan: Installer syntax and template existence checks.
  - Red phase evidence: Not applicable; docs-only missing-test exception.
  - Green phase evidence: Pending.
  - Refactor phase evidence: Pending.
  - Test commands run: Pending.
  - Verification command/result: Pending.
  - Review findings: Pending.
  - Acceptance status: Pending.
  - Remaining issues: Pending.
  - Next action: Pending.
- Iteration plan for Iteration 3 Polish:
  - Goal: Confirm supporting docs do not contradict canonical run-scoped behavior.
  - Changes made: Pending.
  - Test plan: Search and mirror checks.
  - Red phase evidence: Not applicable; docs-only missing-test exception.
  - Green phase evidence: Pending.
  - Refactor phase evidence: Pending.
  - Test commands run: Pending.
  - Verification command/result: Pending.
  - Review findings: Pending.
  - Acceptance status: Pending.
  - Remaining issues: Pending.
  - Next action: Pending.
- Test plan: Documentation searches, installer syntax check, template existence check.
- Red phase evidence: Not applicable; docs-only missing-test exception.
- Green phase evidence: Pending.
- Refactor phase evidence: Pending.
- Test commands run: Pending.
- Acceptance criteria:
  - [ ] README explains the worktree-scoped artifact model and setup commands.
  - [ ] Shared `_workflow/index.md` and `_workflow/runs/README.md` are documented.
  - [ ] Installer/template support includes `_workflow`.
  - [ ] Supporting docs avoid active shared artifact guidance.
- Acceptance result: Pending.
- Verification commands: `rg "git clone --bare|git worktree add|_workflow/runs|_workflow/index.md|CODEX_WORKFLOW_RUN_ID|conflict" README.md AGENTS.md docs/PROMPTS.md templates`; `bash -n scripts/install.sh`
- Stop condition: Stop if installer/template changes would overwrite unrelated user files without clear install behavior.
- Out-of-scope items: App code, deleting legacy artifacts.

### TASK-003: Verify merge-safe artifact documentation and finalize

- Status: Done
- Priority: P1
- Parallel safe: no
- Depends on: TASK-001, TASK-002
- Blocks: final response
- File locks: workflow final artifacts, `_progress/progress.md`, `_handoff/current.md`, `_review/2026-05-23-worktree-scoped-workflow-artifacts.md`, `_release/2026-05-23-worktree-scoped-workflow-artifacts.md`, `_summary/2026-05-23-worktree-scoped-workflow-artifacts.md`
- Claim status: done
- Claimed by: orchestrator
- Agent role: orchestrator
- Merge risk: low
- Objective: Prove the requested final audit criteria and complete review/release/summary/handoff artifacts.
- Files likely affected: `_progress/progress.md`, `_handoff/current.md`, `_review/2026-05-23-worktree-scoped-workflow-artifacts.md`, `_release/2026-05-23-worktree-scoped-workflow-artifacts.md`, `_summary/2026-05-23-worktree-scoped-workflow-artifacts.md`, this task plan.
- Checklist:
  - Run requested final audit searches.
  - Run `git diff --check`, `git diff --stat`, and `git diff`.
  - Document acceptance results.
  - Create review, release notes, and summary.
  - Update progress and handoff.
- Iteration plan for Iteration 1 Build:
  - Goal: Run targeted final audit searches.
  - Changes made: Pending.
  - Test plan: Required `rg` checks.
  - Red phase evidence: Not applicable; docs-only missing-test exception.
  - Green phase evidence: Pending.
  - Refactor phase evidence: Pending.
  - Test commands run: Pending.
  - Verification command/result: Pending.
  - Review findings: Pending.
  - Acceptance status: Pending.
  - Remaining issues: Pending.
  - Next action: Pending.
- Iteration plan for Iteration 2 Refine:
  - Goal: Run diff checks and optional app regression checks if practical.
  - Changes made: Pending.
  - Test plan: `git diff --check`, status checks, optional `npm test`/`npm run build`.
  - Red phase evidence: Not applicable; docs-only missing-test exception.
  - Green phase evidence: Pending.
  - Refactor phase evidence: Pending.
  - Test commands run: Pending.
  - Verification command/result: Pending.
  - Review findings: Pending.
  - Acceptance status: Pending.
  - Remaining issues: Pending.
  - Next action: Pending.
- Iteration plan for Iteration 3 Polish:
  - Goal: Finalize workflow artifacts and health check.
  - Changes made: Pending.
  - Test plan: Final diff audit, artifact existence, status.
  - Red phase evidence: Not applicable; docs-only missing-test exception.
  - Green phase evidence: Pending.
  - Refactor phase evidence: Pending.
  - Test commands run: Pending.
  - Verification command/result: Pending.
  - Review findings: Pending.
  - Acceptance status: Pending.
  - Remaining issues: Pending.
  - Next action: Pending.
- Test plan: Required documentation search checks, diff checks, artifact checks.
- Red phase evidence: Not applicable; docs-only missing-test exception.
- Green phase evidence: Pending.
- Refactor phase evidence: Pending.
- Test commands run: Pending.
- Acceptance criteria:
  - [ ] No active workflow artifact path is shared by all worktrees in canonical docs.
  - [ ] Run-scoped artifacts are documented.
  - [ ] Merge conflicts between dev/redesign workflow reports are avoided by documented paths.
  - [ ] Review, release notes, summary, progress, and handoff are complete.
- Acceptance result: Pending.
- Verification commands: `rg` final audit checks; `git diff --check`; `git diff --stat`; `git diff`; `git status --short`
- Stop condition: Stop if final audit shows canonical active paths still require all worktrees to edit the same generated artifact.
- Out-of-scope items: App code, commits.
