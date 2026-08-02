# Week 4 | Hackathon Start Card

## 项目信息

| 字段 | 内容 |
|------|------|
| 项目名称（暂定） | `monad-liq-mvp` |
| 一句话介绍 | 一个运行在 Monad 上的实时清算优化原型，面向 Keeper / Operator 与借款人，做多协议健康因子监控、风险评级与清算交易草稿生成 |
| 目标用户 | 1) Keeper / Operator：快速发现可清算仓位并拿到可签名交易草稿<br>2) 借款人：提前知道仓位会不会爆仓、应该补多少 |
| 想解决的问题 | 当前 keeper 需要自己拼装健康因子查询和清算 calldata，普通借款人只能被动看 Telegram 预警；缺少一个把“监控 → 风险解释 → 处置建议”串起来的链上工具 |

## Demo 计划

**用户可以完成的一个核心动作**：
在 Demo 页面输入一个 Monad 地址，系统返回：
1. 该地址在 Aave / Euler 上的健康因子（HF）
2. 统一风险评级（B / C / D）
3. 如果抵押物再跌 10% / 30%，HF 会变成多少
4. 一条可用的清算交易草稿（to / calldata / 预估利润）

**为什么适合 Monad**：
- Monad 并行执行 + 本地 CLOB（Kuru / Perpl）可以做真实价格校验，不只是读预言机
- 现有 Aave / Euler 已在 Monad 上线，有真实可清算仓位，不需要 mock 协议

**是否使用 Moss**：
否。本 Demo 使用 TypeScript + viem + fetch 直接读链上数据，不引入 `@themoss/abi-tools`，保持轻量。

## 开发范围

| 类别 | 内容 |
|------|------|
| **本次一定要完成** | 1) Aave + Euler 双协议健康因子只读扫描<br>2) Risk Rating（B/C/D）单协议版本<br>3) Stress Test（-10% / -30% 情景）<br>4) 清算交易草稿生成（Aave path 已验证）<br>5) 2 分钟 Demo 录屏 + README |
| **可以使用 Mock / 组件** | 1) AI Explanation：先用规则模板，不接外部 LLM<br>2) CLOB 价格校验：Demo 阶段可先用预言机价格 + 注释说明真实 CLOB 接入点<br>3) Dashboard：保留 CLI / JSON 输出，前端 UI 可选 |
| **本次明确不做什么** | 1) 多链部署（只做 Monad）<br>2) 真实交易广播 / MEV<br>3) 前端钱包集成 / 签名<br>4) Morpho / Curvance 接入（Week 5 假设）<br>5) 外部 AI API 调用 |

## 团队信息

| 成员 | 角色 | 负责 |
|------|------|------|
| TiyaDegurechaff | Researcher | 协议研究、数据验证、Demo 叙事、提交材料撰写 |
| Eflier | Dev | 合约与 API 开发、Euler adapter、主网 e2e、Demo 录屏 |
| 刘力铭 | Risk & Product | Risk Rating 映射、Stress Test 模型、AI Explanation 模板、Deleverage 建议 |

### 下一步最先完成什么？
1. 拿到 Euler 在 Monad 上的 Vault 地址列表，跑通第一个 `getAccountLiquidity` 只读调用
2. 把 Risk Rating / Stress Test 逻辑接到 `api/index.ts`
3. 整理 2 分钟 Demo 脚本：问题 → 方案 → Aave+Euler 双协议交易草稿 → 证据链

### 当前最大风险是什么？
- **Euler Vault 地址未确认**：如果官方地址列表拿不到，Demo 只能用 Aave 单协议，需要提前准备 fallback 叙事
- **外部测试用户不足**：目前只有三人内部验证，缺少 1–2 个外部 keeper / dev 的客观反馈

## 附件

- GitHub Repo：https://github.com/MonadTiya/monad-liq-mvp
- Notion 项目页：`3ab783c80bf38085ab00c85bef31a3a3`
- 学习记录：https://github.com/tiyadegure/monad-builder-camp
- Issues：#8-#14 作为 Week 4 执行看板
