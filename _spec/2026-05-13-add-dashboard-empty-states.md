# Add Dashboard Empty States Spec

## Request Summary

Add empty state messages to dashboard cards and sections that can show no data.

## Date

2026-05-13

## Source Prompt

`add empty state message to dashboard cards`

Clarification:

- Add empty state messages to all dashboard cards/sections that can show no data.
- Use the default message: `No data to display yet.`
- Proceed with the default single-task workflow.

## Questions Asked And Answers Received

- Which dashboard cards should get the empty state message? Answer: all dashboard cards/sections that can show no data.
- What message should appear? Answer: `No data to display yet.`
- Execution preference? Answer: single-task workflow.

## Assumptions

- The current dashboard surface is `client/src/pages/DashboardPage.jsx`.
- "Cards/sections that can show no data" currently means the API status card when the health query returns no data and the stack card section if its item list is empty.
- Static hero content does not need an empty state because it is not data-driven.
- The empty state should match the existing dashboard visual language and remain accessible.

## Goal

Show a clear, consistent empty state message wherever dashboard cards or data sections render no available data.

## Non-Goals

- Redesign the dashboard.
- Add new dashboard data sources.
- Change backend API contracts.
- Change deployment configuration.
- Add new dependencies.

## Users

- App users viewing the dashboard.
- Developers using this boilerplate and reading dashboard UI patterns.

## Functional Requirements

- Render `No data to display yet.` in dashboard UI areas that can otherwise appear blank due to absent data.
- Preserve existing loading and error behavior.
- Preserve existing API status rendering when health data is available.
- Preserve existing stack card rendering when stack items exist.
- Add or update frontend tests for the empty-state behavior.

## UI Expectations

- Empty state message should be visually quiet, aligned with the existing card styling, and readable in light and dark mode.
- Empty state should use the existing Tailwind CSS styling system.
- No emoji should be used.
- No new card-heavy redesign or unrelated motion should be introduced.

## API Expectations

- No API contract changes.
- No frontend API URL changes.

## Data Model Expectations

- No data model changes.

## Edge Cases

- Health query finishes with `data: null` or otherwise no payload.
- Stack item list is empty.
- Loading and error states must take precedence over empty states.

## Constraints

- Follow React, Vite, Tailwind CSS, and existing dashboard conventions.
- Use `@phosphor-icons/react` only if an icon is needed; it is already installed.
- Do not add dependencies.
- Apply the mandatory `design-taste-frontend` skill for UI work.

## Success Criteria

- Dashboard displays `No data to display yet.` when health query has no data and no loading/error state.
- Dashboard includes an empty path for a card/section item list with no items.
- Existing dashboard tests continue passing.
- New test coverage confirms the empty-state message appears.
- `npm run test --workspace client` and `npm run build --workspace client` pass or any failure is documented.

## Out-Of-Scope Items

- Backend work.
- Full dashboard redesign.
- Persisted dashboard settings.
- Deployment changes.

## Open Questions

- None blocking.
