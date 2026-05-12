# Spec: Add Workflow Quality Controls

## Request Summary

Update the reusable workflow docs and templates with five quality-control optimizations: final diff audit, dirty worktree protection, acceptance checklist results, failure recovery protocol, and release notes artifacts.

## Date

2026-05-13

## Source Prompt

User requested workflow improvements for safer completed work, easier auditing, easier recovery from failures, and easier shipping. The request explicitly names the files/folders to update and states that only workflow templates/docs should change, with no app implementation code modifications.

## Questions Asked And Answers Received

- No clarifying questions were asked. The prompt provided exact behavior, files, artifact requirements, backward-compatibility requirements, and verification expectations.

## Assumptions

- This is a docs/workflow-template request, not an app feature request.
- Root workflow docs and template workflow docs should stay aligned.
- New release notes support should be represented by `_release/README.md` and `templates/_release/README.md`.
- Existing workflow modes and folders must remain supported.
- Current workflow run artifacts for this request may be created or updated as required by `RUN_WORKFLOW.md`.

## Goal

Make the workflow safer and more auditable by requiring final diff inspection, dirty worktree checks, explicit acceptance results, fixed failure recovery behavior, and release notes output.

## Non-Goals

- Do not modify app implementation code.
- Do not change deployment setup.
- Do not remove existing workflow modes or artifact folders.
- Do not add dependencies.

## Users

- AI coding agents using this workflow.
- Developers reviewing agent-produced work.
- Maintainers installing the workflow into other repositories.

## Functional Requirements

- Add final diff audit instructions requiring `git diff --stat` and `git diff` when available.
- Add dirty worktree protection requiring `git status --short` before implementation, documented existing dirty files, planned files, and overlap risk.
- Add acceptance result fields to task plans and require all required criteria to be `[x]` before `Done`.
- Add a fixed failure recovery protocol for failed verification.
- Add release notes artifacts under `_release/<request-id>.md` after completed workflows.
- Update workflow health checks so passed status requires release notes, final diff audit, dirty worktree check, acceptance results, verification, scope control, and existing core artifacts.
- Update README documentation and artifact checklists.
- Update installer to copy `templates/_release/README.md` into `_release/README.md`.
- Preserve backward compatibility for `_spec`, `_task`, `_progress`, `_review`, `_summary`, `_handoff`, `_decisions`, `complete-workflow`, `single-task`, `plan-only`, and `continue workflow`.

## UI Expectations

Not applicable. This is documentation and workflow template work only.

## API Expectations

Not applicable.

## Data Model Expectations

Not applicable.

## Edge Cases

- If `git diff` cannot run, the agent must document why.
- If dirty files overlap with planned files, the agent must stop and ask before editing.
- If dirty files are unrelated, the agent may continue but must document them.
- If verification fails, the agent must classify the failure and avoid broad refactors.
- If acceptance criteria are partial or unmet, the task cannot be marked `Done`.
- If no user-facing changes, APIs, env vars, dependencies, or schema changes exist, release notes must say so.

## Constraints

- Update workflow docs/templates/artifacts only.
- Do not modify application implementation files under `client/` or `server/`.
- Use existing Markdown style and shell installer structure.
- Do not remove existing workflow capabilities.

## Success Criteria

- Root workflow files mention final diff audit, dirty worktree protection, acceptance results, failure recovery protocol, and `_release`.
- Template workflow files mention the same quality-control concepts.
- `scripts/install.sh` copies `templates/_release/README.md` to `_release/README.md`.
- `_release/README.md` and `templates/_release/README.md` exist.
- Current request artifacts include spec, task plan, progress, handoff, review, summary, and release notes.
- Final diff audit is completed or documented.
- No app implementation files are modified.
- Applicable syntax/check commands pass or failures are documented.

## Out-Of-Scope Items

- App implementation changes.
- New application tests.
- Deployment configuration changes.
- Removing or renaming existing workflow folders.

## Open Questions

- None blocking.
