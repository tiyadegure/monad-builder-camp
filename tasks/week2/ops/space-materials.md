# 活动运营物料：用 Moss 在 Monad 上接一个协议（Space 实战夜）

## 活动标题

**不写一行合约，也能让 AI 帮你质押：用 Moss 在 Monad 上接一个协议**

一场给 Web3 新人的 AI × Builder 实战夜 · Twitter Space

## 活动宣传文案（完整版，用于预告帖 / 活动页正文）

你以为"接一个链上协议"要先学 Solidity、先懂合约？

其实不用。

这场 60 分钟 Space，我们用一个**真实、已提交的案例**告诉你：怎么把一个协议封装成"说一句话 AI 就能帮你调用"的能力。

案例就是本周刚提交的 aPriori 质押 adapter（PR #104）——把 MON 流动性质押封装进 Moss 这个 AI Agent 框架。我们会现场走查它怎么从"以为 stake() 就行"踩坑，到链上确认 aprMON 是个 EIP-7702 委托合约，最后按官方文档补全 deposit / requestRedeem / redeem 三步、成功提 PR。

你会带走三件事：
1. 搞清楚"AI Agent 接协议"到底等于什么——不是写合约，是把已有函数封装成能力。
2. 学会当文档说的函数和链上对不上时，怎么用 eth_call / 4byte.directory 自己查。
3. 拿到一条新人能直接套的"第一笔开源贡献"路径（MVP 单 Capability → 完善多步骤）。

适合谁：被"先学 Solidity"劝退的 Web3 新人、有 AI/前端背景想用 Agent 框架参与链上的 builder、以及所有对 Monad / aPriori 好奇的人。

时间：[活动日期] ［UTC］
平台：Twitter Space
时长：60 分钟

## 报名页 / 活动介绍（简短版）

**🎙 不写一行合约，也能让 AI 帮你质押**

一场 60 分钟 Twitter Space，用真实案例讲清：AI Agent 框架如何把链上协议封装成"说一句话就能调用"的能力。

- 主题：用 Moss 在 Monad 上接 aPriori 质押协议
- 案例：aPriori adapter PR #104（已提交）
- 内容：Agent 框架四步（discover→load→action→simulate）、真实踩坑走查、现场"猜函数"互动
- 时长：60 分钟 ｜ 规模：30–100 人 ｜ 平台：Twitter Space
- 适合：Web3 新人 / AI builder / Monad 关注者

点开提醒，开场不错过 👇

## 开场前提醒文案（活动前 2 小时 / 前 10 分钟）

**前 2 小时：**
还有 2 小时，「不写一行合约，也能让 AI 帮你质押」Space 就要开始了 🎙
我们用真实提交的 aPriori adapter（PR #104）案例，讲清 AI Agent 怎么把链上协议变成"说一句话就能调用"。
设了提醒的准时来，没设的现在点 👉 [Space 链接]

**前 10 分钟：**
10 分钟后开场 🎙 今晚不聊虚的，全程一个真实踩坑案例：aprMON 其实是 EIP-7702 委托合约，stake 入口不在表面，我们怎么查出来的。
点进来 👉 [Space 链接]

## 收尾 CTA（参与后的下一步行动）

听完了，接下来三步（门槛从低到高）：

1. **⭐ 点个 star**：给 aPriori adapter PR #104 点个 star，先体验"我已经参与"——https://github.com/nishuzumi/moss/pull/104
2. **📝 跑一遍**：按 Moss 的 `docs/protocol-onboarding.md` 在本地把框架跑起来，复现一次 discover→action 输出（仓库里有运行截图可对照）。
3. **🛠 认领小任务**：去 Moss Issues 选一个文档 / FAQ，或挑一个新协议写 adapter，沿"MVP→完善"节奏提你的第一笔 PR。链上验证卡住了，看 `monad-builder-camp` 的 `tech-track/` 案例怎么查的。

自学手册：学习仓库 `tasks/week2/tech-track/`（真实测试 / 主网 e2e / 链上验证证据）。
