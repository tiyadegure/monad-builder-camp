# aPriori 质押 Agent — 项目介绍与用户测试

## 一句话项目介绍

**aPriori 质押 Agent：说一句话，AI 帮你把 MON 质押进 aPriori，不用读文档、不用连钱包点按钮。**

## 项目简介（100–200 字）

aPriori 质押 Agent 是一个最小 AI Agent 原型：你输入"Stake 1 MON into aPriori"，它就通过 Moss 框架自动构建出指向 aPriori aprMON 金库的正确交易，并用链上视图估算你将获得的 aprMON 数量。它面向想参与 Monad 流动性质押但不想手动读合约、连前端的新人。Agent 只负责"读懂意图→构建并模拟交易→解析回执"，不碰私钥，签名广播交还用户钱包（先验证后签名）。当前原型是命令行形态，核心质押流程已真实跑通，退出流程（unstake→claim 异步两步）已在 adapter 层支持。

## 测试邀请文案

想试试"用一句话质押 MON"是什么体验吗？

我们做了一个最小 AI Agent 原型：你输入金额，它就在 Monad 主网上帮你构建出一笔指向 aPriori aprMON 的质押交易，并实时算出你能拿到多少 aprMON——全程不碰你的私钥。

不用装钱包、不用读文档，跑一条命令就能看到 AI 是怎么把"人话"变成链上交易的。

🕒 测试周期：[填写日期范围]
🎯 我们要找 5–10 位 Web3 新人，跑一遍原型、填 3 个反馈问题，约 10 分钟。
👉 测试任务与入口见下。

## 测试任务（让用户完成）

1. 打开项目 README：https://github.com/tiyadegure/monad-builder-camp/tree/main/tasks/week3/dev
2. 按"如何运行"装好依赖（需要 `/tmp/moss` 已构建的 adapter + node_modules）
3. 运行：`node stake-agent.mjs 1`
4. 观察输出：是否看到 `to: 0x0c65...aprMON`、`selector: 0x6e553f65 (deposit)`、`value: 1 MON`、以及"你将获得约 X aprMON"的估算
5. 把输出截图，并试着改一个金额（如 `node stake-agent.mjs 5`）再跑一次

**最低门槛替代方案**：若本地跑不起来，可直接看 README 里的运行截图 `assets/stake-agent-run.png`，照样能完成反馈。

## 反馈问题（3–5 个）

1. 看完输出，你能说清"Agent 到底帮你做了什么"吗？（能 / 大概 / 不能，为什么？）
2. 你觉得"你将获得约 X aprMON"这句回报估算，对你决定是否质押有帮助吗？
3. 作为新人，这个命令行原型最让你困惑或卡住的地方是哪里？（比如看不懂 selector、不知怎么装依赖、想要图形界面）
4. 如果做成网页或聊天界面，你希望怎么和 Agent 对话？（输入框打字 / 按钮选择金额 / 其他）
5. 你愿意在真实钱包里签名这笔由 Agent 构建的交易吗？为什么（信任 / 不信任 / 取决于什么）？

## 项目介绍页草稿（Landing Page 结构）

```
┌─────────────────────────────────────────────┐
│  aPriori 质押 Agent                          │
│  说一句话，AI 帮你质押 MON                    │
│                                              │
│  [输入框] Stake 1 MON into aPriori  [运行]   │
│                                              │
│  ── Agent 返回 ──                            │
│  交易草稿                                    │
│   to: 0x0c65…aprMON (aPriori)               │
│   selector: 0x6e553f65 (deposit)            │
│   value: 1 MON                              │
│  你将获得: ≈0.93 aprMON                      │
│                                              │
│  待你在钱包签名广播（Agent 不碰私钥）        │
│                                              │
│  适合: 不想读合约的 Web3 新人                │
│  技术: Moss 框架 · aPriori aprMON · Monad   │
│  状态: 质押流程已跑通 · 退出两步已支持       │
│                                              │
│  [看原型与运行截图] [读 README]              │
└─────────────────────────────────────────────┘
```

说明：上图为 Landing Page 文本草稿（非真实页面）。核心交互 = 一句话输入 → 交易草稿 + 回报估算，强调"不碰私钥"。
