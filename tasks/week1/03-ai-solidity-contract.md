# 任务 3：AI 辅助开发 — 用 AI 生成最小 Solidity 合约

## 选择方向

留言板（MessageBoard）

## Prompt

> 用 Solidity 写一个最简链上留言板合约。要求：任何人可以发一条留言（string），每条留言记录发送者地址、内容和时间戳。提供 getMessages() 读取所有留言。不使用任何外部依赖。

## 合约

文件：`contracts/MessageBoard.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MessageBoard {
    struct Message {
        address sender;
        string  content;
        uint256 timestamp;
    }

    Message[] public messages;
    event NewMessage(address indexed sender, string content, uint256 timestamp);

    function postMessage(string calldata _content) external {
        messages.push(Message({
            sender:    msg.sender,
            content:   _content,
            timestamp: block.timestamp
        }));
        emit NewMessage(msg.sender, _content, block.timestamp);
    }

    function getMessages() external view returns (Message[] memory) {
        return messages;
    }

    function messageCount() external view returns (uint256) {
        return messages.length;
    }
}
```

编译：Solc 0.8.35 通过 ✅

## 人工检查（5 项）

| 检查点 | 结果 | 说明 |
|--------|------|------|
| 编译 | ✅ 通过 | Solc 0.8.35 无报错 |
| 权限 | ✅ 无问题 | 无 owner/admin，不能删别人留言 |
| 函数逻辑 | ✅ 符合预期 | 地址、内容、时间三要素都记录 |
| 命名 | ✅ 清晰 | Message/messages/postMessage/getMessages |
| 安全 | ⚠️ 注意 | getMessages() 返回全部，留言多会 gas 溢出 |

## 对 AI 输出的判断

不需要修改。唯一建议：生产环境 `getMessages()` 应加分页。学习用不需要改。
