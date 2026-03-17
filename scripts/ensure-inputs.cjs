const { existsSync, rmSync, statSync } = require("fs");
const { execSync } = require("child_process");
const path = require("path");

const inputs = [
  "index.html",
  "resume.html",
  "contact.html",
  "cookies.html",
  "privacy.html",
  "terms.html",
];

for (const input of inputs) {
  const fullPath = path.resolve(process.cwd(), input);

  if (!existsSync(fullPath)) {
    try {
      execSync(`git checkout -- ${input}`, { stdio: "inherit" });
    } catch (error) {
      console.warn(`[ensure-inputs] Missing ${input} and failed to restore from git.`);
    }
    continue;
  }

  let stat;
  try {
    stat = statSync(fullPath);
  } catch (error) {
    console.warn(`[ensure-inputs] Failed to stat ${input}.`);
    continue;
  }

  if (stat.isDirectory()) {
    try {
      console.warn(`[ensure-inputs] ${input} is a directory. Replacing with file from git.`);
      rmSync(fullPath, { recursive: true, force: true });
      execSync(`git checkout -- ${input}`, { stdio: "inherit" });
    } catch (error) {
      console.warn(`[ensure-inputs] Failed to restore ${input} after removing directory.`);
    }
  }
}
