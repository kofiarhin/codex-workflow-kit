# Spec: Worktree-Scoped Workflow Artifacts

## 1. Metadata

- Spec filename: `_spec/2026-05-23-worktree-scoped-workflow-artifacts.md`
- Date: 2026-05-23
- Request ID / slug: `2026-05-23-worktree-scoped-workflow-artifacts`
- Request source: Latest direct user prompt synced into `WORK_REQUEST.md`
- Execution mode: `complete-workflow`
- Request classification: `docs`
- Scope level: `medium`
- Risk level: `medium`

## 2. Original Request

- Raw user request: Update codex-workflow-kit to support long-lived git worktrees without workflow artifact merge conflicts by moving active workflow artifacts into branch/worktree-scoped `_workflow/runs/<branch-or-worktree-id>/` directories, documenting run-id derivation and override, updating README/RUN_WORKFLOW, adding bare repo worktree commands, and adding conflict recovery guidance.
- Normalized request: Make future workflow artifact guidance and templates run-scoped by default so separate agents working in separate git worktrees write only to their own `_workflow/runs/<run-id>/` artifact directory, with only optional append-only or index-only shared files.
- Source prompt / WORK_REQUEST reference: `WORK_REQUEST.md`

## 3. Questions And Answers

- Questions asked: None. The request supplied concrete required behavior, artifact paths, run-id rules, setup commands, conflict recovery guidance, and final audit criteria.
- Answers received: Not applicable.
- Questions skipped: Clarifying questions were skipped because the remaining uncertainties are implementation-detail choices that can be documented as assumptions and reviewed at the spec approval gate.
- Remaining open questions: Whether to remove legacy `_spec/`, `_task/`, `_progress/`, `_handoff/`, `_review/`, `_release/`, and `_summary/` guidance entirely or keep it as compatibility history. This spec assumes the new `_workflow/runs/<run-id>/` model becomes canonical for future runs while legacy folders may remain as existing historical artifacts.

## 4. Problem Definition

- Problem being solved: Long-lived git worktrees each run Codex agents independently, but generated workflow artifacts currently target shared paths such as `_spec/`, `_task/`, `_progress/progress.md`, `_handoff/current.md`, `_review/`, `_release/`, and `_summary/`, creating avoidable merge conflicts.
- Why it matters: Users with bare repo plus multiple worktrees need implementation changes from separate branches to merge without unrelated generated report/state conflicts.
- Current pain point: Multiple branches can edit the same workflow state/report files even when their application code changes are isolated.
- Expected value: Each worktree gets isolated workflow state, reducing merge conflicts and making agent output easier to preserve.

## 5. Current State Analysis

- Existing behavior: The active workflow docs direct agents to write specs to `_spec/`, task plans to `_task/`, progress to `_progress/progress.md`, live state to `_handoff/current.md`, reviews to `_review/`, release notes to `_release/`, and summaries to `_summary/`.
- Existing architecture/components: The repo is a workflow-kit/documentation repo with mirrored root and `templates/` workflow files. `scripts/install.sh` copies templates into target projects.
- Existing files/modules likely involved: `README.md`, `RUN_WORKFLOW.md`, `AGENTS.md`, `docs/PROMPTS.md`, folder README files, `templates/RUN_WORKFLOW.md`, `templates/AGENTS.md`, `templates/docs/PROMPTS.md`, template workflow folders, and `scripts/install.sh`.
- Existing data flow: A request is synced into `WORK_REQUEST.md`, a spec is saved, user approves it, tasks are generated, progress/handoff/review/release/summary artifacts are updated.
- Existing API/UI/CLI/workflow behavior: Docs-only workflow; no runtime API or UI behavior.
- Existing tests or verification coverage: No documentation unit tests. Available checks are targeted `rg` searches, `git diff --check`, root/template mirror comparisons, `bash -n scripts/install.sh`, and optionally `npm test`/`npm run build` to prove no app regression.

## 6. Desired End State

- Expected final behavior: Future agents first detect the current branch, worktree path, run id, and artifact root, then write active workflow artifacts under `_workflow/runs/<run-id>/`.
- User-facing outcome: README and workflow docs clearly explain how to use the kit in bare repo plus long-lived worktree setups without report merge conflicts.
- Developer-facing outcome: Templates install `_workflow/` guidance so new projects inherit run-scoped artifact paths.
- System/workflow outcome: Active artifact files become `spec.md`, `tasks.md`, `progress.md`, `review.md`, `verification.md`, `summary.md`, `handoff.md`, and `release-notes.md` inside the current run directory.
- Backward compatibility expectations: Existing historical legacy artifacts can remain in the repo. New instructions should make `_workflow/runs/<run-id>/` canonical and should not require deleting old artifacts during this docs update.

## 7. Scope

- In scope:
  - Document canonical run-scoped artifact model.
  - Add run-id detection and sanitization rules.
  - Add `CODEX_WORKFLOW_RUN_ID` override behavior.
  - Add optional/index-only shared file rules for `_workflow/index.md` and `_workflow/runs/README.md`.
  - Add bare clone/worktree setup commands.
  - Add merge-conflict recovery guidance.
  - Update root and template workflow docs so future runs use `_workflow/runs/<run-id>/`.
  - Update installer/template layout if needed so new projects receive `_workflow/` files.
- Out of scope:
  - Changing application code under `client/` or `server/`.
  - Committing changes.
  - Building an executable CLI for run-id creation unless already present.
  - Deleting historical workflow artifacts.
- Non-goals:
  - Solving merge conflicts in implementation files.
  - Creating centralized multi-agent orchestration beyond documented artifact isolation.
- Explicit boundaries:
  - Shared generated artifacts must not become required write targets for every branch.
  - Aggregation is documented as a post-merge activity only.

## 8. Users And Use Cases

- Primary users: Developers using Codex or similar agents across multiple long-lived git worktrees.
- Secondary users: Teams adopting this workflow kit into existing repositories with branch-per-agent development.
- Main use cases:
  - `main`, `dev`, and `redesign` worktrees each run workflows independently.
  - Feature branch names containing slashes produce safe directory names.
  - A user overrides the run id with `CODEX_WORKFLOW_RUN_ID` for detached HEAD or custom worktree names.
- Edge use cases:
  - Detached HEAD, empty branch name, or duplicate branch names across separate bare clones.
  - Merge conflict in old legacy workflow folders.
  - Shared index changed by multiple branches.

## 9. Functional Requirements

- Required behaviors:
  - Agents must detect current branch, current worktree path, run id, and artifact root before writing workflow artifacts.
  - Default run id must derive from the current branch name.
  - Slashes in branch names must be sanitized into double underscores or hyphens.
  - `CODEX_WORKFLOW_RUN_ID` must override branch-derived run id.
  - Active artifacts must be written to `_workflow/runs/<run-id>/`.
  - Agents must only update their own run directory.
  - Shared files must be optional, append-only, or index-only.
  - Final summary aggregation must happen only after merge.
  - Conflict recovery guidance must preserve run directories and avoid line-by-line report merges.
- Inputs:
  - `git branch --show-current`
  - `git rev-parse --show-toplevel`
  - `CODEX_WORKFLOW_RUN_ID`
  - Current worktree path
- Outputs:
  - Documentation and templates explaining `_workflow/runs/<run-id>/`.
  - Possibly new `_workflow/index.md`, `_workflow/runs/README.md`, and matching templates.
- State changes:
  - Future generated workflow state moves from shared legacy paths to run-scoped paths.
- Error states:
  - Missing branch name requires fallback to sanitized worktree directory name or explicit override guidance.
  - Conflicting `_workflow` files require conflict recovery guidance.
- Permissions/auth expectations: Not applicable.

## 10. Non-Functional Requirements

- Performance expectations: Not applicable; docs-only changes.
- Reliability expectations: Instructions must be deterministic enough that different agents derive the same run id in the same worktree.
- Security/privacy expectations: Do not add secrets, tokens, or private repo URLs.
- Accessibility expectations: Documentation should use clear headings, code blocks, and concise lists.
- Maintainability expectations: Root docs and templates should stay aligned; avoid introducing parallel contradictory artifact models.
- DX expectations: Commands should be copy-pasteable and explain both default and override behavior.

## 11. Affected Surfaces

- Files likely affected:
  - `README.md`
  - `RUN_WORKFLOW.md`
  - `AGENTS.md`
  - `docs/PROMPTS.md`
  - `_spec/README.md`
  - `_task/README.md`
  - `_progress/progress.md` or future guidance replacing it
  - `_handoff/current.md` or future guidance replacing it
  - `templates/RUN_WORKFLOW.md`
  - `templates/AGENTS.md`
  - `templates/docs/PROMPTS.md`
  - `templates/_spec/README.md`
  - `templates/_task/README.md`
  - `templates/_progress/progress.md`
  - `templates/_handoff/current.md`
  - `templates/_review/README.md`
  - `templates/_release/README.md`
  - `templates/_summary/README.md`
  - `scripts/install.sh`
  - `WORK_REQUEST.md`
  - New `_workflow/index.md`
  - New `_workflow/runs/README.md`
  - New `templates/_workflow/index.md`
  - New `templates/_workflow/runs/README.md`
- Directories likely affected:
  - `_workflow/`
  - `templates/_workflow/`
  - Existing workflow documentation directories.
- UI surfaces: Not applicable.
- API routes: Not applicable.
- Components: Not applicable.
- Services: Not applicable.
- Database/schema: Not applicable.
- Config/env vars: `CODEX_WORKFLOW_RUN_ID` documented only; no `.env` code changes expected.
- Tests: Documentation verification commands; no runtime tests required unless broad repo verification is desired.
- Docs: Root and template workflow docs.
- Workflow artifacts: This current workflow still uses legacy `_spec/` for the approval gate because the new model is not implemented yet; future workflow artifacts should use `_workflow/runs/<run-id>/`.

## 12. Dependency And Integration Map

- Internal dependencies:
  - `RUN_WORKFLOW.md` is canonical orchestration guidance.
  - `templates/RUN_WORKFLOW.md` should mirror root workflow guidance.
  - `README.md` explains usage and repository structure.
  - `scripts/install.sh` must copy any new template `_workflow/` files into target projects.
- External packages/services: None.
- Integration points:
  - Git branch/worktree commands.
  - Environment variable `CODEX_WORKFLOW_RUN_ID`.
- Ordering constraints:
  - Update canonical workflow guidance before updating supporting README/template references.
  - Keep root/template mirrors aligned before final verification.
- Migration/setup requirements:
  - Existing repos can keep old artifacts as history.
  - New workflows should create/use `_workflow/runs/<run-id>/`.

## 13. Data And State Impact

- Data models: Not applicable.
- Database changes: None.
- State management changes: Workflow state location changes in documentation/templates.
- Cache/session/local storage impact: None.
- Backward compatibility impact: Legacy artifact paths remain historical; future canonical paths change to `_workflow/runs/<run-id>/`.

## 14. UX / API / Workflow Expectations

- UX expectations: Not applicable for app UI.
- API contract expectations: Not applicable.
- CLI/workflow behavior:
  - Detect branch with `git branch --show-current`.
  - Detect worktree path with `git rev-parse --show-toplevel`.
  - Build run id from `CODEX_WORKFLOW_RUN_ID` when set, otherwise branch name, otherwise sanitized worktree folder name.
  - Set artifact root to `_workflow/runs/<run-id>/`.
  - Write `spec.md`, `tasks.md`, `progress.md`, `review.md`, `verification.md`, `summary.md`, `handoff.md`, and `release-notes.md` under that root.
- Error handling expectations:
  - If `_workflow` conflicts during merge, preserve each `_workflow/runs/<run-id>/` directory.
  - Do not manually merge generated reports line-by-line.
  - Regenerate aggregate/index summary after branches merge.
- Empty/loading/success/failure states: Not applicable.

## 15. Execution Strategy

- Recommended implementation approach:
  - Update `RUN_WORKFLOW.md` and `templates/RUN_WORKFLOW.md` with a new artifact scope detection phase before request resolution.
  - Replace canonical references to legacy active artifact paths with run-scoped equivalents.
  - Add README sections for worktree model, run-id rule, bare repo setup, merge-safe shared files, and conflict recovery.
  - Add `_workflow` root/index docs and matching templates.
  - Update installer copy logic to include `templates/_workflow`.
  - Update AGENTS/prompts/folder README references enough to avoid contradictory guidance.
- Suggested sequencing:
  - Task 1: Add canonical worktree artifact model to workflow docs/templates.
  - Task 2: Add README/template/install support for `_workflow`.
  - Task 3: Verify docs consistency, final audit, and workflow artifacts.
- Safe rollout/migration approach:
  - Treat this as a documentation/template migration rather than a destructive move of existing artifacts.
  - Keep existing historical artifacts untouched except active workflow records for this request.
- Files to inspect before editing:
  - `RUN_WORKFLOW.md`
  - `templates/RUN_WORKFLOW.md`
  - `README.md`
  - `templates/AGENTS.md`
  - `scripts/install.sh`
  - Existing workflow folder README files.
- Decisions to avoid until more evidence exists:
  - Do not implement a CLI generator or cleanup tool unless the task plan explicitly scopes it.
  - Do not delete or move all existing legacy artifacts.

## 16. Verification Strategy

- Required automated checks:
  - `rg "_workflow/runs|CODEX_WORKFLOW_RUN_ID|git branch --show-current|git worktree add|release-notes.md|verification.md" README.md RUN_WORKFLOW.md templates/RUN_WORKFLOW.md`
  - `rg "_spec/|_task/|_progress/progress.md|_handoff/current.md" RUN_WORKFLOW.md README.md templates/RUN_WORKFLOW.md` reviewed to ensure legacy references are compatibility/history only, not active default paths.
  - Root/template mirror checks for changed mirrored files.
  - `bash -n scripts/install.sh` if the installer is edited.
  - `git diff --check`
- Required manual checks:
  - Confirm no active workflow artifact path is shared by all worktrees.
  - Confirm run-scoped artifacts are documented.
  - Confirm dev/redesign examples write to different run directories.
- Test types needed: Documentation/search verification; no app tests required for docs-only changes unless final broad verification is chosen.
- Build/lint/typecheck expectations: No lint script exists. `npm test`/`npm run build` may be run for regression confidence but are not the primary proof.
- Acceptance evidence required: Targeted search output and final diff audit.
- Proof of completion: Review, release notes, summary, progress, and handoff updated for this workflow run after approved implementation.

## 17. Acceptance Criteria

- [ ] `README.md` explains the worktree-scoped artifact model and bare repo/worktree setup commands.
- [ ] `RUN_WORKFLOW.md` requires detecting branch, worktree path, run id, and artifact root before writing workflow artifacts.
- [ ] Root and template workflow guidance make `_workflow/runs/<run-id>/` the canonical active artifact root.
- [ ] The required artifact filenames are documented: `spec.md`, `tasks.md`, `progress.md`, `review.md`, `verification.md`, `summary.md`, `handoff.md`, and `release-notes.md`.
- [ ] Run id defaults to current branch, sanitizes branch separators, and supports `CODEX_WORKFLOW_RUN_ID`.
- [ ] Agents are instructed to update only their own run directory and not another run directory.
- [ ] Shared `_workflow/index.md` and `_workflow/runs/README.md` are documented as optional, append-only, or index-only.
- [ ] Merge-safe artifact and conflict recovery guidance is documented.
- [ ] Installer/template support includes the new `_workflow` guidance.
- [ ] Final audit confirms dev/redesign workflow report paths do not conflict.

## 18. Edge Cases And Failure Modes

- Edge cases:
  - Branch name `feature/redesign` becomes `feature__redesign` or `feature-redesign`.
  - Detached HEAD has no branch name.
  - Two worktrees use the same branch name.
  - `CODEX_WORKFLOW_RUN_ID` includes unsafe path characters.
- Failure modes:
  - Docs leave old shared active artifact paths as canonical.
  - Shared index becomes required and reintroduces conflicts.
  - Template install omits `_workflow`, so new projects miss the model.
- Regression risks:
  - Spec approval gate or TDD workflow wording accidentally weakened.
  - Parallel workflow docs become inconsistent with run-scoped artifact rules.
- Recovery expectations:
  - Use targeted docs review and mirror checks.
  - If a merge conflict appears in generated reports, preserve each run directory and regenerate aggregates after merge.

## 19. Risks And Mitigations

- Technical risks:
  - Legacy and new artifact paths conflict in documentation.
  - Mitigation: Make `_workflow/runs/<run-id>/` canonical and label legacy paths as historical/compatibility only where retained.
- Product/UX risks:
  - Users may be confused by both old and new folder structures.
  - Mitigation: Add a clear migration note and a concrete dev/redesign example.
- Security risks:
  - None expected beyond avoiding secrets in docs.
- Scope risks:
  - Request can expand into a full workflow artifact migration.
  - Mitigation: Do not move historical files; update docs/templates and add new `_workflow` guidance only.
- Mitigation plan:
  - Keep edits scoped, verify required phrases, and run final diff audit.

## 20. Assumptions

- Explicit assumptions:
  - This is a documentation/template migration, not a request to physically move all current historical workflow artifacts.
  - The current workflow run may use legacy `_spec/`, `_task/`, `_progress/`, and `_handoff/` files because the new model is being introduced by this request.
  - Sanitizing slashes into double underscores is acceptable as the default example because it preserves branch-name readability.
  - `CODEX_WORKFLOW_RUN_ID` should itself be sanitized before use as a path segment.
- Confidence level: High.
- What to revisit if assumptions are wrong:
  - If the user wants existing artifacts physically migrated, add a separate migration task with conflict risk and explicit approval.

## 21. Open Questions

- Blocking questions: None.
- Non-blocking questions:
  - Should legacy folder docs be kept as compatibility notes or removed from the install template in a future major cleanup?
  - Should a helper script be added later to print the current artifact root?
- Execution impact: Non-blocking; the requested behavior can be documented and templated without these decisions.

## 22. Task Extraction Notes

- Suggested vertical task boundaries:
  - `TASK-001: Add run-scoped artifact rules to workflow instructions`
  - `TASK-002: Add worktree setup and template support`
  - `TASK-003: Verify merge-safe artifact documentation and finalize`
- Suggested first task: Update `RUN_WORKFLOW.md` and `templates/RUN_WORKFLOW.md` with detection, run-id, artifact-root, own-run-directory, and merge-safe rules.
- Suggested task ordering: Canonical workflow docs first, supporting README/templates/installer second, verification/final artifacts third.
- Areas that should not become separate tasks: App code, backend/frontend tests, deployment configuration, or physical migration of historical workflow reports.
- How the 3-pass Build -> Refine -> Polish loop should apply: Each docs task should use Build for the primary wording/template changes, Refine for consistency across mirrored docs and edge cases, and Polish for final search verification, diff checks, and acceptance evidence. TDD-first evidence is not applicable for docs-only changes; record a missing-test exception.
