# Week 2 | 技术赛道（Tech Track）

本目录收录 Week 2 技术赛道任务 —— 区别于 `research`（纯研究）与 `general`（通用），
技术赛道要求**动手实现最小原型并给出可验证证据**。

## 任务清单

| 任务 | 学分 | 状态 | 产出 |
|------|------|------|------|
| AI-assisted Dev Plan | 20 | 已完成 | [ai-assisted-dev-plan.md](./ai-assisted-dev-plan.md) |
| 文档到代码骨架 | 30 | 已完成 | [doc-to-skeleton.md](./doc-to-skeleton.md) |
| Prototype Evidence | 40 | 已完成 | [prototype-evidence.md](./prototype-evidence.md) |
| Dev Portfolio Pack | 50 | 已完成 | [dev-portfolio-pack.md](./dev-portfolio-pack.md) |

## 主线

四个任务围绕同一个最小原型展开：**AI 质押 Agent**（用户说 "Stake X MON into
aPriori"，Agent 通过 Moss 框架构建指向 aPriori aprMON 金库的正确交易并解析
Receipt）。核心交付物是 `@themoss/protocol-apriori` adapter（PR #104），把 aPriori
的真实合约函数（`deposit` / `requestRedeem` / `redeem`）封装为 Agent 可调用的
Capability。

## 关联

- 代码 PR：https://github.com/nishuzumi/moss/pull/104
- AI Collaboration Log（DAY 14 完整链路）：../daily/2026-07-19.md
- 代码仓库：https://github.com/tiyadegure/monad-builder-camp
