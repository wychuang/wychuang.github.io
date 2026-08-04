# Development / 开发说明

## Architecture / 架构

这是一个无依赖静态网站：

- `index.html`：语义结构、公开履历与项目内容。
- `styles.css`：Model Radar 衍生视觉、响应式布局、动效与打印样式。
- `app.js`：中英文本、系统语言识别、明暗主题状态、滚动显现、项目画廊、页面可见性状态、导航状态和打印入口。
- `assets/`：简笔插画头像、两校官网校徽与经过公开边界检查的项目截图；同一项目的结果、细节与过程画面使用明确文件名区分。
- `tests/site.test.mjs`：内容、锚点、链接与无障碍防线。
- `scripts/dev-server.mjs`：本地静态服务器。
- `scripts/build-site.mjs`：生成只含公开网页资源的 `dist/`。
- `.github/workflows/pages.yml`：测试与 GitHub Pages 发布。

This is a dependency-free static site. HTML owns the Chinese fallback content and semantics, CSS owns both themes, the compact editorial portrait card, responsive behavior, and native scroll-snap media tracks. JavaScript adds bilingual copy, preference persistence, gallery controls, page-visibility pausing, navigation, reveals, and printing.

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
- 项目媒体默认使用原生横向滚动与 `scroll-snap`；增强控件支持按钮、方向键、Home/End 和触控滑动。禁止自动轮播，页面进入后台时暂停持续动效。
- 色块承担页面结构：首屏教育信息使用纸色、酸绿和 DPSK 蓝三联板；项目使用整块酸绿、DPSK 蓝、珊瑚红和暖金说明面板；联系区使用纸色收束。色块之间用硬边与网格连接。
- 章节标题使用 Model Radar 式 masthead：紧排巨型标题与小号等宽读数并置。项目说明和画面直接拼接，避免回到常规卡片与浮层。
- 动效共用“落位—呼吸—扫描”的低幅度节奏；人物漂浮不超过 4px，图像缩放不超过 1.018，色块位移不超过 7px。
- 简笔插画头像以站点所有者提供的本人照片为身份参考，使用均匀光线与中长焦比例，保持小尺寸，仅作为首屏识别符。
- 人物使用编辑式识别卡呈现：矩形裁切、套准线、低细节色面和低清信号层。完整面部始终可见，扫描带只从上向下运行，拖影留在扫描线后方。
- 联系区使用低对比圆形项目状态雷达作为越出边框的背景。方位对应产品、开发、评测和研究，半径对应原型、可用版本和已发布，信号点只能使用页面已有项目与真实状态。
- 深色模式突出酸绿识别条、设备铭牌与硬边偏移阴影；浅色模式使用纸张、深墨和橄榄套印，避免发光雷达效果。
- 首次访问固定使用深色模式，并根据浏览器语言选择中英文；手动主题和语言写入 `localStorage`，后续访问继续沿用。
- 中文是 HTML 内的无脚本回退。每个 `data-i18n`、`data-i18n-aria` 和 `data-i18n-alt` 键必须同时提供中英文内容。
- 浙江大学校徽取自[浙江大学校标规范页](https://www.zju.edu.cn/xb/list.htm)，清华大学校徽取自[清华大学视觉形象识别系统](https://vi.tsinghua.edu.cn/gk/xxbz/xh.htm)。保留官网配色和比例，只允许清理画布留白与等比缩放。
- 项目图片必须来自公开产品、合成示例或已脱敏工作稿；功能重构图需明确标注，不能冒充真实截图。
- 修改桌面布局时同时检查 780px 与 480px 断点、键盘焦点和打印样式。
- 大屏框架允许延展到 2560px；1500px 以上放大标题、色块与项目画面，同时限制正文阅读宽度。
- 标题字体需保留 macOS、iOS、Android 和 Windows 的后备字体；发布前检查 320、375、390、768、1440、1920 和 2560px 宽度没有横向溢出。
- 首屏内容明显变化后，用 1200×630 视口重新生成 `og-card.png`，并检查文字没有被截图边缘裁掉。

- Preserve the Model Radar color variables and signal language.
- Avoid generic SaaS card grids and decorative effects without an information purpose.
- Motion should support entry, scanning, or status, with reduced-motion support.
- Project media uses native horizontal scrolling and scroll snap, enhanced by buttons, Arrow keys, Home/End, and touch. Do not autoplay galleries, and pause continuous motion while the page is hidden.
- Use color blocks as page structure: a paper, acid, and DPSK blue education strip; full acid, DPSK blue, coral, and warm amber project panels; and a paper contact close.
- Build section mastheads from oversized compressed titles, compact mono readouts, hard borders, and directly joined media/copy panels.
- Keep motion on one low-amplitude settle, breathe, and scan rhythm; portrait drift stays within 4px, image scale within 1.018, and color-block travel within 7px.
- Use the owner-approved likeness as the reference for a compact, low-detail illustrated identity card with registration marks and raster texture.
- Keep the full face visible and move one horizontal scan band from top to bottom. Its trail stays behind the moving line. Stop the band under reduced motion and remove overlays in print.
- Keep the contact scope low-contrast but meaningful: direction maps work domains, distance maps delivery stages, and every blip maps to a real project. Stop its sweep under reduced motion and remove it from print.
- Default to dark mode, detect the browser language, and persist explicit language/theme choices in `localStorage`.
- Keep Chinese as the no-script HTML fallback and provide both languages for every translation hook.
- Preserve the official colors and proportions of the ZJU and Tsinghua emblems; only trim blank canvas and scale proportionally.
- Check desktop, 780px, 480px, keyboard focus, and print output after layout changes.
- Let the frame expand up to 2560px; above 1500px, scale headlines, signal blocks, and project media while keeping body copy on a controlled measure.
- Preserve cross-platform font fallbacks and verify no horizontal overflow at 320, 375, 390, 768, 1440, 1920, and 2560px.
- Regenerate `og-card.png` from a 1200×630 hero viewport after major hero changes.
