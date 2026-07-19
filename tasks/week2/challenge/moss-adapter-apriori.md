# Week 2 | Challenge | 为 Moss 新增 Protocol Adapter（aPriori）

## 任务信息

- 任务类型：Challenge · 为 Moss 新增 Protocol Adapter
- 学分：100
- 协议：**aPriori（Monad 原生 MON 流动性质押 / aprMON LST）**
- Adapter：`@themoss/protocol-apriori`
- PR：https://github.com/nishuzumi/moss/pull/104

## 已完成（按 aPriori 官方文档修正）

三个 Capability，对应 aPriori Vault 的真实函数（selector 链上验证）：

| Moss verb | aPriori 函数 | selector | 说明 |
|-----------|-------------|----------|------|
| `stake` | `deposit(uint256 assets, address receiver)` payable | `0x6e553f65` | MON→aprMON，MON 是 native 所以 payable+value |
| `unstake` | `requestRedeem(uint256 shares, address receiver)` | `0x107703ab` | 入队退出请求（异步） |
| `claim` | `redeem(uint256[] requestIds, address receiver)` | `0x492e47d2` | 等 unbonding epoch 后领 MON |

## 关键链上发现

- aprMON `0x0c65a0bc65a5d819235b71f554d210d3f80e0852` 是 **EIP-7702 委托合约**，逻辑在 `0x29fcb43b46531bca003ddc8fcb67ffe91900c762`（48k bytes）
- 三个入口函数 selector 均链上确认存在
- `discover`/`load`/`action` 主网验证构建正确交易（to=aprMON，data=对应 selector，stake 带 value=MON）
- Receipt parser 用 ERC4626 事件：Deposit / RequestRedeem / Redeem

## 验证

- `pnpm typecheck` / `build` / `test` 全过（4 个测试：3 Capability 构建 + 2 Receipt 解析）
- 主网 e2e：三个 verb 均正确构建交易，selector 与官方文档一致

## 待完善（等 Maintainer review）

- 完整主网 simulate 零 Warning（deposit 模拟仍 revert，可能是 receiver/最小量约定）
- 补 changeset
- 接入 example/docs 演示
