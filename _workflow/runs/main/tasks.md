# Task Plan: polish-ui Workflow

## Planning Metadata
- Spec file used: `_workflow/runs/main/spec.md`
- Planning date: 2026-05-26
- Execution mode: `complete-workflow`
- Progress files read: `_workflow/runs/main/progress.md`
- Handoff file read: `_workflow/runs/main/handoff.md`
- Summary file read: `_workflow/runs/main/summary.md`
- Explicit spec approval: user said `spec approved`

## Spec Sections Used
- Section 6 Desired End State: `polish-ui` workflow, default workflow preservation, skill reuse, artifact path.
- Section 11 Affected Surfaces: workflow docs/templates, validation script, run-scoped artifacts, optional `.workflow/artifacts/polish-ui/`.
- Section 14 UX / API / Workflow Expectations: trigger behavior, screenshot fallback, conditional frontend routing preservation.
- Section 15 Execution Strategy: extend validation first, update docs/templates, keep no-dependency approach.
- Section 16 Verification Strategy: focused validation, repo tests/build, diff checks.
- Section 17 Acceptance Criteria: routing, skill reuse, artifact path, checks.
- Section 18 Edge Cases And Failure Modes: overbroad classifier, default workflow replacement risk, validation brittleness.
- Section 22 Task Extraction Notes: one vertical task is acceptable because this is a tightly coupled workflow contract.

## Dirty Worktree Protection
- Initial `git status --short` before request sync was clean.
- Dirty files before planning were expected run-scoped artifacts only.
- Planned files matched the final edited files.
- Overlap risk: run-scoped artifact overlap was expected for this workflow. No unrelated dirty files were present.

## Task List

### TASK-001: Add polish-ui workflow routing and validation

Status: Done

Objective:
Add a reusable `polish-ui` workflow path for UI redesign/polish/refinement prompts, preserve the default workflow and existing conditional frontend skill routing, reuse `.skills/design-taste-frontend/SKILL.md`, create/use the literal `.workflow/artifacts/polish-ui/` artifact structure, and validate the routing contract.

Files changed:
- `RUN_WORKFLOW.md`
- `templates/RUN_WORKFLOW.md`
- `AGENTS.md`
- `templates/AGENTS.md`
- `scripts/validate-frontend-skill-routing.js`
- `.workflow/artifacts/polish-ui/spec.md`
- `.workflow/artifacts/polish-ui/task-plan.md`
- `.workflow/artifacts/polish-ui/progress.md`
- `.workflow/artifacts/polish-ui/audit.md`
- `.workflow/artifacts/polish-ui/before/.gitkeep`
- `.workflow/artifacts/polish-ui/after/.gitkeep`
- `.workflow/artifacts/polish-ui/review.md`
- `.workflow/artifacts/polish-ui/verification.md`
- `.workflow/artifacts/polish-ui/release-notes.md`
- `.workflow/artifacts/polish-ui/summary.md`
- `.workflow/artifacts/polish-ui/handoff.md`
- `_workflow/runs/main/*`

Checklist:
- [x] Add failing validation expectations for polish prompt classification.
- [x] Implement minimal classifier/helper for workflow path selection.
- [x] Update workflow docs/templates to define `polish-ui`.
- [x] Update AGENTS docs/templates only as needed for operating guidance.
- [x] Create/use `.workflow/artifacts/polish-ui/` files and `before/after` directories.
- [x] Preserve default workflow language.
- [x] Preserve existing conditional frontend taste routing.
- [x] Record `.skills/design-taste-frontend/SKILL.md` reuse and `Applied skill: design-taste-frontend` requirements.
- [x] Run focused and full verification.
- [x] Complete review, verification, release notes, summary, and handoff.

Iteration 1 Build:
- Goal: Add the smallest failing routing validation and initial implementation for `polish-ui`.
- Changes made: Added `polish-ui` validation expectations, minimal classifier behavior, workflow docs/templates, AGENTS guidance, and `.workflow/artifacts/polish-ui/` scaffold.
- Test plan: Run `node scripts/validate-frontend-skill-routing.js` before implementation to observe expected Red failure, then rerun after implementation.
- Red phase evidence: `node scripts/validate-frontend-skill-routing.js` failed with `RUN_WORKFLOW.md must document the polish-ui workflow path`.
- Green phase evidence: After docs/helper/artifact implementation, `node scripts/validate-frontend-skill-routing.js` passed.
- Refactor phase evidence: Refactored the script to expose `runValidation`, `classifyWorkflowPath`, and `shouldApplyTasteSkill` without import side effects; validation still passed.
- Test commands run: `node scripts/validate-frontend-skill-routing.js`.
- Verification command/result: Passed after implementation and refactor.
- Review findings: Initial scope was correct; helper import side effect was worth cleaning up.
- Acceptance status: Partially complete; core routing and docs were green, stricter artifact/fallback validation still needed.
- Remaining issues: Add explicit validation for screenshot fallback, scaffold files, existing skill presence, and no new taste skill.
- Next action: Iteration 2 Refine.

Iteration 2 Refine:
- Goal: Tighten docs/template language, classifier exclusions, and artifact structure.
- Changes made: Added stricter validation for `do not force screenshots`, scaffold file existence, existing skill file existence, and no `.skills/polish-ui`; updated AGENTS docs/templates with screenshot fallback guidance.
- Test plan: Rerun focused validation and targeted `rg` checks for preserved default workflow, skill reuse, no new taste skill, and artifact path.
- Red phase evidence: `node scripts/validate-frontend-skill-routing.js` failed with `AGENTS.md must document the polish-ui screenshot fallback`.
- Green phase evidence: After AGENTS/template updates, `node scripts/validate-frontend-skill-routing.js` and `npm run test:workflow-routing` passed.
- Refactor phase evidence: Targeted `rg` checks verified `polish-ui`, `.workflow/artifacts/polish-ui/`, `.skills/design-taste-frontend/SKILL.md`, `Applied skill: design-taste-frontend`, no new taste skill, and scaffold files.
- Test commands run: `node scripts/validate-frontend-skill-routing.js`; `npm run test:workflow-routing`; targeted `rg`; `Get-ChildItem .workflow/artifacts/polish-ui -Recurse -File`.
- Verification command/result: Passed.
- Review findings: Default workflow and existing frontend routing remain intact; `polish-ui` is explicitly scoped to polish/redesign/refinement.
- Acceptance status: Complete for routing/docs/artifacts.
- Remaining issues: Run broad repo checks and final diff audit.
- Next action: Iteration 3 Polish.

Iteration 3 Polish:
- Goal: Run broad repo checks, final diff audit, and complete workflow artifacts.
- Changes made: Ran full checks and wrote final run-scoped artifacts.
- Test plan: Run `npm test`, `npm run build`, `git diff --check`, `git diff --stat`, `git diff`, `git status --short`, and helper import validation.
- Red phase evidence: No new failing behavior was introduced in Iteration 3; Red evidence for the code-changing behavior was captured in Iterations 1 and 2. Missing-test exception: Polish iteration focused on broad regression verification and final artifacts after the validated behavior was already covered.
- Green phase evidence: `npm test` passed with 7 client tests and 14 server tests; `npm run build` passed; helper import validation passed.
- Refactor phase evidence: `git diff --check` passed with line-ending warnings only; final diff audit ran with `git diff --stat` and `git diff`.
- Test commands run: `npm test`; `npm run build`; `git diff --check`; `git diff --stat`; `git diff`; `git status --short`; helper import command.
- Verification command/result: Passed.
- Review findings: No app runtime files changed; no dependencies, secrets, or new taste skill were added; `.skills/design-taste-frontend/SKILL.md` was not edited.
- Acceptance status: Complete.
- Remaining issues: None.
- Next action: Final response.

Test commands run:
- `node scripts/validate-frontend-skill-routing.js` - failed first, then passed.
- `npm run test:workflow-routing` - passed.
- Targeted `rg` checks - passed.
- `Get-ChildItem .workflow/artifacts/polish-ui -Recurse -File` - showed required scaffold files.
- `node -e "const r=require('./scripts/validate-frontend-skill-routing'); ..."` - passed.
- `npm test` - passed.
- `npm run build` - passed.
- `git diff --check` - passed with line-ending warnings only.
- `git diff --stat` - ran.
- `git diff` - ran.
- `git status --short` - ran.

Acceptance result:
- [x] `RUN_WORKFLOW.md` and `templates/RUN_WORKFLOW.md` document `polish-ui` as a reusable workflow path for UI redesign/polish/refinement tasks only.
- [x] The default workflow remains intact and is not replaced by `polish-ui`.
- [x] Existing conditional frontend taste skill routing remains intact for frontend generation/markup/styling work.
- [x] `polish-ui` documentation requires `.skills/design-taste-frontend/SKILL.md` before implementation and after implementation.
- [x] `polish-ui` documentation requires recording `Applied skill: design-taste-frontend`.
- [x] `.workflow/artifacts/polish-ui/` and all required files/directories are documented and scaffolded exactly as requested.
- [x] Minimal classifier/helper logic classifies `polish ui` and equivalent polish prompts as `polish-ui`.
- [x] Backend-only tasks do not classify as `polish-ui`.
- [x] Frontend generation tasks still trigger existing conditional frontend skill routing rather than being swallowed by `polish-ui`.
- [x] Validation proves `polish-ui` reuses `.skills/design-taste-frontend/SKILL.md` and does not create a new taste skill.
- [x] Available repo checks are run and results are recorded.

Stop condition:
- Not reached.

Out-of-scope items:
- No new frontend taste skill.
- No edits to `.skills/design-taste-frontend/SKILL.md`.
- No runtime frontend/backend app behavior changes.
- No default workflow replacement.
- No screenshot automation dependency.
