# 王逸尘个人网站 / Yichen Wang Portfolio

这是王逸尘的个人简历与作品网站，聚焦 AI 产品、模型评测和人机交互。

This is Yichen Wang's résumé and portfolio site, focused on AI product work, model evaluation, and human-AI interaction.

## 在线地址 / Live Site

<https://wychuang.github.io/>

## 内容结构 / Content

- 姓名、学历、专业、GPA、升学与求职状态 / identity, education, GPA, graduate study, and availability
- 浙江大学与清华大学校徽强化的教育信息 / education blocks supported by official ZJU and Tsinghua emblems
- Model Radar、Lightloom、AI 搜索评测、PubMed RAG 四个项目 / four selected projects
- 产品截图、评测样本与毕业设计功能图 / product screens, evaluation artifact, and graduation-project flow
- 分组呈现的教育与实践经历 / grouped education and hands-on experience
- 自动识别中英文，深色主题默认开启，语言与主题均可手动切换 / browser-language detection, a dark default, and manual language/theme controls

## 视觉方向 / Visual Direction

网站直接转译 Model Radar 的控制室语言：巨型紧排标题、连续信号色块、硬边网格和高密度读数。首屏是一块个人身份仪表盘，教育与 GPA 组成三联信号板；项目以“产品画面 + 整块项目说明”交替排列，酸绿、青色、珊瑚红和玫红形成连续节奏。人物仍以小尺寸编辑式识别卡呈现，完整面部始终可见。

The site directly translates Model Radar's control-room language through oversized compressed headlines, continuous signal blocks, hard grid lines, and compact readouts. The hero works as a personal identity dashboard, while each project pairs a product view with a full signal-color explanation panel. The compact editorial portrait card keeps the face fully visible within the denser system.

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

公开仓库只包含网站所需的个人介绍、公开作品链接、经过检查的项目画面和联系邮箱。原始简历、电话、私有研究材料、工作文件与本地数据不进入本仓库。

The public repository contains only portfolio copy, public project links, and a contact email. Raw resumes, phone numbers, private research, work files, and local data stay outside the repository.
