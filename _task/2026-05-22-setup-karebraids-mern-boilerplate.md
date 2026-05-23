# Task Plan: Setup KareBraids MERN Boilerplate

- Spec file used: `_spec/2026-05-22-setup-karebraids-mern-boilerplate.md`
- Planning date: 2026-05-22
- Progress and summary files read: `_progress/progress.md`, `_summary/2026-05-19-add-tdd-first-workflow.md`
- Handoff read: `_handoff/current.md`
- Detailed spec sections used: 6 Desired End State, 11 Affected Surfaces, 12 Dependency And Integration Map, 13 Data And State Impact, 14 UX / API / Workflow Expectations, 15 Execution Strategy, 16 Verification Strategy, 17 Acceptance Criteria, 18 Edge Cases And Failure Modes, 19 Risks And Mitigations, 20 Assumptions, 22 Task Extraction Notes.
- Dirty worktree protection: Initial `git status --short` showed `M WORK_REQUEST.md`, created by this workflow request sync. No unrelated dirty files were present. Planned files overlap with this workflow only.

## Task List

### TASK-001: Add KareBraids services CRUD through API and UI

- Task ID: TASK-001
- Status: Done
- Priority: P0
- Parallel safe: no
- Depends on: none
- Blocks: final review, release notes, summary
- File locks: `server/app.js`, `server/config/env.js`, `server/config/db.js`, `server/models/BraidService.js`, `server/controllers/braidServiceController.js`, `server/routes/braidServiceRoutes.js`, `server/tests/braidServices.test.js`, `.env.example`, `client/src/constants/constans.js`, `client/src/routes/AppRoutes.jsx`, `client/src/pages/DashboardPage.jsx`, `client/src/pages/BraidServicesPage.jsx`, `client/src/services/braidServicesService.js`, `client/src/hooks/queries/useBraidServices.js`, `client/src/hooks/mutations/useCreateBraidService.js`, `client/src/hooks/mutations/useUpdateBraidService.js`, `client/src/hooks/mutations/useDeleteBraidService.js`, `client/test/App.test.jsx`, `docs/PROJECT_CONTEXT.md`, workflow artifacts.
- Claim status: done
- Claimed by: orchestrator
- Agent role: orchestrator
- Merge risk: medium
- Objective: Use the existing MERN workspace to provide a KareBraids starter with auth baseline preserved, example braid services CRUD API, a services UI route using TanStack Query and shared API client, env examples, and tests.
- Files likely affected: listed in file locks.

Checklist:
- [x] Add backend braid service CRUD tests first.
- [x] Implement backend model/controller/routes and optional MongoDB connection behavior.
- [x] Add frontend route/service/query/mutation tests first.
- [x] Implement KareBraids branding and services page UI.
- [x] Update env examples and durable project context.
- [x] Run targeted and full verification.
- [x] Complete final diff audit and workflow artifacts.

Iteration 1 - Build:
- Goal: Prove backend braid services CRUD and optional MongoDB startup behavior.
- Changes made: Added failing Jest/Supertest coverage for `/api/braid-services` CRUD and optional MongoDB startup, then implemented `BraidService`, controller, route registration, and optional DB connection.
- Test plan: Add/update Jest/Supertest tests for `/api/braid-services` and config/db behavior.
- Red phase evidence: `npm run test --workspace server` failed as expected: `/api/braid-services` returned 404 and `MONGODB_URI` was still required.
- Green phase evidence: `npm run test --workspace server` passed after adding backend CRUD and optional DB implementation.
- Refactor phase evidence: Tidied controller formatting and mocked `console.warn` in optional DB tests; `npm run test --workspace server` passed again.
- Test commands run: `npm run test --workspace server` for Red, Green, and Refactor.
- Verification command/result: `npm run test --workspace server` passed.
- Review findings: Backend additions are additive; auth serialization remains unchanged; no sensitive fields are exposed.
- Acceptance status: Backend CRUD and optional DB acceptance met.
- Remaining issues: Frontend route not yet implemented at end of Build.
- Next action: Continue to frontend Refine iteration.

Iteration 2 - Refine:
- Goal: Prove frontend KareBraids services route uses shared API client and TanStack Query with polished Tailwind UI states.
- Changes made: Added failing RTL coverage for KareBraids branding and `/services`, then implemented services route, shared API service, TanStack Query hooks, CRUD form/list UI, and test hook mocks.
- Test plan: Add/update Vitest/RTL tests for branding, navigation, services route, loading/empty/error data states, and create-service interaction.
- Red phase evidence: `npm run test --workspace client` failed as expected because the UI still said `Forgeboard` and `/services` redirected to the dashboard.
- Green phase evidence: `npm run test --workspace client` passed after adding KareBraids branding, route, page, services, and hooks.
- Refactor phase evidence: Mocked braid services hooks in RTL tests and added create mutation coverage to remove jsdom network noise; `npm run test --workspace client` passed again.
- Test commands run: `npm run test --workspace client` for Red, Green, and Refactor.
- Verification command/result: `npm run test --workspace client` passed with existing React Router future-flag warnings only.
- Review findings: UI uses Tailwind, labels above inputs, loading/empty/error states, active button feedback, and shared API/TanStack Query structure.
- Acceptance status: Frontend branding, route, shared API, query hooks, and minimal polished UI acceptance met.
- Remaining issues: Final docs/env polish still pending at end of Refine.
- Next action: Continue to Polish iteration.

Iteration 3 - Polish:
- Goal: Finalize env/docs polish, full verification, design pre-flight, and workflow artifacts.
- Changes made: Updated health API branding test first, then health response, env examples, browser title, boilerplate doc, and project context; ran full verification and final diff audit.
- Test plan: Run workspace tests and build; document no lint/typecheck script.
- Red phase evidence: `npm run test --workspace server` failed as expected when `health.test.js` was changed to expect `karebraids-api`.
- Green phase evidence: Updated `server/controllers/healthController.js` and docs/env files. First rerun exposed an in-scope route-test mock issue; after targeted recovery, `npm run test --workspace server` passed.
- Refactor phase evidence: Ran `npm run test --workspace client`, `npm test`, `npm run build`, `git diff --check`, `git diff --stat`, `git diff`, and `git status --short`; verification passed with line-ending warnings only from Git and existing React Router future-flag warnings.
- Test commands run: `npm run test --workspace server`, `npm run test --workspace client`, `npm test`, `npm run build`, `git diff --check`, `git diff --stat`, `git diff`, `git status --short`.
- Verification command/result: All automated checks passed.
- Review findings: Scope matches spec; no deployment changes, new dependencies, generated junk, or secrets found. Design pre-flight passed for the scoped frontend.
- Acceptance status: Complete.
- Remaining issues: none.
- Next action: Final review, release notes, summary, and final handoff.

Test plan:
- `npm run test --workspace server`
- `npm run test --workspace client`
- `npm test`
- `npm run build`

Red phase evidence:
- Pending.

Green phase evidence:
- Pending.

Refactor phase evidence:
- Pending.

Test commands run:
- Pending.

Acceptance criteria:
- [x] Existing `client/` and `server/` are used rather than creating a nested app.
- [x] KareBraids branding appears in the starter UI.
- [x] Auth baseline remains available and tests pass.
- [x] Example braid services CRUD API exists with tests.
- [x] React route for services exists and uses TanStack Query hooks plus shared API client.
- [x] Env examples are present and MongoDB is optional for local smoke startup when `MONGODB_URI` is absent.
- [x] Frontend uses Tailwind and passes the design pre-flight checks.
- [x] Relevant automated tests and build checks pass or gaps are documented.

Acceptance result:
- [x] Existing `client/` and `server/` are used rather than creating a nested app.
- [x] KareBraids branding appears in the starter UI.
- [x] Auth baseline remains available and tests pass.
- [x] Example braid services CRUD API exists with tests.
- [x] React route for services exists and uses TanStack Query hooks plus shared API client.
- [x] Env examples are present and MongoDB is optional for local smoke startup when `MONGODB_URI` is absent.
- [x] Frontend uses Tailwind and passes the design pre-flight checks.
- [x] Relevant automated tests and build checks pass or gaps are documented.

Verification commands:
- `npm run test --workspace server`
- `npm run test --workspace client`
- `npm test`
- `npm run build`
- `git diff --stat`
- `git diff`
- `git status --short`

Stop condition:
- Stop with `Needs Human Review` if tests cannot verify the backend CRUD, frontend UI route, or optional MongoDB behavior after targeted recovery.

Out-of-scope items:
- Appointment booking, payments, media upload, admin authorization, deployment changes, new dependencies.
