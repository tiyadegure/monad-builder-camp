# Week 3 | 团队计划

## 团队本周目标
把 `monad-liq-mvp` 从骨架推进到可演示的 Mini Demo：能在 Monad 主网上监控多协议健康因子、识别可清算仓位，并生成一笔带 CLOB 价格校验的清算交易草稿。

## 分工与具体成果

| 要完成的事情 | 负责人 | 具体成果 | 截止 |
|--------------|--------|----------|------|
| 问题定义与竞品分析 | TiyaDegurechaff | Problem & Mini Demo Card 最终版 + 12 个竞品/替代方案对照表 | Day 3 |
| Demo 叙事脚本 | TiyaDegurechaff | 2 分钟 Demo 脚本（问题 → 方案 → 交易草稿 → 证据链） | Day 5 |
| 合约逻辑对齐 | Eflier | `LiquidationRouter.sol` 加上 Aave / Euler / Morpho / Curvance 的 liquidation adapter 接口定义 | Day 3 |
| 健康因子监控 | Eflier | 用 viem 读取 Aave + Euler 主网仓位健康因子，输出可清算地址列表 | Day 4 |
| 清算交易草稿 | Eflier | 基于 `monad-liq-mvp` Vercel API，输出一笔示例清算交易草稿（to / selector / value / calldata / 预估利润） | Day 5 |
| CLOB 价格校验 | Eflier | 接入 Kuru/Perpl 价格或 RedStone/Pyth，给清算草稿补价格校验字段 | Day 5 |
| 主网 e2e 证据 | Eflier | 区块浏览器链接 / RPC 调用记录 / simulate 输出截图 | Day 5 |
| Demo 彩排 | 全队 | 对着 Demo 脚本走一遍，确认交易草稿和叙事能对上 | Day 5 |

## 遇到问题找谁
- 链上数据/协议接口：TiyaDegurechaff 先查文档，查不到一起看 RPC 返回
- 合约/TypeScript 实现：Eflier 先排查，需要协议特定逻辑对齐时一起过
- Demo 叙事/展示顺序：两人对齐，以 Demo 脚本为准

## 本周明确不做的
- 不广播真实交易
- 不碰私钥 / 不做 keeper 自动执行
- 不做 MEV 优化
- 不做前端钱包界面
- 不做 CLOB 实盘下单
