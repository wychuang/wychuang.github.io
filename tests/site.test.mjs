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
    "3.8/4.0",
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
  for (const asset of ["profile-dotmatrix.png", "zju-emblem.png", "tsinghua-emblem.jpg", "model-radar-screen.png", "lightloom-agent-screen.png", "search-eval-loop.png"]) {
    assert.ok((await stat(new URL(`assets/${asset}`, projectRoot))).size > 10_000, `invalid asset: ${asset}`);
  }
});

test("theme defaults to dark while language follows the browser and both support manual overrides", () => {
  assert.match(html, /id="theme-toggle"/);
  assert.match(html, /id="language-toggle"/);
  assert.match(html, /portfolio-theme/);
  assert.match(html, /portfolio-language/);
  assert.match(html, /navigator\.language/);
  assert.match(html, /const theme = storedTheme \|\| "dark"/);
  assert.doesNotMatch(`${html}\n${script}`, /prefers-color-scheme: light/);
  assert.match(css, /html\[data-theme="light"\]/);
  assert.match(css, /\.js-enabled \.header-toggle\s*{\s*display:\s*grid;/);
  assert.match(script, /const translations =/);
  assert.match(script, /applyTheme/);
  assert.match(script, /applyLanguage/);
  assert.match(script, /portfolio-theme/);
  assert.match(script, /portfolio-language/);
  assert.match(script, /aria-current/);
});

test("every translation hook has Chinese and English copy", () => {
  const keys = [
    ...html.matchAll(/data-i18n(?:-aria|-alt)?="([^"]+)"/g)
  ].map((match) => match[1]);

  for (const key of new Set(keys)) {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const occurrences = script.match(new RegExp(`"${escaped}"\\s*:`, "g")) ?? [];
    assert.ok(occurrences.length >= 2, `missing bilingual copy for: ${key}`);
  }
});

test("editorial portrait card stays compact, bold, and motion-aware", () => {
  assert.match(html, /class="portrait-stage"/);
  assert.match(html, /class="portrait-raster"/);
  assert.match(html, /class="portrait-scanner"/);
  assert.match(html, /class="portrait-registration"/);
  assert.match(html, /assets\/profile-dotmatrix\.png/);
  assert.match(css, /@keyframes portrait-scan/);
  assert.match(css, /@keyframes portrait-float/);
  assert.match(css, /@keyframes portrait-breathe/);
  assert.match(css, /@keyframes color-block-drift/);
  assert.match(css, /--block-acid:/);
  assert.match(css, /--block-hot:/);
  assert.match(css, /\.portrait-card\s*\{[^}]*width:\s*224px/s);
  assert.match(css, /\.gpa-fact\s*\{[^}]*background:\s*var\(--block-acid\)/s);
  assert.match(css, /prefers-reduced-motion:\s*reduce[^}]*\}/s);
  assert.doesNotMatch(`${html}\n${css}`, /profile-radar|radar-counter-sweep|mask-image:\s*conic-gradient/);
  assert.doesNotMatch(html, /<canvas/);
});

test("public copy excludes production notes and review language", () => {
  assert.doesNotMatch(visibleText, /BOUNDARY|VISUAL NOTE|REAL PRODUCT SCREEN|REAL APP SCREEN|REAL WORKING ARTIFACT|FLOW RECONSTRUCTION|UI SNAPSHOT|CAPTURED/i);
});

test("site contains no unfinished placeholders or empty links", () => {
  assert.doesNotMatch(`${html}\n${css}\n${script}`, /\b(?:TODO|FIXME|PLACEHOLDER)\b/i);
  assert.doesNotMatch(html, /href="#"/);
  const contrastCliche = new RegExp(["不", "是", "\\s*", "而", "是"].join(""));
  assert.doesNotMatch(`${html}\n${script}`, contrastCliche);
});
