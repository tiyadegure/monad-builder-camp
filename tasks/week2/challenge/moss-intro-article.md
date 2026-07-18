# Moss 介绍：当 AI Agent 遇上 Monad 链上协议

> 一个把"链上操作"翻译成 Agent 语言的开源框架，解决 AI 时代的人机信任边界问题。

---

## 一、Moss 是什么？

[Moss](https://github.com/nishuzumi/moss) 是一个开源框架，它的目标是把 Monad 链上的协议交互，封装成 **AI Agent 可以直接调用的"能力"（Capability）**。

用一句话概括它的工作流：

```
discover → load → action → simulate
  发现   →  加载  →  执行  →  模拟
```

Agent 先"发现"某个协议支持哪些操作（比如 Kuru 的 swap），"加载"这个操作的参数规则，"执行"构建出一笔交易，最后"模拟"验证这笔交易到底会做什么——**全程不涉及签名和发送**。

这正是 Moss 最反直觉、也最聪明的地方：**它只构建和验证未签名交易，永不签名、永不发送。**

---

## 二、它解决了什么问题？

要理解 Moss 的价值，得先看 AI Agent 想操作链上协议时的三个死结：

**1. Agent 看不懂协议**
每个 DeFi 协议都有自己的一套 ABI、calldata 构造、参数规则。让 Agent 直接调用，出错率极高。

**2. Agent 不能碰私钥**
传统 Web3 交互是"人签名、人确认"。Agent 时代，人不想每笔都确认，但把私钥交给 Agent = 把金库钥匙交给一个会幻视的程序。

**3. 即使模拟了，Agent 也难以验证结果**
"这笔交易到底干了什么？"——没有结构化证据，Agent 和人类都无法确认。

Moss 的解法很优雅：**协议方自己维护"操作包"**（地址、ABI、calldata、参数规则、Receipt 解析），Agent 只调用标准化的 Capability；所有交易先模拟，产出可验证的结构化 Receipt；**签名环节独立保留在钱包层**。

换句话说，Moss 不做钱包、不签名，它只做三件事：**翻译、预演、验证**。

---

## 三、为什么 AI Agent 需要 Moss？

核心矛盾是：**Agent 需要高频操作链上协议，但不能拥有资金控制权。**

Moss 在 Agent 和链之间建了一道"信任边界"：

- Agent 发起意图 → Moss 翻译成可验证的未签名交易
- Moss 模拟执行 → 产出有序的 Change + 结构化 Receipt
- Agent / 用户核对 Receipt 与意图一致 → 才交给钱包签名

这就像给 Agent 配了一个"副驾"：Agent 负责说"我想去哪"，副驾负责规划路线、检查路况，但踩油门（签名）的永远是司机（用户）。

对 Monad 来说这格外重要。Monad 主打"高性能 + 低 gas"，这意味着 **Agent 可以非常频繁地调用协议，而模拟成本几乎可以忽略**。Moss 踩在了 Monad 差异化特性的正确位置上——它不只是一个技术框架，更是 Monad "Agent 原生"叙事的基础设施。

---

## 四、我的第一次 Moss 开源实践

作为 Monad Builder Camp 的 Research Builder，我没有直接去写 adapter 代码（那是 Dev Builder 的主场），而是选择了 **Documentation 方向**——这恰好发挥了研究/解释的优势。

我注意到 Moss 的中文社区正在主动建设文档（已有中文 quick-start），但还缺少一份系统的 FAQ。于是我：

1. **Fork** 了仓库，本地建分支 `docs/chinese-faq`
2. 写了 `docs/faq.zh-CN.md`，覆盖 10 个新人最常问的问题（Moss 是什么、会不会动钱、怎么接 MCP、模拟的意义……）
3. 在 `README.zh-CN.md` 加了 FAQ 链接
4. 提交 **[PR #88](https://github.com/nishuzumi/moss/pull/88)**，对应 Issue #77

整个过程走通了完整的开源协作链路：**Fork → 分支 → 修改 → 提交 → Pull Request**。重点不是 PR 是否被 merge，而是我真正进入了项目的 review 队列，我的改动可以被任何人在 GitHub 上验证。

这次实践让我意识到：**开源贡献不等于写代码**。文档、教程、甚至一个高质量的 Issue，都是真实有效的贡献——而且对 Research 身份来说，把复杂协议"翻译给人听"本身就是核心价值。

---

## 五、为什么你应该关注 Moss

如果你是一个：
- **开发者**：Moss 的 `protocol-*` 包架构意味着接新协议的成本很低，社区正在快速铺覆盖（Morpho、Uniswap V4、Wallet adapter 都在 PR 中）
- **研究者 / 产品人**：Moss 是观察"AI × Web3"交叉点的好样本——它解决的是所有 Agent 链上化都会遇到的信任问题
- **学习者**：它的文档（README / Getting Started / ADR）质量很高，是理解 Agent 协议抽象的优秀教材

Moss 目前是未经审计的 alpha 软件，不适合生产资金。但作为 Monad 生态里少数"native"的 AI Agent 基础设施项目，它值得持续跟踪。

---

## 参考链接

- Moss GitHub: https://github.com/nishuzumi/moss
- 我的 PR #88: https://github.com/nishuzumi/moss/pull/88
- Issue #77 (FAQ 需求): https://github.com/nishuzumi/moss/issues/77
- MCP Tools 文档: https://github.com/nishuzumi/moss/blob/main/docs/mcp-tools.md
