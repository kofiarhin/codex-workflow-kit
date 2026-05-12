# Detailed Spec: Add Detailed Spec Blueprint To Workflow Kit

## 1. Metadata

- Spec filename: `_spec/2026-05-15-add-detailed-spec-blueprint.md`
- Date: 2026-05-15
- Request ID or slug: `2026-05-15-add-detailed-spec-blueprint`
- Request source: latest direct user prompt synced into `WORK_REQUEST.md`
- Execution mode: `complete-workflow`
- Request classification: `docs`
- Scope level: `medium`
- Risk level: `medium`

## 2. Original Request

- Raw user request: update the workflow kit so the Spec Phase generates a much more detailed, implementation-aware execution blueprint before task planning; update workflow docs/templates/artifacts only; preserve existing 3-pass task hardening and execution modes; verify with searches, available tests, `git diff --stat`, and `git diff`.
- Normalized request: replace the lightweight spec requirements throughout root workflow docs, templates, prompt docs, spec memory docs, and README with a required 22-section detailed spec blueprint; make planning derive from that blueprint; add spec quality review guidance; update health checks and final summaries to validate/report spec completeness.
- Source prompt or `WORK_REQUEST` reference: `WORK_REQUEST.md`

## 3. Questions And Answers

- Questions asked: none.
- Answers received: Not applicable.
- Questions skipped because user said skip questions: Not applicable; the user did not say `skip questions`.
- Remaining open questions: none blocking. The request contains enough file targets, required sections, constraints, acceptance criteria, verification expectations, and execution preference to proceed safely.

## 4. Problem Definition

- Problem being solved: the existing workflow docs describe specs as a short brief with a small list of fields, which is not enough to guide implementation-aware planning.
- Why it matters: weak specs produce vague task plans, missed affected surfaces, unclear verification, and higher risk of task execution drifting from the request.
- Current pain point: the Spec Phase requires items like request summary, goal, functional requirements, and open questions, but does not require current-state analysis, affected surfaces, dependency mapping, execution strategy, verification strategy, risk mitigation, or task extraction guidance.
- Expected value: future agents will create richer specs that can directly support safer vertical task planning and more reliable verification.

## 5. Current State Analysis

- Existing behavior: `RUN_WORKFLOW.md`, `templates/RUN_WORKFLOW.md`, `_spec/README.md`, `templates/_spec/README.md`, and prompt docs list a lightweight spec structure. `README.md` describes specs as capturing the request, answers, assumptions, requirements, edge cases, constraints, success criteria, and out-of-scope work.
- Existing architecture/components involved: this is a workflow documentation kit with root docs, installable templates under `templates/`, workflow memory folders, and reusable prompts.
- Existing files/modules likely involved:
  - `WORK_REQUEST.md`
  - `RUN_WORKFLOW.md`
  - `templates/RUN_WORKFLOW.md`
  - `docs/PROMPTS.md`
  - `templates/docs/PROMPTS.md`
  - `_spec/README.md`
  - `templates/_spec/README.md`
  - `README.md`
  - `_task/2026-05-15-add-detailed-spec-blueprint.md`
  - `_progress/progress.md`
  - `_handoff/current.md`
  - `_review/2026-05-15-add-detailed-spec-blueprint.md`
  - `_release/2026-05-15-add-detailed-spec-blueprint.md`
  - `_summary/2026-05-15-add-detailed-spec-blueprint.md`
- Existing data flow: direct prompt or `WORK_REQUEST.md` -> intake questions -> saved `_spec/` file -> saved `_task/` plan -> task execution -> progress/handoff/review/release/summary.
- Existing API/UI/CLI/workflow behavior: workflow docs and prompts orchestrate agent behavior; no app UI, API route, CLI behavior, database, or runtime service is affected.
- Existing tests or verification coverage: root `package.json` defines `npm test` and `npm run build`; documentation verification is primarily text search and diff review.

## 6. Desired End State

- Expected final behavior: every future workflow run must save a detailed implementation-aware spec before task planning.
- User-facing outcome: users of the kit get clearer planning artifacts and stronger continuity between intake, repo analysis, task extraction, verification, and final reporting.
- Developer-facing outcome: agents have explicit guidance for current-state analysis, affected surfaces, dependencies, data/state impact, execution strategy, verification proof, risks, assumptions, and task extraction.
- System/workflow outcome: the Planning Phase explicitly derives tasks from the detailed spec, and the Health Check fails or becomes `Partial` if required spec sections are missing.
- Backward compatibility expectations: existing execution modes, dirty worktree protection, acceptance results, final diff audit, review, release notes, summary, handoff, and 3-pass task hardening remain intact.

## 7. Scope

- In scope:
  - Replace lightweight spec requirements in the requested root docs/templates with a 22-section detailed spec blueprint.
  - Update prompt docs and template prompt docs with detailed Spec Generation, Spec Quality Review, Vertical Task Generation, and Final Summary guidance.
  - Update README workflow descriptions to describe the detailed execution blueprint.
  - Update workflow health checks to validate required spec sections.
  - Update active workflow artifacts for this run.
- Out of scope:
  - App implementation code in `client/` or `server/`.
  - Deployment changes.
  - New runtime dependencies.
  - Full rewrite of unrelated workflow areas.
  - Removing current execution modes or the 3-pass hardening loop.
- Non-goals:
  - Designing a new product workflow beyond the detailed spec upgrade.
  - Changing installer behavior unless verification reveals a direct documentation mismatch.
  - Adding tests unrelated to documentation behavior.
- Explicit boundaries:
  - Keep changes focused to docs/templates/artifacts named by the user or required by the workflow run.
  - Do not modify `AGENTS.md` unless needed for consistency; the user did not request it as a target file.

## 8. Users And Use Cases

- Primary users: AI coding agents running the workflow in this repo or installed projects.
- Secondary users: developers who install, customize, or review the workflow kit.
- Main use cases:
  - Generate a detailed spec before task planning.
  - Review whether a spec is complete enough for planning.
  - Extract vertical tasks from spec sections rather than from a vague request.
  - Report spec completeness in final summaries.
- Edge use cases:
  - User says `skip questions`; spec still includes assumptions and open questions.
  - Section is irrelevant; spec uses `Not applicable` instead of deleting it.
  - Spec is missing sections; health becomes `Partial` or `Failed`.

## 9. Functional Requirements

- Concrete required behaviors:
  - `RUN_WORKFLOW.md` must require the expanded detailed spec before planning.
  - `templates/RUN_WORKFLOW.md` must mirror root workflow requirements.
  - `_spec/README.md` and `templates/_spec/README.md` must document the detailed spec structure.
  - `docs/PROMPTS.md` and `templates/docs/PROMPTS.md` must include the updated Spec Generation prompt and new Spec Quality Review prompt.
  - Vertical Task Generation guidance must extract tasks from affected surfaces, execution strategy, verification strategy, acceptance criteria, risks, and task extraction notes.
  - Final Summary guidance must report whether the detailed spec was complete or had gaps.
  - Health Check guidance must validate required spec sections.
- Inputs: active user request, intake answers, repo intake, dirty worktree status, handoff/progress context, durable project docs.
- Outputs: updated documentation/template files and workflow run artifacts.
- State changes: workflow memory files are updated for this run; no application state changes.
- Error states: missing detailed spec sections should force `Partial` or `Failed` workflow health depending on severity.
- Permissions/auth expectations: Not applicable.

## 10. Non-Functional Requirements

- Performance expectations: Not applicable for docs-only workflow change.
- Reliability expectations: mirrored root/template docs must stay aligned where the workflow expects identical behavior.
- Security/privacy expectations: do not add secrets or expose sensitive data.
- Accessibility expectations: Not applicable.
- Maintainability expectations: keep the detailed spec template readable, explicit, and reusable without padding.
- DX expectations: agents should be able to copy the spec structure directly into future `_spec/` files and derive task plans from it.

## 11. Affected Surfaces

- Files likely affected:
  - `WORK_REQUEST.md`
  - `RUN_WORKFLOW.md`
  - `templates/RUN_WORKFLOW.md`
  - `docs/PROMPTS.md`
  - `templates/docs/PROMPTS.md`
  - `_spec/README.md`
  - `templates/_spec/README.md`
  - `README.md`
  - `_task/2026-05-15-add-detailed-spec-blueprint.md`
  - `_progress/progress.md`
  - `_handoff/current.md`
  - `_review/2026-05-15-add-detailed-spec-blueprint.md`
  - `_release/2026-05-15-add-detailed-spec-blueprint.md`
  - `_summary/2026-05-15-add-detailed-spec-blueprint.md`
- Directories likely affected: `_spec/`, `_task/`, `_progress/`, `_handoff/`, `_review/`, `_release/`, `_summary/`, `docs/`, `templates/`, `templates/docs/`, `templates/_spec/`.
- UI surfaces: Not applicable.
- API routes: Not applicable.
- Components: Not applicable.
- Services: Not applicable.
- Database/schema: Not applicable.
- Config/env vars: Not applicable.
- Tests: existing `npm test` may be run; no test files expected.
- Docs: primary affected surface.
- Workflow artifacts: active spec, task plan, progress, handoff, review, release notes, and summary.

## 12. Dependency And Integration Map

- Internal dependencies:
  - `README.md` explains the installed workflow.
  - `RUN_WORKFLOW.md` and `templates/RUN_WORKFLOW.md` define the authoritative orchestration.
  - `docs/PROMPTS.md` and `templates/docs/PROMPTS.md` provide reusable prompt snippets that should match workflow requirements.
  - `_spec/README.md` and `templates/_spec/README.md` document the saved spec memory folder.
  - `_task/` plans depend on the saved spec.
- External packages/services: none.
- Integration points: installer consumers will copy template files into target repos; docs must be consistent in root and template locations.
- Ordering constraints:
  - Save this spec before task planning.
  - Save task plan before editing requested docs.
  - Update root and template docs in paired tasks.
  - Run final searches and diff audit before review/summary.
- Migration/setup requirements: none.

## 13. Data And State Impact

- Data models: Not applicable.
- Database changes: Not applicable.
- State management changes: Not applicable.
- Cache/session/local storage impact: Not applicable.
- Backward compatibility impact: existing workflow artifacts remain valid historical records; new specs should use the detailed structure.

## 14. UX / API / Workflow Expectations

- UX expectations: Not applicable.
- API contract expectations: Not applicable.
- CLI/workflow behavior: Spec Phase becomes a detailed execution blueprint gate before Planning Phase; Planning Phase derives tasks from that blueprint.
- Error handling expectations: if a spec lacks required sections, task planning should stop for repair or workflow health should become `Partial`/`Failed`.
- Empty/loading/success/failure states: Not applicable.

## 15. Execution Strategy

- Recommended implementation approach:
  - Update `RUN_WORKFLOW.md` and `templates/RUN_WORKFLOW.md` first so the authoritative workflow requires the detailed blueprint.
  - Update `_spec/README.md` and `templates/_spec/README.md` with the reusable 22-section structure.
  - Update prompt docs and template prompt docs together to keep them mirrored.
  - Update `README.md` to explain the new Spec Phase and task derivation model.
  - Update workflow artifacts after tasks complete.
- Suggested sequencing:
  - `TASK-001`: Update authoritative workflow and spec memory docs.
  - `TASK-002`: Update reusable prompts and template prompt mirror.
  - `TASK-003`: Update README and finalize artifacts.
- Safe rollout/migration approach: documentation-only; no runtime migration needed.
- Files to inspect before editing: all requested files plus current handoff/progress/latest summary.
- Decisions to avoid until more evidence exists: do not introduce extra required spec sections beyond the user's 22-section list unless needed for workflow consistency.

## 16. Verification Strategy

- Required automated checks:
  - `rg "Request summary|Goal|Non-goals|Functional requirements|Success criteria|Open questions" ...`
  - `rg "Spec Phase|Spec Generation|Vertical Task Generation|Health Check" ...`
  - `npm test` if available.
  - `git diff --stat`
  - `git diff`
- Required manual checks:
  - Confirm old lightweight terms are nested within the larger detailed spec structure rather than representing the entire spec.
  - Confirm root/template docs mirror required behavior.
  - Confirm existing execution modes and 3-pass task hardening remain present.
- Test types needed: documentation search checks and available repository test command.
- Build/lint/typecheck expectations: no lint/typecheck scripts are defined; `npm run build` may be run if time permits, but request explicitly asks available formatting/lint/test commands.
- Acceptance evidence required: all acceptance criteria checked `[x]`, search results documented, test/diff commands documented.
- What counts as proof of completion: requested files contain detailed spec requirements; prompt docs mirror each other; final diff audit shows docs/templates/artifacts only; workflow health passes.

## 17. Acceptance Criteria

- [ ] `RUN_WORKFLOW.md` requires the expanded detailed spec before planning.
- [ ] `templates/RUN_WORKFLOW.md` mirrors the same requirement.
- [ ] `_spec/README.md` documents the new detailed spec structure.
- [ ] `templates/_spec/README.md` mirrors it.
- [ ] `docs/PROMPTS.md` includes the updated Spec Generation prompt.
- [ ] `templates/docs/PROMPTS.md` mirrors it.
- [ ] `README.md` describes the spec phase as a detailed execution blueprint.
- [ ] Planning Phase explicitly derives tasks from the detailed spec.
- [ ] Health Check validates required spec sections.
- [ ] Existing 3-pass task hardening loop remains intact.
- [ ] Existing execution modes remain intact.
- [ ] No unrelated workflow behavior is removed.

## 18. Edge Cases And Failure Modes

- Edge cases:
  - Some detailed spec sections are irrelevant for docs-only work; docs must instruct agents to write `Not applicable`.
  - Direct prompt contains enough detail to skip questions without the literal `skip questions` phrase; spec records why no questions were asked.
  - Historical specs remain lightweight; do not rewrite old history.
- Failure modes:
  - Root and template docs drift apart.
  - Prompt docs mention the old lightweight structure.
  - Planning still says "from the saved spec" without naming detailed sections.
  - Health check does not validate spec completeness.
- Regression risks:
  - Accidentally weakening 3-pass task hardening.
  - Accidentally changing default execution mode.
  - Overwriting unrelated user changes.
- Recovery expectations: fix only documentation mismatches found by search/review and rerun the same search command.

## 19. Risks And Mitigations

- Technical risk: documentation duplication can drift across root and template files.
  - Mitigation: update paired files together and compare prompt docs with `git diff --no-index` if practical.
- Product/UX risk: a 22-section spec could become padded boilerplate.
  - Mitigation: explicitly require detailed but not padded content and `Not applicable` for irrelevant sections.
- Security risk: accidental inclusion of secrets in artifacts.
  - Mitigation: final diff audit checks sensitive values/secrets.
- Scope risk: touching unrelated workflow behavior while editing broad docs.
  - Mitigation: keep changes limited to spec phase, planning derivation, prompts, README, and required artifacts.

## 20. Assumptions

- The phrase `Goal`, `Functional requirements`, and similar terms may remain when they are part of the larger detailed spec or unrelated iteration/task fields.
- The root `AGENTS.md` was supplied by the user as instructions but not requested as an update target; it can remain unchanged unless required for consistency.
- `npm test` is the available test command from `package.json`.
- Confidence level: high for docs-only scope and required file list; medium for whether `AGENTS.md` should be updated because the user's requested update list excludes it.
- What should be revisited if assumptions are wrong: if final search shows `AGENTS.md` conflicts with new detailed spec rules in a way that would mislead agents, add a narrowly scoped update.

## 21. Open Questions

- Blocking questions: none.
- Non-blocking questions: should future workflow runs also update `AGENTS.md` spec rules to match root workflow docs? Current request did not include it.
- How each question affects execution: the non-blocking `AGENTS.md` question may become a follow-up if consistency checks reveal a conflict.

## 22. Task Extraction Notes

- Suggested vertical task boundaries:
  - Update authoritative workflow docs and spec memory docs to require the detailed blueprint.
  - Update reusable prompt docs and template prompt docs to generate/review/use the detailed spec.
  - Update README and finalize workflow artifacts/evidence.
- Suggested first task: update `RUN_WORKFLOW.md`, `templates/RUN_WORKFLOW.md`, `_spec/README.md`, and `templates/_spec/README.md`.
- Suggested task ordering:
  - Core workflow/spec structure first.
  - Prompt generation/review/extraction second.
  - Public README and final artifacts last.
- Areas that should not become separate tasks:
  - App code, deployment, database, environment variables, or unrelated workflow behavior.
  - Historical artifact rewrites.
- How the 3-pass Build -> Refine -> Polish loop should apply:
  - Build: add the minimum required detailed spec language.
  - Refine: run targeted searches, fix mismatches, and tighten mirrored docs.
  - Polish: verify old lightweight wording is no longer the entire structure, run tests/diff audit, and complete workflow artifacts.
