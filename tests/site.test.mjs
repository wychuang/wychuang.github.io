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
    "我做 AI 产品，也研究人为什么愿意用它",
    "我怎么走到今天这一步",
    "Model Radar",
    "LIGHTLOOM · 灵光集",
    "AI 搜索回答质量评测",
    "PubMed + RAG 智能营养师"
  ]) {
    assert.ok(visibleText.includes(phrase), `missing visible phrase: ${phrase}`);
  }
});

test("navigation anchors point to unique sections", () => {
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, "id attributes must be unique");

  for (const anchor of ["top", "story", "work", "method", "contact"]) {
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
  assert.match(html, /aria-label="雷达扫描中的程序化点阵人物肖像"/);
});

test("content remains visible without JavaScript and social metadata is complete", async () => {
  assert.match(html, /classList\.add\("js-enabled"\)/);
  assert.match(css, /\.reveal\s*{\s*opacity:\s*1;/);
  assert.match(css, /\.js-enabled \.reveal/);
  assert.match(html, /property="og:image"/);
  assert.match(html, /name="twitter:image"/);
  assert.ok((await stat(new URL("og-card.png", projectRoot))).size > 10_000);
  for (const asset of ["model-radar-screen.png", "lightloom-agent-screen.png", "search-eval-loop.png"]) {
    assert.ok((await stat(new URL(`assets/${asset}`, projectRoot))).size > 10_000, `invalid asset: ${asset}`);
  }
});

test("portrait radar is progressive, bounded, and motion-aware", () => {
  assert.match(html, /id="signal-portrait"/);
  assert.match(html, /class="portrait-fallback"/);
  assert.match(script, /Math\.min\(window\.devicePixelRatio \|\| 1, 1\.5\)/);
  assert.match(script, /1000 \/ 30/);
  assert.match(script, /document\.hidden/);
  assert.match(script, /motionQuery\.addEventListener\("change"/);
});

test("site contains no unfinished placeholders or empty links", () => {
  assert.doesNotMatch(`${html}\n${css}\n${script}`, /\b(?:TODO|FIXME|PLACEHOLDER)\b/i);
  assert.doesNotMatch(html, /href="#"/);
  const contrastCliche = new RegExp(["不", "是", "\\s*", "而", "是"].join(""));
  assert.doesNotMatch(html, contrastCliche);
});
