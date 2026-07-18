# Week 2 | Challenge | Moss 开源贡献计划

## Builder 身份

**Research Builder** —— 偏生态研究、产品判断、技术解释、文档与教程。

结合 Moss 当前状态（62 stars、中文社区正在主动建设文档、PR 以 adapter 扩张为主），我的贡献方向聚焦在 **Documentation + 技术笔记 + 开发者体验优化**，而非写 adapter 代码（那是 Dev Builder 的主场）。

---

## 贡献方向选择

基于 Moss Issues 和我的身份，选择 **两个互补方向**：

### 方向 A：Documentation（Ops/Research 交叉）
- 对应 Issue **#77**（open）：为中文新人加 FAQ 文档
- 对应 Issue **#73**（open）：中文本地部署教程（Windows 新手）
- 理由：Moss 已有中文 quick-start（#76 已合并），但 FAQ 和本地部署教程仍缺。中文社区在主动建设，我有金融 + Web3 背景，能写出"新人真的会问"的 FAQ

### 方向 B：技术笔记 / 架构解释（Research 主战场）
- 输出一篇《Moss 安全模型解读》技术笔记
- 解释核心设计：`discover → load → action → simulate` 为什么安全、Receipt 验证如何确保 Agent 不越权
- 理由：Moss 的"只模拟不签名"机制是它最独特的价值，但 README 偏简洁，新人难理解"为什么这样设计"。作为 Research，把架构翻译成人话是核心能力

---

## 为什么选它（而非 Dev 方向）

| 选项 | 判断 |
|------|------|
| Dev: 写 Uniswap V4 adapter (#84) | 需要深度 TS + 链上协议知识，我目前工程积累不够，强行做质量难保证 |
| Dev: 修 bug | Moss 还是 alpha，bug 多但需先理解全代码库，投入产出比低 |
| **Research: 文档 + 技术笔记** | ✅ 发挥研究/解释优势，解决真实存在的文档缺口（#77/#73），且不需碰核心代码，风险低、价值明确 |

---

## 本周贡献目标（具体）

| 优先级 | 任务 | 对应 Issue | 预计产出 |
|--------|------|-----------|---------|
| P0 | 写中文 FAQ 文档 | #77 | `docs/faq.zh-CN.md` + 提交 PR |
| P1 | 写《Moss 安全模型解读》技术笔记 | 新内容 | 一篇公开技术笔记（仓库 wiki 或 blog） |
| P2 | 补充 Windows 本地部署教程 | #73 | `docs/local-deploy-windows.zh-CN.md` + PR |

---

## 预计产出

1. **PR 1**：`docs/faq.zh-CN.md` —— 覆盖"Moss 是什么 / 和钱包什么关系 / 支持哪些协议 / 怎么接入 MCP / 常见问题"
2. **技术笔记**：《Moss 安全模型：为什么 Agent 能操作链上协议却不碰私钥》—— 发布在个人学习仓库 + 可转发
3. **PR 2（如时间够）**：`docs/local-deploy-windows.zh-CN.md` —— 手把手 Windows 新手部署

---

## 完成计划（时间线）

| 步骤 | 动作 | 依赖 |
|------|------|------|
| 1 | Fork + Clone Moss 仓库，本地 `pnpm install && pnpm build` 跑通 | Node 22 + pnpm 11 |
| 2 | 读 `docs/mcp-tools.md` + `docs/getting-started.md` 确认 FAQ 内容准确性 | 无 |
| 3 | 写 `docs/faq.zh-CN.md`，覆盖 8-10 个新人真实问题 | 步骤 2 |
| 4 | 提交 PR 到 nishuzumi/moss，引用 Issue #77 | 步骤 3 |
| 5 | 写《安全模型解读》笔记，用 `discover→load→action→simulate` 流程图解释 | 步骤 2 |
| 6 | 发布笔记，链接回 Moss 仓库 | 步骤 5 |
| 7 | （可选）Windows 部署教程 + PR | 步骤 4 之后 |

---

## 成功标准

- [ ] 至少 1 个 PR 被 Maintainer 接收或进入 review
- [ ] 技术笔记被至少 1 个 Monad / Moss 中文社区成员看到并反馈
- [ ] 对 Moss 架构形成"能讲给新人听"的完整理解

---

## 参考资料

- Moss 仓库: https://github.com/nishuzumi/moss
- Issue #77 (FAQ): https://github.com/nishuzumi/moss/issues/77
- Issue #73 (Windows 教程): https://github.com/nishuzumi/moss/issues/73
- MCP Tools 文档: https://github.com/nishuzumi/moss/blob/main/docs/mcp-tools.md
- Getting Started: https://github.com/nishuzumi/moss/blob/main/docs/getting-started.md
