# Week 4 | Team Card

## 团队名称
Monad Agent Kit

## 一句话项目介绍
`monad-liq-mvp`：一个运行在 Monad 上的实时清算优化原型，面向 Keeper / Operator，做多协议健康因子监控、CLOB 价格校验、风险评级与清算交易草稿生成。

## 团队成员 & 分工

| 成员 | 角色 | 负责 |
|------|------|------|
| TiyaDegurechaff | Researcher | 协议研究、场景定义、竞品叙事、数据验证 |
| Eflier | Dev | 合约开发、链上验证、Bot/MCP 原型、可演示交付 |
| 刘力铭 | Risk & Product | 风险模型、用户侧预警叙事、AI 风险解释、Deleverage 建议 |

## 你们下一步准备做什么？

### 本周（Week 4）
1. 对齐刘力铭补充的风险层：Risk Rating / Stress Test / Liquidation Probability / AI Explanation
2. 把 `monad-liq-mvp` 从 Aave 单协议扩展到 Aave + Euler 双协议
3. 跑通 happy path：监控 → 识别 → 清算交易草稿
4. 整理 2 分钟 Demo 脚本：问题 → 方案 → 交易草稿 → 证据链
5. 更新 `MonadTiya/monad-liq-mvp` README + Issues（#8-#14 已建好）

### Day 5-7
- 用户测试：找 1–2 个外部 operator / dev 跑一遍
- Demo Video 录屏 + Hackathon 提交材料打包
- 如果时间允许，接入第二套风险模型或 Telegram 预警

## 沟通方式
- GitHub Issues / PR：`MonadTiya/monad-liq-mvp`
- Telegram / 微信：日常对齐
- Notion `mvp v1`：产品文档同步
  `3ab783c80bf38085ab00c85bef31a3a3`
