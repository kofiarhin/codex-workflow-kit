# Reusable Agent Prompts

Use these prompts with OpenAI Codex, Claude Code, Cursor, or similar coding agents. Replace placeholders before running.

## Project Intake

```txt
Read AGENTS.md, docs/SPEC.md, docs/ARCHITECTURE.md, and docs/TASKS.md.

Summarize:
1. What this project is.
2. The current architecture.
3. The top implementation risks.
4. The next three task candidates.

Do not edit files yet.
```

## Architecture Review

```txt
Review docs/SPEC.md and docs/ARCHITECTURE.md for consistency.

Identify:
1. Architecture decisions that are clear.
2. Gaps or contradictions.
3. Over-engineered areas.
4. Missing production concerns.
5. Recommended updates to docs/DECISIONS.md.

Do not implement code.
```

## Feature Planning

```txt
Using docs/SPEC.md and docs/ARCHITECTURE.md, break this feature into small one-task-at-a-time implementation tasks:

Feature: <FEATURE_DESCRIPTION>

For each task, include:
- Task ID
- Objective
- Likely files
- Acceptance criteria
- Verification commands
- Stop conditions

Update docs/TASKS.md only.
```

## Implement One Task

```txt
Follow AGENTS.md.

Implement exactly one task:
<TASK-ID> - <TASK_TITLE>

Before editing:
- Read the task acceptance criteria.
- Check git status.
- Inspect only relevant files.

After editing:
- Run or recommend verification commands.
- Update docs/VERIFY.md.
- Check git status again.
- Summarize changed files, validation results, and risks.

Do not implement any other task.
```

## Critique / Review Loop

```txt
Review the changes for <TASK-ID> as a senior engineer.

Prioritize:
1. Bugs or regressions.
2. Security issues.
3. Missing edge cases.
4. Test gaps.
5. Unnecessary complexity.

Return findings with file and line references where possible.
Do not make changes unless explicitly asked.
```

## Fix Failed Tests

```txt
Follow AGENTS.md.

The following command failed:
<COMMAND>

Failure summary:
<PASTE_FAILURE_SUMMARY>

Fix only the cause of this failure. Do not refactor unrelated code.

After the fix:
- Re-run the failing command if possible.
- Run any directly related tests.
- Update docs/VERIFY.md.
- Summarize the root cause and fix.
```

## Reduce Complexity

```txt
Review the implementation of <FEATURE_OR_TASK>.

Goal:
Reduce complexity while preserving behavior.

Constraints:
- Do not change public APIs.
- Do not change user-visible behavior.
- Do not introduce dependencies.
- Keep changes small and reviewable.

First propose the simplification plan.
Wait for approval before editing.
```

## Prepare Commit

```txt
Prepare a commit summary for the completed task <TASK-ID>.

Include:
1. Suggested commit message.
2. Files changed.
3. Behavior changed.
4. Verification run.
5. Known risks or follow-up tasks.

Do not run git commit unless explicitly instructed.
```

## Generate Changelog

```txt
Generate a changelog entry for the changes since <BASE_REF>.

Group by:
- Added
- Changed
- Fixed
- Removed
- Security

Keep it concise and user-facing.
```

## Generate Demo Summary

```txt
Create a short demo summary for <FEATURE_OR_RELEASE>.

Include:
1. What was built.
2. The main user workflow.
3. What to show in a demo.
4. Known limitations.
5. Suggested next improvement.
```

## Generate Social Content Recap

```txt
Create a concise social post recap for this engineering update:

Update:
<SUMMARY>

Audience:
<AUDIENCE>

Tone:
Practical, specific, and non-hype.

Include:
- Problem
- What changed
- Why it matters
- One concrete technical detail
```
