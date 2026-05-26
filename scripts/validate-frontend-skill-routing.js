const fs = require("fs");

const REQUIRED_FILES = [
  "RUN_WORKFLOW.md",
  "AGENTS.md",
  "templates/RUN_WORKFLOW.md",
  "templates/AGENTS.md",
];

const SKILL_PATH = ".skills/design-taste-frontend/SKILL.md";
const APPLIED_LINE = "Applied skill: design-taste-frontend";

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

function normalize(value) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function shouldApplyTasteSkill(workItem) {
  const text = normalize(workItem);
  return frontendTriggers.some((trigger) => text.includes(trigger));
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
}

for (const file of REQUIRED_FILES) {
  assertDocContainsRoutingContract(file);
}

runExamples();

console.log("frontend skill routing validation passed");
