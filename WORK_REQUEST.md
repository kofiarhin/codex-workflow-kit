# Work Request

This file is auto-managed by the workflow. It stores the latest active work request, usually copied from the user's direct Codex prompt.

Users do not need to edit this file manually. You may edit it when you want to stage a request before asking the agent to run the workflow.

The workflow will ask clarifying questions, generate a saved spec in `_spec/`, create a vertical task plan in `_task/`, execute tasks one by one, update `_progress/progress.md`, write a workflow review in `_review/`, and write a final summary in `_summary/`.

## Request

Add empty state message to dashboard cards.

Add empty state messages to all dashboard cards/sections that can show no data.

Default message:

```txt
No data to display yet.
```

Execution preference: `single-task`.

## Question Preference

Choose one:

- `ask questions`: default. Ask focused questions until about 90% understanding before writing the spec.
- `skip questions`: do not ask questions; generate a best-effort spec and record assumptions.

Default: `ask questions`

## Optional Execution Preference

Choose one:

- `plan-only`: ask questions, write spec, write task plan, then stop.
- `single-task`: ask questions, write spec, write task plan, execute only the first ready task, verify, update progress, write review, write summary, then stop.
- `full-auto`: ask questions, write spec, write task plan, execute tasks sequentially until complete, blocked, risky, unclear, or unverified.

Selected: `single-task`

Default: `full-auto`

## Optional Context

- Latest direct prompt from user: `add empty state message to dashboard cards`
- Clarification received: Add empty state messages to all dashboard cards/sections that can show no data. Use `No data to display yet.` as the default message. Proceed with default single-task workflow.

## Out Of Scope

- Unrelated dashboard redesign.
- Deployment changes.
