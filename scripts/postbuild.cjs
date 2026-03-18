const { mkdirSync, copyFileSync, existsSync, cpSync } = require("fs");
const { resolve } = require("path");

const dist = resolve(process.cwd(), "dist");
const copies = [
  { from: "resume.html", to: "resume/index.html" },
  { from: "contact.html", to: "contact/index.html" },
  { from: "cookies.html", to: "cookies/index.html" },
  { from: "privacy.html", to: "privacy/index.html" },
  { from: "terms.html", to: "terms/index.html" },
];

for (const { from, to } of copies) {
  const source = resolve(dist, from);
  const target = resolve(dist, to);
  const targetDir = resolve(dist, to.split("/").slice(0, -1).join("/"));

  if (!existsSync(source)) {
    console.warn(`[postbuild] Missing ${from} in dist; skipping.`);
    continue;
  }

  mkdirSync(targetDir, { recursive: true });
  copyFileSync(source, target);
}

const imagesSource = resolve(dist, "images");
const imagesTarget = resolve(dist, "public/images");

if (existsSync(imagesSource)) {
  mkdirSync(resolve(dist, "public"), { recursive: true });
  cpSync(imagesSource, imagesTarget, { recursive: true });
}
