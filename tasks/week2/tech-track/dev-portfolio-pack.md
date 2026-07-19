# Week 2 | Dev Portfolio Pack（aPriori 质押 Agent 原型）

学分：50 · 技术赛道 · 汇总主文档

## 一句话

我想做一个 **AI 质押 Agent**：用户用自然语言说 "Stake X MON into aPriori"，Agent 通过 Moss 框架自动构建指向 aPriori aprMON 金库的正确交易并解析 Receipt，回报用户将获得的 aprMON 数量。本周已把它落地为 Moss 的 `@themoss/protocol-apriori` adapter 并提 PR #104。

---

## 1. 你想做什么

让非技术用户也能用自然语言在 Monad 上参与 aPriori 流动性质押。Agent 不直接碰私钥，只构建并模拟交易，签名交给用户钱包——契合 Moss "先验证后签名" 的安全模型。aPriori 是 native-asset ERC4626 vault + 异步赎回队列，所以原型要暴露 stake / unstake(入队) / claim(领取) 三步。

## 2. 你实际做到了哪一步

| 项 | 状态 |
|----|------|
| adapter 包 `@themoss/protocol-apriori` | ✅ 完成 |
| stake / unstake / claim 三 Capability | ✅ 正确构建链上交易（selector 链上验证） |
| 三 Receipt 解析（Deposit / RequestRedeem / Redeem） | ✅ 单测通过 |
| typecheck / build / 4 单测 | ✅ 全过 |
| 主网 e2e 交易构建 | ✅ 三 verb 全部正确 |
| 主网完整 simulate 零 Warning | ⚠️ deposit 模拟 revert，待确认调用约定 |
| changeset / example / docs 演示 | ⏳ 等 review 后补 |

**关联 PR**：https://github.com/nishuzumi/moss/pull/104（OPEN，非 draft，head `ce7161ce`）

## 3. Week 3 你能继续承担什么开发角色

- **Protocol Adapter 开发**：熟悉 Moss 的 Protocol/Capability/Receipt 抽象与 ADR 0007 链上验证规范，可继续为 Monad 生态协议（Kuru 之外、其他 LST/DEX）写 adapter。
- **链上合约探查**：能用 viem + 4byte.directory + bytecode decode 定位真实合约函数（本次踩坑 EIP-7702 委托合约的经验）。
- **测试与证据整理**：写 Registry/parseReceipt 单测、主网 e2e 验证、整理 Prototype Evidence / Known Issues。

---

## 证明材料链接

- Dev Plan：./ai-assisted-dev-plan.md
- 文档到代码骨架：./doc-to-skeleton.md
- Prototype Evidence：./prototype-evidence.md
- AI Collaboration Log（DAY 14 完整链路）：../daily/2026-07-19.md
- 代码 PR：https://github.com/nishuzumi/moss/pull/104
- GitHub 主页：https://github.com/tiyadegure
- 学习仓库：https://github.com/tiyadegure/monad-builder-camp

## Known Issues（摘要）

主网 `deposit` 模拟 revert（函数存在，卡业务逻辑层：receiver/最小量/白名单待确认）；redeem 数组参数 Moss 暂无支持，MVP 单请求；unstake/claim 主网 simulate 未端到端验证（需真实持仓与已过 unbonding epoch 的 request）。
