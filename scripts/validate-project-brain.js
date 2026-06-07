const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const PROJECT_TEMPLATE_ROOT = "templates/_workflow/project-brain";
const RUN_TEMPLATE_ROOT = "templates/_workflow/runs";
const PROJECT_FILES = [
  "project.json",
  "PROJECT_BRAIN.md",
  "history.json",
  "conflicts.json",
  "categories.json",
];
const RUN_FILES = ["brain.json", "activity.md", "checkpoints.md"];
const CONTRACT_DOCS = [
  "RUN_WORKFLOW.md",
  "templates/RUN_WORKFLOW.md",
  "AGENTS.md",
  "templates/AGENTS.md",
];
const MEMORY_COLLECTIONS = [
  "goals",
  "requirements",
  "constraints",
  "architectureDecisions",
  "technicalDecisions",
  "domainKnowledge",
  "openQuestions",
  "risks",
  "artifacts",
  "workflowHistory",
  "changeLog",
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8").replace(/\r\n/g, "\n");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

function assertFilesExist() {
  for (const file of PROJECT_FILES) {
    const relativePath = `${PROJECT_TEMPLATE_ROOT}/${file}`;
    assert(fs.existsSync(path.join(ROOT, relativePath)), `${relativePath} must exist`);
  }
  for (const file of RUN_FILES) {
    const relativePath = `${RUN_TEMPLATE_ROOT}/${file}`;
    assert(fs.existsSync(path.join(ROOT, relativePath)), `${relativePath} must exist`);
  }
}

function assertBrainShape(brain, label) {
  assert(brain.version === "1.0.0", `${label} must use schema version 1.0.0`);
  assert(typeof brain.updatedAt === "string", `${label}.updatedAt must be a string`);
  assert(brain.workflow && typeof brain.workflow === "object", `${label}.workflow must exist`);
  for (const key of ["currentStage", "nextStage", "status"]) {
    assert(typeof brain.workflow[key] === "string", `${label}.workflow.${key} must be a string`);
  }
  assert(Array.isArray(brain.workflow.completedStages), `${label}.workflow.completedStages must be an array`);
  for (const key of MEMORY_COLLECTIONS) {
    assert(Array.isArray(brain[key]), `${label}.${key} must be an array`);
  }
  assert(brain.custom && !Array.isArray(brain.custom), `${label}.custom must be an object`);
}

function assertTemplateSchemas() {
  assertBrainShape(readJson(`${PROJECT_TEMPLATE_ROOT}/project.json`), "project.json");
  assertBrainShape(readJson(`${RUN_TEMPLATE_ROOT}/brain.json`), "brain.json");

  const history = readJson(`${PROJECT_TEMPLATE_ROOT}/history.json`);
  assert(history.version === "1.0.0" && Array.isArray(history.events), "history.json must contain versioned events");

  const conflicts = readJson(`${PROJECT_TEMPLATE_ROOT}/conflicts.json`);
  assert(conflicts.version === "1.0.0" && Array.isArray(conflicts.conflicts), "conflicts.json must contain versioned conflicts");

  const categories = readJson(`${PROJECT_TEMPLATE_ROOT}/categories.json`);
  assert(categories.version === "1.0.0", "categories.json must be versioned");
  assert(Array.isArray(categories.builtIn), "categories.json must list built-in categories");
  assert(categories.customNamespace === "custom", "custom categories must use the custom namespace");
  assert(categories.custom && typeof categories.custom === "object", "categories.json must govern custom categories");
  const item = categories.memoryItemSchema;
  for (const key of ["id", "text", "status", "confidence", "source", "createdAt", "updatedAt", "supersedes", "history"]) {
    assert(Object.prototype.hasOwnProperty.call(item, key), `memory item schema must include ${key}`);
  }
  assert(Array.isArray(item.supersedes) && Array.isArray(item.history), "memory item history fields must be arrays");
  assert(["user", "assistant", "workflow"].every((source) => categories.allowedConversationSources.includes(source)), "all conversation sources must be governed");

  const conflictSchema = conflicts.conflictRecordSchema;
  for (const key of ["id", "status", "category", "existingItemIds", "incomingItemId", "detectedAt", "resolution", "resolvedAt"]) {
    assert(conflictSchema && Object.prototype.hasOwnProperty.call(conflictSchema, key), `conflict record schema must include ${key}`);
  }
}

function assertInstallerMappings() {
  const installer = read("scripts/install.sh");
  assert(
    installer.includes("Project Brain memory is preserved by default"),
    "installer must explain Project Brain preservation"
  );
  for (const file of PROJECT_FILES) {
    assert(
      installer.includes(`_workflow/project-brain/${file}`),
      `installer must map _workflow/project-brain/${file}`
    );
  }
  for (const file of RUN_FILES) {
    assert(
      installer.includes(`_workflow/templates/run/${file}`),
      `installer must map _workflow/templates/run/${file}`
    );
  }
}

function assertWorkflowContracts() {
  const requiredPaths = [
    "_workflow/project-brain/project.json",
    "_workflow/project-brain/categories.json",
    "_workflow/project-brain/conflicts.json",
    "<artifact-root>/brain.json",
    "<artifact-root>/activity.md",
    "<artifact-root>/checkpoints.md",
  ];
  const milestones = [
    "intake complete",
    "spec saved",
    "task plan saved",
    "each task done",
    "workflow complete",
    "conflict resolved",
  ];
  for (const file of CONTRACT_DOCS) {
    const content = read(file);
    const normalized = content.toLowerCase();
    for (const requiredPath of requiredPaths) {
      assert(content.includes(requiredPath), `${file} must reference ${requiredPath}`);
    }
    assert(normalized.includes("json is the source of truth"), `${file} must make JSON authoritative`);
    assert(normalized.includes("never destructively overwrite"), `${file} must prohibit destructive memory writes`);
    assert(normalized.includes("project brain") && normalized.includes("progress.md") && normalized.includes("completed task"), `${file} must define authority reconciliation`);
    assert(normalized.includes("goals") && normalized.includes("constraints") && normalized.includes("architecture decisions") && normalized.includes("technical decisions"), `${file} must define always-injected memory`);
    assert(normalized.includes("entire chat history") && normalized.includes("stale run data") && normalized.includes("low-confidence assumptions"), `${file} must define excluded context`);
    assert(content.includes("Activity\n- Stage: <from> → <to>"), `${file} must include the compact Activity block`);
    for (const milestone of milestones) {
      assert(normalized.includes(milestone), `${file} must require checkpoint milestone: ${milestone}`);
    }
    assert(normalized.includes("after intake") && normalized.includes("after spec") && normalized.includes("after task planning") && normalized.includes("after task completion") && normalized.includes("after review") && normalized.includes("after release notes") && normalized.includes("after summary"), `${file} must define every memory extraction boundary`);
    assert(normalized.includes("custom namespace") || normalized.includes("custom.<category>"), `${file} must govern custom categories`);
  }
}

function assertDocumentation() {
  const readme = read("README.md");
  const normalized = readme.toLowerCase();
  assert(readme.includes("## Project Brain"), "README must include a Project Brain section");
  assert(normalized.includes("stay in") && normalized.includes("cli chat"), "README must state that users stay in CLI chat");
  assert(normalized.includes("backend memory") && normalized.includes("not a separate ui"), "README must explain backend memory, not a UI");
  assert(readme.includes("Activity\n- Stage: <from> → <to>"), "README must include the Activity example");
  for (const file of PROJECT_FILES) {
    assert(readme.includes(`_workflow/project-brain/${file}`), `README must list installed ${file}`);
  }
  for (const file of RUN_FILES) {
    assert(readme.includes(`_workflow/runs/<run-id>/${file}`), `README must list run-created ${file}`);
  }
  assert(normalized.includes("preserved by default") && readme.includes("--force"), "README must document memory preservation and force replacement");

  for (const file of ["templates/_workflow/index.md", "templates/_workflow/runs/README.md"]) {
    const content = read(file);
    assert(content.includes("Project Brain"), `${file} must describe Project Brain`);
    assert(content.includes("brain.json") && content.includes("activity.md") && content.includes("checkpoints.md"), `${file} must list run brain files`);
  }
}

function assertInstallerBehavior() {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "project-brain-install-"));
  const installer = path.join(ROOT, "scripts/install.sh");
  const runInstall = (args = []) => {
    const result = spawnSync("bash", [installer, target, ...args], { encoding: "utf8" });
    assert(result.status === 0, `installer failed: ${result.stderr || result.stdout}`);
    return result.stdout;
  };

  try {
    const initialOutput = runInstall();
    assert(initialOutput.includes("Project Brain files:"), "installer output must identify Project Brain files");
    for (const file of PROJECT_FILES) {
      assert(fs.existsSync(path.join(target, "_workflow/project-brain", file)), `installed project brain file missing: ${file}`);
    }
    for (const file of RUN_FILES) {
      assert(fs.existsSync(path.join(target, "_workflow/templates/run", file)), `installed run seed missing: ${file}`);
    }

    const projectPath = path.join(target, "_workflow/project-brain/project.json");
    fs.writeFileSync(projectPath, '{"preserve":"user-memory"}\n');
    const defaultOutput = runInstall();
    assert(defaultOutput.includes("skip  _workflow/project-brain/project.json"), "default reinstall must skip existing project memory");
    assert(readInstalled(projectPath).includes("user-memory"), "default reinstall must preserve existing project memory");

    runInstall(["--force"]);
    assert(readInstalled(projectPath).includes('"version": "1.0.0"'), "--force must replace project memory from the template");
  } finally {
    fs.rmSync(target, { recursive: true, force: true });
  }
}

function readInstalled(file) {
  return fs.readFileSync(file, "utf8");
}

function run() {
  assertFilesExist();
  assertTemplateSchemas();
  assertInstallerMappings();
  assertWorkflowContracts();
  assertDocumentation();
  assertInstallerBehavior();
  console.log("project brain validation passed");
}

if (require.main === module) run();

module.exports = { run };
