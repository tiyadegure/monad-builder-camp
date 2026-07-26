# Week 3 项目研究简报 — aPriori 质押 Agent

> 研究对象：本人 Week 3 开发项目 [aPriori 质押 Agent](https://github.com/tiyadegure/monad-builder-camp/tree/main/tasks/week3/dev)（用一句话把 MON 质押进 aPriori aprMON 金库的最小 AI Agent 原型）
> 研究时间：2026-07-26 ｜ 研究者：tiyadegure ｜ AI 协作：Claude 负责资料检索与初稿，链上数据、合约行为与结论由本人核对

---

## 一、目标用户遇到了什么问题

目标用户 = **想参与 Monad 流动性质押、但没有合约阅读能力的 Web3 新人**。他们的真实障碍不是"不想质押"，而是**从"我想质押"到"我签下这笔交易"之间，有一段自己无法验证的路**：

1. **流程比想象的复杂**：质押是一步，退出却是异步两步（`requestRedeem` → 等若干 epoch → `redeem`），新人普遍以为"随时能取回"。
2. **看不懂自己在签什么**：钱包里显示的是十六进制 calldata，用户只能选择信任前端界面。
3. **没有"预期结果"**：存 1 MON 能拿多少 aprMON、汇率是多少，用户在签名前拿不到一个可核对的数字。
4. **Agent 想帮忙，但缺一层安全中间层**：AI 不懂 ABI/calldata 规则，也不该直接持有私钥。

## 二、问题证据（4 条）

| # | 证据 | 说明 | 来源 |
|---|---|---|---|
| 1 | aPriori 退出需调用 `requestRedeem`，等待 **约 12–18 小时**（每个 staking epoch 约 5.5–6 小时），解锁后再调 `redeem(requestIDs, receiver)` 领取 | 官方文档确认"两步 + 排队"是协议设计而非 bug，且测试网（~10 分钟）与主网体感差距巨大——新人极易被测试网体验误导 | [aPriori Docs — Smart Contract Integration](https://apriori-docs.gitbook.io/apriori-docs/aprmon/smart-contract-integration) / [FAQ](https://apriori-docs.gitbook.io/apriori-docs/faqs/faq) |
| 2 | 2025 年签名钓鱼损失 **8385 万美元、106,106 名受害者**；Permit 类签名仍是主要载体，Pectra 后出现 EIP-7702 恶意签名 | 用户"看不懂就签"是可量化的系统性损失，不是主观感受 | [Scam Sniffer 2025 年度报告](https://drops.scamsniffer.io/scam-sniffer-2025-crypto-phishing-losses-fall-83-to-84-million/) |
| 3 | 盲签（blind signing）被列为加密资产损失的**主要成因之一**：钱包以十六进制展示信息，迫使用户信任应用界面，攻击者可用伪造界面、地址投毒诱导签名 | 直接支撑"交易草稿需要人类可读化"这一产品假设 | [Ledger Academy — Crypto Security 2026](https://www.ledger.com/academy/topics/security/crypto-security-2026-how-to-avoid-scams-and-hacks-in-2026) |
| 4 | Moss 框架自述其解决的三个问题：Agent 缺协议知识（ABI/calldata）、Agent 不该直接签名、即使模拟了也难验证效果 | 说明"Agent × 链上操作"的信任边界问题已被基础设施层独立识别，不只是我的推测 | [Moss README](https://github.com/nishuzumi/moss) / [mcp-tools.md](https://github.com/nishuzumi/moss/blob/main/docs/mcp-tools.md) |

**市场规模（已链上核对，2026-07-26）**：

| 指标 | 数值 | 核对方式 |
|---|---|---|
| aprMON 金库 TVL | **26,491,791.53 MON ≈ 55.7 万美元** | 直接对 `0x0c65A0BC65a5D819235B71F554D210D3F80E0852` 调 `totalAssets()`（Monad 主网 RPC），MON 单价 $0.02102（CoinGecko） |
| DefiLlama 口径 | **$556,440**（26.49M MON） | 与链上读数误差 <0.1%，口径一致 |
| aprMON 总量 / 兑换率 | 24,888,976.36 aprMON；1 aprMON = **1.0644 MON**，即 1 MON ≈ **0.9395 aprMON** | `totalSupply()` 与 `totalAssets()` 相除；与原型输出的"≈0.93 aprMON"一致 ✅ |
| 参照：Kintsu（Monad LST 竞品） | $2,293,131（含 Monad + HyperEVM） | DefiLlama |
| 参照：Monad 全链 TVL | $745,822,114 | DefiLlama |

> ⚠️ **数据修正**：多个 SEO 型文章称 aPriori "TVL 超 5 亿美元、持有地址 138.8 万"，链上数据不支持该量级（相差约 900 倍），本简报**不采用**这些数字。另外，搜索结果里出现的 `apriori.fun`、`arpiori.gr.com` 等域名与官方文档给出的入口（`app.apr.io`）不一致，疑为仿冒站——这本身就是第四节"地址投毒"风险的现实样本。

## 三、类似产品 / 现有解决方式

**1. aPriori 官方前端（app.apr.io）— 直接替代品**
成熟、支持一键质押与退出排队展示，且是唯一权威地址来源。但它是"按钮式界面"：仍要求用户自己理解 aprMON、汇率、退出等待；不提供自然语言入口，也无法被 Agent 复用。
→ *对我们的含义*：我们不该重做前端，价值只在"意图 → 可核对交易草稿"这一段。

**2. Bankr — 聊天式 onchain 执行 Agent（最接近的形态参照）**
用户在 X 或终端用自然语言下单，覆盖 swap、限价单、跨链、发币、mint，跨 Base/Solana/Polygon/Ethereum，构成完整的 Intent → Compilation → Execution 管道。
**但 2026-05-19～20，Bankr 暂停 swap 与转账：攻击者访问了 14 个 Bankr 托管钱包、约 44 万美元，部分用户单钱包损失近 15 万美元，官方承诺赔付。**
→ *对我们的含义*：这正好从反面验证"Agent 不持私钥、只出草稿"的路线选择——Bankr 的强大体验建立在托管之上，而托管是它被击穿的地方。
（[Cambrian — Agentic Finance Landscape Q1 2026](https://www.cambrian.org/blog/agentic-finance-landscape-q1-2026) / [Bankr](https://bankr.bot/terminal/chat)）

**3. HeyAnon / 意图-求解器（solver）网络 — 另一条技术路线**
用户签"意图"，求解器竞争代为执行并垫付 gas；截至 2026-04 跨链意图交易量已达 **41 亿美元**。
→ *对我们的含义*：意图路线解决"执行"，但把"我到底签了什么"抽象得更远。我们的差异点应落在**可验证性**而非自动化程度。（[RZLT — DeFAI in 2026](https://www.rzlt.io/blog/defai-in-2026-what-ai-agents-in-decentralized-finance-actually-are)）

## 四、项目可能遇到的风险

| 风险 | 具体表现 | 严重度 |
|---|---|---|
| **上游依赖风险** | Moss 目前是单一作者（nishuzumi）维护的早期项目，仅支持 Monad 主网（chain 143）与少量协议（WMON、ERC-20/721、Kuru）；无版本/稳定性承诺。原型还依赖本地已构建的 `/tmp/moss`，他人复现门槛高 | 高 |
| **退出流程未端到端验证** | `requestRedeem` / `redeem` 仅在 adapter 层支持，未真实跑通。若用户按 Agent 提示质押后发现"取不回/要等 18 小时"，信任一次性崩塌 | 高 |
| **估算与实际不一致** | `convertToShares` 是即时视图值，不含 MEV 收益波动、费用与"草稿生成→用户签名"之间的汇率变化。展示"你将获得约 X aprMON"若被当作承诺，会构成预期落差甚至误导 | 中高 |
| **信任攻击面并未因不持私钥而消失** | Agent 不碰私钥，但如果合约地址被投毒/硬编码错误，用户签下的仍是恶意交易——责任转移了，损失没有 | 中高 |
| **目标市场比想象的小** | aPriori 金库仅约 26.49M MON（≈55.7 万美元），且低于 Monad LST 竞品 Kintsu（$2.29M），占 Monad 全链 TVL 不足 0.1%。"新人不会质押"或许不是主要瓶颈——**可能是根本没多少人在质押**。做单一协议的 Agent，天花板受限于该协议本身 | 中高 |
| **形态限制导致无真实验证** | CLI + 未接钱包 → 拿不到真实用户行为数据，用户测试只能停留在"看输出"层面 | 中 |
| **合规与叙事风险** | 一旦展示 APY/收益预期，就接近投资建议边界；且 AI Agent 自动化钱包本身正被指增加智能合约风险 | 中 |

## 五、给团队的建议

**建议 1：把"验证再签名"做成产品的第一卖点，而不是免责声明。**
交易草稿输出时同屏给出：selector 人类可读解码（`0x6e553f65 → deposit`）、目标地址+官方文档来源链接、模拟回执的状态变更 diff、以及一行"这笔交易不会做什么"。这既直接回应第二、三条证据（盲签损失），也是相对 Bankr/solver 路线唯一守得住的差异点。**衡量标准**：用户测试里能否有 ≥80% 的人在看完输出后用自己的话说清这笔交易做了什么。

**建议 2：把退出流程当作首要功能补完，而非附属项。**
优先级排序应是「退出 E2E 跑通 > 接钱包 > 做网页 UI」。质押页必须在签名前显式告知"退出需两步、主网约 12–18 小时"，并在测试网演示时标注与主网的差异。理由：用户对质押的第一个真实疑问永远是"我能不能拿回来、多久"。

**建议 3：给上游依赖装上保险，同时把原型推到能被真实用户点击的形态。**
具体做法：pin Moss 的 commit hash、在自己代码里保留一层 adapter 接口，并准备一条不依赖 Moss 的 fallback（直接 viem + ABI 构造 deposit）；合约地址从官方文档来源加载并在启动时校验，不裸硬编码。同时用最小 web + 只读钱包连接替代 CLI，把用户测试从"看截图"升级为"真的点一次"。
另外，鉴于 aPriori 单协议体量有限（见第四节），建议把定位从"aPriori 质押 Agent"上移为"**Monad 上可验证的交易草稿 Agent**"，aPriori 只是第一个 adapter（Moss 已支持 Kuru、WMON、ERC-20/721，扩展成本低）——这样即使 aPriori 增长不及预期，产品叙事也不会跟着塌。

---

## 六、下一步需要验证的两个问题

1. 新人在看到"不碰私钥、只出草稿"之后，**是否更愿意**签名？还是反而因为"要自己核对"而放弃？（这决定核心卖点是安全还是省事）
2. 12–18 小时的退出等待，会不会本身就是劝退主因？如果是，Agent 该不该主动推荐"不锁仓"的替代方案？

## 七、资料来源

- aPriori Docs — Smart Contract Integration ｜ https://apriori-docs.gitbook.io/apriori-docs/aprmon/smart-contract-integration
- aPriori Docs — FAQ ｜ https://apriori-docs.gitbook.io/apriori-docs/faqs/faq
- aPriori 官方应用 ｜ https://app.apr.io/?tab=unstake
- Scam Sniffer 2025 年度钓鱼报告 ｜ https://drops.scamsniffer.io/scam-sniffer-2025-crypto-phishing-losses-fall-83-to-84-million/
- Ledger Academy — Crypto Security 2026（blind signing）｜ https://www.ledger.com/academy/topics/security/crypto-security-2026-how-to-avoid-scams-and-hacks-in-2026
- Moss 框架 GitHub ｜ https://github.com/nishuzumi/moss ｜ 文档 https://github.com/nishuzumi/moss/blob/main/docs/mcp-tools.md
- Cambrian — The Agentic Finance Landscape, Q1 2026（Bankr 形态与 2026-05 安全事件）｜ https://www.cambrian.org/blog/agentic-finance-landscape-q1-2026
- RZLT — DeFAI in 2026（意图/求解器路线与规模）｜ https://www.rzlt.io/blog/defai-in-2026-what-ai-agents-in-decentralized-finance-actually-are
- DefiLlama — aPriori ｜ https://defillama.com/protocol/apriori ｜ API https://api.llama.fi/protocol/apriori
- DefiLlama — Kintsu（Monad LST 竞品）｜ https://api.llama.fi/protocol/kintsu ｜ Monad 全链 TVL https://api.llama.fi/v2/chains
- CoinGecko — MON / APR 价格 ｜ https://www.coingecko.com/en/coins/monad ｜ https://www.coingecko.com/en/coins/apriori
- 链上一手读数 — Monad 主网 RPC `https://rpc.monad.xyz`（chain 143），对 aprMON `0x0c65A0BC65a5D819235B71F554D210D3F80E0852` 调用 `totalAssets()` / `totalSupply()`
- Monad 开发者文档 ｜ https://docs.monad.xyz
- 本人前置研究：[Week 2 Moss 阅读卡](https://github.com/tiyadegure/monad-builder-camp/blob/main/tasks/week2/challenge/moss-reading.md) ｜ [Week 3 Dev README](https://github.com/tiyadegure/monad-builder-camp/tree/main/tasks/week3/dev) ｜ [Week 3 用户测试](https://github.com/tiyadegure/monad-builder-camp/blob/main/tasks/week3/ops/project-intro-usertest.md)

**人工核对说明**

- **链上核对（一手）**：aprMON 的 TVL、总量、兑换率均由 Monad 主网 RPC 直接读取合约得到，并与 DefiLlama 交叉验证（误差 <0.1%）；兑换率 0.9395 aprMON/MON 与原型自身输出一致，说明原型的估算逻辑正确。
- **文档核对（一手）**：退出流程（`requestRedeem` → 等待 → `redeem`）、约 12–18 小时等待、金库地址，均取自 aPriori 官方文档。
- **已剔除的二手数据**：SEO 文章所称"TVL 超 5 亿美元""138.8 万持币地址"与链上读数矛盾，已从简报中删除，不作为任何结论依据。
- **仍属二手、仅作背景**：Bankr 2026-05 安全事件与意图交易量 41 亿美元来自研究机构报道，未找到一手事故公告，引用时已标注来源。
