# Workflow Audit Improvements Task Plan

## Spec File Used

`_spec/2026-05-11-workflow-audit-improvements.md`

## Planning Date

2026-05-11

## Progress And Summary Files Read

- `_progress/progress.md`
- `_summary/2026-05-11-add-login-logout-toasts.md`

## Task Status Lifecycle

Every task must move through:

```txt
Planned -> Ready -> In Progress -> Verified -> Reviewed -> Done
```

Allowed terminal states:

- `Done`
- `Blocked`
- `Needs Human Review`

Rules:

- A task cannot be `Done` unless verification was attempted and the task was reviewed.
- A task cannot move to `Reviewed` unless verification was attempted.
- If verification cannot run, the terminal state is `Needs Human Review`, not `Done`.

## Task List

### TASK-001: Add audit artifact folders and templates

Status: `Done`

Objective:
Add root and template review/decision folder documentation so the workflow has trackable placeholders and reusable artifact shapes.

Files likely affected:

- `_review/README.md`
- `_decisions/README.md`
- `templates/_review/README.md`
- `templates/_decisions/README.md`

Checklist:

- Add review README with required review file fields.
- Add decision README with required decision file fields.
- Mirror the same folder guidance under `templates/`.
- Do not create a decision file for this routine workflow edit.

Acceptance criteria:

- All four README files exist.
- Review and decision required fields are documented.
- Decision guidance says routine edits do not need decision files.

Verification commands:

```bash
Test-Path _review/README.md
Test-Path _decisions/README.md
Test-Path templates/_review/README.md
Test-Path templates/_decisions/README.md
```

Stop condition:
Stop if folder creation would overwrite unrelated user content.

Out-of-scope items:

- App implementation code.
- Scope budget rules.

### TASK-002: Update workflow operating docs

Status: `Done`

Objective:
Update root and template workflow instructions to include review phase, decisions, status transitions, continue workflow, health check, and final artifact checklist.

Files likely affected:

- `AGENTS.md`
- `RUN_WORKFLOW.md`
- `templates/AGENTS.md`
- `templates/RUN_WORKFLOW.md`
- `templates/_task/README.md`
- `templates/_summary/README.md`
- `templates/_progress/progress.md`

Checklist:

- Add `_review/` and `_decisions/` to workflow memory lists.
- Add task status lifecycle and terminal state rules.
- Add review phase after implementation and before summary.
- Add workflow health check before final response.
- Add final artifact checklist requirements.
- Add `continue workflow` behavior.
- Keep docs free of scope budget and max file/folder limits.

Acceptance criteria:

- Required workflow behavior is present in root and template docs.
- Final response requirements include exact artifact paths and health status.
- No scope budget language is introduced.

Verification commands:

```bash
rg "_review|_decisions|continue workflow|Workflow Health|Planned -> Ready -> In Progress -> Verified -> Reviewed -> Done|scope budget" AGENTS.md RUN_WORKFLOW.md templates/AGENTS.md templates/RUN_WORKFLOW.md templates/_task/README.md templates/_summary/README.md templates/_progress/progress.md
```

Stop condition:
Stop if existing docs contain conflicting instructions that require user choice.

Out-of-scope items:

- App implementation code.
- Deployment behavior changes.

### TASK-003: Update README and installer

Status: `Done`

Objective:
Update user-facing documentation and installer copying so installed repos receive the new audit workflow folders and guidance.

Files likely affected:

- `README.md`
- `scripts/install.sh`
- `templates/README.md` if it exists

Checklist:

- Add review phase, decisions folder, continue workflow command, health check, final artifact checklist, and task status transitions to README.
- Update repository structure section with `_review/` and `_decisions/`.
- Update installer to copy `_review/README.md` and `_decisions/README.md`.
- Confirm `templates/README.md` absence or update it if present.

Acceptance criteria:

- README explains the new audit flow and testing `continue workflow`.
- Installer copies review and decision template files.
- No nonexistent `templates/README.md` is required if it is absent.

Verification commands:

```bash
rg "_review|_decisions|continue workflow|health check|artifact checklist|Planned -> Ready -> In Progress -> Verified -> Reviewed -> Done" README.md scripts/install.sh
Test-Path templates/README.md
```

Stop condition:
Stop if installer changes would require changing install semantics beyond copying templates.

Out-of-scope items:

- Installation target migrations.
- App implementation code.

### TASK-004: Verify, review, summarize, and report workflow health

Status: `Planned`

Objective:
Verify all requested docs and templates, write the required workflow review and summary, update progress, and prepare final artifact checklist.

Files likely affected:

- `_progress/progress.md`
- `_review/2026-05-11-workflow-audit-improvements.md`
- `_summary/2026-05-11-workflow-audit-improvements.md`

Checklist:

- Run focused text and file-existence verification.
- Confirm no app implementation files were changed.
- Write workflow review before summary.
- Write workflow summary after review.
- Append progress entries with new status terminology.
- Run final workflow health check.

Acceptance criteria:

- Review and summary files exist.
- Progress documents each task outcome.
- Final health status can be reported as `Passed`, `Partial`, or `Failed`.
- Final artifact checklist has exact paths and decisions as `none` if no decision file was needed.

Verification commands:

```bash
git status --short
rg "scope budget|max files|max folders|max folder" AGENTS.md RUN_WORKFLOW.md README.md templates/AGENTS.md templates/RUN_WORKFLOW.md templates/_task/README.md templates/_summary/README.md templates/_progress/progress.md
```

Stop condition:
Stop if verification shows app implementation files changed or scope budget restrictions were added.

Out-of-scope items:

- App implementation code.
- Creating decision files for routine edits.
