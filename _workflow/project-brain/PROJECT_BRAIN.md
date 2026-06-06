# Project Brain

> Generated human-readable projection of `_workflow/project-brain/project.json`.
> JSON is the source of truth.

- Version: `1.0.0`
- Updated at: `2026-06-06T08:47:11Z`
- Workflow: `workflow-complete` (`complete`)
- Next stage: `none`

## Goal
- Provide CLI-native project and run memory that agents maintain automatically without a separate UI.

## Requirement
- Use non-destructive structured JSON as the source of truth and generate human-readable Markdown projections, activity, and checkpoints.

## Constraint
- Preserve existing workflow approval, TDD, progress, handoff, parallel, and installer behavior.

## Architecture Decision
- Install generic run-memory seeds under `_workflow/templates/run/`; copy missing seeds into each active run.

## Technical Decision
- Use versioned JSON/Markdown templates, Bash installer mappings, and dependency-free Node validation.

## Artifacts
- Project Brain templates and run-memory seeds under `templates/_workflow/`.
- Installer support in `scripts/install.sh`.
- Focused validation in `scripts/validate-project-brain.js`.
- Workflow/agent contracts and README documentation.

## Open Questions
None.

## Conflicts
None.

## Recent Changes
- Initialized Project Brain for the approved request.
- Completed templates, installer, workflow integration, documentation, validation, review, and release artifacts.
