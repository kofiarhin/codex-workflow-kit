# Release Notes: Add Detailed Spec Blueprint

## Request

Update the workflow kit so the Spec Phase generates a detailed, implementation-aware execution blueprint before task planning.

## User-Facing Changes

- The workflow now describes the Spec Phase as a detailed execution blueprint instead of a lightweight brief.
- The README explains that task plans are derived from the detailed spec.

## Developer Changes

- `RUN_WORKFLOW.md` and `templates/RUN_WORKFLOW.md` now require a 22-section detailed spec before planning.
- `_spec/README.md` and `templates/_spec/README.md` document the detailed spec structure.
- `docs/PROMPTS.md` and `templates/docs/PROMPTS.md` include an expanded Spec Generation prompt, a new Spec Quality Review prompt, spec-derived Vertical Task Generation guidance, and Final Summary spec-completeness reporting.
- Workflow health checks now validate required detailed spec sections.

## New Routes/APIs

none

## New Env Vars

none

## Database/Schema Changes

none

## Dependencies Added/Removed

none

## Test Commands Run

- `rg "Request summary|Goal|Non-goals|Functional requirements|Success criteria|Open questions" RUN_WORKFLOW.md templates/RUN_WORKFLOW.md docs/PROMPTS.md templates/docs/PROMPTS.md _spec/README.md templates/_spec/README.md README.md`
- `rg "Spec Phase|Spec Generation|Vertical Task Generation|Health Check|detailed spec|execution blueprint" RUN_WORKFLOW.md templates/RUN_WORKFLOW.md docs/PROMPTS.md templates/docs/PROMPTS.md _spec/README.md templates/_spec/README.md README.md`
- `rg "Build -> Refine -> Polish|Iteration 1|Iteration 2|Iteration 3|complete-workflow|single-task|plan-only" RUN_WORKFLOW.md templates/RUN_WORKFLOW.md README.md docs/PROMPTS.md templates/docs/PROMPTS.md`
- `git diff --no-index -- docs/PROMPTS.md templates/docs/PROMPTS.md`
- `npm test`
- `npm run build`
- `git diff --check`
- `git diff --stat`
- `git diff`

## Known Limitations

Historical specs remain in their original format. New workflow runs should use the detailed structure.

## Follow-Up Work

none

## Suggested Commit Message

`docs: require detailed spec blueprint before planning`
