# Work Request

This file is auto-managed by the workflow. It stores the latest active work request, usually copied from the user's direct Codex prompt.

Users do not need to edit this file manually. You may edit it when you want to stage a request before asking the agent to run the workflow.

The workflow will run intake unless skipped or resuming, generate a saved detailed spec in `_spec/`, pause for explicit user approval, create a vertical task plan in `_task/` only after approval, execute tasks according to the selected execution mode, update `_progress/progress.md` and `_handoff/current.md`, write a workflow review in `_review/`, create release notes in `_release/`, and write a final summary in `_summary/`.

## Request

Update the workflow so there is a mandatory user approval gate after spec generation.

Required workflow order:

```txt
request
-> grill-me intake unless skipped/resuming
-> shared understanding handoff
-> sync WORK_REQUEST.md
-> dirty worktree check
-> generate and save detailed spec in _spec/
-> display spec summary + spec path to user
-> STOP and wait for explicit user approval or requested changes
-> only after approval, generate vertical task plan in _task/
-> continue execution according to selected execution mode
```

Spec approval gate rules:

- After saving the spec, do not generate `_task/` yet.
- Do not start implementation.
- Pause workflow and wait for user response.
- Display the exact approval prompt provided in the original request.
- Accept approval phrases: `approve spec`, `approved`, `looks good`, `proceed to planning`, `proceed`.
- Accept revision phrases: `change:`, `update:`, `revise:`, `add:`, `remove:`.
- If approved, generate `_task/` and continue based on execution mode.
- If revisions are requested, update the same spec or create a revised spec, redisplay the summary, and ask for approval again.
- If canceled, stop workflow, update `_handoff/current.md`, and mark workflow paused/cancelled.
- For `continue workflow`, if a spec exists but `_task/` does not exist, resume at the spec approval gate and do not auto-generate tasks.
- Preserve existing Build -> Refine -> Polish and TDD flow after approval.

## Execution Preference

`complete-workflow`

## Scope Boundaries

- Change `RUN_WORKFLOW.md` and matching README/docs/template references only.
- Do not change unrelated workflow behavior.
- Do not change application implementation code.
- Do not commit changes.
