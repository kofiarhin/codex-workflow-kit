# Release Notes: Fix Detailed Spec Workflow Update

## Request

Fix the failed detailed-spec workflow update.

## User-Facing Changes

- Workflow guidance now consistently treats the spec as a detailed implementation-aware execution blueprint.
- The spec memory README uses the exact 22-section detailed spec template.
- Task planning guidance now requires task plans to cite or reference the detailed spec sections they were derived from.
- The README now states that task plans should cite or reference the detailed spec sections used.

## Developer Changes

- Updated `AGENTS.md` and `templates/AGENTS.md` to remove the old lightweight `Spec Rules` list.
- Updated `_spec/README.md` and `templates/_spec/README.md` with the exact detailed spec template.
- Updated `_task/README.md` and `templates/_task/README.md` with detailed-spec-derived task planning requirements.
- Tightened detailed spec field labels in `RUN_WORKFLOW.md`, `templates/RUN_WORKFLOW.md`, `docs/PROMPTS.md`, and `templates/docs/PROMPTS.md`.
- Clarified spec-derived planning in `README.md`.
- Added workflow artifacts for the fix run.

## New Routes/APIs

none

## New Env Vars

none

## Database/Schema Changes

none

## Dependencies Added/Removed

none

## Test Commands Run

- `grep -R "Request summary" .` timed out; rerun as `grep -R --exclude-dir=.git --exclude-dir=node_modules "Request summary" .` passed.
- `grep -R "Spec Phase" .` timed out; rerun with `.git` and `node_modules` excluded passed.
- `grep -R "Spec Generation" .` timed out; rerun with `.git` and `node_modules` excluded passed.
- `grep -R "Vertical Task Generation" .` timed out; rerun with `.git` and `node_modules` excluded passed.
- `grep -R --exclude-dir=.git --exclude-dir=node_modules "Health Check" .` passed.
- `grep -R --exclude-dir=.git --exclude-dir=node_modules "detailed spec" .` passed.
- `npm test` passed.
- `npm run build` passed.
- `git diff --check` passed with line-ending normalization warnings only.
- `git diff --stat` ran.
- `git diff` ran.

## Known Limitations

Historical workflow artifacts still contain old phrases as history or verification text. Active workflow docs/templates no longer use the lightweight spec template as current guidance.

## Follow-Up Work

none

## Suggested Commit Message

`docs: replace remaining lightweight spec guidance`
