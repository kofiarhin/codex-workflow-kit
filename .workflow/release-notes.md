# Release Notes: Implement Fallow Quality Layer

- Request: Update PR #3 based on audit feedback for the Fallow Quality workflow layer.
- User-facing changes: Workflow now documents and uses `npx fallow audit --base main --format json --quiet --explain 2>/dev/null || true` as the primary audit command.
- Developer changes: Added safe root `lint` and `typecheck` workspace delegate scripts; added `.workflow/fallow-followups.md` for remaining Fallow findings; updated Fallow audit verdict evidence and workflow artifacts.
- New routes/APIs: none.
- New env vars: none.
- Database/schema changes: none.
- Dependencies added/removed: none.
- Test commands run: `npm test`; `npm run build`; `npm run test:workflow-routing`; `npm run lint`; `npm run typecheck`; `npx fallow audit --base main --format json --quiet --explain 2>/dev/null || true`; `npx fallow --format json --quiet --explain 2>/dev/null || true`.
- Known limitations: This local checkout has no `main` ref, so the primary Fallow changed-code audit returned a parseable JSON error envelope with exit_code `2`; fallback Fallow analysis parsed successfully. Non-blocking Fallow findings remain documented in `.workflow/fallow-followups.md`.
- Follow-up work: Run the recommended cleanup task in `.workflow/fallow-followups.md` after product/API/test-owner review.
- Fallow verdict: PARTIAL.
- Suggested commit message: `fix: harden fallow quality audit workflow`
