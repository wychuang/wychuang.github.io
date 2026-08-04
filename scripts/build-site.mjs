import { copyFile, mkdir, rm } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const outputRoot = resolve(projectRoot, "dist");
const publicFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "favicon.svg",
  "og-card.png",
  "robots.txt",
  "sitemap.xml"
];

if (outputRoot !== join(projectRoot, "dist")) {
  throw new Error("Refusing to build outside the project dist directory.");
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const file of publicFiles) {
  await copyFile(join(projectRoot, file), join(outputRoot, basename(file)));
}

console.log(`Built ${publicFiles.length} public files in ${outputRoot}`);
