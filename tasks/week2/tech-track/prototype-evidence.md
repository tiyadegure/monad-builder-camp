# Week 2 | Prototype Evidence（aPriori 质押 Agent 原型）

学分：40 · 技术赛道

可接受证据任选。以下是本原型能提供的材料组合。

## 1. GitHub repo / 代码片段

- PR #104（OPEN，非 draft）：https://github.com/nishuzumi/moss/pull/104
- 包路径：`packages/protocols/apriori/`
  - `src/abis/apriori.ts`：APRMON_ADDRESS + 三函数 ABI + 链上验证注释
  - `src/adapter.ts`：`@Protocol` + stake/unstake/claim 三 Capability + 三 Receipt
  - `test/adapter.test.ts`：4 个单元测试

## 2. README（最小结构）

**项目一句话介绍**：`@themoss/protocol-apriori` 让 AI Agent 在 Monad 上操作 aPriori aprMON 流动性质押（stake / 异步 unstake / claim）。

**如何运行或如何查看**：`pnpm --filter @themoss/protocol-apriori test` 看单测；`pnpm install && pnpm build` 构建；主网 e2e 见 PR 描述。

**当前完成了什么**：三 Capability 全部构建出正确链上交易（selector 链上验证）；Receipt 解析单测通过；typecheck/build/test 全过。

**哪些是 mock**：真实签名广播（Moss 只模拟不签名）；主网完整 simulate 零 Warning（deposit 模拟仍 revert，用 `convertToShares` 视图估算回报）；redeem 批量 `requestIds` 暂只支持单请求。

## 3. 本地运行截图 / 运行结果（文字证据）

单元测试：
```
 Test Files  1 passed (1)
      Tests  4 passed (4)
```

主网 e2e 构建的交易（实测）：
- stake    → `to: 0x0c65a0bc65a5d819235b71f554d210d3f80e0852`, `data: 0x6e553f65...`, `value: 0xde0b6b3a7640000` (1 MON)
- unstake  → `data: 0x107703ab...` (requestRedeem)
- claim    → `data: 0x492e47d2...` (redeem, requestIds=[7])

## 4. 测试网 / 主网交易 hash

本原型走"只模拟不签名"路径，不自动广播，故无交易 hash。链上验证用的是 `eth_call` 只读探测（非交易）：
- aprMON `0x0c65a0bc65a5d819235b71f554d210d3f80e0852`：EIP-7702 委托合约，逻辑在 `0x29fcb43b46531bca003ddc8fcb67ffe91900c762`
- 三函数 selector 经 `eth_call` 确认存在：`deposit 0x6e553f65`、`requestRedeem 0x107703ab`、`redeem 0x492e47d2`

## 5. mock 数据说明

- 回报估算：`deposit` 模拟 revert 期间，用 ERC4626 `convertToShares(1 MON)` 视图估算"约 0.98 aprMON"，非精确铸造量。
- receiver 在测试中用占位账户 `0xcccc...cccc` 验证交易构建（非真实持仓账户）。

## 6. Known Issues / 错误日志

- **主网 stake 模拟 revert**：`deposit(uint256,address)` 用真实余额账户 + value 调用仍 revert（unknown reason）。函数存在（selector 验证），卡在业务逻辑层（receiver 形式 / 最小量 / 白名单待确认）。不影响交易构建正确性，影响端到端 simulate 零 Warning。
- **redeem 数组参数**：Moss 当前 param 类型无数组变体，`claim` 暂只接受单 `requestId`，批量领取待框架支持后补。
- **unstake/claim 主网 simulate**：requestRedeem/redeem 的 simulate 同样未端到端验证（需真实 aprMON 持仓与已过 unbonding epoch 的 request），MVP 聚焦交易构建 + Receipt 解析正确性。

## 提交指引

提交 PR #104 链接 + 本 README 即可证明原型可检查。
GitHub 主页：https://github.com/tiyadegure
