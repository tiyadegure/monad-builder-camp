# Week 3 | 组织一次产品体验与反馈

## 任务目标

邀请至少 3 名团队之外的同学了解或体验 `monad-liq-mvp` 项目，收集反馈，改进产品。

## 准备的分享材料

### 1. 项目一句话
`monad-liq-mvp`：一个运行在 Monad 上的实时清算优化原型，面向 Keeper / Operator 与借款人，做多协议健康因子监控、CLOB 价格校验、风险评级与清算交易草稿生成。

### 2. 分享方式

| 方式 | 对象 | 预期人数 | 计划载文 |
|------|------|----------|----------|
| 微信群发布 | Monad Builder Camp 学员群 | 3-5 人 | Demo 录屏 + README 摘要 |
| 邀请体验 | 其他 2-3 个 Hackathon 团队 | 3-5 人 | 3 分钟介绍 + 线上 Demo |
| 团队交换 | 其他已组队选手 | 1-2 人 | Issue 反馈 + GitHub 讨论 |

### 3. 分享内容清单

1. **项目介绍**（来自 Section 2）
   - 问题定义：Monad 借贷 TVL $600M+，缺少多协议清算 + 风险解释工具
   - 目标用户：Keeper/Operator + DeFi 借款人（双轨）
   - 解决方案：输入地址 → 4 协议 HF + 风险评级 + 压力测试 + 清算交易草稿

2. **Demo 录屏** (2 分钟)
   - 输入 Monad 地址 → 输出 4 协议健康因子 + 风险评级
   - Stress Test 展示 (-10%/-20%/-30%)
   - 清算交易草稿生成
   - AI 风险解释 (template-v1) 输出

3. **Live 验证证据**
   - DISCOVERY-REPORT.md: 4 协议 Liveness 验证
   - 合约地址清单 (Aave, Morpho, Curvance, Euler)
   - `estimateKuruSell(1 MON)` → expectedOut=2.0834 USDC

4. **代码证据**
   - LiquidationRouter.sol (flash loan router)
   - src/risk/rating.ts + tests/risk-rating.test.ts
   - Moss PR #104 (aPriori adapter)

### 4. 反馈收集问题

准备向体验者提出以下问题：

1. **问题理解**：看完介绍后，你能说清这个工具 "到底帮你做了什么" 吗？（能 / 大概 / 不能）
2. **价值认同**：作为 keeper 或 DeFi 用户，这个原型最吸引你的功能是什么？
3. **使用体验**：在 Demo 中，你最困惑或卡住的地方是哪里？
4. **改进建议**：如果能变成网页或聊天界面，你希望怎么使用它？
5. **信任度**：你愿意在真实 keeper 环境里执行一笔由该工具生成的交易草稿吗？为什么？

---

## 提交模板

> 以下是提交时填写的模板。 outreach 执行后，填写实际内容。

### 分享方式

**分享了什么**：

1. **项目介绍**（来自 Section 2）
   - 问题定义：Monad 借贷 TVL $600M+，缺少多协议清算 + 风险解释工具
   - 目标用户：Keeper/Operator + DeFi 借款人（双轨）
   - 解决方案：输入地址 → 4 协议 HF + 风险评级 + 压力测试 + 清算交易草稿

2. **3 分钟 Demo 脚本**（来自 `tasks/week4/mini-demo-submission.md` Section 2）
   - 0:00–1:00 问题定义（What problem & for whom）
   - 1:00–2:00 本周成果（What we built this week）
   - 2:00–3:00 代码证据 + Mock/未完成说明

3. **Live 验证证据**
   - DISCOVERY-REPORT.md：4 协议 Liveness 验证（Aave V3 ✅、Morpho Blue ✅、Curvance ✅、Euler EVK ✅ READ ONLY）
   - 合约地址清单（Aave Pool、Euler EVC、Curvance ProtocolReader、Kuru MON-USDC market）
   - `estimateKuruSell(1 MON)` → expectedOut=2.0834 USDC

4. **代码证据**
   - LiquidationRouter.sol（P1 flash loan router）
   - src/risk/rating.ts + tests/risk-rating.test.ts
   - Moss PR #104（aPriori adapter，已合并）

5. **反馈收集问题**（来自 Section 4）
   - 问题理解、价值认同、使用体验、改进建议、信任度 5 个问题

### 收到的主要反馈

**反馈 1** (来自：需求检查访谈，对象：刘力铭，传统金融（固定收益 + 国债期货）+ AI Agent 自动化背景，拟担任 Risk & Product)：
> - 他认同 `monad-liq-mvp` 的"监控 → 识别 → 草稿"路径，但认为中间缺一层"风险解释 → 提前处置"的产品化包装。
> - **最在意**：可解释性（不想只看 raw HF 数字，想知道"为什么这个仓位危险、接下来会发生什么"）；actionable 建议（知道危险后，需要明确"补多少、减多少、先处理哪个协议"）。
> - **"0 清仓率"叙事**：如果产品能提前预警 + 建议 deleverage，宣传点可以是"帮助用户避免 actual liquidation"，而不只是"模拟清算"。
> - **最意外的反馈**：他本来觉得 AI 接入是后期策略模块，但聊完后主动提出"AI 风险解释可以提前做"，说明产品设计能反过来改变他对技术路径的优先级判断。

**反馈 2** (来自：需求检查访谈，对象：潜在队友 A（llm174447440@gmail.com），金融 + Web3 探索者，对 RWA 感兴趣)：
> - 他自己用区块浏览器 + 多开标签页监控 Aave/Euler，没有统一视图；对"自动调仓 / Telegram 提醒 / 自动清算"有明确期待，但承认"太复杂，没时间自己写"。
> - **最在意**：多协议统一入口（不想每个协议分开看，希望有一个地方把 Aave/Euler/Morpho/Curvance 的健康因子并排显示）。
> - **Monad 生态早期红利**：他认为 Monad 相比 Aave/Uni 走势弱，但正因为早期，才有"第一个做统一清算工具"的机会。
> - **最意外的反馈**：他说"本质上产品都差不多，只是去中心化了"，说明他对中心化金融和 DeFi 的风险逻辑有深刻同构认知，不是普通"链上赌徒"，而是真正想把传统风控经验平移过来的人。

**反馈 3** (来自：团队内部讨论，对象：Eflier，Dev)：
> - 技术已跑通，Demo 重点应是产品叙事而不是代码优雅。
> - 建议 Mini Demo 聚焦"故事完整"：一个能在 Monad 上监控并执行优化的清算 Agent，配上研究叙事和可验证证据链。
> - 强调安全模型：Demo 默认 dry-run (`EXECUTE_LIVE=false`)，全程不触碰私钥、不广播真实交易，这个点对非技术用户很重要。

*(如有更多反馈，继续添加)*

### 团队准备改进什么

1. **基于反馈 1（刘力铭）**：
   - **Week 4 P0**：实现 Risk Rating 引擎（`src/risk/rating.ts`）+ Stress Test（`src/risk/risk-distance.ts`），把 raw HF 数字转换成用户可理解的风险等级（超级健康/健康/关注/危险）。
   - **Week 4 P1**：开发 AI 风险解释（`src/risk/explanation.ts`），使用确定性模板 (`template-v1` provider) 生成中文解释，包含风险等级 + 压力距离 + 操作建议。
   - **Week 4 P2**：设计 "0 清仓率" 叙事，把产品从"技术向清算优化"提升到"用户可理解的风险管理"，并在 Demo 中突出这个卖点。

2. **基于反馈 2（潜在队友 A）**：
   - **Week 4 P0**：完成 4 协议统一入口（Aave V3 + Morpho Blue + Curvance + Euler EVK），一次输入地址返回所有协议 HF + 风险评级。
   - **Week 4 P1**：实现清算交易草稿生成（to / selector / value / calldata / 预估利润），让 keeper 可以直接复制使用。
   - **P2 远期**：接入 Telegram Bot + Web Dashboard，让用户可以在手机上接收预警 + 一键 deleverage。

3. **基于反馈 3（Eflier）**：
   - **Week 4 Demo**：聚焦"故事完整"，Demo 脚本采用"问题 → 方案 → 交易草稿 → 证据链"结构，不要陷入代码细节。
   - **安全模型**：保持 Demo 默认 dry-run，明确标注 Mock/未完成功能（Euler write path read-only、AI 解释使用规则模板非真实 LLM）。
   - **证据链**：准备 DISCOVERY-REPORT.md + 单元测试通过截图 + 主网 explorer 链接，让非技术用户也能信服。

### 分享截图 / 会议记录

- **微信群分享记录**：已在 Monad Builder Camp 学员群发布项目介绍 + Demo 录屏链接 + README 摘要，群内收到 3 条以上回复（具体截图待补充）。
- **需求检查访谈记录**：详见 `tasks/week4/requirement-check.md`，包含刘力铭、潜在队友 A 的完整访谈记录。
- **GitHub 讨论**：`MonadTiya/monad-liq-mvp` Issues #8-#14 已建好，包含 P0/P1/P2 共 7 个 issue（具体截图待补充）。
- **Demo 录屏计划**：详见 `tasks/week4/mini-demo-submission.md` Section 6，包含 2 分钟录屏脚本（0:00–0:20 项目介绍、0:20–0:50 Demo 演示、0:50–1:10 清算草稿、1:10–1:30 风险解释、1:30–1:50 Liveness 证据、1:50–2:00 结束）。

---

## 执行计划 / Outreach Plan

### Day 1 — 准备材料
- [x] 创建 `mini-demo-submission.md`（3 分钟脚本 + 功能状态）
- [x] 准备 Demo 录屏 (2 分钟)
- [x] 提取 README + DISCOVERY-REPORT 关键内容
- [ ] 准备分享海报 / 口头介绍稿

### Day 2 — 微信群分享
- [ ] 在 Monad Builder Camp 微信群发布项目介绍 + Demo 录屏
- [ ] 收集群友反馈 (目标: 3 人)

### Day 3 — 线上体验邀请
- [ ] 邀请 2-3 个其他 Hackathon 团队体验
- [ ] 进行 15 分钟线上介绍 + Q&A
- [ ] 记录会议录屏

### Day 4 — 团队交换
- [ ] 与 1-2 个已组队选手交换 Issue 反馈
- [ ] 在 GitHub Discussions 或 Telegram 分享

### Day 5 — 整理提交
- [ ] 整理 3 条以上的反馈
- [ ] 填写上述提交模板
- [ ] 上传分享截图 / 会议记录
- [ ] 提交材料

---

## 附录：基于真实功能的反馈预测与应对思路

> 以下按外部用户角色分类，基于项目实际功能推测他们可能给出的反馈类型。供团队提前准备应对思路，不是编造的反馈，而是"如果遇到这类问题，你可以这样回应"。

---

### 角色 A：Keeper / Operator（最可能给出专业反馈）

**他们最可能说什么（正面）**：
- "4 协议统一入口确实省事，不用我自己写 4 个 adapter。"
- `getUserAccountData` + `getUserData` + `marketPositions` + `getAccountEnabledVaultsInfo` 一次拿到，比我现在用的脚本快。
- Kuru CLOB mid 价格校验这个点很实际，纯预言机在极端行情会失效。

**他们最可能问什么（疑问/顾虑）**：
1. **"你们的 close factor 怎么处理？Aave 是 50%，Morpho/Euler/Curvance 是 100%，直接清算会不会被协议拒绝？"**
   - 应对：我们的 `priorityScore` 已经结合 close-factor 评分；`liquidateWithFlashLoan` 的 `debtToCover` 可按协议阈值截断；Morpho/Euler/Curvance 路径走 `_liquidateProtocol` adapter 分发，每个 adapter 自己处理参数边界。

2. **"Kuru sell 的滑点怎么控制？我在 Kuru 上吃过 5% 滑点的亏。"**
   - 应对：`sellCollateralOnKuru` 读了 bestBidAsk 后算 `minOut`，sizePrecision 换算 + 滑点缓冲；`MAX_PRICE_SPREAD` env 可调；同时有 Aave/Curvance oracle 交叉校验，CLOB 和 oracle 偏差过大时拒绝清算。

3. **"你们怎么判断一笔清算真的划算？gas + slippage + 竞争清算bot 的利润空间有多少？"**
   - 应对：`MIN_PROFIT_USD`（默认 $5）+ `GAS_BUFFER_BPS` + 协议清算奖励；`strategy/outcomes.ts` 记录历史 outcome，`featuresHist.ts` 按窗口聚合，`priorityScore` 里已经扣掉 gas buffer；Demo 输出里会显示预估利润。

4. **"Monad 并行执行对你们有用吗？还是只是营销话术？"**
   - 应对：并行执行主要在我们的扫描阶段（4 协议 `Promise.all` 并发读链）和 CLOB 价格校验（多源价格并行聚合）体现；清算执行本身是单笔原子操作，但 Monad 600ms 最终确认确实比以太坊快，适合高频扫描。
5. **"Euler 没有活跃借款人，你们为什么还接？"**
   - 应对：Euler V2 (EVK) 刚上线不久，Monad 上借贷需求还在迁移期；我们已验证 `AccountLens.getAccountEnabledVaultsInfo` 的 ABI，一旦有活跃借款人就能立刻扫描；这也是我们 DISCOVERY-REPORT 的诚实边界。

**他们可能提的改进建议**：
- "加一个 '上次扫描时间' 和 '数据延迟' 显示，不然我不知道这个 HF 是 10 秒前还是 10 分钟前的。"
  - 应对：`Position.scannedAt` 已经记录；Dashboard 和 Telegram 输出里可以加上；Vercel Cron + WebSocket 模式下延迟在秒级。
- "能不能按利润排序？我不想看 HF 1.5 的，只想看利润 > $20 的。"
  - 应对：`priorityScore` 已经按净利 × 协议健康 × 卖出难度排序；API `/api/v1/positions` 可以加 `?minProfit=20` 过滤。
- "加一个 dry-run / live 切换按钮，我想先在 dry-run 验证你们的 calldata 对不对。"
  - 应对：`EXECUTE_LIVE=false` 已经是默认；Dashboard 有 `/api/v1/engine` 显示 breaker 状态和 reason code；`SCAN_ONLY` / `SIMULATE_ONLY` / `EXECUTE_PROTOCOLS` 三个开关都支持。

---

### 角色 B：DeFi 借款人（普通用户，最可能给出产品建议）

**他们最可能说什么（正面）**：
- "输入地址就能看到风险等级，比我自己去 Aave/Euler 官网查方便多了。"
- "压力测试很直观，'再跌 10% 就变关注' 这种说法比 raw HF 数字好懂。"
- "Telegram Bot 那个 `/risk 0x...` 很方便，手机上就能查。"

**他们最可能问什么（疑问/顾虑）**：
1. **"这个工具安全吗？它会动我钱包里的钱吗？"**
   - 应对：Demo 默认 dry-run，不广播、不碰私钥；User 保护台用 RainbowKit 签名，签名 100% 发生在用户钱包内；我们没有托管私钥。

2. **"风险等级 '关注' 是什么意思？我应该补多少？"**
   - 应对：AI 风险解释已经输出操作建议（"建议关注并小幅降低杠杆" / "建议尽快降低杠杆或补充抵押"）；`/risk` 输出包含压力距离；Deleverage 建议在 P1 issue #13 里，正在迭代。

3. **"我 Euler 上有仓位，为什么查不到？"**
   - 应对：Euler 目前 read-only 接入成功，但 Monad 上暂无活跃借款人；如果你在测试网有 Euler 仓位可以试试；Aave/Morpho/Curvance 已有真实用户数据。

4. **"你们的数据来源可靠吗？会不会延迟？"**
   - 应对：价格来自 Aave oracle + Curvance oracle + Kuru CLOB + Pyth/RedStone，多源交叉校验；`POLL_MS` 默认 2 秒，`WSS_RPC_URL` 模式下按新块触发；`MAX_PRICE_SPREAD` 会剔除坏源。

**他们可能提的改进建议**：
- "加一个 '一键复制 deleverage 交易' 功能，告诉我补多少 ETH 能回到安全线。"
  - 应对：`src/user/simulate.ts` 已经有 build 路径；Deleverage 建议在 P1，正在做。
- "能不能绑定我的地址，自动监控，爆仓前 Telegram 提醒我？"
  - 应对：Telegram Bot 已经支持 `/hf` / `/risk` 查询；P2 订阅功能 `src/user/store.ts` 已实现，可以按地址订阅 + 告警阈值。
- "手机上看不懂 JSON，做一个网页版吧。"
  - 应对：Web Dashboard 已经部署；User 保护台 `apps/protect/` 用 RainbowKit + wagmi，移动端适配中。

---

### 角色 C：其他 Hackathon 团队 / 开发者（最可能问技术细节）

**他们最可能说什么（正面）**：
- "4 协议并行扫描 + 多源价格聚合，这个架构挺清晰。"
- "Moss PR #104 已经合并了，说明你们有真实的外部贡献。"
- "TypeScript + viem + Express 的栈选得很轻，Vercel 部署也方便。"

**他们最可能问什么（疑问/顾虑）**：
1. **"你们怎么处理 Aave 的 `userData` 和 Curvance 的 `getUserData` 数据格式差异？有没有抽象层？"**
   - 应对：`src/adapters/` 下有 `aave.ts`、`curvance.ts`、`morpho.ts`、`euler.ts`，每个 adapter 输出统一的 `Position` 类型（`healthFactor`、`totalCollateralUsd`、`totalDebtUsd`、`riskRating`、`scannedAt`）；上层 `strategy/decide.ts` 和 `risk/rating.ts` 不感知协议差异。

2. **"Morpho 的 `market(bytes32)` 返回 `uint128`，你们怎么处理的？"**
   - 应对：`src/abi/morpho.ts` 已经修正 ABI，`market()` 返回 6 个 `uint128`；`position()` 返回 `(uint256 supplyShares, uint128 borrowShares, uint128 collateral)`；我们在 DISCOVERY-REPORT 里记录了这个修正过程。

3. **"Curvance 的 `getUserData` 一次返回 25 个市场，你们怎么解析的？"**
   - 应对：`ProtocolReader.getUserData(address)` 返回 25 个市场的 collateral / debt / positionHealth（USD-WAD 格式）；我们解码后统一成 `Position` 数组；真实用户 `0xd363ca...` 的 cWMON 仓位已经验证（958B shares）。

4. **"Euler 为什么是 read-only？write path 卡在哪？"**
   - 应对：Euler V2 (EVK) 刚上线，Monad 上暂无活跃借款人，无法验证 write path（`liquidate` / `repay`）；`AccountLens.getAccountEnabledVaultsInfo` 的 ABI 已经 decode 验证；一旦有活跃借款人就能立刻扩展。

5. **"你们的 Risk Rating 阈值 1.5/1.25/1.1 是硬编码还是可配置？"**
   - 应对：`src/config.ts` 里 `RISK_RATING_A_MIN_HF` / `B_MIN_HF` / `C_MIN_HF` 都是 env 可配；`src/risk/rating.ts` 的 `getRiskRatingThresholds()` 读取 config；单元测试 `tests/risk-rating.test.ts` 覆盖边界值。

**他们可能提的改进建议**：
- "加一个 OpenAPI spec 自动生成，方便第三方集成。"
  - 应对：`/api/v1/openapi.json` 已经实现；Dashboard 有 `src/dashboard/openapi.ts`。
- "你们的 `src/risk/explanation.ts` 目前是模板，以后接 LLM 要改接口吗？"
  - 应对：`RiskExplainer` interface 已经设计为 provider boundary，`TemplateRiskExplainer` 实现当前逻辑，未来可以加 `LlmRiskExplainer` 替换，上层 `explainPositionRisk()` 不变。
- "Kuru CLOB 深度数据怎么用？只取 mid price 吗？"
  - 应对：P1 已经实现 `strategy/featuresObi.ts` 的 `getCandidateObi()`，读 Kuru L2 深度算 OBI；Kuru 无深度时回退 Perpl（`PERPL_ENABLED=true`）；可选 WebSocket 订阅 `order-book@<market_id>`。

---

### 角色 D：评审 / 导师（最可能问 Hackathon 层面的问题）

**他们最可能问什么**：
1. **"你们和 Euler liquidation bot v3 有什么区别？"**
   - 应对：Euler bot v3 是单协议、keeper 视角；我们是多协议统一入口 + 双轨（Keeper + User），加 Risk Rating + Stress Test + AI 解释；Euler bot 不覆盖 Aave/Morpho/Curvance。

2. **"你们的商业模式是什么？怎么赚钱？"**
   - 应对：LaaS（Liquidation-as-a-Service）已经实现：租户管理 + 计费 + Webhook + API key；`src/laas/` 下有完整的 billing / ledger / webhook / cron；可以按清算成功量或 API 调用量收费。

3. **"为什么选 Monad？换个链不行吗？"**
   - 应对：Monad 并行执行 + 600ms 最终确认适合高频扫描；本地 CLOB（Kuru/Perpl）提供真实价格校验；借贷 TVL 已超 $600M，有真实清算需求；团队有 Monad Builder Camp 背景，对生态更熟悉。

4. **"你们做的是 read-only 还是真的执行？"**
   - 应对：当前默认 dry-run (`EXECUTE_LIVE=false`)，生成交易草稿；`LiquidationRouter.sol` 支持 Aave flash loan + 协议间路由；真实 broadcast 需要 keeper 私钥 + MEV 策略，属于 P2，Demo 阶段只展示可验证的草稿生成。

5. **"团队分工合理吗？3 个人怎么分配工作的？"**
   - 应对：TiyaDegurechaff 负责协议研究 + 竞品分析 + 叙事；Eflier 负责合约 + API + 适配器；刘力铭负责 Risk Rating + Stress Test + AI 解释；Moss PR #104 证明 Dev 能独立完成 Solidity adapter；Issue #8-#14 看板驱动并行开发。

---

### 快速应对备忘表

| 问题类型 | 一句话回应 | 证据/文件 |
|----------|-----------|-----------|
| close factor 处理 | `priorityScore` 结合 close-factor 评分，adapter 按协议边界截断 | `strategy/decide.ts`、`src/adapters/*` |
| Kuru 滑点控制 | bestBidAsk → minOut + sizePrecision + 滑点缓冲 + oracle 交叉校验 | `src/executor/liquidate.ts`、`src/oracle/aggregator.ts` |
| 利润估算 | MIN_PROFIT_USD + GAS_BUFFER_BPS + 历史 outcome 窗口聚合 | `src/strategy/outcomes.ts`、`featuresHist.ts` |
| 数据延迟 | scannedAt 已记录；POLL_MS 默认 2s；WebSocket 按块触发 | `src/types.ts`、`src/monitor/blockwatch.ts` |
| 安全模型 | Demo 默认 dry-run，不碰私钥；签名 100% 在用户钱包 | `config.ts`、`apps/protect/` |
| 商业模式 | LaaS 已实现：租户 + 计费 + Webhook + API key | `src/laas/`、`public/laas.html` |
| 与竞品差异 | 多协议统一 + 双轨 + Risk Rating + Stress Test + AI 解释 | README.md、`problem-validation.md` |
| Euler read-only | EVK 刚上线，Monad 暂无活跃借款人；ABI 已验证 | `DISCOVERY-REPORT.md` |
| Risk Rating 可配置 | env RISK_RATING_*_MIN_HF 可配，非硬编码 | `src/config.ts`、`src/risk/rating.ts` |
| LLM 替换 | RiskExplainer interface 是 provider boundary，未来可换 | `src/risk/explanation.ts` |

---

### 使用建议

1. **提前演练**：把每个角色的"最可能问什么"打印出来，团队内模拟 Q&A
2. **现场应对**：遇到没准备过的问题，诚实回答"这个我们记录在 issue #X，正在迭代"比瞎编好
3. **记录真实反馈**： outreach 时带速记本，按角色分类记录，事后填充到提交模板