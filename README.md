# Monad Builder Camp — Learning Journal

Web3 暑期实习计划 · Monad Builder Camp（2026.7.6 — 8.7）

## About

记录从 Web3 入门到 Monad 链上产品交付的完整学习过程。

**方向：** Dev + Ops（Research 基础）
**平台：** [Web3 Career Build](https://web3career.build/zh/programs/Web3-Summer-Intership-Progra)

## Week 1 Mini Demo

**MessageBoard — 链上留言板**

| 项目 | 值 |
|------|-----|
| 合约地址 | [`0x5e99f144D3e512f525d24077D4626a064899E177`](https://testnet.monadvision.com/address/0x5e99f144D3e512f525d24077D4626a064899E177) |
| 网络 | Monad Testnet (Chain ID 10143) |
| 部署 tx | [`0x705c92ad...c13c9612`](https://testnet.monadvision.com/tx/0x705c92ad022293ea3090b49e293d1556ee8d2e902757c696f123f37cf13c9612) |
| 交互 tx | [`0x5cc8bc7b...61d00b2`](https://testnet.monadvision.com/tx/0x5cc8bc7b93056fe97417385fbce51fa3dd2d409bd493a6964674f45fd61d00b2) |

**流程：** Prompt → AI 生成合约 → 人工审查修改 → 编译 → 部署 → read/write 交互 → 浏览器验证

**人工修改：** `public` → `private`、`NewMessage` → `MessagePosted`、删除多余函数

## Structure

```
daily/          ← 每日学习记录
tasks/          ← 按周组织的课程任务完成记录
  week1/        ← 链上世界、测试网交易、AI 合约开发、Research
  week2/        ← Research / Tech Track / Ops / Challenge
    general/    ← 职业选择基础任务（通用）
    research/   ← 研究向任务（MIP Reading 等）
    tech-track/ ← AI-assisted Dev Plan / 文档到骨架 / Prototype Evidence / Dev Portfolio Pack
    ops/        ← Space 策划案 / Run of Show / 执行预案 / 运营物料 / Ops Case Study
    challenge/  ← Moss 教程 / GitHub 协作 / aPriori adapter / PR #104
  week3/        ← Co-build & Mini Demo
    dev/        ← aPriori 质押 Agent CLI 原型
contracts/      ← Solidity 合约代码
notes/          ← 课程笔记、技术要点
```

## Timeline

| Week | 主题 | 产出 |
|------|------|------|
| 1 | 共同底座 — Enter Onchain World | 钱包、交易、AI 合约、部署、Research |
| 2 | Research / Tech Track / Ops / Challenge | 生态分析、产品判断、赛道研究、Moss adapter PR #104 |
| 3 | Collaboration & Mini Demo | 组队、Product Brief、Decision Log、aPriori Agent 原型 |
| 4 | Monad Hackathon Week | 可运行产品、Demo Video |
| 5 | 作品集 Workshop | Portfolio、简历 |

## Week 2 任务完成

### General
- Role Choice Card → `tasks/week2/general/01-role-choice-card.md`
- Role Log → `tasks/week2/general/02-role-log.md`
- AI Collaboration Log → `tasks/week2/general/03-ai-collaboration-log.md`
- Week 3 Role Statement → `tasks/week2/general/04-week3-role-statement.md`

### Research
- MIP-9 Reading Card → `tasks/week2/research/01-mip9-reading-card.md`

### Tech Track
- AI-assisted Dev Plan → `tasks/week2/tech-track/ai-assisted-dev-plan.md`
- 文档到骨架 → `tasks/week2/tech-track/doc-to-skeleton.md`
- Prototype Evidence → `tasks/week2/tech-track/prototype-evidence.md`
- Dev Portfolio Pack → `tasks/week2/tech-track/dev-portfolio-pack.md`

### Ops
- Space 策划案 → `tasks/week2/ops/space-plan.md`
- Space Run of Show → `tasks/week2/ops/space-run-of-show.md`
- 活动执行预案 → `tasks/week2/ops/space-exec-plan.md`
- 活动上线前物料 → `tasks/week2/ops/space-materials.md`
- Ops Case Study → `tasks/week2/ops/ops-case-study.md`

### Challenge
- Moss 教程阅读 → `tasks/week2/challenge/moss-reading.md`
- Moss 教程实战化 → `tasks/week2/challenge/moss-tutorial.md`
- Moss 介绍文章 → `tasks/week2/challenge/moss-intro-article.md`
- Moss 贡献计划 → `tasks/week2/challenge/moss-contribution-plan.md`
- GitHub 探索 → `tasks/week2/challenge/github-exploration-log.md`
- GitHub 协作 PR #88 → `tasks/week2/challenge/github-collaboration-pr88.md`
- aPriori Adapter PR #104 → `tasks/week2/challenge/moss-adapter-apriori.md`
- 贡献日志 → `tasks/week2/challenge/contribution-log.md`

## Week 3 任务完成

- aPriori 质押 Agent CLI 原型 → `tasks/week3/dev/stake-agent.mjs` + `tasks/week3/dev/README.md`
- Day 15 Builder Profile + 60秒自我介绍 + 组队清单 → `daily/2026-07-20.md`
- Day 16 CLI 原型 + Week 3 Dev README → `daily/2026-07-21.md`
- Day 17 Co-build 交付链骨架 + Product Brief + Decision Log + Stand-up → `daily/2026-07-22.md`
- Day 18 PR #104 修订版收口 + Hackathon 交付检查 → `daily/2026-07-23.md`

## Links

- [Web3 Career Build 个人主页](https://web3career.build)
- [Monad](https://monad.xyz)
- [Monad Docs](https://docs.monad.xyz)
- [Moss Framework](https://github.com/nishuzumi/moss)
- [aPriori](https://apriori.monad.xyz)
