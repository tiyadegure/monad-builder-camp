# Week 3 | Hackathon 准备与团队复盘

## 团队决定：继续

- **决定**：继续参加 Week 4 Hackathon，不合并到其他队，不暂停
- **理由**：
  - `monad-liq-mvp` 方向已经得到外部队友（刘力铭）认可，并主动补充 Risk & Product 层
  - Week 3 已完成产品定义、问题验证、团队分工、Issue 骨架，具备进入集中开发的条件
  - 团队三人对“多协议清算优化 + 用户侧风险预警”这一主线没有分歧

## Week 3 完成了什么

### 团队交付
- **团队组建**：从双人队（TiyaDegurechaff + Eflier）扩展为三人队（+ 刘力铭 Risk & Product）
- **产品定义**：
  - 一句话介绍：运行在 Monad 上的实时清算优化原型
  - 目标用户双轨：Liquidator（Keeper/Operator） + User（借款人）
  - Week 4 范围收缩为 Aave + Euler 双协议，不追数量追故事完整度
- **问题验证**：
  - 3 人需求检查完成，确认“提前知道会不会爆仓”比“更快清算”更有用户感知
  - 12 个竞品分析，确认当前没有把 Risk Rating + Stress Test + AI Explanation 打包给普通用户的链上产品
- **文档体系**：
  - `team-formation-card.md`：角色与分工
  - `problem-mini-demo-card.md`：问题 + Mini Demo
  - `problem-validation.md`：3 证据 + 12 竞品 + 1 TBD
  - `brainstorm-meeting.md`：6 个方向 → 最终选“realtime liquidation optimization”
  - `team-plan.md`：8 个工作项、负责人、交付物、截止日
  - `decision-log.md`：4 个关键决定 + AI 使用说明 + 当前问题 + 下一步
  - `project-intro-usertest.md`：项目介绍 + 测试邀请 + 5 个反馈问题 + Landing Page 草稿
- **Hackathon 准备**：
  - 在 `MonadTiya/monad-liq-mvp` 创建 Issue #8-#14（P0/P1/P2 共 7 个）
  - 清空仓库描述，保证 README 是唯一入口
  - 海报提示词 3 套（Kami 羊皮纸 / 纯黑极客 / Risograph 印刷复古）
- **代码底座**：
  - 本地 `C:\Users\gg\monad-liq-mvp` 已有 `LiquidationRouter.sol` + `api/index.ts`
  - Aave adapter 已验证可编译；Euler 选为第二个协议
  - PR #104（Moss aPriori adapter）已合入，证明团队有独立完成 Solidity adapter + 主网验证的能力

## Week 4 准备完成什么

### 团队目标
1. **Happy Path 跑通**：Aave + Euler 双协议监控 → 识别可清算仓位 → 生成清算交易草稿
2. **User 轨 MVP**：Risk Rating + Stress Test + AI Explanation（规则模板版）
3. **Demo 材料**：2 分钟 Demo 脚本 + 录屏 + 提交说明
4. **用户测试**：找 1–2 个外部 operator/dev 跑一遍 `project-intro-usertest.md`

### 分工
| 成员 | Week 4 重点 |
|------|-------------|
| TiyaDegurechaff | 协议研究、数据验证、Demo 叙事、提交材料撰写 |
| Eflier | Euler adapter、health factor 扫描脚本、API 集成、主网 e2e |
| 刘力铭 | Risk Rating 映射、Stress Test 模型、AI Explanation 模板、Deleverage 建议 |

### 截止节奏
- Day 1-2：Euler 只读调用跑通 + Risk Rating 单协议版本
- Day 3-4：双协议 happy path + AI Explanation 模板
- Day 5：用户测试 + Demo 录屏
- Day 6-7：提交材料打包 + README 补全

## 目前还需要什么帮助

1. **Euler Vault 地址列表**：需要拿到 Euler 在 Monad 上的官方 Vault 地址，或者至少一个可验证的测试地址
2. **外部测试用户**：需要 1–2 个有 Monad 借贷经验的人帮忙跑一遍 Demo，给真实反馈
3. **CLOB 价格源**：如果 Demo 时间允许，希望接入 Kuru/Perpl 的价格做一次真实 CLOB 校验，证明“不只是读预言机”

## 个人复盘

### TiyaDegurechaff（Researcher）
- **本周负责**：协议研究、问题定义、12 个竞品分析、数据验证、Week 3 全部文档、Hackathon 叙事线
- **成果/证据**：
  - `tasks/week3/problem-validation.md`
  - `tasks/week3/brainstorm-meeting.md`
  - `tasks/week3/team-plan.md`
  - `tasks/week3/decision-log.md`
  - `daily/2026-07-27.md` ~ `daily/2026-08-01.md`
  - `MonadTiya/monad-liq-mvp` Issue #8-#14
- **协作收获**：
  - 学会把“研究方向”压缩成“可执行 issue”，避免研究叙事和代码实现脱节
  - 和刘力铭的交流让团队从“清算 bot”转向“风险管家”，用户面更宽
- **是否继续合作**：是。刘力铭的金融风控视角正好补上团队最弱的一环，Eflier 的执行力让研究不会停留在纸面。

### Eflier（Dev）
- **本周负责**：`monad-liq-mvp` 合约与 API 开发、Aave adapter、Moss PR #104、Hackathon 技术选型
- **成果/证据**：
  - `C:\Users\gg\monad-liq-mvp`（`LiquidationRouter.sol` + `api/index.ts`）
  - Moss PR #104（aPriori adapter，已合并）
  - `tasks/week3/dev/README.md`
  - `tasks/week4/requirement-check.md`
- **协作收获**：
  - 从“先把合约写完”转向“先讲清楚用户为什么需要”，产品思维比代码优雅更重要
  - Issue 驱动开发在 Hackathon 里非常有效，三人并行不冲突
- **是否继续合作**：是。Tiya 的研究能把代码放进正确赛道，刘力铭能把技术语言翻译成用户价值。

### 刘力铭（Risk & Product）
- **本周负责**：风险模型设计、用户侧预警叙事、AI 风险解释、Deleverage 建议
- **成果/证据**：
  - 在需求检查中提出 Risk Rating / Stress Test / Liquidation Probability / AI Explanation 四层补充
  - 明确“0 清仓率”可作为商业化卖点
  - 认可现有架构并给出“双轨”调整建议（Liquidator 轨 + User 轨）
- **协作收获**：
  - 发现链上清算和传统金融风险监控在逻辑上高度相通，可以复用固定收益/国债期货的风险思维
  - 看到 Git 后直接在现有 Issue 基础上迭代，而不是推倒重来，协作成本低
- **是否继续合作**：是。项目方向和他之前做的金融 Agent 自动化高度契合，希望把传统风控经验落地成链上产品。
