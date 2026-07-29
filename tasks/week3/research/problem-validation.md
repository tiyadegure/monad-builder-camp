# Week 3 | 从你的角色验证想法

## 角色
Research Builder

## 检查结果

### 1. 3 条问题证据
1. **借贷 TVL 高但清算工具未跟上**：Aave V3 ≈$247M、Euler V2 ≈$181M、Morpho Blue ≈$128M、Curvance ≈$91M，合计超 $600M；公开几乎找不到 Monad 原生的多协议并行清算引擎。
2. **并行执行 + CLOB 未被清算场景充分利用**：Monad 约 600ms 最终确认、支持非冲突并行，但现有清算 bot 仍是“单协议 + 拼 gas”思路，没有把本地 CLOB（Kuru/Perpl）价格纳入原子执行路径。
3. **用户侧保护工具空白**：DeFi 用户目前靠协议原生预警或 Telegram 监控，缺少亚秒级 deleverage / 补仓 / 部分平仓 的 Agent 可执行入口。

### 2. 12 个相似产品或替代方案
1. Euler liquidation-bot-v3（已支持 Monad，单协议）
2. Aave native keepers（协议原生）
3. Morpho Blue keeper（协议原生）
4. KeeperDAO / Syncus（通用 MEV + 清算）
5. Sorella Labs（Solana 流动性管理 + 清算）
6. marginly（跨保证金清算）
7. DeFi Saver（自动化仓位管理）
8. MakerDAO DSS liquidation module（CDP 清算）
9. Compound III liquidation（直接 liquidation）
10. Notional Finance（固定利率清算）
11. Tetu（清算坏账仓位）
12. Syncrest / Gauntlet（多协议风险管理）

### 3. 一个待验证的问题
多协议并行清算在 Monad 上的实际需求是“真实空白”还是“通用 bot 已足够覆盖”？需要主网清算事件数据 + 3–5 个 Keeper 访谈确认。

## 100 字说明
团队需要先验证 Monad 并行清算的实际需求强度，再决定是做通用监控还是垂直执行层。Notion 调研显示方向成立，但需主网事件数据确认空白规模；如果真实，Week 4 的 Mini Demo 应优先展示“多协议并行监控 + CLOB 价格校验”，而不是完整执行。
