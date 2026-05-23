# Spec: Add Mandatory Spec Approval Gate

## 1. Metadata

- Spec filename: `_spec/2026-05-23-add-spec-approval-gate.md`
- Date: 2026-05-23
- Request ID / slug: `2026-05-23-add-spec-approval-gate`
- Request source: Latest direct user prompt, synced to `WORK_REQUEST.md`
- Execution mode: `complete-workflow`
- Request classification: `docs`
- Scope level: `medium`
- Risk level: `medium`

## 2. Original Request

- Raw user request: Update the workflow so there is a mandatory user approval gate after spec generation. Change `RUN_WORKFLOW.md` and any matching README/docs references so the workflow saves the spec, displays a summary and exact approval prompt, stops for explicit approval or revisions, and only then generates `_task/` and continues by execution mode. Preserve Build -> Refine -> Polish and TDD after approval.
- Normalized request: Add a mandatory spec approval gate to the workflow docs/templates so planning and implementation cannot proceed until the user explicitly approves the saved spec. Update continue-workflow, execution-mode, health-check, and final UX documentation to enforce the gate.
- Source prompt / WORK_REQUEST reference: `WORK_REQUEST.md`

## 3. Questions And Answers

- Questions asked: None.
- Answers received: Not applicable.
- Questions skipped: The user did not explicitly say `skip questions`, but the request is concrete, docs-only, and includes exact behavior, valid phrases, execution-mode behavior, health-check behavior, and UX requirements. Remaining unknowns are non-blocking and documented as assumptions.
- Remaining open questions: Whether `AGENTS.md` should be included under "matching README/docs references." Assumption: yes for workflow consistency if matching rules exist there, including template copies.

## 4. Problem Definition

- Problem being solved: The current workflow allows task-plan generation immediately after spec generation, which does not force the user to review and approve the spec first.
- Why it matters: The spec is the scope contract. Planning and implementation based on an unapproved spec can produce unnecessary work or drift from user intent.
- Current pain point: Documentation currently describes a linear `spec -> task plan -> execution` flow without a mandatory human approval pause.
- Expected value: Users can review the spec directly in chat and request changes before task planning or implementation begins.

## 5. Current State Analysis

- Existing behavior: `RUN_WORKFLOW.md`, `README.md`, `AGENTS.md`, templates, and prompt docs describe generating `_task/` from `_spec/` before execution without a required approval gate.
- Existing architecture/components: Workflow memory lives in `_spec/`, `_task/`, `_progress/`, `_handoff/`, `_review/`, `_release/`, and `_summary/`. Templates mirror root workflow docs for installation into other repos.
- Existing files/modules likely involved: `RUN_WORKFLOW.md`, `README.md`, `AGENTS.md`, `docs/PROMPTS.md`, `templates/RUN_WORKFLOW.md`, `templates/AGENTS.md`, `templates/docs/PROMPTS.md`, `templates/WORK_REQUEST.md`, `_spec/README.md`, `templates/_spec/README.md`, `_task/README.md`, `templates/_task/README.md`, `_summary/README.md`, `templates/_summary/README.md`, `templates/_handoff/current.md`, and active workflow artifacts.
- Existing data flow: User prompt or `WORK_REQUEST.md` feeds intake, spec generation, task planning, task execution, progress/handoff, review, release notes, summary, and health check.
- Existing API/UI/CLI/workflow behavior: Documentation-only workflow. No runtime API or UI behavior is involved.
- Existing tests or verification coverage: Verification is by targeted documentation searches, root/template mirror checks where appropriate, `git diff --check`, final diff audit, and optional full repository tests/build if scope or risk justifies.

## 6. Desired End State

- Expected final behavior: The documented workflow order becomes request -> grill-me intake unless skipped/resuming -> shared understanding handoff -> sync `WORK_REQUEST.md` -> dirty worktree check -> generate and save detailed spec -> display summary and path -> stop for approval/revision/cancel -> generate `_task/` only after explicit approval -> continue by execution mode.
- User-facing outcome: The user sees the saved spec path, a short spec summary, clear approval options, and a wait state in chat before planning begins.
- Developer-facing outcome: Agents have explicit valid approval, revision, and cancel phrase rules plus continue-workflow recovery rules.
- System/workflow outcome: Workflow health is Partial or Failed if the gate is skipped, `_task/` is generated before approval, or workflow execution continues without confirmation.
- Backward compatibility expectations: Existing Build -> Refine -> Polish, TDD-first, dirty worktree, final review, release notes, summary, and execution mode behavior remains intact after approval.

## 7. Scope

- In scope: Update workflow documentation and matching templates/references for the approval gate, exact approval prompt, phrase handling, continue-workflow behavior, execution-mode behavior, health checks, and final UX requirements.
- Out of scope: Application runtime changes, new dependencies, deployment changes, test framework changes, and changing Build -> Refine -> Polish or TDD-first behavior after approval.
- Non-goals: Building an interactive approval UI; changing task lifecycle rules; changing how specs are structured beyond adding approval-gate behavior.
- Explicit boundaries: Do not generate this request's `_task/` plan until this saved spec is approved by the user.

## 8. Users And Use Cases

- Primary users: Developers using Codex or similar agents with this workflow kit.
- Secondary users: Agents resuming interrupted workflows through `continue workflow`.
- Main use cases: A user reviews a generated spec and approves, requests changes, or cancels before planning.
- Edge use cases: `continue workflow` after spec is saved but no task plan exists; plan-only mode with approval before task plan; revision loops that update and redisplay the spec.

## 9. Functional Requirements

- Required behaviors:
  - Save detailed specs in `_spec/` before any task plan is generated.
  - Display the exact approval prompt requested by the user after spec save.
  - Wait for explicit approval before creating `_task/`.
  - Recognize valid approval phrases: `approve spec`, `approved`, `looks good`, `proceed to planning`, `proceed`.
  - Recognize revision phrase prefixes: `change:`, `update:`, `revise:`, `add:`, `remove:`.
  - On revisions, update the same spec or create a revised spec, redisplay the summary, and wait again.
  - On cancel, stop and update `_handoff/current.md` as paused/cancelled.
  - On `continue workflow`, resume the approval gate if a spec exists without a task plan.
  - Mark workflow health Partial or Failed when the approval gate is skipped, task planning happens before approval, or workflow continues without confirmation.
- Inputs: User work request, approval phrase, revision phrase, or cancel workflow phrase.
- Outputs: Updated workflow docs/templates, saved spec approval prompt, post-approval task-plan behavior documentation, updated artifacts.
- State changes: Handoff can record phase `Spec approval gate`, approval status, active spec, missing task plan, blockers/wait state, and cancellation.
- Error states: Ambiguous response at the gate should keep the workflow paused and ask for one of the valid responses.
- Permissions/auth expectations: Not applicable.

## 10. Non-Functional Requirements

- Performance expectations: Not applicable for documentation changes.
- Reliability expectations: Root docs and templates should be consistent enough that installed workflow kits inherit the same approval gate.
- Security/privacy expectations: No secrets or credentials should be introduced.
- Accessibility expectations: Chat prompt must be readable and include direct spec path and concise bullets.
- Maintainability expectations: Approval-gate rules should be centralized in `RUN_WORKFLOW.md` and mirrored only where useful.
- DX expectations: Agents should know exactly where to stop and what user responses allow progression.

## 11. Affected Surfaces

- Files likely affected: `RUN_WORKFLOW.md`, `README.md`, `AGENTS.md`, `docs/PROMPTS.md`, `templates/RUN_WORKFLOW.md`, `templates/AGENTS.md`, `templates/docs/PROMPTS.md`, `templates/WORK_REQUEST.md`, `_spec/README.md`, `templates/_spec/README.md`, `_task/README.md`, `templates/_task/README.md`, `_summary/README.md`, `templates/_summary/README.md`, `templates/_handoff/current.md`, `WORK_REQUEST.md`, `_handoff/current.md`, `_progress/progress.md`, `_review/2026-05-23-add-spec-approval-gate.md`, `_release/2026-05-23-add-spec-approval-gate.md`, `_summary/2026-05-23-add-spec-approval-gate.md`.
- Directories likely affected: Root workflow docs, `docs/`, `templates/`, `_spec/`, `_task/`, `_handoff/`, `_progress/`, `_review/`, `_release/`, `_summary/`.
- UI surfaces: Not applicable.
- API routes: Not applicable.
- Components: Not applicable.
- Services: Not applicable.
- Database/schema: Not applicable.
- Config/env vars: Not applicable.
- Tests: Documentation verification commands only; no app tests expected unless final repo verification is chosen.
- Docs: Primary surface.
- Workflow artifacts: Required for this workflow run.

## 12. Dependency And Integration Map

- Internal dependencies: `RUN_WORKFLOW.md` is canonical; `README.md`, `AGENTS.md`, templates, prompt docs, and folder READMEs must not contradict it.
- External packages/services: None.
- Integration points: Installer uses templates, so template docs should mirror root behavior where applicable.
- Ordering constraints: This active request must stop after spec save and before `_task/` generation until approval is received.
- Migration/setup requirements: None.

## 13. Data And State Impact

- Data models: Not applicable.
- Database changes: None.
- State management changes: Workflow state in `_handoff/current.md` should include approval gate status.
- Cache/session/local storage impact: Not applicable.
- Backward compatibility impact: Existing workflows with both spec and task plan can continue normally. Workflows with spec but no task plan now resume at approval gate.

## 14. UX / API / Workflow Expectations

- UX expectations: After saving the spec, show the exact approval prompt with spec path, summary bullets, review path, approval/revision/cancel options, and then wait.
- API contract expectations: Not applicable.
- CLI/workflow behavior: No `_task/` file is generated until explicit approval.
- Error handling expectations: If the user asks for changes, revise the spec and repeat the gate. If the user cancels, mark paused/cancelled in handoff and stop.
- Empty/loading/success/failure states: Not applicable.

## 15. Execution Strategy

- Recommended implementation approach:
  - After approval, update `RUN_WORKFLOW.md` first as the canonical source.
  - Mirror matching changes into `README.md`, `AGENTS.md`, templates, and prompt docs.
  - Update folder READMEs where they currently imply immediate planning after spec generation.
  - Verify with targeted searches for approval gate phrases, execution-mode rules, continue-workflow rules, and health-check rules.
  - Create review, release notes, summary, and final handoff after execution.
- Suggested sequencing:
  - `TASK-001`: Add the approval gate to canonical workflow docs and templates.
  - `TASK-002`: Update README, prompt docs, and folder references.
  - `TASK-003`: Verify docs consistency and finalize workflow artifacts.
- Safe rollout/migration approach: Documentation-only change; installed templates inherit behavior when copied.
- Files to inspect before editing: Existing root/template workflow docs, prompt docs, folder READMEs, and active workflow artifacts.
- Decisions to avoid until more evidence exists: Do not introduce a machine-readable approval state file unless a future request asks for one.

## 16. Verification Strategy

- Required automated checks:
  - Targeted `rg` searches for exact approval prompt and gate rules.
  - Targeted `rg` searches for execution modes, continue-workflow behavior, and health-check failure conditions.
  - Root/template mirror or consistency checks where files are intended to match.
  - `git diff --check`.
  - `git diff --stat` and `git diff` final audit.
- Required manual checks:
  - Confirm no `_task/2026-05-23-add-spec-approval-gate.md` exists before spec approval.
  - Confirm final docs do not contradict Build -> Refine -> Polish or TDD-first after approval.
- Test types needed: Documentation/search verification; app tests not required unless implementation accidentally touches app code.
- Build/lint/typecheck expectations: No lint script exists; no app build required for docs-only unless broad verification is desired.
- Acceptance evidence required: Search output and final diff audit recorded in progress/review/summary.
- Proof of completion: Updated docs/templates, workflow artifacts, and health check.

## 17. Acceptance Criteria

- [ ] `RUN_WORKFLOW.md` documents the mandatory approval gate immediately after spec save and before `_task/` generation.
- [ ] The exact approval prompt text appears in the workflow documentation.
- [ ] Valid approval, revision, and cancel behaviors are documented.
- [ ] `continue workflow` resumes at the spec approval gate when a spec exists but no task plan exists.
- [ ] `plan-only`, `single-task`, `complete-workflow`, and `parallel-workflow` all require spec approval before task planning.
- [ ] Health checks fail or become partial if the gate is skipped, `_task/` is generated before approval, or execution continues without confirmation.
- [ ] Matching README/docs/template references no longer describe immediate task planning before approval.
- [ ] Existing Build -> Refine -> Polish and TDD-first flow after approval is preserved.
- [ ] This active workflow did not create `_task/2026-05-23-add-spec-approval-gate.md` before explicit approval.

## 18. Edge Cases And Failure Modes

- Edge cases: User replies with an approval synonym; user asks for revision; user cancels; user resumes later with spec but no task plan.
- Failure modes: Agent generates `_task/` too early; docs conflict between root and templates; health check omits approval-gate verification.
- Regression risks: Breaking existing resume behavior or execution mode wording; accidentally weakening TDD-first or 3-pass requirements.
- Recovery expectations: If a task plan is generated before approval, mark health Partial/Failed and document the violation.

## 19. Risks And Mitigations

- Technical risks: Documentation spread across many files can drift. Mitigation: targeted searches and template consistency checks.
- Product/UX risks: Approval gate could feel like friction. Mitigation: keep prompt short, clear, and directly reviewable in chat.
- Security risks: None expected. Mitigation: final diff audit checks for secrets.
- Scope risks: Touching unrelated app boilerplate files from the dirty worktree. Mitigation: restrict edits to workflow docs/artifacts.
- Mitigation plan: Document dirty worktree status and verify final status excludes app implementation edits for this request.

## 20. Assumptions

- Explicit assumptions:
  - "Matching README/docs references" includes root `README.md`, `AGENTS.md`, prompt docs, folder READMEs, and template copies when they contain matching workflow instructions.
  - No new runtime code or automated test harness is required for this docs-only workflow change.
  - The exact approval prompt can be documented in Markdown while preserving the requested text.
- Confidence level: High.
- What to revisit if assumptions are wrong: Narrow or expand affected docs based on user revision request at the approval gate.

## 21. Open Questions

- Blocking questions: None.
- Non-blocking questions: Whether to update every historical summary/spec/task artifact that mentions old order. Assumption: no; historical artifacts remain as records.
- Execution impact: No implementation can begin until this spec is explicitly approved.

## 22. Task Extraction Notes

- Suggested vertical task boundaries:
  - `TASK-001`: Add spec approval gate to `RUN_WORKFLOW.md` and mirrored canonical templates.
  - `TASK-002`: Update README, prompt docs, and folder README references so they match the new gate.
  - `TASK-003`: Verify consistency, run final diff audit, and write review/release/summary artifacts.
- Suggested first task: `TASK-001: Add approval gate to canonical workflow docs`.
- Suggested task ordering: Canonical workflow docs first, user-facing README/prompt/folder docs second, final verification/artifacts third.
- Areas that should not become separate tasks: Application code, deployment, package scripts, dependencies, or historical completed workflow artifacts.
- How the 3-pass Build -> Refine -> Polish loop should apply: After approval and task-plan creation, each docs task should still complete Build, Refine, and Polish with documentation/search verification in each pass. TDD-first evidence is not applicable to docs-only changes and should be recorded as a missing-test exception with justification.
