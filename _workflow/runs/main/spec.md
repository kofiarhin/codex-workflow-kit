# Detailed Spec: Conditional Frontend Skill Routing

## 1. Metadata
- Spec filename: `_workflow/runs/main/spec.md`
- Date: 2026-05-26
- Request ID / slug: `2026-05-26-conditional-frontend-skill-routing`
- Request source: Latest user prompt synced to `_workflow/runs/main/request.md`
- Execution mode: `complete-workflow`
- Request classification: `feature`
- Scope level: `medium`
- Risk level: `medium`

## 2. Original Request
- Raw user request: Implement conditional frontend skill routing in this repo using `.skills/design-taste-frontend/SKILL.md`, preserving the current workflow and applying the skill only when a task involves frontend UI code generation, JSX/TSX markup, CSS/Tailwind styling, UI redesign, or UI polish. Record application as `Applied skill: design-taste-frontend`, add/update tests or fixtures for frontend, backend-only, and mixed frontend/backend routing, run checks, and report results.
- Normalized request: Update root workflow docs and install templates so frontend taste skill application is conditional at task/work-surface level rather than a broad default. Add the smallest executable validation for routing examples if no repo-native workflow-routing test pattern exists.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/main/request.md`

## 3. Questions And Answers
- Questions asked:
  - Should the conditional rule be applied to root workflow docs and install templates, specifically `RUN_WORKFLOW.md`, `AGENTS.md`, `templates/RUN_WORKFLOW.md`, and `templates/AGENTS.md`?
  - Should validation use docs/fixtures or an executable script if there is no existing test pattern?
- Answers received:
  - Apply it to both root workflow docs and install templates: `RUN_WORKFLOW.md`, `AGENTS.md`, `templates/RUN_WORKFLOW.md`, and `templates/AGENTS.md`.
  - Use executable tests/fixtures if the repo already has a test pattern. If not, add the smallest validation script possible that checks the routing examples automatically.
- Questions skipped: None.
- Remaining open questions: None blocking.

## 4. Problem Definition
- Problem being solved: The workflow currently treats frontend taste skill application too broadly and references the older `.agents/skills/design-taste-frontend/SKILL.md` path in several workflow surfaces. The desired behavior is task-sensitive routing to `.skills/design-taste-frontend/SKILL.md`.
- Why it matters: Agents should apply the design taste skill only for actual frontend UI generation or polish, avoiding unnecessary process overhead and incorrect application to backend, API, database, auth, test-only, or docs-only tasks.
- Current pain point: Existing docs imply broad frontend/UI scope detection and carry the skill across the whole workflow once detected. That conflicts with mixed frontend/backend tasks where only frontend UI work should use the skill.
- Expected value: Clearer agent behavior, preserved workflow sequence, and executable proof that examples route correctly.

## 5. Current State Analysis
- Existing behavior: `RUN_WORKFLOW.md` and `templates/RUN_WORKFLOW.md` include a `Frontend Taste Skill Detection` section that applies the skill when a request touches frontend/UI surfaces and carries it through many workflow artifacts. `AGENTS.md` and `templates/AGENTS.md` contain similar frontend taste language and currently mention `.agents/skills/design-taste-frontend/SKILL.md`.
- Existing architecture/components: This repo is a reusable workflow kit plus a MERN boilerplate. Workflow docs live at root and in `templates/`; executable scripts currently only include `scripts/install.sh`.
- Existing files/modules likely involved:
  - `RUN_WORKFLOW.md`
  - `AGENTS.md`
  - `templates/RUN_WORKFLOW.md`
  - `templates/AGENTS.md`
  - A small validation script and fixture location to be chosen during task planning, likely under `scripts/` and/or a lightweight fixture file.
  - `package.json` if a new npm script is needed for the validation command.
- Existing data flow: Agents read workflow docs, classify requests/tasks, create workflow artifacts, then execute task iterations. No runtime app data flow is involved.
- Existing API/UI/CLI/workflow behavior: Workflow sequence is request sync, intake, dirty worktree check, skill detection, spec, approval gate, task plan, implementation, verification, review, release notes, summary, and health check. That sequence must remain intact.
- Existing tests or verification coverage: Frontend and backend app tests exist via npm workspaces. No existing workflow-routing unit test or validation script pattern was found. `scripts/install.sh` is syntax-checked in prior workflows.

## 6. Desired End State
- Expected final behavior: Workflow docs and templates instruct agents to load/apply `.skills/design-taste-frontend/SKILL.md` only for task portions involving frontend UI code generation, JSX/TSX markup, CSS/Tailwind styling, UI redesign, or UI polish.
- User-facing outcome: Not applicable; no app UI changes are intended.
- Developer-facing outcome: Agents and maintainers can see exact routing rules and can run a small automatic validation proving the examples.
- System/workflow outcome: Existing workflow sequence remains unchanged; only the conditional routing rule and its recording requirement are added.
- Backward compatibility expectations: Existing spec approval, task planning, 3-pass hardening, TDD-first, run-scoped artifact, and final review requirements remain unchanged.

## 7. Scope
- In scope:
  - Update `RUN_WORKFLOW.md`, `AGENTS.md`, `templates/RUN_WORKFLOW.md`, and `templates/AGENTS.md`.
  - Change taste skill path references for this rule to `.skills/design-taste-frontend/SKILL.md`.
  - Add explicit trigger and non-trigger categories.
  - Require exact recording line `Applied skill: design-taste-frontend` when applied.
  - Add executable validation for three examples: frontend UI task triggers, backend-only task does not, mixed frontend/backend task applies only to frontend UI work.
  - Run available checks and record results.
- Out of scope:
  - Creating a new default workflow.
  - Creating a separate taste skill.
  - Editing `.skills/design-taste-frontend/SKILL.md`.
  - Changing frontend app components, backend APIs, database schemas, auth logic, or deployment.
- Non-goals:
  - Building a generalized natural-language classifier package.
  - Replacing grill-me, spec approval, task planning, or the 3-pass hardening loop.
- Explicit boundaries: Keep edits scoped to workflow docs/templates, minimal validation assets, package script if needed, and run-scoped workflow artifacts.

## 8. Users And Use Cases
- Primary users: AI coding agents and developers using this workflow kit.
- Secondary users: Template consumers who install the workflow into another repo.
- Main use cases:
  - A frontend UI task loads/applies the design taste skill and records `Applied skill: design-taste-frontend`.
  - A backend-only task does not load/apply the design taste skill.
  - A mixed frontend/backend task applies the skill only before/while doing frontend UI work, not for backend/API/database work.
- Edge use cases:
  - Test-only tasks that mention frontend tests but do not generate UI should not apply the skill.
  - Docs-only tasks that document frontend behavior should not apply the skill unless they include frontend UI code generation or markup/styling output.

## 9. Functional Requirements
- Required behaviors:
  - Preserve the current workflow sequence exactly.
  - Conditionalize taste skill routing at task/work-surface level.
  - Load/apply `.skills/design-taste-frontend/SKILL.md` for frontend UI code generation, JSX/TSX markup, CSS/Tailwind styling, UI redesign, or UI polish.
  - Do not apply it for backend-only, API-only, database-only, auth-only, test-only, or docs-only tasks.
  - Record exact line `Applied skill: design-taste-frontend` whenever applied.
  - Include mixed-task guidance stating backend work proceeds without the taste skill while frontend UI work uses it.
  - Validate the three required examples automatically.
- Inputs: Workflow requests/tasks and validation examples.
- Outputs: Updated docs/templates, validation result output, and workflow artifacts.
- State changes: Documentation and validation assets only.
- Error states: Validation script should fail non-zero if a routing example does not match expected behavior.
- Permissions/auth expectations: Not applicable.

## 10. Non-Functional Requirements
- Performance expectations: Validation should be lightweight and fast.
- Reliability expectations: Validation should not depend on network access or app servers.
- Security/privacy expectations: No secrets or credentials; do not expose sensitive data.
- Accessibility expectations: Not applicable; no UI changes.
- Maintainability expectations: Routing language should be concise, unambiguous, and mirrored in root docs/templates.
- DX expectations: A single command should prove the routing examples; if added to `package.json`, it should be discoverable.

## 11. Affected Surfaces
- Files likely affected:
  - `RUN_WORKFLOW.md`
  - `AGENTS.md`
  - `templates/RUN_WORKFLOW.md`
  - `templates/AGENTS.md`
  - `package.json` if adding a validation script entry
  - A new minimal validation script and/or fixtures, likely under `scripts/`
  - `_workflow/runs/main/*` workflow artifacts
- Directories likely affected: `templates/`, `scripts/`, `_workflow/runs/main/`
- UI surfaces: Not applicable; this implementation does not alter app UI.
- API routes: Not applicable.
- Components: Not applicable.
- Services: Not applicable.
- Database/schema: Not applicable.
- Config/env vars: No env vars. `package.json` scripts may be touched for validation.
- Tests: Minimal executable validation for routing examples.
- Docs: Root workflow docs and install templates.
- Workflow artifacts: Request, handoff, spec, tasks, progress, verification, review, release notes, summary.

## 12. Dependency And Integration Map
- Internal dependencies:
  - Root docs should align with template docs.
  - Validation should inspect or encode the same trigger/non-trigger expectations documented in the workflow.
  - `scripts/install.sh` may not need changes unless the new validation assets are intended to install into target repos.
- External packages/services: None expected.
- Integration points:
  - `npm test` already runs app workspace tests.
  - A new script may be added as a focused validation command if no existing pattern fits.
- Ordering constraints:
  - Spec approval before task planning.
  - Task plan before implementation.
  - Validation red phase before doc/script implementation when feasible.
- Migration/setup requirements: None.

## 13. Data And State Impact
- Data models: Not applicable.
- Database changes: None.
- State management changes: None.
- Cache/session/local storage impact: None.
- Backward compatibility impact: Workflow docs remain compatible with existing sequence and modes.

## 14. UX / API / Workflow Expectations
- UX expectations: Not applicable for application UX.
- API contract expectations: Not applicable.
- CLI/workflow behavior:
  - Existing workflow sequence remains unchanged.
  - Conditional taste routing occurs when evaluating task scope or a mixed task's frontend UI sub-work.
  - When applied, artifacts/evidence include `Applied skill: design-taste-frontend`.
  - When not applied, artifacts can record not applicable without the applied line.
- Error handling expectations: Validation command fails clearly when expected examples no longer match.
- Empty/loading/success/failure states: Not applicable.

## 15. Execution Strategy
- Recommended implementation approach:
  - First add a minimal executable validation that encodes the three required routing examples and initially fails against the current workflow wording or missing validation assets.
  - Update root docs and templates with conditional routing language and `.skills/design-taste-frontend/SKILL.md` path.
  - Keep workflow ordering text intact; edit only the skill detection/routing language and supporting health/review references as needed.
  - Add a discoverable command if appropriate.
- Suggested sequencing:
  - `TASK-001`: Add route validation fixtures/script and prove current failure.
  - `TASK-002`: Update root workflow docs and install templates to satisfy conditional routing.
  - `TASK-003`: Polish mirrors, run full checks, and finalize workflow artifacts.
- Safe rollout/migration approach: Documentation-only behavior change plus local validation; no app runtime migration.
- Files to inspect before editing: The four required docs/templates, `package.json`, `scripts/install.sh`, and current validation/test conventions.
- Decisions to avoid until more evidence exists: Do not add dependencies; do not create a generalized classifier library unless the simple script cannot prove requirements.

## 16. Verification Strategy
- Required automated checks:
  - New focused routing validation command.
  - `npm test` if feasible after adding the validation command or at least relevant workspace tests if full test is too broad.
  - Targeted `rg` checks for exact path, exact applied record line, trigger categories, non-trigger categories, mixed-task guidance, and absence of stale broad-default wording.
  - Mirror/alignment checks between root and template workflow docs where appropriate.
  - `git diff --check`, `git diff --stat`, and `git diff`.
- Required manual checks:
  - Confirm workflow sequence was not reordered.
  - Confirm no new default workflow or separate taste skill was created.
  - Confirm `.skills/design-taste-frontend/SKILL.md` was not edited.
- Test types needed: Small executable fixture/script validation for routing examples.
- Build/lint/typecheck expectations: No lint/typecheck scripts are currently defined at root. `npm test` and focused validation should be attempted.
- Acceptance evidence required: Passing validation output for frontend, backend-only, and mixed examples, plus targeted text checks.
- Proof of completion: Review, verification, release notes, summary, and final response list checks run and results.

## 17. Acceptance Criteria
- [ ] `RUN_WORKFLOW.md`, `AGENTS.md`, `templates/RUN_WORKFLOW.md`, and `templates/AGENTS.md` preserve the existing workflow sequence.
- [ ] The only behavior rule added is conditional routing to `.skills/design-taste-frontend/SKILL.md` for frontend UI code generation, JSX/TSX markup, CSS/Tailwind styling, UI redesign, or UI polish.
- [ ] The workflow explicitly does not apply the skill for backend-only, API-only, database-only, auth-only, test-only, or docs-only tasks.
- [ ] Mixed frontend/backend guidance applies the skill only to frontend UI work.
- [ ] The exact record line `Applied skill: design-taste-frontend` is required whenever the skill is applied.
- [ ] No new default workflow is created.
- [ ] No separate taste skill is created.
- [ ] Executable validation proves frontend UI triggers, backend-only does not, and mixed frontend/backend applies only to frontend UI work.
- [ ] Available checks are run and reported.

## 18. Edge Cases And Failure Modes
- Edge cases:
  - A task mentions React tests but does not generate UI; treat as test-only unless UI generation/styling/polish is part of the task.
  - Auth-only backend work should not apply the skill even if the app has a login UI elsewhere.
  - Mixed task should not globally mark the whole task as taste-applied for backend parts.
- Failure modes:
  - Docs keep stale `.agents/skills/design-taste-frontend/SKILL.md` references for the routing rule.
  - Validation is too broad and passes despite docs not containing the required exact record line.
  - Workflow sequence is accidentally reordered.
- Regression risks:
  - Removing existing approval gate or 3-pass hardening language while editing nearby sections.
  - Desynchronizing root and template docs.
- Recovery expectations: Use targeted diff review and exact text checks; if validation fails, fix only the in-scope doc/script issue and rerun the failing command.

## 19. Risks And Mitigations
- Technical risks:
  - Risk: Adding a script without a test runner could be overbuilt.
  - Mitigation: Use the smallest no-dependency Node or shell script.
- Product/UX risks: None for app UX.
- Security risks: Low; avoid reading secrets and do not add env vars.
- Scope risks:
  - Risk: Existing workflow docs contain several taste-skill references, increasing accidental broader refactor risk.
  - Mitigation: Limit edits to routing/path/recording language and validation.
- Mitigation plan: Keep patches small, run mirror checks, review `git diff` carefully.

## 20. Assumptions
- Explicit assumptions:
  - `.skills/design-taste-frontend/SKILL.md` is an existing skill source and should not be modified.
  - No existing workflow-routing validation pattern exists, so a small validation script is acceptable.
  - Root docs and install templates are the required durable surfaces; README updates are not required unless implementation discovers a direct inconsistency.
- Confidence level: High.
- What to revisit if assumptions are wrong: If a hidden workflow test harness exists, use it instead of adding a new validation script.

## 21. Open Questions
- Blocking questions: None.
- Non-blocking questions: Whether the new validation script should be installed into downstream repos; default assumption is no unless the docs/templates need it.
- Execution impact: None.

## 22. Task Extraction Notes
- Suggested vertical task boundaries:
  - One task can cover validation and routing docs because the behavior is tightly coupled and small.
  - A second finalization task can cover verification, artifacts, and release notes if the first task grows too large.
- Suggested first task: Add a minimal executable routing validation and update the four required workflow docs/templates until it passes.
- Suggested task ordering: Validation red phase first, docs/templates implementation second, final checks/artifacts third.
- Areas that should not become separate tasks: App frontend, backend API, database, auth, deployment, or skill-file edits.
- How the 3-pass Build -> Refine -> Polish loop should apply: Each iteration should use Red -> Green -> Refactor for the validation/doc change where feasible: failing validation first, minimal docs/script change to pass, cleanup/mirror verification after refactor.

## 23. Frontend Taste Application
- Applicable or `Not applicable`: Not applicable for this implementation task.
- Detection result and reason: This request changes workflow documentation and validation for when future tasks should apply a frontend skill. It does not generate frontend UI code, JSX/TSX markup, CSS/Tailwind styling, UI redesign, or UI polish. Therefore `.skills/design-taste-frontend/SKILL.md` was inspected as an input path but not applied to this docs/test implementation work.
- Required propagation points: The implemented workflow rule must require future applicable tasks to record `Applied skill: design-taste-frontend` in task evidence/artifacts. This current run should record taste application as not applicable in tasks/review/verification/release notes/summary/health check unless frontend UI implementation is unexpectedly introduced.
