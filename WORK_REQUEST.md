# Work Request

This file is auto-managed by the workflow. It stores the latest active work request, usually copied from the user's direct Codex prompt.

Users do not need to edit this file manually. You may edit it when you want to stage a request before asking the agent to run the workflow.

The workflow will ask clarifying questions, generate a saved spec in `_spec/`, create a vertical task plan in `_task/`, execute tasks one by one, update `_progress/progress.md`, and write a final summary in `_summary/`.

## Request

`add notification`

## Question Preference

Choose one:

- `ask questions`: default. Ask focused questions until about 90% understanding before writing the spec.
- `skip questions`: do not ask questions; generate a best-effort spec and record assumptions.

Default: `ask questions`

## Optional Execution Preference

Choose one:

- `plan-only`: ask questions, write spec, write task plan, then stop.
- `single-task`: ask questions, write spec, write task plan, execute only the first ready task, verify, update progress, write summary, then stop.
- `full-auto`: ask questions, write spec, write task plan, execute tasks sequentially until complete, blocked, risky, unclear, or unverified.

Default: `single-task`

## Optional Context

- User or business goal: Give users immediate feedback when session actions succeed.
- Target users: Authenticated dashboard users.
- Expected behavior: Show in-app toast/banner notifications on successful login and successful logout.
- UI expectations: Toast/banner appears at the top-right of the dashboard, disappears automatically after 4 seconds, and uses the existing React/Tailwind UI style.
- API expectations: Use existing auth login/logout services; no new notification API.
- Data model expectations: Do not persist notifications in the database.
- Edge cases: Validation and login errors should continue to use existing inline errors; success toasts only fire after successful mutations.
- Constraints: In-app only for now; no browser push, email, database persistence, or new deployment assumptions.
- Success criteria: Login success shows a dashboard toast; logout success shows a dashboard toast; each auto-dismisses after 4 seconds.
- Preferred verification: Default single-task workflow with focused frontend tests/build.

## Out Of Scope

- `<File, feature, API, behavior, or area that should stay untouched>`
