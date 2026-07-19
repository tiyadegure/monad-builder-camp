# Week 2 | 技术赛道（Tech Track）

本目录只收录技术赛道任务 **AI-assisted Dev Plan**。区别于 `research`（纯研究）与
`general`（通用），技术赛道要求动手实现最小原型并给出可验证证据。

## 任务

| 任务 | 学分 | 状态 | 产出 |
|------|------|------|------|
| AI-assisted Dev Plan | 20 | 已完成 | [ai-assisted-dev-plan.md](./ai-assisted-dev-plan.md) |

## 说明

本任务定义一个最小 Web3 / AI 原型：用户说 "Stake X MON into aPriori"，AI Agent
通过 Moss 框架自动构建指向 aPriori aprMON 金库的正确交易并解析 Receipt。其关联
实现（Moss aPriori adapter，PR #104）记录在 `../challenge/moss-adapter-apriori.md`，
不重复归入本目录。

- 学习记录：../daily/2026-07-19.md（DAY 14 完整链路）
- 代码仓库：https://github.com/tiyadegure/monad-builder-camp
