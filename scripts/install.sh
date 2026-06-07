#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  bash scripts/install.sh <target-repo> [--force]

Copies the Codex workflow kit templates into a target repository.

Options:
  --force   Overwrite existing workflow files.
  --help    Show this help message.

Examples:
  bash scripts/install.sh ../my-app
  bash scripts/install.sh /path/to/my-app --force
EOF
}

TARGET_DIR=""
FORCE="false"

for arg in "$@"; do
  case "$arg" in
    --force)
      FORCE="true"
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      if [ -z "$TARGET_DIR" ]; then
        TARGET_DIR="$arg"
      else
        echo "Unexpected argument: $arg" >&2
        usage
        exit 1
      fi
      ;;
  esac
done

if [ -z "$TARGET_DIR" ]; then
  echo "Error: target repository path is required." >&2
  usage
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
KIT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
TEMPLATE_ROOT="$KIT_ROOT/templates"
TARGET_ROOT="$(cd "$TARGET_DIR" 2>/dev/null && pwd || true)"

if [ -z "$TARGET_ROOT" ]; then
  echo "Error: target directory does not exist: $TARGET_DIR" >&2
  exit 1
fi

if [ ! -d "$TEMPLATE_ROOT" ]; then
  echo "Error: template directory not found: $TEMPLATE_ROOT" >&2
  exit 1
fi

copy_file() {
  local source_file="$1"
  local relative_path="$2"
  local target_file="$TARGET_ROOT/$relative_path"
  local target_parent

  target_parent="$(dirname "$target_file")"
  mkdir -p "$target_parent"

  if [ -e "$target_file" ] && [ "$FORCE" != "true" ]; then
    echo "skip  $relative_path (already exists)"
    return
  fi

  cp "$source_file" "$target_file"

  if [ -e "$target_file" ] && [ "$FORCE" = "true" ]; then
    echo "copy  $relative_path"
  else
    echo "copy  $relative_path"
  fi
}

echo "Installing Codex workflow kit into: $TARGET_ROOT"
echo

copy_file "$TEMPLATE_ROOT/AGENTS.md" "AGENTS.md"
copy_file "$TEMPLATE_ROOT/WORK_REQUEST.md" "WORK_REQUEST.md"
copy_file "$TEMPLATE_ROOT/RUN_WORKFLOW.md" "RUN_WORKFLOW.md"
copy_file "$TEMPLATE_ROOT/.agents/skills/grill-me/SKILL.md" ".agents/skills/grill-me/SKILL.md"
copy_file "$TEMPLATE_ROOT/.agents/skills/design-taste-frontend/SKILL.md" ".agents/skills/design-taste-frontend/SKILL.md"
copy_file "$TEMPLATE_ROOT/layers/fallow-quality/SKILL.md" "layers/fallow-quality/SKILL.md"
copy_file "$TEMPLATE_ROOT/layers/fallow-quality/references/cli-reference.md" "layers/fallow-quality/references/cli-reference.md"
copy_file "$TEMPLATE_ROOT/layers/fallow-quality/references/gotchas.md" "layers/fallow-quality/references/gotchas.md"
copy_file "$TEMPLATE_ROOT/layers/fallow-quality/references/patterns.md" "layers/fallow-quality/references/patterns.md"
copy_file "$TEMPLATE_ROOT/_workflow/index.md" "_workflow/index.md"
copy_file "$TEMPLATE_ROOT/_workflow/runs/README.md" "_workflow/runs/README.md"
copy_file "$TEMPLATE_ROOT/_workflow/project-brain/project.json" "_workflow/project-brain/project.json"
copy_file "$TEMPLATE_ROOT/_workflow/project-brain/PROJECT_BRAIN.md" "_workflow/project-brain/PROJECT_BRAIN.md"
copy_file "$TEMPLATE_ROOT/_workflow/project-brain/history.json" "_workflow/project-brain/history.json"
copy_file "$TEMPLATE_ROOT/_workflow/project-brain/conflicts.json" "_workflow/project-brain/conflicts.json"
copy_file "$TEMPLATE_ROOT/_workflow/project-brain/categories.json" "_workflow/project-brain/categories.json"
copy_file "$TEMPLATE_ROOT/_workflow/runs/brain.json" "_workflow/templates/run/brain.json"
copy_file "$TEMPLATE_ROOT/_workflow/runs/activity.md" "_workflow/templates/run/activity.md"
copy_file "$TEMPLATE_ROOT/_workflow/runs/checkpoints.md" "_workflow/templates/run/checkpoints.md"
copy_file "$TEMPLATE_ROOT/_workflow/runs/parallel/claims.md" "_workflow/runs/parallel/claims.md"
copy_file "$TEMPLATE_ROOT/_workflow/runs/parallel/locks.md" "_workflow/runs/parallel/locks.md"
copy_file "$TEMPLATE_ROOT/_workflow/runs/parallel/agent-status.md" "_workflow/runs/parallel/agent-status.md"
copy_file "$TEMPLATE_ROOT/_decisions/README.md" "_decisions/README.md"
copy_file "$TEMPLATE_ROOT/docs/PROJECT_CONTEXT.md" "docs/PROJECT_CONTEXT.md"
copy_file "$TEMPLATE_ROOT/docs/ACTIVE_TASK.md" "docs/ACTIVE_TASK.md"
copy_file "$TEMPLATE_ROOT/docs/SPEC.md" "docs/SPEC.md"
copy_file "$TEMPLATE_ROOT/docs/TASKS.md" "docs/TASKS.md"
copy_file "$TEMPLATE_ROOT/docs/VERIFY.md" "docs/VERIFY.md"
copy_file "$TEMPLATE_ROOT/docs/PROMPTS.md" "docs/PROMPTS.md"
copy_file "$TEMPLATE_ROOT/docs/ARCHITECTURE.md" "docs/ARCHITECTURE.md"
copy_file "$TEMPLATE_ROOT/docs/DECISIONS.md" "docs/DECISIONS.md"

echo
echo "Setup complete."
echo
echo "Next steps:"
echo "1. Edit AGENTS.md and docs/PROJECT_CONTEXT.md for your stack, commands, and project rules."
echo "2. Write one plain-English request directly in your agent."
echo "   Root WORK_REQUEST.md is compatibility/manual only; active request state is _workflow/runs/<run-id>/request.md."
echo "3. Start your agent with:"
echo
echo "   Read RUN_WORKFLOW.md and execute it using my direct request."
echo
echo "4. Review _workflow/runs/<run-id>/, _workflow/index.md, _decisions/, and the final response before committing."
echo
echo "Project Brain files:"
echo "   _workflow/project-brain/"
echo "Run-memory seeds:"
echo "   _workflow/templates/run/"
echo
echo "Workflow intake now runs through the grill-me skill installed at:"
echo "   .agents/skills/grill-me/SKILL.md"
echo "   .agents/skills/design-taste-frontend/SKILL.md"
echo "Fallow Quality layer is installed at:"
echo "   layers/fallow-quality/SKILL.md"
echo "   layers/fallow-quality/references/"
echo
echo "Existing files were skipped unless --force was used."
echo "Project Brain memory is preserved by default; use --force only when replacement is intentional."
