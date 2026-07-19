# Week 2 | Space 内容设计（Run of Show）

学分：20 · 运营赛道 · 承接任务 10 的 Space 主题

> 重点：内容清晰、有节奏。不写宣传，只设计活动当天的流程与互动。

## 活动标题

**不写一行合约，也能让 AI 帮你质押：用 Moss 在 Monad 上接一个协议**

（副标题：一场给 Web3 新人的 AI × Builder 实战夜）

## 活动简介

一场 60 分钟的 Twitter Space / 小型线上 AMA，用本周真实落地的案例——把 aPriori 的 MON 流动性质押封装成 Moss 的 AI Agent adapter（PR #104）——向 Web3 / AI 新人讲清：协议能力如何被封装成"说一句话就能调用"，以及新人如何沿同一条路径做出自己的第一笔开源贡献。不堆概念，全程以一个真实踩坑案例串起来。

## 活动议程（Run of Show，总计 60 分钟，30–100 人）

| 时间 | 段落 | 内容 | 主持串场要点 |
|------|------|------|--------------|
| 00:00–05:00 | 开场 | 主持人自我介绍 + 嘉宾介绍 + 今晚一句话目标："听完你就能动手接一个协议" | 用"你以为接协议要写 Solidity，其实不用"抛钩子 |
| 05:00–15:00 | 主题分享① | 什么是 AI Agent 框架（Moss）：discover→load→action→simulate 四步，先验证后签名 | 强调"Agent 不碰私钥"，消除安全顾虑 |
| 15:00–30:00 | 主题分享② | 真实案例走查：aPriori adapter 从"假设 stake() 单参"踩坑 → 链上确认 EIP-7702 委托合约 → 按官方文档补全 deposit/requestRedeem/redeem 三步 → 提 PR #104 | 重点讲"踩坑→自查→修正"的方法，而非完美结果 |
| 30:00–40:00 | 互动环节 | 见下"互动设计" | 主持人控场，把答案实时念出来串成讨论 |
| 40:00–52:00 | 圆桌讨论 | 围绕 3–5 个核心问题展开，嘉宾 + 听众连麦 | 每个问题留 2–3 分钟，避免单方面灌输 |
| 52:00–58:00 | 收尾 CTA | 见下"收尾 CTA" + 下一步指引 | 明确"今晚之后你能做什么" |
| 58:00–60:00 | Q&A 收尾 | 自由提问，主持人兜底回答 | 留一个开放口子，欢迎会后继续在仓库 Issue 交流 |

## 3–5 个核心讨论问题

1. **"接一个协议"到底等于什么？** —— 是写合约，还是把已有合约函数封装成 Agent 能调用的能力？新人最大的认知偏差在哪？
2. **当文档说的函数和链上对不上怎么办？** —— 以 aPriori aprMON 是 EIP-7702 委托合约、stake 入口不在表面为例，新人该用什么工具自查（`eth_call` / 4byte.directory / bytecode decode）？
3. **"先验证后签名"对普通用户意味着什么？** —— AI Agent 构建交易但不碰私钥，这如何降低新手被骗/误操作的风险？
4. **新人第一笔开源贡献该从哪切入？** —— 文档/FAQ、还是直接写 adapter？Moss 的 ADR 0007（地址必须链上验证）给了什么约束？
5. **这套方法能套到别的协议吗？** —— Kuru、其他 LST、DEX，MVP 单 Capability → 完善多步骤的节奏是否通用？

## 互动环节设计

**「一句话需求 → 猜函数」现场接龙（10 分钟）**

- 主持人抛出 3 个真实用户意图，听众在聊天区用一句话写出"你觉得该调哪个合约函数"：
  1. "我想把 1 MON 换成 aprMON" → 预期答案：`deposit(uint256 assets, address receiver)` payable
  2. "我想退出质押，但不想立刻等" → 预期答案：`requestRedeem(uint256 shares, address receiver)`
  3. "赎回期过了，我要拿回 MON" → 预期答案：`redeem(uint256[] requestIds, address receiver)`
- 主持人实时念出有代表性的回答，点出"native token 用 msg.value 不用 approve"这类新手易错点
- 目的：把"读文档→写调用"的肌肉记忆现场练一遍，比听讲印象深

## 收尾 CTA（Call To Action）

今晚结束后，观众可做三件事（按门槛从低到高）：

1. **⭐ 给 PR 点个 star / 留个 👍**：https://github.com/nishuzumi/moss/pull/104 （最低门槛，让新人体验"我已参与"）
2. **📝 Fork 跑一遍**：按 `docs/protocol-onboarding.md` 在本地把 Moss 跑起来，复现一场"discover→action"输出（仓库已附运行截图可对照）
3. **🛠 认领一个小任务**：在 Moss Issues 选一个文档/FAQ 或新协议 adapter，沿"MVP→完善"节奏提交你的第一笔 PR；遇到链上验证问题，去 `monad-builder-camp` 的 `tech-track/` 看本次案例怎么查的

配套留档：学习仓库 `tasks/week2/tech-track/`（真实测试 / 主网 e2e / 链上验证证据）作为新人自学手册。

## 提交信息

- 内容设计：tasks/week2/ops/space-run-of-show.md
- 关联主题策划（任务 10）：tasks/week2/ops/space-plan.md
- 真实案例来源：https://github.com/nishuzumi/moss/pull/104
- 学习仓库：https://github.com/tiyadegure/monad-builder-camp
