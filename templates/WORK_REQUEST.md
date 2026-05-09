# Work Request

Write one plain-English request below. Keep it short. The workflow will classify it, inspect the repo, update docs, create scoped tasks, and execute according to the selected execution mode.

## Request

`<Example: Implement login with JWT auth.>`

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
