# Mini Demo 0 — Week 1 作品提交

## 作品链接

**GitHub 仓库：** https://github.com/tiyadegure/monad-builder-camp

**核心文件：**
- 合约源码：[contracts/MessageBoard.sol](../contracts/MessageBoard.sol)
- 部署记录：[tasks/week1/04-deploy-monad-contract.md](04-deploy-monad-contract.md)
- Build Log：[tasks/week1/06-week1-build-log.md](06-week1-build-log.md)

---

## 我做了什么

Week 1 完成了一个完整的"AI 辅助链上开发"闭环：

```
Prompt → AI 生成合约 → 人工审查修改 → 编译 → 部署到 Monad Testnet → read/write 交互 → 浏览器验证
```

具体产出：
- 一个部署在 Monad Testnet 的 **MessageBoard 留言板合约**
- 一次完整的 **AI + 人工协作开发流程**记录
- 一份 **Monad 高频交互场景研究**（Onchain Task Board）
- 一份 **Week 1 Build Log**（问题、收获、方向选择）

---

## 哪部分是真实链上操作

| 操作 | 交易 Hash | 浏览器 |
|------|-----------|--------|
| 质押 1 MON | `0x5f52ac5d...f7ae052` | [链接](https://testnet.monadvision.com/tx/0x5f52ac5d15229cc40cbf50c8a7c24e961b5ef8ae45a7a8241947b259df7ae052) |
| 部署 MessageBoard 合约 | `0x705c92ad...c13c9612` | [链接](https://testnet.monadvision.com/tx/0x705c92ad022293ea3090b49e293d1556ee8d2e902757c696f123f37cf13c9612) |
| 调用 postMessage | `0x5cc8bc7b...61d00b2` | [链接](https://testnet.monadvision.com/tx/0x5cc8bc7b93056fe97417385fbce51fa3dd2d409bd493a6964674f45fd61d00b2) |

合约地址：[`0x5e99f144D3e512f525d24077D4626a064899E177`](https://testnet.monadvision.com/address/0x5e99f144D3e512f525d24077D4626a064899E177)

全部在 Monad Testnet（Chain ID 10143）上完成，可链上验证。

---

## 哪部分由 AI 辅助完成

- **合约初稿生成**：AI 根据 Prompt 生成了完整的 MessageBoard.sol（61 行）
- **编译验证**：AI 自动用 Solc 0.8.35 编译确认无语法错误
- **中文注释**：AI 在合约中加入关键注释，方便理解

---

## 我做了哪些人工判断和修改

| 修改点 | AI 初稿 | 我的判断 | 理由 |
|--------|---------|----------|------|
| `messages` 可见性 | `public` | `private` | 封装更干净，外部只能通过 getMessages() 读取 |
| 事件名 | `NewMessage` | `MessagePosted` | "Posted" 比 "New" 更准确表达动作 |
| `messageCount()` | 有 | 删除 | 链下可获取，不需要额外链上函数 |
| getMessages 分页 | 未考虑 | 识别为设计限制 | 留言多时会 gas 溢出，生产环境需加分页 |

**核心判断：AI 能写出 90% 正确的代码，但可见性、命名、函数取舍这些设计决策必须由人来做。**

---

## 方向选择：Research

### 理由

1. **背景匹配**：金融专业，习惯做结构化分析和报告
2. **能力互补**：先建立对 Monad 生态的系统性理解，再深入技术
3. **长期价值**：研究报告本身就是 Proof of Work，可用于求职和社区影响力

### Week 2 想继续推进的问题

1. Monad 生态项目分析 — DeFi、Social、Gaming 各赛道有哪些值得关注的项目？
2. AI Agent × 链上交互 — 目前有什么成熟工具链？最佳实践是什么？
3. 高频交互产品的设计模式 — 除了 Task Board，还有哪些场景真正需要链上？

---

## 作品集/简历一句话

> 使用 AI 辅助开发 + 人工审查模式，在 Monad Testnet 部署并交互了链上留言板合约，完成从 Prompt 到链上验证的完整闭环，同时产出 Monad 高频交互场景研究报告。
