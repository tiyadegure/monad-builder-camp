# Week 2 | Challenge | 为 Moss 新增 Protocol Adapter（aPriori）

## 任务信息

- 任务类型：Challenge · 为 Moss 新增 Protocol Adapter
- 学分：100
- 选择协议：**aPriori（Monad 原生 MON 流动性质押）**
- Adapter 名称：`@themoss/protocol-apriori`
- 功能：MON → APR 质押（stake）、APR → MON 赎回（unstake）

## 完成度：MVP 阶段（架构闭环已完成，合约地址待确认）

### 已验证

| 项 | 状态 |
|----|------|
| adapter 包创建 | ✅ `@themoss/protocol-apriori` |
| discover / load / action 闭环 | ✅ 主网 e2e 跑通，discover 返回 `apriori.stake`，action 构建正确 calldata |
| Receipt parser（stake） | ✅ 单元测试通过，主网模拟执行 |
| typecheck / build / test | ✅ 全过 |
| APR 代币地址 | ✅ 链上验证：`0x0a332311633c0625f63cfc51ee33fc49826e0a3c`（code 存在，symbol APR，18 decimals） |
| StakeManager 地址 | ⚠️ 待确认（见下） |

### 阻塞点：StakeManager 合约地址

Moss 的 ADR 0007 要求 fixed address 必须提供来源且做链上 bytecode 校验。当前沙箱网络无法访问 aPriori 外部文档（前端/官方文档域名不通），因此 aPriori 在 Monad 主网的 StakeManager 部署地址无法 100% 确认：

- 候选 `0x76bEC366eD6aC559A6fFaA63d88b33110C355d8C`：e2e 模拟时 stake 调用 revert（无代码）
- APR token 的 `owner()` 返回 `0x1869bFd77D61d5025471b095221e97388F6bb849`（344 bytes，有 stake 函数但代码过小，疑似 proxy/多签）

**需要你提供**：aPriori 在 Monad 主网的 StakeManager 合约地址（可从 aPriori 前端 app 或官方文档查到）。我填入后 adapter 即可真上主网 simulate 通过，然后提 PR。

### 代码位置

- 本地分支：`/tmp/moss` 的 `feat/apriori-staking-adapter`（已 commit，未 push upstream）
- 文件：
  - `packages/protocols/apriori/src/adapter.ts`（stake/unstake Capability + Receipt）
  - `packages/protocols/apriori/src/abis/apriori.ts`（ABI + 地址常量）
  - `packages/protocols/apriori/test/adapter.test.ts`（Registry + parseReceipt 测试）

### 下一步（完善阶段）

1. 填入正确的 StakeManager 地址，主网 e2e 确认零 Warning
2. 补 `unstake` 的主网 e2e 验证
3. 加 changeset
4. 接入 example 或 docs 演示
5. 提 PR 到 nishuzumi/moss，根据 review 迭代
