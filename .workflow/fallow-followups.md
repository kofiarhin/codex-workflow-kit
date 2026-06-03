# Fallow Follow-ups

## Summary

This artifact records remaining Fallow findings from the latest quality pass. They are not fixed in this PR because this PR is scoped to making Fallow Quality a reusable workflow gate, adding safe lint/typecheck delegates, and documenting quality evidence. Cleanup could remove intentional public/test surfaces or require product/API decisions, so it should be handled in a dedicated follow-up workflow.

## Unused File Candidates

- `client/test/setup.js` — verify whether the test runner or project setup still needs this file before deleting or suppressing it.
- `server/tests/setupEnv.js` — verify whether the test runner or project setup still needs this file before deleting or suppressing it.

## Unused Export Candidates

- `closeSidebar` in `client/src/redux/navigation/navigationSlice.js` line 18 — verify public/API intent before removing or suppressing the export.
- `toggleSidebar` in `client/src/redux/navigation/navigationSlice.js` line 18 — verify public/API intent before removing or suppressing the export.
- `setTheme` in `client/src/redux/ui/uiSlice.js` line 51 — verify public/API intent before removing or suppressing the export.
- `register` in `client/src/services/authService.js` line 13 — verify public/API intent before removing or suppressing the export.

## Duplicate Code Candidates

- Clone group 1 (11 lines, fingerprint `dup:8db0d33b`): `server/controllers/authController.js:96-102`, `server/controllers/notificationPreferencesController.js:25-35`. Recommended cleanup: extract shared helper only after confirming it improves readability and does not over-abstract tests/controllers.
- Clone group 2 (14 lines, fingerprint `dup:5b8914a9`): `server/tests/authProfile.test.js:4-17`, `server/tests/notificationPreferences.test.js:5-18`. Recommended cleanup: extract shared helper only after confirming it improves readability and does not over-abstract tests/controllers.

## Complexity Hotspots

- `normalizeServicePayload` in `server/controllers/braidServiceController.js` line 13 — severity `critical`, exceeded `all`, cyclomatic `23`, cognitive `27`, CRAP `137.3`. Recommended cleanup: add targeted branch coverage and/or split into smaller helpers.
- `assertDocContainsRoutingContract` in `scripts/validate-frontend-skill-routing.js` line 85 — severity `moderate`, exceeded `crap`, cyclomatic `6`, cognitive `2`, CRAP `42.0`. Recommended cleanup: add targeted branch coverage and/or split into smaller helpers.

## Recommended Cleanup Task

Create a follow-up workflow task: `Audit and clean Fallow findings`, with acceptance criteria to verify each unused file/export candidate, decide keep/delete/suppress, evaluate duplicate clone groups for safe extraction, and add coverage or refactor complexity hotspots. Run `npx fallow audit --base main --format json --quiet --explain 2>/dev/null || true` plus fallback if needed after cleanup.

## Why Not Fixed In This PR

- The current PR changes the workflow quality layer and command/reporting behavior; it should not also remove or refactor application/test code.
- Unused file/export cleanup can remove intentional public APIs or test setup surfaces without owner review.
- Duplicate and complexity fixes require targeted design decisions and regression coverage beyond this workflow documentation change.
