# Fallow Audit

## Command Run

- Primary: `npx fallow audit --format json --quiet --explain 2>/dev/null || true`
- Primary result: JSON error envelope with exit_code `2`: could not detect base branch. Use --base <ref> to specify the comparison target (e.g., --base main)
- Fallback: `npx fallow --format json --quiet --explain 2>/dev/null || true`
- Fallback result: parsed JSON root `kind` = `combined`.

## Summary

- Fallow ran through fallback and produced parseable JSON.
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

## Findings

### Non-blocking findings documented

- Unused file candidate: `client/test/setup.js`. Kept for now because test setup files can be referenced by runner configuration or future test suites even when static analysis cannot prove usage.
- Unused file candidate: `server/tests/setupEnv.js`. Kept for now because test setup files can be referenced by runner configuration or future test suites even when static analysis cannot prove usage.
- Unused export candidate: `closeSidebar` in `client/src/redux/navigation/navigationSlice.js` line 18. Kept for now because this request wires the workflow layer and does not refactor application APIs.
- Unused export candidate: `toggleSidebar` in `client/src/redux/navigation/navigationSlice.js` line 18. Kept for now because this request wires the workflow layer and does not refactor application APIs.
- Unused export candidate: `setTheme` in `client/src/redux/ui/uiSlice.js` line 51. Kept for now because this request wires the workflow layer and does not refactor application APIs.
- Unused export candidate: `register` in `client/src/services/authService.js` line 13. Kept for now because this request wires the workflow layer and does not refactor application APIs.
- Duplicate code candidates: 2 clone groups. Not changed because this request adds the quality gate and does not perform broad refactors.
- Health finding (critical): `normalizeServicePayload` in `server/controllers/braidServiceController.js` line 13 exceeds complexity/CRAP thresholds; targeted coverage or refactor should be handled in a dedicated cleanup workflow.
- Health finding (moderate): `assertDocContainsRoutingContract` in `scripts/validate-frontend-skill-routing.js` line 85 exceeds CRAP threshold because estimated coverage is low; targeted tests should be handled in a dedicated cleanup workflow.

## Fixes Applied

- None. No Fallow fixes were applied because the findings are non-blocking for this workflow-layer implementation and automatic export/file deletion could remove intentional public or test surfaces.

## Remaining Exceptions

- Remaining Fallow findings are accepted as non-blocking for this change set and should be handled in a dedicated cleanup/refactor workflow with product/API owner review.
- The primary `audit` command requires an explicit base branch in this checkout and returned exit code 2. The required fallback command produced parseable JSON and was used for this report.

## Verification

- `npm test` passed.
- `npm run build` passed.
- `npm run test:workflow-routing` passed.
- `npm run lint` could not run because no root `lint` script is defined.
- `npm run typecheck` could not run because no root `typecheck` script is defined.
- Fallow fallback JSON parsed successfully and root `kind` was `combined`.

## Verdict

PARTIAL

Fallow ran successfully through the required fallback and produced parseable JSON. Non-blocking findings remain and are documented with reasons. `.workflow/fallow-audit.md` exists.
