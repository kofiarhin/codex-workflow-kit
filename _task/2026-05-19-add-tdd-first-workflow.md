# Task Plan: Add TDD-First Workflow Rule

- Spec file used: `_spec/2026-05-19-add-tdd-first-workflow.md`
- Planning date: 2026-05-19
- Progress and summary files read: `_progress/progress.md`; latest relevant `_summary/2026-05-15-add-parallel-multi-agent-workflow.md`
- Handoff read: `_handoff/current.md`
- Execution mode: `complete-workflow`
- Dirty worktree protection: Initial `git status --short` returned `?? notes.txt`. Planned files are workflow docs/templates and workflow artifacts. `notes.txt` is unrelated and will not be touched. Overlap risk: none.

## Detailed Spec Sections Used

- Current State Analysis: existing 3-pass workflow and docs/templates structure.
- Desired End State: strict TDD-first behavior for code-changing tasks.
- Affected Surfaces: root/template workflow docs, task/progress memory, README/prompts/AGENTS, workflow artifacts.
- Dependency And Integration Map: root/template alignment and installer-template behavior.
- UX / API / Workflow Expectations: workflow behavior only, no API/UI changes.
- Execution Strategy: update canonical workflow docs first, then supporting docs and final artifacts.
- Verification Strategy: targeted searches, mirror checks, `npm test`, `npm run build`, `git diff --check`, final diff audit.
- Acceptance Criteria: TDD-first rules, evidence fields, review/health gates, preservation of existing workflow structure.
- Edge Cases And Failure Modes: docs-only tasks and justified missing-test exceptions.
- Risks And Mitigations: avoid root/template divergence and unrelated app/runtime edits.
- Assumptions: TDD enforcement is prompt/documentation enforcement for future code generation.
- Open Questions: no blockers.
- Task Extraction Notes: two sequential tasks.

## TASK-001: Add TDD-first rules to workflow and templates

- Status: Done
- Priority: `P0`
- Parallel safe: `no`
- Depends on: none
- Blocks: `TASK-002`
- File locks: `RUN_WORKFLOW.md`, `templates/RUN_WORKFLOW.md`, `_task/README.md`, `templates/_task/README.md`, `_progress/progress.md`, `templates/_progress/progress.md`, `README.md`, `docs/PROMPTS.md`, `templates/docs/PROMPTS.md`, `AGENTS.md`, `templates/AGENTS.md`
- Claim status: `done`
- Claimed by: orchestrator
- Agent role: `orchestrator`
- Merge risk: `medium`

Objective:
Extend existing workflow docs/templates so code-changing tasks require TDD-first Red/Green/Refactor evidence inside every Build, Refine, and Polish iteration.

Detailed spec sections used or referenced:
Sections 5, 6, 11, 14, 15, 16, 17, 18, 19, and 22.

Files likely affected:
`RUN_WORKFLOW.md`, `templates/RUN_WORKFLOW.md`, `_task/README.md`, `templates/_task/README.md`, `_progress/progress.md`, `templates/_progress/progress.md`, `README.md`, `docs/PROMPTS.md`, `templates/docs/PROMPTS.md`, `AGENTS.md`, `templates/AGENTS.md`.

Checklist:
- [x] Add canonical TDD-first execution rules to `RUN_WORKFLOW.md` and template copy.
- [x] Embed Red/Green/Refactor inside each Build, Refine, and Polish iteration.
- [x] Add task evidence fields for test plan, Red phase evidence, Green phase evidence, Refactor phase evidence, test commands run, and acceptance result.
- [x] Add progress/review/health rules that block `Done` for code tasks without TDD evidence or justified exception.
- [x] Update README/docs/prompts/agent guide only where needed.
- [x] Preserve existing workflow structure and modes.

Test plan:
- Docs-only task: no app test should be added. Missing-test exception: no app/runtime behavior changes are made.
- Use targeted `rg` checks to verify TDD wording and preservation of existing workflow terms.
- Run available repo verification after docs edits.

Iteration plan:

### Iteration 1 - Build
- Goal: Add the smallest complete TDD-first rule set to canonical workflow and task evidence docs.
- Changes made: Added TDD-first prerequisites, pipeline wording, task fields, iteration fields, execution-loop Red/Green/Refactor requirements, verification requirements, review fields, critique checks, and health checks to root/template workflow docs; added TDD fields to task/progress docs and supporting README/prompts/AGENTS.
- Red phase evidence: Not applicable for this docs-only task; no app code behavior changes.
- Green phase evidence: Targeted documentation checks found TDD terms across required workflow docs.
- Refactor phase evidence: Root/template mirror checks for `RUN_WORKFLOW.md`, `_task/README.md`, and `docs/PROMPTS.md` returned no content differences, with line-ending warnings only.
- Test commands run: `rg "TDD-first|Red phase|Green phase|Refactor phase|failing test|missing-test exception" ...`; `rg "complete-workflow|Planned -> Ready -> In Progress -> Verified -> Reviewed -> Done|dirty worktree|_handoff|_release|parallel-workflow" ...`; `git diff --no-index -- RUN_WORKFLOW.md templates/RUN_WORKFLOW.md`; `git diff --no-index -- _task/README.md templates/_task/README.md`; `git diff --no-index -- docs/PROMPTS.md templates/docs/PROMPTS.md`.
- Verification command/result: Targeted searches passed; mirror checks returned no content differences, with line-ending warnings only.
- Review findings: Core TDD language was present. Refine needed one status rule to explicitly mention post-refactor verification and README health wording to mention TDD evidence.
- Acceptance status: Partially met before refine.
- Remaining issues: Post-refactor verification wording needed tightening in one rule; README health missing TDD evidence mention.
- Next action: Refine wording and alignment.

### Iteration 2 - Refine
- Goal: Tighten wording, root/template alignment, and review/health gates.
- Changes made: Tightened code-task `Done` rules in root/template workflow docs to require post-refactor verification; updated README health-gap wording to include TDD-first evidence.
- Red phase evidence: Not applicable for this docs-only task; no app code behavior changes.
- Green phase evidence: Targeted TDD and preservation searches continued to pass after wording refinements.
- Refactor phase evidence: Root/template workflow and task docs remained aligned.
- Test commands run: Same targeted `rg` checks and mirror checks as Iteration 1.
- Verification command/result: Passed.
- Review findings: Required TDD fields and preservation terms are present across canonical workflow, templates, prompts, README, and AGENTS docs.
- Acceptance status: Met.
- Remaining issues: Broader repo verification and final artifacts pending.
- Next action: Polish and run broader verification.

### Iteration 3 - Polish
- Goal: Confirm no regressions to existing workflow structure and complete final docs checks.
- Changes made: Reviewed edited sections for consistency and completed task evidence.
- Red phase evidence: Not applicable for this docs-only task; no app code behavior changes.
- Green phase evidence: Required TDD-first and workflow-preservation terms are present.
- Refactor phase evidence: No app/runtime files were edited during this task.
- Test commands run: Targeted `rg` checks; root/template mirror checks.
- Verification command/result: Passed, with line-ending warnings only on no-index mirror checks.
- Review findings: No remaining TASK-001 issues.
- Acceptance status: Met.
- Remaining issues: Final verification and final diff audit pending in TASK-002.
- Next action: Continue to final verification task.

Acceptance criteria:
- [x] Canonical workflow docs require Red/Green/Refactor for code-changing tasks.
- [x] Build -> Refine -> Polish embeds TDD inside every iteration.
- [x] Task/progress evidence fields include TDD phases and test commands.
- [x] Review/health gates block code-task `Done` without TDD evidence or justified missing-test exception.
- [x] Existing complete-workflow, statuses, artifacts, dirty worktree, progress, handoff, review, release, summary, health check, and parallel behavior remain documented.

Acceptance result:
- [x] All TASK-001 criteria met.

Verification commands:
- `rg "TDD-first|Red phase|Green phase|Refactor phase|failing test|missing-test exception" RUN_WORKFLOW.md templates/RUN_WORKFLOW.md _task/README.md templates/_task/README.md _progress/progress.md templates/_progress/progress.md README.md docs/PROMPTS.md templates/docs/PROMPTS.md AGENTS.md templates/AGENTS.md`
- `rg "complete-workflow|Planned -> Ready -> In Progress -> Verified -> Reviewed -> Done|dirty worktree|_handoff|_release|parallel-workflow" RUN_WORKFLOW.md templates/RUN_WORKFLOW.md README.md AGENTS.md templates/AGENTS.md`
- `git diff --no-index -- RUN_WORKFLOW.md templates/RUN_WORKFLOW.md`
- `git diff --no-index -- _task/README.md templates/_task/README.md`

Stop condition:
Stop if TDD rules conflict with existing workflow statuses/modes, or if unrelated dirty files overlap with planned edits.

Out-of-scope items:
App/runtime code, new dependencies, deployment config, commits.

## TASK-002: Verify and finalize TDD-first workflow update

- Status: Done
- Priority: `P1`
- Parallel safe: `no`
- Depends on: `TASK-001`
- Blocks: final response
- File locks: workflow final artifacts, `_progress/progress.md`, `_handoff/current.md`, `_review/2026-05-19-add-tdd-first-workflow.md`, `_release/2026-05-19-add-tdd-first-workflow.md`, `_summary/2026-05-19-add-tdd-first-workflow.md`
- Claim status: `done`
- Claimed by: orchestrator
- Agent role: `orchestrator`
- Merge risk: `low`

Objective:
Run final verification, document review/release/summary/handoff/progress, and report the final diff audit.

Detailed spec sections used or referenced:
Sections 16, 17, 18, 19, and 22.

Files likely affected:
`_task/2026-05-19-add-tdd-first-workflow.md`, `_progress/progress.md`, `_handoff/current.md`, `_review/2026-05-19-add-tdd-first-workflow.md`, `_release/2026-05-19-add-tdd-first-workflow.md`, `_summary/2026-05-19-add-tdd-first-workflow.md`.

Checklist:
- [x] Run targeted TDD and preservation searches.
- [x] Run repo tests/build/checks available for docs-only changes.
- [x] Run final diff audit.
- [x] Create review, release notes, summary, and final handoff.
- [x] Confirm no app/runtime files changed.

Test plan:
- Docs-only finalization: no app test should be added. Missing-test exception: no app/runtime behavior changes are made.
- Run repo-level tests/build to catch accidental breakage.

Iteration plan:

### Iteration 1 - Build
- Goal: Run targeted documentation verification.
- Changes made: Ran targeted TDD-first search and existing workflow preservation search.
- Red phase evidence: Not applicable for docs-only finalization.
- Green phase evidence: TDD-first search passed and found required Red/Green/Refactor, missing-test exception, expected-failure, and post-refactor verification wording.
- Refactor phase evidence: Existing workflow preservation search passed, confirming `complete-workflow`, `single-task`, `parallel-workflow`, dirty worktree, handoff, release, health check, and lifecycle status terms remain.
- Test commands run: Targeted TDD `rg`; workflow preservation `rg`.
- Verification command/result: Passed.
- Review findings: Required documentation coverage is present.
- Acceptance status: Met.
- Remaining issues: Broader repo verification pending.
- Next action: Run broader verification.

### Iteration 2 - Refine
- Goal: Run broader repo verification and address any in-scope issues.
- Changes made: Ran repo test/build and diff hygiene checks.
- Red phase evidence: Not applicable for docs-only finalization.
- Green phase evidence: `npm test` passed; `npm run build` passed.
- Refactor phase evidence: `git diff --check` passed with line-ending normalization warnings only.
- Test commands run: `npm test`; `npm run build`; `git diff --check`; `git status --short`.
- Verification command/result: Passed.
- Review findings: No app/runtime changes were present in `client/` or `server/`; existing untracked `notes.txt` remains unrelated.
- Acceptance status: Met.
- Remaining issues: Final diff audit and artifacts pending.
- Next action: Final diff audit and artifacts.

### Iteration 3 - Polish
- Goal: Run final diff audit and write final workflow artifacts.
- Changes made: Ran `git diff --stat`, `git diff`, and `git status --short client server`; created review, release notes, and summary artifacts.
- Red phase evidence: Not applicable for docs-only finalization.
- Green phase evidence: Final diff audit commands ran and confirmed docs/workflow-artifact scope.
- Refactor phase evidence: `git status --short client server` returned no app/runtime changes.
- Test commands run: `git diff --stat`; `git diff`; `git status --short client server`.
- Verification command/result: Passed.
- Review findings: Final audit found no unrelated edits, no app/runtime changes, no generated junk, and no secrets.
- Acceptance status: Met.
- Remaining issues: None.
- Next action: Final response.

Acceptance criteria:
- [x] Required TDD-first wording is verified.
- [x] Existing workflow structure preservation is verified.
- [x] Review, release notes, summary, progress, and handoff are updated.
- [x] Final diff audit is documented.
- [x] No app/runtime code changed.

Acceptance result:
- [x] All TASK-002 criteria met.

Verification commands:
- `rg "TDD-first|Red phase|Green phase|Refactor phase|missing-test exception|failing test was observed" RUN_WORKFLOW.md templates/RUN_WORKFLOW.md _task/README.md templates/_task/README.md _progress/progress.md templates/_progress/progress.md README.md docs/PROMPTS.md templates/docs/PROMPTS.md AGENTS.md templates/AGENTS.md`
- `npm test`
- `npm run build`
- `git diff --check`
- `git diff --stat`
- `git diff`
- `git status --short`

Stop condition:
Stop if required verification fails for in-scope reasons that cannot be corrected safely, or if the final diff includes app/runtime changes.

Out-of-scope items:
App/runtime code, new dependencies, deployment config, commits.
