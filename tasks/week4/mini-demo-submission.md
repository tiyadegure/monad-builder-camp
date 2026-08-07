# Week 3 / Week 4 | Team Mini Demo Submission

## 提交材料总览

| 材料 | 类型 | 链接 / 位置 |
|------|------|-------------|
| **项目介绍 + 3 分钟脚本** | 本文档 (Section 2) | `tasks/week4/mini-demo-submission.md` |
| **Repo** | 代码仓库 | Hackathon 项目：https://github.com/MonadTiya/monad-liq-mvp (私有) |
| **学习记录 Repo** | 公开记录 | https://github.com/tiyadegure/monad-builder-camp |
| **Notion 项目页** | 产品文档 | Notion `mvp v1`：`3ab783c80bf38085ab00c85bef31a3a3` |
| **Demo 录屏计划** | 视频计划 | 详见 Section 6 |
| **团队成员与分工** | 人员 | 详见 Section 4 |

> 注：`MonadTiya/monad-liq-mvp` 为团队私有仓库，代码远超 Week 3 日记计划，已在 4 个协议上实现 Liveness 验证 (Aave V3, Morpho Blue, Curvance, Euler EVK read-only)。所有 P0–P2 功能均已实现。学习记录公开在 `github.com/tiyadegure/monad-builder-camp`。

---

## 1. 项目概览 / Problem & Solution

### 我们为谁解决什么问题？

**目标用户（双轨）**：

| 轨道 | 用户 | 痛点 | 我们如何帮 |
|------|------|------|------------|
| **Liquidator 轨** | Keeper / Operator | 手动拼监控 + 风险查询 + 清算 calldata；延迟高、路径不透明 | 输入地址 → 自动返回健康因子 + 风险评级 + 压力测试 + 清算交易草稿 |
| **User 轨** | DeFi 借款人 | 被动接受 Telegram 预警，无法提前知道仓位何时爆仓 | 输入地址 → 获得风险解释 + 压力测试预测 + deleverage 建议 |

**核心问题**：Monad 链上借贷 TVL 超 $600M（Aave ≈$247M、Euler ≈$181M、Morpho ≈$128M、Curvance ≈$91M），但缺少一个把"监控 → 风险解释 → 处置建议"串起来的链上工具。

### 我们的方案

**一行介绍**：一个运行在 Monad 上的实时清算优化原型，面向 Keeper / Operator 与借款人，做多协议健康因子监控、CLOB 价格校验、风险评级与清算交易草稿生成。

**为什么适合 Monad**：
- Monad 并行执行 + 本地 CLOB（Kuru / Perpl）可以做真实价格校验，不只是读预言机
- 现有 Aave / Euler / Morpho / Curvance 已在 Monad 上线，有真实可清算仓位

**Demo 核心动作**：输入一个 Monad 地址，系统返回：
1. 该地址在 Aave / Euler / Morpho / Curvance 上的健康因子（HF）
2. 统一风险评级（超级健康 / 健康 / 关注 / 危险）
3. 如果抵押物再跌 10% / 20% / 30%，HF 会变成多少
4. 一条可用的清算交易草稿（to / selector / value / calldata / 预估利润）

### Live 验证成果

| 协议 | 监控 | 交易 | 验证方式 |
|------|------|------|----------|
| **Aave V3** | ✅ `getUserAccountData` | ✅ `liquidationCall` | 链上 explorer + eth_call |
| **Morpho Blue** | ✅ GraphQL `marketPositions` | ✅ write `repay`/`supplyCollateral`/`withdrawCollateral` | estimateGas 验证 |
| **Curvance** | ✅ `ProtocolReader.getUserData` | ✅ `deposit`/`redeem`/`repayFor` | eth_call + 真实用户数据 |
| **Euler EVK** | ✅ `AccountLens.getAccountEnabledVaultsInfo` | ❌ (read-only, no active borrowers) | ABI decode 验证 |

**关键合约地址（Monad 主网 Chain ID 143）**：
- Aave Pool: `0x69a5F9AD4f96ebf0a0C792dD42a01cC5C0102fef`
- Aave Oracle: `0x0c02b2c2038066C10Eab8fe1D5Cdb73d5a78A1Bf`
- Euler EVC: `0x7a9324E8f270413fa2E458f5831226d99C7477CD`
- Euler AccountLens: `0xA9544d7bD6788c519c1346310A2569bC6C57b245`
- Curvance ProtocolReader: `0x55C7c1fe1DACB014aD3b21951728B5E580662268`
- Kuru MON-USDC market: `0x065C9d28E428A0db40191a54d33d5b7c71a9C394`

---

## 2. 3 分钟项目介绍脚本

### 3-Minute Script（60 秒/30 秒/30 秒 结构 / 共计 180 秒）

#### 0:00–1:00 — 问题定义（What problem & for whom）

> "我们是 **Monad Agent Kit**，三个人的团队。
>
> **问题**：Monad 链上借贷 TVL 超过 $600M（Aave ~$247M、Euler ~$181M、Morpho ~$128M、Curvance ~$91M），但 **目前没有一个把 '监控 → 风险解释 → 处置建议' 串起来的链上工具**。
>
> **谁碰到这个问题**：
> 1. **Keeper / Operator**：他们需要手动拼装健康因子查询 + 清算 calldata，延迟高、路径不透明。
> 2. **DeFi 借款人**：他们只能被动接受 Telegram 预警，无法提前知道什么时候爆仓。
>
> **我们的方案**：`monad-liq-mvp` —— 一个运行在 Monad 上的实时清算优化原型。输入一个地址，就能看到四协议健康因子 + 风险评级 + 压力测试 + 清算交易草稿。"

#### 1:00–2:00 — 本周做出了什么（What we built this week）

> "**本周我们完成了**：
> 1. **团队组建**：从双人队扩展为三人队，加上刘力铭担任 Risk & Product，补上传统金融风控视角。
> 2. **4 协议全面接入**：Aave V3 ✅ LIVE、Morpho Blue ✅ LIVE、Curvance ✅ LIVE、Euler EVK ✅ READ ONLY —— 所有适配器已在主网验证。
> 3. **Risk Rating 引擎**：`src/risk/rating.ts` 实现健康因子到风险等级的映射（超级健康/健康/关注/危险），带单元测试 `tests/risk-rating.test.ts`。
> 4. **Stress Test**：`src/risk/risk-distance.ts` 实现多档压力测试（-10%/-20%/-30%），计算抵押下跌到各风险等级边界的百分比。
> 5. **AI 风险解释**：`src/risk/explanation.ts` 使用确定性模板 (`template-v1` provider) 生成中文风险解释，包含风险等级、压力距离、操作建议。
> 6. **多源价格校验**：Aave oracle + Curvance oracle + Kuru CLOB mid + Pyth/RedStone，中位数聚合 + 偏差阈值校验。
> 7. **LiquidationRouter.sol**：P1 多协议清算路由器，支持 Aave flash loan + 协议间路由。
> 8. **Telegram Bot + Web Dashboard**：实时预警 + 历史成功率仪表盘。
> 9. **Moss PR #104**：aPriori adapter，已合并，证明 Solidity adapter + 主网验证能力。
>
> **Demo 演示**：输入一个 Monad 地址，系统马上返回 Aave 健康因子 1.05，风险等级‘危险’，-30% 压力测试后 HF 降为 0.92，以及一条可直接签名的清算交易草稿。"

#### 2:00–3:00 — 如何使用 + 反馈 + 下一步

> "**如何使用**：访问 Vercel 部署页面，输入任何 Monad 地址，点击扫描。系统自动检查该地址在 Aave/Euler/Morpho/Curvance 上的健康因子、给出风险等级、运行压力测试，并生成清算交易草稿。全程只读，不触碰私钥。Telegram Bot 也可通过 `/hf 0x...` 快速查询。
>
> **收到的反馈**：
> - **刘力铭（Risk & Product）**：提出 '0 清仓率' 叙事，把产品从 '技术向清算' 提升到 '用户可理解的风险管理'。
> - **潜在队友 A（金融 + Web3）**：确认 '多协议统一入口' 需求强烈，是 Monad 早期 '第一个做统一清算工具' 的好机会。
> - **Eflier（Dev）**：强调 Demo 应该聚焦产品叙事而不是代码优雅。
>
> **下一步**：录制 2 分钟 Demo 视频 + 进行外部用户测试 + 提交 Hackathon 材料。"

---

## 3. Demo 使用指南 & 功能状态

### 如何运行 / How to Use the Demo

**方式 1：Vercel 在线体验**
- 访问：Vercel 部署页面
- 输入：任意 Monad 地址
- 输出：4 协议健康因子 + 风险评级 + 压力测试 + 清算交易草稿

**方式 2：本地运行**
```bash
git clone https://github.com/MonadTiya/monad-liq-mvp
cd monad-liq-mvp
npm install
npm run demo          # MODE=demo, 模拟模式
npm run dashboard     # Web 仪表盘 (localhost:8787)
```

**方式 3：API 调用**
```
GET /api/v1/hf/:address          # 单地址健康因子
GET /api/v1/risk/:address         # 风险评级 + 压力测试 + 解释
GET /api/v1/positions             # 可清算职位列表
```

**方式 4：Telegram Bot**
```
/hf 0x...          # 查询健康因子
/risk 0x...        # 风险评级 + 解释
/positions         # 可清算列表
/liq               # 清算建议
```

### 功能完成状态 / Status Dashboard

| 功能 | 状态 | 说明 | 是否 Mock |
|------|------|------|-----------|
| **Aave V3 监控 + 清算草稿** | ✅ 已完成 | `getUserAccountData` + `liquidationCall` 已验证 | — |
| **Morpho Blue 监控 + 清算草稿** | ✅ 已完成 | GraphQL discovery + write `repay`/`supplyCollateral` | — |
| **Curvance 监控 + 清算草稿** | ✅ 已完成 | `ProtocolReader.getUserData` + ERC4626 vault | — |
| **Euler EVK 监控** | ✅ 已完成 | `getAccountEnabledVaultsInfo` (read-only, no active borrowers) | Euler 无活跃借款人 |
| **Risk Rating (超级健康/健康/关注/危险)** | ✅ 已完成 | `src/risk/rating.ts` + `tests/risk-rating.test.ts` | — |
| **Stress Test (-10%/-20%/-30%)** | ✅ 已完成 | `src/risk/risk-distance.ts` 计算抵押下跌到风险边界百分比 | — |
| **AI 风险解释** | ✅ 已完成 | `src/risk/explanation.ts` 使用 deterministic template (`template-v1`) | ✅ 模板非真实 LLM |
| **多源价格校验** | ✅ 已完成 | Aave oracle + Curvance oracle + Kuru CLOB + Pyth/RedStone | — |
| **CLOB 卖出路径** | ✅ 已完成 | `sellCollateralOnKuru`：读 market params + bestBidAsk → placeAndExecuteMarketSell | — |
| **LiquidationRouter.sol** | ✅ 已完成 | P1 路由器，支持 Aave flash loan + 协议间路由 | — |
| **Telegram Bot** | ✅ 已完成 | `/hf` / `/risk` / `/positions` / `/liq` | — |
| **Web Dashboard** | ✅ 已完成 | Express + OpenAPI + 历史成功率 | — |
| **User 保护台** | ✅ 已完成 | `apps/protect/` React + RainbowKit + wagmi | — |
| **Chrome 插件** | ✅ 已完成 | `extensions/monad-liq-guard/` MV3 popup + background alert | — |
| **LaaS (Liquidation-as-a-Service)** | ✅ 已完成 | 租户管理 + 计费 + Webhook + Postgres/JSON 存储 | — |
| **真实交易广播** | ⚠️ 可选 | `EXECUTE_LIVE=false` (dry-run default), 可选 live 模式 | ✅ dry-run 为默认 |
| **前端钱包签名** | ⚠️ 可选 | User 保护台集成 RainbowKit，但 Demo 默认只读 | — |
| **MEV 保护** | ✅ 已完成 | private RPC / simulate / gas bump / jitter / HF recheck | — |
| **批量路径优化 (P2)** | ✅ 已完成 | `priorityScore` 排序 + `MAX_CAPITAL_PER_BATCH_USD` 限流 | — |

---

## 4. 团队成员与分工

### 团队名称
**Monad Agent Kit**

### 成员与分工表

| 成员 | 角色 | 在 Mini Demo 中负责 | 成果/证据 | 未完成或 Mock 内容 |
|------|------|-------------------|-----------|---------------------|
| **TiyaDegurechaff** | Researcher | 协议研究、场景定义、竞品分析、数据验证、Demo 叙事、提交材料 | - `problem-validation.md` (3 证据 + 12 竞品)<br>- `DISCOVERY-REPORT.md` (4 协议地址验证)<br>- `hackathon-start-card.md`<br>- `requirement-check.md`<br>- 主网 Liveness 验证 | — |
| **Eflier** | Dev | 合约开发、链上验证、API 架构、MCP 原型、可演示交付 | - `LiquidationRouter.sol` (P1 flash loan router)<br>- `api/index.ts` (Vercel serverless)<br>- Moss PR #104 (aPriori adapter)<br>- `src/adapters/*` (4 协议适配器)<br>- `stake-agent.mjs` (CLI 原型) | Euler write path (read-only, no active borrowers) |
| **刘力铭** | Risk & Product | 风险模型、用户侧预警叙事、AI 风险解释、Deleverage 建议 | - `src/risk/rating.ts` (Risk Rating 引擎)<br>- `src/risk/risk-distance.ts` (Stress Test)<br>- `src/risk/explanation.ts` (AI 解释模板)<br>- `tests/risk-rating.test.ts` | AI 解释使用模板非 LLM |

### 每位成员的自述

#### TiyaDegurechaff (Researcher)
> **我在 Mini Demo 中负责**：
> - 验证 4 个协议在 Monad 上的真实地址和 TVL（Aave ~$247M、Euler ~$181M、Morpho ~$128M、Curvance ~$91M）
> - 分析 12 个竞品，确认多协议清算优化 + 风险解释是一个真实空白
> - 把 Notion 调研整理成可执行 Issue 看板（#8-#14）
> - 撰写 DISCOVERY-REPORT.md，验证 Aave/Morpho/Curvance/Euler 的读写路径
> - 负责 Demo 叙事：问题 → 方案 → 交易草稿 → 证据链
>
> **证据**：`tasks/week3/problem-validation.md`、`DISCOVERY-REPORT.md`、`tasks/week4/hackathon-start-card.md`

#### Eflier (Dev)
> **我在 Mini Demo 中负责**：
> - 开发 `LiquidationRouter.sol`，P1 多协议清算路由器，支持 Aave flash loan
> - 构建 4 个协议适配器：`src/adapters/aave.ts`、`euler.ts`、`morpho.ts`、`curvance.ts`
> - 实现 `api/index.ts` Vercel serverless 入口，支持 `/api/v1/hf/:address`、`/api/v1/risk/:address`
> - 提交 Moss PR #104（aPriori adapter），证明 Solidity adapter + 主网验证能力
> - 编写 `stake-agent.mjs` CLI 原型，演示 AI Agent → 交易草稿 → 链上验证
> - 实现 Telegram Bot + Web Dashboard + Chrome 插件
>
> **证据**：`LiquidationRouter.sol`、`src/adapters/*`、`api/index.ts`、Moss PR #104
> **Mock/未完成**：Euler write path 为 read-only（因无活跃借款人）；交易广播默认 dry-run (`EXECUTE_LIVE=false`)

#### 刘力铭 (Risk & Product)
> **我在 Mini Demo 中负责**：
> - 设计 Risk Rating 映射：HF → 超级健康/健康/关注/危险（`src/risk/rating.ts`）
> - 实现 Stress Test：计算抵押下跌到各风险等级边界的百分比（`src/risk/risk-distance.ts`）
> - 开发 AI 风险解释：使用确定性模板 (`template-v1` provider) 生成中文解释，包含风险等级 + 压力距离 + 操作建议（`src/risk/explanation.ts`）
> - 提出 '0 清仓率' 叙事，把产品从技术向提升到用户可理解的风险管理
> - 编写单元测试 (`tests/risk-rating.test.ts`)
>
> **证据**：`src/risk/rating.ts`、`src/risk/risk-distance.ts`、`src/risk/explanation.ts`、`tests/risk-rating.test.ts`
> **Mock/未完成**：AI 解释使用规则模板，非真实 LLM（设计为未来可替换的 provider boundary）

---

## 5. 反馈 (Feedback)

### 来自 Week 3 需求检查的反馈

| 交流对象 | 用户类型 | 反馈 |
|----------|----------|------|
| **刘力铭** | 传统金融（固定收益 + 国债期货）+ AI Agent 背景 | 在传统金融风险监控上有直接经验；提出 '可解释性' + 'actionable 建议' 需求；'0 清仓率' 可作为商业化卖点 |
| **潜在队友 A** | 金融 + Web3 探索者，对 RWA 感兴趣 | 确认 '多协议统一入口' 需求强烈；Monad 早期缺少同类工具，是 '第一个做统一清算工具' 的好机会 |
| **Eflier** | Dev | 技术已跑通；Demo 重点应是产品叙事而不是代码优雅 |
| **TiyaDegurechaff** | Researcher | 普通借款人比 Keeper 更可能是付费用户 |

### 来自团队内部的对齐

- **架构决定**：从单线清算 bot 调整为双轨架构（Liquidator 轨 + User 轨），共享同一份扫描结果
- **范围收缩**：Week 4 Demo 聚焦 Aave + Euler 双协议，只求故事完整
- **安全模型**：Demo 默认 dry-run (`EXECUTE_LIVE=false`)，全程不触碰私钥、不广播真实交易
- **团队成长**：从 Week 3 的 3 人需求检查到 Week 4 的 4 协议 Liveness 验证 + P0-P2 全功能实现

---

## 6. Demo 录屏计划

### 录屏内容（2 分钟）

| 时间 | 画面 | 内容 |
|------|------|------|
| 0:00–0:20 | 项目介绍 | 团队名称 + 项目一句话 + 问题定义 |
| 0:20–0:50 | Demo 演示 | 输入 Monad 地址 → 4 协议 HF + 风险评级 + 压力测试 |
| 0:50–1:10 | 清算草稿 | 显示 to / selector / value / calldata / 预估利润 |
| 1:10–1:30 | 风险解释 | AI 风险解释模板输出（中文） |
| 1:30–1:50 | Liveness 证据 | 4 协议主网验证 + DISCOVERY-REPORT |
| 1:50–2:00 | 结束 | 项目名 + GitHub 链接 + Moss PR #104 |

### 录屏方式
- **主要方式**：屏幕录像 — 终端运行 `npm run demo` + 输出 JSON，或 Vercel 部署页面交互
- **Live 验证证据**：展示 DISCOVERY-REPORT.md 中的 4 协议 Liveness 验证结果
- **代码证据**：展示 `src/risk/rating.ts` + `tests/risk-rating.test.ts` 单元测试通过

---

## 7. 下一步计划 (Next Steps)

### 近期（Week 4 Day 10–14）
1. **Demo 录屏**：录制 2 分钟 Demo 视频，包含 4 协议扫描 + 风险解释 + 清算草稿
2. **用户测试**：找 1–2 个外部 operator / dev 跑一遍 Demo，收集反馈
3. **提交材料**：打包 README + 提交说明

### Week 5 远期计划
- Liquidation Probability 算法优化（历史 outcome 窗口聚合）
- AI Agent 自动化风险管理（授权后自动补仓/减仓）
- CLOB 真实订单簿深度聚合（Kuru WS L2 深度）
- Perpl 可选对冲（P2，需 API key enrollment）

---

## 8. 相关链接 & 提交说明

### 相关链接

- **Hackathon 项目 Repo**：https://github.com/MonadTiya/monad-liq-mvp (私有)
- **学习记录 Repo**：https://github.com/tiyadegure/monad-builder-camp (公开)
- **Notion 项目页**：`3ab783c80bf38085ab00c85bef31a3a3`
- **GitHub Issues**：#8-#14（P0/P1/P2 共 7 个）
- **Moss PR #104**：https://github.com/nishuzumi/moss/pull/104
- **Week 4 文档**：`tasks/week4/hackathon-start-card.md` / `requirement-check.md` / `team-card.md`
- **Week 3 文档**：`tasks/week3/`（完整文档体系）
- **Daily Notes**：`daily/2026-07-22.md` ~ `daily/2026-08-07.md`
- **Week 3 Dev 原型**：`tasks/week3/dev/stake-agent.mjs` + `README.md`

### 提交说明 / Submission Notes

- **提交时间**：2026-08-07（Week 3 Mini Demo 提交）
- **提交人**：TiyaDegurechaff（代表团队）
- **提交方式**：团队共同提交一份材料，每位成员在 Section 4 中说明自己完成的工作
- **未完成功能 / Mock 内容**：在 Section 3 的 "功能完成状态" 表格中明确标注 ✅ 已完成 / ⚠️ 可选 / Mock。在 AI 风险解释中注明使用 deterministic template (`template-v1`) 而非真实 LLM；在 Euler 监控中注明为 read-only（因无活跃借款人）；交易广播默认 dry-run。
- **代码证据**：详见 `tasks/week3/dev/`（CLI 原型）、`tasks/week3/dev/README.md`（使用说明）、Moss PR #104（Solidity adapter + 主网验证）、`DISCOVERY-REPORT.md`（4 协议 Liveness 验证）