# Summary: Worktree-Scoped Workflow Artifacts

## Request

Update codex-workflow-kit to support long-lived git worktrees without workflow artifact merge conflicts.

## Spec File Used

`_spec/2026-05-23-worktree-scoped-workflow-artifacts.md`

## Detailed Spec Completeness

Complete. The saved spec included all required detailed spec sections. The user explicitly approved the generated spec and declined adding the extra edge cases discussed in chat.

## Task Plan Used

`_task/2026-05-23-worktree-scoped-workflow-artifacts.md`

## Review File Used

`_review/2026-05-23-worktree-scoped-workflow-artifacts.md`

## Tasks Completed

- `TASK-001: Add run-scoped artifact rules to workflow instructions`
- `TASK-002: Add worktree setup and template support`
- `TASK-003: Verify merge-safe artifact documentation and finalize`

## Iteration Evidence Summary

- TASK-001: Added run-scope detection and `<artifact-root>` paths to root/template workflow instructions, then verified required terms and mirror consistency.
- TASK-002: Added README worktree setup/recovery docs, `_workflow` guidance/templates, installer support, and supporting docs path updates.
- TASK-003: Ran final requested audit, diff checks, and wrote final artifacts.

## Files Changed

- `AGENTS.md`
- `README.md`
- `RUN_WORKFLOW.md`
- `WORK_REQUEST.md`
- `_handoff/current.md`
- `_progress/progress.md`
- `_release/2026-05-23-worktree-scoped-workflow-artifacts.md`
- `_review/2026-05-23-worktree-scoped-workflow-artifacts.md`
- `_spec/2026-05-23-worktree-scoped-workflow-artifacts.md`
- `_summary/2026-05-23-worktree-scoped-workflow-artifacts.md`
- `_task/2026-05-23-worktree-scoped-workflow-artifacts.md`
- `_workflow/index.md`
- `_workflow/runs/README.md`
- `docs/PROMPTS.md`
- `scripts/install.sh`
- `templates/AGENTS.md`
- `templates/RUN_WORKFLOW.md`
- `templates/_workflow/index.md`
- `templates/_workflow/runs/README.md`
- `templates/docs/PROMPTS.md`

## Verification Run

- Required run-scoped artifact searches passed.
- Dev/redesign path separation checks passed.
- Legacy active path search in README/RUN_WORKFLOW/template RUN_WORKFLOW found only explicit compatibility notes.
- `bash -n scripts/install.sh` passed.
- `git diff --check` passed with line-ending warnings only.
- `git diff --stat` and `git diff` ran.
- `git status --short client server` returned no app changes.

## Acceptance Results

- README explains the worktree-scoped artifact model and bare repo/worktree setup commands: `[x]`
- RUN_WORKFLOW requires detecting branch, worktree path, run id, and artifact root before writing workflow artifacts: `[x]`
- Root and template workflow guidance make `_workflow/runs/<run-id>/` canonical for active artifacts: `[x]`
- Required artifact filenames are documented: `[x]`
- Run id defaults to current branch, sanitizes branch separators, and supports `CODEX_WORKFLOW_RUN_ID`: `[x]`
- Agents are instructed to update only their own run directory: `[x]`
- Shared `_workflow/index.md` and `_workflow/runs/README.md` are optional/index-only or guidance-only: `[x]`
- Merge-safe artifact and conflict recovery guidance is documented: `[x]`
- Installer/template support includes `_workflow`: `[x]`
- Final audit confirms dev/redesign workflow report paths do not conflict: `[x]`

## Failure Recovery Notes

None.

## Final Diff Audit

- Diff matches saved spec: yes.
- Unrelated files touched by this request: no app/runtime files; `notes.txt` was pre-existing and unrelated.
- Workflow artifacts updated correctly: yes.
- Tests added or updated for changed behavior: not applicable for docs-only work.
- Scope creep: none.
- Generated junk or temporary files: none found.
- Sensitive values/secrets added: none found.

## Release Notes File Used

`_release/2026-05-23-worktree-scoped-workflow-artifacts.md`

## Unresolved Issues

None.

## Next Recommended Work

Commit the workflow documentation update separately from unrelated dirty files.
