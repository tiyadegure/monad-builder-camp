# MessageBoard — 最简链上留言板

## 概述

任何人可以在 Monad 链上发一条留言，留言永久存储，包含发送者地址、内容和时间戳。

## 合约地址

`0x5e99f144D3e512f525d24077D4626a064899E177`（Monad Testnet, Chain ID 10143）

## 函数

| 函数 | 类型 | 说明 |
|------|------|------|
| `postMessage(string calldata content)` | write | 发一条留言 |
| `getMessages()` | read | 读取所有留言（返回 Message[]） |

## 部署

```bash
forge create contracts/MessageBoard.sol:MessageBoard \
  --rpc-url https://testnet-rpc.monad.xyz \
  --private-key <你的私钥> \
  --broadcast
```

## 交互

```bash
# 发留言
cast send <合约地址> "postMessage(string)" "Hello!" \
  --rpc-url https://testnet-rpc.monad.xyz --private-key <私钥>

# 读留言
cast call <合约地址> "getMessages()" \
  --rpc-url https://testnet-rpc.monad.xyz
```

## 技术栈

- Solidity ^0.8.0
- Foundry（forge / cast）
- Monad Testnet

## 区块浏览器

https://testnet.monadvision.com/address/0x5e99f144D3e512f525d24077D4626a064899E177
