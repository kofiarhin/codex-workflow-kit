# Release Notes: Implement Fallow Quality Layer

- Request: Implement Fallow as a reusable workflow quality layer.
- User-facing changes: Workflow now includes a mandatory Fallow Quality gate after review and before handoff/release/health.
- Developer changes: Official Fallow skill files are stored locally; installer copies the layer; docs and templates include command rules, report format, and health checks.
- New routes/APIs: none.
- New env vars: none.
- Database/schema changes: none.
- Dependencies added/removed: none.
- Test commands run: `npm test`; `npm run build`; `npm run test:workflow-routing`; `npm run lint` (missing script); `npm run typecheck` (missing script); Fallow primary/fallback commands.
- Known limitations: Fallow primary `audit` needs an explicit base branch in this checkout; fallback was used. Non-blocking Fallow findings remain documented.
- Follow-up work: dedicated cleanup workflow for unused candidates and complexity hotspots.
- Fallow verdict: PARTIAL.
- Suggested commit message: `feat: add fallow quality workflow layer`
