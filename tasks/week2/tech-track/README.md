# Week 2 | 技术赛道（Tech Track）

本目录收录 Week 2 技术赛道任务 —— 区别于 `research`（纯研究）与 `general`（通用），
技术赛道要求**动手实现最小原型并给出可验证证据**。

## 任务清单

| 任务 | 学分 | 状态 | 产出 |
|------|------|------|------|
| AI-assisted Dev Plan | 20 | 已完成 | [ai-assisted-dev-plan.md](./ai-assisted-dev-plan.md) |
| Moss Protocol Adapter（aPriori） | 100 | PR 审核中 | PR #104：https://github.com/nishuzumi/moss/pull/104 |

## 技术赛道主线

本周技术赛道围绕一个最小原型展开：**AI 质押 Agent** —— 用户用自然语言
"Stake X MON into aPriori"，Agent 通过 Moss 框架自动构建指向 aPriori aprMON
金库的正确交易并解析 Receipt。

该原型的核心交付物是 `@themoss/protocol-apriori` adapter（PR #104），它把
aPriori 的真实合约函数（`deposit` / `requestRedeem` / `redeem`）封装为 Agent
可调用的 Capability。AI-assisted Dev Plan 是该原型的计划文档。

## 关联

- 源码：fork `nishuzumi/moss` 分支 `feat/apriori-staking-adapter`
- 学习记录：daily/2026-07-19.md（DAY 14 完整链路）
- 代码仓库：https://github.com/tiyadegure/monad-builder-camp
