import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);
const html = await readFile(new URL("index.html", projectRoot), "utf8");
const css = await readFile(new URL("styles.css", projectRoot), "utf8");
const script = await readFile(new URL("app.js", projectRoot), "utf8");
const devServer = await readFile(new URL("scripts/dev-server.mjs", projectRoot), "utf8");
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

test("public profile keeps the corrected location and scan-friendly working keywords", () => {
  assert.ok(visibleText.includes("北京优先 / 杭州可考虑"));
  assert.ok(visibleText.includes("关键词：医学数据与证据、用户研究与交互设计、AI 产品与模型评测"));
  assert.ok(visibleText.includes("技术栈：Python、JavaScript、SQL、Flask、SQLite、RAG、自动化测试"));
  assert.doesNotMatch(`${html}\n${script}`, /上海 \/ 北京 \/ 深圳 \/ 杭州|Shanghai \/ Beijing \/ Shenzhen \/ Hangzhou/);
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
  assert.match(html, /alt="王逸尘的简笔插画头像"/);
});

test("content remains visible without JavaScript and social metadata is complete", async () => {
  assert.match(html, /classList\.add\("js-enabled"\)/);
  assert.match(css, /\.reveal\s*{\s*opacity:\s*1;/);
  assert.match(css, /\.js-enabled \.reveal/);
  assert.match(html, /property="og:image"/);
  assert.match(html, /name="twitter:image"/);
  assert.ok((await stat(new URL("og-card.png", projectRoot))).size > 10_000);
  assert.match(devServer, /"\.webp":\s*"image\/webp"/);
  for (const asset of [
    "profile-illustrated.webp",
    "zju-emblem-transparent.png",
    "tsinghua-emblem-transparent.png",
    "model-radar-screen.png",
    "model-radar-map.png",
    "model-radar-detail.png",
    "model-radar-sources.png",
    "lightloom-agent-screen.png",
    "lightloom-vault-screen.png",
    "lightloom-relations-screen.png",
    "search-eval-loop.png"
  ]) {
    assert.ok((await stat(new URL(`assets/${asset}`, projectRoot))).size > 10_000, `invalid asset: ${asset}`);
  }
});

test("school emblems use matching transparent square canvases", async () => {
  for (const asset of ["zju-emblem-transparent.png", "tsinghua-emblem-transparent.png"]) {
    const png = await readFile(new URL(`assets/${asset}`, projectRoot));
    assert.equal(png.toString("ascii", 1, 4), "PNG", `${asset} must remain a PNG`);
    assert.equal(png.readUInt32BE(16), 256, `${asset} must use the normalized width`);
    assert.equal(png.readUInt32BE(20), 256, `${asset} must use the normalized height`);
    assert.equal(png[25], 6, `${asset} must preserve a full alpha channel`);
  }

  assert.match(css, /\.school-emblem\s*{[^}]*background:\s*transparent;/s);
  assert.match(css, /\.education-card > img\s*{[^}]*background:\s*transparent;/s);
});

test("hero education strip integrates GPA and meaningful school context", () => {
  const zjuPanel = html.match(/<article class="school-fact school-fact-zju"[\s\S]*?<\/article>/)?.[0] ?? "";
  const tsinghuaPanel = html.match(/<article class="school-fact school-fact-tsinghua"[\s\S]*?<\/article>/)?.[0] ?? "";

  assert.equal((html.match(/class="school-fact school-fact-/g) ?? []).length, 2);
  assert.doesNotMatch(html, /class="gpa-fact"/);
  assert.match(zjuPanel, /class="school-gpa"/);
  assert.match(zjuPanel, /生物医学工程/);
  assert.match(zjuPanel, /工业设计/);
  assert.doesNotMatch(zjuPanel, /工业设计辅修/);
  assert.match(zjuPanel, /class="school-watermark school-zju-backdrop"/);
  assert.match(zjuPanel, /生医工/);
  assert.match(zjuPanel, /公益服务标兵/);
  assert.match(zjuPanel, /社会工作标兵/);
  assert.match(zjuPanel, /SRTP/);
  assert.match(tsinghuaPanel, /class="school-watermark school-department"/);
  assert.match(tsinghuaPanel, /心理与认知/);
  assert.match(tsinghuaPanel, /科学系/);
  assert.match(css, /\.profile-facts\s*{[^}]*grid-template-columns:\s*minmax\(0, 1\.12fr\) minmax\(0, 0\.88fr\)/s);
  assert.match(css, /mask-image:\s*linear-gradient\(90deg, transparent 0%, #000 16%, #000 73%, transparent 100%\)/);
  assert.match(html, /hero\.summaryEducationZju[^>]*>[^<]*GPA 3\.8\/4\.0。<\/span><br><span data-i18n="hero\.summaryEducationTsinghua"/);
});

test("Model Radar links open the current switchable radar edition", () => {
  const currentRadarLinks = html.match(/href="https:\/\/wychuang\.github\.io\/model-radar\/radar\.html"/g) ?? [];
  assert.equal(currentRadarLinks.length, 5);
  assert.doesNotMatch(html, /href="https:\/\/wychuang\.github\.io\/model-radar\/"/);
});

test("project media uses accessible user-controlled galleries", () => {
  assert.equal((html.match(/class="media-gallery(?:\s|\")/g) ?? []).length, 4);
  assert.equal((html.match(/data-gallery-slide/g) ?? []).length, 13);
  assert.equal((html.match(/class="gallery-track" tabindex="0"/g) ?? []).length, 4);
  assert.match(html, /data-gallery-prev/);
  assert.match(html, /data-gallery-next/);
  assert.match(css, /scroll-snap-type:\s*x mandatory/);
  assert.match(css, /@media \(hover: hover\) and \(pointer: fine\)/);
  assert.match(script, /\["ArrowLeft", "ArrowRight", "Home", "End"\]/);
  assert.match(script, /ResizeObserver/);
  assert.match(script, /visibilitychange/);
  assert.doesNotMatch(script, /setInterval\(/);
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
  assert.match(html, /assets\/profile-illustrated\.webp/);
  assert.match(css, /@keyframes portrait-scan/);
  assert.match(css, /@keyframes portrait-raster-slip/);
  assert.doesNotMatch(css, /\.portrait-raster::after|\.portrait-scanner::before|\.portrait-scanner::after/);
  const scannerRule = css.match(/\.portrait-scanner\s*\{([^}]*)\}/s)?.[1] ?? "";
  assert.match(scannerRule, /animation:\s*portrait-scan[^;]*infinite/);
  assert.doesNotMatch(scannerRule, /alternate/, "portrait scanner must travel downward in one direction");
  assert.match(css, /@keyframes portrait-float/);
  assert.match(css, /@keyframes portrait-breathe/);
  assert.match(css, /@keyframes color-block-drift/);
  assert.match(css, /--block-acid:/);
  assert.match(css, /--block-sky:\s*#20a8ff/);
  assert.match(css, /--block-hot:/);
  assert.match(css, /--block-rose:\s*#ffb84d/);
  assert.match(css, /--block-rose:/);
  assert.match(css, /--signal-paper:/);
  assert.match(css, /\.portrait-card\s*\{[^}]*width:\s*224px/s);
  assert.match(css, /\.school-gpa\s*\{[^}]*display:\s*flex/s);
  assert.match(css, /\.case-copy\s*\{[^}]*background:\s*var\(--case-accent\)/s);
  assert.match(css, /\.case-study:nth-of-type\(4\)\s*\{[^}]*--case-accent:\s*var\(--block-rose\)/s);
  assert.match(css, /@keyframes signal-band-drift/);
  assert.match(css, /prefers-reduced-motion:\s*reduce[^}]*\}/s);
  assert.doesNotMatch(`${html}\n${css}`, /profile-radar|radar-counter-sweep|mask-image:\s*conic-gradient/);
  assert.doesNotMatch(html, /<canvas/);
});

test("contact section includes a meaningful motion-safe background radar", () => {
  assert.match(html, /class="contact-radar"/);
  assert.match(html, /class="contact-radar-scope"/);
  assert.equal((html.match(/class="contact-radar-blip contact-radar-blip-/g) ?? []).length, 4);
  for (const label of ["PRODUCT", "BUILD", "EVALUATION", "RESEARCH", "PROTOTYPE", "WORKING", "SHIPPED"]) {
    assert.ok(visibleText.includes(label), `missing radar meaning: ${label}`);
  }
  for (const project of ["MODEL RADAR", "LIGHTLOOM", "SEARCH EVAL", "PUBMED RAG"]) {
    assert.ok(visibleText.includes(project), `missing radar project signal: ${project}`);
  }
  assert.match(css, /@keyframes contact-radar-sweep/);
  assert.match(css, /@keyframes contact-radar-ping/);
  assert.equal((html.match(/class="contact-radar-beam contact-radar-beam-/g) ?? []).length, 3);
  assert.match(html, /contact-radar-beam-wide" d="[^"]*A310 310 0 0 0/);
  assert.doesNotMatch(`${html}\n${css}`, /contact-radar-profile/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*\.contact-radar-sweep/);
  assert.match(css, /@media print[\s\S]*\.contact-radar/);
});

test("wide-screen layout expands while retaining a dedicated large-display breakpoint", () => {
  assert.match(css, /--content:\s*2560px/);
  assert.match(css, /@media\s*\(min-width:\s*1500px\)/);
  assert.match(css, /\.project-summary,[\s\S]*\.case-links\s*\{\s*max-width:\s*760px/);
});

test("public copy excludes production notes and review language", () => {
  assert.doesNotMatch(visibleText, /BOUNDARY|VISUAL NOTE|REAL PRODUCT SCREEN|REAL APP SCREEN|REAL WORKING ARTIFACT|FLOW RECONSTRUCTION|UI SNAPSHOT|CAPTURED/i);
  assert.doesNotMatch(visibleText, /PMID\s*\d+/i, "prototype literature cards must not invent publication identifiers");
  assert.ok(visibleText.includes("PROTOTYPE / PAPER 01"));
});

test("site contains no unfinished placeholders or empty links", () => {
  assert.doesNotMatch(`${html}\n${css}\n${script}`, /\b(?:TODO|FIXME|PLACEHOLDER)\b/i);
  assert.doesNotMatch(html, /href="#"/);
  const contrastCliche = new RegExp(["不", "是", "\\s*", "而", "是"].join(""));
  assert.doesNotMatch(`${html}\n${script}`, contrastCliche);
});
