# Update Workflow Execution Model Task Plan

## Spec File Used

`_spec/2026-05-13-update-workflow-execution-model.md`

## Planning Date

2026-05-13

## Progress And Summary Files Read

- `_progress/progress.md`
- `_summary/2026-05-13-add-dashboard-empty-states.md`

## Execution Mode

Default execution mode for this workflow run: `complete-workflow`.

## Task List

### TASK-001: Update root workflow docs

Status: `Done`

Objective:
Update root workflow files so `complete-workflow` is the default and `single-task` is explicit-only.

Files likely affected:

- `AGENTS.md`
- `RUN_WORKFLOW.md`
- `WORK_REQUEST.md`
- `README.md`
- `_handoff/current.md`
- `_progress/progress.md`

Checklist:

- Define `plan-only`, `single-task`, and `complete-workflow`.
- Set default to `complete-workflow`.
- Add explicit rules against stopping after `TASK-001` by default.
- Update `continue workflow` to continue remaining tasks sequentially.
- Update README usage and example text.
- Update active handoff and progress after the task.

Acceptance criteria:

- Root workflow docs mention `complete-workflow`.
- Root workflow docs keep `single-task` as explicit optional mode.
- Root workflow docs explain final review/summary happen after all executable tasks complete or a stop condition is reached.

Verification commands:

```bash
rg "complete-workflow" AGENTS.md RUN_WORKFLOW.md WORK_REQUEST.md README.md
rg "single-task" AGENTS.md RUN_WORKFLOW.md WORK_REQUEST.md README.md
```

Stop condition:
Stop if the root docs require changes outside workflow documentation or conflict with the spec.

Out-of-scope items:

- App implementation code.
- Template files, except as handled in TASK-002.

### TASK-002: Update workflow templates

Status: `Done`

Objective:
Update installable workflow templates so new projects inherit the `complete-workflow` default.

Files likely affected:

- `templates/AGENTS.md`
- `templates/RUN_WORKFLOW.md`
- `templates/WORK_REQUEST.md`
- `templates/_handoff/current.md`
- `templates/_progress/progress.md`
- `templates/_task/README.md`
- `templates/_summary/README.md`
- `_handoff/current.md`
- `_progress/progress.md`

Checklist:

- Mirror execution mode definitions in template docs.
- Set template default to `complete-workflow`.
- Update template handoff/progress/task/summary guidance to reflect sequential full workflow execution.
- Keep `single-task` documented as explicit optional mode.
- Update active handoff and progress after the task.

Acceptance criteria:

- Template workflow files mention `complete-workflow`.
- Template workflow files keep `single-task` as explicit optional mode.
- Template docs say final summary waits until all executable tasks complete or a stop condition is reached.

Verification commands:

```bash
rg "complete-workflow" templates/AGENTS.md templates/RUN_WORKFLOW.md templates/WORK_REQUEST.md templates/_handoff/current.md templates/_progress/progress.md templates/_task/README.md templates/_summary/README.md
rg "single-task" templates/AGENTS.md templates/RUN_WORKFLOW.md templates/WORK_REQUEST.md templates/_handoff/current.md templates/_progress/progress.md templates/_task/README.md templates/_summary/README.md
```

Stop condition:
Stop if template updates require changing installer behavior or unrelated template assets.

Out-of-scope items:

- Root README edits, except as handled in TASK-001.
- App implementation code.

### TASK-003: Verify docs-only scope and finalize workflow artifacts

Status: `Done`

Objective:
Run final verification, create review and summary artifacts, update handoff, and report completion.

Files likely affected:

- `_review/2026-05-13-update-workflow-execution-model.md`
- `_summary/2026-05-13-update-workflow-execution-model.md`
- `_handoff/current.md`
- `_progress/progress.md`

Checklist:

- Confirm all required root files mention `complete-workflow`.
- Confirm all required template files mention `complete-workflow`.
- Confirm `single-task` remains documented as explicit optional mode.
- Confirm no app implementation files were modified.
- Run an applicable syntax/check command.
- Create final review and summary artifacts.
- Update handoff with final state.

Acceptance criteria:

- Verification commands pass or any gaps are documented.
- Workflow health is `Passed` if all required artifacts exist and scope was respected.
- Final response can include the required artifact checklist and requested usage examples.

Verification commands:

```bash
rg "complete-workflow" AGENTS.md RUN_WORKFLOW.md WORK_REQUEST.md README.md templates/AGENTS.md templates/RUN_WORKFLOW.md templates/WORK_REQUEST.md templates/_handoff/current.md templates/_progress/progress.md templates/_task/README.md templates/_summary/README.md
rg "single-task" AGENTS.md RUN_WORKFLOW.md WORK_REQUEST.md README.md templates/AGENTS.md templates/RUN_WORKFLOW.md templates/WORK_REQUEST.md templates/_handoff/current.md templates/_progress/progress.md templates/_task/README.md templates/_summary/README.md
git diff --name-only
git status --short
```

Stop condition:
Stop if verification finds app implementation changes, missing required artifacts, or failed consistency checks.

Out-of-scope items:

- Fixing unrelated historical workflow entries.
- Committing changes.
