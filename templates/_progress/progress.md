# Progress Log

Agents must read this file before planning and before touching code for each task.

Append a new entry after each task. Do not replace previous entries except to correct factual errors.

## Task Status Transitions

Every task must move through:

```txt
Planned -> Ready -> In Progress -> Verified -> Reviewed -> Done
```

Allowed terminal states:

- `Done`
- `Blocked`
- `Needs Human Review`

If verification cannot run, record the task as `Needs Human Review`, not `Done`.

## Entry Template

### `<YYYY-MM-DD HH:MM>` - `<TASK-ID>`

- Status: `<Done / Blocked / Needs Human Review>`
- Lifecycle transition reached: `<Planned -> Ready -> In Progress -> Verified -> Reviewed -> Done, or terminal stop>`
- Files changed: `<paths or none>`
- Verification result: `<commands and result, or why verification could not run>`
- Review result: `<reviewed / issues found / not reviewed with reason>`
- Blockers: `<none or details>`
- Next step: `<next task, review, summary, or stop reason>`
