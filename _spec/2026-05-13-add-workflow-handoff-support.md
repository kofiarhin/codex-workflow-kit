# Add Workflow Handoff Support Spec

## Request Summary

Add `_handoff/current.md` as the live workflow resume state, update workflow docs/templates to keep it current, and update the installer to copy the handoff template into target projects.

## Date

2026-05-13

## Source Prompt

User requested workflow handoff support so agents can stop and resume cleanly with `continue workflow`, explicitly limiting changes to workflow templates/docs and excluding app implementation code.

## Questions Asked And Answers Received

- No follow-up questions were asked. The prompt specified the exact files, behavior, exclusions, final response requirements, and acceptance criteria.

## Assumptions

- This is a docs/workflow task, not a frontend or app implementation task.
- The existing workflow artifact pattern should be preserved and extended rather than replaced.
- A single vertical task is enough because the requested files form one coherent workflow documentation update.
- `_handoff/current.md` should be committed as a reusable template-style live state file in this kit repository.

## Goal

Create a live handoff memory mechanism that lets a future agent resume from `_handoff/current.md` and reconcile completed task history with `_progress/progress.md`.

## Non-Goals

- Do not change application implementation code.
- Do not add scope budget rules.
- Do not add max-file or max-folder limits.
- Do not change deployment behavior.
- Do not introduce dependencies.

## Users

- AI coding agents using this workflow kit.
- Developers installing the workflow kit into another repository.

## Functional Requirements

- Create `_handoff/current.md`.
- Create `templates/_handoff/current.md`.
- The handoff template must include the requested fields.
- Update `RUN_WORKFLOW.md` and `templates/RUN_WORKFLOW.md` so planning, execution, task completion, summary, health check, and `continue workflow` use `_handoff/current.md`.
- Update `AGENTS.md` and `templates/AGENTS.md` with handoff freshness and resume rules.
- Update progress and summary docs so `_progress/progress.md` is append-only history, `_summary/` is completed workflow history, and `_handoff/current.md` is live resume state.
- Update `scripts/install.sh` to copy `templates/_handoff/current.md` to `_handoff/current.md`.
- Update `README.md` with a `Handoff / Resume` section.

## UI Expectations

None. No user-facing application UI is in scope.

## API Expectations

None. No API changes are in scope.

## Data Model Expectations

None. No application data model changes are in scope.

## Edge Cases

- If `_handoff/current.md` does not exist, the workflow should create it.
- If `_handoff/current.md` conflicts with `_progress/progress.md`, completed task history in `_progress/progress.md` is authoritative and handoff should be updated.
- If `continue workflow` is requested and all tasks are already done, the workflow should finish missing review, summary, health check, or final response steps.

## Constraints

- Modify workflow docs, templates, and installer only.
- Preserve existing workflow concepts and terminology.
- Keep progress append-only.
- Keep summary as completed workflow history.
- Keep handoff as live resume state.

## Success Criteria

- All requested files are created or updated.
- The handoff template contains all required fields.
- README explains handoff/resume behavior.
- Installer copies the handoff template.
- Verification confirms handoff references and prohibited terms are correct.
- No application implementation files are modified by this task.

## Out-Of-Scope Items

- App code changes under `client/` or `server/`.
- Runtime behavior changes.
- New dependency installation.
- Deployment configuration changes.
- Scope budget or max-file-limit policy changes.

## Open Questions

- None blocking.
