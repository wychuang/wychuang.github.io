# Development / 开发说明

## Architecture / 架构

这是一个无依赖静态网站：

- `index.html`：语义结构、公开履历与项目内容。
- `styles.css`：Model Radar 衍生视觉、响应式布局、动效与打印样式。
- `app.js`：滚动显现、导航状态和打印入口。
- `assets/`：经过公开边界检查的真实项目截图。
- `tests/site.test.mjs`：内容、锚点、链接与无障碍防线。
- `scripts/dev-server.mjs`：本地静态服务器。
- `scripts/build-site.mjs`：生成只含公开网页资源的 `dist/`。
- `.github/workflows/pages.yml`：测试与 GitHub Pages 发布。

This is a dependency-free static site. HTML owns the content and semantics, CSS owns the visual system and responsive behavior, and JavaScript adds progressive enhancement for navigation, reveals, and the portrait radar.

## Commands / 命令

```powershell
npm start
npm test
npm run check
npm run build
.\scripts\check.ps1
```

`dist/` 是可删除、可重新生成的发布产物，不进入 Git。GitHub Actions 只上传该目录，不会把测试、脚本和开发文档发布到网站。

`dist/` is a disposable build artifact. GitHub Actions uploads only this directory, keeping tests, scripts, and development notes out of the public Pages artifact.

## Content Rules / 内容规则

- 所有数字和项目描述应能回到公开仓库、简历证据或原始项目文件。
- 先写真实问题、本人动作与交付结果，再补技术关键词。
- 新增公开链接前确认目标可访问且不暴露私人材料。
- 电话、原始简历和私有项目资料不进入公开仓库。

- Keep quantitative claims tied to public repositories, resume evidence, or original project files.
- Lead with the problem, the owner's action, and the result before adding technical labels.
- Verify every new public link and keep private source material outside the repository.

## Design Rules / 设计规则

- 继续使用 `--night`、`--paper`、`--acid`、`--hot`、`--sky` 这组 Model Radar 色彩变量。
- 避免通用 SaaS 卡片墙、紫色渐变和无目的装饰。
- 动效承担进入、扫描和状态提示功能，并尊重 `prefers-reduced-motion`。
- 点阵肖像使用稳定坐标；扫描只改变显影强度。画布限制为 30fps、最高 1.5 DPR，离开视口或页面进入后台后暂停。
- 无 JavaScript 时保留 SVG 点阵人物；减弱动效模式使用静态扫描状态。
- 项目图片必须来自公开产品、合成示例或已脱敏工作稿；功能重构图需明确标注，不能冒充真实截图。
- 修改桌面布局时同时检查 780px 与 480px 断点、键盘焦点和打印样式。
- 标题字体需保留 macOS、iOS、Android 和 Windows 的后备字体；发布前检查 320、375、390、768 和 1440px 宽度没有横向溢出。
- 首屏内容明显变化后，用 1200×630 视口重新生成 `og-card.png`，并检查文字没有被截图边缘裁掉。

- Preserve the Model Radar color variables and signal language.
- Avoid generic SaaS card grids and decorative effects without an information purpose.
- Motion should support entry, scanning, or status, with reduced-motion support.
- Keep portrait topology stable, cap the canvas at 30fps and 1.5 DPR, and pause it off-screen or in background tabs.
- Preserve the SVG no-JavaScript fallback and label reconstructed project visuals honestly.
- Check desktop, 780px, 480px, keyboard focus, and print output after layout changes.
- Preserve cross-platform font fallbacks and verify no horizontal overflow at 320, 375, 390, 768, and 1440px.
- Regenerate `og-card.png` from a 1200×630 hero viewport after major hero changes.
