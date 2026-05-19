# Add TDD-First Workflow Rule

## 1. Metadata
- Spec filename: `_spec/2026-05-19-add-tdd-first-workflow.md`
- Date: 2026-05-19
- Request ID / slug: `2026-05-19-add-tdd-first-workflow`
- Request source: Latest direct user prompt, synced to `WORK_REQUEST.md`
- Execution mode: `complete-workflow`
- Request classification: `docs`
- Scope level: `medium`
- Risk level: `low`

## 2. Original Request
- Raw user request: Update the workflow kit so code generation follows a strict TDD-first approach while preserving the existing workflow structure. Do not replace the workflow. Extend it. Required changes include embedding Red/Green/Refactor in every code-changing task and every Build -> Refine -> Polish iteration, updating task templates, review/health rules, README/docs, and running a final diff audit.
- Normalized request: Extend the existing workflow documentation and templates so code-changing tasks require TDD-first evidence inside each iteration, while preserving all existing workflow artifacts, statuses, modes, progress/handoff/review/release/summary, dirty worktree, and health-check behavior.
- Source prompt / WORK_REQUEST reference: `WORK_REQUEST.md`

## 3. Questions And Answers
- Questions asked: None.
- Answers received: Not applicable.
- Questions skipped: The request is specific and implementation surfaces are discoverable from repository docs.
- Remaining open questions: None blocking. The implementation assumes documentation-only workflow changes are desired and no app/runtime behavior should change.

## 4. Problem Definition
- Problem being solved: The workflow currently requires verification and a 3-pass Build -> Refine -> Polish loop, but does not strictly require tests to be written or updated before code changes.
- Why it matters: Agents can otherwise implement code first and add tests afterward, which weakens regression proof and makes behavior less traceable.
- Current pain point: Task plans, iteration evidence, review, and health checks do not require Red/Green/Refactor evidence for code-changing tasks.
- Expected value: Future code generation is test-led, observable, and blocked from `Done` unless TDD evidence or a justified exception is recorded.

## 5. Current State Analysis
- Existing behavior: `RUN_WORKFLOW.md` requires a detailed spec, task plan, complete-workflow by default, dirty worktree protection, Build -> Refine -> Polish, verification, progress, handoff, review, release notes, summary, and health check.
- Existing architecture/components: Workflow docs live at root and under `templates/`; task memory instructions live in `_task/README.md` and `templates/_task/README.md`; progress and handoff templates provide evidence fields; README explains expected usage.
- Existing files/modules likely involved: `RUN_WORKFLOW.md`, `templates/RUN_WORKFLOW.md`, `_task/README.md`, `templates/_task/README.md`, `_progress/progress.md`, `templates/_progress/progress.md`, `README.md`, `docs/PROMPTS.md`, `templates/docs/PROMPTS.md`, `AGENTS.md`, `templates/AGENTS.md`, workflow artifacts for this run.
- Existing data flow: Not applicable.
- Existing API/UI/CLI/workflow behavior: Documentation-driven workflow; no runtime API or UI changes.
- Existing tests or verification coverage: Repo has `npm test` and `npm run build`; documentation changes are typically verified with `rg` searches, mirror checks, `git diff --check`, and final diff audit.

## 6. Desired End State
- Expected final behavior: Every future code-changing task must follow Red, Green, and Refactor inside every Build, Refine, and Polish iteration unless a missing-test exception is explicitly justified.
- User-facing outcome: Users of the kit see TDD-first workflow rules in README and generated workflow docs.
- Developer-facing outcome: Agents must create/update relevant failing tests first, observe the expected failure when possible, implement the smallest passing change, verify passing tests, refactor without behavior change, and verify tests still pass.
- System/workflow outcome: Task templates, progress evidence, review, and health check enforce TDD evidence before `Done` for code tasks.
- Backward compatibility expectations: Existing execution modes, artifacts, statuses, parallel support, dirty worktree protection, progress, handoff, review, release notes, summary, and health check behavior remain intact.

## 7. Scope
- In scope: Extend workflow docs and templates with TDD-first rules; update task template/evidence fields; update review and health-check rules; update README/docs where needed; create required workflow artifacts; run verification and final diff audit.
- Out of scope: App/runtime code changes, dependency changes, deployment changes, broad rewrite of the workflow, changing execution modes or statuses.
- Non-goals: Implementing new test tooling, changing the MERN example app behavior, enforcing TDD with scripts.
- Explicit boundaries: Preserve the current workflow structure and add TDD requirements into it.

## 8. Users And Use Cases
- Primary users: Coding agents and developers using the workflow kit for software changes.
- Secondary users: Reviewers checking generated workflow artifacts.
- Main use cases: A future feature or bugfix task requires the agent to write failing tests first, implement, refactor, and record evidence before `Done`.
- Edge use cases: Docs-only tasks or research tasks may have no relevant tests; missing-test exceptions must be documented for code-changing tasks when tests cannot be added or observed.

## 9. Functional Requirements
- Required behaviors: Code-changing tasks require Red/Green/Refactor phases in every iteration; task plans include test plan and phase evidence fields; progress/review/health checks reject missing TDD evidence for code tasks unless justified.
- Inputs: Existing workflow docs/templates and active request.
- Outputs: Updated workflow documentation, templates, prompts, and workflow artifacts.
- State changes: Workflow memory files for this run are updated; no runtime state changes.
- Error states: Missing TDD evidence causes `Needs Human Review`, `Blocked`, `Partial`, or `Failed` health depending on severity.
- Permissions/auth expectations: Not applicable.

## 10. Non-Functional Requirements
- Performance expectations: Documentation-only changes should not add runtime cost.
- Reliability expectations: Rules should be explicit enough for agents to follow consistently.
- Security/privacy expectations: No secrets or sensitive data added.
- Accessibility expectations: Not applicable.
- Maintainability expectations: Keep wording concise and consistent across root/template docs.
- DX expectations: TDD evidence fields should be easy to fill and review.

## 11. Affected Surfaces
- Files likely affected: `WORK_REQUEST.md`, `RUN_WORKFLOW.md`, `templates/RUN_WORKFLOW.md`, `_task/README.md`, `templates/_task/README.md`, `_progress/progress.md`, `templates/_progress/progress.md`, `README.md`, `docs/PROMPTS.md`, `templates/docs/PROMPTS.md`, `AGENTS.md`, `templates/AGENTS.md`, workflow artifact files.
- Directories likely affected: `_spec/`, `_task/`, `_progress/`, `_handoff/`, `_review/`, `_release/`, `_summary/`, `templates/`, `docs/`.
- UI surfaces: None.
- API routes: None.
- Components: None.
- Services: None.
- Database/schema: None.
- Config/env vars: None.
- Tests: Documentation verification via search/build/test commands; no app tests added because no app code changes.
- Docs: Root and template workflow docs and README/prompt docs.
- Workflow artifacts: Spec, task plan, progress, handoff, review, release notes, summary.

## 12. Dependency And Integration Map
- Internal dependencies: Root docs and template docs should stay aligned where templates mirror installed files.
- External packages/services: None.
- Integration points: `scripts/install.sh` already copies templates; no installer change expected unless affected template files need new paths.
- Ordering constraints: Sync work request, save spec, save task plan, then edit workflow docs/templates, verify, review, release, summarize.
- Migration/setup requirements: None.

## 13. Data And State Impact
- Data models: None.
- Database changes: None.
- State management changes: None.
- Cache/session/local storage impact: None.
- Backward compatibility impact: Existing workflow behavior is preserved and extended with stricter code-task gates.

## 14. UX / API / Workflow Expectations
- UX expectations: README briefly explains TDD-first code generation without bloating usage docs.
- API contract expectations: None.
- CLI/workflow behavior: Agents must run and record test commands for Red, Green, and Refactor phases when changing code.
- Error handling expectations: If a failing test cannot be written or observed first, the task must document a missing-test exception and cannot silently proceed.
- Empty/loading/success/failure states: Not applicable.

## 15. Execution Strategy
- Recommended implementation approach: Update canonical workflow docs first, then task/progress templates, then README/prompts/agent guide as needed, keeping root/template mirrors aligned.
- Suggested sequencing: One documentation task for canonical workflow/template enforcement, then one verification/finalization task.
- Safe rollout/migration approach: Documentation-only updates; verify with targeted `rg` searches and repository checks.
- Files to inspect before editing: `RUN_WORKFLOW.md`, `templates/RUN_WORKFLOW.md`, `_task/README.md`, `templates/_task/README.md`, `README.md`, `docs/PROMPTS.md`, `AGENTS.md`.
- Decisions to avoid until more evidence exists: Do not add new dependencies or automated lint scripts.

## 16. Verification Strategy
- Required automated checks: Targeted `rg` searches for TDD/Red/Green/Refactor evidence terms, root/template mirror checks where expected, `npm test`, `npm run build`, `git diff --check`, final `git diff --stat`, and `git diff`.
- Required manual checks: Review final diff for scope, secrets, unrelated files, and preservation of existing workflow behavior.
- Test types needed: Documentation verification only for this workflow-docs task; future code tasks will require relevant automated tests first.
- Build/lint/typecheck expectations: `npm run build` should pass; no lint script is defined.
- Acceptance evidence required: Changed docs include TDD-first rules, task evidence fields, review/health gates, and README/docs explanation.
- Proof of completion: Final review, release notes, summary, handoff, health check, and final diff audit.

## 17. Acceptance Criteria
- [ ] `RUN_WORKFLOW.md` and `templates/RUN_WORKFLOW.md` require Red, expected-failure verification, Green, passing verification, Refactor, and post-refactor verification for every code-changing task.
- [ ] Build -> Refine -> Polish instructions embed TDD inside each iteration.
- [ ] `_task/README.md` and `templates/_task/README.md` require test plan, Red phase evidence, Green phase evidence, Refactor phase evidence, test commands run, and acceptance result.
- [ ] Review and health-check rules prevent code tasks from `Done` without first-test evidence, expected failure when possible, post-implementation passing verification, or justified missing-test exception.
- [ ] Existing workflow modes, artifacts, statuses, dirty worktree protection, progress, handoff, review, release notes, summary, and health check remain documented.
- [ ] README/docs explain the TDD-first code generation rule without broad unrelated edits.
- [ ] Final diff audit runs and changed files are reported.
- [ ] No app/runtime code is changed.

## 18. Edge Cases And Failure Modes
- Edge cases: Pure docs tasks, pure research tasks, generated boilerplate without test harness, legacy code with no feasible test seam.
- Failure modes: Agent treats TDD as optional, records passing tests only after implementation, omits expected failing test evidence, or marks `Done` despite missing test exception.
- Regression risks: Accidentally weakening complete-workflow, parallel workflow, or Build -> Refine -> Polish requirements while adding TDD language.
- Recovery expectations: Fix docs/templates in-scope; if verification cannot prove coverage, stop with `Needs Human Review`.

## 19. Risks And Mitigations
- Technical risks: Root/template docs diverge; mitigate with mirror checks and targeted searches.
- Product/UX risks: README becomes too verbose; mitigate with concise additions.
- Security risks: None beyond standard secret scan via diff review.
- Scope risks: Over-editing unrelated workflow docs; mitigate with targeted patches.
- Mitigation plan: Keep edits to workflow docs/templates/artifacts and verify no `client/` or `server/` app files changed.

## 20. Assumptions
- Explicit assumptions: TDD enforcement is documentation/prompt enforcement, not a new script; docs-only tasks can use missing-test/not-applicable evidence.
- Confidence level: High.
- What to revisit if assumptions are wrong: Add automated validators for workflow artifacts in a future task if requested.

## 21. Open Questions
- Blocking questions: None.
- Non-blocking questions: Whether future generated workflows should include a machine-readable TDD checklist file.
- Execution impact: None for this request.

## 22. Task Extraction Notes
- Suggested vertical task boundaries: `TASK-001` update TDD-first workflow and task evidence docs/templates; `TASK-002` verify, finalize artifacts, and report final diff.
- Suggested first task: Update `RUN_WORKFLOW.md`, template workflow, task template docs, progress evidence docs, README/prompts/AGENTS as needed.
- Suggested task ordering: Canonical docs first, supporting docs second, final artifacts last.
- Areas that should not become separate tasks: App tests/runtime code because no app behavior changes are requested.
- How the 3-pass Build -> Refine -> Polish loop should apply: Each docs task still runs Build, Refine, and Polish; because these are documentation-only tasks, Red/Green/Refactor evidence is recorded as not applicable with a missing-test exception. Future code-changing tasks must execute Red/Green/Refactor inside each iteration.
