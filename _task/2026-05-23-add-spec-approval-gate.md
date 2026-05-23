# Task Plan: Add Mandatory Spec Approval Gate

- Spec file used: `_spec/2026-05-23-add-spec-approval-gate.md`
- Planning date: 2026-05-23
- Progress and summary files read: `_progress/progress.md`, `_summary/2026-05-22-setup-karebraids-mern-boilerplate.md`
- Spec approval status: Approved by direct user instruction to implement the saved approval-gate request after the previous update failed.
- Detailed spec sections used: Scope, Functional Requirements, Affected Surfaces, UX / API / Workflow Expectations, Execution Strategy, Verification Strategy, Acceptance Criteria, Risks And Mitigations, Task Extraction Notes.

## TASK-001: Add spec approval gate to workflow docs

- Status: Done
- Priority: P0
- Parallel safe: no
- Depends on: none
- Blocks: final review
- File locks: `RUN_WORKFLOW.md`, `templates/RUN_WORKFLOW.md`, `README.md`, `AGENTS.md`, `templates/AGENTS.md`, `docs/PROMPTS.md`, `templates/docs/PROMPTS.md`, `_spec/README.md`, `templates/_spec/README.md`, `_task/README.md`, `templates/_task/README.md`, `templates/WORK_REQUEST.md`, `templates/_handoff/current.md`
- Claim status: done
- Claimed by: orchestrator
- Agent role: orchestrator
- Merge risk: medium

Objective:
Document that task planning cannot run until the saved spec is shown to the user and explicitly approved.

Checklist:
- [x] Add approval gate to root and template `RUN_WORKFLOW.md`.
- [x] Add exact approval prompt.
- [x] Add continue-workflow behavior for spec-without-task-plan.
- [x] Update execution-mode and health-check wording.
- [x] Update matching README/docs/template references.
- [x] Preserve Build -> Refine -> Polish and TDD wording after approval.

Iteration plan:

### Iteration 1 - Build

- Goal: Add the canonical approval gate to `RUN_WORKFLOW.md` and `templates/RUN_WORKFLOW.md`.
- Changes made: Added approval-first execution modes, pipeline stop, continue-workflow gate resume, section `5A. Spec Approval Gate`, planning guard, and health checks.
- Test plan: Documentation search verification.
- Red phase evidence: Not applicable; docs-only change with no runtime behavior.
- Green phase evidence: `rg` confirmed exact approval prompt and gate language in root/template workflow files.
- Refactor phase evidence: Reviewed root/template wording for consistency.
- Test commands run: `rg "Spec saved at _spec/<file>.md|approve spec|Do not run this phase" RUN_WORKFLOW.md templates/RUN_WORKFLOW.md`
- Verification command/result: Passed.
- Review findings: Supporting docs also needed updates.
- Acceptance status: Partial until supporting docs were updated.
- Remaining issues: README, prompt docs, folder READMEs, and AGENTS references.
- Next action: Refine supporting docs.

### Iteration 2 - Refine

- Goal: Update matching docs and templates.
- Changes made: Updated `README.md`, `AGENTS.md`, `templates/AGENTS.md`, `docs/PROMPTS.md`, `templates/docs/PROMPTS.md`, `_spec/README.md`, templates, `_task/README.md`, templates, `templates/WORK_REQUEST.md`, and `templates/_handoff/current.md`.
- Test plan: Search for stale immediate spec-to-task wording and required approval terms.
- Red phase evidence: Not applicable; docs-only change with no runtime behavior.
- Green phase evidence: Searches found approval prompt, continue behavior, explicit approval wording, and health gates in expected files.
- Refactor phase evidence: Fixed duplicate numbering introduced in AGENTS docs.
- Test commands run: `rg` checks across workflow docs/templates.
- Verification command/result: Passed; one remaining README phrase was an approved-spec pipeline phrase, not stale immediate planning.
- Review findings: Scope stayed in workflow docs and artifacts.
- Acceptance status: Complete.
- Remaining issues: Final diff audit and artifact updates.
- Next action: Polish and finalize.

### Iteration 3 - Polish

- Goal: Run final checks and update workflow artifacts.
- Changes made: Added this task plan and final workflow artifacts.
- Test plan: `git diff --check`, targeted `rg`, `git status --short client server`.
- Red phase evidence: Not applicable; docs-only change with no runtime behavior.
- Green phase evidence: Targeted documentation checks passed.
- Refactor phase evidence: `git diff --check` passed with line-ending warnings only.
- Test commands run: `rg`, `git diff --check`, `git status --short client server`.
- Verification command/result: Passed.
- Review findings: No app files were changed by this request.
- Acceptance status: Complete.
- Remaining issues: None.
- Next action: Final response.

Acceptance criteria:
- [x] `RUN_WORKFLOW.md` documents the mandatory approval gate immediately after spec save and before `_task/` generation.
- [x] The exact approval prompt text appears in the workflow documentation.
- [x] Valid approval, revision, and cancel behaviors are documented.
- [x] `continue workflow` resumes at the spec approval gate when a spec exists but no task plan exists.
- [x] `plan-only`, `single-task`, `complete-workflow`, and `parallel-workflow` require spec approval before task planning.
- [x] Health checks fail or become partial if the gate is skipped, `_task/` is generated before approval, or execution continues without confirmation.
- [x] Matching README/docs/template references no longer describe immediate task planning before approval.
- [x] Existing Build -> Refine -> Polish and TDD-first flow after approval is preserved.

Acceptance result:
- [x] All criteria met.

Verification commands:
- `rg -n "Spec saved at _spec/<file>.md|Spec summary:|approve spec|change: <what to change>|cancel workflow|explicit user approval|Do not generate `_task/`|Do not run this phase" ...`
- `rg -n "write spec, write task plan|Generate a vertical task plan in `_task/` from the saved|execution mode is `plan-only`, stop after saving the spec and task plan" ...`
- `git diff --check`
- `git status --short client server`

Stop condition:
Stop if required approval-gate wording is missing from either root or template `RUN_WORKFLOW.md`, or if app files need edits.

Out-of-scope items:
Application code, deployment configuration, dependencies, and unrelated workflow behavior.
