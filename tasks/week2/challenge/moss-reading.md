# Week 2 | Challenge | Moss 开源项目阅读

## 项目简介

**Moss** 是一个把 Monad 链上协议交互封装成 **AI Agent 可调用的 Capability（能力）** 的框架。核心流程是 `discover → load → action → simulate`：发现协议、加载能力、执行动作、模拟交易。

关键点：**Moss 只构建和验证未签名交易，永不签名、永不发送。** 它把"链上操作"变成 Agent 能理解、能验证、但不越权执行的标准化接口。

- GitHub: https://github.com/nishuzumi/moss
- 作者: nishuzumi
- 当前支持: Monad 主网（chain ID 143）
- 已支持协议: WMON、ERC-20/721、Kuru（DEX）

---

## 核心问题

**AI Agent 想操作链上协议，但缺少"安全的中间层"。**

问题拆解：
1. Agent 不懂每个协议的 ABI、calldata 构造、参数规则 —— 直接调用容易出错
2. Agent 不能随便签名发交易 —— 资金安全风险
3. 即使模拟了交易，Agent 也难以验证"这笔交易到底干了什么" —— 缺少可检查的证据

Moss 的解法：协议方自己维护"操作包"（地址、ABI、calldata、参数规则、Receipt 解析），Agent 只调用标准化的 Capability，所有交易先模拟产生可验证的 Receipt，签名交给独立的钱包层。

---

## 核心能力

| 能力 | 说明 |
|------|------|
| **Protocol-owned Operations** | 协议包自己拥有地址、ABI、calldata 构造、参数规则、Receipt 解析 |
| **Simulation as Evidence** | 每笔成功交易产出有序的原始 Change + 结构化 Receipt，必须完整覆盖所有 Change |
| **Signing Separation** | MCP Agent 先比对 Receipt 文本和用户请求；SDK 可用结构化 Outcome，钱包最后才接触未签名交易 |
| **MCP Server** | 暴露 `discover` / `load` / `action` / `simulate` 四个工具，接入任何 MCP 客户端 |
| **Verification** | Receipt 叶子必须保留原始 Change 对象，顺序和长度完全一致；任何不匹配都是 terminal Warning |

---

## 可能应用场景

1. **AI 交易助手**：用户说"把 1 MON 换成 USDC"，Agent 通过 Moss 调用 Kuru swap，先模拟确认滑点和输出，再交用户签名
2. **自动化 DeFi 策略 Agent**：定时复投、收益再平衡，Moss 提供安全的"预演"层，Agent 只决策不碰私钥
3. **链上操作审计**：每笔 Agent 发起的操作都有结构化 Receipt 证据链，可回溯
4. **新手引导**：Moss 的 `discover` 让 Agent 自动发现某协议支持哪些操作，降低集成成本
5. **Monad 生态 Agent 基础设施**：随着更多 protocol-* 包被社区贡献，Moss 可能成为 Monad 上 Agent 交互的标准层

---

## 我的理解

Moss 解决的是一个被忽视但关键的问题：**AI Agent 和链之间的"信任边界"。**

传统 Web3 交互是"人签名、人确认"。Agent 时代，人不想每笔都确认，但也不能把私钥交给 Agent。Moss 的定位很聪明——它不做钱包、不签名，只做"翻译 + 预演 + 验证"：把协议语言翻译成 Agent 语言，把每笔交易变成可验证的证据，让签名环节保持独立。

这正好呼应了 Week 1 我研究的 Onchain Task Board 场景——如果 Agent 能自动认领任务、执行链上操作，Moss 这类框架就是必需的基础设施。也是 Monad "高频 + 低 gas" 特性最适合落地的方向之一：Agent 频繁调用协议，模拟成本低，用户体验接近实时。

**对 Research 的启发：** Moss 是 Monad-native 的 AI Agent 基础设施项目（区别于 Week 2 生态扫描里看到的"以太坊协议平移"类）。这类项目才是 Monad 差异化竞争力的真正来源，值得持续跟踪。

---

## 参考链接

- Moss GitHub: https://github.com/nishuzumi/moss
- 英文 README: https://github.com/nishuzumi/moss/blob/main/README.md
- 中文 README: https://github.com/nishuzumi/moss/blob/main/README.zh-CN.md
- MCP Tools 文档: https://github.com/nishuzumi/moss/blob/main/docs/mcp-tools.md
- Getting Started: https://github.com/nishuzumi/moss/blob/main/docs/getting-started.md

## 提交材料

- GitHub 用户主页: https://github.com/tiyadegure
- Star 状态: ✅ 已 Star `nishuzumi/moss`
- 理解分享: 见上方"我的理解"节（约 200 字）
