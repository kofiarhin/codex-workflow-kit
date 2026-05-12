# Work Request

This file is auto-managed by the workflow. It stores the latest active work request, usually copied from the user's direct Codex prompt.

Users do not need to edit this file manually. You may edit it when you want to stage a request before asking the agent to run the workflow.

The workflow will ask clarifying questions, generate a saved detailed spec in `_spec/`, create a vertical task plan in `_task/`, execute tasks one by one until the request is complete or stopped, update `_progress/progress.md` and `_handoff/current.md` after each task, write a workflow review in `_review/`, create release notes in `_release/`, and write a final summary in `_summary/`.

## Request

Update the workflow kit so the Spec Phase generates a much more detailed, implementation-aware execution blueprint before task planning.

Upgrade the existing Spec Phase from a lightweight brief into a detailed execution blueprint that helps the agent understand:

- what is being solved
- why it matters
- how the current system works
- what should change
- what must not change
- which files/surfaces may be affected
- what risks exist
- how verification will prove completion
- how the later vertical task plan should be derived

Do not generate app code. Only update workflow docs/templates/artifacts.

## Files Requested

- `RUN_WORKFLOW.md`
- `templates/RUN_WORKFLOW.md`
- `docs/PROMPTS.md`
- `templates/docs/PROMPTS.md`
- `_spec/README.md`
- `templates/_spec/README.md`
- `README.md`
- Relevant current workflow artifacts under `_review/`, `_summary/`, `_release/`, `_progress/`, or `_handoff/` if this workflow run requires documenting the change.

## Required Detailed Spec Sections

The spec template must include at least:

1. Metadata
2. Original Request
3. Questions And Answers
4. Problem Definition
5. Current State Analysis
6. Desired End State
7. Scope
8. Users And Use Cases
9. Functional Requirements
10. Non-Functional Requirements
11. Affected Surfaces
12. Dependency And Integration Map
13. Data And State Impact
14. UX / API / Workflow Expectations
15. Execution Strategy
16. Verification Strategy
17. Acceptance Criteria
18. Edge Cases And Failure Modes
19. Risks And Mitigations
20. Assumptions
21. Open Questions
22. Task Extraction Notes

Use `Not applicable` for irrelevant sections instead of deleting them.

## Prompt Documentation Requirements

Update `docs/PROMPTS.md` and `templates/docs/PROMPTS.md`:

- Replace the current `Spec Generation` prompt with a detailed spec-generation prompt using the required sections.
- Add a reusable `Spec Quality Review` prompt that checks whether a saved spec is complete enough for task planning.
- Update `Vertical Task Generation` so tasks are explicitly extracted from the detailed spec, especially affected surfaces, execution strategy, verification strategy, acceptance criteria, risks, and task extraction notes.
- Update `Final Summary` so it reports whether the detailed spec was complete or had gaps.

## Acceptance Criteria

- `RUN_WORKFLOW.md` requires the expanded detailed spec before planning.
- `templates/RUN_WORKFLOW.md` mirrors the same requirement.
- `_spec/README.md` documents the new detailed spec structure.
- `templates/_spec/README.md` mirrors it.
- `docs/PROMPTS.md` includes the updated Spec Generation prompt.
- `templates/docs/PROMPTS.md` mirrors it.
- `README.md` describes the spec phase as a detailed execution blueprint.
- Planning Phase explicitly derives tasks from the detailed spec.
- Health Check validates required spec sections.
- Existing 3-pass task hardening loop remains intact.
- Existing execution modes remain intact.
- No unrelated workflow behavior is removed.

## Verification

- Search for old lightweight spec wording and replace it where needed:
  - `Request summary`
  - `Goal`
  - `Non-goals`
  - `Functional requirements`
  - `Success criteria`
  - `Open questions`
- Confirm those terms are no longer the entire spec structure and are now part of the larger detailed spec.
- Search for `Spec Phase`, `Spec Generation`, `Vertical Task Generation`, and `Health Check` and confirm they reference the detailed spec.
- Run available formatting/lint/test commands if present.
- Run `git diff --stat`.
- Run `git diff`.

## Question Preference

The user provided detailed required files, sections, rules, acceptance criteria, verification expectations, and execution preference. No blocking clarifying question is needed; assumptions are recorded in the saved spec.

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
- Runtime dependency changes.
- Removing existing execution modes.
- Removing the existing Build -> Refine -> Polish task hardening loop.
- Removing existing workflow gates or artifacts.
