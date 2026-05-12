# Summary: Add 3-Pass Task Hardening Loop

## Request

Update the workflow documentation and templates so every executable task must complete Build -> Refine -> Polish before it can be marked `Done`.

## Spec File Used

`_spec/2026-05-15-add-3-pass-task-hardening-loop.md`

## Task Plan Used

`_task/2026-05-15-add-3-pass-task-hardening-loop.md`

## Review File Used

`_review/2026-05-15-add-3-pass-task-hardening-loop.md`

## Release Notes File Used

`_release/2026-05-15-add-3-pass-task-hardening-loop.md`

## Tasks Completed

- `TASK-001: Add 3-pass loop to core workflow docs`
- `TASK-002: Add 3-pass loop to prompts and workflow memory templates`
- `TASK-003: Update README and finalize workflow evidence`

## Iteration Evidence Summary

- TASK-001: Build added core workflow loop language; Refine added current-iteration resume and recovery wording; Polish confirmed old single-pass phrases were gone.
- TASK-002: Build added prompt and memory-template evidence fields; Refine removed the remaining old template phrase; Polish confirmed prompt docs are mirrored and coverage searches passed.
- TASK-003: Build updated README workflow language; Refine removed the remaining single-task example gap; Polish ran repo tests and diff checks.

## Files Changed

- `AGENTS.md`
- `README.md`
- `RUN_WORKFLOW.md`
- `WORK_REQUEST.md`
- `docs/PROMPTS.md`
- `templates/RUN_WORKFLOW.md`
- `templates/docs/PROMPTS.md`
- `_task/README.md`
- `templates/_task/README.md`
- `_progress/progress.md`
- `templates/_progress/progress.md`
- `_handoff/current.md`
- `templates/_handoff/current.md`
- `_review/README.md`
- `templates/_review/README.md`
- `_summary/README.md`
- `templates/_summary/README.md`
- `_release/README.md`
- `templates/_release/README.md`
- `_spec/2026-05-15-add-3-pass-task-hardening-loop.md`
- `_task/2026-05-15-add-3-pass-task-hardening-loop.md`
- `_review/2026-05-15-add-3-pass-task-hardening-loop.md`
- `_release/2026-05-15-add-3-pass-task-hardening-loop.md`
- `_summary/2026-05-15-add-3-pass-task-hardening-loop.md`

## Verification Run

- Required old single-pass language search returned no matches in the requested file set.
- Required 3-pass/iteration evidence search passed.
- Prompt mirror check passed.
- `npm test` passed for client and server.
- `git diff --check` passed with line-ending normalization warnings only.
- `git diff --stat` and `git diff` ran for final diff audit.

## Acceptance Results

- TASK-001: all required criteria checked `[x]`.
- TASK-002: all required criteria checked `[x]`.
- TASK-003: all required criteria checked `[x]`.

## Failure Recovery Notes

No verification command failed. Failure recovery was not needed.

## Final Diff Audit

- Diff matches saved spec: yes.
- Unrelated files touched: no.
- Workflow artifacts updated correctly: yes.
- Tests added or updated for changed behavior: not applicable for docs/template-only workflow behavior.
- Accidental scope creep: none.
- Generated junk or temporary files: none found.
- Sensitive values/secrets added: none found.
- `git diff` does not include untracked files, so `git status --short` was also used to audit newly created workflow artifacts.

## Workflow Health Status

Passed.

## Final Artifact Checklist

- Work request: `WORK_REQUEST.md`
- Handoff: `_handoff/current.md`
- Spec: `_spec/2026-05-15-add-3-pass-task-hardening-loop.md`
- Task plan: `_task/2026-05-15-add-3-pass-task-hardening-loop.md`
- Progress: `_progress/progress.md`
- Review: `_review/2026-05-15-add-3-pass-task-hardening-loop.md`
- Release notes: `_release/2026-05-15-add-3-pass-task-hardening-loop.md`
- Summary: `_summary/2026-05-15-add-3-pass-task-hardening-loop.md`
- Decisions: `none`

## Unresolved Issues

None.

## Next Recommended Work

Review and commit the workflow documentation changes.
