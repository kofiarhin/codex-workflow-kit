# Spec: Implement Fallow Quality Layer

## 1. Metadata
- Spec filename: `_workflow/runs/work/spec.md`
- Date: 2026-06-03
- Request ID / slug: implement-fallow-quality-layer
- Request source: latest direct user prompt
- Execution mode: complete-workflow
- Request classification: workflow/documentation/tooling
- Scope level: repository workflow layer
- Risk level: medium

## 2. Original Request
- Raw user request: Implement Fallow as a reusable workflow quality layer and fetch/store official Fallow skill files.
- Normalized request: Add a mandatory post-review Fallow Quality gate, local Fallow skill files, audit report, installer coverage, and final health-check requirements.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/work/request.md`

## 3. Questions And Answers
- Questions asked: none; request was detailed and implementation-ready.
- Answers received: not applicable.
- Questions skipped: assumed user intended direct implementation because detailed commands, paths, and acceptance requirements were provided.
- Remaining open questions: none blocking.

## 4. Problem Definition
- Problem being solved: The workflow lacks a reusable Fallow quality-gate layer for JS/TS codebase intelligence.
- Why it matters: Agents need a consistent machine-readable quality pass after normal verification and review.
- Current pain point: Workflow health checks do not verify Fallow evidence or verdicts.
- Expected value: Better cleanup/risk visibility without replacing existing TypeScript, ESLint, formatting, or security tooling.

## 5. Current State Analysis
- Existing behavior: `RUN_WORKFLOW.md`, `AGENTS.md`, templates, README, prompts, and installer define intake/spec/plan/implementation/verification/review/release/summary/health behavior.
- Existing architecture/components: workflow docs at root and templates; installer copies templates to target repos.
- Existing files/modules likely involved: `RUN_WORKFLOW.md`, `AGENTS.md`, `README.md`, `docs/PROMPTS.md`, `scripts/install.sh`, matching templates, `layers/fallow-quality/`, `.workflow/fallow-audit.md`.
- Existing data flow: direct request -> run-scoped request/spec/tasks/progress/handoff/review/release/summary -> health check.
- Existing API/UI/CLI/workflow behavior: documentation-only workflow kit with npm validation scripts.
- Existing tests or verification coverage: `npm test`, `npm run build`, `npm run test:workflow-routing`.

## 6. Desired End State
- Expected final behavior: Fallow Quality runs after tests/lint/typecheck/build and review, before handoff/release/health.
- User-facing outcome: workflow users get local Fallow files and a mandatory `.workflow/fallow-audit.md` report.
- Developer-facing outcome: installer copies the layer and workflow docs document mandatory command rules.
- System/workflow outcome: final health checks verify `.workflow/spec.md`, `.workflow/task-plan.md`, `.workflow/handoff.md`, `.workflow/release-notes.md`, `.workflow/fallow-audit.md`, verification status, and Fallow verdict.
- Backward compatibility expectations: Existing workflow sequence and run-scoped artifacts remain intact.

## 7. Scope
- In scope: fetch Fallow files, add layer docs/rules, update workflow order/health checks, installer, README/prompts, and audit report.
- Out of scope: fixing all Fallow findings, enabling telemetry, adding remote config URLs, replacing ESLint/TypeScript/formatters/security scanners.
- Non-goals: broad app refactors or deletion of unused candidates.
- Explicit boundaries: no `fallow watch`; no telemetry enablement; no remote config content trust.

## 8. Users And Use Cases
- Primary users: AI coding agents running this workflow.
- Secondary users: developers installing the workflow kit.
- Main use cases: quality gate, cleanup intelligence, PR risk and health review.
- Edge use cases: primary `audit` command cannot detect base branch and fallback command is required.

## 9. Functional Requirements
- Required behaviors: store official Fallow files; read/extract rules; use JSON quiet explain commands with stderr discarded; document filters/fix safety; create audit report; update health checks.
- Inputs: Fallow skill files, Fallow JSON output, workflow verification status.
- Outputs: docs updates, local layer files, `.workflow/fallow-audit.md`.
- State changes: workflow order adds Fallow Quality.
- Error states: Fallow cannot run, JSON cannot parse, blocking findings remain, report missing.
- Permissions/auth expectations: none.

## 10. Non-Functional Requirements
- Performance expectations: Fallow commands should be normal CLI invocations.
- Reliability expectations: fallback command available if primary audit cannot run.
- Security/privacy expectations: no telemetry enablement; no remote `extends` recommendations.
- Accessibility expectations: not applicable.
- Maintainability expectations: rules live in canonical docs and templates.
- DX expectations: installer copies the layer into target projects.

## 11. Affected Surfaces
- Files likely affected: root workflow docs, templates, installer, README, prompts, layer files, audit report.
- Directories likely affected: `layers/fallow-quality/`, `templates/layers/fallow-quality/`, `.workflow/`, `_workflow/runs/work/`.
- UI surfaces: not applicable.
- API routes: not applicable.
- Components: not applicable.
- Services: not applicable.
- Database/schema: not applicable.
- Config/env vars: none.
- Tests: existing npm checks.
- Docs: workflow and prompt docs.
- Workflow artifacts: request/spec/tasks/progress/review/release/summary/handoff and `.workflow/*` compatibility files.

## 12. Dependency And Integration Map
- Internal dependencies: installer uses template files; root docs mirror templates.
- External packages/services: `npx fallow` fetched/runs from npm; official skill files fetched from GitHub raw URLs.
- Integration points: workflow health check, release/review/summary evidence, installer.
- Ordering constraints: Fallow after verification and review, before handoff/release/health.
- Migration/setup requirements: copy layer via installer for target repos.

## 13. Data And State Impact
- Data models: none.
- Database changes: none.
- State management changes: none.
- Cache/session/local storage impact: none.
- Backward compatibility impact: existing run-scoped artifacts remain.

## 14. UX / API / Workflow Expectations
- UX expectations: clear audit report with required sections.
- API contract expectations: not applicable.
- CLI/workflow behavior: exact Fallow commands documented.
- Error handling expectations: primary audit exit code 2 documented as real failure and fallback used.
- Empty/loading/success/failure states: audit verdicts PASSED/PARTIAL/FAILED.

## 15. Execution Strategy
- Recommended implementation approach: fetch official files, update root/template workflow docs, update installer/README/prompts, run verification, run Fallow, write audit report.
- Suggested sequencing: one vertical task for full layer integration.
- Safe rollout/migration approach: additive docs and templates only.
- Files to inspect before editing: `RUN_WORKFLOW.md`, `AGENTS.md`, `README.md`, `scripts/install.sh`, fetched Fallow files.
- Decisions to avoid until more evidence exists: auto-fixing Fallow findings.

## 16. Verification Strategy
- Required automated checks: `npm test`, `npm run build`, `npm run test:workflow-routing`, Fallow primary/fallback JSON parse.
- Required manual checks: verify docs contain required command rules and order.
- Test types needed: existing workflow routing validation plus documentation review.
- Build/lint/typecheck expectations: build passes; lint/typecheck scripts may be absent and documented.
- Acceptance evidence required: audit file and Fallow verdict.
- Proof of completion: committed docs/layer files and passing verification.

## 17. Acceptance Criteria
- [x] Official Fallow files stored under `layers/fallow-quality/`.
- [x] Workflow docs add Fallow Quality after review and before handoff/release/health.
- [x] Mandatory Fallow command rules and report format are documented.
- [x] Installer copies the Fallow layer.
- [x] `.workflow/fallow-audit.md` exists with required sections and verdict.
- [x] Final health check requirements include `.workflow/*`, verification statuses, and Fallow verdict.

## 18. Edge Cases And Failure Modes
- Edge cases: audit base branch detection unavailable; fallback required.
- Failure modes: malformed JSON, missing report, blocking maintainability findings.
- Regression risks: docs/templates drift.
- Recovery expectations: use fallback and document PARTIAL if non-blocking findings remain.

## 19. Risks And Mitigations
- Technical risks: fetched docs are large; mitigate by storing exact local files.
- Product/UX risks: Fallow could be mistaken for SAST; mitigate with explicit non-goals.
- Security risks: telemetry or remote config; mitigate with explicit prohibitions.
- Scope risks: cleanup findings invite unrelated refactors; mitigate by documenting exceptions.
- Mitigation plan: additive changes and focused verification.

## 20. Assumptions
- Explicit assumptions: detailed user prompt is sufficient approval to implement.
- Confidence level: high.
- What to revisit if assumptions are wrong: user may request stricter artifact naming or cleanup fixes.

## 21. Open Questions
- Blocking questions: none.
- Non-blocking questions: whether future workflows should migrate entirely from run-scoped `_workflow/runs` to `.workflow` compatibility paths.
- Execution impact: none.

## 22. Task Extraction Notes
- Suggested vertical task boundaries: single task to integrate Fallow layer end-to-end.
- Suggested first task: add layer files, docs, installer, audit report.
- Suggested task ordering: one complete vertical slice.
- Areas that should not become separate tasks: broad app cleanup/refactors.
- How the 3-pass Build -> Refine -> Polish loop should apply: documentation implementation, refinement for template parity, polish through verification and Fallow audit.
