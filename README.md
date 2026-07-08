# Monad Builder Camp — Learning Journal

Web3 暑期实习计划 · Monad Builder Camp（2026.7.6 — 8.7）

## About

记录从 Web3 入门到 Monad 链上产品交付的完整学习过程。

**方向：** Research
**平台：** [Web3 Career Build](https://web3career.build/zh/programs/Web3-Summer-Intership-Progra)

## Week 1 Mini Demo

**MessageBoard — 链上留言板**

| 项目 | 值 |
|------|-----|
| 合约地址 | [`0x5e99f144D3e512f525d24077D4626a064899E177`](https://testnet.monadvision.com/address/0x5e99f144D3e512f525d24077D4626a064899E177) |
| 网络 | Monad Testnet (Chain ID 10143) |
| 部署 tx | [`0x705c92ad...c13c9612`](https://testnet.monadvision.com/tx/0x705c92ad022293ea3090b49e293d1556ee8d2e902757c696f123f37cf13c9612) |
| 交互 tx | [`0x5cc8bc7b...61d00b2`](https://testnet.monadvision.com/tx/0x5cc8bc7b93056fe97417385fbce51fa3dd2d409bd493a6964674f45fd61d00b2) |

**流程：** Prompt → AI 生成合约 → 人工审查修改 → 编译 → 部署 → read/write 交互 → 浏览器验证

**人工修改：** `public` → `private`、`NewMessage` → `MessagePosted`、删除多余函数

## Structure

```
daily/          ← 每日学习记录
tasks/          ← 按周组织的课程任务完成记录
  week1/        ← 链上世界、测试网交易、AI 合约开发、Research
  week2/        ← Research Track（生态研究、产品判断、赛道分析）
  week3/        ← Collaboration & Mini Demo
  week4/        ← Monad Hackathon Week
  week5/        ← 作品集 Workshop
contracts/      ← Solidity 合约代码
notes/          ← 课程笔记、技术要点
```

## Timeline

| Week | 主题 | 产出 |
|------|------|------|
| 1 | 共同底座 — Enter Onchain World | 钱包、交易、AI 合约、部署、Research |
| 2 | Research Track | 生态分析、产品判断、赛道研究 |
| 3 | Collaboration & Mini Demo | 组队、Prototype |
| 4 | Monad Hackathon Week | 可运行产品、Demo Video |
| 5 | 作品集 Workshop | Portfolio、简历 |

## Week 1 任务完成

| 任务 | 学分 | 文件 |
|------|------|------|
| 链上产品 vs 传统产品 | - | [01-chain-vs-web2.md](tasks/week1/01-chain-vs-web2.md) |
| 首笔测试网交易 | - | [02-first-testnet-tx.md](tasks/week1/02-first-testnet-tx.md) |
| AI 辅助 Solidity 合约 | 30 | [03-ai-solidity-contract.md](tasks/week1/03-ai-solidity-contract.md) |
| 部署 Monad 合约 | 30 | [04-deploy-monad-contract.md](tasks/week1/04-deploy-monad-contract.md) |
| 高频交互场景研究 | 20 | [05-monad-high-freq-scenario.md](tasks/week1/05-monad-high-freq-scenario.md) |
| Build Log + 阶段总结 | 20 | [06-week1-build-log.md](tasks/week1/06-week1-build-log.md) |
| Mini Demo 0 | 40 | [07-mini-demo-0.md](tasks/week1/07-mini-demo-0.md) |

## Links

- [Web3 Career Build 个人主页](https://web3career.build)
- [Monad](https://monad.xyz)
- [Monad Docs](https://docs.monad.xyz)
