#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  scripts/install.sh <target-repo> [--force]

Copies the Codex workflow kit templates into a target repository.

Options:
  --force   Overwrite existing workflow files.
  --help    Show this help message.

Examples:
  scripts/install.sh ../my-app
  scripts/install.sh /path/to/my-app --force
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
echo "1. Edit AGENTS.md for your stack, deployment targets, and project rules."
echo "2. Fill in docs/SPEC.md with the product specification."
echo "3. Fill in docs/ARCHITECTURE.md with the intended structure and technical decisions."
echo "4. Break the first feature into one-task-at-a-time entries in docs/TASKS.md."
echo "5. Start your agent with:"
echo
echo "   Read AGENTS.md, docs/SPEC.md, docs/ARCHITECTURE.md, and docs/TASKS.md. Implement exactly one task: <TASK-ID>."
echo
echo "Existing files were skipped unless --force was used."
