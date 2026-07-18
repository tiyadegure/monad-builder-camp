---
title: 'Moss 新手教程：30 分钟跑通你的第一个 Agent 链上模拟'
description: '面向新人的 Moss 上手教程：从环境配置到第一次模拟一笔 Kuru swap，配流程图解与实操步骤。'
pubDate: 2026-07-18
tags: ['web3', 'monad', 'ai-agent', 'tutorial', 'moss']
---

# Moss 新手教程：30 分钟跑通你的第一个 Agent 链上模拟

> 这份教程帮你从零把 [Moss](https://github.com/nishuzumi/moss) 跑起来，模拟一笔真实的 Monad 链上交易——**不需要私钥、不需要有钱包、不需要懂 Solidity**。

---

## 一、Moss 在做一件什么事？

先不碰代码，看图理解 Moss 在 Agent 和链之间的位置：

<div class="moss-flow">
  <div class="moss-node agent">AI Agent<br/>意图发起方</div>
  <div class="moss-arrow">discover → load →<br/>action → simulate</div>
  <div class="moss-node moss">Moss<br/>翻译与预演</div>
  <div class="moss-arrow">未签名交易<br/>+ Receipt 证据</div>
  <div class="moss-node chain">Monad 链<br/>状态与执行</div>
</div>

<p class="moss-caption">Moss 站在 Agent 和链之间：把"人话意图"翻译成"可验证的未签名交易"，模拟后产出 Receipt，但<strong>永远不签名、不发送</strong>。</p>

一句话：**Agent 负责"想做什么"，Moss 负责"翻译成链能懂的话并预演"，钱包负责"真正签字"。** 三者分离，Agent 碰不到你的钱。

---

## 二、环境准备

Moss 是 TypeScript 项目，需要两个工具：

| 工具 | 版本 | 检查命令 |
|------|------|---------|
| Node.js | ≥ 22 | `node --version` |
| pnpm | ≥ 11 | `pnpm --version` |

如果没装 pnpm：

```bash
npm install -g pnpm
```

---

## 三、四步跑通第一个模拟

### 步骤总览

<div class="moss-steps">
  <div class="moss-step"><span class="moss-step-n">1</span><div><strong>Fork & Clone</strong><br/>拿到代码副本</div></div>
  <div class="moss-step"><span class="moss-step-n">2</span><div><strong>Install & Build</strong><br/>装依赖、编译</div></div>
  <div class="moss-step"><span class="moss-step-n">3</span><div><strong>跑示例</strong><br/>wrap / swap 模拟</div></div>
  <div class="moss-step"><span class="moss-step-n">4</span><div><strong>看 Receipt</strong><br/>读懂模拟证据</div></div>
</div>

### Step 1：Fork & Clone

```bash
# 在 GitHub 上点 Fork，然后 clone 你自己的副本
git clone https://github.com/<你的用户名>/moss
cd moss
```

> 想参与贡献？从 Fork 开始，而不是直接 clone 原仓库。这样你才能提交 PR。

### Step 2：Install & Build

```bash
pnpm install
pnpm build
```

先验证工具链没问题（**不需要访问 RPC**）：

```bash
pnpm test:offline
```

看到测试通过，说明环境 OK。

### Step 3：跑第一个示例（WMON wrap）

```bash
pnpm --filter @themoss/example-simple-flow wrap
```

这个命令会：发现 WMON，加载参数契约，构建 wrap Capability，模拟，打印有序 Receipt。

再跑一个 Kuru swap 示例：

```bash
pnpm --filter @themoss/example-simple-flow swap
```

它会请求 MON/USDC 报价，构建一笔 swap，并在当前 Kuru 市场上模拟。

### Step 4：读懂 Receipt

示例最后打印的不是一句"成功"，而是这样的结构：

<div class="moss-receipt">
  <div class="moss-receipt-title">Receipt（模拟证据）</div>
    <ul>
      <li>零 Warning</li>
      <li>有序 Change：MON 减少 / USDC 增加 / 事件触发</li>
      <li>结构化 Outcome 与你的请求一致</li>
    </ul>
</div>

**重点**：最终检查的是"零 Warning + Receipt 与请求一致"，不是一句成功文案。这就是 Moss 的安全模型——先验证，后签名。

---

## 四、把它接进你的 AI Agent（MCP）

Moss 提供 MCP server，暴露 4 个工具：`discover` / `load` / `action` / `simulate`。把它加进任意 MCP 客户端：

```jsonc
{
  "mcpServers": {
    "moss": {
      "command": "node",
      "args": ["<path-to-moss>/packages/mcp-server/dist/cli.js"],
      "env": { "MOSS_RPC_URL": "https://rpc.monad.xyz" }
    }
  }
}
```

接入后，你的 Agent 就能这样工作：

<div class="moss-flow">
  <div class="moss-node agent">用户：<br/>"把 1 MON 换成 USDC"</div>
  <div class="moss-arrow">→</div>
  <div class="moss-node moss">Moss<br/>discover(swap)<br/>load → action<br/>simulate</div>
  <div class="moss-arrow">→</div>
  <div class="moss-node chain">Receipt<br/>输出 X USDC<br/>滑点 Y%</div>
</div>

<p class="moss-caption">Agent 拿到 Receipt 后，比对"用户请求"和"模拟结果"是否一致，一致才交钱包签名。</p>

---

## 五、四步流程逐层图解

这是 Moss 核心工作流的详细版，建议对照代码看：

<div class="moss-pipeline">
  <div class="moss-stage">
    <div class="moss-stage-h">① discover</div>
    <p>问"有哪些协议 / 操作？"</p>
    <pre class="moss-code">&#123;"verb":"swap"&#125;</pre>
    <p class="moss-out">→ 返回坐标：kuru.swap</p>
  </div>
  <div class="moss-stage">
    <div class="moss-stage-h">② load</div>
    <p>加载意图、风险标签、参数契约</p>
    <pre class="moss-code">&#123;"items":[&#123;"protocol":"kuru","method":"swap"&#125;]&#125;</pre>
    <p class="moss-out">→ Stub：参数类型与范围</p>
  </div>
  <div class="moss-stage">
    <div class="moss-stage-h">③ action</div>
    <p>构建未签名交易 + Capability 树</p>
    <pre class="moss-code">tokenIn, amountIn, slippage</pre>
    <p class="moss-out">→ 未签名 tx（不发送）</p>
  </div>
  <div class="moss-stage">
    <div class="moss-stage-h">④ simulate</div>
    <p>debug_traceCall 跑交易</p>
    <pre class="moss-code">记录 Event + MON 转账</pre>
    <p class="moss-out">→ 有序 Receipt 证据</p>
  </div>
</div>

---

## 六、想参与开源贡献？从这里开始

Moss 欢迎文档和协议包贡献。新人最友好的入口：

1. **写文档 / FAQ**：中文社区正在建设，Issue #77 就在征集 FAQ
2. **接新协议**：读 `docs/protocol-onboarding.md`，照着 Kuru 的例子写一个 `protocol-*`
3. **提交 PR**：Fork 到 分支 到 改 → `gh pr create`

> 真实案例：我就是用这份教程里的方法，提交了中文 FAQ 的 [PR #88](https://github.com/nishuzumi/moss/pull/88)。从 Fork 到 PR 不到一小时。

---

## 七、常见坑

| 问题 | 解决 |
|------|------|
| `pnpm: command not found` | 先 `npm install -g pnpm` |
| `build` 报错说找不到类型 | 必须先 `pnpm build` 再 `typecheck`（dist 里有生成声明） |
| RPC 连不上 | 示例只读主网状态做模拟，不需要私钥；检查 `MOSS_RPC_URL` |
| 想发真实交易 | Moss 不支持——它只模拟。签名发送由你的钱包层做 |

---

## 八、下一步学什么

- 读 [Getting Started](https://github.com/nishuzumi/moss/blob/main/docs/getting-started.md) 逐层重建流程
- 读 [MCP Tools](https://github.com/nishuzumi/moss/blob/main/docs/mcp-tools.md) 理解 4 个工具的输入输出
- 读 [Protocol Onboarding](https://github.com/nishuzumi/moss/blob/main/docs/protocol-onboarding.md) 写自己的协议包

---

<div class="moss-tip">
  <strong>注意：</strong> Moss 是未经审计的 alpha 软件，请勿用于生产资金。它适合学习、原型和研究。
</div>

## 参考链接

- Moss 仓库: https://github.com/nishuzumi/moss
- 我的中文 FAQ PR: https://github.com/nishuzumi/moss/pull/88
- Getting Started: https://github.com/nishuzumi/moss/blob/main/docs/getting-started.md
- MCP Tools: https://github.com/nishuzumi/moss/blob/main/docs/mcp-tools.md


