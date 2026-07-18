---
title: 'Moss 介绍：当 AI Agent 遇上 Monad 链上协议'
description: '一个把链上操作翻译成 Agent 语言的开源框架，解决 AI 时代的人机信任边界问题。本文从设计理念、运行机制、安全模型到个人开源实践，完整拆解 Moss。'
pubDate: 2026-07-17
tags: ['web3', 'monad', 'ai-agent', 'open-source']
---

# Moss 介绍：当 AI Agent 遇上 Monad 链上协议

> 一个把"链上操作"翻译成 Agent 语言的开源框架，解决 AI 时代的人机信任边界问题。本文从设计理念、运行机制、安全模型到个人开源实践，完整拆解 Moss。

---

## 零、为什么是 Moss？

过去半年，"AI Agent 上链"是 Web3 叙事里最热的词之一。几乎所有项目都在说"我们的 Agent 能自动交易、自动复投、自动管理仓位"。但如果你真的去问一句——**Agent 怎么保证它发出的每一笔交易，都是用户真正想要的，而且没有越权？**——大多数答案会突然变得含糊。

这个问题不是工程细节，而是**信任模型的根本问题**。传统的 Web3 交互范式是"人读交易、人签名、人负责"。Agent 范式下，人不想每笔都读，但把签名权交给一个会幻觉、会被 prompt injection 攻击的程序，等于把金库钥匙交给一个陌生人。

[Moss](https://github.com/nishuzumi/moss) 是我目前看到的、对这个信任问题回答得最干净的一个开源框架。它不试图"让 Agent 更安全地处理私钥"，而是从根本上**重新划分边界**：Agent 只负责"想做什么"，链上验证和签名交给别的层。

这篇文章会拆清楚它是怎么做到的，以及为什么它尤其适合 Monad。

---

## 一、Moss 是什么？

Moss 是一个开源框架（TypeScript，作者 nishuzumi），目标是把 Monad 链上的协议交互，封装成 **AI Agent 可以直接调用的"能力"（Capability）**。

用一句话概括它的工作流：

```
discover → load → action → simulate
  发现   →  加载  →  执行  →  模拟
```

- **discover（发现）**：Agent 先问"有哪些协议、哪些操作可用？"——比如"swap"这个 verb 对应 Kuru 的 swap 能力。
- **load（加载）**：加载这个操作的意图描述、风险标签、参数契约（参数类型、范围、必填项）。
- **action（执行）**：根据参数构建一个**未签名交易**，并附带结构化的 Capability 树。
- **simulate（模拟）**：在 Monad 主网上用 `debug_traceCall` 跑这笔交易，记录所有状态变化和事件，产出结构化的 **Receipt 证据**。

关键点：**Moss 只构建和验证未签名交易，永不签名、永不发送。** 真正广播交易的是用户独立的钱包，或者 MCP 客户端在确认 Receipt 之后才交出去签名的环节。

这听起来简单，但反直觉的地方在于——**绝大多数"Agent 链上交易"项目，默认 Agent 拥有签名权**。Moss 选择了相反的路径：把签名权彻底剥离出 Agent 的管辖范围。

---

## 二、它到底解决了什么问题？

要理解 Moss 的价值，得先看 AI Agent 想操作链上协议时的三个死结。

### 死结 1：Agent 看不懂协议

每个 DeFi 协议都有自己的一套 ABI、calldata 编码规则、参数约束、Receipt 解析逻辑。让一个 LLM 直接拼 `swap` 的 calldata，出错率是灾难级的——参数顺序错一位，可能把本来要卖的 Token 变成授权给一个恶意地址。

Moss 的解法：**协议方自己维护"操作包"（Protocol Package）**。地址、ABI、calldata 构造、参数规则、Receipt 解析，全部由懂这个协议的人写死在 `@themoss/protocol-*` 包里。Agent 不需要理解任何底层细节，只调用标准化的 Capability 名称（如 `kuru.swap`）和语义化参数（如 `tokenIn`、`amountIn`、`slippage`）。

这等于把"协议知识"从 Agent 的上下文里抽走，固化成可信的代码。Agent 的幻觉空间被压缩到"选哪个操作、填什么参数"这一层，而不是"怎么编码 calldata"。

### 死结 2：Agent 不能碰私钥

传统 Web3 是"人签名、人确认"。Agent 时代，人不想每笔都确认（否则 Agent 毫无意义），但把私钥交给 Agent = 把金库钥匙交给一个会幻视的程序。

Moss 的解法最彻底：**架构上就不让 Agent 碰私钥**。Moss 只产出未签名交易 + 验证过的 Receipt。签名环节要么在用户钱包里手动完成，要么在 MCP 客户端侧做"Receipt 文本 vs 用户原始请求"的比对后再触发签名。Agent 在整个链路里**永远接触不到能花钱的凭证**。

### 死结 3：即使模拟了，Agent 也难以验证结果

"这笔交易到底干了什么？"——如果没有结构化证据，Agent 和人类都无法确认模拟结果和意图一致。LLM 读一堆原始 trace log，照样会误读。

Moss 的解法：**模拟产生"可检查的证据"（Receipt）**。每笔成功交易产出有序的原始 Change（Event + 原生 MON 转账）和结构化 Receipt，且 Receipt 必须**完整、按顺序覆盖所有 Change**。任何覆盖缺失或顺序不符，都是 terminal Warning，库直接拒绝继续。Agent 拿到的是"和链上实际发生的事严格一致"的描述，不是它自己的猜测。

---

## 三、安全模型深挖：Receipt 验证为什么重要

这是 Moss 最值得讲清楚的设计。我第一次读它的 `How verification works` 一节时，觉得"有序覆盖"这个要求有点偏执，但想深一层才发现这是整个信任模型的基石。

### 机制

1. 每笔 Capability 拥有**一个直接的未签名交易**和一个**类型化的 Receipt 解析器**，注册在 `protocol + method` 下。序列化的树**不携带调用方提供的 Receipt 名称**——也就是说，Receipt 的类型由协议包决定，Agent 不能自己编一个 Receipt 名字来糊弄系统。

2. 模拟时，成功的 Event 和原生 MON 转账被记录为**不可变的 Change**，严格按执行顺序。

3. Receipt 的叶子（leaf）必须**保留原始的 Change 对象，且长度和顺序完全一致**。

4. 任何 revert、trace 失败、Receipt 解析失败、或覆盖不匹配，都是 terminal Warning。库暴露完整的 Receipt 树和结构化 Outcome；MCP 只把**验证过的、有序的叶子文本和 Warning** 返回给 Agent。

### 为什么"有序覆盖"是关键

想象一个恶意或出错的协议包，想隐瞒某笔转账。如果系统只要求"Receipt 提到了所有 Change 的类型"而不要求顺序和长度一致，攻击者可以重排、合并、丢弃 Change 来误导 Agent。Moss 要求 Receipt 叶子**逐字节对应**原始 Change 序列，等于给 Agent 一份"链上发生事实"的不可篡改摘要。

这对 AI Agent 场景尤其重要：LLM 无法可靠地审计原始 trace，但能可靠地比对"Receipt 文本"和"用户请求"是否语义一致。Moss 把不可信的链上执行，转换成 Agent 可推理的结构化证据。

---

## 四、为什么是 Monad，而不是任意 EVM 链？

Moss 当前只支持 Monad 主网（chain ID 143）。这不是随意选择，而是和 Monad 的特性强相关。

### Monad 的差异

我在 Week 1/2 系统读过 Monad 与 Ethereum 的差异（详见 Monad Docs 的 Differences 和 Best Practices）：
- 合约代码上限 128 KB（Ethereum 24 KB）
- Gas 按 gasLimit 收费而非 gasUsed
- 没有全局 mempool
- 不支持 Blob 交易

但这些对 Moss 来说都不是核心。核心是 Monad 的两个产品特性：

### 1. 低 gas + 高 TPS = Agent 高频调用变经济可行

Agent 要"操作链上协议"，意味着大量**模拟**（即使不发送，模拟也要读链上状态）。在 Ethereum 上，每次 `eth_call` 都有隐性成本（RPC 限流、节点负载）；在 Monad 上，高吞吐 + 低费用让 Agent **频繁模拟、频繁试探**变得几乎免费。

Moss 的 `simulate` 是核心步骤，而 Monad 让这个步骤可以海量执行而不心疼。

### 2. Monad 需要"Agent 原生"的基础设施

Monad 的叙事是"消费级体验的链上应用"。这类应用天然需要 Agent 层——用户说一句话，Agent 在链上完成一串操作。Moss 踩在这个叙事的正确位置上：它不只是一个技术框架，更是 Monad "Agent 原生"生态的基础件。

对比我在 DefiLlama 上看到的 Monad 生态（122 个协议，头部几乎都是 Aave/Uniswap/Morpho 这类"从以太坊平移"的成熟协议），Moss 是少数真正 **Monad-native** 的 AI Agent 基础设施项目。这种项目才是 Monad 差异化竞争力的真正来源。

---

## 五、与"其他 Agent 链上方案"的对比

为了说清 Moss 的定位，我做了一个对比视角：

| 方案类型 | 代表 | Agent 碰私钥？ | 验证方式 | 问题 |
|---------|------|--------------|---------|------|
| 钱包托管 Agent | 各类"AI 钱包" | ✅ 是 | 用户事后看账单 | 私钥在 Agent 边界内，被劫持即归零 |
| Agent + 多签阈值 | 一些 DAO 工具 | 部分 | 多签人审批 | 延迟高，不适合高频 |
| 意图(Intent)协议 | Anoma / 部分 solver 网络 | ❌ 否 | solver 竞价执行 | 信任 solver，且意图表达复杂 |
| **Moss** | nishuzumi/moss | **❌ 否** | **Receipt 有序覆盖验证** | 协议覆盖少（alpha），需 Maintainer 审包 |

Moss 的独特性在于：它不引入新的信任假设（不依赖 solver、不托管私钥），而是把**已有的"用户签名"范式原样保留**，只在前置环节做"翻译 + 预演 + 验证"。这是最小侵入、最大兼容的设计。

---

## 六、我看过的真实代码结构与生态信号

为了写这篇介绍，我实际读了 Moss 的仓库（不只是 README），有几个发现值得记下来：

### 架构：协议包驱动（Protocol-package driven）

```
packages/
├── core/          # 装饰器、Registry、参数契约、Capability 树、Receipt 验证
├── erc/           # 无地址的 ERC 协议、ABI、Receipt 语义
├── mcp-server/    # MCP 传输层（暴露 discover/load/action/simulate）
├── protocols/     # 各协议专属包（kuru 等）
├── simulator/     # debug_traceCall、状态链接、有序 Change 提取
└── system/        # Monad Runtime、官方常量、系统协议（WMON）
```

核心稳定，新协议通过 `protocol-*` 包扩展。Maintainer 把"接入新协议"的成本转移给社区，自己守住 core 验证层。这是聪明的去中心化开发策略——和 Hardhat 那种 25+ 包的 monorepo 思路一致。

### 生态信号：PR 比 Issue 更活跃

我拉了 Moss 的 PR 列表，发现 5 个 open PR 全是 feature adapter：
- #87（已合并）：Morpho Vaults V2 adapter
- #84（open）：Uniswap V4 adapter on Monad
- #86（open）：Wallet adapter
- #83（open）：IERC4626 ABI
- #85（open）：ERC1155 approve

**判断**：PR 全是 adapter 扩张、Issue 多是文档需求，说明项目处于"功能铺覆盖"期，不是"修 bug 维稳"期。结合只有 62 stars，这是**早期高潜力项目**的信号——看贡献密度比看 star 数更有意义。

### 专业信号：ADR 目录

Moss 有 `docs/adr/`（架构决策记录）。敢写 ADR 的项目，Maintainer 通常有工程经验，不是玩具项目。这是判断一个开源项目值不值得跟的三个小技巧之一。

---

## 七、我的第一次 Moss 开源实践

作为 Monad Builder Camp 的 **Research Builder**，我没有直接去写 adapter 代码（那是 Dev Builder 的主场，也需要更深的 TS + 链上协议功底），而是选择了 **Documentation 方向**——这恰好发挥了"研究 + 解释"的优势。

我注意到 Moss 的中文社区正在主动建设文档（已有中文 quick-start，Issue #76 已合并），但还缺一份系统的 FAQ。于是：

1. **Fork** 仓库，本地建分支 `docs/chinese-faq`
2. 写了 `docs/faq.zh-CN.md`，覆盖 10 个新人最常问的问题（Moss 是什么、会不会动钱、和钱包关系、支持的协议、怎么接 MCP、模拟意义、Receipt 验证、是否需付费、生产可用性、如何贡献）
3. 在 `README.zh-CN.md` 加了 FAQ 链接
4. 提交 **[PR #88](https://github.com/nishuzumi/moss/pull/88)**，对应 Issue #77

完整走通了开源协作链路：**Fork → 分支 → 修改 → 提交 → Pull Request**。重点不是 PR 是否被 merge，而是我真正进入了项目的 review 队列，我的改动可以被任何人在 GitHub 上验证。

这次实践让我确认了一件事：**开源贡献不等于写代码**。文档、教程、甚至一个高质量的 Issue，都是真实有效的贡献。对 Research 身份来说，把复杂协议"翻译给人听"本身就是核心价值——而这正是 Moss 这个项目存在的意义（把协议翻译成 Agent 懂的语言）的镜像。

---

## 八、作为研究者的批判性思考

写介绍文章不能只吹。几个我观察到的 Moss 局限和开放问题：

1. **协议覆盖仍是瓶颈**。核心机制再优雅，没有 protocol 包就等于没有能力。当前仅 WMON/ERC/Kuru，即使 PR 全合并也就多几个。生态冷启动靠社区贡献，速度不确定。

2. **"只模拟不签名"把复杂性推给用户侧**。Moss 解决了 Agent 侧的安全，但"用户怎么在钱包里确认 Receipt 和意图一致"这个问题，Moss 没解决——它只保证 Receipt 准确，不保证用户看得懂。这是 UX 层面的真问题。

3. **alpha + 未审计**。作者明确警告勿用于生产资金。作为基础设施，它的信任前提是"core 验证层正确"，而核心代码还没经过审计。早期采用需自担风险。

4. **Monad 主网成熟度**。chain ID 143 的主网刚起步，Moss 的实战采用率还很低。它赌的是 Monad Agent 生态会起来——这个前提目前是"很可能"而非"已发生"。

这些不是否定 Moss，而是界定它的适用边界。研究者写介绍，价值在于帮读者判断"这东西现在能用在哪、不能用在哪"，而不是制造 FOMO。

---

## 九、为什么你应该关注 Moss

按角色分：

- **开发者**：`protocol-*` 包架构意味着接新协议成本低，社区正在快速铺覆盖。想给某个 Monad 协议做 Agent 接入，从 Moss 起步比从零写 calldata 编码省一个数量级。
- **研究者 / 产品人**：Moss 是观察"AI × Web3"交叉点的好样本——它解决的是所有 Agent 链上化都会遇到的信任问题，思路可迁移到其他链。
- **学习者**：它的文档（README / Getting Started / ADR / MCP Tools）质量很高，是理解"Agent 协议抽象"的优秀教材，比读论文直观。

Moss 目前是未经审计的 alpha 软件，不适合生产资金。但作为 Monad 生态里少数 native 的 AI Agent 基础设施，它值得持续跟踪——尤其当它开始被真实产品集成时。

---

## 参考链接

- Moss GitHub: https://github.com/nishuzumi/moss
- 我的 PR #88: https://github.com/nishuzumi/moss/pull/88
- Issue #77 (FAQ 需求): https://github.com/nishuzumi/moss/issues/77
- MCP Tools 文档: https://github.com/nishuzumi/moss/blob/main/docs/mcp-tools.md
- Protocol Onboarding: https://github.com/nishuzumi/moss/blob/main/docs/protocol-onboarding.md
- Monad Docs (Differences): https://docs.monad.xyz/developer-essentials/differences
