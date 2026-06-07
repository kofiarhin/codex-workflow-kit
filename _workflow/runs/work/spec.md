# Workflow Specifications

## Fallow Quality Layer

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
---

## Project Brain Memory

# Detailed Spec: Project Brain Memory

## 1. Metadata
- Spec filename: `_workflow/runs/work/spec.md`
- Date: 2026-06-06
- Request ID / slug: `project-brain-memory`
- Request source: Direct user prompt synchronized to `_workflow/runs/work/request.md`
- Execution mode: `complete-workflow`
- Request classification: Workflow framework feature, documentation, templates, installer, and validation
- Scope level: Repository-wide workflow-template enhancement
- Risk level: Medium-high because Project Brain changes workflow authority, resume behavior, installation semantics, and generated artifact contracts

## 2. Original Request
- Raw user request: Implement Project Brain memory into `codex-workflow-kit`; keep users in CLI chat; add global and run-scoped structured memory, automatic non-destructive updates, conflict handling, Markdown projections, activity blocks, checkpoints, context injection, installer support, documentation, and tests.
- Normalized request: Extend the workflow kit so every installed project has an authoritative JSON Project Brain plus run-local JSON memory. Agents must initialize, read, update, project, and surface that memory throughout the existing approval-gated workflow without adding a UI or breaking established workflow evidence rules.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/work/request.md`

## 3. Questions And Answers
- Questions asked: None.
- Answers received: The user explicitly selected `complete-workflow`, said `skip questions`, listed required files, schemas, behaviors, verification commands, and acceptance criteria.
- Questions skipped: All intake questions were skipped by explicit instruction.
- Remaining open questions: Exact JSON envelope shapes for `history.json`, `conflicts.json`, `categories.json`, and run `brain.json`; exact installer strategy for generic run templates; whether root project-brain files should also be added to this kit's live `_workflow/` directory. These are non-blocking and will use conservative documented defaults.

## 4. Problem Definition
- Problem being solved: Existing workflow artifacts distribute state across request, spec, tasks, progress, handoff, decisions, review, and summary files without one structured memory source of truth or a compact mechanism for reporting memory changes during CLI execution.
- Why it matters: Long-running and resumed agent workflows need durable, inspectable context that preserves provenance, history, contradictions, and current workflow state without replaying full conversations.
- Current pain point: Agents can encounter stale or conflicting handoff/spec/progress information, users cannot see a compact combined memory/workflow update, and installed projects lack governed machine-readable project memory.
- Expected value: Safer resumability, less context drift, explicit conflict resolution, predictable context injection, human-readable projections, and clearer live CLI feedback.

## 5. Current State Analysis
- Existing behavior: The kit resolves branch/worktree/run ID, stores run-scoped Markdown workflow artifacts, requires intake/spec approval/tasks, executes three iterations per task, records progress/handoff, and installs templates without overwriting existing files unless `--force` is used.
- Existing architecture/components: Root and `templates/` copies of `AGENTS.md` and `RUN_WORKFLOW.md`; template assets under `templates/_workflow`; Bash installer with a reusable `copy_file` helper; README documentation; Node validation script for frontend-skill routing.
- Existing files/modules likely involved: `RUN_WORKFLOW.md`, `templates/RUN_WORKFLOW.md`, `AGENTS.md`, `templates/AGENTS.md`, `README.md`, `scripts/install.sh`, `package.json`, `scripts/`, `templates/_workflow/`, and possibly project-context docs.
- Existing data flow: Direct prompt → run request → intake/spec approval → task plan → execution/progress/handoff → review/release notes/summary/health check.
- Existing API/UI/CLI/workflow behavior: CLI-chat-only workflow. No new application UI or API is required.
- Existing tests or verification coverage: Root `npm test`; `npm run test:workflow-routing`; Bash syntax validation is available; no current Project Brain installer validation exists.

## 6. Desired End State
- Expected final behavior: Workflow agents initialize and maintain global project memory and run memory, consult relevant active memory before planning/implementation, extract updates at defined workflow boundaries, preserve all prior values/history, detect and track contradictions, create checkpoints, refresh a Markdown projection, and emit compact Activity blocks.
- User-facing outcome: Users remain in CLI chat and see concise combined workflow/memory progress without manually editing backend memory files.
- Developer-facing outcome: Installed repositories contain stable JSON contracts, readable projections, governed custom categories, append-only activity/checkpoints, and validation proving template/install completeness.
- System/workflow outcome: Project Brain is authoritative for current workflow state and durable memory; `progress.md` remains authoritative for completed task execution evidence.
- Backward compatibility expectations: Existing approval gates, task lifecycle, TDD/verification requirements, artifact names, run-ID sanitization, parallel workflow behavior, frontend taste routing, and non-overwrite installer defaults continue to work.

## 7. Scope
- In scope:
  - Define project and run memory templates.
  - Define category governance, history, conflict, projection, activity, and checkpoint contracts.
  - Integrate Project Brain initialization, context injection, extraction, conflict handling, checkpoints, projection refresh, and authority rules into both workflow documents.
  - Integrate mandatory memory behavior into both agent guides.
  - Update installer and README.
  - Add lightweight automated validation and package script integration if appropriate.
  - Keep root/template workflow files aligned.
- Out of scope:
  - Separate web, desktop, TUI, or dashboard application.
  - Runtime service, database, vector store, embeddings, or external memory provider.
  - Migrating historical legacy workflow artifacts into semantic memory beyond safe initialization guidance.
  - Automatic commits or remote synchronization in installed projects.
- Non-goals: Replacing detailed workflow artifacts, eliminating Markdown workflow evidence, or weakening spec approval/TDD/review requirements.
- Explicit boundaries: The feature is implemented as workflow contracts, templates, installer behavior, and validation—not as application runtime code.

## 8. Users And Use Cases
- Primary users: Developers operating Codex, Claude Code, Cursor, or similar CLI/chat coding agents in repositories installed from this kit.
- Secondary users: Reviewers and future agents resuming work from repository artifacts.
- Main use cases:
  - Start a new run with project memory automatically loaded and run memory initialized.
  - Observe compact Activity output after meaningful changes.
  - Resume work using current structured memory instead of replaying chat.
  - Preserve decisions and requirements across runs.
  - Record checkpoints and safely resolve contradictions.
- Edge use cases: Existing installations with memory files already present; branch names containing separators; stale run memory; unresolved conflicts; missing or malformed memory files; parallel worker runs.

## 9. Functional Requirements
- Required behaviors:
  1. Install five project-brain files under `_workflow/project-brain/`.
  2. Provide generic run templates for `brain.json`, `activity.md`, and `checkpoints.md` and require agents to create/copy them into the active run directory automatically.
  3. Store canonical memory in JSON; derive Markdown projection from JSON.
  4. Preserve prior entries through statuses, supersession links, item history, global history, conflict records, and change logs.
  5. Extract memory after intake, spec creation, task planning, task completion, review, release notes, and summary.
  6. Emit the exact compact Activity field set after meaningful updates.
  7. Append checkpoints at every required milestone.
  8. Govern AI-created categories under `custom` and definitions in `categories.json`; no arbitrary top-level schema mutation.
  9. Resolve contradictions using provenance, confidence, explicit user authority, supersession, and unresolved-conflict tracking.
  10. Apply Project Brain authority rules while preserving `progress.md` authority for completed execution evidence.
- Inputs: Conversation statements, workflow stage transitions, saved artifacts, decisions, acceptance evidence, and existing project/run memory.
- Outputs: Updated JSON memory/history/conflict/category files, refreshed `PROJECT_BRAIN.md`, appended run activity/checkpoints, and chat Activity blocks.
- State changes: Additive or superseding memory mutations with timestamps and source metadata; never silent destructive replacement.
- Error states: Missing templates, malformed JSON, unknown category, contradictory active memories, stale run data, write failure, or mismatch between memory and completed progress evidence.
- Permissions/auth expectations: Not applicable; local repository files only.

## 10. Non-Functional Requirements
- Performance expectations: Memory reads and projections remain lightweight text-file operations and inject only relevant subsets into model context.
- Reliability expectations: Updates are idempotent where possible, append-only for logs/checkpoints, and recoverable from history/conflict records.
- Security/privacy expectations: Do not place secrets, credentials, tokens, private chat dumps, or unnecessary sensitive content into memory; retain only relevant project/workflow facts.
- Accessibility expectations: Plain Markdown output and predictable compact labels support terminal readability.
- Maintainability expectations: Root/template copies remain synchronized; schemas are versioned; field meanings and authority rules are documented once consistently.
- DX expectations: Installation is one command; existing memory is preserved by default; validation errors identify missing or malformed required files.

## 11. Affected Surfaces
- Files likely affected:
  - `RUN_WORKFLOW.md`
  - `templates/RUN_WORKFLOW.md`
  - `AGENTS.md`
  - `templates/AGENTS.md`
  - `README.md`
  - `scripts/install.sh`
  - `package.json`
  - a new validation script under `scripts/`
  - requested files under `templates/_workflow/project-brain/` and `templates/_workflow/runs/`
  - potentially `docs/PROJECT_CONTEXT.md` and `templates/docs/PROJECT_CONTEXT.md`
- Directories likely affected: `templates/_workflow/project-brain/`, `templates/_workflow/runs/`, `scripts/`, and current run artifacts.
- UI surfaces: CLI chat Activity block only; no application UI.
- API routes: Not applicable.
- Components: Not applicable.
- Services: Not applicable.
- Database/schema: Local JSON file schemas only.
- Config/env vars: Existing optional `CODEX_WORKFLOW_RUN_ID`; no new secret/env requirement expected.
- Tests: Existing npm tests/routing validation plus new Project Brain template/installer validation.
- Docs: README and workflow/agent guides; project context only if a durable repository fact changes.
- Workflow artifacts: Current run request/spec now; tasks/progress/handoff/review/release notes/summary after approval and implementation.

## 12. Dependency And Integration Map
- Internal dependencies: Artifact-root resolution precedes memory initialization; memory context precedes planning/implementation; extraction follows saved workflow outputs; checkpoint and Activity output follow meaningful state changes.
- External packages/services: None expected.
- Integration points: Bash installer, npm scripts, workflow stage transitions, resume logic, parallel worker/orchestrator rules, health check, final response format.
- Ordering constraints:
  1. Resolve worktree/branch/run ID.
  2. Initialize/read project and run brain.
  3. Resolve active request and intake.
  4. Extract/save memory and checkpoint.
  5. Continue existing spec approval and execution sequence.
- Migration/setup requirements: Existing projects gain new files via installer; skipped existing memory remains untouched unless `--force`; agents create absent run files from generic templates.

## 13. Data And State Impact
- Data models:
  - Project brain follows the requested versioned schema.
  - Memory items support `id`, `text`, `status`, `confidence`, source metadata, timestamps, `supersedes`, and item history.
  - Run brain mirrors relevant schema fields while identifying run scope and avoiding stale project-level duplication.
  - History and conflicts use versioned JSON envelopes with appendable records.
  - Categories define allowed built-ins and governed `custom.<category>` metadata.
- Database changes: None.
- State management changes: Workflow current state moves to Project Brain authority, with run brain holding run-local context and progress retaining completed-task evidence authority.
- Cache/session/local storage impact: None.
- Backward compatibility impact: Legacy Markdown files remain required; authority reconciliation rules must prevent existing resume behavior from regressing.

## 14. UX / API / Workflow Expectations
- UX expectations: Every meaningful memory/workflow update produces one compact five-line Activity block, not verbose memory dumps.
- API contract expectations: Not applicable.
- CLI/workflow behavior: Users issue normal chat requests; agents transparently maintain files and report activity/checkpoints.
- Error handling expectations: Invalid/missing JSON is reported, original content is preserved, conflict/recovery is documented, and unsafe writes stop rather than discard memory.
- Empty/loading/success/failure states:
  - Empty: Valid initialized arrays/objects and blank timestamps/stages in templates.
  - Loading: Not applicable.
  - Success: Memory update + projection/activity/checkpoint as required.
  - Failure: Preserve files, record issue where possible, and stop with a documented blocker or human-review state.

## 15. Execution Strategy
- Recommended implementation approach:
  1. Add failing structural validation for required templates, schemas, installer targets, and critical documentation/workflow markers.
  2. Add JSON/Markdown templates with conservative, valid empty defaults.
  3. Update installer to copy project memory and generic run templates without overwriting by default.
  4. Integrate a clearly named Project Brain phase and repeated extraction/checkpoint hooks into root/template workflow docs.
  5. Update root/template agent guides and README.
  6. Refine authority, conflict, stale-context, parallel, and health-check rules.
  7. Run full validations and audit root/template parity.
- Suggested sequencing: Templates/validation → installer → workflow contracts → agent contracts → README/context docs → hardening and full verification.
- Safe rollout/migration approach: Additive files; version `1.0.0`; preserve existing files by default; document `--force`; never auto-delete/squash prior memory.
- Files to inspect before editing: Full relevant sections of both workflow files, both agent guides, README install/workflow sections, installer, package scripts, current validation script, and template indexes/readmes.
- Decisions to avoid until more evidence exists: Adding dependencies, building an executable memory daemon, inventing a UI, changing legacy artifact names, or broad application changes.

## 16. Verification Strategy
- Required automated checks:
  - New focused Project Brain validation test/script, run first red then green.
  - `bash -n scripts/install.sh`.
  - Installer smoke test in a temporary directory, including preservation without `--force` and replacement with `--force` where safely testable.
  - `npm run test:workflow-routing`.
  - `npm test`.
- Required manual checks: Inspect Activity/checkpoint examples, authority wording, context-injection filters, conflict policy, and root/template parity.
- Test types needed: Structural JSON validation, required-file existence, installer behavior, documentation marker checks, and regression suite.
- Build/lint/typecheck expectations: No new build/typecheck required for docs/templates; existing project tests must remain green.
- Acceptance evidence required: Commands and results in all three task iterations, final diff audit, checked acceptance criteria, and workflow artifacts.
- Proof of completion: Installed temp target contains required project memory and run templates; existing memory survives default reinstall; workflow docs mandate automatic memory operations at every requested boundary.

## 17. Acceptance Criteria
- [ ] The workflow remains entirely operable through CLI chat and introduces no separate UI.
- [ ] Compact Activity blocks combine workflow stage, memory change, artifact, checkpoint, and next action.
- [ ] Both project-level and run-scoped JSON memory templates exist and are initialized by documented workflow/installer behavior.
- [ ] JSON is explicitly authoritative and `PROJECT_BRAIN.md` is a generated human-readable projection.
- [ ] Memory extraction/update hooks exist after intake, spec, planning, task completion, review, release notes, and summary.
- [ ] Updates are non-destructive and preserve item history, global history, change logs, and supersession links.
- [ ] Contradictions are detected, retained, recorded in `conflicts.json`, and safely resolved according to confidence and explicit user authority.
- [ ] Required checkpoints are appended with all requested fields.
- [ ] Custom categories are restricted to a governed namespace.
- [ ] Context injection always/conditionally includes the requested memory and excludes stale, superseded, low-confidence, or full-chat content as specified.
- [ ] Project Brain is authoritative for current workflow state, while `progress.md` remains authoritative for completed task evidence.
- [ ] `scripts/install.sh` installs all requested templates and preserves existing memory unless `--force` is supplied.
- [ ] README clearly explains CLI-only operation, backend memory files, installed files, and an Activity example.
- [ ] Existing tests, workflow routing, approval gates, and workflow behavior remain compatible.

## 18. Edge Cases And Failure Modes
- Edge cases: Existing project brain with newer version; duplicate IDs; two active contradictory items; explicit user correction; low-confidence inferred fact; deleted artifact; stale run brain; unresolved conflict during planning; parallel workers updating shared project memory; install target containing only some files.
- Failure modes: Invalid JSON, accidental truncation, root/template drift, installer overwriting memory, unbounded context injection, workflow authority loop, or incomplete checkpoint/activity evidence.
- Regression risks: Spec approval bypass, run resume regression, parallel write collisions, TDD evidence weakening, and README/install list mismatch.
- Recovery expectations: Preserve original files, avoid destructive repair, append a conflict/recovery record, reconcile completed task history from progress, and require human review if validity cannot be proven.

## 19. Risks And Mitigations
- Technical risks: Markdown-only instructions cannot enforce atomic concurrency. Mitigate with explicit ownership/locking rules, read-before-write, append-only records, stable IDs, and conflict escalation.
- Product/UX risks: Excessive Activity spam. Mitigate by defining “meaningful change” and one compact block per grouped update.
- Security risks: Persisting secrets or unnecessary conversation content. Mitigate with explicit exclusion rules and relevant-fact-only extraction.
- Scope risks: Turning this into a runtime application or large migration framework. Mitigate by limiting implementation to templates, workflow contracts, installer, docs, and validation.
- Mitigation plan: TDD structural checks, root/template parity assertions, temp-install smoke tests, staged edits, and final diff audit.

## 20. Assumptions
- Explicit assumptions:
  - `templates/_workflow/runs/brain.json`, `activity.md`, and `checkpoints.md` are generic seed templates installed under a non-run-specific template location or retained in the kit so agents can create active run copies; the exact install destination will be documented and tested.
  - The five project-level files are installed directly into `_workflow/project-brain/`.
  - JSON projection generation is an agent workflow responsibility, not a new executable service.
  - `history.json`, `conflicts.json`, and `categories.json` will use minimal versioned envelope schemas consistent with non-destructive append behavior.
  - No new npm dependency is necessary.
  - Root live `_workflow/project-brain` files are not required by the user's explicit create list unless implementation/validation needs the kit itself to dogfood Project Brain; if added, they will be treated as workflow artifacts rather than templates.
- Confidence level: High on requested behavior and affected surfaces; medium on generic run-template install location because the prompt says “copy ... where appropriate” rather than naming a final target.
- What to revisit if assumptions are wrong: Installer destination for run seeds, whether live root memory should be bootstrapped, and exact auxiliary JSON envelopes.

## 21. Open Questions
- Blocking questions: None; the user explicitly requested best-effort implementation without questions.
- Non-blocking questions:
  - Should generic run seeds install to `_workflow/templates/run/` or be created directly by agent instructions from documented inline schemas?
  - Should project `history.json` duplicate `changeLog` entries or hold richer snapshots/events? Proposed answer: richer append-only events referencing changed item IDs.
  - How should parallel workers serialize shared project-brain writes? Proposed answer: orchestrator owns shared project memory; workers update run-local memory/evidence and report proposed project changes for orchestrator merge.
- Execution impact: Resolve conservatively in the task plan and document chosen contracts in workflow docs/tests.

## 22. Task Extraction Notes
- Suggested vertical task boundaries:
  1. Add and validate installable Project Brain templates plus safe installer behavior.
  2. Integrate Project Brain lifecycle, authority, context injection, activity, checkpoints, and conflict rules into root/template workflow and agent guides.
  3. Document the complete CLI-only experience, harden parity/compatibility checks, and run full verification.
- Suggested first task: Create failing validation for required files and installer preservation, then add templates and installer mappings until it passes.
- Suggested task ordering: Data contracts/install safety first; workflow behavior second; user documentation and full compatibility hardening third.
- Areas that should not become separate tasks: Project-context edits unless durable facts require them; cosmetic README wording; application frontend/backend code.
- How the 3-pass Build -> Refine -> Polish loop should apply: Each task must perform test-first structural/behavioral validation where code/scripts change, then refine edge cases and parity, then polish wording/contracts and rerun focused plus broader checks.
