# Task Plan: Add 3-Pass Task Hardening Loop

## Spec File Used

`_spec/2026-05-15-add-3-pass-task-hardening-loop.md`

## Planning Date

2026-05-15

## Progress And Summary Files Read

- `_progress/progress.md`
- `_summary/2026-05-13-add-workflow-quality-controls.md`

## Execution Mode

`complete-workflow`

## Dirty Worktree Protection

- Initial command: `git status --short`
- Result before implementation: clean.
- Existing dirty files: none.
- Planned files: workflow docs, prompt docs, template docs, relevant workflow README files, and workflow artifacts for this request.
- Overlap risk: none.

## Task List

### TASK-001: Add 3-pass loop to core workflow docs

Status:
`Done`

Objective:
Update the root and template workflow orchestration docs so every executable task must complete Build -> Refine -> Polish before `Done`.

Files likely affected:
- `RUN_WORKFLOW.md`
- `templates/RUN_WORKFLOW.md`
- `AGENTS.md`

Checklist:
- [ ] Update execution mode language for `single-task` and `complete-workflow`.
- [ ] Update pipeline language.
- [ ] Add Iteration plan requirements to planning.
- [ ] Rewrite execution phase around Build -> Refine -> Polish.
- [ ] Update verification, failure recovery, progress, handoff, review, summary, health check, and final response rules.
- [ ] Mirror root workflow language into template workflow language.

Iteration plan:

#### Iteration 1 - Build

- Goal: Add the smallest coherent 3-pass task loop wording to core workflow docs.
- Changes made: Updated `AGENTS.md`, `RUN_WORKFLOW.md`, and `templates/RUN_WORKFLOW.md` with required Build -> Refine -> Polish execution language, iteration evidence fields, planning requirements, and health-check requirements.
- Verification command/result: `rg "Build -> Refine -> Polish|Iteration 1|Iteration 2|Iteration 3|iteration evidence|Iteration plan" AGENTS.md RUN_WORKFLOW.md templates/RUN_WORKFLOW.md` passed; old single-pass phrase search returned no matches.
- Review findings: Core loop existed in all target files, but continuation/resume and stop-condition wording needed refinement.
- Acceptance status: Partially met during Build; core loop present, resume/stop wording needed tightening.
- Remaining issues: Continue workflow needed current-iteration wording; stop condition needed to clarify unresolved verification failure after recovery.
- Next action: Run Iteration 2 - Refine to close consistency gaps.

#### Iteration 2 - Refine

- Goal: Improve consistency across root and template workflow docs and close issues from Build.
- Changes made: Added current-iteration resume language to `AGENTS.md`, `RUN_WORKFLOW.md`, and `templates/RUN_WORKFLOW.md`; refined stop-condition wording to stop only when verification remains failed after iteration-level failure recovery.
- Verification command/result: `rg "Build -> Refine -> Polish|Iteration 1|Iteration 2|Iteration 3|iteration evidence|Iteration plan|current iteration" AGENTS.md RUN_WORKFLOW.md templates/RUN_WORKFLOW.md` passed; old single-pass phrase search returned no matches.
- Review findings: Root/template workflow docs were materially aligned; one ambiguous stop-condition phrase was improved during refinement.
- Acceptance status: All TASK-001 criteria appeared met after refinement.
- Remaining issues: Needed final no-regression search and final task verdict.
- Next action: Run Iteration 3 - Polish.

#### Iteration 3 - Polish

- Goal: Final cleanup, no-regression check, and final task verdict for core workflow docs.
- Changes made: Confirmed the recovery/stop-condition wording and did not add unrelated edits.
- Verification command/result: `rg "Build -> Refine -> Polish|Iteration 1|Iteration 2|Iteration 3|iteration evidence|Iteration plan|current iteration|iteration-level failure recovery" AGENTS.md RUN_WORKFLOW.md templates/RUN_WORKFLOW.md` passed; `rg "execute only the next ready task, verify|verify each task|verify and review each task|critique/fix and review each task" AGENTS.md RUN_WORKFLOW.md templates/RUN_WORKFLOW.md` returned no matches.
- Review findings: TASK-001 scope stayed within core workflow docs; no app files touched; root and template workflow docs match on required loop semantics.
- Acceptance status: All TASK-001 acceptance criteria met.
- Remaining issues: None for TASK-001.
- Next action: Continue to TASK-002.

Acceptance criteria:
- Core workflow docs require Build -> Refine -> Polish for every executable task.
- Planning phase requires an Iteration plan section per task.
- Execution phase requires all three iterations before `Done`.
- Verification/failure recovery runs inside each iteration.
- Handoff/progress/review/summary/health/final response rules mention iteration evidence.

Acceptance result:
- [x] Core workflow docs require Build -> Refine -> Polish for every executable task.
- [x] Planning phase requires an Iteration plan section per task.
- [x] Execution phase requires all three iterations before `Done`.
- [x] Verification/failure recovery runs inside each iteration.
- [x] Handoff/progress/review/summary/health/final response rules mention iteration evidence.

Verification commands:
- `rg "Build -> Refine -> Polish|Iteration 1|Iteration 2|Iteration 3|iteration evidence|Iteration plan" AGENTS.md RUN_WORKFLOW.md templates/RUN_WORKFLOW.md`
- `rg "verify each task|verify and review each task|critique/fix and review each task" AGENTS.md RUN_WORKFLOW.md templates/RUN_WORKFLOW.md`

Stop condition:
Stop if root and template workflow docs diverge materially or the lifecycle/status rules conflict with the 3-pass loop.

Out-of-scope items:
- Prompt-library updates.
- README updates.
- App implementation files.

### TASK-002: Add 3-pass loop to prompts and workflow memory templates

Status:
`Done`

Objective:
Update reusable prompts and relevant workflow memory template/readme files so agents plan, record, resume, review, summarize, and report per-iteration evidence.

Files likely affected:
- `docs/PROMPTS.md`
- `templates/docs/PROMPTS.md`
- `_task/README.md`
- `templates/_task/README.md`
- `_progress/progress.md`
- `templates/_progress/progress.md`
- `_handoff/current.md`
- `templates/_handoff/current.md`
- `_review/README.md`
- `templates/_review/README.md`
- `_summary/README.md`
- `templates/_summary/README.md`
- `_release/README.md`
- `templates/_release/README.md`

Checklist:
- [ ] Add new hardening-loop prompts.
- [ ] Update existing execution, critique, repair, and summary prompts.
- [ ] Add per-iteration task plan fields to task README files.
- [ ] Add separate iteration evidence to progress templates.
- [ ] Add current iteration resume fields to handoff.
- [ ] Add iteration evidence requirements to review, summary, and release notes guidance.

Iteration plan:

#### Iteration 1 - Build

- Goal: Add prompt and template coverage for the required iteration loop.
- Changes made: Added requested 3-pass prompt sections to `docs/PROMPTS.md` and `templates/docs/PROMPTS.md`; updated prompt wording for single-task execution, Ralph Wiggum execution, critique, verification repair, and final summary; added iteration evidence fields to task, progress, handoff, review, summary, and release README/template files.
- Verification command/result: `rg "3-Pass Task Hardening Loop|Iteration 1 Build Pass|Iteration 2 Refine Pass|Iteration 3 Polish Pass|Iteration Evidence Review" docs/PROMPTS.md templates/docs/PROMPTS.md` passed; `rg "Iteration evidence|Current Iteration|Iteration plan|Build -> Refine -> Polish" ...` passed; old-phrase search found one remaining old `single-task` phrase in `templates/_task/README.md`.
- Review findings: Requested prompt sections were present; memory templates had coverage, but one old single-task phrase remained.
- Acceptance status: Partially met during Build.
- Remaining issues: Update the remaining old single-task phrase and re-run searches.
- Next action: Run Iteration 2 - Refine.

#### Iteration 2 - Refine

- Goal: Tighten prompt/template consistency and fill missing evidence fields.
- Changes made: Updated `templates/_task/README.md` single-task wording to require the full 3-pass loop; tightened `_progress/progress.md` entry template status wording.
- Verification command/result: Old prompt/template phrase search returned no matches; iteration evidence search passed across prompt docs and workflow memory readmes/templates.
- Review findings: Prompt and template language now consistently requires iteration evidence and supports resume from current iteration.
- Acceptance status: All TASK-002 criteria appeared met after refinement.
- Remaining issues: Needed mirror/no-regression check for prompt files and final task verdict.
- Next action: Run Iteration 3 - Polish.

#### Iteration 3 - Polish

- Goal: Final cleanup and final task verdict for prompt and memory template docs.
- Changes made: Confirmed `docs/PROMPTS.md` and `templates/docs/PROMPTS.md` are mirrored and made no unrelated edits.
- Verification command/result: `git diff --no-index -- docs/PROMPTS.md templates/docs/PROMPTS.md` returned no content differences; prompt heading search passed; iteration evidence search passed across prompt docs and workflow memory readmes/templates.
- Review findings: TASK-002 scope stayed within prompt docs and workflow memory templates; no app implementation files touched.
- Acceptance status: All TASK-002 acceptance criteria met.
- Remaining issues: None for TASK-002.
- Next action: Continue to TASK-003.

Acceptance criteria:
- Prompt docs include the five requested reusable prompts.
- Existing requested prompts mention iteration evidence.
- Task plan templates include per-iteration fields.
- Progress templates record each iteration separately.
- Handoff templates can resume from current task and current iteration.
- Review/summary/release guidance includes iteration evidence where relevant.

Acceptance result:
- [x] Prompt docs include the five requested reusable prompts.
- [x] Existing requested prompts mention iteration evidence.
- [x] Task plan templates include per-iteration fields.
- [x] Progress templates record each iteration separately.
- [x] Handoff templates can resume from current task and current iteration.
- [x] Review/summary/release guidance includes iteration evidence where relevant.

Verification commands:
- `rg "3-Pass Task Hardening Loop|Iteration 1 Build Pass|Iteration 2 Refine Pass|Iteration 3 Polish Pass|Iteration Evidence Review" docs/PROMPTS.md templates/docs/PROMPTS.md`
- `rg "Iteration evidence|Current Iteration|Iteration plan|Build -> Refine -> Polish" _task/README.md templates/_task/README.md _progress/progress.md templates/_progress/progress.md _handoff/current.md templates/_handoff/current.md _review/README.md templates/_review/README.md _summary/README.md templates/_summary/README.md _release/README.md templates/_release/README.md`

Stop condition:
Stop if the prompt docs or memory templates conflict with core workflow execution rules.

Out-of-scope items:
- Root README overview.
- Final workflow artifact review/release/summary.
- App implementation files.

### TASK-003: Update README and finalize workflow evidence

Status:
`Done`

Objective:
Update the public README overview and complete verification, review, release notes, summary, handoff, and health check for this docs-only workflow.

Files likely affected:
- `README.md`
- `_task/2026-05-15-add-3-pass-task-hardening-loop.md`
- `_progress/progress.md`
- `_handoff/current.md`
- `_review/2026-05-15-add-3-pass-task-hardening-loop.md`
- `_release/2026-05-15-add-3-pass-task-hardening-loop.md`
- `_summary/2026-05-15-add-3-pass-task-hardening-loop.md`

Checklist:
- [ ] Update README workflow overview, usage, sequential execution, recommended loop, and health/final artifact language.
- [ ] Run requested repo searches for old single-pass language and task execution mentions.
- [ ] Run available verification commands.
- [ ] Run final diff audit.
- [ ] Create review, release notes, and summary.
- [ ] Update handoff and health check.

Iteration plan:

#### Iteration 1 - Build

- Goal: Add README coverage and initial final-artifact structure.
- Changes made: Updated `README.md` workflow overview, why-use-it list, usage flow, task planning, sequential execution, handoff/resume, execution preferences, recommended loop, zero-edit workflow, and design principles to describe Build -> Refine -> Polish and iteration evidence.
- Verification command/result: Old single-pass language search returned no matches in the requested file set; 3-pass/iteration evidence search passed; README task-execution mentions were inspected.
- Review findings: README covered the main workflow sections, but one single-task example still used older `verified, reviewed, and documented` wording.
- Acceptance status: Partially met during Build.
- Remaining issues: Update single-task example and final response description.
- Next action: Run Iteration 2 - Refine.

#### Iteration 2 - Refine

- Goal: Close wording/search gaps and verify no app code changes.
- Changes made: Updated the README single-task test prompt to stop after Build -> Refine -> Polish with iteration evidence, and updated final response guidance to require an iteration evidence summary.
- Verification command/result: Old single-pass language search returned no matches; 3-pass/iteration evidence search passed across root docs, prompt docs, templates, and workflow README files; `git status --short` showed only docs/templates/workflow artifacts changed, with no `client/` or `server/` implementation files.
- Review findings: README and workflow docs now consistently reference the 3-pass loop where task execution is described.
- Acceptance status: All TASK-003 acceptance criteria appeared met after refinement.
- Remaining issues: Needed full repo verification, final diff audit, and final artifacts.
- Next action: Run Iteration 3 - Polish.

#### Iteration 3 - Polish

- Goal: Final verification, diff audit, final task verdict, and workflow health evidence.
- Changes made: Ran final verification commands and prepared to create review, release notes, summary, and final handoff.
- Verification command/result: `npm test` passed for client and server; `git diff --check` passed with line-ending normalization warnings only; `git diff --stat` and `git diff --name-only` ran for final audit preparation.
- Review findings: No app implementation files were modified. Diff scope is workflow docs/templates and workflow artifacts.
- Acceptance status: All TASK-003 acceptance criteria met.
- Remaining issues: None for TASK-003.
- Next action: Create review, release notes, summary, final handoff, and final health check.

Acceptance criteria:
- README explains Build -> Refine -> Polish concisely.
- Old single-pass language is removed or updated where appropriate.
- Searches confirm task execution mentions refer to the 3-pass loop where appropriate.
- Available verification commands run or are documented.
- Final diff audit runs.
- Review, release notes, summary, progress, and handoff include iteration evidence summary.

Acceptance result:
- [x] README explains Build -> Refine -> Polish concisely.
- [x] Old single-pass language is removed or updated where appropriate.
- [x] Searches confirm task execution mentions refer to the 3-pass loop where appropriate.
- [x] Available verification commands run or are documented.
- [x] Final diff audit runs.
- [x] Review, release notes, summary, progress, and handoff include iteration evidence summary.

Verification commands:
- `rg "verify and review each task|verify each task|critique/fix and review each task|execute only the next ready task, verify" AGENTS.md RUN_WORKFLOW.md README.md docs/PROMPTS.md templates/RUN_WORKFLOW.md templates/docs/PROMPTS.md templates/_task/README.md templates/_progress/progress.md`
- `rg "Build -> Refine -> Polish|3-pass|Iteration evidence|Current Iteration|Iteration plan" AGENTS.md RUN_WORKFLOW.md README.md docs/PROMPTS.md templates/RUN_WORKFLOW.md templates/docs/PROMPTS.md templates/_task/README.md templates/_progress/progress.md templates/_handoff/current.md templates/_review/README.md templates/_summary/README.md templates/_release/README.md _task/README.md _progress/progress.md _handoff/current.md _review/README.md _summary/README.md _release/README.md`
- `npm test`
- `git diff --stat`
- `git diff`

Stop condition:
Stop if verification reveals app implementation changes, missing required iteration evidence, or unresolved old single-pass language that changes workflow semantics.

Out-of-scope items:
- Committing changes.
- App implementation files.
