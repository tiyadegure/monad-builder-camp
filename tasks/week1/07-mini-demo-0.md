# Mini Demo 0 — Week 1 研究笔记

## 研究主题

AI 辅助链上开发的工作流研究：从 Prompt 到链上验证的完整闭环

---

## 研究问题

1. AI 生成的 Solidity 合约质量如何？需要人工做哪些判断？
2. 从合约生成到链上部署，完整链路有哪些环节和坑？
3. 什么样的产品场景真正需要链上，而不是普通数据库？

---

## 研究方法

**实践驱动**：不是纯理论分析，而是亲手走完一遍完整流程，记录每一步的真实体验。

---

## 研究发现

### 发现 1：AI 生成代码的可用性与局限

AI 能生成 90% 正确的合约，但有 3 个必须人工判断的地方：

| 判断点 | AI 的选择 | 我的修改 | 为什么人必须介入 |
|--------|----------|----------|----------------|
| 数据可见性 | `public` | `private` | 涉及封装设计，AI 不理解"对外暴露什么"的取舍 |
| 事件命名 | `NewMessage` | `MessagePosted` | 语义准确性需要领域理解 |
| 函数取舍 | 加了 `messageCount()` | 删除 | AI 倾向于"多加功能"，人需要判断"什么不需要" |

**结论：** AI 是很好的初稿生成器，但设计决策、安全边界、复杂度控制必须由人来做。

### 发现 2：完整链路的环节与踩坑

```
Prompt → AI 代码 → 人工审查 → 编译 → 部署 → 交互 → 浏览器验证
```

踩坑记录：
- **钱包不统一**：新建的钱包和之前质押用的不是同一个，导致部署时余额不足
- **ABI 解码失败**：struct 数组的返回类型不能简单指定，需要 raw call + 手动解码
- **浏览器链接错误**：monexplorer.com 不存在，正确的是 monadvision.com

**结论：** 每个环节都有坑，走一遍完整流程比看十篇教程更有用。

### 发现 3：什么场景真正需要链上

研究了 Onchain Task Board（链上任务/悬赏系统）场景：

| 维度 | 分析 |
|------|------|
| 为什么需要频繁交互 | 任务发布、认领、提交、评审、发放每个节点都是一次链上操作 |
| 链慢/贵时的问题 | 以太坊上 5 美元赏金要 3 美元 gas，完全不经济 |
| Monad 的帮助 | 低 gas 让微赏金可行，亚秒确认让体验接近 Web2 |
| 为什么不用数据库 | 赏金锁定在合约里"完成就自动发放"，不存在"平台不给钱" |

**结论：** 链上产品的核心价值是"信任模型"，不是"技术栈"。"不用信我，代码都在链上"比"更快更便宜"更能解释为什么需要区块链。

---

## 研究产出

| 产出 | 链接 |
|------|------|
| 合约源码 | [MessageBoard.sol](../contracts/MessageBoard.sol) |
| 部署记录 | [04-deploy-monad-contract.md](04-deploy-monad-contract.md) |
| 高频场景分析 | [05-monad-high-freq-scenario.md](05-monad-high-freq-scenario.md) |
| Build Log | [06-week1-build-log.md](06-week1-build-log.md) |

## 链上验证

| 操作 | 交易 Hash | 浏览器 |
|------|-----------|--------|
| 质押 1 MON | `0x5f52ac5d...f7ae052` | [查看](https://testnet.monadvision.com/tx/0x5f52ac5d15229cc40cbf50c8a7c24e961b5ef8ae45a7a8241947b259df7ae052) |
| 部署合约 | `0x705c92ad...c13c9612` | [查看](https://testnet.monadvision.com/tx/0x705c92ad022293ea3090b49e293d1556ee8d2e902757c696f123f37cf13c9612) |
| postMessage | `0x5cc8bc7b...61d00b2` | [查看](https://testnet.monadvision.com/tx/0x5cc8bc7b93056fe97417385fbce51fa3dd2d409bd493a6964674f45fd61d00b2) |

合约地址：[`0x5e99f144D3e512f525d24077D4626a064899E177`](https://testnet.monadvision.com/address/0x5e99f144D3e512f525d24077D4626a064899E177)

---

## 方向选择：Research

选择 Research 方向进入 Week 2。

**理由：**
1. 金融专业背景，擅长结构化分析和报告
2. 先建立对 Monad 生态的系统性理解，再深入技术
3. 研究报告本身就是 Proof of Work，可用于求职

**Week 2 想推进的问题：**
1. Monad 生态项目分析（DeFi、Social、Gaming 各赛道）
2. AI Agent × 链上交互的工具链和最佳实践
3. 高频交互产品设计模式（除 Task Board 外的其他场景）

---

## 作品集/简历一句话

> 使用 AI 辅助开发 + 人工审查模式，在 Monad Testnet 部署并交互了链上留言板合约，完成从 Prompt 到链上验证的完整闭环，同时产出 Monad 高频交互场景研究报告。
