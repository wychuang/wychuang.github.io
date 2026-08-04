import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);
const html = await readFile(new URL("index.html", projectRoot), "utf8");
const css = await readFile(new URL("styles.css", projectRoot), "utf8");
const script = await readFile(new URL("app.js", projectRoot), "utf8");
const visibleText = html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ");

test("page has the expected identity and selected work", () => {
  for (const phrase of [
    "王逸尘",
    "浙江大学",
    "生物医学工程",
    "工业设计",
    "3.8 / 5.0",
    "清华大学 MAP 应用心理硕士",
    "Model Radar",
    "Lightloom / 灵光集",
    "AI 搜索回答质量评测",
    "PubMed + RAG 智能营养师"
  ]) {
    assert.ok(visibleText.includes(phrase), `missing visible phrase: ${phrase}`);
  }
});

test("navigation anchors point to unique sections", () => {
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, "id attributes must be unique");

  for (const anchor of ["about", "work", "experience", "contact"]) {
    assert.ok(ids.includes(anchor), `missing #${anchor}`);
    assert.match(html, new RegExp(`href="#${anchor}"`));
  }
});

test("external blank-target links protect the opener context", () => {
  const externalLinks = [...html.matchAll(/<a\s+[^>]*target="_blank"[^>]*>/g)].map((match) => match[0]);
  assert.ok(externalLinks.length >= 6);
  externalLinks.forEach((link) => assert.match(link, /rel="noreferrer"/));
});

test("accessibility and reduced-motion safeguards are present", () => {
  assert.match(html, /class="skip-link"/);
  assert.match(html, /aria-label="主导航"/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.match(html, /alt="王逸尘的点阵头像"/);
});

test("content remains visible without JavaScript and social metadata is complete", async () => {
  assert.match(html, /classList\.add\("js-enabled"\)/);
  assert.match(css, /\.reveal\s*{\s*opacity:\s*1;/);
  assert.match(css, /\.js-enabled \.reveal/);
  assert.match(html, /property="og:image"/);
  assert.match(html, /name="twitter:image"/);
  assert.ok((await stat(new URL("og-card.png", projectRoot))).size > 10_000);
  for (const asset of ["profile-dotmatrix.png", "model-radar-screen.png", "lightloom-agent-screen.png", "search-eval-loop.png"]) {
    assert.ok((await stat(new URL(`assets/${asset}`, projectRoot))).size > 10_000, `invalid asset: ${asset}`);
  }
});

test("portrait radar stays compact and motion-aware", () => {
  assert.match(html, /class="profile-radar-screen"/);
  assert.match(html, /class="profile-sweep"/);
  assert.match(html, /assets\/profile-dotmatrix\.png/);
  assert.match(css, /@keyframes radar-sweep/);
  assert.match(css, /\.profile-radar\s*\{[^}]*width:\s*224px/s);
  assert.doesNotMatch(html, /<canvas/);
});

test("public copy excludes production notes and review language", () => {
  assert.doesNotMatch(visibleText, /BOUNDARY|VISUAL NOTE|REAL PRODUCT SCREEN|REAL APP SCREEN|REAL WORKING ARTIFACT|FLOW RECONSTRUCTION|UI SNAPSHOT|CAPTURED/i);
});

test("site contains no unfinished placeholders or empty links", () => {
  assert.doesNotMatch(`${html}\n${css}\n${script}`, /\b(?:TODO|FIXME|PLACEHOLDER)\b/i);
  assert.doesNotMatch(html, /href="#"/);
  const contrastCliche = new RegExp(["不", "是", "\\s*", "而", "是"].join(""));
  assert.doesNotMatch(html, contrastCliche);
});
