# Workflow Run Index

This file is optional. Prefer updating it after branches merge.

If an agent updates this file during a workflow run, the update must be append-only and must not rewrite entries from other branches or worktrees.

Active workflow state belongs in:

```txt
_workflow/runs/<run-id>/
```

Do not store active specs, task plans, progress, reviews, verification notes, release notes, summaries, or handoff state directly in this shared index.
