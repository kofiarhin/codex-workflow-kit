# Summary: Add TDD-First Workflow Rule

## Request

Update the workflow kit so code generation follows a strict TDD-first approach while preserving the existing workflow structure.

## Spec File Used

`_spec/2026-05-19-add-tdd-first-workflow.md`

## Detailed Spec Completeness

Complete. The saved detailed spec includes all 22 required sections. No missing required sections needed repair before planning.

## Task Plan Used

`_task/2026-05-19-add-tdd-first-workflow.md`

## Review File Used

`_review/2026-05-19-add-tdd-first-workflow.md`

## Release Notes File Used

`_release/2026-05-19-add-tdd-first-workflow.md`

## Tasks Completed

- `TASK-001: Add TDD-first rules to workflow and templates`
- `TASK-002: Verify and finalize TDD-first workflow update`

## Iteration Evidence Summary

- TASK-001: Build added TDD-first workflow and evidence rules; Refine tightened post-refactor verification and README health wording; Polish confirmed consistency and scope.
- TASK-002: Build ran targeted TDD/preservation searches; Refine ran repo test/build/diff-check verification; Polish ran final diff audit and completed final artifacts.

## Files Changed

- `AGENTS.md`
- `README.md`
- `RUN_WORKFLOW.md`
- `WORK_REQUEST.md`
- `_handoff/current.md`
- `_progress/progress.md`
- `_review/2026-05-19-add-tdd-first-workflow.md`
- `_release/2026-05-19-add-tdd-first-workflow.md`
- `_spec/2026-05-19-add-tdd-first-workflow.md`
- `_summary/2026-05-19-add-tdd-first-workflow.md`
- `_task/2026-05-19-add-tdd-first-workflow.md`
- `_task/README.md`
- `docs/PROMPTS.md`
- `templates/AGENTS.md`
- `templates/RUN_WORKFLOW.md`
- `templates/_progress/progress.md`
- `templates/_task/README.md`
- `templates/docs/PROMPTS.md`

## Verification Run

- Targeted TDD-first `rg` search passed.
- Existing workflow preservation `rg` search passed.
- Root/template mirror checks for `RUN_WORKFLOW.md`, `_task/README.md`, and `docs/PROMPTS.md` returned no content differences, with line-ending warnings only.
- `npm test` passed. Client tests emitted existing React Router future-flag warnings.
- `npm run build` passed.
- `git diff --check` passed with line-ending normalization warnings only.
- `git diff --stat` and `git diff` ran.
- `git status --short client server` returned no app/runtime changes.

## Acceptance Results

- `RUN_WORKFLOW.md` and `templates/RUN_WORKFLOW.md` require Red/Green/Refactor for every code-changing task: `[x]`.
- Build -> Refine -> Polish embeds TDD inside every iteration: `[x]`.
- `_task` templates require test plan, Red evidence, Green evidence, Refactor evidence, test commands run, and acceptance result: `[x]`.
- Review and health-check rules block code-task `Done` without TDD evidence or justified missing-test exception: `[x]`.
- Existing workflow modes, artifacts, statuses, dirty worktree protection, progress, handoff, review, release notes, summary, and health check remain documented: `[x]`.
- README/docs explain the TDD-first code generation rule: `[x]`.
- Final diff audit ran and changed files are reported: `[x]`.
- No app/runtime code changed: `[x]`.

## Failure Recovery Notes

None.

## Final Diff Audit

- Diff matches saved spec: yes.
- Unrelated files touched: no.
- Workflow artifacts updated correctly: yes.
- Tests added or updated for changed behavior: not applicable; documentation-only change.
- Scope creep: none.
- Generated junk or temporary files: none.
- Sensitive values/secrets added: none.
- App/runtime code changed: no.
- Existing unrelated dirty file: `notes.txt` remains untracked and untouched.

## Release Notes File Used

`_release/2026-05-19-add-tdd-first-workflow.md`

## Unresolved Issues

None.

## Next Recommended Work

Review and commit the documentation changes.
