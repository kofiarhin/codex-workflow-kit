# Work Request

This file is auto-managed by the workflow. It stores the latest active work request, usually copied from the user's direct Codex prompt.

Users do not need to edit this file manually. You may edit it when you want to stage a request before asking the agent to run the workflow.

The workflow will ask clarifying questions, generate a saved detailed spec in `_spec/`, create a vertical task plan in `_task/`, execute tasks one by one until the request is complete or stopped, update `_progress/progress.md` and `_handoff/current.md` after each task, write a workflow review in `_review/`, create release notes in `_release/`, and write a final summary in `_summary/`.

## Request

Fix the failed detailed-spec workflow update.

Upgrade the Spec Phase into a detailed implementation-aware execution blueprint. The previous update did not fully replace lightweight spec guidance; remaining workflow docs still treat specs as short briefs in some places.

## Required Files To Read

- `AGENTS.md`
- `RUN_WORKFLOW.md`
- `README.md`
- `docs/PROMPTS.md`
- `templates/RUN_WORKFLOW.md`
- `templates/docs/PROMPTS.md`
- `_spec/README.md`
- `templates/_spec/README.md`
- `_task/README.md`
- `templates/_task/README.md`
- `_progress/progress.md`
- `_handoff/current.md`

## Requested Changes

- `RUN_WORKFLOW.md`: require the detailed spec phase, require saving it before task planning, require task planning to derive from it, require health check validation of all detailed spec sections, and preserve the 3-pass Build -> Refine -> Polish loop.
- `templates/RUN_WORKFLOW.md`: mirror `RUN_WORKFLOW.md`.
- `_spec/README.md`: replace the lightweight spec template with the exact detailed spec template from the user request.
- `templates/_spec/README.md`: mirror `_spec/README.md`.
- `docs/PROMPTS.md`: replace old Spec Generation, add Spec Quality Review, update Vertical Task Generation to extract tasks from the detailed spec, and update Final Summary to report spec completeness/gaps.
- `templates/docs/PROMPTS.md`: mirror `docs/PROMPTS.md`.
- `README.md`: describe the spec phase as a detailed execution blueprint and make clear planning happens after, and is derived from, that detailed spec.
- Relevant workflow documentation, templates, prompts, and workflow artifacts may be updated as needed to remove remaining lightweight spec guidance.

## Detailed Spec Rules

- Use the exact 22-section detailed spec structure from the user request.
- Use `Not applicable` for irrelevant sections. Do not delete required sections.
- The detailed spec must be saved before task planning.
- The task plan must cite or reference the detailed spec sections it was derived from.
- Health check must be `Partial` or `Failed` if the detailed spec is missing required sections.
- Final response must mention the detailed spec file used and whether the spec had gaps.

## Preserve

- Existing execution modes: `plan-only`, `single-task`, and `complete-workflow`.
- Dirty worktree protection.
- Acceptance tracking.
- Failure recovery.
- Handoff.
- Progress.
- Review.
- Release notes.
- Summary.
- Final health check.
- Existing 3-pass Build -> Refine -> Polish task hardening loop.

## Verification

Run these searches and ensure the results are updated correctly:

```bash
grep -R "Request summary" .
grep -R "Spec Phase" .
grep -R "Spec Generation" .
grep -R "Vertical Task Generation" .
grep -R "Health Check" .
grep -R "detailed spec" .
```

Then run available formatting/lint/test commands if present.

Finally run:

```bash
git diff --stat
git diff
```

## Execution Preference

`complete-workflow`

## Scope Boundaries

- Do not change app/runtime code.
- Do not commit changes.
- Only update workflow documentation, templates, prompts, and relevant workflow artifacts.
