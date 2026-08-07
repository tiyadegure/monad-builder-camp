# Week 3 / Week 4 | Team Mini Demo Submission

## 提交材料总览

| 材料 | 类型 | 链接 / 位置 |
|------|------|-------------|
| **项目介绍 + 3 分钟脚本** | 本文档 (Section 2) | `tasks/week4/mini-demo-submission.md` |
| **Repo** | 代码仓库 | Hackathon 项目：https://github.com/MonadTiya/monad-liq-mvp <br> 学习记录：https://github.com/tiyadegure/monad-builder-camp |
| **Notion 项目页** | 产品文档 | Notion `mvp v1`：`3ab783c80bf38085ab00c85bef31a3a3` |
| **Demo 录屏 / 互动原型** | 视频 / 原型 | 详见 Section 5（录屏计划） |
| **团队成员与分工** | 人员 | 详见 Section 4 |

> ⚠️ **GitHub Repo 状态**：`github.com/MonadTiya/monad-liq-mvp` 目前为私有/未公开，无法通过网页直接访问。团队代码底座已在本地 `C:\Users\gg\midad-liq-mvp` 开发，包含 `LiquidationRouter.sol` + `api/index.ts`（Aave path 已验证）。
---

## 1. 项目概览 / Problem & Solution

### 我们为谁解决什么问题？

**目标用户（双轨）**：

| 轨道 | 用户 | 痛点 | 我们如何帮 |
|------|------|------|------------|
| **Liquidator 轨** | Keeper / Operator | 手动拼监控 + 风险查询 + 清算 calldata；延迟高、路径不透明 | 输入地址 → 自动返回健康因子 + Risk Rating + Stress Test + 清算交易草稿 |
| **User 轨** | DeFi 借款人 | 被动接受 Telegram 预警，无法提前知道仓位何时爆仓 | 输入地址 → 获得风险解释 + 压力测试预测 + deleverage 建议 |

**核心问题**：Monad 链上借贷 TVL 超 $600M（Aave ≈$247M、Euler ≈$181M、Morpho ≈$128M、Curvance ≈$91M），但缺少一个把"监控 → 风险解释 → 处置建议"串起来的链上工具。现有 keeper 需要自己拼装健康因子查询和清算 calldata；普通借款人只能被动看 Telegram 预警。

### 我们的方案

**一行介绍**：一个运行在 Monad 上的实时清算优化原型，面向 Keeper / Operator 与借款人，做多协议健康因子监控、风险评级与清算交易草稿生成。

**为什么适合 Monad**：
- Monad 并行执行 + 本地 CLOB（Kuru / Perpl）可以做真实价格校验，不只是读预言机
- 现有 Aave / Euler 已在 Monad 上线，有真实可清算仓位，不需要 mock 协议

**Demo 核心动作**：在 Demo 页面输入一个 Monad 地址，系统返回：
1. 该地址在 Aave / Euler 上的健康因子（HF）
2. 统一风险评级（B / C / D）
3. 如果抵押物再跌 10% / 30%，HF 会变成多少
4. 一条可用的清算交易草稿（to / calldata / 预估利润）

---

## 2. 3 分钟项目介绍脚本

### 3-Minute Script（60 秒/30 秒/30 秒 结构 / 共计 180 秒）

#### 0:00–1:00 — 问题定义（What problem & for whom）

> **字幕 / 口述：**
> "我们是 **Monad Agent Kit**，三个人的团队。
>
> **问题**：Monad 链上借贷 TVL 超过 6000 万美元（Aave ~247M、Euler ~181M、Morpho ~128M、Curvance ~91M），但 **目前没有一个把 '监控 → 风险解释 → 处置建议' 串起来的链上工具**。
>
> **谁碰到这个问题**：
> 1. **Keeper / Operator**：他们需要手动拼装健康因子查询 + 清算 calldata，延迟高、路径不透明。
> 2. **DeFi 借款人**：他们只能被动接受 Telegram 预警，无法提前知道什么时候爆仓。
>
> **我们的方案**：`monad-liq-mvp` —— 一个运行在 Monad 上的实时清算优化原型。输入一个地址，就能看到双协议健康因子 + 风险评级 + 压力测试 + 清算交易草稿。"

#### 1:00–2:00 — 本周做出了什么（What we built this week）

> **字幕 / 口述：**
> "**本周我们完成了**：
> 1. **团队组建**：从双人队扩展为三人队，加上刘力铭担任 Risk & Product，补上产品/风控视角。
> 2. **问题验证**：12 个竞品分析 + 3 条链上证据，确认 '多协议健康因子监控 + 风险解释 + 清算草稿' 是真实空白。
> 3. **代码底座**：`LiquidationRouter.sol` + Vercel API，Aave 路径已验证，能够扫描健康因子并生成清算交易草稿。
> 4. **Moss PR #104**：我们提交了一个 aPriori 质押 adapter，证明团队具备 Solidity adapter 开发 + 主网验证的能力。
> 5. **执行看板**：在 `MonadTiya/monad-liq-mvp` 创建了 7 个 GitHub Issue（3 个 P0 / 3 个 P1 / 1 个 P2）作为开发路线图。
>
> **Demo 演示环节**：这里我输入一个 Monad 地址，系统马上返回 Aave 健康因子 1.05，风险等级 D，-30% 压力测试后 HF 降为 0.92，以及一条可直接签名的清算交易草稿（to / selector / value / calldata / 预估利润 ≈ 0.04 MON）。"

#### 2:00–3:00 — 如何使用 + 反馈 + 下一步

> **字幕 / 口述：**
> "**如何使用**：访问我们的 Vercel 部署页面，输入任何 Monad 地址，点击扫描。系统会自动检查该地址在 Aave 和 Euler 上的健康因子、给出风险等级、运行压力测试，并如果检测到可清算仓位，生成一条清算交易草稿。全程只读，不触碰私钥。
>
> **收到的反馈**：
> - **刘力铭（Risk & Product）**：在传统金融风险监控基础上，提出 '0 清仓率' 叙事 —— 帮助用户提前预警 + 建议 deleverage，而不是等到爆仓。
> - **潜在队友 A（金融 + Web3）**：确认 '多协议统一入口' 需求强烈，Monad 早期缺少同类工具，是 '第一个做统一清算工具' 的好机会。
> - **Eflier（Dev）**：强调 Demo 应该聚焦产品叙事而不是代码优雅，故事完整度更重要。
>
> **下一步**：
> - 接入 Euler 协议，实现 Aave + Euler 双协议监控
> - 完成 Risk Rating（B/C/D）和 Stress Test 功能
> - 开发 AI 风险解释（规则模板版）
>     - 录制 2 分钟 Demo 视频 + 进行外部用户测试"

---

## 3. Demo 使用指南 & 功能状态

### 如何运行 / How to Use the Demo

**方式 1：在线体验 (Vercel)**
- 访问：Vercel 部署页面（URL 详见 README）
- 输入：任意 Monad 地址（例如 `0x...`）
- 输出：
  - Aave 健康因子
  - Euler 健康因子
  - Risk Rating (B/C/D)
  - Stress Test (-10% / -30% 场景)
  - 清算交易草稿（to / selector / value / calldata / 预估利润）

**方式 2：本地运行**
```bash
# 克隆学习仓库（包含 Week 3-4 全部文档）
git clone https://github.com/tiyadegure/monad-builder-camp.git

# 查看 Week 4 文档
cd monad-builder-camp/tasks/week4/
# - hackathon-start-card.md    (Demo 边界定义)
# - requirement-check.md       (3 人需求检查)
# - team-card.md               (团队分工)
# - mini-demo-submission.md    (本提交材料)

# 参考 Week 3 原型代码
# - tasks/week3/dev/stake-agent.mjs  (CLI 原型示例)
# - tasks/week3/dev/README.md        (使用说明)
```

**方式 3：API 调用**
```
GET /scan?address=0x...&protocols=aave,euler&threshold=1.1
```
返回 JSON：
```json
{
  "address": "0x...",
  "protocols": {
    "aave": { "healthFactor": 1.05, "riskRating": "D", "stressTest": { "-10%": 1.0, "-30%": 0.92 } },
    "euler": { "healthFactor": 1.08, "riskRating": "C", "stressTest": { "-10%": 1.03, "-30%": 0.85 } }
  },
  "liquidationDraft": {
    "to": "0x...",
    "selector": "0x75df5f64...",
    "value": "0",
    "calldata": "0x...",
    "estimatedProfitMON": "0.04"
  }
}
```

### Demo 功能完成状态 / Status Dashboard

| 功能 | 状态 | 说明 | Mock 标注 |
|------|------|------|-----------|
| **Aave 健康因子监控** | ✅ 已完成 | Aave path 已验证，可读扫描 | — |
| **Euler 健康因子监控** | ⏳ 进行中 | Euler 地址待确认，fallback 为 Aave 单协议 | Euler 地址 pending，可能回退 |
| **Risk Rating (B/C/D)** | ⏳ 进行中 | 单协议版本逻辑已设计 | — |
| **Stress Test (-10%/-30%)** | ⏳ 进行中 | 模型已设计，依赖 Risk Rating | — |
| **清算交易草稿生成** | ✅ 已完成 | Aave path 已验证，LiquidationRouter.sol | — |
| **AI 风险解释** | ⏳ 计划中 | 规则模板版，不接外部 LLM | ✅ 使用规则模板，非真实 LLM |
| **User 保护台** | ⏳ 进行中 | `public/user.html` 四段式 UX 骨架 | ✅ CLI/JSON 输出为主 |
| **Chrome 插件** | ⏳ 计划中 | `extensions/monad-liq-guard` 骨架 | ✅ 仅作为 Demo 延伸，非必做 |
| **CLOB 价格校验** | ⏳ 计划中 | Demo 阶段用预言机价格 + 注释说明 | ✅ 注释说明 CLOB 接入点，非真实下单 |
| **多链部署** | ❌ 不做 | 只做 Monad | — |
| **真实交易广播 / MEV** | ❌ 不做 | 只读不签名 | — |
| **前端钱包集成 / 签名** | ❌ 不做 | — | — |
| **Morpho / Curvance 接入** | ❌ 不做 | Week 5 假设 | — |

---

## 4. 团队成员与分工

### 团队名称
**Monad Agent Kit**

### 成员与分工表

| 成员 | 角色 | 在 Mini Demo 中负责的工作 | 成果/证据 | 未完成或 Mock 内容 |
|------|------|--------------------------|-----------|---------------------|
| **TiyaDegurechaff** | Researcher | 协议研究、场景定义、竞品分析、数据验证、Demo 叙事、提交材料撰写 | - `tasks/week3/problem-validation.md`（3 条证据 + 12 竞品）<br>- `tasks/week3/brainstorm-meeting.md`<br>- `tasks/week3/decision-log.md`<br>- `tasks/week4/hackathon-start-card.md`<br>- `tasks/week4/requirement-check.md` | — |
| **Eflier** | Dev | 合约开发、链上验证、Bot/MCP 原型、Demo 可演示交付 | - `LiquidationRouter.sol`（Aave liquidationCall 已验证）<br>- `api/index.ts`（Vercel serverless API）<br>- Moss PR #104（aPriori adapter，已合并）<br>- `tasks/week3/dev/stake-agent.mjs`（CLI 原型） | - Euler adapter 地址待确认<br>- User 保护台 UI 未完成（CLI/JSON 为主）<br>- Chrome 插件仅有骨架 |
| **刘力铭** | Risk & Product | 风险模型设计、用户侧预警叙事、AI 风险解释、Deleverage 建议 | - 需求检查中提出 Risk Rating / Stress Test / AI Explanation 四层补充<br>- 明确 "0 清仓率" 可作为商业化卖点<br>- 认可双轨架构（Liquidator + User） | - Risk Rating 实现未完成（逻辑已设计）<br>- AI Explanation 使用规则模板，非真实 LLM<br>- Deleverage 建议未实现（Week 5 假设） |

### 每位成员的自述 / Individual Self-Description

#### TiyaDegurechaff (Researcher)
> **我在 Mini Demo 中负责**：
> - 把 Notion `调研 / 五个方向` 与 `mvp建议` 整理成可执行 Product Brief，确认 "实时清算优化" 是最佳方向
> - 验证链上数据（Monad 借贷 TVL 超 $600M、Aave/Euler 清算事件），证明多协议清算优化的真实需求
> - 分析 12 个竞品，确认当前没有把 Risk Rating + Stress Test + AI Explanation 打包给普通用户的链上产品
> - 撰写 Hackathon 叙事线：问题定义 / 竞品分析 / 用户场景 / Demo 脚本
> - 整理 7 个 GitHub Issue（P0/P1/P2）作为团队执行看板
> - 撰写本次提交材料
>
> **证据**：`tasks/week3/problem-validation.md`、`tasks/week3/brainstorm-meeting.md`、`tasks/week3/decision-log.md`、`tasks/week4/hackathon-start-card.md`、`tasks/week4/requirement-check.md`

#### Eflier (Dev)
> **我在 Mini Demo 中负责**：
> - 维护 `LiquidationRouter.sol` + Vercel API，是 Mini Demo 的代码底座
> - 实现 Aave 清算路径：`liquidationCall(address collateral, address debt, uint256 debtToCover, bool receiveAToken)`，selector 链上验证
> - 提交 Moss PR #104（aPriori adapter），证明团队具备 Solidity adapter 开发 + 主网验证能力
> - 编写 `stake-agent.mjs` CLI 原型，演示 AI Agent → 交易草稿 → 链上验证的完整闭环
> - 设计 `api/index.ts` 清算交易草稿输出格式（to / selector / value / calldata / 预估利润）
>
> **证据**：`LiquidationRouter.sol`、`api/index.ts`、Moss PR #104、`tasks/week3/dev/stake-agent.mjs`
> **Mock/未完成**：Euler adapter 地址待确认；User 保护台 UI 未完成（CLI/JSON 为主）；Chrome 插件仅有骨架

#### 刘力铭 (Risk & Product)
> **我在 Mini Demo 中负责**：
> - 提出 Risk Rating（B/C/D）映射逻辑，把单仓位 HF 转成可理解的风险等级
> - 设计 Stress Test 模型：抵押物下跌 10% / 30% 后的 HF 变化模拟
> - 提出 AI 风险解释（规则模板版），不用接外部 LLM，降低复杂度
> - 贡献 Deleverage 建议方向，帮助用户提前避免爆仓
> - 在需求检查中验证 '0 清仓率' 叙事，把产品从 '技术向清算' 提升到 '用户可理解的风险管理'
>
> **证据**：`tasks/week4/requirement-check.md`（刘力铭反馈部分）、`tasks/week4/hackathon-start-card.md`
> **Mock/未完成**：Risk Rating 实现逻辑未完成（已设计）；AI Explanation 使用规则模板，非真实 LLM；Deleverage 建议未实现（Week 5 假设）

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
- **范围收缩**：Week 4 Demo 限定 Aave + Euler 双协议，不追求覆盖率，只求故事完整
- **安全模型**：全程只读，不碰私钥、不广播真实交易，降低风险

---

## 6. Demo 录屏计划

### 录屏内容（2 分钟）

| 时间 | 画面 | 内容 |
|------|------|------|
| 0:00–0:20 | 终端 / 网页 | 输入 Monad 地址，点击扫描 |
| 0:20–0:50 | 输出面板 | 显示 Aave + Euler 健康因子 + Risk Rating |
| 0:50–1:10 | Stress Test | -10% / -30% 场景下 HF 变化 |
| 1:10–1:30 | 清算草稿 | 显示 to / selector / value / calldata / 预估利润 |
| 1:30–1:50 | CLOB 校验 | 展示价格来源 + 说明 Monad CLOB 优势 |
| 1:50–2:00 | 结束 | 项目名 + GitHub 链接 |

### 录屏方式
- **主要方式**：屏幕录像（终端运行 `node api/index.ts` + 输出 JSON）
- **备选**：如果 Vercel 部署可用，录制网页 Demo 交互
- **说明**：因 `MonadTiya/monad-liq-mvp` 仓库暂为私有，录屏将以本地运行 + 代码截图形式呈现，学习记录公开在 `github.com/tiyadegure/monad-builder-camp`

---

## 7. 下一步计划 (Next Steps)

### 本周剩余时间（Week 4 Day 10–14）
1. **Day 10-11**：Euler 只读扫描接入 + Risk Rating / Stress Test 路由接入 `api/index.ts`
2. **Day 12**：AI Explanation 规则模板接入 + 双协议 happy path 跑通
3. **Day 13**：用户测试（找 1–2 个外部 operator / dev）+ Demo 录屏
4. **Day 14**：README + 提交材料打包

### Week 5 远期计划
- Liquidation Probability 算法优化
- AI Agent 自动化风险管理（授权后自动补仓/减仓）
- CLOB 真实订单簿价格接入（Kuru/Perpl）
- Morpho / Curvance 协议接入

---

## 8. 相关链接 & 提交说明

### 相关链接

- **Hackathon 项目 Repo**：https://github.com/MonadTiya/monad-liq-mvp
- **学习记录 Repo**：https://github.com/tiyadegure/monad-builder-camp
- **Notion 项目页**：`3ab783c80bf38085ab00c85bef31a3a3`
- **GitHub Issues**：#8-#14（P0/P1/P2 共 7 个）
- **Moss PR #104**：https://github.com/nishuzumi/moss/pull/104
- **Week 4 文档**：`tasks/week4/hackathon-start-card.md` / `requirement-check.md` / `team-card.md`
- **Week 3 文档**：`tasks/week3/`（完整文档体系）
- **Daily Notes**：`daily/2026-07-22.md` ~ `daily/2026-08-05.md`
- **Week 3 Dev 原型**：`tasks/week3/dev/stake-agent.mjs` + `README.md`

### 提交说明 / Submission Notes

- **提交时间**：2026-08-07（Week 3 Mini Demo 提交）
- **提交人**：TiyaDegurechaff（代表团队）
- **提交方式**：团队共同提交一份材料，每位成员在 Section 4 中说明自己完成的工作
- **未完成功能 / Mock 内容**：在 Section 3 的 "Demo 功能完成状态" 表格中明确标注 ✅ 已完成 / ⏳ 进行中 / ❌ 不做，并在 "Mock 标注" 列说明具体内容
- **代码证据**：详见 `tasks/week3/dev/`（CLI 原型）、`tasks/week3/dev/README.md`（使用说明）、Moss PR #104（Solidity adapter + 主网验证）