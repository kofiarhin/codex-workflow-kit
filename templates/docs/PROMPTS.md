# Reusable Agent Prompts

Use these prompts with OpenAI Codex, Claude Code, Cursor, or similar coding agents. Replace placeholders before running.

## Universal Work Request

```txt
Read RUN_WORKFLOW.md and execute it using WORK_REQUEST.md.

Follow AGENTS.md.
Classify the request, inspect the repo, update docs, generate scoped tasks, execute one task at a time, verify, critique/fix, update ACTIVE_TASK.md and VERIFY.md, then provide a final summary and suggested commit message.
```

## Request Classification

```txt
Read WORK_REQUEST.md.

Classify the request as one primary type:
- feature
- bugfix
- boilerplate
- security
- refactor
- test
- docs
- ops
- research

Also identify:
1. Scope: small, medium, or large.
2. Risk: low, medium, or high.
3. Whether implementation is allowed now.
4. Whether clarification is required.
5. The safest first task.

Do not edit implementation files.
```

## Repo Intake

```txt
Inspect the repository for the request in WORK_REQUEST.md.

Find:
1. Stack and major frameworks.
2. Package manager and lockfiles.
3. Test, lint, build, and typecheck commands.
4. Folder and naming conventions.
5. Existing architecture boundaries.
6. Files likely affected by the request.
7. Risks, missing tooling, and unknowns.

Update docs/PROJECT_CONTEXT.md with durable findings only.
Do not implement the request yet.
```

## Task Generation

```txt
Using WORK_REQUEST.md, docs/PROJECT_CONTEXT.md, docs/SPEC.md, and docs/ARCHITECTURE.md, generate scoped tasks in docs/TASKS.md.

Each task must include:
- Task ID
- Status
- Request type
- Objective
- Files likely affected
- Checklist
- Acceptance criteria
- Verification commands
- Stop condition

Tasks must be sequential and reviewable.
Do not implement code.
```

## Single-Task Execution

```txt
Follow AGENTS.md and RUN_WORKFLOW.md.

Execute exactly one task:
<TASK-ID> - <TASK_TITLE>

Before editing:
- Copy task details into docs/ACTIVE_TASK.md.
- Mark status as In progress.
- Check git status.
- Inspect only relevant files.

After editing:
- Record files touched in docs/ACTIVE_TASK.md.
- Run or recommend verification commands.
- Update docs/VERIFY.md.
- Critique the result.
- Fix only in-scope defects.
- Mark docs/ACTIVE_TASK.md as Done, Blocked, or Needs review.
- Check git status again.

Do not implement any other task.
```

## Critique Loop

```txt
Review the active task result as a senior engineer.

Use docs/ACTIVE_TASK.md, docs/TASKS.md, and the current diff.

Prioritize:
1. Bugs or regressions.
2. Security issues.
3. Missing acceptance criteria.
4. Missing edge cases.
5. Test gaps.
6. Scope creep.
7. Unnecessary complexity.

Return findings with file and line references where possible.
Do not make changes unless explicitly asked.
```

## Verification Repair

```txt
Follow AGENTS.md.

The verification for the active task failed:
<COMMAND>

Failure summary:
<PASTE_FAILURE_SUMMARY>

Fix only the cause of this active-task failure.
Do not refactor unrelated code.

After the fix:
- Re-run the failing command if possible.
- Run directly related tests.
- Update docs/ACTIVE_TASK.md.
- Update docs/VERIFY.md.
- Summarize the root cause and fix.
```

## Final Summary

```txt
Produce the final workflow summary.

Include:
1. Original work request.
2. Request classification.
3. Tasks created or updated.
4. Tasks completed.
5. Files changed.
6. Verification commands and results.
7. Unresolved issues or blockers.
8. Recommended next step.
9. Suggested commit message.

Do not claim a commit was made unless one was actually created.
```

## Architecture Review

```txt
Review docs/SPEC.md, docs/PROJECT_CONTEXT.md, and docs/ARCHITECTURE.md for consistency.

Identify:
1. Architecture decisions that are clear.
2. Gaps or contradictions.
3. Over-engineered areas.
4. Missing production concerns.
5. Recommended updates to docs/DECISIONS.md.

Do not implement code.
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
