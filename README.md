# 王逸尘个人网站 / Yichen Wang Portfolio

这是王逸尘的个人叙事与作品网站，聚焦 AI 产品、模型评测、人机交互和可追溯交付。

This is Yichen Wang's narrative portfolio, focused on AI product work, model evaluation, human-AI interaction, and evidence-backed delivery.

## 在线地址 / Live Site

<https://wychuang.github.io/>

## 内容结构 / Content

- 自我介绍与从生物医学、工业设计走向 AI 产品的个人历程 / personal introduction and interdisciplinary journey
- Model Radar、Lightloom、AI 搜索评测、PubMed RAG 四个真实案例 / four evidence-backed project stories
- 实际产品截图、评测工作稿与诚实标注的原型链路复现 / real product screens, evaluation artifacts, and labeled flow reconstruction
- 从问题定义、原型实现到结果验证的工作方法 / end-to-end working method

## 视觉方向 / Visual Direction

网站沿用 Model Radar 的复古未来控制室语言：深色网格、大字号、纸色与荧光信号色、雷达刻度和紧凑的信息标签。首屏使用程序化点阵人物与大范围雷达扫描，阅读顺序调整为“我是谁—如何走到这里—做过什么—证据在哪里—如何联系”。

The visual system extends Model Radar's retro-future control-room language with a procedural dot portrait and a large scanning field. The narrative moves from identity and journey to real projects, evidence, working method, and contact.

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
