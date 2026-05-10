# Add Workflow Handoff Support Task Plan

## Spec File Used

`_spec/2026-05-13-add-workflow-handoff-support.md`

## Planning Date

2026-05-13

## Progress And Summary Files Read

- `_progress/progress.md`
- `_summary/2026-05-11-fix-vite-5175-connection-refused.md`

## Task List

### TASK-001: Add handoff workflow memory

Status: Done

Objective:
Add the `_handoff/current.md` live resume state and update the workflow docs, templates, installer, progress docs, summary docs, and README so agents keep handoff current and use it for `continue workflow`.

Files likely affected:

- `WORK_REQUEST.md`
- `_handoff/current.md`
- `templates/_handoff/current.md`
- `AGENTS.md`
- `RUN_WORKFLOW.md`
- `README.md`
- `templates/AGENTS.md`
- `templates/RUN_WORKFLOW.md`
- `templates/_progress/progress.md`
- `_summary/README.md`
- `templates/_summary/README.md`
- `scripts/install.sh`
- `_progress/progress.md`
- `_review/2026-05-13-add-workflow-handoff-support.md`
- `_summary/2026-05-13-add-workflow-handoff-support.md`

Checklist:

- Create handoff template files with all required fields.
- Update root and template agent rules.
- Update root and template workflow orchestration.
- Update progress and summary docs to describe history versus live state.
- Update installer copy list.
- Update README with `Handoff / Resume`.
- Verify required terms are present.
- Verify prohibited scope budget and max-file-limit terms were not added.
- Verify no app implementation files were modified by this task.

Lifecycle transition reached:

`Planned -> Ready -> In Progress -> Verified -> Reviewed -> Done`

Verification result:

- `Test-Path _handoff/current.md; Test-Path templates/_handoff/current.md` returned `True` for both files.
- `rg -i "Current request|Request ID|Current phase|Current spec file|Current task plan file|Current review file|Current summary file|Last completed task|Current task|Next task|Blockers|Verification status|Workflow health status|Suggested next prompt|Notes for continuation" _handoff/current.md templates/_handoff/current.md` found all expected fields in both handoff files.
- `rg "_handoff/current.md|continue workflow|live resume state|append-only task history|completed workflow history" ...` found required handoff and memory-role terms in the updated workflow docs/templates/script files.
- `rg "scope budget|max-file|max files|max folders|max folder" ...` returned no matches in the updated workflow docs/templates/script files.
- `bash -n scripts/install.sh` passed.
- `git status --short` showed pre-existing app changes in `client/vite.config.js`; this task did not edit app implementation code.

Review result:

- Scope respected. The changes are limited to workflow docs, templates, installer, and workflow memory artifacts.
- No in-scope defects found after verification.

Acceptance criteria:

- `_handoff/current.md` and `templates/_handoff/current.md` exist.
- Handoff files include the requested fields.
- `continue workflow` starts from `_handoff/current.md`.
- `_progress/progress.md` remains append-only task history.
- `_summary/` remains completed workflow history.
- `scripts/install.sh` copies the handoff template into target repositories.
- README explains how to resume with `continue workflow`.

Verification commands:

```bash
Test-Path _handoff/current.md
Test-Path templates/_handoff/current.md
rg "_handoff/current.md|continue workflow|live resume state|append-only task history|completed workflow history" AGENTS.md RUN_WORKFLOW.md README.md templates/AGENTS.md templates/RUN_WORKFLOW.md templates/_progress/progress.md templates/_summary/README.md scripts/install.sh _handoff/current.md templates/_handoff/current.md
rg "scope budget|max-file|max files|max folders|max folder" AGENTS.md RUN_WORKFLOW.md README.md templates/AGENTS.md templates/RUN_WORKFLOW.md templates/_progress/progress.md templates/_summary/README.md scripts/install.sh _handoff/current.md templates/_handoff/current.md
git diff --name-only
```

Stop condition:

- Stop if verification shows app implementation files were modified by this task.
- Stop if required handoff fields are missing.
- Stop if the requested prohibited policy terms were introduced.

Out-of-scope items:

- App implementation code.
- Scope budget.
- Max-file limits.
- Deployment behavior.
