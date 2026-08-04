# 王逸尘个人网站 / Yichen Wang Portfolio

这是王逸尘的网页版简历与个人作品入口，聚焦 AI 产品、模型评测、人机交互和可追溯交付。

This is Yichen Wang's portfolio and web resume, focused on AI product work, model evaluation, human-AI interaction, and evidence-backed delivery.

## 在线地址 / Live Site

<https://wychuang.github.io/>

## 内容结构 / Content

- 个人定位与跨学科背景 / positioning and interdisciplinary background
- Model Radar、Lightloom、AI 搜索评测、PubMed RAG 等精选项目 / selected projects
- 从问题定义、原型实现到结果验证的能力链 / end-to-end capability chain
- TÜV 南德专业实践、教育经历与联系方式 / professional practice, education, and contact

## 视觉方向 / Visual Direction

网站沿用 Model Radar 的复古未来控制室语言：深色网格、大字号、纸色与荧光信号色、雷达刻度和紧凑的信息标签。个人站保留这套辨识度，同时把阅读顺序调整为招聘者熟悉的“定位—项目—能力—联系”。

The visual system extends Model Radar's retro-future control-room language: a dark grid, oversized type, paper and signal colors, radar geometry, and compact metadata. The information flow is adapted for portfolio reading.

## 本地预览 / Local Preview

```powershell
npm start
```

打开 / Open:

```text
http://127.0.0.1:4173/
```

## 验证 / Verification

```powershell
npm test
npm run check
npm run build
```

Windows 完整检查 / Full Windows check:

```powershell
.\scripts\check.ps1
```

## 发布 / Deployment

`main` 分支推送后，`.github/workflows/pages.yml` 会先运行检查，再生成只含公开网页资源的 `dist/`，随后发布到 GitHub Pages。

Pushing to `main` verifies the site, builds a public-only `dist/` artifact, and deploys it through GitHub Pages.

## 隐私边界 / Privacy

公开仓库只包含网站所需的个人介绍、公开作品链接和联系邮箱。原始简历、电话、私有研究材料、工作文件与本地数据不进入本仓库。

The public repository contains only portfolio copy, public project links, and a contact email. Raw resumes, phone numbers, private research, work files, and local data stay outside the repository.
