# Workflow Audit Improvements Spec

## Request Summary

Improve the reusable workflow kit's auditability by adding review and decision artifacts, stricter task status transitions, a continue workflow command, health checks, installer support, and README guidance without adding scope budget restrictions or touching app implementation code.

## Date

2026-05-11

## Source Prompt

The user asked to add workflow audit improvements, specifically `_review/`, final artifact checklist, stricter task status transitions, `_decisions/`, continue workflow command, workflow health check, installer updates, and README updates. The user explicitly said not to add scope budget, not to restrict maximum files/folders, and not to modify app implementation code.

## Questions Asked And Answers Received

- No questions were asked because the request was detailed enough to proceed and remaining unknowns were minor naming/template choices.

## Assumptions

- This is a `docs` request with low implementation risk.
- Execution is allowed for all requested workflow/template documentation and installer updates.
- Empty workflow folders should include README placeholders so they are tracked and copied.
- No separate decision file is required for this task because these are routine workflow template edits requested directly by the user, not a new architecture/product decision.
- Existing root workflow files and template workflow files should remain aligned where they describe the same behavior.
- `templates/README.md` does not currently exist; if absent, no template README needs to be created unless needed by the installer or docs.

## Goal

Make workflow runs more auditable and resumable by requiring explicit review, decision logging when meaningful, stricter task lifecycle states, final artifact reporting, and a pre-final health check.

## Non-Goals

- Add scope budgets.
- Restrict maximum files touched.
- Restrict maximum folders touched.
- Modify application implementation code.
- Change frontend, backend, deployment, database, or runtime behavior.

## Users

- AI coding agents using the workflow kit.
- Developers installing the workflow kit into project repositories.
- Reviewers auditing workflow runs after completion.

## Functional Requirements

- Add root `_review/` and `_decisions/` folders.
- Add template `templates/_review/` and `templates/_decisions/` folders.
- Document that a review file must be written after implementation and before the final summary.
- Review files must include request, spec file used, task plan used, tasks reviewed, bugs found, scope creep check, missing tests, security concerns, architecture concerns, follow-up tasks, and final review verdict.
- Document final artifact checklist requirements for every final response.
- Final artifact checklist must include exact paths for `WORK_REQUEST.md`, `_spec/<file>.md`, `_task/<file>.md`, `_progress/progress.md`, `_review/<file>.md`, `_summary/<file>.md`, and `_decisions/<file>.md` or `none`.
- Missing required artifacts must cause workflow health to be `Failed`.
- Document task status lifecycle: `Planned -> Ready -> In Progress -> Verified -> Reviewed -> Done`.
- Document terminal task states: `Done`, `Blocked`, and `Needs Human Review`.
- Enforce status rules in docs: `Done` requires verified and reviewed; `Reviewed` requires verification attempted; if verification cannot run, terminal state is `Needs Human Review`, not `Done`.
- Add `_decisions/` decision log folder guidance and template content.
- Decision files must include date, decision, context, options considered, selected option, consequences, affected files, and follow-up tasks.
- Document meaningful decisions only; routine edits should not create decision files.
- Add support for `continue workflow` command.
- `continue workflow` must read `_progress/progress.md`, latest `_summary/`, latest `_task/`, find the next task that is not `Done`, and continue without repeating original intake unless needed.
- `continue workflow` must not regenerate the entire spec unless the request changed.
- Add workflow health check before final response.
- Health check must cover work request sync, spec existence, task plan existence, progress update, review creation, summary creation, verification run or documented, scope respected, and decisions recorded if needed.
- Health status must be `Passed`, `Partial`, or `Failed`.
- Update `scripts/install.sh` so it copies root and template review/decision folders into target repos.
- Update README with review phase, decisions folder, continue workflow command, health check, final artifact checklist, and task status transitions.

## UI Expectations

Not applicable.

## API Expectations

Not applicable.

## Data Model Expectations

Not applicable.

## Edge Cases

- If verification cannot run, the task should not be marked `Done`; it should be `Needs Human Review`.
- If any required artifact is missing before final response, workflow health should be `Failed`.
- If no meaningful decisions were made, the final artifact checklist should list decisions as `none`.
- If `continue workflow` finds no unfinished tasks, it should proceed to review, summary, health check, and final response if those are incomplete.
- If `continue workflow` finds changed scope or missing core artifacts, it should stop or ask only the needed questions.
- Existing old status values in progress history may remain as historical records, but new templates/rules should use the new lifecycle.

## Constraints

- Do not add scope budget restrictions.
- Do not add maximum file or folder limits.
- Do not modify application implementation code.
- Keep changes to workflow templates, docs, installer, and workflow memory artifacts.
- Prefer existing markdown style and plain-language workflow instructions.

## Success Criteria

- Required folders and template folders exist with useful README templates.
- Root and template workflow docs describe review, decisions, health checks, continue workflow, status transitions, and final artifact checklist.
- Installer copies review and decision templates.
- README explains the new audit flow and how to test `continue workflow`.
- Current workflow run creates spec, task plan, progress entry, review, summary, and final artifact checklist.
- Verification confirms docs contain required terms and no app implementation files changed.

## Out-Of-Scope Items

- Scope budgets.
- Max file/folder restrictions.
- App code changes.
- Dependency changes.
- Deployment changes.

## Open Questions

- None blocking.
