# Task Plan: Conditional Frontend Skill Routing

- Spec file used: `_workflow/runs/main/spec.md`
- Planning date: 2026-05-26
- Explicit spec approval: User replied `approve spec`.
- Progress and summary files read:
  - `_workflow/runs/main/progress.md`
  - `_workflow/runs/main/summary.md`
  - `_workflow/runs/main/handoff.md`
- Detailed spec sections used:
  - Section 6 Desired End State: conditional task/work-surface routing.
  - Section 7 Scope: four required docs/templates, no skill-file edit, no app changes.
  - Section 9 Functional Requirements: trigger/non-trigger categories and exact record line.
  - Section 11 Affected Surfaces: docs/templates, package script if needed, validation assets.
  - Section 12 Dependency And Integration Map: no new dependencies; root/template alignment.
  - Section 15 Execution Strategy: validation red phase first, docs/templates second, final checks.
  - Section 16 Verification Strategy: focused validation, targeted `rg`, mirror checks, diff audit.
  - Section 17 Acceptance Criteria: all nine criteria.
  - Section 18 Edge Cases And Failure Modes: test-only/docs-only and mixed frontend/backend handling.
  - Section 19 Risks And Mitigations: avoid workflow sequence changes and overbuilt classifier.
  - Section 22 Task Extraction Notes: one small vertical task is acceptable because routing docs and validation are tightly coupled.
  - Section 23 Frontend Taste Application: not applicable for this docs/test implementation.

## Task List

### TASK-001: Add conditional taste routing and validation

- Task ID: `TASK-001`
- Status: `Done`
- Objective: Add conditional frontend taste skill routing to root workflow docs and install templates, then prove the three required routing examples with the smallest executable validation.
- Files changed:
  - `RUN_WORKFLOW.md`
  - `AGENTS.md`
  - `templates/RUN_WORKFLOW.md`
  - `templates/AGENTS.md`
  - `package.json`
  - `scripts/validate-frontend-skill-routing.js`
  - `_workflow/runs/main/request.md`
  - `_workflow/runs/main/spec.md`
  - `_workflow/runs/main/tasks.md`
  - `_workflow/runs/main/progress.md`
  - `_workflow/runs/main/handoff.md`
  - `_workflow/runs/main/verification.md`
  - `_workflow/runs/main/review.md`
  - `_workflow/runs/main/release-notes.md`
  - `_workflow/runs/main/summary.md`
- Checklist:
  - [x] Add no-dependency executable validation for frontend, backend-only, and mixed routing examples.
  - [x] Add a discoverable validation command.
  - [x] Update `RUN_WORKFLOW.md` with conditional task/work-surface routing.
  - [x] Update `AGENTS.md` with matching conditional routing.
  - [x] Update `templates/RUN_WORKFLOW.md` with matching conditional routing.
  - [x] Update `templates/AGENTS.md` with matching conditional routing.
  - [x] Preserve existing workflow sequence.
  - [x] Run focused validation and available checks.
  - [x] Complete review, release notes, summary, and handoff.

#### Iteration 1 - Build

- Goal: Create the routing validation and make the minimal workflow doc/template changes needed for the required examples.
- Changes made: Added `scripts/validate-frontend-skill-routing.js`, added `npm run test:workflow-routing`, and replaced broad frontend taste routing language in the four required docs/templates with conditional task/work-surface routing.
- Test plan: Run `node scripts/validate-frontend-skill-routing.js` and `npm run test:workflow-routing`.
- Red phase evidence: `node scripts/validate-frontend-skill-routing.js` failed with `MODULE_NOT_FOUND`, proving the validation did not exist before implementation.
- Green phase evidence: `node scripts/validate-frontend-skill-routing.js` passed with `frontend skill routing validation passed`.
- Refactor phase evidence: `npm run test:workflow-routing` passed after adding the package script.
- Test commands run:
  - `node scripts/validate-frontend-skill-routing.js`
  - `npm run test:workflow-routing`
- Verification command/result: `npm run test:workflow-routing` passed.
- Review findings: Build satisfied the required examples but refinement found stale broad health-check wording and numbering issues in `AGENTS` operating rules.
- Acceptance status: Partially met pending refinement.
- Remaining issues: Remove stale broad wording and repair numbering.
- Next action: Iteration 2 - Refine.

#### Iteration 2 - Refine

- Goal: Tighten routing language, mixed-task handling, stale path checks, and root/template alignment.
- Changes made: Reworded remaining health-check language from broad frontend work to conditional frontend UI work and mechanically renumbered `AGENTS.md` and `templates/AGENTS.md` operating rules.
- Test plan: Re-run routing validation and targeted `rg` checks for path, exact record line, trigger categories, non-trigger categories, mixed guidance, and stale broad/default wording.
- Red phase evidence: Targeted stale-wording check found remaining broad `For frontend work` lines in `RUN_WORKFLOW.md` and `templates/RUN_WORKFLOW.md`; numbering check showed duplicate numbering in `AGENTS.md` and `templates/AGENTS.md`.
- Green phase evidence: `npm run test:workflow-routing` passed after fixes. Stale wording search returned no matches.
- Refactor phase evidence: Numbering check showed repaired sequence in `AGENTS.md`; validation remained green.
- Test commands run:
  - `npm run test:workflow-routing`
  - `rg -n "\.agents/skills/design-taste-frontend|If the request touches frontend/UI|when frontend/UI surfaces are in scope|Carry the skill through|For frontend work|Frontend Taste Skill Detection|frontend taste skill detection" RUN_WORKFLOW.md AGENTS.md templates/RUN_WORKFLOW.md templates/AGENTS.md`
  - `rg -n "^([0-9]+)\." AGENTS.md templates\AGENTS.md`
- Verification command/result: Focused validation passed; stale broad/default wording search returned no matches.
- Review findings: Scope still limited to docs/templates, validation script, package script, and workflow artifacts.
- Acceptance status: All behavior criteria met.
- Remaining issues: Run full checks and final diff audit.
- Next action: Iteration 3 - Polish.

#### Iteration 3 - Polish

- Goal: Finalize validation, run available checks, complete final diff audit, and write workflow artifacts.
- Changes made: Ran full test suite, diff checks, final targeted routing checks, and wrote run-scoped verification/review/release/summary/handoff artifacts.
- Test plan: Run focused validation, `npm test`, `git diff --check`, `git diff --stat`, `git diff`, and final status checks.
- Red phase evidence: No new failing final case was needed; Iteration 1 and 2 captured the required Red evidence. Missing-test exception for additional Red phase: final polish was verification/artifact finalization with no new behavior change.
- Green phase evidence: `npm run test:workflow-routing` passed; `npm test` passed with client 7 tests and server 14 tests.
- Refactor phase evidence: `git diff --check` passed with line-ending warnings only; final targeted routing check passed.
- Test commands run:
  - `npm run test:workflow-routing`
  - `npm test`
  - `git diff --check`
  - `rg -n "\.skills/design-taste-frontend/SKILL.md|Applied skill: design-taste-frontend|frontend UI code generation|JSX/TSX markup|CSS/Tailwind styling|backend-only|API-only|database-only|auth-only|test-only|docs-only|mixed frontend/backend|only to the frontend UI work" RUN_WORKFLOW.md AGENTS.md templates/RUN_WORKFLOW.md templates/AGENTS.md`
  - `git diff --stat`
  - `git diff`
  - `git status --short`
- Verification command/result: All available checks passed.
- Review findings: No bugs, no scope creep, no app implementation edits, no new dependencies, no secrets.
- Acceptance status: Complete.
- Remaining issues: None.
- Final verdict: Done.

#### Acceptance Result

- [x] `RUN_WORKFLOW.md`, `AGENTS.md`, `templates/RUN_WORKFLOW.md`, and `templates/AGENTS.md` preserve the existing workflow sequence.
- [x] The only behavior rule added is conditional routing to `.skills/design-taste-frontend/SKILL.md` for frontend UI code generation, JSX/TSX markup, CSS/Tailwind styling, UI redesign, or UI polish.
- [x] The workflow explicitly does not apply the skill for backend-only, API-only, database-only, auth-only, test-only, or docs-only tasks.
- [x] Mixed frontend/backend guidance applies the skill only to frontend UI work.
- [x] The exact record line `Applied skill: design-taste-frontend` is required whenever the skill is applied.
- [x] No new default workflow is created.
- [x] No separate taste skill is created.
- [x] Executable validation proves frontend UI triggers, backend-only does not, and mixed frontend/backend applies only to frontend UI work.
- [x] Available checks are run and reported.

#### Verification Commands

- `node scripts/validate-frontend-skill-routing.js` - failed before script creation with `MODULE_NOT_FOUND`, then passed after implementation.
- `npm run test:workflow-routing` - passed.
- Targeted stale wording `rg` - returned no stale broad/default matches.
- Targeted required routing `rg` - found required path, record line, trigger categories, non-trigger categories, and mixed-task guidance.
- `npm test` - passed.
- `git diff --check` - passed with line-ending warnings only.
- `git diff --stat` - ran.
- `git diff` - ran.
- `git status --short` - ran.

#### Stop Condition

Not reached.

#### Out-of-Scope Items

- No frontend app UI changes.
- No backend/API/database/auth changes.
- No deployment changes.
- No new dependencies.
- No new default workflow.
- No separate taste skill.
- No edits to `.skills/design-taste-frontend/SKILL.md`.
