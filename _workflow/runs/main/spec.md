# Detailed Spec: polish-ui Workflow

## 1. Metadata
- Spec filename: `_workflow/runs/main/spec.md`
- Date: 2026-05-26
- Request ID / slug: `2026-05-26-polish-ui-workflow`
- Request source: latest direct user prompt plus clarification response in `_workflow/runs/main/request.md`
- Execution mode: `complete-workflow`
- Request classification: `feature` with workflow documentation and validation script changes
- Scope level: medium
- Risk level: medium

## 2. Original Request
- Raw user request: Add a reusable `polish-ui` workflow that activates for UI polish/redesign/refinement prompts, preserves the default workflow, does not change existing frontend skill routing, reuses `.skills/design-taste-frontend/SKILL.md`, creates `.workflow/artifacts/polish-ui/` artifacts, and adds validation.
- Normalized request: Extend the existing workflow kit with a documented `polish-ui` workflow path and minimal classifier/helper support so UI polish prompts route into a structured UI discovery, baseline capture, taste audit, polish spec, vertical task plan, execution, recapture, final taste review, verification, and final artifact flow.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/main/request.md`

## 3. Questions And Answers
- Questions asked:
  - Should `.workflow/artifacts/polish-ui/` be literal while `_workflow/runs/main/` remains the current run artifact root?
  - Should `polish-ui` be only documented behavior or also backed by a small classifier/helper?
  - Should validation extend the current workflow-routing script or use a separate script?
- Answers received:
  - Use literal `.workflow/artifacts/polish-ui/` for `polish-ui` artifacts, while this active run continues to use `_workflow/runs/main/`.
  - Add `polish-ui` as documented behavior in `RUN_WORKFLOW.md` and templates, plus the smallest script/helper needed to classify polish prompts into the `polish-ui` workflow.
  - Extend `scripts/validate-frontend-skill-routing.js` if cleanest; add a separate focused validation script only if extending becomes messy.
  - Proceed with the spec and stop at the approval gate.
- Questions skipped: none
- Remaining open questions: none blocking; exact classifier function export shape can be chosen during implementation.

## 4. Problem Definition
- Problem being solved: The workflow has conditional frontend taste skill routing, but it does not yet expose a reusable `polish-ui` workflow path for UI polish/redesign/refinement requests.
- Why it matters: UI polish requests need more structure than generic implementation tasks because they require baseline capture, taste critique, before/after evidence, and final visual review.
- Current pain point: Prompts like `polish ui` or `make this screen production-ready` currently rely on the default workflow and conditional taste routing, without a dedicated polish artifact model or classification proof.
- Expected value: Agents can consistently run a UI polish process while preserving the existing workflow sequence, skill reuse, and safety checks.

## 5. Current State Analysis
- Existing behavior:
  - `RUN_WORKFLOW.md` defines the canonical workflow sequence: request sync, dirty check, conditional frontend taste routing, spec, approval, task plan, execution, verification, review, release notes, summary, and health check.
  - `AGENTS.md` and templates already require `.skills/design-taste-frontend/SKILL.md` only for frontend UI generation, JSX/TSX, CSS/Tailwind, UI redesign, or UI polish.
  - `scripts/validate-frontend-skill-routing.js` validates existing taste routing examples.
- Existing architecture/components:
  - Root workflow docs: `RUN_WORKFLOW.md`, `AGENTS.md`.
  - Templates: `templates/RUN_WORKFLOW.md`, `templates/AGENTS.md`.
  - Validation: `scripts/validate-frontend-skill-routing.js` invoked by `npm run test:workflow-routing`.
  - Current run artifacts: `_workflow/runs/main/`.
- Existing files/modules likely involved:
  - `RUN_WORKFLOW.md`
  - `templates/RUN_WORKFLOW.md`
  - `AGENTS.md`
  - `templates/AGENTS.md`
  - `scripts/validate-frontend-skill-routing.js`
  - `package.json` only if script naming needs adjustment
  - `_workflow/runs/main/*` for this run's artifacts
- Existing data flow:
  - User prompt -> run-scoped request -> spec approval -> task plan -> task execution -> final artifacts.
  - Existing validation script reads docs and tests prompt/category examples in process.
- Existing API/UI/CLI/workflow behavior:
  - No API or UI runtime behavior is affected.
  - CLI validation currently runs with `npm run test:workflow-routing`.
- Existing tests or verification coverage:
  - `npm run test:workflow-routing`
  - `npm test`
  - `npm run build`
  - `git diff --check`, `git diff --stat`, `git diff`

## 6. Desired End State
- Expected final behavior:
  - A documented reusable workflow path called `polish-ui` exists.
  - UI polish/redesign/refinement prompts classify to `polish-ui`.
  - Backend-only prompts do not classify to `polish-ui`.
  - Frontend generation tasks continue using existing conditional frontend taste skill routing and are not replaced by `polish-ui`.
  - `polish-ui` reuses `.skills/design-taste-frontend/SKILL.md` before implementation for audit/critique and after implementation for final UI review.
- User-facing outcome:
  - Users can ask for UI polish using phrases like `polish ui`, `redesign ui`, `improve this interface`, `make this screen production-ready`, `visual polish pass`, or `refine this frontend`, and the agent has clear workflow instructions.
- Developer-facing outcome:
  - Maintainers have small validation proving trigger behavior and skill reuse.
- System/workflow outcome:
  - Default workflow remains intact.
  - Existing frontend skill routing remains intact.
  - `polish-ui` artifacts use `.workflow/artifacts/polish-ui/`.
- Backward compatibility expectations:
  - Existing docs, templates, and `npm run test:workflow-routing` should continue to support current conditional frontend routing behavior.

## 7. Scope
- In scope:
  - Document `polish-ui` in canonical workflow docs and templates.
  - Add or extend minimal prompt classification logic for `polish-ui`.
  - Extend validation for:
    - `polish ui` triggers `polish-ui`
    - backend-only tasks do not trigger `polish-ui`
    - frontend generation tasks still use existing conditional frontend skill routing
    - `polish-ui` reuses `.skills/design-taste-frontend/SKILL.md`
  - Document `.workflow/artifacts/polish-ui/` and required files/directories.
  - Preserve current workflow sequence and approval gate.
- Out of scope:
  - Creating a new frontend taste skill.
  - Editing `.skills/design-taste-frontend/SKILL.md`.
  - Replacing the default workflow.
  - Replacing or weakening existing conditional frontend skill routing.
  - Implementing browser screenshot automation beyond documenting fallback behavior.
  - Changing app runtime UI/backend behavior.
- Non-goals:
  - Building an actual polished UI in this repo.
  - Adding new dependencies unless a no-dependency approach proves impractical.
- Explicit boundaries:
  - `.workflow/artifacts/polish-ui/` is the reusable polish workflow artifact path, not the current agent run artifact root.
  - `_workflow/runs/main/` remains the active artifact root for this implementation workflow.

## 8. Users And Use Cases
- Primary users:
  - AI coding agents operating in this repository.
  - Developers who use the workflow kit to run UI polish work.
- Secondary users:
  - Maintainers reviewing workflow behavior and validation.
- Main use cases:
  - A user asks `polish ui`; the workflow selects `polish-ui`.
  - A user asks `make this screen production-ready`; the workflow selects `polish-ui`.
  - A user asks for backend-only API work; the workflow does not select `polish-ui`.
  - A user asks for frontend UI generation; the existing conditional taste skill routing still applies.
- Edge use cases:
  - Mixed frontend/backend prompt: only UI polish/refinement surfaces should enter `polish-ui` or trigger taste review.
  - Screenshot tooling unavailable: workflow falls back to code-surface review and records why.
  - Ambiguous prompt with both UI polish and unrelated refactor: agent should clarify scope or isolate the UI polish surface.

## 9. Functional Requirements
- Required behaviors:
  - Define `polish-ui` as a reusable workflow path for UI redesign/polish/refinement tasks only.
  - Specify trigger examples and exclusions.
  - Preserve sequence: spec -> approval -> task plan -> execute -> verify -> review -> release notes -> summary -> health check.
  - Define `polish-ui` steps:
    1. UI Discovery
    2. Baseline Capture
    3. Taste Audit
    4. UI Polish Spec
    5. Vertical Task Plan
    6. Execute
    7. Re-Capture
    8. Final Taste Review
    9. Verification
    10. Final Workflow Artifacts
  - Require `.skills/design-taste-frontend/SKILL.md` before implementation and after implementation.
  - Require recording `Applied skill: design-taste-frontend` in audit/task/review/final artifacts when used.
  - Define `.workflow/artifacts/polish-ui/` with `spec.md`, `task-plan.md`, `progress.md`, `audit.md`, `before/`, `after/`, `review.md`, `verification.md`, `release-notes.md`, `summary.md`, and `handoff.md`.
  - Add minimal prompt classification/helper behavior.
  - Extend validation if clean; otherwise add a focused script.
- Inputs:
  - User prompt text.
  - Repository workflow docs/templates.
  - Existing design taste skill path.
  - Optional browser automation availability.
- Outputs:
  - Updated workflow docs/templates.
  - Updated or added validation helper/script.
  - Passing validation output.
  - Run-scoped workflow artifacts for this request.
- State changes:
  - Documentation and validation files change.
  - No runtime app state changes.
- Error states:
  - Missing `.skills/design-taste-frontend/SKILL.md` should be flagged by validation or documented as a blocker.
  - Missing browser automation should not block `polish-ui`; fallback to code review is required.
- Permissions/auth expectations:
  - Not applicable.

## 10. Non-Functional Requirements
- Performance expectations:
  - Classification validation should be fast and dependency-free.
- Reliability expectations:
  - Validation should fail with clear error messages when routing contracts are missing.
- Security/privacy expectations:
  - No secrets, credentials, tokens, or environment-specific URLs.
- Accessibility expectations:
  - `polish-ui` audit checklist must include UI states and mobile UX; accessibility can be considered during UI review where relevant.
- Maintainability expectations:
  - Keep docs and templates aligned.
  - Prefer extending the existing routing validation script over adding new tooling if clean.
- DX expectations:
  - `npm run test:workflow-routing` should remain the focused command for routing validation unless a strong reason requires a new script.

## 11. Affected Surfaces
- Files likely affected:
  - `RUN_WORKFLOW.md`
  - `templates/RUN_WORKFLOW.md`
  - `AGENTS.md`
  - `templates/AGENTS.md`
  - `scripts/validate-frontend-skill-routing.js`
  - `package.json` if script metadata changes are needed
  - `_workflow/runs/main/request.md`
  - `_workflow/runs/main/spec.md`
  - `_workflow/runs/main/tasks.md`
  - `_workflow/runs/main/progress.md`
  - `_workflow/runs/main/handoff.md`
  - `_workflow/runs/main/review.md`
  - `_workflow/runs/main/verification.md`
  - `_workflow/runs/main/release-notes.md`
  - `_workflow/runs/main/summary.md`
- Directories likely affected:
  - `scripts/`
  - `templates/`
  - `_workflow/runs/main/`
  - `.workflow/artifacts/polish-ui/` may be documented; actual directory creation should occur only if implementation decides artifact scaffolding is required to satisfy acceptance.
- UI surfaces: Not applicable.
- API routes: Not applicable.
- Components: Not applicable.
- Services: Not applicable.
- Database/schema: Not applicable.
- Config/env vars: Not applicable.
- Tests:
  - `scripts/validate-frontend-skill-routing.js`
  - `npm run test:workflow-routing`
- Docs:
  - Workflow documentation and templates.
- Workflow artifacts:
  - Current run artifacts under `_workflow/runs/main/`.
  - Reusable polish artifact path documented as `.workflow/artifacts/polish-ui/`.

## 12. Dependency And Integration Map
- Internal dependencies:
  - `RUN_WORKFLOW.md` and `templates/RUN_WORKFLOW.md` should remain aligned.
  - `AGENTS.md` and `templates/AGENTS.md` should remain aligned on operating rules.
  - Validation reads docs and asserts routing contracts.
- External packages/services:
  - None expected.
- Integration points:
  - `npm run test:workflow-routing`.
  - Existing `npm test` and `npm run build` checks.
- Ordering constraints:
  - Spec approval before task plan.
  - Task plan before implementation.
  - Validation Red -> Green -> Refactor evidence before marking code-changing tasks done.
- Migration/setup requirements:
  - None.

## 13. Data And State Impact
- Data models: Not applicable.
- Database changes: none.
- State management changes: none.
- Cache/session/local storage impact: none.
- Backward compatibility impact:
  - Existing workflow commands and routing should continue working.
  - The default workflow remains the fallback.

## 14. UX / API / Workflow Expectations
- UX expectations:
  - Not applicable to runtime UI.
  - The `polish-ui` workflow itself should instruct agents to evaluate spacing, hierarchy, typography, color, responsiveness, motion, loading states, empty states, error states, card overuse, generic AI patterns, and mobile UX issues.
- API contract expectations:
  - Not applicable.
- CLI/workflow behavior:
  - `polish-ui` activates only for UI redesign/polish/refinement prompts.
  - Backend-only tasks do not activate `polish-ui`.
  - Frontend generation tasks still use current conditional frontend taste routing.
  - Screenshot capture is best-effort when browser automation exists; code-surface review is the fallback.
- Error handling expectations:
  - Classifier validation should report clear failures.
  - Workflow docs should tell agents to record screenshot/tooling gaps rather than forcing screenshots.
- Empty/loading/success/failure states:
  - `polish-ui` audit checklist must include loading, empty, and error states for target UI surfaces.

## 15. Execution Strategy
- Recommended implementation approach:
  - Update `RUN_WORKFLOW.md` with a dedicated `polish-ui` section near conditional frontend taste routing or workflow classification.
  - Mirror the relevant `RUN_WORKFLOW.md` changes into `templates/RUN_WORKFLOW.md`.
  - Update `AGENTS.md` and `templates/AGENTS.md` only as needed to make agent operating rules aware of `polish-ui` without changing existing frontend routing.
  - Extend `scripts/validate-frontend-skill-routing.js` with small prompt classifier helpers such as `classifyWorkflowPath(prompt)` and assertions for `polish-ui`.
  - Keep `npm run test:workflow-routing` as the primary focused validation command if the same script remains clean.
- Suggested sequencing:
  1. Add failing validation expectations for `polish-ui` classification and skill reuse.
  2. Implement minimal classifier/helper.
  3. Update workflow docs/templates to satisfy validation.
  4. Refine wording to preserve default workflow and existing taste routing.
  5. Run focused and broad verification.
- Safe rollout/migration approach:
  - Docs and no-dependency script changes only.
- Files to inspect before editing:
  - `RUN_WORKFLOW.md`
  - `templates/RUN_WORKFLOW.md`
  - `AGENTS.md`
  - `templates/AGENTS.md`
  - `scripts/validate-frontend-skill-routing.js`
  - `package.json`
- Decisions to avoid until more evidence exists:
  - Do not introduce a new package.
  - Do not create a new taste skill.
  - Do not modify app runtime files.

## 16. Verification Strategy
- Required automated checks:
  - `node scripts/validate-frontend-skill-routing.js`
  - `npm run test:workflow-routing`
  - `npm test`
  - `npm run build`
  - `git diff --check`
  - `git diff --stat`
  - `git diff`
  - `git status --short`
- Required manual checks:
  - Confirm diff preserves the default workflow.
  - Confirm existing conditional frontend skill routing language remains intact.
  - Confirm no new taste skill is created and `.skills/design-taste-frontend/SKILL.md` is not edited.
  - Confirm `.workflow/artifacts/polish-ui/` is documented or scaffolded exactly as required.
- Test types needed:
  - No-dependency Node validation for classification and doc contract.
  - Existing repo tests/build for regression confidence.
- Build/lint/typecheck expectations:
  - No lint/typecheck script is currently defined.
  - `npm run build` should pass.
- Acceptance evidence required:
  - Red/Green/Refactor evidence for validation script changes.
  - Focused validation output proving required trigger/non-trigger examples.
  - Final diff audit.
- Proof of completion:
  - Review, verification, release notes, summary, and handoff completed for this workflow run.

## 17. Acceptance Criteria
- [ ] `RUN_WORKFLOW.md` and `templates/RUN_WORKFLOW.md` document `polish-ui` as a reusable workflow path for UI redesign/polish/refinement tasks only.
- [ ] The default workflow remains intact and is not replaced by `polish-ui`.
- [ ] Existing conditional frontend taste skill routing remains intact for frontend generation/markup/styling work.
- [ ] `polish-ui` documentation requires `.skills/design-taste-frontend/SKILL.md` before implementation and after implementation.
- [ ] `polish-ui` documentation requires recording `Applied skill: design-taste-frontend`.
- [ ] `.workflow/artifacts/polish-ui/` and all required files/directories are documented or scaffolded exactly as requested.
- [ ] Minimal classifier/helper logic classifies `polish ui` and equivalent polish prompts as `polish-ui`.
- [ ] Backend-only tasks do not classify as `polish-ui`.
- [ ] Frontend generation tasks still trigger existing conditional frontend skill routing rather than being swallowed by `polish-ui`.
- [ ] Validation proves `polish-ui` reuses `.skills/design-taste-frontend/SKILL.md` and does not create a new taste skill.
- [ ] Available repo checks are run and results are recorded.

## 18. Edge Cases And Failure Modes
- Edge cases:
  - Prompt includes both backend API work and UI polish: route only UI polish work through `polish-ui` or ask for scope clarification.
  - Prompt says `refine frontend` but asks for data fetching only: classify based on actual UI polish/refinement surface, not keyword alone if context clearly says non-UI work.
  - Browser automation unavailable: record fallback to code-surface review.
  - No frontend app detected: record discovery result and stop or ask, depending on request.
- Failure modes:
  - Overbroad classifier routes backend-only prompts into `polish-ui`.
  - Docs accidentally imply `polish-ui` replaces default workflow.
  - Existing taste routing gets duplicated or weakened.
  - Validation hard-codes too much prose and becomes brittle.
- Regression risks:
  - `RUN_WORKFLOW.md` and template drift.
  - Validation script complexity grows beyond its current simple contract checks.
- Recovery expectations:
  - Keep classifier simple and test examples explicitly.
  - Use targeted `rg` checks for no new taste skill and preserved default workflow language.

## 19. Risks And Mitigations
- Technical risks:
  - Prompt classification can be too broad. Mitigation: include positive and negative examples in validation.
  - Validation script can become messy. Mitigation: factor tiny helper functions and only split script if necessary.
- Product/UX risks:
  - `polish-ui` may be confused with normal frontend generation. Mitigation: docs distinguish polish/refinement from generation.
- Security risks:
  - Low; no secrets or auth changes.
- Scope risks:
  - Adding runtime UI changes or new skill files would exceed scope. Mitigation: acceptance explicitly forbids these.
- Mitigation plan:
  - Keep implementation limited to docs/templates/script and run-scoped artifacts.

## 20. Assumptions
- Explicit assumptions:
  - `AGENTS.md` and `templates/AGENTS.md` may be updated if needed to keep agent operating rules consistent.
  - Extending `scripts/validate-frontend-skill-routing.js` will be clean enough.
  - No new npm dependency is needed.
  - The literal `.workflow/artifacts/polish-ui/` path can coexist with `_workflow/runs/<run-id>/`.
- Confidence level: high
- What to revisit if assumptions are wrong:
  - If validation becomes hard to maintain, add a separate focused script and document why.
  - If `.workflow/` conflicts with repo conventions, preserve the user's literal path but document the distinction clearly.

## 21. Open Questions
- Blocking questions: none
- Non-blocking questions:
  - Whether to physically scaffold `.workflow/artifacts/polish-ui/` now or document it as the required runtime path for future polish runs.
- Execution impact:
  - Non-blocking; the task plan can decide based on acceptance and diff cleanliness.

## 22. Task Extraction Notes
- Suggested vertical task boundaries:
  - One likely task can cover the workflow docs/templates, classifier validation, and final artifacts because the requested behavior is a tightly coupled workflow contract.
  - If split is needed, use:
    - `TASK-001: Add polish-ui routing validation and classifier`
    - `TASK-002: Document polish-ui workflow and artifacts`
    - `TASK-003: Verify routing preservation and finalize artifacts`
- Suggested first task:
  - `TASK-001: Add polish-ui workflow routing and validation`
- Suggested task ordering:
  - Start with failing validation expectations, then docs/helper implementation, then verification/final artifacts.
- Areas that should not become separate tasks:
  - Creating a new design taste skill.
  - Editing runtime frontend/backend app behavior.
  - Browser screenshot automation.
- How the 3-pass Build -> Refine -> Polish loop should apply:
  - Build: Add failing validation examples and initial docs/helper.
  - Refine: Tighten classifier exclusions and docs/template alignment.
  - Polish: Run full checks, final diff audit, and write review/release/summary/handoff.

## 23. Frontend Taste Application
- Applicable or `Not applicable`: Not applicable to this implementation task as no frontend UI code, JSX/TSX markup, CSS/Tailwind styling, UI redesign, or UI polish is being performed in the repo UI itself.
- Detection result and reason: This request changes workflow documentation and routing validation. It specifies future use of `.skills/design-taste-frontend/SKILL.md` inside `polish-ui`, but does not require applying the skill to current app UI.
- Required propagation points:
  - The implemented `polish-ui` workflow must require `Applied skill: design-taste-frontend` in polish audit, task evidence, final UI review, review, verification, release notes, summary, and health check when the `polish-ui` workflow is actually run.
  - This current run should record that the frontend taste skill file was reused as a referenced workflow dependency and was not edited.
