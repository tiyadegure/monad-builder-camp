#!/usr/bin/env node
/**
 * aPriori 质押 Agent —— 最小 CLI 原型 (Week 3 Dev)
 *
 * 核心流程：用户输入 "Stake <amount> MON into aPriori"
 *   → 通过 Moss 框架构建出指向 aPriori aprMON 金库的正确交易
 *   → 解析 Receipt，回报用户将获得的 aprMON 数量（视图估算）
 *
 * 注意：本原型走 "只模拟不签名" 路径，不广播、不碰私钥。
 * 真实函数与 selector 全部链上验证（见 PR #104）。
 */
import { Registry } from "@themoss/core";
import * as erc from "@themoss/erc";
import { AprioriProtocol } from "/tmp/moss/packages/protocols/apriori/dist/index.js";
import * as system from "@themoss/system";
import { parseUnits, formatUnits } from "viem";

const ACCOUNT = process.argv[3] || "0xcccccccccccccccccccccccccccccccccccccccc";
const amount = process.argv[2];

if (!amount || Number.isNaN(Number(amount))) {
  console.error('用法: node stake-agent.mjs <金额MON> [receiver地址]');
  console.error('示例: node stake-agent.mjs 1');
  process.exit(1);
}

const runtime = await system.monadRuntime({ rpcUrl: "https://rpc.monad.xyz" });
const registry = new Registry(runtime).use(system, erc, AprioriProtocol);

console.log(`\n> 用户意图: "Stake ${amount} MON into aPriori"`);
console.log(`> Agent 通过 Moss 构建交易...\n`);

const capability = await registry.action("apriori", "stake", ACCOUNT, {
  amount,
  receiver: ACCOUNT,
});
if (capability.kind !== "capability") throw new Error("expected capability");

const tx = capability.children?.[0]?.transaction;
const selector = tx?.data?.slice(0, 10);

console.log("构建出的交易草稿:");
console.log("  to     :", tx?.to, "(aPriori aprMON)");
console.log("  selector:", selector, "(deposit)");
console.log("  value  :", tx?.value, `(${amount} MON)`);
console.log("  receiver:", ACCOUNT, "\n");

// 视图估算：ERC4626 convertToShares（mock 精确铸造量时的近似）
try {
  const client = await runtime.client;
  const shares = await client.readContract({
    address: "0x0c65a0bc65a5d819235b71f554d210d3f80e0852",
    abi: [{ type: "function", name: "convertToShares", stateMutability: "view", inputs: [{ type: "uint256" }], outputs: [{ type: "uint256" }] }],
    functionName: "convertToShares",
    args: [parseUnits(amount, 18)],
  });
  console.log(`> Receipt 估算: 你将获得约 ${formatUnits(shares, 18)} aprMON`);
} catch {
  console.log("> Receipt 估算: convertToShares 视图调用暂不可用（mock: ≈0.98 aprMON / MON）");
}

console.log("\n✅ 交易草稿已生成，待用户在钱包中签名广播（Agent 不碰私钥）。");
console.log("   退出流程: unstake → claim 两步（requestRedeem → redeem，异步）。\n");
