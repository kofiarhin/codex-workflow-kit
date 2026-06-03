# Fallow Audit

## Command Run

- Primary: `npx fallow audit --base main --format json --quiet --explain 2>/dev/null || true`
- Primary result: JSON error envelope with exit_code `2`: could not determine changed files for base ref 'main'. Verify the ref exists in this git repository
- Fallback: `npx fallow --format json --quiet --explain 2>/dev/null || true`
- Fallback result: parsed JSON root `kind` = `combined`.

## Summary

- Primary command now includes explicit `--base main`.
- Fallow fallback ran successfully and produced parseable JSON because this local checkout does not contain a `main` ref for the primary changed-code audit.
- Dead-code issue count: 6.
- Unused files: 2.
- Unused exports: 4.
- Unused types: 0.
- Unused dependencies: 0.
- Unused dev dependencies: 0.
- Unlisted dependencies: 0.
- Circular dependencies: 0.
- Re-export cycles: 0.
- Boundary violations: 0.
- Stale suppressions: 0.
- Duplicate clone groups: 2 (1.42% duplicated lines).
- Health: average maintainability 94.0; critical findings 1; moderate findings 1.
- Follow-up artifact: `.workflow/fallow-followups.md`.

## Findings

### Non-blocking findings documented

- Unused file candidate: `client/test/setup.js`. Kept for now because test setup files can be referenced by runner configuration or future test suites even when static analysis cannot prove usage.
- Unused file candidate: `server/tests/setupEnv.js`. Kept for now because test setup files can be referenced by runner configuration or future test suites even when static analysis cannot prove usage.
- Unused export candidate: `closeSidebar` in `client/src/redux/navigation/navigationSlice.js` line 18. Kept for now because this PR wires and hardens the workflow layer and does not refactor application APIs.
- Unused export candidate: `toggleSidebar` in `client/src/redux/navigation/navigationSlice.js` line 18. Kept for now because this PR wires and hardens the workflow layer and does not refactor application APIs.
- Unused export candidate: `setTheme` in `client/src/redux/ui/uiSlice.js` line 51. Kept for now because this PR wires and hardens the workflow layer and does not refactor application APIs.
- Unused export candidate: `register` in `client/src/services/authService.js` line 13. Kept for now because this PR wires and hardens the workflow layer and does not refactor application APIs.
- Duplicate code candidates: 2 clone groups. Not changed because this PR updates the quality gate and does not perform broad refactors.
- Complexity finding (critical): `normalizeServicePayload` in `server/controllers/braidServiceController.js` line 13 exceeds `all` threshold(s); targeted coverage or refactor should be handled in a dedicated cleanup workflow.
- Complexity finding (moderate): `assertDocContainsRoutingContract` in `scripts/validate-frontend-skill-routing.js` line 85 exceeds `crap` threshold(s); targeted coverage or refactor should be handled in a dedicated cleanup workflow.

## Fixes Applied

- Added safe root `lint` and `typecheck` scripts that delegate to client/server workspace scripts with `--if-present`.
- No Fallow automatic fixes were applied; `fix --dry-run` / `fix --yes` was not used because remaining findings require product/API/test-owner review rather than safe mechanical cleanup.

## Remaining Exceptions

- Remaining Fallow findings are documented in `.workflow/fallow-followups.md` with recommended cleanup tasks and reasons they are not fixed in this PR.
- The primary `audit --base main` command could not complete in this local checkout because no `main` ref exists. The workflow command is now correct for target repos that have `main`; the required fallback produced parseable JSON here.

## Verification

- `npm test` passed.
- `npm run build` passed.
- `npm run test:workflow-routing` passed.
- `npm run lint` passed using workspace `--if-present` delegates.
- `npm run typecheck` passed using workspace `--if-present` delegates.
- `npx fallow audit --base main --format json --quiet --explain 2>/dev/null || true` produced a parseable JSON error envelope with exit_code `2` because this checkout has no `main` ref.
- `npx fallow --format json --quiet --explain 2>/dev/null || true` parsed successfully with root `kind` = `combined`.

## Verdict

PARTIAL

Fallow ran successfully through the required fallback and produced parseable JSON. Non-blocking findings remain, all remaining findings are documented with reasons in `.workflow/fallow-followups.md`, and `.workflow/fallow-audit.md` exists.
