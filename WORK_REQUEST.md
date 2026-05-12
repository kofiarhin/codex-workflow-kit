# Work Request

This file is auto-managed by the workflow. It stores the latest active work request, usually copied from the user's direct Codex prompt.

Users do not need to edit this file manually. You may edit it when you want to stage a request before asking the agent to run the workflow.

The workflow will ask clarifying questions, generate a saved spec in `_spec/`, create a vertical task plan in `_task/`, execute tasks one by one until the request is complete or stopped, update `_progress/progress.md` and `_handoff/current.md` after each task, write a workflow review in `_review/`, create release notes in `_release/`, and write a final summary in `_summary/`.

## Request

Update this workflow kit to support a required 3-pass task hardening loop for every executable task.

Every executable task must run through:

1. Iteration 1 - Build: implement the smallest working vertical slice, run verification, review against acceptance criteria, and record issues/gaps/next refinement target.
2. Iteration 2 - Refine: fix issues from Build and improve correctness, edge cases, tests, structure, naming, typing, reliability, and project consistency; run verification and review again.
3. Iteration 3 - Polish: perform final cleanup and hardening, remove rough edges, tighten tests/docs/types/error handling where relevant, confirm no regressions, run final verification, and produce the final task verdict.

Each iteration must include documented evidence:

- Goal.
- Changes made.
- Verification command and result.
- Review findings.
- Acceptance status.
- Remaining issues.
- Next action.

Update workflow documentation and templates so tasks can no longer be marked `Done` after a single execute -> verify -> review pass. A task cannot be `Done` until the full Build -> Refine -> Polish loop is complete and all required acceptance criteria are checked `[x]`, unless a documented stop condition forces `Blocked` or `Needs Human Review`.

## Files Requested

- `AGENTS.md`
- `RUN_WORKFLOW.md`
- `README.md`
- `docs/PROMPTS.md`
- `templates/RUN_WORKFLOW.md`
- `templates/docs/PROMPTS.md`
- `_handoff/current.md`
- `_progress/progress.md`
- Relevant template README files under:
  - `templates/_task/`
  - `templates/_progress/`
  - `templates/_handoff/`
  - `templates/_review/`
  - `templates/_summary/`
  - `templates/_release/`
  - `_task/`
  - `_progress/`
  - `_handoff/`
  - `_review/`
  - `_summary/`
  - `_release/`

## Acceptance Criteria

- The workflow clearly requires Build -> Refine -> Polish for every executable task.
- The task plan template includes per-iteration fields.
- Progress tracking records each iteration separately.
- Handoff can resume from the current task and current iteration.
- Health check fails or becomes `Partial` if iteration evidence is missing.
- Final response includes iteration evidence summary.
- Existing concepts remain intact: spec first, vertical task plan, dirty worktree protection, acceptance results, failure recovery, final diff audit, review, release notes, summary, handoff, health check.
- No unrelated behavior or app code is changed.

## Verification

- Search the repo for old single-pass language like `verify and review each task` and update it where it now needs iteration-loop language.
- Search for all mentions of task execution and confirm they now reference the 3-pass hardening loop where appropriate.
- Run available formatting/lint/test commands if present.
- Run `git diff --stat` and `git diff`.

## Question Preference

The user provided detailed requirements, acceptance criteria, files, and verification expectations. No blocking clarifying question is needed; assumptions are recorded in the saved spec.

## Optional Execution Preference

Selected: `complete-workflow`

Default: `complete-workflow`

## Optional Context

- Dirty worktree check before implementation: `git status --short` returned no existing dirty files.
- Planned files are workflow docs, templates, and workflow run artifacts only.
- Overlap risk: none detected before edits.

## Out Of Scope

- App implementation code under `client/` or `server/`.
- Deployment changes.
- New runtime dependencies.
- Removing existing execution modes.
- Removing existing workflow gates or artifacts.
