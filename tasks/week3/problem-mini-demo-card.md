# Week 3 | Problem & Mini Demo Card

## 目标用户
Monad 上的 Keeper / 清算 Operator，以及借贷协议的风险监控侧。

## 核心问题
多协议清算目前依赖协议原生 keeper 或通用 bot，没有专门利用 Monad 并行执行 + 本地 CLOB 的优化层。Operator 需要自己拼监控、模拟、执行，延迟和路径都不是最优。

## 当前解决方式
- 协议自带 keeper
- 通用清算 bot（如 Euler 开源 bot）
- 手工监控 + 低频执行

## 我们的方案
先做一个可验证的最小能力：监控指定协议的可清算仓位，识别目标后，模拟并生成带 CLOB 价格校验的清算交易草稿，供 Operator 审核后签名执行。

## Mini Demo 核心功能
输入：协议列表 + 健康因子阈值  
输出：可清算地址列表 + 一笔示例清算交易草稿（to / selector / value / calldata / 预估利润）

## 本周不做
- 不广播真实交易
- 不碰私钥 / 不做 keeper 自动执行
- 不做 MEV 优化
- 不做前端钱包界面
