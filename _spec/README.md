# Spec Memory

Store generated workflow specs in this folder.

Agents must create a saved detailed spec here before task planning or implementation. Use timestamped or slugged filenames, for example:

```txt
_spec/2026-05-10-add-dark-theme.md
```

The spec is an implementation-aware execution blueprint, not a lightweight brief. It must be based on the active request, intake answers, repo intake, dirty worktree status, handoff/progress context, latest relevant summary, and durable project docs.

The spec should be detailed but not padded. Use `Not applicable` for irrelevant sections instead of deleting them.

## Detailed Spec Required Sections

1. Metadata
   - Spec filename
   - Date
   - Request ID or slug
   - Request source
   - Execution mode
   - Request classification
   - Scope level
   - Risk level
2. Original Request
   - Raw user request
   - Normalized request
   - Source prompt or `WORK_REQUEST.md` reference
3. Questions And Answers
   - Questions asked
   - Answers received
   - Questions skipped because user said `skip questions`
   - Remaining open questions
4. Problem Definition
   - Problem being solved
   - Why it matters
   - Current pain point
   - Expected value
5. Current State Analysis
   - Existing behavior
   - Existing architecture/components involved
   - Existing files/modules likely involved
   - Existing data flow
   - Existing API/UI/CLI/workflow behavior, when relevant
   - Existing tests or verification coverage, when known
6. Desired End State
   - Expected final behavior
   - User-facing outcome
   - Developer-facing outcome
   - System/workflow outcome
   - Backward compatibility expectations
7. Scope
   - In scope
   - Out of scope
   - Non-goals
   - Explicit boundaries
8. Users And Use Cases
   - Primary users
   - Secondary users
   - Main use cases
   - Edge use cases
9. Functional Requirements
   - Concrete required behaviors
   - Inputs
   - Outputs
   - State changes
   - Error states
   - Permissions/auth expectations, when relevant
10. Non-Functional Requirements
   - Performance expectations
   - Reliability expectations
   - Security/privacy expectations
   - Accessibility expectations, when relevant
   - Maintainability expectations
   - DX expectations
11. Affected Surfaces
   - Files likely affected
   - Directories likely affected
   - UI surfaces
   - API routes
   - Components
   - Services
   - Database/schema
   - Config/env vars
   - Tests
   - Docs
   - Workflow artifacts
12. Dependency And Integration Map
   - Internal dependencies
   - External packages/services
   - Integration points
   - Ordering constraints
   - Migration/setup requirements
13. Data And State Impact
   - Data models
   - Database changes
   - State management changes
   - Cache/session/local storage impact
   - Backward compatibility impact
14. UX / API / Workflow Expectations
   - UX expectations, if relevant
   - API contract expectations, if relevant
   - CLI/workflow behavior, if relevant
   - Error handling expectations
   - Empty/loading/success/failure states, if relevant
15. Execution Strategy
   - Recommended implementation approach
   - Suggested sequencing
   - Safe rollout/migration approach
   - Files to inspect before editing
   - Decisions to avoid until more evidence exists
16. Verification Strategy
   - Required automated checks
   - Required manual checks
   - Test types needed
   - Build/lint/typecheck expectations
   - Acceptance evidence required
   - What counts as proof of completion
17. Acceptance Criteria
   - Checklist format only
   - Concrete, measurable, verifiable items
   - Include behavior and artifact/documentation criteria when relevant
18. Edge Cases And Failure Modes
   - Edge cases
   - Failure modes
   - Regression risks
   - Recovery expectations
19. Risks And Mitigations
   - Technical risks
   - Product/UX risks
   - Security risks
   - Scope risks
   - Mitigation plan for each risk
20. Assumptions
   - Explicit assumptions
   - Confidence level where useful
   - What should be revisited if assumptions are wrong
21. Open Questions
   - Blocking questions
   - Non-blocking questions
   - How each question affects execution
22. Task Extraction Notes
   - Suggested vertical task boundaries
   - Suggested first task
   - Suggested task ordering
   - Areas that should not become separate tasks
   - How the 3-pass Build -> Refine -> Polish loop should apply

Task plans in `_task/` must be derived from this detailed spec, especially affected surfaces, execution strategy, verification strategy, acceptance criteria, risks, and task extraction notes.
