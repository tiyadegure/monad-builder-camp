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

## 初始假设

我现在猜测：
- Morpho 更偏“供给端优化”（把资金利用率打满），Aave 更偏“全市场流动性 + 稳定控制”。
- Morpho 的风险参数可能更依赖动态调整，Aave 的风险框架更静态、可预期。
- 两者能共存的原因不是“谁更好”，而是服务了不同风险/效率偏好的用户。

## 不确定点

- Morpho 的利率模型到底是完全复用了底层（Aave/Compound）还是自研了叠加层？
- 在极端行情下，Morpho 的清算路径是否真的比 Aave 更优/更差？
- “为什么能共存”究竟是用户分层，还是流动性网络效应导致的切换成本？
