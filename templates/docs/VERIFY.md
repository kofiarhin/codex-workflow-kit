# Verification Log

Use this file to record what was actually checked for each active task. Append a new entry after each completed, blocked, or repaired task.

## Verification Rules

- Record commands exactly as run.
- Do not mark verification as passed unless it actually passed.
- If a command cannot run, record why.
- Include manual checks when automated tests are unavailable.
- Record bugs found during verification and fixes applied.
- Link the entry to the work request and active task.

## Verification Entry Template

### `<YYYY-MM-DD>` - `<TASK-ID: Task title>`

Work request:
`<Plain-English request from WORK_REQUEST.md>`

Request classification:
`<feature / bugfix / boilerplate / security / refactor / test / docs / ops / research>`

Active task status:
`<Done / Blocked / Needs review>`

Summary:
`<Brief summary of what changed.>`

Files touched:

- `<path/to/file>`: `<Created / Updated / Deleted and why>`

Commands run:

```bash
<command>
```

Results:

- `<Command>`: `<Passed / Failed / Not run, with reason>`

Manual checks:

- `<Manual check performed or None>`

Bugs found:

- `<Bug or None>`

Fixes applied:

- `<Fix or None>`

Critique result:

- `<Issue found during critique or None>`

Unresolved issues:

- `<Issue or None>`

Next recommended step:

- `<Next task or follow-up>`

## Entries

### `<YYYY-MM-DD>` - `<TASK-ID: Task title>`

Work request:
`<Add the first work request here.>`

Request classification:
`<request type>`

Active task status:
`<status>`

Summary:
`<Add the first verification entry here.>`

Files touched:

- `<path/to/file>`: `<reason>`

Commands run:

```bash
<command>
```

Results:

- `<Command>`: `<Result>`

Manual checks:

- `<Check or None>`

Bugs found:

- `<Bug or None>`

Fixes applied:

- `<Fix or None>`

Critique result:

- `<Finding or None>`

Unresolved issues:

- `<Issue or None>`

Next recommended step:

- `<Recommendation>`
