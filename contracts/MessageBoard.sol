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
