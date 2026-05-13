# Detailed Spec: Fix Detailed Spec Workflow Update

## 1. Metadata

- Spec filename: `_spec/2026-05-15-fix-detailed-spec-workflow-update.md`
- Date: 2026-05-15
- Request ID / slug: `2026-05-15-fix-detailed-spec-workflow-update`
- Request source: latest direct user prompt synced into `WORK_REQUEST.md`
- Execution mode: `complete-workflow`
- Request classification: `docs`
- Scope level: `medium`
- Risk level: `medium`

## 2. Original Request

- Raw user request: fix the failed detailed-spec workflow update; update workflow documentation, templates, prompts, and relevant workflow artifacts only; use the exact detailed spec structure provided; preserve execution modes, dirty worktree protection, workflow artifacts, health check, and the 3-pass Build -> Refine -> Polish loop; run required searches, available checks, `git diff --stat`, and `git diff`; do not commit.
- Normalized request: remove remaining lightweight spec guidance and make the detailed 22-section implementation-aware spec template the authoritative shape across workflow docs, templates, prompt docs, task-planning guidance, and workflow artifacts.
- Source prompt / WORK_REQUEST reference: `WORK_REQUEST.md`

## 3. Questions And Answers

- Questions asked: none.
- Answers received: Not applicable.
- Questions skipped: the user did not explicitly say `skip questions`, but the request includes exact files, exact structure, constraints, verification commands, final response requirements, and execution preference. No blocking clarifying question remains.
- Remaining open questions: none blocking.

## 4. Problem Definition

- Problem being solved: the previous detailed-spec update left old lightweight spec guidance in workflow docs and did not consistently require task plans to cite detailed spec sections.
- Why it matters: conflicting workflow instructions can cause future agents to generate short briefs instead of implementation-aware blueprints, weakening planning and verification.
- Current pain point: `AGENTS.md` and `templates/AGENTS.md` still include the old `Spec Rules` list beginning with `Request summary`; `_task/README.md` and `templates/_task/README.md` do not clearly require task plans to be derived from and cite the detailed spec sections.
- Expected value: future workflow runs will consistently create complete detailed specs before task planning, and task plans will trace back to those specs.

## 5. Current State Analysis

- Existing behavior: `RUN_WORKFLOW.md`, `templates/RUN_WORKFLOW.md`, `docs/PROMPTS.md`, `templates/docs/PROMPTS.md`, `README.md`, `_spec/README.md`, and `templates/_spec/README.md` already contain substantial detailed-spec language. Remaining old lightweight guidance appears in `AGENTS.md` and `templates/AGENTS.md`.
- Existing architecture/components: this repo is a workflow documentation kit with root docs, mirrored install templates, reusable prompt docs, and workflow memory artifacts.
- Existing files/modules likely involved:
  - `WORK_REQUEST.md`
  - `AGENTS.md`
  - `templates/AGENTS.md`
  - `RUN_WORKFLOW.md`
  - `templates/RUN_WORKFLOW.md`
  - `_spec/README.md`
  - `templates/_spec/README.md`
  - `_task/README.md`
  - `templates/_task/README.md`
  - `docs/PROMPTS.md`
  - `templates/docs/PROMPTS.md`
  - `README.md`
  - `_task/2026-05-15-fix-detailed-spec-workflow-update.md`
  - `_progress/progress.md`
  - `_handoff/current.md`
  - `_review/2026-05-15-fix-detailed-spec-workflow-update.md`
  - `_release/2026-05-15-fix-detailed-spec-workflow-update.md`
  - `_summary/2026-05-15-fix-detailed-spec-workflow-update.md`
- Existing data flow: user request or `WORK_REQUEST.md` -> intake -> detailed `_spec/` file -> `_task/` plan -> task execution -> progress/handoff/review/release/summary.
- Existing API/UI/CLI/workflow behavior: workflow documentation controls agent behavior; no app API, UI, database, or runtime behavior is involved.
- Existing tests or verification coverage: root `package.json` has `npm test` and `npm run build`; docs verification is primarily text search, mirror checks, and diff audit.

## 6. Desired End State

- Expected final behavior: all authoritative workflow docs and templates require detailed specs as execution blueprints before planning, with no old lightweight spec template remaining as active guidance.
- User-facing outcome: users and agents see one consistent detailed-spec workflow.
- Developer-facing outcome: maintainers can verify spec completeness and trace tasks back to detailed spec sections.
- System/workflow outcome: health checks fail or become partial when detailed spec sections are missing; task plans cite the detailed spec sections used for extraction.
- Backward compatibility expectations: existing execution modes, dirty worktree protection, failure recovery, acceptance tracking, handoff/progress/review/release/summary, and Build -> Refine -> Polish remain intact.

## 7. Scope

- In scope:
  - Replace remaining lightweight spec rules in `AGENTS.md` and `templates/AGENTS.md`.
  - Make `_task/README.md` and `templates/_task/README.md` require spec-derived task planning with section citations/references.
  - Tighten `_spec/README.md` and `templates/_spec/README.md` to present the exact detailed spec template.
  - Confirm requested root/template workflow docs, prompt docs, and README already satisfy or patch any gaps found by searches.
  - Update workflow artifacts for this run.
- Out of scope:
  - App/runtime code under `client/` or `server/`.
  - Deployment configuration.
  - Dependency changes.
  - Removing existing execution modes or workflow gates.
- Non-goals:
  - Rewriting historical workflow artifacts except adding this run's artifacts.
  - Introducing new workflow phases beyond the requested detailed-spec fix.
- Explicit boundaries: documentation, templates, prompts, and workflow artifacts only.

## 8. Users And Use Cases

- Primary users: AI coding agents following this workflow.
- Secondary users: developers installing or reviewing the workflow kit.
- Main use cases:
  - Generate a detailed spec before task planning.
  - Review detailed spec completeness.
  - Derive and cite vertical tasks from detailed spec sections.
  - Report spec gaps in summaries and final responses.
- Edge use cases:
  - Irrelevant spec sections must say `Not applicable`.
  - Historical lightweight specs may exist but should not be used as current template guidance.

## 9. Functional Requirements

- Required behaviors:
  - All active spec-template guidance uses the exact 22-section detailed spec structure.
  - Task planning guidance requires deriving tasks from the detailed spec and citing/referencing the sections used.
  - Health check guidance treats missing detailed spec sections as `Partial` or `Failed`.
  - Final response guidance mentions the detailed spec file used and whether gaps existed.
  - Existing Build -> Refine -> Polish and execution modes remain documented.
- Inputs: user request, existing workflow docs/templates/prompts, current workflow artifacts, search results.
- Outputs: updated docs/templates/prompts/artifacts.
- State changes: workflow memory artifacts updated for this run only.
- Error states: missing required detailed spec sections should be repaired before planning or documented as `Partial`/`Failed`.
- Permissions/auth expectations: Not applicable.

## 10. Non-Functional Requirements

- Performance expectations: Not applicable.
- Reliability expectations: mirrored root/template docs remain consistent.
- Security/privacy expectations: no secrets or sensitive values added.
- Accessibility expectations: Not applicable.
- Maintainability expectations: keep template wording copyable and exact; avoid duplicating contradictory spec guidance.
- DX expectations: agents can follow the template directly without guessing which spec structure is authoritative.

## 11. Affected Surfaces

- Files likely affected:
  - `WORK_REQUEST.md`
  - `AGENTS.md`
  - `templates/AGENTS.md`
  - `_spec/README.md`
  - `templates/_spec/README.md`
  - `_task/README.md`
  - `templates/_task/README.md`
  - Workflow artifacts for this request
- Directories likely affected: root, `templates/`, `_spec/`, `_task/`, `_progress/`, `_handoff/`, `_review/`, `_release/`, `_summary/`.
- UI surfaces: Not applicable.
- API routes: Not applicable.
- Components: Not applicable.
- Services: Not applicable.
- Database/schema: Not applicable.
- Config/env vars: Not applicable.
- Tests: existing repository test/build commands only.
- Docs: primary affected surface.
- Workflow artifacts: active spec, task plan, progress, handoff, review, release notes, summary.

## 12. Dependency And Integration Map

- Internal dependencies: root docs should match install templates; task README guidance should match planning rules in `RUN_WORKFLOW.md`; prompt docs should remain aligned with detailed spec requirements.
- External packages/services: none.
- Integration points: installer consumers receive the `templates/` versions; local agents read root docs.
- Ordering constraints: save this detailed spec before task planning; save task plan before editing docs; update root/template pairs together.
- Migration/setup requirements: none.

## 13. Data And State Impact

- Data models: Not applicable.
- Database changes: Not applicable.
- State management changes: Not applicable.
- Cache/session/local storage impact: Not applicable.
- Backward compatibility impact: historical artifacts remain; current guidance changes for future runs.

## 14. UX / API / Workflow Expectations

- UX expectations: Not applicable.
- API contract expectations: Not applicable.
- CLI/workflow behavior: future workflows must treat detailed spec generation as a required gate before planning.
- Error handling expectations: incomplete specs trigger repair before planning or `Partial`/`Failed` health.
- Empty/loading/success/failure states: Not applicable.

## 15. Execution Strategy

- Recommended implementation approach:
  - Update `AGENTS.md` and `templates/AGENTS.md` spec rules from lightweight fields to the exact detailed spec structure and health/planning requirements.
  - Replace `_spec/README.md` and `templates/_spec/README.md` with a copyable exact detailed spec template.
  - Update `_task/README.md` and `templates/_task/README.md` so task plans cite/reference detailed spec sections.
  - Run required searches across the repo and patch any remaining active lightweight guidance.
  - Run available tests/build and final diff audit.
- Suggested sequencing:
  - `TASK-001`: Replace remaining lightweight spec guidance and exact-template gaps.
  - `TASK-002`: Verify, finalize artifacts, and document the workflow result.
- Safe rollout/migration approach: docs-only change; no runtime migration.
- Files to inspect before editing: all files listed in the user request plus `AGENTS.md` and `templates/AGENTS.md`.
- Decisions to avoid until more evidence exists: do not change app code, installer behavior, or execution modes.

## 16. Verification Strategy

- Required automated checks:
  - `rg -n "Request summary" .`
  - `rg -n "Spec Phase" .`
  - `rg -n "Spec Generation" .`
  - `rg -n "Vertical Task Generation" .`
  - `rg -n "Health Check" .`
  - `rg -n "detailed spec" .`
  - available test/build commands from `package.json`
  - `git diff --stat`
  - `git diff`
- Required manual checks:
  - Confirm remaining `Request summary` matches are historical artifacts or not active template guidance.
  - Confirm root/template mirrored files match where required.
  - Confirm no app/runtime files changed.
- Test types needed: documentation search checks; existing repo test/build commands.
- Build/lint/typecheck expectations: no lint/typecheck script is documented; run `npm test` and `npm run build`.
- Acceptance evidence required: all acceptance criteria checked `[x]`; command results documented.
- Proof of completion: required docs/templates contain exact detailed spec guidance, task plans cite spec sections, searches show no active lightweight template remains, and final diff stays docs/artifacts only.

## 17. Acceptance Criteria

- [ ] `AGENTS.md` no longer uses the old lightweight `Spec Rules` list as active guidance.
- [ ] `templates/AGENTS.md` mirrors the updated detailed spec rules.
- [ ] `_spec/README.md` contains the exact detailed spec template structure.
- [ ] `templates/_spec/README.md` mirrors `_spec/README.md`.
- [ ] `_task/README.md` requires task plans to be derived from and cite/reference detailed spec sections.
- [ ] `templates/_task/README.md` mirrors the same task-planning requirement.
- [ ] Required searches are run and documented.
- [ ] Existing execution modes and 3-pass task hardening remain intact.
- [ ] No app/runtime code is changed.

## 18. Edge Cases And Failure Modes

- Edge cases:
  - Historical workflow artifacts may still contain old terms; they can remain if they are clearly historical records.
  - `Request summary` may remain in the user's request text, progress logs, or old specs.
- Failure modes:
  - Updating root docs without mirrored templates.
  - Removing required workflow gates while replacing text.
  - Treating old search matches in historical artifacts as active guidance.
- Regression risks:
  - Weakening the 3-pass loop.
  - Weakening dirty worktree or health-check requirements.
- Recovery expectations: patch only the in-scope documentation mismatch and rerun the failing search/check.

## 19. Risks And Mitigations

- Technical risks: repeated workflow language can drift.
  - Mitigation plan: update root/template pairs and run mirror checks.
- Product/UX risks: exact 22-section template could feel verbose.
  - Mitigation plan: preserve `Not applicable` guidance and "detailed but not padded" wording.
- Security risks: accidental secrets in workflow artifacts.
  - Mitigation plan: final diff audit.
- Scope risks: broad docs edits may touch unrelated workflow behavior.
  - Mitigation plan: keep edits limited to spec/planning guidance and required artifacts.

## 20. Assumptions

- Explicit assumptions:
  - `AGENTS.md` and `templates/AGENTS.md` are workflow documentation and can be updated because they contain the remaining active lightweight spec guidance.
  - Historical `_spec/`, `_task/`, `_progress/`, `_review/`, `_release/`, and `_summary/` files do not need retroactive rewriting except for this run's new artifacts.
  - `rg` can substitute for the requested `grep -R` searches on Windows while checking the same strings.
- Confidence level: high.
- What to revisit if assumptions are wrong: if the user wants literal `grep` output only, rerun equivalent searches in a bash shell if available.

## 21. Open Questions

- Blocking questions: none.
- Non-blocking questions: none.
- Execution impact: Not applicable.

## 22. Task Extraction Notes

- Suggested vertical task boundaries:
  - Replace remaining active lightweight spec guidance in agent/spec/task documentation.
  - Verify and finalize workflow artifacts.
- Suggested first task: patch `AGENTS.md`, `templates/AGENTS.md`, `_spec/README.md`, `templates/_spec/README.md`, `_task/README.md`, and `templates/_task/README.md`.
- Suggested task ordering:
  - Documentation patch first.
  - Verification/final artifacts second.
- Areas that should not become separate tasks: app code, deployment, dependencies, historical artifact rewrites.
- How the 3-pass Build -> Refine -> Polish loop should apply:
  - Build: make the core documentation changes.
  - Refine: run searches and fix active guidance mismatches.
  - Polish: run tests/build/diff audit and finalize artifacts.
