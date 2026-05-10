# Fix Vite 5175 Connection Refused Task Plan

## Spec File Used

`_spec/2026-05-11-fix-vite-5175-connection-refused.md`

## Planning Date

2026-05-11

## Progress And Summary Files Read

- `_progress/progress.md`
- `_summary/2026-05-11-add-profile-avatar-url.md`

## Task List

### TASK-001: Pin the client dev server to port 5175

Status: Done (Planned -> Ready -> In Progress -> Verified -> Reviewed -> Done)

Objective:
Make the Vite frontend dev server consistently serve `http://localhost:5175/` during local development.

Files likely affected:

- `client/vite.config.js`
- `_progress/progress.md`
- `_review/2026-05-11-fix-vite-5175-connection-refused.md`
- `_summary/2026-05-11-fix-vite-5175-connection-refused.md`

Checklist:

- Read the current Vite config.
- Add a `server` config with `host`, `port`, and `strictPort`.
- Run the client build.
- Start the client dev server on port `5175` and verify the URL responds.
- Review the change for scope and side effects.
- Append progress.

Acceptance criteria:

- The dev server is configured for port `5175`.
- The dev server does not silently move ports when `5175` is unavailable.
- Client build passes.
- `http://localhost:5175/` responds while the dev server is running.

Verification commands:

```bash
npm run build --workspace client
npm run dev --workspace client
```

Stop condition:

- Stop if Vite cannot start for an unrelated dependency, configuration, or environment issue.

Out-of-scope items:

- Backend server changes.
- API service changes.
- UI redesign.
