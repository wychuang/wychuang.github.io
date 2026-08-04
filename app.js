const translations = {
  zh: {
    "meta.title": "王逸尘 · Yichen Wang｜个人网站",
    "meta.description": "王逸尘的个人网站：浙江大学生物医学工程本科、工业设计辅修，关注 AI 产品、模型评测与人机交互。",
    "meta.ogDescription": "浙江大学生物医学工程本科、工业设计辅修，2026 级清华大学 MAP 应用心理硕士拟入学。",
    "skip.main": "跳到主要内容",
    "aria.navigation": "主导航",
    "aria.home": "返回简介",
    "aria.toc": "页面目录",
    "aria.availability": "求职状态",
    "aria.educationSummary": "教育信息摘要",
    "aria.zjuWebsite": "浙江大学官网",
    "aria.tsinghuaWebsite": "清华大学官网",
    "aria.modelRadar": "打开 Model Radar 在线站点",
    "aria.lightloom": "打开 Lightloom 公开项目页",
    "aria.radarGallery": "Model Radar 项目图片",
    "aria.lightloomGallery": "Lightloom 项目图片",
    "aria.evalGallery": "AI 搜索回答评测项目图片",
    "aria.ragGallery": "智能营养师功能原型",
    "aria.ragFlow": "智能营养师功能流程示意",
    "aria.ragMealPrototype": "饮食识别与个人档案功能原型",
    "aria.ragEvidencePrototype": "PubMed 文献检索与回答功能原型",
    "profile.alt": "王逸尘的简笔插画头像",
    "nav.about": "简介",
    "nav.work": "项目",
    "nav.experience": "经历",
    "nav.contact": "联系",
    "hero.eyebrow": "AI 产品 · 模型评测 · 人机交互",
    "hero.namePrimary": "王逸尘",
    "hero.nameSecondary": "Yichen Wang",
    "hero.role": "我在做 AI 产品，也在研究人怎么使用它。",
    "hero.summaryEducation": "我本科毕业于浙江大学生物医学工程专业，辅修工业设计，GPA 3.8/4.0。2026 年秋季拟进入清华大学心理与认知科学系 MAP 应用心理硕士项目。",
    "hero.summary": "医学工程让我习惯处理数据和证据，工业设计让我开始关心产品是否好懂、好用。现在，我把这两种训练用在 AI 产品、模型评测和人机交互上。",
    "hero.viewWork": "看项目",
    "hero.contact": "联系我",
    "school.undergraduate": "本科 · 2021—2025",
    "school.zju": "浙江大学",
    "school.zjuDetail": "生物医学工程 · 工业设计辅修",
    "school.gpaNote": "本科成绩",
    "school.next": "下一阶段 · 2026",
    "school.tsinghua": "清华大学",
    "school.tsinghuaDetail": "MAP 应用心理硕士 · 2026 级拟入学",
    "school.zjuEmblemAlt": "浙江大学校徽",
    "school.tsinghuaEmblemAlt": "清华大学校徽",
    "availability.label": "求职状态",
    "availability.detail": "2026.08.11 起 · 每周 5 天 · 可实习 6 个月以上 · 北京优先 / 杭州可考虑",
    "work.title": "我做过的几个项目。",
    "project.radarAlt": "Model Radar 首页，展示世界模型雷达、更新时间、指标和模型排名",
    "project.radarCaption": "首页与当期快照 · 2026",
    "project.radarMapAlt": "Model Radar 的能力雷达、彩色指标和模型排序",
    "project.radarMapCaption": "能力雷达与模型排序",
    "project.radarDetailAlt": "Model Radar 的模型能力详情与厂商发布节奏",
    "project.radarDetailCaption": "当前信号与发布节奏",
    "project.radarSourcesAlt": "Model Radar 汇总的十二家厂商官方来源",
    "project.radarSourcesCaption": "十二家厂商的官方来源",
    "project.radarSummary": "一个跟踪主流 AI 模型更新的公开网站。",
    "project.radarStory1": "为了确认各家模型最近更新了什么，我把厂商官网、发布页、文档和价格页整理到一个站点里。打开页面就能看到模型能力、发布时间和原始来源。",
    "project.radarStory2": "我独立完成了产品结构、视觉设计、前端、数据刷新和 GitHub Pages 发布。目前覆盖 12 家厂商、45 个发布节点，并用 13 项自动测试检查更新结果。",
    "project.radarRole": "产品 · 设计 · 前端 · 数据更新",
    "project.radarScale": "12 家厂商 · 45 个发布节点",
    "project.lightloomAlt": "Lightloom 应用界面，左侧是原始记录，右侧是出处和 Agent 探索过程",
    "project.lightloomAgentCaption": "Idea 原文与 Agent 探索 · 0.8.5",
    "project.lightloomVaultAlt": "Lightloom 本地仓库的文件树、Markdown 编辑器和阅读视图",
    "project.lightloomVaultCaption": "本地仓库与分栏编辑",
    "project.lightloomRelationsAlt": "Lightloom 将多条 Idea 与 Agent 发现整理成关系图",
    "project.lightloomRelationsCaption": "跨记录联系视图",
    "project.lightloomSummary": "一个把散落资料留在本地，再交给 Agent 整理的 Windows 工具。",
    "project.lightloomStory1": "我的文字、网页、截图、文件和录音分散在很多地方。我希望它们先作为普通文件保存下来，需要时再让 AI 搜索、联系和批注。",
    "project.lightloomStory2": "Lightloom 会把原件和 AI 生成的内容分开保存。Agent 可以并行探索资料，用户随时能查看来源、进度和中间结果。目前已经做到 0.8.5 版。",
    "project.lightloomRole": "产品 · 交互 · 桌面端开发",
    "project.lightloomFeatures": "多媒体记录 · 并行 Agent · 过程检查点",
    "project.evalAlt": "AI 搜索回答评测样本，展示回答、复审、问题归因和优选回答的整理过程",
    "project.evalCaption": "从真实输出到优选回答",
    "project.evalWorkflowAlt": "AI 搜索回答评测的六步核验流程",
    "project.evalWorkflowCaption": "六步核验流程",
    "project.evalWorkflowKicker": "核验链路 / 06",
    "project.evalWorkflowTitle": "一条回答怎样走到可用版本",
    "project.evalStepRaw": "保存真实输出",
    "project.evalStepGold": "核对官方资料",
    "project.evalStepReview": "逐项复审",
    "project.evalStepDiagnose": "标记问题原因",
    "project.evalStepPair": "组成偏好对",
    "project.evalStepRebuild": "重写理想答案",
    "project.evalTableAlt": "AI 搜索回答评测的案例、偏好对和理想回答数量",
    "project.evalTableCaption": "案例、偏好对与理想回答",
    "project.evalStatsKicker": "样本进度 / 2026.06",
    "project.evalStatsTitle": "先把失败案例做透，再扩充样本",
    "project.evalLowScore": "典型低分回答",
    "project.evalCandidates": "候选案例",
    "project.evalVerified": "完成核验",
    "project.evalPairs": "偏好对",
    "project.evalIdeal": "理想答案",
    "project.evalTitle1": "AI 搜索回答",
    "project.evalTitle2": "质量评测",
    "project.evalSummary": "我用真实回答检查旧信息、弱引用和答非所问。",
    "project.evalStory1": "有些搜索回答读起来很完整，点开引用后却会发现信息已经过时，或者来源根本支撑不了结论。我把这些问题拆成任务完成、来源质量、时间范围、证据对应和风险边界几个检查项。",
    "project.evalStory2": "目前整理了 17 个候选案例，其中 8 个完成核验，并做成 11 组偏好对。一条使用旧模型名和过时参数的回答只得到 3/13 分，我随后根据官方页面补齐证据并重写了答案。",
    "project.evalSamples": "17 个案例 · 11 组偏好对",
    "project.evalRole": "采集 · 评分 · 问题归因 · 答案改写",
    "project.ragPhoneNote": "记录饮食，关联个人档案。",
    "project.ragFlow1": "从日常记录出发，",
    "project.ragFlow2": "再查相关文献。",
    "project.ragCaption": "功能流程原型",
    "project.ragMealTitle": "午餐已识别 4 种食物",
    "project.ragProfileTitle": "把一餐放回个人情况里看。",
    "project.ragProfileEnergy": "能量",
    "project.ragProfileProtein": "蛋白质",
    "project.ragProfileSalt": "钠",
    "project.ragMealCaption": "饮食识别与个人档案原型",
    "project.ragQuestion": "高血压人群该怎样控制钠摄入？",
    "project.ragPaper1": "膳食钠与血压的系统综述",
    "project.ragPaper2": "低钠干预与心血管结局",
    "project.ragAnswerTitle": "先给能执行的建议，再把依据留在旁边。",
    "project.ragEvidenceCaption": "文献检索与回答原型",
    "project.ragSummary": "本科毕业设计：用微信小程序记录饮食，并把健康问答连接到 PubMed 文献。",
    "project.ragStory1": "用户可以拍照记录一餐，系统识别食物并结合个人档案给出反馈。遇到健康问题时，回答会先检索 PubMed 文献，再组织成便于理解的说明。",
    "project.ragStory2": "我完成了微信小程序前端、Flask 后端、SQLite 数据库和论文，把食物识别、个人档案、饮食反馈与文献问答串成了一个可操作的功能原型。",
    "project.ragFeatures": "饮食记录 · 食物识别 · 健康档案 · 文献问答",
    "project.ragTech": "微信小程序 · Flask · SQLite · RAG",
    "facts.role": "我负责",
    "facts.scale": "规模",
    "facts.features": "已有功能",
    "facts.samples": "样本",
    "facts.tech": "技术",
    "links.live": "在线体验 ↗",
    "links.source": "查看源码 ↗",
    "links.project": "查看项目 ↗",
    "side.title": "其他小项目",
    "side.moneyTitle": "钱就是钱",
    "side.moneyDetail": "用金额尺帮助自己理解消费 ↗",
    "side.laptopTitle": "高考后游戏本选购",
    "side.laptopDetail": "把配置参数整理成选择路径 ↗",
    "side.researchTitle": "独立研究者工坊",
    "side.researchDetail": "整理研究过程的本地工作台 ↗",
    "experience.title": "教育与经历",
    "experience.lead": "关键词：医学数据与证据、用户研究与交互设计、AI 产品与模型评测。技术栈：Python、JavaScript、SQL、Flask、SQLite、RAG、自动化测试。",
    "experience.education": "教育 / EDUCATION",
    "experience.practice": "实践 / PRACTICE",
    "experience.zjuDetail": "生物医学工程本科 · 工业设计辅修 · GPA 3.8/4.0",
    "experience.tsinghuaSchool": "清华大学心理与认知科学系",
    "experience.tsinghuaDetail": "MAP 应用心理硕士 · 2026 级拟入学",
    "experience.presentDate": "2025—现在",
    "experience.safetyTitle": "功能安全与认证检测",
    "experience.safetyDetail": "围绕产品规格、测试记录、软件版本和技术文档做交叉核对，也参与中英文报告整理。这段工作让我更在意证据能不能经得起复查。",
    "experience.thesisTitle": "本科毕业设计",
    "experience.thesisDetail": "独立完成 PubMed + RAG 智能营养师，从微信小程序、后端与数据库，一直做到论文和功能原型。",
    "experience.srtpTitle": "浙江大学 SRTP",
    "experience.srtpDetail": "参与基于 Transformer / Conformer 的唇语识别研究，接触从数据处理、模型训练到结果比较的一整套研究过程。",
    "contact.title": "联系我",
    "contact.lead": "我正在寻找 AI 产品、模型评测与人机交互方向的实习和项目机会。",
    "contact.print": "打印 / 存为 PDF",
    "gallery.previous": "上一张项目图片",
    "gallery.next": "下一张项目图片",
    "theme.toLight": "切换到浅色模式",
    "theme.toDark": "切换到深色模式",
    "language.switch": "Switch to English"
  },
  en: {
    "meta.title": "Yichen Wang | Portfolio",
    "meta.description": "Yichen Wang's portfolio: Biomedical Engineering at Zhejiang University with a minor in Industrial Design, working across AI products, model evaluation, and human-AI interaction.",
    "meta.ogDescription": "Biomedical Engineering at Zhejiang University, Industrial Design minor, and incoming Tsinghua MAP student in 2026.",
    "skip.main": "Skip to main content",
    "aria.navigation": "Primary navigation",
    "aria.home": "Back to introduction",
    "aria.toc": "Page sections",
    "aria.availability": "Availability",
    "aria.educationSummary": "Education summary",
    "aria.zjuWebsite": "Zhejiang University website",
    "aria.tsinghuaWebsite": "Tsinghua University website",
    "aria.modelRadar": "Open the Model Radar website",
    "aria.lightloom": "Open the public Lightloom project",
    "aria.radarGallery": "Model Radar project images",
    "aria.lightloomGallery": "Lightloom project images",
    "aria.evalGallery": "AI search evaluation project images",
    "aria.ragGallery": "Smart nutrition assistant prototypes",
    "aria.ragFlow": "Smart nutrition assistant workflow",
    "aria.ragMealPrototype": "Meal recognition and personal profile prototype",
    "aria.ragEvidencePrototype": "PubMed retrieval and answer prototype",
    "profile.alt": "Minimal line-illustration portrait of Yichen Wang",
    "nav.about": "About",
    "nav.work": "Work",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    "hero.eyebrow": "AI products · model evaluation · human-AI interaction",
    "hero.namePrimary": "Yichen Wang",
    "hero.nameSecondary": "王逸尘",
    "hero.role": "I build AI products and study how people actually use them.",
    "hero.summaryEducation": "I studied Biomedical Engineering at Zhejiang University, with a minor in Industrial Design and a 3.8/4.0 GPA. In fall 2026, I plan to join Tsinghua University's MAP program in the Department of Psychology and Cognitive Science.",
    "hero.summary": "Engineering taught me to work from data and evidence. Industrial design taught me to ask whether a product makes sense to the person using it. I now bring both habits to AI products, model evaluation, and human-AI interaction.",
    "hero.viewWork": "View work",
    "hero.contact": "Contact",
    "school.undergraduate": "BEng · 2021—2025",
    "school.zju": "Zhejiang University",
    "school.zjuDetail": "Biomedical Engineering · Industrial Design minor",
    "school.gpaNote": "Undergraduate GPA",
    "school.next": "Next · 2026",
    "school.tsinghua": "Tsinghua University",
    "school.tsinghuaDetail": "MAP · incoming class of 2026",
    "school.zjuEmblemAlt": "Zhejiang University emblem",
    "school.tsinghuaEmblemAlt": "Tsinghua University emblem",
    "availability.label": "Availability",
    "availability.detail": "From Aug 11, 2026 · 5 days/week · 6+ months · Beijing preferred / Hangzhou considered",
    "work.title": "A few things I've built.",
    "project.radarAlt": "Model Radar homepage showing model updates, dates, metrics, and rankings",
    "project.radarCaption": "Homepage and current snapshot · 2026",
    "project.radarMapAlt": "Model Radar capability radar, signal blocks, and model ranking",
    "project.radarMapCaption": "Capability radar and model ranking",
    "project.radarDetailAlt": "Model Radar model detail and provider release clocks",
    "project.radarDetailCaption": "Current signal and release cadence",
    "project.radarSourcesAlt": "Official sources from twelve providers in Model Radar",
    "project.radarSourcesCaption": "Official sources across twelve providers",
    "project.radarSummary": "A public site for keeping up with major AI model releases.",
    "project.radarStory1": "I wanted a quicker way to see what model providers had actually changed. I brought their official sites, release notes, docs, and pricing pages into one place, with capabilities, dates, and original sources visible from the start.",
    "project.radarStory2": "I handled the product structure, visual design, frontend, data refresh, and GitHub Pages release. It currently tracks 45 release points across 12 providers, with 13 automated checks guarding each update.",
    "project.radarRole": "Product · design · frontend · data",
    "project.radarScale": "12 providers · 45 release points",
    "project.lightloomAlt": "Lightloom interface with source material on the left and agent exploration on the right",
    "project.lightloomAgentCaption": "Idea source and Agent exploration · 0.8.5",
    "project.lightloomVaultAlt": "Lightloom Local Vault with file tree, Markdown editor, and reading view",
    "project.lightloomVaultCaption": "Local Vault and split-view editing",
    "project.lightloomRelationsAlt": "Lightloom relation view connecting Ideas and Agent findings",
    "project.lightloomRelationsCaption": "Relations across records",
    "project.lightloomSummary": "A local-first Windows tool that lets agents work through scattered material without taking it away from you.",
    "project.lightloomStory1": "My notes, web pages, screenshots, files, and recordings end up everywhere. I wanted them saved as ordinary local files first, with AI available when I need help finding connections or adding context.",
    "project.lightloomStory2": "Lightloom keeps source files separate from AI output. Agents can explore in parallel, while the user can inspect sources, progress, and intermediate results at any time. The current release is 0.8.5.",
    "project.lightloomRole": "Product · interaction · desktop development",
    "project.lightloomFeatures": "Multimedia capture · parallel agents · checkpoints",
    "project.evalAlt": "AI search evaluation sample showing answer review, issue analysis, and preference pairs",
    "project.evalCaption": "From real output to the chosen answer",
    "project.evalWorkflowAlt": "Six-step AI search answer verification workflow",
    "project.evalWorkflowCaption": "Six-step verification workflow",
    "project.evalWorkflowKicker": "VERIFICATION LOOP / 06",
    "project.evalWorkflowTitle": "How an answer becomes usable",
    "project.evalStepRaw": "Save the raw output",
    "project.evalStepGold": "Check official sources",
    "project.evalStepReview": "Review each claim",
    "project.evalStepDiagnose": "Tag the failure",
    "project.evalStepPair": "Build a preference pair",
    "project.evalStepRebuild": "Write the ideal answer",
    "project.evalTableAlt": "Counts of cases, preference pairs, and ideal answers in the evaluation set",
    "project.evalTableCaption": "Cases, preference pairs, and ideal answers",
    "project.evalStatsKicker": "SAMPLE PROGRESS / 2026.06",
    "project.evalStatsTitle": "Study the failures before scaling the set",
    "project.evalLowScore": "TYPICAL LOW-SCORE ANSWER",
    "project.evalCandidates": "Candidates",
    "project.evalVerified": "Verified",
    "project.evalPairs": "Preference pairs",
    "project.evalIdeal": "Ideal answers",
    "project.evalTitle1": "AI search answer",
    "project.evalTitle2": "quality evaluation",
    "project.evalSummary": "I test real answers for stale facts, weak sources, and missed questions.",
    "project.evalStory1": "Some search answers read well until you open the citations and find that the facts are old or the sources do not support the claim. I turned those failures into checks for task completion, source quality, time range, evidence fit, and risk boundaries.",
    "project.evalStory2": "I collected 17 candidate cases, verified 8 of them, and produced 11 preference pairs. One answer using an old model name and stale parameters scored 3/13; I rebuilt it from current official sources.",
    "project.evalSamples": "17 cases · 11 preference pairs",
    "project.evalRole": "Collection · scoring · diagnosis · rewriting",
    "project.ragPhoneNote": "Log a meal and connect it to a personal profile.",
    "project.ragFlow1": "Start with the daily record,",
    "project.ragFlow2": "then retrieve the evidence.",
    "project.ragCaption": "Functional workflow prototype",
    "project.ragMealTitle": "Four foods recognized in this lunch",
    "project.ragProfileTitle": "Read each meal in the context of the person.",
    "project.ragProfileEnergy": "Energy",
    "project.ragProfileProtein": "Protein",
    "project.ragProfileSalt": "Sodium",
    "project.ragMealCaption": "Meal recognition and personal profile prototype",
    "project.ragQuestion": "How should someone with hypertension reduce sodium?",
    "project.ragPaper1": "Systematic review of dietary sodium and blood pressure",
    "project.ragPaper2": "Low-sodium interventions and cardiovascular outcomes",
    "project.ragAnswerTitle": "Give an actionable answer first, with evidence kept beside it.",
    "project.ragEvidenceCaption": "Literature retrieval and answer prototype",
    "project.ragSummary": "My undergraduate thesis: a WeChat mini program that connects food logs and health questions to PubMed evidence.",
    "project.ragStory1": "A user photographs a meal, the system identifies the food, and the response draws on their profile. For health questions, it retrieves PubMed papers before writing a plain-language answer.",
    "project.ragStory2": "I built the WeChat frontend, Flask backend, and SQLite database, then documented the system in my thesis. The result was a working prototype that joined food recognition, profiles, dietary feedback, and literature-backed Q&A.",
    "project.ragFeatures": "Food logs · recognition · profiles · literature Q&A",
    "project.ragTech": "WeChat Mini Program · Flask · SQLite · RAG",
    "facts.role": "My role",
    "facts.scale": "Scale",
    "facts.features": "Features",
    "facts.samples": "Samples",
    "facts.tech": "Stack",
    "links.live": "View live ↗",
    "links.source": "View source ↗",
    "links.project": "View project ↗",
    "side.title": "Smaller builds",
    "side.moneyTitle": "Money Is Money",
    "side.moneyDetail": "A visual price ruler for everyday spending ↗",
    "side.laptopTitle": "Gaming Laptop Guide",
    "side.laptopDetail": "Turning spec sheets into a decision path ↗",
    "side.researchTitle": "Independent Researcher Workshop",
    "side.researchDetail": "A local workspace for research in progress ↗",
    "experience.title": "Education & experience",
    "experience.lead": "Focus: medical data and evidence, user research and interaction design, AI products and model evaluation. Stack: Python, JavaScript, SQL, Flask, SQLite, RAG, and automated testing.",
    "experience.education": "EDUCATION",
    "experience.practice": "PRACTICE",
    "experience.zjuDetail": "BEng in Biomedical Engineering · Industrial Design minor · GPA 3.8/4.0",
    "experience.tsinghuaSchool": "Tsinghua University · Department of Psychology and Cognitive Science",
    "experience.tsinghuaDetail": "Master of Applied Psychology · incoming class of 2026",
    "experience.presentDate": "2025—Present",
    "experience.safetyTitle": "Functional safety & certification testing",
    "experience.safetyDetail": "I cross-check product specifications, test records, software versions, and technical documents, and help prepare reports in Chinese and English. The work has made me much stricter about whether evidence holds up to review.",
    "experience.thesisTitle": "Undergraduate thesis",
    "experience.thesisDetail": "I built the PubMed + RAG nutrition assistant end to end, from the WeChat client, backend, and database through to the paper and working prototype.",
    "experience.srtpTitle": "Zhejiang University SRTP",
    "experience.srtpDetail": "I worked on Transformer- and Conformer-based lip-reading research, covering the practical loop from data preparation and training to comparing results.",
    "contact.title": "Get in touch",
    "contact.lead": "I'm looking for internships and project work in AI products, model evaluation, and human-AI interaction.",
    "contact.print": "Print / Save as PDF",
    "gallery.previous": "Previous project image",
    "gallery.next": "Next project image",
    "theme.toLight": "Switch to light mode",
    "theme.toDark": "Switch to dark mode",
    "language.switch": "切换到中文"
  }
};

const root = document.documentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const themeButton = document.querySelector("#theme-toggle");
const languageButton = document.querySelector("#language-toggle");
const galleryControllers = [];

const safeStorage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // The selected state still applies for this page when storage is unavailable.
    }
  }
};

const currentLanguage = () => (root.dataset.language === "en" ? "en" : "zh");

function updateThemeControls(theme) {
  const language = currentLanguage();
  const nextTheme = theme === "dark" ? "light" : "dark";
  const label = translations[language][nextTheme === "light" ? "theme.toLight" : "theme.toDark"];
  if (themeButton) {
    themeButton.setAttribute("aria-label", label);
    themeButton.title = label;
    const text = themeButton.querySelector("b");
    if (text) text.textContent = language === "zh" ? (nextTheme === "light" ? "白" : "黑") : (nextTheme === "light" ? "L" : "D");
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#eeeadd" : "#10110e");
}

function applyTheme(theme, persist = false) {
  const resolved = theme === "light" ? "light" : "dark";
  root.dataset.theme = resolved;
  if (persist) safeStorage.set("portfolio-theme", resolved);
  updateThemeControls(resolved);
}

function applyLanguage(language, persist = false) {
  const resolved = language === "en" ? "en" : "zh";
  const copy = translations[resolved];
  root.dataset.language = resolved;
  root.lang = resolved === "zh" ? "zh-CN" : "en";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = copy[element.dataset.i18n];
    if (value) element.textContent = value;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const value = copy[element.dataset.i18nAria];
    if (value) element.setAttribute("aria-label", value);
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const value = copy[element.dataset.i18nAlt];
    if (value) element.alt = value;
  });

  document.title = copy["meta.title"];
  document.querySelector('meta[name="description"]')?.setAttribute("content", copy["meta.description"]);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", copy["meta.title"]);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", copy["meta.ogDescription"]);
  document.querySelector('meta[property="og:locale"]')?.setAttribute("content", resolved === "zh" ? "zh_CN" : "en_US");

  if (languageButton) {
    languageButton.textContent = resolved === "zh" ? "EN" : "中";
    languageButton.setAttribute("aria-label", copy["language.switch"]);
    languageButton.title = copy["language.switch"];
  }
  if (persist) safeStorage.set("portfolio-language", resolved);
  updateThemeControls(root.dataset.theme || "dark");
  galleryControllers.forEach((controller) => controller.syncLabels());
}

applyTheme(root.dataset.theme || "dark");
applyLanguage(root.dataset.language || (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en"));

themeButton?.addEventListener("click", () => {
  applyTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
});

languageButton?.addEventListener("click", () => {
  applyLanguage(currentLanguage() === "zh" ? "en" : "zh", true);
});

function setupGallery(gallery) {
  const track = gallery.querySelector(".gallery-track");
  const slides = [...gallery.querySelectorAll("[data-gallery-slide]")];
  const dots = gallery.querySelector("[data-gallery-dots]");
  const previousButton = gallery.querySelector("[data-gallery-prev]");
  const nextButton = gallery.querySelector("[data-gallery-next]");
  const currentLabel = gallery.querySelector("[data-gallery-current]");
  const totalLabel = gallery.querySelector("[data-gallery-total]");

  if (!track || slides.length < 2 || !dots) return;

  let activeIndex = 0;
  let scrollFrame = 0;
  let signalTimer = 0;

  const galleryName = gallery.dataset.galleryName || "Project";
  const indicatorButtons = slides.map((slide, index) => {
    const button = document.createElement("button");
    const previewImage = slide.querySelector("img");
    button.type = "button";
    button.dataset.indexLabel = String(index + 1).padStart(2, "0");
    if (previewImage) {
      button.style.setProperty("--thumb-image", `url("${previewImage.currentSrc || previewImage.src}")`);
    }
    button.addEventListener("click", () => goTo(index));
    dots.append(button);
    return button;
  });

  const syncLabels = () => {
    indicatorButtons.forEach((button, index) => {
      const caption = slides[index].querySelector(".media-caption")?.textContent.trim();
      button.setAttribute("aria-label", `${galleryName} · ${caption || index + 1}`);
    });
  };

  const setActive = (index, withSignal = false) => {
    const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
    const changed = nextIndex !== activeIndex;
    activeIndex = nextIndex;

    slides.forEach((slide, slideIndex) => slide.classList.toggle("is-current", slideIndex === activeIndex));
    indicatorButtons.forEach((button, buttonIndex) => {
      if (buttonIndex === activeIndex) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });

    if (currentLabel) currentLabel.textContent = String(activeIndex + 1).padStart(2, "0");
    if (totalLabel) totalLabel.textContent = String(slides.length).padStart(2, "0");
    if (previousButton) previousButton.disabled = activeIndex === 0;
    if (nextButton) nextButton.disabled = activeIndex === slides.length - 1;

    if (withSignal && changed && !reducedMotion.matches) {
      window.clearTimeout(signalTimer);
      gallery.classList.remove("is-changing");
      requestAnimationFrame(() => gallery.classList.add("is-changing"));
      signalTimer = window.setTimeout(() => gallery.classList.remove("is-changing"), 820);
    }
  };

  function goTo(index) {
    const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
    setActive(nextIndex, true);
    track.scrollTo({
      left: slides[nextIndex].offsetLeft,
      behavior: reducedMotion.matches ? "auto" : "smooth"
    });
  }

  previousButton?.addEventListener("click", () => goTo(activeIndex - 1));
  nextButton?.addEventListener("click", () => goTo(activeIndex + 1));

  track.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") goTo(0);
    else if (event.key === "End") goTo(slides.length - 1);
    else goTo(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
  });

  track.addEventListener(
    "scroll",
    () => {
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const index = slides.reduce((closest, slide, slideIndex) => {
          const currentDistance = Math.abs(slide.offsetLeft - track.scrollLeft);
          const closestDistance = Math.abs(slides[closest].offsetLeft - track.scrollLeft);
          return currentDistance < closestDistance ? slideIndex : closest;
        }, 0);
        setActive(index, index !== activeIndex);
      });
    },
    { passive: true }
  );

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(() => {
      track.scrollLeft = slides[activeIndex].offsetLeft;
    });
    resizeObserver.observe(track);
  }

  setActive(0);
  syncLabels();
  galleryControllers.push({ syncLabels });
}

document.querySelectorAll("[data-gallery]").forEach(setupGallery);

const syncPageVisibility = () => root.classList.toggle("page-hidden", document.hidden);
document.addEventListener("visibilitychange", syncPageVisibility);
syncPageVisibility();

const revealItems = [...document.querySelectorAll(".reveal")];

if (reducedMotion.matches || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const navigationLinks = [...document.querySelectorAll(".site-nav a")];
const navigationSections = navigationLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const navigationObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleEntry) return;

      navigationLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${visibleEntry.target.id}`;
        link.classList.toggle("is-active", isCurrent);
        if (isCurrent) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-22% 0px -62%", threshold: [0.05, 0.2, 0.5] }
  );

  navigationSections.forEach((section) => navigationObserver.observe(section));
}

document.querySelector("#print-resume")?.addEventListener("click", () => window.print());

const yearTarget = document.querySelector("#current-year");
if (yearTarget) yearTarget.textContent = String(new Date().getFullYear());
