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

## 汇总证据页（HTML，GitHub 直接渲染）

- **[evidence.html](./evidence.html)** —— 四个任务的合并证据页：MVP→完善时间线、真实测试/e2e 输出、链上验证、关键代码、Known Issues、Week 3 角色。Kami 风格，自包含。

## 主线（MVP → 完善）

四个任务围绕同一个最小原型：**AI 质押 Agent**（用户说 "Stake X MON into
aPriori"，Agent 通过 Moss 框架构建指向 aPriori aprMON 金库的正确交易并解析
Receipt）。核心交付物是 `@themoss/protocol-apriori` adapter（PR #104）。

- **MVP**：单 stake Capability 跑通 discover/load/action 架构闭环
- **完善**：按 aPriori 官方文档补全 stake/unstake/claim 三步骤 + 链上验证三函数 selector + 4 单测 + 主网 e2e + changeset

## 关联

- 代码 PR：https://github.com/nishuzumi/moss/pull/104
- AI Collaboration Log（DAY 14 完整链路）：../daily/2026-07-19.md
- 代码仓库：https://github.com/tiyadegure/monad-builder-camp
