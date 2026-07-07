# 任务 4：部署你的第一个 Monad 合约

## 合约信息

| 项目 | 值 |
|------|-----|
| 合约名 | MessageBoard |
| 合约地址 | `0x5e99f144D3e512f525d24077D4626a064899E177` |
| 网络 | Monad Testnet (Chain ID: 10143) |
| 部署者 | `0x7b5538AAd3b048bAe0EFF2b457C59B8FE98032B8` |
| 源码 | [contracts/MessageBoard.sol](../contracts/MessageBoard.sol) |

---

## 1. 部署交易

**Hash：** `0x705c92ad022293ea3090b49e293d1556ee8d2e902757c696f123f37cf13c9612`

**区块浏览器：** https://testnet.monadvision.com/tx/0x705c92ad022293ea3090b49e293d1556ee8d2e902757c696f123f37cf13c9612

**部署方式：** forge create（Foundry）

```bash
forge create contracts/MessageBoard.sol:MessageBoard \
  --rpc-url https://testnet-rpc.monad.xyz \
  --private-key <课程专用钱包私钥> \
  --broadcast
```

---

## 2. 合约交互

### Write 调用：postMessage

**交易 Hash：** `0x5cc8bc7b93056fe97417385fbce51fa3dd2d409bd493a6964674f45fd61d00b2`

**浏览器：** https://testnet.monadvision.com/tx/0x5cc8bc7b93056fe97417385fbce51fa3dd2d409bd493a6964674f45fd61d00b2

**操作：** 调用 `postMessage("Hello from Monad Builder Camp!")`

```bash
cast send 0x5e99f144D3e512f525d24077D4626a064899E177 \
  "postMessage(string)" "Hello from Monad Builder Camp!" \
  --rpc-url https://testnet-rpc.monad.xyz --private-key <私钥>
```

**结果：** status 1 (success)，gasUsed 139562

### Read 调用：getMessages

```bash
cast call 0x5e99f144D3e512f525d24077D4626a064899E177 \
  "getMessages()" --rpc-url https://testnet-rpc.monad.xyz
```

**返回数据解码：**

```
sender:    0x7b5538AAd3b048bAe0EFF2b457C59B8FE98032B8
content:   "Hello from Monad Builder Camp!"
timestamp: 1783112763 (2026-07-07)
```

✅ 读写均正常

---

## 3. 完整链路验证

```
合约源码 → 编译 → 部署 → 合约地址 → write 调用 → read 调用 → 区块浏览器验证
   ✅        ✅      ✅       ✅          ✅           ✅            ✅
```

---

## 4. README v0.1

### MessageBoard — 最简链上留言板

**做什么：** 任何人可以在链上发一条留言，留言永久存储，包含发送者地址、内容和时间戳。

**合约地址：** `0x5e99f144D3e512f525d24077D4626a064899E177`（Monad Testnet）

**函数：**

| 函数 | 类型 | 说明 |
|------|------|------|
| `postMessage(string)` | write | 发一条留言 |
| `getMessages()` | read | 读取所有留言 |

**如何部署：**

```bash
forge create contracts/MessageBoard.sol:MessageBoard \
  --rpc-url https://testnet-rpc.monad.xyz \
  --private-key <你的私钥> \
  --broadcast
```

**如何交互：**

```bash
# 发留言
cast send <合约地址> "postMessage(string)" "你的留言" \
  --rpc-url https://testnet-rpc.monad.xyz --private-key <私钥>

# 读留言
cast call <合约地址> "getMessages()" \
  --rpc-url https://testnet-rpc.monad.xyz
```

**技术栈：** Solidity ^0.8.0 / Foundry / Monad Testnet
