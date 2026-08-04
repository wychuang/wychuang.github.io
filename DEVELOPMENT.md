# Development / 开发说明

## Architecture / 架构

这是一个无依赖静态网站：

- `index.html`：语义结构、公开履历与项目内容。
- `styles.css`：Model Radar 衍生视觉、响应式布局、动效与打印样式。
- `app.js`：中英文本、系统语言识别、明暗主题状态、滚动显现、导航状态和打印入口。
- `assets/`：点阵头像、两校官网校徽与经过公开边界检查的项目截图。
- `tests/site.test.mjs`：内容、锚点、链接与无障碍防线。
- `scripts/dev-server.mjs`：本地静态服务器。
- `scripts/build-site.mjs`：生成只含公开网页资源的 `dist/`。
- `.github/workflows/pages.yml`：测试与 GitHub Pages 发布。

This is a dependency-free static site. HTML owns the Chinese fallback content and semantics, CSS owns both themes, the compact editorial portrait card, and responsive behavior, and JavaScript adds bilingual copy, preference persistence, navigation, reveals, and printing.

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
- 公开页面只呈现访客需要的信息；素材来源、验收口径和制作说明留在开发文档或验收记录中。

- Keep quantitative claims tied to public repositories, resume evidence, or original project files.
- Lead with the problem, the owner's action, and the result before adding technical labels.
- Verify every new public link and keep private source material outside the repository.
- Keep production notes, asset provenance, and review criteria out of the visitor-facing page.

## Design Rules / 设计规则

- 继续使用 `--night`、`--paper`、`--acid`、`--hot`、`--sky` 这组 Model Radar 色彩变量。
- 避免通用 SaaS 卡片墙、紫色渐变和无目的装饰。
- 动效承担进入、扫描和状态提示功能，并尊重 `prefers-reduced-motion`。
- 点阵头像来自站点所有者提供的本人照片，保持小尺寸，仅作为首屏识别符。
- 人物使用编辑式识别卡呈现：矩形裁切、套准线、点阵纹理和一条窄扫描带。完整面部始终可见，避免圆形雷达与大块明暗分区。
- 深色模式突出酸绿识别条、设备铭牌与硬边偏移阴影；浅色模式使用纸张、深墨和橄榄套印，避免发光雷达效果。
- 首次访问固定使用深色模式，并根据浏览器语言选择中英文；手动主题和语言写入 `localStorage`，后续访问继续沿用。
- 中文是 HTML 内的无脚本回退。每个 `data-i18n`、`data-i18n-aria` 和 `data-i18n-alt` 键必须同时提供中英文内容。
- 浙江大学校徽取自[浙江大学校标规范页](https://www.zju.edu.cn/xb/list.htm)，清华大学校徽取自[清华大学视觉形象识别系统](https://vi.tsinghua.edu.cn/gk/xxbz/xh.htm)。保留官网配色和比例，只允许清理画布留白与等比缩放。
- 项目图片必须来自公开产品、合成示例或已脱敏工作稿；功能重构图需明确标注，不能冒充真实截图。
- 修改桌面布局时同时检查 780px 与 480px 断点、键盘焦点和打印样式。
- 标题字体需保留 macOS、iOS、Android 和 Windows 的后备字体；发布前检查 320、375、390、768 和 1440px 宽度没有横向溢出。
- 首屏内容明显变化后，用 1200×630 视口重新生成 `og-card.png`，并检查文字没有被截图边缘裁掉。

- Preserve the Model Radar color variables and signal language.
- Avoid generic SaaS card grids and decorative effects without an information purpose.
- Motion should support entry, scanning, or status, with reduced-motion support.
- Use the owner-approved likeness inside a compact editorial identity card with registration marks and raster texture.
- Keep the full face visible and move only a narrow horizontal scanning band. Stop the band under reduced motion and remove overlays in print.
- Default to dark mode, detect the browser language, and persist explicit language/theme choices in `localStorage`.
- Keep Chinese as the no-script HTML fallback and provide both languages for every translation hook.
- Preserve the official colors and proportions of the ZJU and Tsinghua emblems; only trim blank canvas and scale proportionally.
- Check desktop, 780px, 480px, keyboard focus, and print output after layout changes.
- Preserve cross-platform font fallbacks and verify no horizontal overflow at 320, 375, 390, 768, and 1440px.
- Regenerate `og-card.png` from a 1200×630 hero viewport after major hero changes.
