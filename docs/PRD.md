# Codex Workflow Kit Product Requirements

## Status

This document describes the workflow product implemented and documented in this repository. It is derived from the root README, installer behavior, committed templates, and current run-artifact model.

## Product summary

Codex Workflow Kit is a reusable, stack-neutral engineering workflow system for coding agents such as OpenAI Codex, Claude Code, Cursor, and similar tools. It installs instruction files, skills, templates, run artifacts, quality gates, and durable project memory into a target repository.

## Problem

Coding agents can begin implementation before requirements are understood, overwrite shared workflow state, lose decisions between sessions, report unverified completion, or produce changes that are difficult to review and resume. Teams need a portable workflow that makes discovery, approval, execution, verification, and handoff explicit.

## Users

- A product owner or developer making plain-English requests.
- A coding agent executing the workflow.
- Reviewers validating scope, evidence, and quality.
- Teams using branches or worktrees for parallel isolated development.

## Goals

- Turn a plain-English request into shared understanding before implementation.
- Require explicit approval of a detailed specification.
- Generate vertical tasks only after approval.
- Enforce test-first implementation and multi-pass quality review.
- Store run state in branch/worktree-isolated directories.
- Maintain durable project memory without relying on chat history.
- Support safe resumption after interruption.
- Install without overwriting existing project files unless explicitly forced.

## Core workflow

1. Detect repository, branch, worktree, run ID, and artifact root.
2. Initialize or load Project Brain.
3. Run focused one-question-at-a-time intake unless skipped or resuming.
4. Produce a Shared Understanding Handoff.
5. Save a detailed run-scoped specification.
6. Stop for explicit approval.
7. Generate run-scoped vertical tasks.
8. Execute tasks through Build, Refine, and Polish, using Red, Green, Refactor for code changes.
9. Record progress, acceptance results, review, verification, quality audit, release notes, summary, and handoff.
10. Run a final health check.

## Functional requirements

### Installation

- The installer accepts a target repository path.
- Existing files are skipped by default.
- `--force` allows intentional replacement.
- Required parent directories are created.
- Missing target or template directories fail clearly.
- Project Brain memory is preserved by default.

### Discovery and approval

- Intake asks one focused question at a time when repository evidence cannot answer it.
- A complete Shared Understanding Handoff precedes the execution specification.
- Implementation does not begin until the user explicitly approves the specification.

### Run isolation

- Active workflow artifacts live under `_workflow/runs/<run-id>/`.
- Run IDs derive from an explicit environment variable, branch, or worktree directory.
- Unsafe path characters are sanitized.
- Separate worktrees do not edit the same active run files.

### Project Brain

- Structured JSON is the durable source of truth.
- Human-readable Markdown is a projection, not the primary record.
- Corrections preserve provenance and superseded state.
- Conflicts remain explicit until resolved.
- Relevant memory is loaded selectively rather than injecting all history.

### Execution and quality

- Each task has acceptance criteria and verification evidence.
- Code-changing iterations use test-first Red, Green, Refactor.
- Dirty worktree state is inspected before implementation.
- A final diff audit occurs before review and summary.
- Fallow Quality runs after standard verification and review.
- Completion artifacts record risks, limitations, and remaining work.

## Non-goals

- Generating an application or choosing a framework automatically.
- Replacing repository-specific architecture or product decisions.
- Automatically approving specifications or releases.
- Hiding failed verification.
- Using one shared mutable run file across parallel worktrees.
- Overwriting existing project memory without explicit force.

## Quality requirements

- Stack-neutral templates.
- Deterministic artifact locations.
- Safe, idempotent default installation behavior.
- Resumable run state.
- Clear provenance and conflict handling.
- Compatibility with long-lived branches and worktrees.
- No claim of completion without review and verification artifacts.

## Success criteria

The kit is successful when a new repository can install the workflow, turn a request into an approved specification, execute an isolated task plan, preserve project and run memory, verify changes, and produce a complete reviewable handoff without requiring hidden chat state.

## Open product questions

- Which operating systems and shells are officially supported by the installer?
- Which coding-agent runtimes have been verified end to end?
- Which legacy artifact paths remain supported, and for how long?
- Should installation include an automated repository health check?
- How should template versions and upgrade migrations be managed?
