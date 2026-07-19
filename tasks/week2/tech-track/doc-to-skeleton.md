# Week 2 | 文档到代码骨架（aPriori adapter）

学分：30 · 技术赛道

> 参考案例思路：像 uniswap / aave / makerdao 那样，先吃透一个核心协议文档，再生成最小代码骨架，记录人工修改。本任务选的核心文档是 **Moss 协议接入规范**。

## 文档链接

- Moss 协议接入规范：`https://github.com/nishuzumi/moss/blob/main/docs/protocol-onboarding.md`
- ADR 0007（固定地址必须链上验证 + explorer provenance 注释）
- 辅助：aPriori 官方文档 deposit / requestRedeem / redeem 章节

## 我让 AI 帮我理解了什么

1. **Moss 三层抽象**：`@Protocol` 声明合约与 ABI；`@Capability` 暴露一个用户意图（verb + params + receipt）；`@Receipt` 把链上 `changes`（nativeTransfer / event）解析成结构化 outcome。
2. **四步运行时**：`discover → load → action → simulate`，以及 "先验证后签名" 的安全模型。
3. **框架硬约束**：verb 是受控词表（`stake/unstake/claim/...`），每个 Capability 必须声明非空 `risk` 标签。
4. **aPriori 合约形态**：aprMON 是 EIP-7702 委托合约，真实 stake 逻辑在委托到的实现合约；aPriori 是 native-asset ERC4626 vault + 异步赎回队列（不是传统 staking contract）。

## AI 生成了什么代码骨架 / 技术方案

基于 `packages/protocols/_template` 生成 `@themoss/protocol-apriori` 骨架：

```ts
// src/abis/apriori.ts（MVP 初始，后被完善修正）
export const APRMON_ADDRESS = "0x0c65a0bc65a5d819235b71f554d210d3f80e0852" as const;
export const AprMonAbi = parseAbi([
  "function stake() payable returns (uint256 shares)",
]);
```

```ts
// src/adapter.ts（MVP 初始：单 stake）
@Capability({ verb: "stake", params: { amount }, receipt: "stakeReceipt", risk: ["fundOut"] })
async stake(params) {
  const amountBase = parseUnits(params.amount, 18);
  return [this.aprMon.stake([], { value: amountBase })];
}
```

技术方案：aPriori 函数映射为 Moss verb —— `deposit→stake`、`requestRedeem→unstake`、`redeem→claim`。

## 我手动改了什么（MVP → 完善）

**1. 修正合约函数（最关键）**：MVP 假设 `stake()` 单参，主网模拟 revert。我链上 decode bytecode 确认 aprMON 是 EIP-7702 委托合约，改用官方文档真实签名，补全 ABI：

```ts
// src/abis/apriori.ts（完善后）
export const AprMonAbi = parseAbi([
  "function deposit(uint256 assets, address receiver) payable returns (uint256 shares)",
  "function requestRedeem(uint256 shares, address receiver) returns (uint256 requestId)",
  "function redeem(uint256[] requestIds, address receiver) returns (uint256 assets)",
  "function convertToShares(uint256 assets) view returns (uint256)",
  "function convertToAssets(uint256 shares) view returns (uint256)",
  "event Deposit(address indexed sender, address indexed owner, uint256 assets, uint256 shares)",
  "event RequestRedeem(address indexed sender, address indexed owner, uint256 shares, uint256 requestId)",
  "event Redeem(address indexed sender, address indexed owner, uint256[] requestIds, uint256 assets)",
]);
```

**2. 加链上验证注释（ADR 0007 要求）**：写明 EIP-7702 委托关系、实现合约地址、三个 selector，全部标注 "verified on-chain 2026-07-18"。

**3. 扩展为三 Capability + 三 Receipt**：从单 stake 到完整三步：

```ts
@Capability({ verb: "stake",   params: stakeParams,   receipt: "stakeReceipt",   risk: ["fundOut","priceImpact"] })
async stake(p)   { return [this.aprMon.deposit([parseUnits(p.amount,18), p.receiver], { value: parseUnits(p.amount,18) })]; }

@Capability({ verb: "unstake", params: unstakeParams, receipt: "unstakeReceipt", risk: ["priceImpact"] })
async unstake(p) { return [this.aprMon.requestRedeem([parseUnits(p.shares,18), p.receiver])]; }

@Capability({ verb: "claim",   params: claimParams,   receipt: "claimReceipt",   risk: ["fundOut"] })
async claim(p)   { return [this.aprMon.redeem([[BigInt(p.requestId)], p.receiver])]; }
```

**4. 修框架约束**：`claim` 必须声明非空 risk，补 `["fundOut"]`；redeem 的 `requestIds` 数组参数 Moss 当前无数组 param 类型，MVP/完善阶段降级为单 `requestId`。

**5. 测试对齐**：stake 测试补 `receiver`；Deposit 事件 Receipt 字段由 `staked` 改名 `assets` 对齐 ABI；补 unstake/claim 构建与解析测试。

### AI 生成的初始骨架 vs 最终代码（差异 diff）

下面是 AI 初始骨架（MVP，错误假设）与我手动修正后的最终代码（完善）的关键差异。

**ABI：`stake()` 单参 → 三函数 + 事件**
```diff
- // AI 初始（MVP，错误）
- export const AprMonAbi = parseAbi([
-   "function stake() payable returns (uint256 shares)",
- ]);
+ // 最终（完善，链上验证）
+ export const AprMonAbi = parseAbi([
+   "function deposit(uint256 assets, address receiver) payable returns (uint256 shares)",
+   "function requestRedeem(uint256 shares, address receiver) returns (uint256 requestId)",
+   "function redeem(uint256[] requestIds, address receiver) returns (uint256 assets)",
+   "event Deposit(address indexed sender, address indexed owner, uint256 assets, uint256 shares)",
+   "event RequestRedeem(address indexed sender, address indexed owner, uint256 shares, uint256 requestId)",
+   "event Redeem(address indexed sender, address indexed owner, uint256[] requestIds, uint256 assets)",
+ ]);
```

**Capability：单 stake → 三步骤映射**
```diff
- // AI 初始（MVP）
- @Capability({ verb: "stake", params: { amount }, receipt: "stakeReceipt", risk: ["fundOut"] })
- async stake(params) {
-   const amountBase = parseUnits(params.amount, 18);
-   return [this.aprMon.stake([], { value: amountBase })];   // ❌ stake() 不存在
- }
+ // 最终（完善）：deposit→stake, requestRedeem→unstake, redeem→claim
+ @Capability({ verb: "stake", params: stakeParams, receipt: "stakeReceipt", risk: ["fundOut","priceImpact"] })
+ async stake(p) { return [this.aprMon.deposit([parseUnits(p.amount,18), p.receiver], { value: parseUnits(p.amount,18) })]; }
+
+ @Capability({ verb: "unstake", params: unstakeParams, receipt: "unstakeReceipt", risk: ["priceImpact"] })
+ async unstake(p) { return [this.aprMon.requestRedeem([parseUnits(p.shares,18), p.receiver])]; }
+
+ @Capability({ verb: "claim", params: claimParams, receipt: "claimReceipt", risk: ["fundOut"] })
+ async claim(p) { return [this.aprMon.redeem([[BigInt(p.requestId)], p.receiver])]; }
```

**差异根因**：AI 初始按"标准 ERC4626 `stake()`"假设，主网 simulate revert；链上 decode 确认 aprMON 是 EIP-7702 委托合约，最终按 aPriori 官方文档改为 payable `deposit(uint256,address)` + 异步 `requestRedeem`/`redeem`。

## 当前是否跑通

**部分跑通。**
- ✅ `pnpm typecheck` / `build` / `test`（4 测试）全过
- ✅ 主网 `discover/load/action` 正确构建三笔交易，selector 与官方文档一致
- ⚠️ 主网完整 `simulate` 对 stake 仍 revert（疑似 receiver/最小量约定）

## 如果没跑通，卡在哪里

主网 `deposit` 模拟 revert：`deposit(uint256,address)` 用真实余额账户 + value 调用仍 revert（unknown reason）。函数存在（selector 验证），卡在业务逻辑层（receiver 形式 / 最小质押量 / 白名单待最终确认）。不影响交易构建正确性。

## 证据链接

- PR #104：https://github.com/nishuzumi/moss/pull/104
- adapter 源码：`nishuzumi/moss` → 分支 `feat/apriori-staking-adapter` → `packages/protocols/apriori/`
- GitHub 主页：https://github.com/tiyadegure
