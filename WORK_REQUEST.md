# Work Request

This file is optional/manual compatibility input. It is no longer auto-managed during normal worktree-safe workflow runs.

Active request state belongs in `_workflow/runs/<run-id>/request.md`, where `<run-id>` is derived from the current branch/worktree or `CODEX_WORKFLOW_RUN_ID`.

Users do not need to edit this file manually. You may edit it when you want to stage a request for an older workflow or for a new run before the agent has created `_workflow/runs/<run-id>/request.md`.

The workflow will run intake unless skipped or resuming, sync the active request to `_workflow/runs/<run-id>/request.md`, generate a saved detailed spec in `_workflow/runs/<run-id>/spec.md`, pause for explicit user approval, create a vertical task plan in `_workflow/runs/<run-id>/tasks.md` only after approval, execute tasks according to the selected execution mode, update run-scoped progress and handoff, write a workflow review, create release notes, and write a final summary in the same run directory.

## Request

Update codex-workflow-kit to support long-lived git worktrees without workflow artifact merge conflicts.

Problem:
Users may have a bare repo with multiple worktrees like main, dev, redesign, feature branches, etc. Each Codex agent works in a separate worktree. The implementation files may be isolated, but workflow-generated artifacts conflict during merge because each worktree writes the same report/state files.

Goal:
Make workflow artifacts worktree/branch scoped so agents do not overwrite shared workflow reports.

Required behavior:

1. Do not write active workflow state to one shared `_workflow/` directory by default.
2. Add branch/worktree-scoped workflow directories using this structure:

   ```txt
   _workflow/runs/<branch-or-worktree-id>/
     spec.md
     tasks.md
     progress.md
     review.md
     verification.md
     summary.md
     handoff.md
     release-notes.md
   ```

3. Add a stable run id rule:
   - derive from current branch name by default
   - sanitize slashes into double underscores or hyphens
   - allow override with `CODEX_WORKFLOW_RUN_ID`
4. Shared files must be append-only or index-only:
   - `_workflow/index.md`
   - `_workflow/runs/README.md`
5. Agents must only update their own run directory:
   - an agent in dev writes only `_workflow/runs/dev/`
   - an agent in redesign writes only `_workflow/runs/redesign/`
   - no agent rewrites another run directory
6. Add merge-safe artifact rules:
   - generated reports must be namespaced by run id
   - final summary aggregation happens only after merge
   - no generated artifact should require multiple branches to edit the same file
   - shared index updates should be optional or append-only
7. Update workflow instructions so agents first detect:
   - current branch
   - current worktree path
   - run id
   - artifact root
8. Add commands/documentation for bare repo + worktree setup:

   ```bash
   git clone --bare <repo-url> <repo>.git
   cd <repo>.git
   git worktree add ../main main
   git worktree add ../dev dev
   git worktree add ../redesign redesign
   ```

9. Add conflict recovery guidance:
   - if `_workflow` files conflict, preserve each run directory
   - do not manually merge generated reports line-by-line
   - regenerate aggregate summary after branches are merged
10. Update `README.md` and `RUN_WORKFLOW.md` to explain the new model.

Final audit:
- confirm no active workflow artifact path is shared by all worktrees
- confirm run-scoped artifacts are documented
- confirm merge conflicts between dev/redesign workflow reports are avoided

## Execution Preference

`complete-workflow`

## Scope Boundaries

- Change workflow documentation, templates, and workflow artifact guidance needed for worktree-scoped artifacts.
- Do not change application implementation code.
- Do not commit changes.
