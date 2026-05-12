# Task Memory

Store vertical task plans in this folder.

Agents must create a saved task plan here before implementation. Use filenames that match the related spec when practical, for example:

```txt
_task/2026-05-10-add-dark-theme.md
```

Each task must include:

- Task ID.
- Status.
- Objective.
- Files likely affected.
- Checklist.
- Iteration plan for Iteration 1 Build, Iteration 2 Refine, and Iteration 3 Polish.
- Acceptance criteria.
- Acceptance result.
- Verification commands.
- Stop condition.
- Out-of-scope items.

Each iteration plan must include:

- Goal.
- Changes made.
- Verification command/result.
- Review findings.
- Acceptance status.
- Remaining issues.
- Next action.

A task cannot be `Done` until all three iterations are complete and every required acceptance criterion is checked `[x]`, unless a documented stop condition forces `Blocked` or `Needs Human Review`.

Tasks should be Ralph Wiggum-style: small, literal, sequential, and easy to verify.
