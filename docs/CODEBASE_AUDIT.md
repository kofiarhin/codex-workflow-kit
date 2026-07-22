# Codex Workflow Kit Codebase Audit

## Audit scope

This audit reviewed the root README, installer implementation, run-artifact model, Project Brain design, generic architecture template, workflow stages, and compatibility guidance on `main`.

## Implemented system

Codex Workflow Kit is a template-driven workflow distribution rather than a conventional application. Its executable surface is primarily `scripts/install.sh`; its runtime behavior is then interpreted by coding agents from installed Markdown, JSON, and skill files.

The installer is intentionally non-destructive by default. It validates arguments and paths, creates parent directories, skips existing files, and replaces files only when `--force` is explicitly supplied.

The installed workflow uses run-scoped directories for branch/worktree isolation and Project Brain JSON files for durable project memory.

## Documentation assessment

### Strong areas

- The root README is comprehensive and explains discovery, approval, execution, verification, Project Brain, worktree isolation, installation, and legacy compatibility.
- Installer behavior is explicit and easy to inspect.
- The workflow separates approved specifications from generated task plans and implementation.
- Run artifacts and memory files have clear intended ownership.
- Safety rules cover dirty worktrees, test-first work, review, final diff audits, and evidence-backed completion.

### Added documents

- `docs/PRD.md` now defines the kit's product goals, requirements, non-goals, and success criteria.
- `docs/TECHNICAL_SPEC.md` now documents the kit's own implementation, rather than the generic architecture template copied into target projects.

### Identified documentation drift

The root README presents `_workflow/runs/<run-id>/` as the active model, while `docs/ARCHITECTURE.md` still describes legacy `_spec/`, `_task/`, `_progress/`, and `_summary/` locations as active architecture context. Because `docs/ARCHITECTURE.md` is a generic target-project template, it should be updated or clearly relocated under `templates/` so readers do not mistake it for the current kit architecture.

### Remaining gaps and risks

- Official operating-system and shell support is not stated as a compatibility matrix.
- There is no versioned upgrade/migration mechanism for repositories that already installed an older kit.
- `--force` can replace Project Brain seeds and other existing workflow files; this is documented but requires stronger backup and diff guidance.
- A long README increases the chance of path and behavior drift across duplicated explanations.
- The repository needs automated internal-link, path-consistency, installer-fixture, and legacy-reference checks.
- Runtime-specific verification across Codex, Claude Code, Cursor, and other agents is not summarized in one evidence table.
- Template version provenance is not recorded in installed repositories.

## Recommended controls

1. Add a version file and write the installed kit version into target repositories.
2. Add an upgrade command that previews changes and preserves project memory.
3. Add CI tests using temporary target repositories for default and force installation.
4. Validate every documented path against the committed template tree.
5. Consolidate legacy-path documentation into one migration section.
6. Add a supported-platform and verified-agent matrix.
7. Require a backup or explicit confirmation path before force-replacing Project Brain files.

## Audit conclusion

Codex Workflow Kit has extensive documentation, but it lacked a dedicated PRD and a technical specification for the kit itself. Those documents have been added. The main remaining issue is documentation duplication and legacy-path drift, especially the generic `docs/ARCHITECTURE.md` file appearing alongside current kit documentation without a sufficiently clear boundary.