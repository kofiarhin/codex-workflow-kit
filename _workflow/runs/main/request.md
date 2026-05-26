# Active Request

Date: 2026-05-26
Run ID: main
Source: latest direct user prompt

## Raw Request

Add a reusable `polish-ui` workflow to this repo.

Keep the current workflow intact.
Do not replace the default workflow.
Do not change existing frontend skill routing.
Reuse the existing frontend taste skill:
.skills/design-taste-frontend/SKILL.md

Goal:
When I ask things like:
- polish ui
- redesign ui
- improve this interface
- make this screen production-ready
- visual polish pass
- refine this frontend

The workflow should run a structured UI polish flow.

Requirements:

1. Trigger behavior
Create a reusable workflow path called `polish-ui`.
It should activate only for UI redesign/polish/refinement tasks.

2. Reuse existing frontend taste skill
Do not create a new taste skill.
Use:
.skills/design-taste-frontend/SKILL.md

Apply it:
- before implementation (audit/critique)
- after implementation (final UI review)

3. Workflow flow
Preserve the repo's workflow style:
spec -> approval -> task plan -> execute -> verify -> review -> release notes -> summary -> health check

For `polish-ui`, run:

STEP 1 - UI Discovery
- detect frontend app
- identify relevant routes/pages/components
- identify UI surfaces involved

STEP 2 - Baseline Capture
- capture current UI state
- if browser automation exists, use screenshots
- if no browser tooling exists, inspect JSX/TSX/CSS/Tailwind structure
- save baseline evidence

STEP 3 - Taste Audit
Apply `.skills/design-taste-frontend/SKILL.md` to review:
- spacing
- layout hierarchy
- typography
- color consistency
- responsiveness
- motion quality
- loading states
- empty states
- error states
- card overuse
- generic AI frontend patterns
- mobile UX issues

Record:
Applied skill: design-taste-frontend

STEP 4 - UI Polish Spec
Generate polish-specific improvement spec.

STEP 5 - Vertical Task Plan
Break improvements into screen-by-screen or component-by-component tasks.

STEP 6 - Execute
Apply UI improvements incrementally.

STEP 7 - Re-Capture
Capture updated UI/screens or code-state evidence.

STEP 8 - Final Taste Review
Run `.skills/design-taste-frontend/SKILL.md` again.
Compare before/after.

STEP 9 - Verification
Run available:
- tests
- lint
- build
- diff checks

STEP 10 - Final Workflow Artifacts
Produce:
- review
- verification
- release notes
- summary
- handoff

4. Artifact structure
Create/use:

```txt
.workflow/artifacts/polish-ui/
  spec.md
  task-plan.md
  progress.md
  audit.md
  before/
  after/
  review.md
  verification.md
  release-notes.md
  summary.md
  handoff.md
```

5. Safety / scope
Do not create a new frontend skill.
Do not duplicate `design-taste-frontend`.
Do not force screenshots if no browser automation exists.
Fallback to code-surface review if screenshots are unavailable.
Do not modify unrelated workflow behavior.

6. Validation
Add the smallest validation proving:
- polish ui triggers `polish-ui`
- backend-only tasks do not
- frontend generation tasks still use existing conditional frontend skill routing
- `polish-ui` reuses `design-taste-frontend`

Run repo checks and report results.

## Clarifications

- Use the literal artifact path `.workflow/artifacts/polish-ui/` for polish-ui artifacts, while continuing to use `_workflow/runs/main/` for the current workflow run artifacts.
- Add `polish-ui` as documented workflow behavior in `RUN_WORKFLOW.md` and templates, plus the smallest script/helper needed to classify polish prompts into the `polish-ui` workflow.
- Extend the existing workflow-routing validation script if that is cleanest. Only add a separate focused validation script if extending the current one becomes messy.
- Proceed with the spec and stop at the approval gate.
