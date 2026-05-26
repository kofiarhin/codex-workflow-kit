const fs = require("fs");

const REQUIRED_FILES = [
  "RUN_WORKFLOW.md",
  "AGENTS.md",
  "templates/RUN_WORKFLOW.md",
  "templates/AGENTS.md",
];

const SKILL_PATH = ".skills/design-taste-frontend/SKILL.md";
const APPLIED_LINE = "Applied skill: design-taste-frontend";
const POLISH_ARTIFACT_ROOT = ".workflow/artifacts/polish-ui/";
const POLISH_ARTIFACT_FILES = [
  "spec.md",
  "task-plan.md",
  "progress.md",
  "audit.md",
  "before/.gitkeep",
  "after/.gitkeep",
  "review.md",
  "verification.md",
  "release-notes.md",
  "summary.md",
  "handoff.md",
];

const frontendTriggers = [
  "frontend ui code generation",
  "jsx",
  "tsx",
  "css",
  "tailwind",
  "ui redesign",
  "ui polish",
];

const excludedOnly = [
  "backend-only",
  "api-only",
  "database-only",
  "auth-only",
  "test-only",
  "docs-only",
];

const polishTriggers = [
  "polish ui",
  "redesign ui",
  "improve this interface",
  "make this screen production-ready",
  "visual polish pass",
  "refine this frontend",
  "ui polish",
  "ui redesign",
  "interface polish",
  "screen production-ready",
];

function normalize(value) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function shouldApplyTasteSkill(workItem) {
  const text = normalize(workItem);
  return frontendTriggers.some((trigger) => text.includes(trigger));
}

function classifyWorkflowPath(prompt) {
  const text = normalize(prompt);
  if (excludedOnly.some((excluded) => text.includes(excluded))) {
    return "default";
  }
  if (polishTriggers.some((trigger) => text.includes(trigger))) {
    return "polish-ui";
  }
  return "default";
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertDocContainsRoutingContract(file) {
  const content = fs.readFileSync(file, "utf8");
  const normalized = normalize(content);

  assert(content.includes(SKILL_PATH), `${file} must reference ${SKILL_PATH}`);
  assert(content.includes(APPLIED_LINE), `${file} must require ${APPLIED_LINE}`);
  assert(
    normalized.includes("frontend ui code generation") &&
      normalized.includes("jsx/tsx markup") &&
      normalized.includes("css/tailwind styling") &&
      normalized.includes("ui redesign") &&
      normalized.includes("ui polish"),
    `${file} must list all frontend trigger categories`
  );
  assert(
    excludedOnly.every((excluded) => normalized.includes(excluded)),
    `${file} must list all excluded task categories`
  );
  assert(
    normalized.includes("mixed frontend/backend") &&
      normalized.includes("only to the frontend ui work"),
    `${file} must describe mixed frontend/backend routing`
  );
  assert(
    content.includes("polish-ui"),
    `${file} must document the polish-ui workflow path`
  );
  assert(
    content.includes(POLISH_ARTIFACT_ROOT),
    `${file} must document ${POLISH_ARTIFACT_ROOT}`
  );
  assert(
    normalized.includes("do not force screenshots"),
    `${file} must document the polish-ui screenshot fallback`
  );
}

function assertPolishArtifactsExist() {
  for (const file of POLISH_ARTIFACT_FILES) {
    const path = `${POLISH_ARTIFACT_ROOT}${file}`;
    assert(fs.existsSync(path), `${path} must exist`);
  }
  assert(fs.existsSync(SKILL_PATH), `${SKILL_PATH} must exist`);
  assert(
    !fs.existsSync(".skills/polish-ui") &&
      !fs.existsSync(".skills/polish-ui/SKILL.md"),
    "polish-ui must not create a new frontend taste skill"
  );
}

function runExamples() {
  const frontendUiTask =
    "Generate frontend UI code generation with JSX markup and Tailwind styling for a settings panel.";
  const backendOnlyTask =
    "Backend-only API-only database-only auth-only change: add an Express route and Mongoose model.";
  const mixedTask = [
    {
      label: "backend api work",
      text: "Backend-only API-only change: add Express controller validation.",
      expected: false,
    },
    {
      label: "frontend ui work",
      text: "Frontend UI code generation: create JSX markup with CSS/Tailwind styling.",
      expected: true,
    },
  ];

  assert(
    shouldApplyTasteSkill(frontendUiTask) === true,
    "frontend UI task should trigger design-taste-frontend"
  );
  assert(
    shouldApplyTasteSkill(backendOnlyTask) === false,
    "backend-only task should not trigger design-taste-frontend"
  );

  for (const item of mixedTask) {
    assert(
      shouldApplyTasteSkill(item.text) === item.expected,
      `mixed frontend/backend ${item.label} routing mismatch`
    );
  }

  const polishPrompts = [
    "polish ui",
    "redesign ui",
    "improve this interface",
    "make this screen production-ready",
    "visual polish pass",
    "refine this frontend",
  ];

  for (const prompt of polishPrompts) {
    assert(
      classifyWorkflowPath(prompt) === "polish-ui",
      `${prompt} should classify as polish-ui`
    );
  }

  assert(
    classifyWorkflowPath(backendOnlyTask) !== "polish-ui",
    "backend-only task should not classify as polish-ui"
  );
  assert(
    shouldApplyTasteSkill(frontendUiTask) === true &&
      classifyWorkflowPath(frontendUiTask) !== "polish-ui",
    "frontend generation should keep existing taste routing without being swallowed by polish-ui"
  );
}

function runValidation() {
  for (const file of REQUIRED_FILES) {
    assertDocContainsRoutingContract(file);
  }

  assertPolishArtifactsExist();
  runExamples();
}

if (require.main === module) {
  runValidation();
  console.log("workflow routing validation passed");
}

module.exports = {
  classifyWorkflowPath,
  runValidation,
  shouldApplyTasteSkill,
};
