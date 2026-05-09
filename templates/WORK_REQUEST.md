# Work Request

This file is auto-managed by the workflow. It stores the latest active work request, usually copied from the user's direct Codex prompt.

Users do not need to edit this file manually. You may edit it when you want to stage a request before asking the agent to run the workflow.

The workflow will classify the active request, inspect the repo, generate or update docs, create scoped tasks, and execute according to the selected execution mode.

## Request

`<Auto-synced from latest direct prompt, e.g. Implement login with JWT auth.>`

## Execution Mode

Choose one:

- `plan-only`: classify request, inspect repo, update docs, generate tasks, then stop.
- `single-task`: generate tasks, implement only the first ready task, verify, critique/fix, then stop.
- `full-auto`: execute all generated tasks sequentially until complete, blocked, risky, or unverified.

Default: `single-task`

## Optional Context

- User or business goal: `<Why this matters>`
- Known bug or error: `<Paste error, screenshot notes, or failing command>`
- Constraints: `<Do not change X / must use Y / no new dependencies>`
- Preferred verification: `<Test command, manual check, build command>`

## Do Not Change

- `<File, feature, API, behavior, or area that should stay untouched>`
