# aPriori 质押 Agent — 最小项目原型（Week 3 Dev）

## 这是什么

一个最小可运行的 CLI 原型，演示 **AI Agent 通过 Moss 框架把"Stake X MON into aPriori"变成链上交易** 的核心流程。项目即本周落地的 `@themoss/protocol-apriori` adapter（PR #104）的用户面雏形。

## 目前完成了什么

- 用户输入金额 → Agent 通过 Moss `discover → load → action` 构建指向 aPriori aprMON 金库的正确交易（selector `0x6e553f65` deposit，payable）
- 用 ERC4626 `convertToShares` 视图估算用户将获得的 aprMON 数量（真实链上调用）
- 退出流程在 adapter 层已支持 `unstake`(requestRedeem) / `claim`(redeem) 两步

## 如何查看或运行

```bash
# 依赖 moss fork 已构建的 adapter（/tmp/moss）
node stake-agent.mjs <金额MON> [receiver地址]

# 示例
node stake-agent.mjs 1
```

前置：`/tmp/moss` 已 `pnpm install && pnpm --filter @themoss/protocol-apriori build`，且 node_modules 含 `@themoss/core` / `@themoss/erc` / `@themoss/system` / `viem`。

## 哪些功能真实可用

- ✅ 交易构建：`deposit` 交易草稿（to / selector / value / receiver）正确生成，selector 链上验证
- ✅ Receipt 估算：`convertToShares` 真实主网视图调用返回 aprMON 数量
- ✅ adapter 单测 4/4 通过，主网 e2e 三 verb 构建正确（PR #104）

## 哪些功能暂时使用 Mock

- ⚠️ **签名与广播**：Moss 设计即"只模拟不签名"，交易草稿交用户钱包，原型不广播
- ⚠️ **完整 simulate 零 Warning**：主网 `deposit` 模拟仍 revert（receiver/最小量约定待确认），不影响交易构建正确性
- ⚠️ **redeem 批量领取**：adapter 当前仅支持单 `requestId`，批量待框架支持

## 目前还有什么问题

- 主网 `deposit` 端到端 simulate 未零 Warning（卡业务逻辑层，非构建层）
- 原型是 CLI，无前端/对话界面；receiver 默认占位账户，未接真实钱包登录
- 退出流程（unstake→claim）需真实 aprMON 持仓与已过 unbonding epoch 的 request，未端到端验证

## 100 字说明（提交用）

aPriori 质押 Agent 最小原型：用户输入金额，Agent 经 Moss 框架构建指向 aprMON 的 deposit 交易（selector 链上验证），并用 convertToShares 真实估算回报。交易草稿待用户签名广播（不碰私钥）。真实可用：交易构建 + 视图估算 + 4 单测；Mock：广播、端到端 simulate、批量赎回。代码见 PR #104。

## 证据链接

- 代码 PR：https://github.com/nishuzumi/moss/pull/104
- adapter 源码：packages/protocols/apriori/
- 技术赛道记录：../tech-track/
- 运行截图：./assets/stake-agent-run.png
