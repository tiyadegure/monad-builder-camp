# Week 3 | 团队决定与 AI 使用情况

## 团队做出的重要决定

### 1. 选定 Mini Demo 方向：实时清算优化
- **为什么这样决定**：Notion 调研显示 Monad 借贷 TVL 超 $600M，但多协议并行清算 + CLOB 联动几乎空白；`monad-liq-mvp` 已有 `LiquidationRouter.sol` 骨架，Dev 侧可直接复用，本周能做 read-only + 模拟版。
- **团队成员**：TiyaDegurechaff（Researcher）+ Eflier（Dev）
- **删除或暂时不做的功能**：
  - 不广播真实交易 / 不碰私钥 / 不做 keeper 自动执行
  - 不做 MEV 优化
  - 不做前端钱包界面
  - 不做 CLOB 实盘下单
  - 不做用户侧健康因子预警 Agent（P2 再做）

### 2. 以 `monad-liq-mvp` 为唯一 Dev 基准
- **为什么这样决定**：本地已有 Vercel 部署骨架 + `LiquidationRouter.sol` + `api/index.ts`，避免从零搭建。
- **团队成员**：Eflier（Dev）
- **删除或暂时不做的功能**：
  - 不另起新 repo
  - 不迁移到 Foundry/Hardhat 新框架（先用现有 TypeScript + viem）

### 3. Mini Demo 只展示“监控 → 识别 → 草稿”链路
- **为什么这样决定**：Hackathon 评委最关心“问题定义 + 可验证证据链”，真实 keeper 执行涉及私钥/MEV/监管风险，read-only + 模拟足以证明方向。
- **团队成员**：TiyaDegurechaff（Researcher）
- **删除或暂时不做的功能**：
  - 不做真实清算执行
  - 不做自动 recurring 任务
  - 不做多签 / 金库管理

### 4. CLOB 价格校验暂用预言机，不直接接 Kuru/Perpl 订单簿
- **为什么这样决定**：Kuru/Perpl 的深度数据 / SDK 接入需要额外验证，本周先保证健康因子监控 + 清算草稿稳定可用。
- **团队成员**：Eflier（Dev）
- **删除或暂时不做的功能**：
  - 不做 Kuru/Perpl 实时订单簿深度聚合
  - 不做 CLOB 市场 sells hook

## AI 帮助完成了什么

### TiyaDegurechaff（Researcher）
- 把 Notion `调研 / 五个方向` 与 `mvp建议` 快速整理成 Problem Validation（3 条证据 + 12 个竞品 + 1 个待验证问题）
- 输出 Problem & Mini Demo Card、Team Formation Card、Brainstorm Meeting 记录

### Eflier（Dev）
- 辅助梳理 `monad-liq-mvp` 现有代码结构，确认 `LiquidationRouter.sol` 可直接作为 Mini Demo 合约基础
- 协助生成 Aave/Euler 健康因子监控的 viem 调用思路
- 帮助编写 README、测试脚本、主网 e2e 验证步骤

## 团队进行了哪些检查或修改
- 对齐 Notion `Monad` 页面结构与本地 `monad-liq-mvp` 代码，确认方向一致
- 检查 `LiquidationRouter.sol` 的 liquidationCall / flashLoanSimple 接口，确认 Aave 路径可用
- 验证 viem 在主网上读取健康因子 / 价格的可行性
- 多次迭代 Week 3 docs：team-formation-card → problem-mini-demo-card → problem-validation → brainstorm-meeting → team-plan

## 当前遇到的问题
- Kuru/Perpl CLOB SDK 接入尚未验证，Week 4 需要确认是否直接可用
- 需要主网清算事件数据验证“真实空白”假设

## 下一步准备做什么
- Eflier：跑通 Aave + Euler 健康因子监控，输出第一版可清算地址列表
- Eflier：基于 `monad-liq-mvp` Vercel API 输出一笔示例清算交易草稿
- TiyaDegurechaff：整理 2 分钟 Demo 脚本（问题 → 方案 → 交易草稿 → 证据链）
- 全队：Day 5 对着 Demo 脚本彩排，确认交易草稿和叙事能对上
