# Week 2 | AI-assisted Dev Plan（aPriori 质押 Agent 原型）

## 我要做的最小功能是什么？

一个最小可用的 **AI 质押 Agent**：用户用自然语言说"把 X MON 质押进 aPriori"，Agent 通过 Moss 框架自动 discover → load → action → simulate，构建出指向 aPriori aprMON 金库的正确交易，并解析 Receipt 回报用户将获得的 aprMON 数量。

核心就是本周落地的 `@themoss/protocol-apriori` adapter：把 aPriori 的 `deposit` / `requestRedeem` / `redeem` 三个真实合约函数封装成 Agent 可调用的 Capability。

## 谁会使用它？

- 想在 Monad 上参与 aPriori 流动性质押、但不想手动连钱包点前端的用户
- 上层 Treasury OS / AI Agent 编排者（aPriori、ether.fi、Lido 等 LST 统一走 ERC4626 + 异步赎回模型，本 adapter 是其中 aPriori 这一块）

## 用户完成的一个动作是什么？

用户说：**"Stake 1 MON into aPriori"**
→ Agent 返回：一笔 `to=0x0c65...aprMON`、`data=0x6e553f65(deposit)`、`value=1 MON` 的交易草稿 + Receipt（"你将获得约 0.98 aprMON"），并在模拟通过后等待用户签名广播。

## 我需要读哪 1–3 个文档？

1. **Moss `docs/protocol-onboarding.md`** + **ADR 0007** —— adapter 编写规范、固定地址必须链上验证
2. **aPriori 官方文档（deposit / requestRedeem / redeem 章节）** —— 确认 Vault 真实函数签名与异步赎回流程
3. **Moss `packages/core` README / 类型定义** —— Capability / Receipt / verb 受控词表、risk 标签规则

## 本周真实实现什么？哪些可以 mock？

**真实实现（已完成，PR #104）：**
- `@themoss/protocol-apriori` 包：stake / unstake / claim 三 Capability
- 链上验证 aprMON 地址与三函数 selector（deposit `0x6e553f65`、requestRedeem `0x107703ab`、redeem `0x492e47d2`）
- 三个 Receipt parser（Deposit / RequestRedeem / Redeem 事件）
- typecheck / build / 4 个单元测试 / 主网 e2e 交易构建全过

**可以 mock / 暂不做的：**
- 真实签名与广播：Moss 设计就是"只模拟不签名"，这一步天然 mock（交给用户钱包）
- 主网 stake 完整 simulate 零 Warning：deposit 模拟仍 revert，用 `convertToShares` 视图估算回报（mock 精确 shares）
- redeem 的 `requestIds` 数组参数：MVP 先支持单请求领取，批量领取后续补
- example / docs 演示页：本周先不接，等 review

## 我如何证明它做出来了？

1. **PR #104** 已提交（OPEN，非 draft）：https://github.com/nishuzumi/moss/pull/104
2. **单元测试通过**：`pnpm test` 4 个测试绿（3 Capability 构建 + 2 Receipt 解析）
3. **主网 e2e 实测输出**：三 verb 均构建出正确交易
   - stake → `to: 0x0c65a0bc...`, `data: 0x6e553f65...`, `value: 0xde0b6b3a7640000` (1 MON)
   - unstake → `data: 0x107703ab...`
   - claim → `data: 0x492e47d2...`
4. **链上验证证据**：aprMON 为 EIP-7702 委托合约，逻辑在 `0x29fcb43b46531bca003ddc8fcb67ffe91900c762`，三函数 selector 经 `eth_call` 确认存在

## 提交信息（用于平台）

- 计划文档：tasks/week2/challenge/ai-assisted-dev-plan.md
- 关联 PR：https://github.com/nishuzumi/moss/pull/104
- GitHub 主页：https://github.com/tiyadegure
