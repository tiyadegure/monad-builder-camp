// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MessageBoard - 最简链上留言板
 * @notice 任何人都可以留言，留言永久存储在链上
 */
contract MessageBoard {
    // ============ 数据结构 ============
    
    /// @notice 单条留言的结构体
    struct Message {
        address sender;    // 留言者地址
        string  content;   // 留言内容
        uint256 timestamp; // 留言时间戳（区块时间）
    }

    // ============ 状态变量 ============
    
    /// @notice 所有留言的数组，按发送顺序存储
    Message[] public messages;

    // ============ 事件 ============
    
    /// @notice 新留言事件，方便前端监听
    event NewMessage(address indexed sender, string content, uint256 timestamp);

    // ============ 外部函数 ============

    /**
     * @notice 发送一条留言
     * @param _content 留言文字内容
     */
    function postMessage(string calldata _content) external {
        // 将留言追加到数组，记录发送者、内容和当前区块时间戳
        messages.push(Message({
            sender:    msg.sender,
            content:   _content,
            timestamp: block.timestamp
        }));

        // 触发事件，方便链下索引
        emit NewMessage(msg.sender, _content, block.timestamp);
    }

    /**
     * @notice 读取所有留言
     * @return 所有留言的数组
     */
    function getMessages() external view returns (Message[] memory) {
        return messages;
    }

    /**
     * @notice 查询当前留言总数
     * @return 留言数量
     */
    function messageCount() external view returns (uint256) {
        return messages.length;
    }
}
