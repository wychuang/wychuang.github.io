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
    "YICHEN WANG",
    "Model Radar",
    "Lightloom",
    "AI 搜索回答评测",
    "PubMed + RAG 智能营养师"
  ]) {
    assert.ok(visibleText.includes(phrase), `missing visible phrase: ${phrase}`);
  }
});

test("navigation anchors point to unique sections", () => {
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, "id attributes must be unique");

  for (const anchor of ["top", "profile", "work", "capability", "contact"]) {
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
});

test("content remains visible without JavaScript and social metadata is complete", async () => {
  assert.match(html, /classList\.add\("js-enabled"\)/);
  assert.match(css, /\.reveal\s*{\s*opacity:\s*1;/);
  assert.match(css, /\.js-enabled \.reveal/);
  assert.match(html, /property="og:image"/);
  assert.match(html, /name="twitter:image"/);
  assert.ok((await stat(new URL("og-card.png", projectRoot))).size > 10_000);
});

test("site contains no unfinished placeholders or empty links", () => {
  assert.doesNotMatch(`${html}\n${css}\n${script}`, /\b(?:TODO|FIXME|PLACEHOLDER)\b/i);
  assert.doesNotMatch(html, /href="#"/);
  assert.doesNotMatch(html, /不是\s*而是/);
});
