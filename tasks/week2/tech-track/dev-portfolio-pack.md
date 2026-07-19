# Week 2 | Dev Portfolio Pack（aPriori 质押 Agent 原型）

学分：50 · 技术赛道 · 汇总主文档

> 让人看懂三件事：**想做什么 → 做到哪一步 → Week 3 能承担什么**。

## 一句话

我想做一个 **AI 质押 Agent**：用户用自然语言说 "Stake X MON into aPriori"，Agent 通过 Moss 框架自动构建指向 aPriori aprMON 金库的正确交易并解析 Receipt，回报用户将获得的 aprMON 数量。本周已落地为 Moss 的 `@themoss/protocol-apriori` adapter 并提 PR #104。

---

## 1. 你想做什么

让非技术用户也能用自然语言在 Monad 上参与 aPriori 流动性质押。Agent 不直接碰私钥，只构建并模拟交易，签名交给用户钱包——契合 Moss "先验证后签名" 的安全模型。aPriori 是 native-asset ERC4626 vault + 异步赎回队列，所以原型暴露 stake / unstake(入队) / claim(领取) 三步。

## 2. 你实际做到了哪一步（MVP → 完善）

**MVP（先跑通架构闭环）：**
- 创建 `@themoss/protocol-apriori` 包骨架（package.json / tsconfig / vitest）
- 单 `stake` Capability + `stakeReceipt`，`discover/load/action` 能构建交易
- 链上验证 aprMON 地址存在
- 卡点：主网 `deposit` 模拟 revert（误用 `stake()` 单参）

**完善（按官方文档修正）：**
- 确认 aPriori 是 native-asset ERC4626 vault + 异步赎回，扩展为 **stake / unstake / claim 三 Capability**
- 链上验证三函数 selector：`deposit 0x6e553f65`、`requestRedeem 0x107703ab`、`redeem 0x492e47d2`
- 三个 Receipt parser（Deposit / RequestRedeem / Redeem 事件）
- typecheck / build / **4 单测** / 主网 e2e 三笔交易构建全过

| 项 | MVP | 完善 |
|----|-----|------|
| Capability 数 | 1 (stake) | 3 (stake/unstake/claim) |
| 函数签名 | 错误(stake()) | 正确(deposit/requestRedeem/redeem) |
| 链上验证 | 地址 | 地址+三 selector+EIP-7702 委托关系 |
| 测试 | 1 | 4 |
| 主网 e2e | revert | 构建正确(selector 一致) |

**关联 PR**：https://github.com/nishuzumi/moss/pull/104（OPEN，非 draft，head `ce7161ce`）

## 3. Week 3 你能继续承担什么开发角色

按"想做 / 做到哪 / 能承担"拆细，Week 3 可独立认领以下角色：

**A. Protocol Adapter 开发者（主力）**
- 已交付 aPriori adapter（PR #104），熟悉 Moss 的 `@Protocol` / `@Capability` / `@Receipt` 抽象与 ADR 0007 链上验证规范
- Week 3 可继续为 Monad 生态未接入的协议写 adapter（如其他 LST、DEX、借贷），每个按"MVP 单 Capability → 完善多步骤 + 链上验证"推进

**B. 链上合约探查（支撑角色）**
- 已踩坑并解决 EIP-7702 委托合约的探查（decode bytecode + 4byte.directory + eth_call 定位真实函数）
- 可为团队其他 adapter 做"合约函数签名确认"前置，减少主网 simulate revert 的卡点

**C. 测试与证据整理（质量保障）**
- 写 Registry / parseReceipt 单测、主网 e2e 验证脚本
- 整理 Prototype Evidence / Known Issues / changeset，确保 PR 通过 CI 与 review

**D. 中文文档（生态拓展）**
- 已提 Moss 中文 FAQ（PR #88），可继续补中文 onboarding / adapter 编写指南，降低非英语贡献者门槛

**认领优先级建议**：A > C > B > D（以代码贡献为主，文档为辅）。

---

## AI Collaboration Log（DAY 14 摘要）

完整记录见 `../daily/2026-07-19.md`。关键节点：
1. 假设 aprMON 是 stake 入口 → 主网 deposit revert
2. 链上 decode 发现 aprMON 是 EIP-7702 委托合约，逻辑在 `0x29fc...c762`
3. 重新核 aPriori 官方文档，确认 `deposit(uint256,address)` payable + 异步赎回
4. 修正 adapter 为三步骤，selector 链上验证，提 PR #104

## Known Issues（摘要）

- 主网 `deposit` 模拟 revert（函数存在，卡业务逻辑层：receiver/最小量/白名单待确认）
- redeem 数组参数 Moss 暂无支持，MVP/完善阶段单请求
- unstake/claim 主网 simulate 未端到端验证（需真实持仓与已过 unbonding epoch 的 request）

## 证明材料链接

- Dev Plan：./ai-assisted-dev-plan.md
- 文档到代码骨架：./doc-to-skeleton.md
- Prototype Evidence：./prototype-evidence.md
- AI Collaboration Log（DAY 14）：../daily/2026-07-19.md
- 代码 PR：https://github.com/nishuzumi/moss/pull/104
- GitHub 主页：https://github.com/tiyadegure
- 学习仓库：https://github.com/tiyadegure/monad-builder-camp
