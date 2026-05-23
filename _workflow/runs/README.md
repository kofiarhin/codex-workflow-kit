# Workflow Runs

Each branch or worktree writes generated workflow artifacts to its own run directory:

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

Run id rules:

- Use `CODEX_WORKFLOW_RUN_ID` when it is set.
- Otherwise use the current branch from `git branch --show-current`.
- If the branch is empty, use the current worktree directory name.
- Sanitize `/` and `\` into `__`; replace other unsafe path characters with `-`.

Agents must only update their own run directory. For example, an agent in `dev` writes `_workflow/runs/dev/`; an agent in `redesign` writes `_workflow/runs/redesign/`.

Do not manually merge generated reports line by line. If `_workflow` conflicts during a merge, preserve each run directory and regenerate any aggregate/index summary after branches merge.
