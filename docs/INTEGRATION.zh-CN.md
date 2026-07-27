# Monad PreFlight 集成指南

> 原文：https://github.com/tiyadegure/monad-preflight/blob/main/docs/INTEGRATION.md

## 集成对象

PreFlight 的引擎是一个**无 UI、确定性的 TypeScript SDK**（`src/lib`，通过 `src/lib/sdk.ts` 导出）。对 integrator 而言，你只需要调用一个入口：

```ts
import { assessTransaction } from "tiyadegure/monad-preflight/src/lib/sdk";
```

`assessTransaction` 一行完成：模拟 → 风险 → 评分 → 解释。

## 前提条件

- Node.js >= 18
- 一个 Monad RPC endpoint（mainnet `143` 或 testnet `10143`）
- （可选）浏览器钱包（MetaMask 或兼容钱包），用于真实签名

## 快速开始

```bash
npm install
npm run dev          # → http://localhost:5173
```

测试网 gas：[faucet.monad.xyz](https://faucet.monad.xyz)

## 引擎调用流程

```
 "send 0.5 MON to 0xabc…"       或        粘贴原始 tx JSON
        │
        ▼
 parseIntent ────────── 规则语法；Claude fallback（可选，带标签）
        ▼
 buildTx (viem) ─────── 未签名 tx：to / data / value + 人类可读摘要
        ▼
 simulateTx ─────────── debug_traceCall → 调用树、事件、revert reason、
        │               gas；ERC-20 元数据链上读取；RPC failover
        ▼
 assessRisks ────────── 15 条确定性规则 → 按严重级别排序
        ▼
 composeExplanation ─── plain language，第二人称，零术语
        ▼
 FLIGHT PLAN ────────── 你阅读，你决定，你的钱包签名
        ▼
 comparePostFlight ──── 链上 receipt vs 模拟结果，逐行对比
```

## SDK 返回结构

```ts
interface FlightPlan {
  intent: string;                // 原始自然语言输入
  parsed: ParsedIntent;          // 解析后的动作 / 金额 / 对象
  tx: UnsignedTransaction;       // viem 未签名交易
  simulation: SimulationResult;  // debug_traceCall 结果
  risks: RiskFinding[];          // 按严重级别排序
  readiness: "Cleared" | "Hold" | "Grounded";  // 就绪评分
  explanation: string;           // plain language 解释
  postFlight?: PostFlightCheck;  // 上链后对比（可选）
}
```

## 风险检测规则（15 条确定性 + 4 条链上 counterparty 检查）

| 类别 | 规则 | 说明 |
|------|------|------|
| 授权类 | unlimited approval | 无限授权额度 |
| 授权类 | approval to personal wallet drainer pattern | 授权给个人钱包的 drainer 模式 |
| 地址类 | never-used recipient | 从未使用过的接收地址（可能是 typo） |
| 地址类 | address-poisoning lookalike | 地址 poisoning 仿冒地址 |
| 交易类 | guaranteed revert | 一定会 revert 的交易 |
| 交易类 | zero-value transfer bait | 零值转账诱饵 |
| 代币类 | token-symbol impersonation | 代币符号仿冒 |
| 交易类 | ... | ... |

完整规则见 `src/lib/risks/`。

## Risk API（HTTP 服务）

引擎也可以作为**无状态 HTTP 服务**供钱包和 dapp 嵌入：

```bash
# 本地启动
npx wrangler dev workers/risk-api.ts
```

请求体：原始交易 JSON 或自然语言 intent  
响应：同一个 `FlightPlan` JSON

生产环境请部署 [origin-locked proxy](docs/ai-proxy.md)（key 存在服务端、origin-locked、rate-limited）。

## 与钱包 / dapp 的集成方式

1. **钱包扩展**：拦截 dapp 的签名请求，注入 `assessTransaction` 管道，在用户看到钱包弹窗前展示 Flight Plan。
2. **dapp 内嵌**：在“确认交易”按钮旁调用 Risk API，把 `readiness` 和 `risks` 渲染到你的 UI。
3. **只读观察模式**：不需要钱包，输入任意地址即可扫描其最近 Approval 事件和风险。

## 双语支持

- UI chrome：英文 / 简体中文，121 个 key  parity-tested
- 中文意图解析：`发送 0.5 MON 到 0x…` 可确定性解析，不需要 AI
- AI 生成文本（风险说明、模拟注释）当前仅英文；路线图中包含中文翻译

## 安全模型

- **私钥**：永不经过 PreFlight。引擎只构建未签名交易，钱包负责签名。
- **AI key（本地模式）**：用户自带 Anthropic key，仅存于浏览器 localStorage，仅发送给 Anthropic。
- **无追踪**：无 analytics，无第三方调用（除 RPC 和可选的 Anthropic）。
- **模拟诚实**：模拟是当前状态的尽力预览，不是上链结果的保证；post-flight check 存在就是为了让这一点可验证。

## 部署

静态应用，可部署到任意静态托管：

```bash
npm run build
```

AI co-pilot 生产环境请部署 [Cloudflare Worker proxy](docs/ai-proxy.md)。

## 已知限制与路线图

- ~~Risk API~~ → 已 shipped（参考 worker：`docs/risk-api.md`）；后续需要 hosted-grade 硬化（auth / quotas / caching）
- Swap 支持（通过链上 DEX router）
- 钱包扩展 companion（拦截任意 dapp 请求并 pre-flight）
- EIP-5792 `wallet_sendCalls` batch 解释器已 shipped；batch  composing / submitting 未完成
- Aave v3 verb 解码（supply / withdraw / borrow / repay），让 Monad 最高频 DeFi 流以 plain language 展示
- 生成文本（风险说明、模拟注释）翻译为中文
- Monad 蓝筹代币内置 canonical registry（USDe、sUSDe …），让 symbol-impersonation 零配置生效

## AI 使用披露

代码使用 AI-assisted coding（Claude Code）：contracts-first specs、每模块单测、每行可解释。运行时 AI（Claude）可选、带标签、严格约束于模拟器已验证的事实。

## 许可证

MIT
