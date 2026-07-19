# Week 2 | 文档到代码骨架（aPriori adapter）

学分：30 · 技术赛道

## 文档链接

Moss 协议接入规范：https://github.com/nishuzumi/moss/blob/main/docs/protocol-onboarding.md
（及 ADR 0007：固定地址必须链上验证 + explorer provenance 注释）

## 我让 AI 帮我理解了什么

1. Moss 的 Protocol / Capability / Receipt 三层抽象：Protocol 用 `@Protocol` 装饰器声明合约与 ABI；Capability 用 `@Capability` 暴露一个用户意图（verb + params + receipt）；Receipt 用 `@Receipt` 把链上 changes（nativeTransfer / event）解析成结构化 outcome。
2. `discover → load → action → simulate` 四步运行时流程，以及"只模拟不签名"的安全模型。
3. 受控 verb 词表（`stake/unstake/claim/...`）与必填 `risk` 标签规则——这是写代码前最容易踩的框架约束。
4. aPriori 合约形态：aprMON 是 EIP-7702 委托合约，真实 stake 逻辑在委托到的实现合约，且 aPriori 是 native-asset ERC4626 vault + 异步赎回队列（不是传统 staking contract）。

## AI 生成了什么代码骨架 / 技术方案

AI 基于 `packages/protocols/_template` 生成了 `@themoss/protocol-apriori` 初始骨架：
- `package.json` / `tsconfig.json` / `vitest.config.ts`
- `src/abis/apriori.ts`：APRMON_ADDRESS + 最小 ABI
- `src/adapter.ts`：`@Protocol` 装饰器 + 一个 `stake` Capability + `stakeReceipt`
- `test/adapter.test.ts`：Registry 构建 + parseReceipt 单测
- 主网 e2e 脚本（probe/verify/e2e）

技术方案：把 aPriori 的三个合约函数映射为 Moss 受控 verb——`deposit→stake`、`requestRedeem→unstake`、`redeem→claim`，每个配对应 Receipt 事件解析。

## 我手动改了什么

1. **修正合约地址与函数**：AI 初始假设 aprMON 是标准 ERC4626、`deposit(uint256)` 单参，主网模拟 revert。我链上 decode bytecode 确认 aprMON 是 EIP-7702 委托合约，并改用官方文档的真实签名 `deposit(uint256 assets, address receiver)` payable（selector `0x6e553f65`），以及 `requestRedeem` / `redeem` 两步异步赎回。
2. **加链上验证注释**（ADR 0007 要求）：在 abi 文件写明 aprMON 的 EIP-7702 委托关系、实现合约地址、三个 selector，全部标注"verified on-chain 2026-07-18"。
3. **补三 Capability + 三 Receipt**：从单 stake 扩展到 stake/unstake/claim 完整三步，Receipt 解析 Deposit / RequestRedeem / Redeem 事件。
4. **修框架约束**：`claim` 必须声明非空 `risk`，补 `["fundOut"]`；redeem 的 `requestIds` 数组参数 Moss 当前无数组 param 类型，MVP 降级为单 `requestId`。
5. **测试修正**：stake 测试补 `receiver` 参数；Deposit 事件 Receipt 字段从 `staked` 改名为 `assets` 对齐 ABI；补 unstake/claim 的构建与解析测试。

## 当前是否跑通

**部分跑通。**
- `pnpm typecheck` / `build` / `test`（4 测试）全过
- 主网 `discover/load/action` 正确构建三笔交易，selector 与官方文档一致
- 但主网完整 `simulate` 对 stake 仍 revert（疑似 receiver/最小量约定未完全确认）

## 如果没跑通，卡在哪里

主网 `deposit` 模拟 revert：aPriori 的 stake 完整调用约定（是否需要特定 receiver 形式、最小质押量、或白名单）需最终对照 aPriori 文档/Maintainer 确认。函数 selector 已链上验证存在，卡在业务逻辑层而非框架层。

## 证据链接

- PR #104：https://github.com/nishuzumi/moss/pull/104
- adapter 源码（fork）：`nishuzumi/moss` → 分支 `feat/apriori-staking-adapter` → `packages/protocols/apriori/`
- GitHub 主页：https://github.com/tiyadegure
