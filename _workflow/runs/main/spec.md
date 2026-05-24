# Spec: Fix Missing Parallel Template Files

## 1. Metadata
- Spec filename: `_workflow/runs/main/spec.md`
- Date: 2026-05-24
- Request ID / slug: `2026-05-24-fix-parallel-template-files`
- Request source: Latest direct user prompt synced to `_workflow/runs/main/request.md`
- Execution mode: `complete-workflow`
- Request classification: `docs`
- Scope level: `small`
- Risk level: `medium`

## 2. Original Request
- Raw user request: Fix the missing parallel template file issue in codex-workflow-kit by creating `templates/_workflow/runs/parallel/`, adding reusable `claims.md`, `locks.md`, and `agent-status.md` templates with specified fields, auditing `scripts/install.sh`, and aligning README/workflow docs around run-scoped request state, compatibility-only `WORK_REQUEST.md`, template locations, branch/worktree-scoped workflow memory, and no shared active workflow artifact edits across branches.
- Normalized request: Ensure the parallel coordination templates are present, complete, installed, and documented consistently with the worktree-safe workflow model.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/main/request.md`

## 3. Questions And Answers
- Questions asked: None.
- Answers received: Not applicable.
- Questions skipped: The request is explicit and narrow enough to proceed after the required spec approval gate.
- Remaining open questions: None blocking.

## 4. Problem Definition
- Problem being solved: `scripts/install.sh` references parallel coordination template files that must exist under `templates/_workflow/runs/parallel/`; missing or incomplete templates can break installs or leave parallel workflow docs inconsistent.
- Why it matters: The workflow kit must install cleanly into target repos and preserve worktree-safe workflow state for long-lived branch work.
- Current pain point: Existing untracked parallel templates are present locally, but the audit found they omit the required `Notes` field in all three files. The current docs also need a focused consistency check for the exact template source path and run-scoped request-state model.
- Expected value: Installer behavior, template files, and docs agree; target repos receive reusable parallel coordination templates; active workflow artifacts remain branch/worktree scoped.

## 5. Current State Analysis
- Existing behavior: `scripts/install.sh` currently copies `templates/_workflow/runs/parallel/claims.md`, `locks.md`, and `agent-status.md` into `_workflow/runs/parallel/` in the target repo. Local untracked template files already exist at the requested source path.
- Existing architecture/components: This is a docs/template/installer repository. Root workflow files are mirrored into `templates/` for installation into other repos.
- Existing files/modules likely involved: `templates/_workflow/runs/parallel/claims.md`, `templates/_workflow/runs/parallel/locks.md`, `templates/_workflow/runs/parallel/agent-status.md`, `scripts/install.sh`, `README.md`, `templates/RUN_WORKFLOW.md`, `templates/_workflow/runs/README.md`, `templates/WORK_REQUEST.md`, and run-scoped workflow artifacts.
- Existing data flow: The installer copies template files from `templates/` into a target repository. Workflow runs create active artifacts under `_workflow/runs/<run-id>/`; parallel execution copies or initializes coordination files under `<artifact-root>/parallel/`.
- Existing API/UI/CLI/workflow behavior: CLI installer only; no app runtime behavior and no UI.
- Existing tests or verification coverage: Manual/documentation checks via `Test-Path`, `rg`, `bash -n scripts/install.sh`, and final diff audit.

## 6. Desired End State
- Expected final behavior: All three parallel template files exist under `templates/_workflow/runs/parallel/`, include all required fields including `Notes`, and are installed by `scripts/install.sh`.
- User-facing outcome: Users installing the kit receive complete parallel coordination templates.
- Developer-facing outcome: README and workflow templates clearly describe run-scoped request state, compatibility-only `WORK_REQUEST.md`, and merge-safe active workflow memory.
- System/workflow outcome: Active artifacts are branch/worktree scoped; no active workflow artifact requires multiple branches to edit the same file.
- Backward compatibility expectations: Root `WORK_REQUEST.md` remains as optional/manual compatibility input. Installer target paths remain `_workflow/runs/parallel/...` unless evidence shows behavior must change.

## 7. Scope
- In scope: Complete the three parallel template markdown files, verify installer copy behavior, fix documentation inconsistencies in the requested files, run final audit, and update run-scoped workflow artifacts.
- Out of scope: App/runtime code, dependency changes, deployment changes, deleting legacy workflow artifacts, changing installer target behavior unless required by the audit.
- Non-goals: Reworking the full workflow system, changing parallel execution semantics beyond template/docs consistency, or committing changes.
- Explicit boundaries: Keep edits limited to requested template, docs, installer, and workflow artifact files.

## 8. Users And Use Cases
- Primary users: Developers and agents installing or using codex-workflow-kit.
- Secondary users: Parallel worker/orchestrator agents using installed coordination files.
- Main use cases: Install workflow kit into a target repo; initialize run-scoped parallel claims/locks/status files; run multiple long-lived worktrees without workflow-state merge conflicts.
- Edge use cases: Existing target files are skipped unless `--force`; legacy users may still manually use root `WORK_REQUEST.md`; multiple worktrees may merge `_workflow` history later.

## 9. Functional Requirements
- Required behaviors: Create/complete `claims.md`, `locks.md`, and `agent-status.md`; include every user-listed field; keep templates reusable; ensure installer references the template source files; align requested docs.
- Inputs: Existing docs/templates/installer and the latest user request.
- Outputs: Updated markdown templates/docs and any required run-scoped workflow artifacts.
- State changes: Repository file content changes only; no runtime state.
- Error states: Installer should not fail because referenced template source files are absent.
- Permissions/auth expectations: Not applicable.

## 10. Non-Functional Requirements
- Performance expectations: Not applicable beyond fast shell checks.
- Reliability expectations: Installer source files must exist and shell syntax must remain valid.
- Security/privacy expectations: Do not add secrets or sensitive values.
- Accessibility expectations: Not applicable; no UI.
- Maintainability expectations: Markdown templates should be clear, reusable, and field-complete.
- DX expectations: Installed templates should make worker claims, file locks, and status easy to fill in consistently.

## 11. Affected Surfaces
- Files likely affected: `templates/_workflow/runs/parallel/claims.md`, `templates/_workflow/runs/parallel/locks.md`, `templates/_workflow/runs/parallel/agent-status.md`, possibly `README.md`, `templates/RUN_WORKFLOW.md`, `templates/_workflow/runs/README.md`, `templates/WORK_REQUEST.md`, `scripts/install.sh`.
- Directories likely affected: `templates/_workflow/runs/parallel/`, `_workflow/runs/main/`.
- UI surfaces: Not applicable.
- API routes: Not applicable.
- Components: Not applicable.
- Services: Not applicable.
- Database/schema: Not applicable.
- Config/env vars: Not applicable.
- Tests: Documentation and installer checks only.
- Docs: Requested README/workflow/template docs.
- Workflow artifacts: `_workflow/runs/main/request.md`, `_workflow/runs/main/spec.md`, later task/progress/review/release/summary/verification/handoff artifacts after approval.

## 12. Dependency And Integration Map
- Internal dependencies: `scripts/install.sh` depends on the source files under `templates/_workflow/runs/parallel/`.
- External packages/services: Bash for installer syntax check; ripgrep for audit searches when available.
- Integration points: Installed target repo receives `_workflow/runs/parallel/claims.md`, `locks.md`, and `agent-status.md`.
- Ordering constraints: Approve spec, generate task plan, then edit templates/docs/installer and verify.
- Migration/setup requirements: None.

## 13. Data And State Impact
- Data models: Not applicable.
- Database changes: None.
- State management changes: Workflow state documentation only.
- Cache/session/local storage impact: None.
- Backward compatibility impact: Preserves `WORK_REQUEST.md` as manual compatibility input; installer still skips existing files unless `--force`.

## 14. UX / API / Workflow Expectations
- UX expectations: Not applicable.
- API contract expectations: Not applicable.
- CLI/workflow behavior: `scripts/install.sh` should continue to copy the three parallel templates from `templates/_workflow/runs/parallel/`.
- Error handling expectations: Installer should not reference absent source files.
- Empty/loading/success/failure states: Not applicable.

## 15. Execution Strategy
- Recommended implementation approach: Treat this as one docs/template vertical slice. First repair the three template files to include all required fields, especially `Notes`; then audit installer and requested docs; change only inconsistencies found; finally run targeted checks and final diff audit.
- Suggested sequencing: Template completion, installer audit, docs consistency audit, verification/final artifacts.
- Safe rollout/migration approach: Keep target install paths unchanged unless verification shows a real mismatch.
- Files to inspect before editing: Requested template files, `scripts/install.sh`, `README.md`, `templates/RUN_WORKFLOW.md`, `templates/_workflow/runs/README.md`, `templates/WORK_REQUEST.md`.
- Decisions to avoid until more evidence exists: Do not introduce new parallel formats or installer behavior beyond requested consistency.

## 16. Verification Strategy
- Required automated checks: `Test-Path` for the three template files; `rg` checks for required fields and requested wording; `bash -n scripts/install.sh`; final `git diff --stat` and `git diff`.
- Required manual checks: Confirm docs agree on run-scoped request state, compatibility-only `WORK_REQUEST.md`, template source location, branch/worktree scoped memory, and no shared active artifact requirement.
- Test types needed: Documentation/template/installer checks only.
- Build/lint/typecheck expectations: No build needed; installer shell syntax check required.
- Acceptance evidence required: Final audit answering all seven user questions with `PASSED`, `PARTIAL`, or `FAILED`.
- Proof of completion: Changed files list, verification command results, and workflow artifacts after implementation.

## 17. Acceptance Criteria
- [ ] `templates/_workflow/runs/parallel/claims.md` exists and includes Task ID, Worker ID, Branch, Worktree Path, Run ID, Claim Status, Start Time, End Time, Files Expected, Files Changed, Verification Status, and Notes.
- [ ] `templates/_workflow/runs/parallel/locks.md` exists and includes File Path, Lock Owner, Worker ID, Task ID, Run ID, Reason, Lock Status, Acquired At, Released At, and Notes.
- [ ] `templates/_workflow/runs/parallel/agent-status.md` exists and includes Worker ID, Role, Branch, Worktree Path, Run ID, Current Task, Changed Files, Verification Result, Blocker, Final Status, and Notes.
- [ ] `scripts/install.sh` copies all three templates from `templates/_workflow/runs/parallel/`.
- [ ] Requested docs consistently state run-scoped `request.md`, compatibility/manual-only `WORK_REQUEST.md`, parallel template location, branch/worktree-scoped memory, and no shared active artifact requirement.
- [ ] Final audit answers the seven requested questions and reports `PASSED`, `PARTIAL`, or `FAILED`.

## 18. Edge Cases And Failure Modes
- Edge cases: Template files already exist but are incomplete; installer source exists but docs use ambiguous source/installed path wording; untracked files overlap with planned edits.
- Failure modes: `bash -n` failure, missing field in template, stale doc wording implying root `WORK_REQUEST.md` is active, or docs suggesting active workflow artifacts are shared.
- Regression risks: Accidentally changing installer target behavior or broad workflow semantics.
- Recovery expectations: Fix only in-scope docs/template/script issues and rerun the exact failing check.

## 19. Risks And Mitigations
- Technical risks: Existing dirty/untracked files overlap with the planned template paths. Mitigation: surface the overlap before implementation and modify only the requested files after explicit spec approval.
- Product/UX risks: Confusing source template paths with installed target paths. Mitigation: use explicit wording where needed.
- Security risks: Low; avoid adding secrets.
- Scope risks: Workflow docs are broad. Mitigation: limit changes to requested consistency issues.
- Mitigation plan: Use targeted `rg` searches and final diff audit.

## 20. Assumptions
- Explicit assumptions: The existing installer target paths `_workflow/runs/parallel/...` are intentional static installed templates, while source templates live under `templates/_workflow/runs/parallel/...`.
- Confidence level: High.
- What to revisit if assumptions are wrong: If target repos should instead install only under a specific run id, installer behavior would need a broader design change outside this request.

## 21. Open Questions
- Blocking questions: Existing dirty/untracked files overlap the planned edit paths. Approval of this spec will be treated as approval to update those in-scope files in place.
- Non-blocking questions: None.
- Execution impact: No implementation will proceed until the spec is approved.

## 22. Task Extraction Notes
- Suggested vertical task boundaries: One task is sufficient: complete parallel templates and align installer/docs.
- Suggested first task: `TASK-001: Complete parallel templates and consistency audit`.
- Suggested task ordering: Create/complete templates, verify installer, audit docs, finalize workflow artifacts.
- Areas that should not become separate tasks: App code, deployment, dependency changes, broad workflow redesign.
- How the 3-pass Build -> Refine -> Polish loop should apply: Build completes the templates, Refine repairs installer/docs inconsistencies, Polish runs verification and final audit.
