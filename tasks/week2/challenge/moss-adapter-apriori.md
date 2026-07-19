# Week 2 | Challenge | 为 Moss 新增 Protocol Adapter（aPriori）

## 任务信息

- 任务类型：Challenge · 为 Moss 新增 Protocol Adapter
- 学分：100
- 选择协议：**aPriori（Monad 原生 MON 流动性质押 / aprMON LST）**
- Adapter 名称：`@themoss/protocol-apriori`
- 功能：MON → aprMON 质押（stake）

## 提交结果

- PR 链接：https://github.com/nishuzumi/moss/pull/104
- GitHub 用户主页：https://github.com/tiyadegure
- Adapter 名称：protocol-apriori（aPriori MON 流动性质押）
- 功能简介（100 字内）：aPriori adapter 让 AI Agent 在 Monad 上质押 MON 换取 aprMON 流动性质押凭证。提供 stake Capability，封装 discover→load→action→simulate 四步，Receipt 解析 Deposit 事件得到质押量与份额。

## 关键技术发现（链上验证）

| 事实 | 证据 |
|------|------|
| aprMON 地址 `0x0c65a0bc65a5d819235b71f554d210d3f80e0852` | 用户从 monadvision 提供；链上验证 symbol=aprMON, name="aPriori Monad LST" |
| aprMON 是 EIP-7702 委托合约 | 解码 owner bytecode 含 `0xa619486e` 魔数；slot0 指向实现合约 |
| 真实 Vault 实现 `0x29fcb43b46531bca003ddc8fcb67ffe91900c762` | 48844 bytes 代码，aprMON 所有调用转发至此 |
| `stake()` payable 函数存在（selector `0x3a4b66f1`） | 对 aprMON 调用该函数返回"unknown revert"（函数存在，业务逻辑 revert）而非"function not found" |
| 标准 ERC4626 `deposit(uint256,address)=0xb6b55f25` 在 aprMON 不存在 | bytecode 扫描 15 个 stake 相关 selector 全 absent |

## 完成度

- ✅ adapter 包创建、typecheck/build/test 全过
- ✅ discover/load/action 主网构建正确交易（to=aprMON, data=0x3a4b66f1 stake(), value=MON）
- ✅ Receipt parser 单元测试通过（构造 Deposit 事件 → 解析质押量+份额）
- ✅ 地址与 stake 函数链上验证
- ⚠️ 主网完整模拟仍 revert：stake() 的完整调用约定（是否需要 receiver 参数/最小量）待 aPriori 文档交叉确认
- ⚠️ unstake 入口签名待确认（当前占位）

## 下一步（完善阶段，等 Maintainer review）

1. 根据 review 反馈修正 stake() 调用约定
2. 确认 unstake 入口并补全 Receipt
3. 补 changeset + 接入 example/docs
4. 主网 e2e 零 Warning 后 merge
