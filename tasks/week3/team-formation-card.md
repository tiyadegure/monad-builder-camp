# Week 3 | Team Formation Card

## 团队名称
Monad Agent Kit

## 团队成员与角色

| 成员 | 角色 | 负责 |
|------|------|------|
| TiyaDegurechaff | Researcher | 协议研究、场景定义、竞品叙事、数据验证 |
| Eflier | Dev | 合约开发、链上验证、Bot/MCP 原型、可演示交付 |

## 共同关注的问题
Monad 上的实时清算优化与 Agent 可执行 DeFi 层：
- 多协议清算路径优化（Aave / Euler / Morpho / Curvance）
- Monad 并行执行 + 本地 CLOB（Kuru / Perpl）联动
- 如何把“清算 / 健康因子 / 交易执行”包装成可验证、可演示的 Agent 能力

## 目前缺少的角色
- Ops / 社区：负责用户测试邀请、反馈整理、对外传播
- 前端 / 产品：负责把 CLI/MCP 能力做成对话界面或 Demo UI

## 我在团队中负责什么（TiyaDegurechaff / Researcher）
- 把 Notion `调研 / 五个方向` 与 `mvp建议` 整理成可执行 Product Brief
- 验证链上数据（TVL、健康因子、清算事件、CLOB 深度）并给出方向优先级
- 撰写 Hackathon 提交材料中的“问题定义 / 竞品分析 / 用户场景”部分
- 在 Demo 中负责“为什么需要这个产品”的叙事线

## 我在团队中负责什么（Eflier / Dev）
- 维护并迭代 `C:\Users\gg\monad-liq-mvp`（`LiquidationRouter.sol` + Vercel API）
- 把 `monad-liq-mvp` 的能力封装成 MCP server / CLI，支持自然语言调用
- 接入多协议健康因子监控 + 清算模拟 + CLOB 价格校验
- 产出可运行的 CLI / MCP 原型 + 主网 e2e 证据
- 在 Demo 中负责“合约逻辑 / 链上验证 / 代码证据”演示

## 团队共同交付目标（Week 3 → Hackathon）
- Week 3：定稿 Product Brief + Decision Log + 2 分钟 Demo 脚本
- Week 4：跑通 `monad-liq-mvp` happy path + 录屏 + 用户测试 + 提交材料打包
- 不追求功能最多，追求“故事最完整”：一个能在 Monad 上监控并执行优化的清算 Agent，配上研究叙事和可验证证据链
