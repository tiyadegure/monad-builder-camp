# Week 3 | Team Formation Card

## 团队名称
Monad Agent Kit

## 团队成员与角色

| 成员 | 角色 | 负责 |
|------|------|------|
| TiyaDegurechaff | Researcher | 协议研究、用户场景分析、竞品叙事、数据验证 |
| Dev | Dev | Moss adapter 开发、链上验证、MCP/CLI 原型、可演示交付 |

## 共同关注的问题
AI-native DeFi interaction layer on Monad：
- 用户如何用自然语言触发可验证的链上交易（stake / unstake / claim）
- 质押 / 借贷 / perps 协议在 Monad 上的机制差异与 Agent 可消费性
- 如何把“协议能力”包装成非技术用户也能理解的入口

## 目前缺少的角色
- Ops / 社区：负责用户测试邀请、反馈整理、对外传播
- 前端 / 产品：负责把 CLI/MCP 能力做成对话界面或 Demo UI

## 我在团队中负责什么（TiyaDegurechaff / Researcher）
- 把 aPriori / Morpho / Hyperliquid 等协议的研究结论整理成 Product Brief
- 验证链上数据（TVL、费率、持仓、selector）并给出风险判断
- 撰写 Hackathon 提交材料中的“问题定义 / 竞品分析 / 用户场景”部分
- 在 Demo 中负责“为什么需要这个产品”的叙事线

## 我在团队中负责什么（Dev / Dev）
- 维护并扩展 `@themoss/protocol-apriori` adapter（PR #104）
- 把 `stake-agent.mjs` 升级为 MCP server，支持自然语言调用
- 补全 `unstake` / `claim` 两条 tool 的端到端验证
- 产出可运行的 CLI / MCP 原型 + 主网 e2e 证据
- 在 Demo 中负责“交易构建 / 链上验证 / 代码证据”演示

## 团队共同交付目标（Week 3 → Hackathon）
- Week 3：定稿 Product Brief + Decision Log + 2 分钟 Demo 脚本
- Week 4：跑通 MCP happy path + 录屏 + 用户测试 + 提交材料打包
- 不追求功能最多，追求“故事最完整”：一个会 stake 1 MON 的 Agent，配上研究叙事和可验证证据链
