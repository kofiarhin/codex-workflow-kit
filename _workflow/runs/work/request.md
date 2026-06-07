# Active Request (run: work)

## Fallow Quality Request

Implement Fallow as a reusable workflow quality layer. Fetch the official Fallow skill files, store them under `layers/fallow-quality/`, read them, extract their rules, wire those rules into the workflow order and health checks, create `.workflow/fallow-audit.md`, and preserve existing workflow behavior.
---

## Project Brain Request

## Source
Direct user prompt received 2026-06-06.

## Execution Mode
`complete-workflow`

## Intake
Questions explicitly skipped by the user. Assumptions are recorded in `_workflow/runs/work/spec.md`.

## Request
Implement Project Brain memory into `codex-workflow-kit` without creating a separate UI. Keep the user in Codex/Claude/Cursor-style CLI chat while workflow files automatically maintain visible, structured memory.

Project Brain must provide global project memory and run-scoped memory as the source of truth for project knowledge, workflow state, decisions, artifacts, history, open questions, activity, and checkpoints. JSON is authoritative; Markdown files are human-readable projections or append-only activity/checkpoint views. Updates must be automatic, non-destructive, history-preserving, conflict-aware, and visible through compact Activity blocks in chat.

Required repository changes:

- Update `RUN_WORKFLOW.md` and `templates/RUN_WORKFLOW.md`.
- Update `AGENTS.md` and `templates/AGENTS.md`.
- Update `README.md`.
- Update `scripts/install.sh`.
- Update `docs/PROJECT_CONTEXT.md` and `templates/docs/PROJECT_CONTEXT.md` only if durable context needs it.
- Create these templates:
  - `templates/_workflow/project-brain/project.json`
  - `templates/_workflow/project-brain/PROJECT_BRAIN.md`
  - `templates/_workflow/project-brain/history.json`
  - `templates/_workflow/project-brain/conflicts.json`
  - `templates/_workflow/project-brain/categories.json`
  - `templates/_workflow/runs/brain.json`
  - `templates/_workflow/runs/activity.md`
  - `templates/_workflow/runs/checkpoints.md`
- Install project-level templates into `_workflow/project-brain/`.
- Ensure run-scoped `brain.json`, `activity.md`, and `checkpoints.md` are created automatically under `_workflow/runs/<run-id>/`.
- Preserve existing installed memory unless `--force` is supplied.
- Add or update lightweight validation coverage where useful.

Required Project Brain schema:

```json
{
  "version": "1.0.0",
  "updatedAt": "",
  "workflow": {
    "currentStage": "",
    "completedStages": [],
    "nextStage": "",
    "status": ""
  },
  "goals": [],
  "requirements": [],
  "constraints": [],
  "architectureDecisions": [],
  "technicalDecisions": [],
  "domainKnowledge": [],
  "openQuestions": [],
  "risks": [],
  "artifacts": [],
  "workflowHistory": [],
  "custom": {},
  "changeLog": []
}
```

Each memory item must support identity, text, lifecycle status (`active`, `superseded`, `archived`, or `conflict`), confidence, source metadata, timestamps, supersession links, and history.

Conflict handling must retain old and new memory, write/update `conflicts.json`, promote explicit high-confidence user wording safely, mark replaced memory as superseded, and record resolutions in activity and change logs.

After meaningful changes, chat output must use this compact block:

```text
Activity
- Stage: <from> → <to>
- Memory: <added/updated/conflict/resolved>
- Artifact: <created/updated path>
- Checkpoint: <saved/not saved>
- Next: <next action>
```

Append checkpoints after intake, spec save, task-plan save, each completed task, workflow completion, and conflict resolution. Each checkpoint includes timestamp, stage, memory summary, changed artifacts, open questions, and next action.

Before planning or implementation, read project memory, category governance, conflicts, run memory, handoff, and progress. Inject only relevant active memory: always goals, constraints, architecture decisions, technical decisions, and current workflow state; conditionally related requirements, artifacts, domain knowledge, and prior decisions. Do not inject full chat history, stale run data, superseded decisions except for conflict context, or low-confidence assumptions unless labeled.

Project Brain is authoritative when workflow artifacts disagree, except that completed-task execution evidence in `progress.md` remains authoritative. Existing workflow compatibility must remain intact.

Verification requested:

- `npm test`
- `npm run test:workflow-routing`
- Installer/template validation, including a lightweight test that required Project Brain files exist after installation if appropriate.

Acceptance requires CLI-only operation, visible compact activity, project and run memory, JSON source of truth, Markdown projection, automatic non-destructive updates, conflict tracking, checkpoints, installer support, clear README documentation, and preserved existing workflow behavior.
