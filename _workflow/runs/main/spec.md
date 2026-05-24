# Spec: Worktree-Safe Workflow Model Completion

## 1. Metadata
- Spec filename: `_workflow/runs/main/spec.md`
- Date: 2026-05-24
- Request ID / slug: `2026-05-24-worktree-safe-workflow-model`
- Request source: `_workflow/runs/main/request.md`
- Execution mode: `complete-workflow`
- Request classification: `docs`
- Scope level: `medium`
- Risk level: `medium`

## 2. Original Request
- Raw user request: Audit and complete the worktree-safe workflow model in codex-workflow-kit.
- Normalized request: Make active workflow request state run-scoped, add missing parallel templates, update installer behavior, align README/RUN_WORKFLOW/templates, preserve legacy compatibility, and complete a final merge-safety audit.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/main/request.md`

## 3. Questions And Answers
- Questions asked: None.
- Answers received: Not applicable.
- Questions skipped: The prompt supplied explicit requirements and audit criteria.
- Remaining open questions: None blocking.

## 4. Problem Definition
- Problem being solved: Root `WORK_REQUEST.md` and missing parallel templates still left workflow state partially shared across long-lived worktrees.
- Why it matters: Multiple agents in `main`, `dev`, `redesign`, and feature worktrees should not overwrite or merge the same workflow-state files.
- Current pain point: Request state and installer/template support were not fully aligned with run-scoped artifacts.
- Expected value: Active workflow memory is namespaced by run id and merge-safe by default.

## 5. Current State Analysis
- Existing behavior: Most workflow artifacts were under `_workflow/runs/<run-id>/`, but request state still referenced root `WORK_REQUEST.md`; installer did not ship parallel templates; README/RUN_WORKFLOW/AGENTS/prompts had inconsistent request-state language.
- Existing architecture/components: Documentation/template repository with root files mirrored into `templates/` and copied by `scripts/install.sh`.
- Existing files/modules likely involved: `README.md`, `RUN_WORKFLOW.md`, `AGENTS.md`, `docs/PROMPTS.md`, `WORK_REQUEST.md`, `scripts/install.sh`, `templates/**`, `_workflow/**`.
- Existing data flow: Agent request intake creates spec, tasks, progress, handoff, review, verification, release notes, summary.
- Existing API/UI/CLI/workflow behavior: Docs/templates only; no app runtime behavior.
- Existing tests or verification coverage: Targeted `rg`, installer shell syntax check, template existence checks, root/template mirror check, final diff audit.

## 6. Desired End State
- Expected final behavior: Active request state is stored at `<artifact-root>/request.md`; all active workflow artifacts are run-scoped.
- User-facing outcome: README documents worktree-safe run folders and merge safety rules.
- Developer-facing outcome: Installer ships `_workflow` guidance and parallel templates.
- System/workflow outcome: Root `WORK_REQUEST.md` remains optional/manual compatibility input only.
- Backward compatibility expectations: Older repos may keep root `WORK_REQUEST.md` and legacy `_spec`, `_task`, `_progress`, `_handoff`, `_review`, `_release`, `_summary` folders.

## 7. Scope
- In scope: Workflow docs, templates, installer, `_workflow` guidance, parallel template files, run-scoped workflow artifacts for this run.
- Out of scope: App code, dependency changes, deployment changes, deleting legacy artifacts.
- Non-goals: Solving implementation-file merge conflicts.
- Explicit boundaries: No active workflow artifact should require multiple worktrees to edit the same file.

## 8. Users And Use Cases
- Primary users: Developers running Codex agents in long-lived git worktrees.
- Secondary users: Teams installing this workflow kit into existing repos.
- Main use cases: `main`, `dev`, and `redesign` worktrees run independent workflows.
- Edge use cases: Branch names with slashes, detached HEAD, legacy repos with root `WORK_REQUEST.md`.

## 9. Functional Requirements
- Required behaviors: Run-scoped request state; root `WORK_REQUEST.md` compatibility only; committed parallel templates; installer copies required `_workflow` files; docs include merge safety rules.
- Inputs: Direct user prompt, `<artifact-root>/request.md`, optional root `WORK_REQUEST.md` as legacy input.
- Outputs: Updated docs/templates/installer and final audit.
- State changes: Active workflow request state moves to run scope.
- Error states: Missing run request may fall back to root `WORK_REQUEST.md` only as manual legacy input.
- Permissions/auth expectations: Not applicable.

## 10. Non-Functional Requirements
- Performance expectations: Not applicable.
- Reliability expectations: Deterministic run-scoped paths.
- Security/privacy expectations: No secrets added.
- Accessibility expectations: Documentation stays clear and scannable.
- Maintainability expectations: Root/template workflow docs remain mirrored.
- DX expectations: Installer output explains the new model.

## 11. Affected Surfaces
- Files likely affected: `README.md`, `RUN_WORKFLOW.md`, `AGENTS.md`, `WORK_REQUEST.md`, `docs/PROMPTS.md`, `scripts/install.sh`, `templates/**`, `_workflow/**`, `_workflow/runs/main/**`.
- Directories likely affected: `_workflow/`, `templates/_workflow/`.
- UI surfaces: Not applicable.
- API routes: Not applicable.
- Components: Not applicable.
- Services: Not applicable.
- Database/schema: Not applicable.
- Config/env vars: `CODEX_WORKFLOW_RUN_ID` documentation only.
- Tests: Docs/search verification.
- Docs: Core workflow docs and templates.
- Workflow artifacts: Run-scoped artifacts under `_workflow/runs/main/`.

## 12. Dependency And Integration Map
- Internal dependencies: `RUN_WORKFLOW.md` mirrors `templates/RUN_WORKFLOW.md`; `scripts/install.sh` depends on `templates/_workflow/**` existing.
- External packages/services: None.
- Integration points: Git branch/worktree detection; installer file copy.
- Ordering constraints: Add templates before installer verification.
- Migration/setup requirements: Keep legacy files as compatibility only.

## 13. Data And State Impact
- Data models: Not applicable.
- Database changes: None.
- State management changes: Workflow state path changes in docs/templates.
- Cache/session/local storage impact: None.
- Backward compatibility impact: Root `WORK_REQUEST.md` remains manual input only.

## 14. UX / API / Workflow Expectations
- UX expectations: Not applicable.
- API contract expectations: Not applicable.
- CLI/workflow behavior: Detect run context first; write active state to `<artifact-root>/request.md` and sibling run-scoped files.
- Error handling expectations: Preserve run folders and regenerate aggregate/index state after merge.
- Empty/loading/success/failure states: Not applicable.

## 15. Execution Strategy
- Recommended implementation approach: Update canonical docs, add templates, update installer, mirror template files, run final audit.
- Suggested sequencing: Request model first, templates/installer second, final consistency audit third.
- Safe rollout/migration approach: Retain root `WORK_REQUEST.md` and legacy folders as compatibility only.
- Files to inspect before editing: README, RUN_WORKFLOW, AGENTS, install script, templates, `_workflow` guidance.
- Decisions to avoid until more evidence exists: No deletion of historical artifacts.

## 16. Verification Strategy
- Required automated checks: `rg` consistency checks, template existence checks, `bash -n scripts/install.sh`, `git diff --check`, final diff audit.
- Required manual checks: Answer the seven requested audit questions.
- Test types needed: Documentation/template verification.
- Build/lint/typecheck expectations: Not applicable for docs-only change.
- Acceptance evidence required: Command outputs and final verdict.
- Proof of completion: Updated docs/templates/installer and run-scoped verification/review/summary.

## 17. Acceptance Criteria
- [x] Active request state uses `_workflow/runs/<run-id>/request.md`.
- [x] Root `WORK_REQUEST.md` is compatibility/manual only.
- [x] Parallel templates exist and contain required fields.
- [x] Installer ships `_workflow/index.md`, `_workflow/runs/README.md`, and parallel templates.
- [x] README and RUN_WORKFLOW are consistent.
- [x] `main`, `dev`, and `redesign` worktrees can write workflow state to separate run folders.
- [x] Merge safety rules are explicit.

## 18. Edge Cases And Failure Modes
- Edge cases: Legacy repos with root request file; branches with slash characters; installer target already has files.
- Failure modes: Stale docs reintroduce root auto-sync; installer omits templates.
- Regression risks: Weakening spec approval or task evidence rules while editing workflow docs.
- Recovery expectations: Search for stale phrases and mirror canonical docs.

## 19. Risks And Mitigations
- Technical risks: Mixed legacy/current language. Mitigation: targeted stale-reference searches.
- Product/UX risks: Users may misunderstand `WORK_REQUEST.md`. Mitigation: mark compatibility/manual only in README, RUN_WORKFLOW, AGENTS, templates, installer output.
- Security risks: None found.
- Scope risks: Legacy cleanup beyond request. Mitigation: preserve compatibility.
- Mitigation plan: Final audit and diff review.

## 20. Assumptions
- Explicit assumptions: Docs-only verification is sufficient; no runtime tests are needed because no app code changed.
- Confidence level: High.
- What to revisit if assumptions are wrong: Add installer integration tests or a helper script in a future task.

## 21. Open Questions
- Blocking questions: None.
- Non-blocking questions: Whether to remove root `WORK_REQUEST.md` from future major versions.
- Execution impact: None.

## 22. Task Extraction Notes
- Suggested vertical task boundaries: one docs/template/installer consistency pass.
- Suggested first task: Move request-state guidance to `<artifact-root>/request.md`.
- Suggested task ordering: Request model, parallel templates, installer, README/RUN consistency, audit.
- Areas that should not become separate tasks: App code and legacy artifact deletion.
- How the 3-pass Build -> Refine -> Polish loop should apply: Build primary edits, refine stale references, polish with final audit.
