# 1. Metadata
- Spec filename: `_spec/2026-05-22-setup-karebraids-mern-boilerplate.md`
- Date: 2026-05-22
- Request ID / slug: `2026-05-22-setup-karebraids-mern-boilerplate`
- Request source: latest user prompt and clarification answers
- Execution mode: `complete-workflow`
- Request classification: boilerplate
- Scope level: medium
- Risk level: medium

# 2. Original Request
- Raw user request: `setup mern boilerplate`
- Normalized request: Set up the existing `client/` and `server/` folders as a KareBraids MERN boilerplate with auth baseline, example CRUD model, React routing, TanStack Query, shared API client, env examples, tests, and a minimal polished Tailwind UI.
- Source prompt / WORK_REQUEST reference: `WORK_REQUEST.md`

# 3. Questions And Answers
- Questions asked: target folders, baseline features, UI depth, MongoDB behavior, app concept.
- Answers received: use existing `client/` and `server/`; include auth baseline, example CRUD model, React routing, TanStack Query, shared API client, env examples, and tests; build a minimal polished Tailwind starter UI; make MongoDB optional for local smoke testing but connect when `MONGODB_URI` is provided; use KareBraids as the app concept.
- Questions skipped: none.
- Remaining open questions: exact production data model is not specified; this spec uses a salon braid services CRUD model as the example.

# 4. Problem Definition
- Problem being solved: The starter is still branded as a generic/Forgeboard MERN boilerplate and lacks a KareBraids example CRUD surface.
- Why it matters: A useful boilerplate should prove the stack end to end with a concrete app concept, API, state/query wiring, and tests.
- Current pain point: Existing auth/profile/notification examples do not provide a simple standalone CRUD model or KareBraids branding.
- Expected value: Developers can run, test, and extend a KareBraids full-stack starter without first inventing structure.

# 5. Current State Analysis
- Existing behavior: React/Vite/Tailwind client renders dashboard/login/profile/notifications. Express server exposes health/auth/notification preferences. Auth uses cookies/JWT and Mongoose `User`.
- Existing architecture/components: `client/src` follows components/hooks/lib/pages/redux/routes/services; `server/` is flat with controllers/models/routes/tests.
- Existing files/modules likely involved: `client/src/constants/constans.js`, `client/src/routes/AppRoutes.jsx`, `client/src/pages/DashboardPage.jsx`, `client/src/components/layout/AppShell.jsx`, `client/src/lib/api.js`, `client/test/App.test.jsx`, `server/app.js`, `server/config/env.js`, `server/config/db.js`, `server/controllers`, `server/models`, `server/routes`, `server/tests`, `.env.example`, `client/.env.example`.
- Existing data flow: frontend service hooks use `client/src/lib/api.js`; server routes use controllers and Mongoose models.
- Existing API/UI/CLI/workflow behavior: npm workspaces with `npm test` and `npm run build`; no lint script.
- Existing tests or verification coverage: Vitest/RTL for client, Jest/Supertest for server.

# 6. Desired End State
- Expected final behavior: KareBraids starter UI and API include a braid services CRUD example, existing auth baseline remains functional, and local server startup skips MongoDB when no `MONGODB_URI` is set.
- User-facing outcome: The client presents KareBraids branding, dashboard content, a services route, and loading/empty/error states for service data.
- Developer-facing outcome: API calls stay in services, server state uses TanStack Query hooks, backend CRUD logic is routed through Express controllers, and tests cover the new behavior.
- System/workflow outcome: Workflow artifacts document the request, task execution, verification, review, release notes, and summary.
- Backward compatibility expectations: Existing auth/profile/notification routes and tests continue to pass.

# 7. Scope
- In scope: KareBraids branding, example braid services CRUD API, client service/query/mutation hooks, services page route, env examples, optional MongoDB connection behavior, automated tests.
- Out of scope: Full appointment booking, payments, file uploads, role-based admin, production seed data, deployment changes.
- Non-goals: Rewriting the app architecture or replacing existing auth/profile/notification features.
- Explicit boundaries: No new styling system; no new external dependencies unless already installed; no deployment changes.

# 8. Users And Use Cases
- Primary users: Developers starting from this MERN boilerplate.
- Secondary users: A salon admin evaluating the KareBraids concept.
- Main use cases: View starter dashboard, sign in through auth baseline, inspect/create/update/delete braid service records through the API, view services page in the client.
- Edge use cases: API unavailable, no services returned, validation errors, no local MongoDB configured.

# 9. Functional Requirements
- Required behaviors: Preserve auth baseline; add CRUD endpoints for braid services; add frontend services route using TanStack Query; keep API calls in shared service files; expose env examples; support smoke startup without `MONGODB_URI`.
- Inputs: service name, description, duration minutes, price dollars, active flag.
- Outputs: public service records without sensitive data.
- State changes: service mutations invalidate service queries; Redux remains for client-owned session/UI state.
- Error states: invalid API payloads return `INVALID_INPUT`; UI shows inline service load/mutation errors.
- Permissions/auth expectations: Example CRUD is public starter data for boilerplate purposes; auth baseline remains available separately.

# 10. Non-Functional Requirements
- Performance expectations: Lightweight list queries and stable Vite build.
- Reliability expectations: Missing optional MongoDB URI should not crash local smoke server; provided URI should be used for connection.
- Security/privacy expectations: Do not expose `passwordHash`; do not hard-code secrets; keep env examples placeholder-only.
- Accessibility expectations: Route links and forms use labels, readable focus/active states, and status messaging.
- Maintainability expectations: Follow repo folder rules and existing naming style.
- DX expectations: `npm test` and `npm run build` should pass or failures must be documented.

# 11. Affected Surfaces
- Files likely affected: client pages/routes/constants/services/hooks/tests, server app/config/controllers/models/routes/tests, env examples, docs/workflow artifacts.
- Directories likely affected: `client/src`, `client/test`, `server`, `_spec`, `_task`, `_progress`, `_handoff`, `_review`, `_release`, `_summary`.
- UI surfaces: dashboard shell, navigation, new services page.
- API routes: `/api/braid-services`.
- Components: existing layout and UI primitives may be reused.
- Services: new `braidServicesService.js`.
- Database/schema: new `BraidService` Mongoose model.
- Config/env vars: root `.env.example` may mark `MONGODB_URI` optional locally.
- Tests: `client/test/App.test.jsx`, new or existing server tests.
- Docs: `docs/PROJECT_CONTEXT.md` if durable project facts change.
- Workflow artifacts: all required workflow memory files.

# 12. Dependency And Integration Map
- Internal dependencies: client API client, TanStack Query, React Router, Express app routing, Mongoose model/controller pattern.
- External packages/services: existing React, Tailwind, TanStack Query, Axios, Express, Mongoose, Jest, Supertest, Vitest.
- Integration points: client route `/services` calls server `/api/braid-services` through `VITE_API_URL`.
- Ordering constraints: write failing tests before implementation, then implement backend and frontend changes.
- Migration/setup requirements: none beyond npm install already present.

# 13. Data And State Impact
- Data models: add braid service fields: `name`, `description`, `durationMinutes`, `priceDollars`, `isActive`.
- Database changes: new MongoDB collection via Mongoose model when database is used.
- State management changes: no Redux data duplication; server data lives in TanStack Query.
- Cache/session/local storage impact: service query cache invalidated after mutations; existing theme local storage remains unchanged.
- Backward compatibility impact: additive routes and UI only.

# 14. UX / API / Workflow Expectations
- UX expectations: Minimal polished KareBraids UI, restrained Tailwind styling, mobile-safe layout, loading/empty/error states.
- API contract expectations: CRUD endpoints return `{ braidServices: [...] }` or `{ braidService: ... }`; delete returns `{ ok: true }`.
- CLI/workflow behavior: existing npm workspace commands remain.
- Error handling expectations: API uses existing error handler; frontend displays inline errors.
- Empty/loading/success/failure states: services page must include loading skeleton, empty message, mutation success path, and inline failure messaging.

# 15. Execution Strategy
- Recommended implementation approach: one vertical task that adds backend CRUD, frontend route/hook/service/UI, env/doc updates, and tests using the required 3-pass TDD loop.
- Suggested sequencing: backend failing tests, backend implementation, frontend failing tests, frontend implementation, polish env/docs and full verification.
- Safe rollout/migration approach: additive files/routes; avoid destructive edits.
- Files to inspect before editing: package files, existing app routes/pages/services/hooks, server app/config/controllers/models/routes/tests.
- Decisions to avoid until more evidence exists: auth-gating CRUD, production seed strategy, deployment changes.

# 16. Verification Strategy
- Required automated checks: `npm run test --workspace server`, `npm run test --workspace client`, `npm test`, `npm run build`.
- Required manual checks: inspect final UI code against `design-taste-frontend` pre-flight matrix.
- Test types needed: Supertest route coverage, RTL route/render coverage.
- Build/lint/typecheck expectations: build passes; no lint/typecheck scripts exist.
- Acceptance evidence required: failing tests observed before implementation where possible, passing tests after implementation and refactor, final diff audit.
- Proof of completion: saved review, release notes, summary, progress, handoff, and final health check.

# 17. Acceptance Criteria
- [ ] Existing `client/` and `server/` are used rather than creating a nested app.
- [ ] KareBraids branding appears in the starter UI.
- [ ] Auth baseline remains available and tests pass.
- [ ] Example braid services CRUD API exists with tests.
- [ ] React route for services exists and uses TanStack Query hooks plus shared API client.
- [ ] Env examples are present and MongoDB is optional for local smoke startup when `MONGODB_URI` is absent.
- [ ] Frontend uses Tailwind and passes the design pre-flight checks.
- [ ] Relevant automated tests and build checks pass or gaps are documented.

# 18. Edge Cases And Failure Modes
- Edge cases: empty service list, invalid service payload, service not found, API/network failure, missing `VITE_API_URL`, missing `MONGODB_URI`.
- Failure modes: tests may reveal legacy assumptions around branding; optional DB behavior may conflict with required production env guidance.
- Regression risks: auth tests could be affected by env changes; dashboard tests could be affected by branding copy changes.
- Recovery expectations: fix in-scope failures only and record failure recovery if needed.

# 19. Risks And Mitigations
- Technical risks: CRUD tests may mock Mongoose differently than existing tests; mitigate with controller-level route tests and model mocks.
- Product/UX risks: overbuilding the salon concept; mitigate by keeping UI starter-level.
- Security risks: accidentally exposing password hashes; mitigate by leaving auth serialization unchanged and testing public outputs.
- Scope risks: booking/payment/admin can expand quickly; keep out of scope.
- Mitigation plan: additive implementation, focused tests, final diff audit.

# 20. Assumptions
- Explicit assumptions: The example CRUD model should be braid services; CRUD endpoints can be public for boilerplate demonstration; `JWT_SECRET` and `CLIENT_ORIGIN` remain required.
- Confidence level: high for stack and structure, medium for exact sample domain.
- What to revisit if assumptions are wrong: Rename/re-scope CRUD model if the user wants bookings, clients, or appointments instead.

# 21. Open Questions
- Blocking questions: none.
- Non-blocking questions: whether CRUD should be auth-protected later.
- Execution impact: no blocker for starter setup.

# 22. Task Extraction Notes
- Suggested vertical task boundaries: one vertical task adding backend CRUD, frontend UI/data wiring, env/docs, and verification.
- Suggested first task: `TASK-001: Add KareBraids services CRUD through API and UI`.
- Suggested task ordering: backend test/implementation, frontend test/implementation, final polish.
- Areas that should not become separate tasks: deployment, payments, appointment scheduling, large auth refactors.
- How the 3-pass Build -> Refine -> Polish loop should apply: Build proves backend CRUD with Red/Green/Refactor; Refine proves frontend route/data wiring with Red/Green/Refactor; Polish verifies env/docs/build and final review.
