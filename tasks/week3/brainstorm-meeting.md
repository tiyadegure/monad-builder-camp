# Week 3 | 团队脑暴会议记录

## 会议时间
2026-07-29（30 分钟）

## 参与成员
- TiyaDegurechaff（Researcher）
- Eflier（Dev）

## 每位成员提出的想法

### TiyaDegurechaff
1. **实时清算优化**：基于 Notion `mvp建议`，做 Monad 多协议并行清算监控 + CLOB 价格校验，输出可清算仓位列表和一筆清算交易草稿。
2. **CLOB 流动性自动化保险库**：利用 Monad 并行执行，在 Kuru/Perpl 上做超细 tick 做市机器人。
3. **用户侧健康因子预警 Agent**：钱包插件或 Telegram bot，实时计算 Aave/Euler/Morpho/Curvance 健康因子，低于阈值自动提醒 deleverage / 补仓。

### Eflier
1. **清算路由 MVP**：基于本地 `monad-liq-mvp` 现有 `LiquidationRouter.sol`，先做 Aave + Euler 的健康因子扫描 + 模拟清算路径，输出交易草稿。
2. **MCP/CLI 可执行层**：把 `monad-liq-mvp` 的 bot 能力封装成 `apriori_*` 风格的 MCP tool，支持自然语言触发“监控可清算仓位 / 生成清算交易”。
3. **前端仪表盘**：Vercel 部署的实时仪表盘，展示当前可清算仓位、历史成功率、预估利润。

## 最终选择的方向
**实时清算优化 — Mini Demo 版**

本周只做：多协议健康因子监控 → 识别可清算仓位 → 生成一笔带 CLOB 价格校验的清算交易草稿。

## 选择它的原因
1. **问题真实**：Notion 调研显示借贷 TVL 超 $600M，但 Monad 原生多协议并行清算工具几乎空白。
2. **团队有能力完成**：`monad-liq-mvp` 已有 `LiquidationRouter.sol` 和 Vercel API 骨架，Dev 侧可直接复用并扩展。
3. **本周可展示**：不依赖真实 keeper 执行，只做“监控 → 识别 → 草稿”的 read-only + 模拟路径，风险可控。
4. **叙事完整**：Researcher 侧可配套输出问题定义 / 竞品分析 / 用户场景，Hackathon 展示时故事线完整。

## 暂时放弃的想法
1. **CLOB 流动性自动化保险库**：太依赖订单簿深度数据和做市策略调优，本周来不及做稳定版。
2. **用户侧健康因子预警 Agent**：属于 P2 增强，Week 4 或后续迭代再做。
3. **前端仪表盘**：P1 再加，本周先保证 CLI/MCP happy path 可演示。

## 下一步行动与负责人

| 行动 | 负责人 | 截止 |
|------|--------|------|
| 把 `monad-liq-mvp` 的 README 对齐 Notion 方向，明确 Mini Demo 范围 | Eflier | Week 3 Day 3 |
| 输出 Problem & Mini Demo Card 最终版 | TiyaDegurechaff | Week 3 Day 3 |
| 跑通 Aave/Euler 健康因子监控 + 一笔示例清算交易草稿 | Eflier | Week 3 Day 5 |
| 补充 2 分钟 Demo 脚本（问题 → 方案 → 交易草稿 → 证据链） | TiyaDegurechaff | Week 3 Day 5 |
| 整理主网 e2e 证据（区块浏览器链接 / RPC 调用记录） | Eflier | Week 3 Day 5 |
