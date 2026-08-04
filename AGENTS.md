# Agent Notes / Agent 工作说明

This project lives at `F:\Projects\codex\apps\wychuang.github.io` and is an independent Git repository.

本项目位于 `F:\Projects\codex\apps\wychuang.github.io`，是独立 Git 仓库。

## Boundaries / 边界

- Keep implementation changes inside this project unless updating `F:\Projects\WORKSPACE.md` or `F:\Projects\PROJECTS_INDEX.md` after a verified project-level change.
- Do not copy raw resumes, phone numbers, private research, TÜV customer files, or local datasets into this repository.
- Preserve the dependency-free static architecture unless a concrete feature requires a build system.
- Read `README.md` and `DEVELOPMENT.md` before changing content, visual language, or deployment.

- 实现修改应限制在本项目内；项目级变化确认后，可同步更新工作区索引。
- 不要把原始简历、电话号码、私有研究、TÜV 客户文件或本地数据复制进本仓库。
- 维持无依赖静态架构；只有明确功能需要时再引入构建系统。
- 修改内容、视觉语言或发布流程前，先阅读 `README.md` 与 `DEVELOPMENT.md`。

## Verification / 验证

Run the smallest relevant check and use the full Windows check before publishing:

```powershell
npm test
npm run check
npm run build
.\scripts\check.ps1
```

Before claiming a visual change is complete, inspect at least one desktop viewport and one mobile viewport. Keep keyboard focus, reduced motion, and print behavior intact.

视觉修改完成前，至少检查一个桌面视口和一个移动端视口，并保持键盘焦点、减弱动效和打印行为可用。
