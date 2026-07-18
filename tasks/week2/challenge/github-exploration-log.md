# Week 2 | Challenge | GitHub 探索日志

> 学习阅读真实开源项目的结构、Issues、PRs，理解 Maintainer 如何组织项目。

探索对象：
1. **[nishuzumi/moss](https://github.com/nishuzumi/moss)** — Monad AI Agent 协议框架（重点）
2. **[argotorg/solidity](https://github.com/argotorg/solidity)** — Solidity 语言本体（参考）
3. **[NomicFoundation/hardhat](https://github.com/NomicFoundation/hardhat)** — 以太坊开发环境（参考）

---

## 1. Moss — 重点探索

### 项目数据（2026-07-17）

| 指标 | 值 |
|------|-----|
| Stars | 62 |
| Forks | 33 |
| Open Issues | 55（含 PR） |
| 语言 | TypeScript |
| 协议支持 | WMON、ERC-20/721、Kuru |

### 目录结构

```
moss/
├── packages/
│   ├── core/          # 装饰器、Registry、参数契约、Capability 树、Receipt 验证
│   ├── erc/           # 无地址的 ERC 协议、ABI、Receipt 语义
│   ├── mcp-server/    # MCP 传输层 + 应用组合（暴露 discover/load/action/simulate）
│   ├── protocols/     # 各协议专属包（kuru 等）
│   ├── simulator/     # debug_traceCall、状态链接、有序 Change 提取
│   └── system/        # Monad Runtime、官方常量、系统协议（WMON）
└── docs/
    ├── README.md
    ├── getting-started.md / .zh-CN.md
    ├── mcp-tools.md
    ├── protocol-onboarding.md   # 如何创建新协议包
    ├── agent-skill.md
    └── adr/                      # 架构决策记录
```

### README / Docs

- README 清晰分中英文，核心讲 `discover → load → action → simulate` 流程和"只模拟不签名"的安全定位
- Docs 有完整的 Getting Started 教程和 Protocol Onboarding 指南——说明 Maintainer 希望社区贡献 protocol 包
- `adr/` 目录记录架构决策——专业做法，方便后来者理解"为什么这样设计"

### Issues（感兴趣的）

| # | 状态 | 标题 | 我的兴趣点 |
|---|------|------|-----------|
| #77 | open | docs: 为中文新人加 FAQ | 社区驱动的中文文档建设 |
| #67 | open | 对齐公开架构并验证仓库 | 透明度信号 |
| #66 | open | MCP: 暴露 binding 和 label 安全 | 安全边界讨论 |
| #65 | open | ERC: 绑定 ERC721 集合并观察元数据 | 能力扩展方向 |
| #63 | open | Core: 观察 Query 元数据做链上标签 | 可观测性 |

### Pull Requests（最感兴趣）

| # | 状态 | 标题 | 意义 |
|---|------|------|------|
| #87 | closed | feat(protocols): 加 Morpho Vaults V2 adapter | 已合并，Lending 赛道接入 |
| #86 | open | feat(protocols): 加 Wallet adapter | Agent 钱包交互 |
| #84 | open | feat(protocol/uniswap-v4): 上 Monad 的 Uniswap V4 adapter | DEX 赛道扩展 |
| #83 | open | feat(erc): 加 IERC4626 ABI | 收益金库标准 |
| #85 | open | feat(erc1155): 加 approve Capability | 多代币标准 |

**最感兴趣的 PR：#84 — Uniswap V4 adapter on Monad**

为什么感兴趣：
- Uniswap V4 是以太坊上最复杂的 DEX 版本（hooks 机制），如果 Moss 能在 Monad 上封装它，说明框架的 Capability 抽象足够通用
- 结合 Week 2 生态扫描，Uniswap V4 在 Monad TVL 已达 $0.84B，这个 adapter 落地后 Agent 就能自动在 Monad 上做 Uniswap V4 swap
- 直接呼应 Moss 的定位："把协议交互变成 Agent 可调用的能力"

### 我的发现

1. **Moss 是"协议包驱动"架构**：核心稳定，新协议通过 `protocol-*` 包扩展。Maintainer 把"接入新协议"的成本转移给社区，自己守住 core 验证层
2. **PR 活跃度高于 Issue 讨论**：5 个 open PR 都是 feature adapter，说明开发者在"铺协议覆盖"而非修 bug——项目处于功能扩张期
3. **中文社区在主动建设文档**：#76 已合并中文 quick-start，#77 提议中文 FAQ——说明有中文用户群在参与
4. **adr/ 目录是专业信号**：敢写架构决策记录的项目，通常 Maintainer 有工程经验，不是玩具项目

---

## 2. argotorg/solidity — 参考

| 指标 | 值 |
|------|-----|
| Stars | 25.7k |
| Forks | 6.1k |
| Open Issues | 794 |
| 语言 | C++ |

**观察**：这是以太坊基金会 Solidity 编译器的官方镜像（argotorg 是 Ethereum Foundation 关联账号）。仓库巨大、Issue 多，是"基础设施级"项目的典型规模。和 Moss 对比：Moss 是早期项目（62 stars），Solidity 是成熟基础设施（25k stars），差距反映项目阶段。

---

## 3. NomicFoundation/hardhat — 参考

| 指标 | 值 |
|------|-----|
| Stars | 8.5k |
| Forks | 1.7k |
| Open Issues | 613 |
| 语言 | TypeScript |

**目录结构特点**：monorepo，25+ packages（hardhat-ether、hardhat-foundry、hardhat-verify 等），每个功能独立成包。和 Moss 的 monorepo 结构思路一致——说明这是 TS 区块链工具项目的标准组织方式。

---

## 学习收获

1. **monorepo + 按功能拆包**是 TS 区块链项目的标准结构（Hardhat 和 Moss 都这样）
2. **README 双语 + Getting Started + ADR** 是"希望社区参与"的项目标配
3. **看 PR 比看 Issue 更能判断项目阶段**：Moss 的 PR 全是 adapter 扩张，说明在铺协议覆盖；Solidity 的 Issue 多是 bug/提案，说明在维护期
4. **Stars 不是一切**：Moss 才 62 stars 但 PR 活跃，是早期高潜力项目；判断项目要看"贡献密度"而非单纯 star 数
5. **Maintainer 的组织逻辑**：Moss 把 core 验证层守住，协议接入交给社区——这是聪明的去中心化开发策略

---

## 参考资料

- Moss: https://github.com/nishuzumi/moss
- Moss PR #84 (Uniswap V4): https://github.com/nishuzumi/moss/pull/84
- Moss protocol-onboarding: https://github.com/nishuzumi/moss/blob/main/docs/protocol-onboarding.md
- Solidity: https://github.com/argotorg/solidity
- Hardhat: https://github.com/NomicFoundation/hardhat
