# Week 2 | Product / Protocol Reading Card

## 产品名称
Hyperliquid（HYPE）
链接：https://hyperliquid.xyz

## 解决的问题
1. CEX custody 与流动性碎片化：用户不想把资产托管给 Binance / Bybit，但又要深度和速度。
2. 多链 / 多平台碎片化：perps 在 dYdX（Cosmos），spot 在 Uniswap（Ethereum），资金需要在链间搬移，摩擦成本高。
3. 链上交易体验差：旧 DEX 的 gas 波动、MEV、慢确认让 retail 不愿切换。

## 核心机制
Hyperliquid 不是 EVM L2，而是一条**独立的 L1**，共识、执行、结算全自研：

- **consensus**：HotStuff 风格 BFT + PoS，验证者质押 HYPE，出块时间 ~2s。
- **execution**：Rust 实现的状态机，处理 orderbook、match、settlement，不是 EVM bytecode。
- **DLOB（Dual Limit Order Book）**：同池同价合 perps 和 spot，maker 挂单进入同一簿记，由 L1 统一撮合，没有外包做市商。
- **cross-margin**：账户内 perps + spot + 杠杆共用同一保证金池，不是按市场隔离。
- **funding rate**：由 L1 自动计算，8h 付费一次，维持 perps 与 spot 锚定。
- **HYPE utility**：gas/交易费 + 治理投票 + Builder Code 返佣 + 验证者质押。
- **Builder Code**：长期邀请制返佣计划，最高 10% 手续费返还，不靠预售撑估值。

## 主要用户
- Retail perps 交易者（高杠杆、低滑点）
- 做市商 / market maker（低延迟 API + DLOB 深度）
- HYPE 质押者 / 治理参与者
- Builder / 返佣邀请人

## 12 个关键数据（截至 2026-07-24）
1. **TVL**：$6.10B（DefiLlama 最新日频，2026-07-24）
2. **HYPE price**：$58.6（CoinGecko 最新）
3. **市值**：$13.1B（CoinGecko / DefiLlama 一致）
4. **24h volume**：$369M（CoinGecko，包含 perps + spot 概念口径）
5. **历史 TVL 峰值**：~$5.9B（2025-01 左右，说明当前TVL包含更多spot/杠杆资产口径）
6. **HYPE 总量**：1B，流通 ~30-40%（Builder / 积分 / 生态分批释放）
7. **费率**：maker 0.02% / taker 0.05%（perps）；spot 交易另计
8. **最大杠杆**：最高 50x（BTC/ETH），其他资产 2-20x
9. **Builder Code**：最高 10% 手续费返佣，长期运行
10. **支持资产**：~30+ perps markets + spot BTC/ETH/SOL 等
11. **日活地址**：~5-10k（独立地址，随行情波动）
12. **宕机记录**：自上线以来无重大停机，L1 出块连续

## 一个风险或疑问
- **中心化做市商依赖**：虽然 DLOB 设计上是全链撮合，但当前主要深度仍由少数 OG 做市商提供。极端行情下如果头部做市商同向撤资或策略同质化，spread 可能瞬间扩大。
- **监管与资产上线风险**：perps 在多数司法辖区属于衍生品，HYPE 本身也不是证券型代币的明确合规路径；如果美国 / EU 收紧 perps DEX 监管，协议可能被迫下架某些市场或限制地区访问。

## 与我 Builder 身份的关联
我作为 Hyperliquid Builder Code 持有者，关注的不只是价格，而是：
- **Builder 激励可持续性**：HYPE 释放 + 手续费返佣能否覆盖做市成本
- **Agent / 数据层机会**：Hyperliquid Info API / REST API 能提供 orderbook / trades / funding / open interest，适合做成 Moss 风格的只读 adapter
- **L1 垂直整合 vs EVM 可组合性**：Hyperliquid 选“自研 L1”而不是“Arbitrum/Optimism 部署”，意味着 Agent 要原生理解它的状态机，而不是套 EVM ABI

## 资料来源
1. https://hyperliquid.gitbook.io/hyperliquid-docs（官方文档）
2. https://defillama.com/protocol/hyperliquid（TVL / 市场数据）
3. https://coingecko.com/en/coins/hyperliquid（价格 / 市值 / 24h volume）
4. https://hyperliquid.gitbook.io/hyperliquid-docs/builder-codes（Builder Code 机制）
5. https://docs.hyperliquid.xyz（Info API / REST API 文档）
6. https://hyperliquid.gitbook.io/hyperliquid-docs/markets（perps / spot 机制）
7. https://hyperliquid.gitbook.io/hyperliquid-docs/staking（HYPE 质押 / 验证者）
