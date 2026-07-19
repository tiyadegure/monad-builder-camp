# Week 2 | Space / 小型活动策划案：用 AI Agent 框架在 Monad 上写协议 Adapter

学分：20 · 运营赛道

> 不是写活动执行流程，而是说清"为什么办、帮谁、解决什么问题"。

## 活动主题

**「不写一行合约，也能让 AI 帮你质押：用 Moss 在 Monad 上接一个协议」**

副标题：一场给 Web3 新人的 AI × Builder 实战夜

## 活动目标

1. 让 30–100 名 Web3 / AI 新手理解：**AI Agent 框架如何把链上协议封装成"自然语言可调用"的能力**，而不需要自己写 Solidity。
2. 用一个真实、已提交的案例（aPriori aprMON 质押 adapter，PR #104）做样板，降低"我也能参与开源"的心理门槛。
3. 为 Monad Builder Camp 社群沉淀一批**愿意动手做 adapter / 文档贡献**的新人。

## 目标听众

- 想进入 Web3 开发但被"要先学 Solidity / 要先懂合约"劝退的新人
- 有 AI/前端背景、想用 Agent 框架（如 Moss）参与链上生态的 builder
- Monad Builder Camp 同期学员、以及关注 Monad / aPriori 的社区用户

## 核心问题（活动希望解决的）

1. **认知门槛**：新手以为"接一个协议 = 写智能合约"，不敢动手。
2. **贡献路径不清**：想给开源项目（如 Moss）做贡献，但不知道从哪类任务切入、地址和函数怎么验证才合规（ADR 0007）。
3. **链上探查无助**：遇到"文档说的函数和链上对不上"（如 aPriori 的 aprMON 是 EIP-7702 委托合约、stake 入口不在表面），不知道如何用 `eth_call` / 4byte.directory 自查。

## 举办原因（为什么这个主题值得办）

- **真实而非演示**：案例来自本周真实落地的工作——aPriori adapter 从"假设 stake() 单参"踩坑到链上确认 EIP-7702 委托合约、最终按官方文档补全 `deposit/requestRedeem/redeem` 三步，并提 PR #104。这种"踩坑→查证→修正"的过程，比完美教程更值得新人看。
- **契合当下热点**：Monad 主网 + aPriori 流动性质押是新人高频接触的场景；用"说一句话就能质押"的 Agent 视角切入，天然易懂。
- **可复制的方法论**：把"MVP 单 Capability → 完善多步骤 + 链上验证"的节奏讲清楚，新人之后能自己套用到 Kuru、其他 LST、DEX。
- **规模合适**：30–100 人的 Space / AMA 足够产生互动，又不需要复杂执行。

## 参考案例（至少 2 个）

1. **Monad Builder Camp 本身的活动设计** —— 以"周任务 + 赛道（技术/研究/运营）+ 公开学习仓库"组织新人协作，降低单独学习的孤独感。本策划案即在该 Camp 的运营赛道任务下产出。
   - 链接：https://github.com/tiyadegure/monad-builder-camp
2. **Moss 开源项目的贡献引导** —— 通过 `docs/protocol-onboarding.md` + ADR 0007（固定地址必须链上验证）+ Issues（如中文 FAQ #77）把"新人第一笔贡献"路径显式化，本活动的 adapter 案例即沿此路径产出（PR #104 / PR #88）。
   - 链接：https://github.com/nishuzumi/moss
3. **aPriori 官方 staking 文档** —— 用"连接钱包 → 输入金额 → 确认"的前端流程降低用户理解成本，本活动把同一逻辑翻译成"Agent 替你构建交易"的开发者视角。
   - 链接：aPriori 官方文档（deposit / requestRedeem / redeem 章节）

## 可选素材（活动中可展示，非流程要求）

- aPriori adapter PR #104：https://github.com/nishuzumi/moss/pull/104
- 技术赛道证据（真实测试 / 主网 e2e / 链上验证）：`../tech-track/`
- 运行截图：../tech-track/assets/run-evidence.png

## 提交信息

- 策划案：tasks/week2/ops/space-plan.md
- 学习仓库：https://github.com/tiyadegure/monad-builder-camp
- GitHub 主页：https://github.com/tiyadegure
