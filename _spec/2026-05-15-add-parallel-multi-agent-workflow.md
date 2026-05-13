# Detailed Spec: Add Parallel Multi-Agent Workflow

## 1. Metadata
- Spec filename: `_spec/2026-05-15-add-parallel-multi-agent-workflow.md`
- Date: 2026-05-15
- Request ID / slug: `2026-05-15-add-parallel-multi-agent-workflow`
- Request source: Latest direct user prompt synced into `WORK_REQUEST.md`
- Execution mode: `complete-workflow`
- Request classification: `docs`
- Scope level: `medium`
- Risk level: `medium`

## 2. Original Request
- Raw user request: Update codex-workflow-kit to support parallel multi-agent execution with orchestrator and worker workflows, task claiming, file locks, new execution modes, prompts, health checks, and optional `_parallel` templates.
- Normalized request: Add documentation and templates for safe parallel execution while preserving existing sequential workflow behavior as the fallback.
- Source prompt / WORK_REQUEST reference: `WORK_REQUEST.md`

## 3. Questions And Answers
- Questions asked: None.
- Answers received: Not applicable.
- Questions skipped: The request is explicit enough to proceed; remaining unknowns are minor and documented as assumptions.
- Remaining open questions: None blocking.

## 4. Problem Definition
- Problem being solved: The workflow currently documents sequential task execution only and lacks a safe model for multiple worker agents claiming independent tasks.
- Why it matters: Larger workflows can be completed faster when independent tasks are safely parallelized.
- Current pain point: There is no authoritative task metadata, claim, lock, worker, merge-review, or health-check model for parallel execution.
- Expected value: Agents can use `parallel-workflow`, `parallel-worker`, and `parallel-orchestrator` modes with documented safety checks and fallback behavior.

## 5. Current State Analysis
- Existing behavior: `complete-workflow` executes all generated tasks sequentially. `single-task` executes one task. Every executable task must complete Build -> Refine -> Polish.
- Existing architecture/components: Workflow docs live at root and under `templates/`; prompts live in `docs/PROMPTS.md` and `templates/docs/PROMPTS.md`; task, progress, and handoff guidance live in `_task/README.md`, `_progress/progress.md`, `_handoff/current.md`, and matching templates.
- Existing files/modules likely involved: Requested docs/templates plus `scripts/install.sh` because new template files must be installed.
- Existing data flow: Request -> spec -> task plan -> task execution -> progress/handoff -> review/release/summary.
- Existing API/UI/CLI/workflow behavior: Documentation-only workflow kit; no runtime API/UI behavior should change.
- Existing tests or verification coverage: `npm test` and `npm run build` exist; docs verification is primarily `rg`, `git diff --check`, `git diff --stat`, and `git diff`.

## 6. Desired End State
- Expected final behavior: Sequential modes remain documented and valid. Parallel modes are documented with orchestrator/worker responsibilities, claims, locks, worker-count rules, merge review, and health checks.
- User-facing outcome: Users of the workflow kit can run or prompt parallel multi-agent workflows safely.
- Developer-facing outcome: Maintainers have copied root/template docs and `_parallel` templates that define claims, locks, and agent status.
- System/workflow outcome: Task plans include parallel metadata and health checks validate parallel evidence when parallel modes are used.
- Backward compatibility expectations: Existing `plan-only`, `single-task`, and sequential `complete-workflow` continue to work unchanged as fallback behavior.

## 7. Scope
- In scope: Root workflow docs, template workflow docs, README, prompts, task/progress/handoff guidance, new `_parallel` files and templates, installer copy support, active workflow artifacts.
- Out of scope: Runtime app code under `client/` or `server/`, dependency changes, deployment changes, actual concurrent execution in this run, commits.
- Non-goals: Building an agent scheduler in application code; changing the required Build -> Refine -> Polish loop.
- Explicit boundaries: Documentation and templates only, except `scripts/install.sh` may be updated to install new template files.

## 8. Users And Use Cases
- Primary users: Coding agents and humans using codex-workflow-kit in software repositories.
- Secondary users: Maintainers reviewing workflow artifacts after parallel work.
- Main use cases: Orchestrator plans parallel-safe tasks; workers claim one safe task each; orchestrator performs merge review and final artifacts.
- Edge use cases: Only one task is safe to run; tasks share file locks; a worker discovers unexpected overlap; claims/locks are incomplete.

## 9. Functional Requirements
- Required behaviors: Preserve existing sequential modes; add `parallel-workflow`, `parallel-worker`, and `parallel-orchestrator`; document worker counts; require parallel task metadata; require claims and file locks; add `_parallel` templates; add reusable prompts; update health checks.
- Inputs: User request, saved spec, task plan, claim/lock files, progress, handoff.
- Outputs: Updated docs/templates/prompts/installer/workflow artifacts.
- State changes: Workflow memory files document parallel queue, claims, locks, worker status, merge review, and health.
- Error states: Overlapping active file locks, missing claims, missing iteration evidence, missing merge review, or unsafe dependencies force fallback, `Needs Human Review`, `Partial`, or `Failed`.
- Permissions/auth expectations: Not applicable.

## 10. Non-Functional Requirements
- Performance expectations: Documentation must make the recommended/default worker count 3, minimum 2 when safe, maximum 5, fallback 1.
- Reliability expectations: Parallel rules must prevent overlapping file edits and preserve resumability.
- Security/privacy expectations: Do not add secrets or expose sensitive data.
- Accessibility expectations: Not applicable; no UI work.
- Maintainability expectations: Root docs and templates should stay mirrored where expected; new templates should be plain Markdown and installable.
- DX expectations: Prompts must be copy-paste-ready and terminology must be consistent.

## 11. Affected Surfaces
- Files likely affected: `RUN_WORKFLOW.md`, `templates/RUN_WORKFLOW.md`, `README.md`, `docs/PROMPTS.md`, `templates/docs/PROMPTS.md`, `_task/README.md`, `templates/_task/README.md`, `_handoff/current.md`, `templates/_handoff/current.md`, `_progress/progress.md`, `templates/_progress/progress.md`, `scripts/install.sh`, workflow artifacts.
- Directories likely affected: `_parallel/`, `templates/_parallel/`, `_spec/`, `_task/`, `_progress/`, `_handoff/`, `_review/`, `_release/`, `_summary/`.
- UI surfaces: Not applicable.
- API routes: Not applicable.
- Components: Not applicable.
- Services: Not applicable.
- Database/schema: Not applicable.
- Config/env vars: Not applicable.
- Tests: No tests added; run available repo verification.
- Docs: Root and template workflow documentation.
- Workflow artifacts: This spec, task plan, progress, handoff, review, release notes, summary.

## 12. Dependency And Integration Map
- Internal dependencies: `RUN_WORKFLOW.md` defines canonical behavior; README and prompts must align with it; templates must mirror installable guidance.
- External packages/services: None.
- Integration points: `scripts/install.sh` must copy any new `templates/_parallel` files.
- Ordering constraints: Save spec and task plan before editing docs; update canonical docs before prompts/README; verify root/template consistency before final artifacts.
- Migration/setup requirements: Existing installed projects can adopt new `_parallel` templates through installer.

## 13. Data And State Impact
- Data models: Not applicable.
- Database changes: None.
- State management changes: Workflow state gains queue/claim/lock/worker-status documentation.
- Cache/session/local storage impact: None.
- Backward compatibility impact: Sequential modes stay valid; parallel metadata is additive.

## 14. UX / API / Workflow Expectations
- UX expectations: Not applicable.
- API contract expectations: Not applicable.
- CLI/workflow behavior: New execution modes are prompt/workflow modes, not a runtime CLI.
- Error handling expectations: Lock conflicts or missing parallel evidence produce fallback, `Needs Human Review`, `Partial`, or `Failed` health.
- Empty/loading/success/failure states: Parallel templates should define empty initial states and status fields.

## 15. Execution Strategy
- Recommended implementation approach: Update canonical workflow docs and new `_parallel` templates first, then task/progress/handoff templates, then README/prompts/installer, then verification/final artifacts.
- Suggested sequencing: TASK-001 core model and `_parallel`; TASK-002 task/progress/handoff metadata; TASK-003 README/prompts/installer; TASK-004 final verification and artifacts.
- Safe rollout/migration approach: Additive documentation changes; preserve sequential fallback language.
- Files to inspect before editing: Requested files, existing templates, installer, package scripts.
- Decisions to avoid until more evidence exists: No runtime scheduling implementation or dependency additions.

## 16. Verification Strategy
- Required automated checks: `rg` checks requested by user; `npm test`; `npm run build`; `git diff --check`; final `git diff --stat` and `git diff`.
- Required manual checks: Confirm no `client/` or `server/` app/runtime files changed; confirm root/template parallel docs are aligned.
- Test types needed: Documentation search checks and existing repo test/build commands.
- Build/lint/typecheck expectations: No lint script exists; run available test/build commands.
- Acceptance evidence required: Each requested mode and worker-count rule appears in docs; file lock and claim rules appear; new templates exist and installer copies them.
- Proof of completion: Passing verification commands and final diff audit.

## 17. Acceptance Criteria
- [ ] Existing sequential `complete-workflow` behavior remains documented as fallback.
- [ ] `parallel-workflow`, `parallel-worker`, and `parallel-orchestrator` modes are documented.
- [ ] Task template includes priority, parallel safety, dependencies, file locks, claim status, claimed by, agent role, and merge risk.
- [ ] README explains default 3 workers, minimum 2, maximum 5, and fallback 1.
- [ ] Copy-paste-ready parallel orchestrator and worker prompts exist in root and template prompt docs.
- [ ] `_parallel` and `templates/_parallel` files exist and installer copies template files.
- [ ] Health checks validate priorities, parallel-safe flags, dependencies, locks, claims, overlap, iteration evidence, merge review, and final verification.
- [ ] No app/runtime code is changed.

## 18. Edge Cases And Failure Modes
- Edge cases: Only one unblocked task; many safe tasks but max worker limit; same-priority tasks with different merge risk; worker discovers new file overlap.
- Failure modes: Missing locks, overlapping active locks, stale claim, missing Build/Refine/Polish evidence, missing merge review.
- Regression risks: Accidentally weakening sequential mode rules; root/template docs diverge; installer omits new templates.
- Recovery expectations: Fall back to sequential execution or mark task/workflow as `Needs Human Review`, `Partial`, or `Failed`.

## 19. Risks And Mitigations
- Technical risks: Docs may become inconsistent across root/templates. Mitigation: mirror checks and targeted searches.
- Product/UX risks: Parallel rules may be too vague. Mitigation: add concrete metadata and template files.
- Security risks: None expected beyond avoiding secrets.
- Scope risks: Updating app/runtime code would violate scope. Mitigation: check `git status --short` and final diff.
- Mitigation plan: Keep edits docs/template-only and verify all requested terms.

## 20. Assumptions
- Explicit assumptions: "Installer templates include any new `_parallel` files" means update `scripts/install.sh` to copy `templates/_parallel/*`.
- Confidence level: High.
- What to revisit if assumptions are wrong: If installer changes are considered out of scope, revert only the installer copy additions.

## 21. Open Questions
- Blocking questions: None.
- Non-blocking questions: Whether future installer behavior should copy `_parallel` only when parallel mode is requested.
- Execution impact: No blocker.

## 22. Task Extraction Notes
- Suggested vertical task boundaries: Core workflow model and `_parallel` templates; task/progress/handoff metadata; README/prompts/installer; final verification/artifacts.
- Suggested first task: Add canonical parallel workflow model and new `_parallel` templates.
- Suggested task ordering: Canonical docs first, then memory templates, then prompts/README/installer, then final verification.
- Areas that should not become separate tasks: Runtime scheduler implementation, app code, dependency changes.
- How the 3-pass Build -> Refine -> Polish loop should apply: Each docs task gets Build for first pass, Refine for consistency fixes, Polish for mirror/search verification.
