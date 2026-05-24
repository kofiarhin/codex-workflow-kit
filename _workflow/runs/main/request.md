# Request

Fix the missing parallel template file issue in codex-workflow-kit.

## Normalized Request

Complete the parallel template implementation by ensuring committed templates exist under `templates/_workflow/runs/parallel/`, contain the required reusable tracking fields including `Notes`, and align installer behavior plus workflow documentation around run-scoped request state, compatibility-only `WORK_REQUEST.md`, branch/worktree-scoped workflow memory, and merge-safe parallel coordination.

## Required Outcomes

- `templates/_workflow/runs/parallel/claims.md` exists and includes required task-claim fields.
- `templates/_workflow/runs/parallel/locks.md` exists and includes required file-lock fields.
- `templates/_workflow/runs/parallel/agent-status.md` exists and includes required worker-status fields.
- `scripts/install.sh` installs those templates from `templates/_workflow/runs/parallel/`.
- `README.md`, `templates/RUN_WORKFLOW.md`, `templates/_workflow/runs/README.md`, `templates/WORK_REQUEST.md`, and `scripts/install.sh` are consistent.
- Active request state is run-scoped at `<artifact-root>/request.md`.
- Root `WORK_REQUEST.md` is compatibility/manual only.
- Long-lived worktrees such as `main`, `dev`, and `redesign` do not need to edit the same active workflow-state file.
- Final audit reports `PASSED`, `PARTIAL`, or `FAILED`.

## Execution Preference

`complete-workflow`
