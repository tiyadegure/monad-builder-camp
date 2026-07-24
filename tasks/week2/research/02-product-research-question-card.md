# Week 2｜Product Research Question Card — Morpho 与 Aave 的借贷设计差异

## 研究主题

Morpho 的借贷设计和 Aave 有什么不同？为什么两种模式能同时存在？

## 研究对象

Morpho（https://morpho.org / https://github.com/morpho-org）—— 一个建立在以太坊（及扩展链）上的借贷聚合/优化协议。

## 所属分类

Lending

## 我想回答的问题

1. Morpho 的利率模型、抵押因子、清算逻辑和 Aave 相比有哪些结构性差异？
2. 这些差异对应什么真实的用户行为（借贷双方、资金效率、风险偏好）？
3. 为什么市场需要“另一种借贷协议”，而不是只存在 Aave？

## 为什么这个问题重要

- **用户层面**：借贷用户需要在“资金利用率”和“清算安全”之间做选择；理解两种设计的差异能帮助用户选对工具。
- **资金层面**：Morpho 的“优化 pool”模式试图把 Aave/Compound 的资金利用率再往上推，这会改变同质化竞争格局。
- **产品机会**：如果能把 Morpho 的优化逻辑和 Aave 的流动性深度结合，可能是更优的借贷入口设计——这对 Monad 上的新借贷产品有参考价值。

## 资料边界

本次看：
- Morpho 官方文档（架构/利率模型/风险参数）
- Aave 官方文档（对应章节）
- DefiLlama 上两协议的 TVL / 费用 / 市场占比
- 各自 Forum/Governance 的关键讨论（理解设计意图）
- GitHub README / 核心合约源码（看实现是否真的不同）

本次不看：
- 不做实时链上交易模拟或 gas 对比
- 不深入到具体某市场（如 ETH / USDC）的历史清算事件细节
- 不覆盖 Morpho 的 Blue 模式与深档市场的全部参数校准过程

## 至少 5 个来源

1. Morpho Docs — https://docs.morpho.org
2. Aave Docs — https://docs.aave.com
3. DefiLlama — https://defillama.com/protocols/lending （筛选 Morpho / Aave）
4. Morpho Governance Forum — https://forum.morpho.org
5. Morpho GitHub — https://github.com/morpho-org/morpho
6. Aave Governance — https://governance.aave.com （补充对照）

## 初始假设（查证后）

**假设 1：Morpho 更偏“供给端优化”，Aave 更偏“全市场流动性 + 稳定控制”。**
→ **部分确认。** Morpho 确实把资金利用率放在核心位置，但它不只是“优化现有 pool”，而是把自己定位成一个更底层的 lending primitive：允许任何人无许可创建 immutable market（Blue 可变利率 / Midnight 固定利率）。Aave 则是 curated 市场，资产和风险参数由治理控制。 Morpho 的“优化”体现在市场创建层，Aave 的“稳定”体现在治理统一管控。

**假设 2：Morpho 的风险参数更依赖动态调整，Aave 更静态。**
→ **反转。** 实际更接近相反：Morpho 的 Blue/Midnight 市场一旦部署是 immutable 的，参数不可后改；Aave 的 reserve factor、LTV、liquidation threshold 等可通过 Pool Configurator 和治理动态调整。 Morpho 把“不可篡改”当作风险控制手段，Aave 把“可调参数”当作风控手段。

**假设 3：两者共存不是因为“谁更好”，而是服务不同偏好的用户。**
→ **确认，但需要补充。** 用户分层是原因之一，但更核心的是产品形态不同：Morpho 同时提供可变利率（Blue）和固定利率（Midnight），且允许无许可创建市场；Aave 只提供可变利率、资产由治理 curation。切换成本存在，但不是共存的主因——主因是它们满足了不同的市场需求（长尾/定制化 vs 流动性深度/安全性）。

## 不确定点（查证后）

1. **Morpho 的利率模型到底完全复用底层，还是自研了叠加层？**
   → **已部分确认。** Morpho Blue 的利率模型文档明确写了“Dynamic interest rates based on market conditions”，但具体曲线函数是否与 Aave 的 same utilization curve 一致，还需要看 Interest Rate Model 页面的数学定义。目前可确认：它不是简单复用 Aave 的利率策略合约，而是自研了一套模型（文档单独列章）。

2. **极端行情下 Morpho 的清算路径是否真的比 Aave 更优/更差？**
   → **仍未解。** 两边文档都确认有基于 LTV 的清算机制，但 Morpho 的清算人是开放竞争还是专户？清算激励、延迟、坏账处理（bad debt）是否有差异，文档未直接对比。需要看具体市场参数或第三方研究。

3. **“为什么能共存”究竟是用户分层，还是流动性网络效应导致的切换成本？**
   → **已收敛为“产品形态差异优先”。** 用户分层是结果，不是原因。真正的原因是 Morpho 提供了 Aave 不做的两件事：固定利率市场 + 无许可创建市场。只要这两件事有真实需求，两者就会继续共存，与网络效应无关。
