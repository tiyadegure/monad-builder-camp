# 任务 3：AI 辅助开发 — 用 AI 生成最小 Solidity 合约

## 方向

留言板（MessageBoard）

---

## 1. Prompt

> 用 Solidity 写一个最简链上留言板合约。要求：任何人可以发一条留言（string），每条留言记录发送者地址、内容和时间戳。提供 getMessages() 读取所有留言。不使用任何外部依赖。

---

## 2. AI 生成的主要输出

AI 生成了一个 61 行的 MessageBoard 合约，包含：
- `Message` 结构体（sender、content、timestamp）
- `messages` 动态数组（public 可见性）
- `NewMessage` 事件
- `postMessage()` 发留言函数
- `getMessages()` 读取全部留言
- `messageCount()` 返回留言总数

编译通过（Solc 0.8.35）。

---

## 3. 合约源码（最终版）

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title 最简链上留言板
/// @notice 任何人都可以发留言,留言会永久记录在链上
contract MessageBoard {
    struct Message {
        address sender;      // 发送者地址
        string  content;     // 留言内容
        uint256 timestamp;   // 时间戳(区块时间)
    }

    // 所有留言,下标即留言序号
    Message[] private messages;

    // 发留言时抛出事件,便于链下监听
    event MessagePosted(address indexed sender, string content, uint256 timestamp);

    /// @notice 发表一条留言
    /// @param content 留言内容(任意 string)
    function postMessage(string calldata content) external {
        messages.push(Message({
            sender:    msg.sender,
            content:   content,
            timestamp: block.timestamp
        }));
        emit MessagePosted(msg.sender, content, block.timestamp);
    }

    /// @notice 读取所有留言
    /// @return 全部留言数组(地址、内容、时间戳)
    function getMessages() external view returns (Message[] memory) {
        return messages;
    }
}
```

---

## 4. 人工修改与判断

| 改动 | AI 初稿 | 最终版 | 理由 |
|------|---------|--------|------|
| `messages` 可见性 | `public` | `private` | `public` 会自动生成按索引访问的 getter，外部可以直接 `messages(0)` 读单条，但封装不干净。`private` 强制通过 `getMessages()` 读取，接口更统一 |
| 事件名 | `NewMessage` | `MessagePosted` | "Posted" 比 "New" 更准确地表达"发送留言"这个动作，语义更清晰 |

另外删掉了 AI 生成的 `messageCount()` 函数 — 通过 `getMessages().length` 在链下就能获取，不需要额外的链上函数，减少合约复杂度。

---

## 5. 人工检查清单（3+ 条）

### 检查 1：编译

- [x] `pragma ^0.8.0` 合理，`calldata` 在 0.8.x 下有效
- [x] 无语法错误，Solc 0.8.35 编译通过

### 检查 2：权限

- [x] 无 owner、无 admin、无 `onlyOwner` 修饰符
- [x] 任何人可以调用 `postMessage`，符合"公共留言板"设计
- [x] 没有人可以删除或修改别人的留言

### 检查 3：函数逻辑

- [x] `postMessage` 正确记录 msg.sender、content、block.timestamp 三要素
- [x] `getMessages` 返回整个数组，数据完整
- [x] `calldata` 比 `memory` 省 gas，选择正确

### 检查 4：安全风险

- [x] 无重入风险（纯状态写入，无外部调用）
- [x] 无溢出风险（0.8.x 内置溢出检查）
- [x] 已知限制：`getMessages()` 留言多时会因 gas limit 失败，生产环境应加分页（`getMessages(uint offset, uint limit)`），学习用可接受

### 检查 5：命名

- [x] `Message`、`messages`、`postMessage`、`getMessages` 语义清晰
- [x] `MessagePosted` 事件名准确表达动作
