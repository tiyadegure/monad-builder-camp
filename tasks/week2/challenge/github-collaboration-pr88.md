# Week 2 | Challenge | 第一次 GitHub 协作 — PR #88

## 协作流程（真实经历）

```
Fork → Clone → Branch → 写文档 → Commit → Push → Pull Request → (Review) → Merge
```

## 实际步骤

| 步骤 | 操作 | 结果 |
|------|------|------|
| Fork | `gh repo fork nishuzumi/moss --clone` | ✅ fork 到 tiyadegure/moss |
| Branch | `git checkout -b docs/chinese-faq` | ✅ |
| 修改 | 新增 `docs/faq.zh-CN.md` + README 加链接 | ✅ 71 行新增 |
| Commit | `docs(zh): add Chinese FAQ and link from README` | ✅ |
| Push | `git push origin docs/chinese-faq` | ✅ |
| PR | `gh pr create --repo nishuzumi/moss` | ✅ **PR #88** |

## PR 链接

🔗 https://github.com/nishuzumi/moss/pull/88

对应 Issue: #77（中文 FAQ 需求）

## 贡献内容

新增 `docs/faq.zh-CN.md`，覆盖 10 个中文新人常问问题：
- Moss 是什么 / 是否动用户资金 / 与钱包关系
- 已支持协议 / 如何接入 MCP
- 模拟与 Receipt 验证的意义
- 是否需付费账户 / 生产可用性 / 如何贡献

并在 `README.zh-CN.md` 加入 FAQ 链接，让文档可被发现。

## 学到的真实经验

1. **Fork 工作流**：fork 到自己账号 → 改 → PR 回原仓库，和课程说的一致
2. **gh CLI 提 PR 的坑**：`--head` 要用 `owner:branch` 格式；`--repo` 指定目标仓库
3. **文档 PR 风险低**：纯 markdown，不需要构建（虽然本地没装 pnpm，但不影响文档提交）
4. **引用 Issue 很重要**：PR body 里写"对应 Issue #77"，Maintainer 一眼知道动机
5. **等待 Review**：PR 已提交，下一步是 Maintainer review → 可能要求修改 → merge

## 当前状态

⏳ **PR #88 待 Maintainer Review**

后续可能：
- Maintainer 提修改意见 → 本地改 → push 更新 PR
- 或直接与现有 #76 中文文档合并方式统一
- 最终 merge

## 体验总结

第一次真实开源协作完成到 PR 阶段。重点不是 merge，而是走完了完整流程：Fork → 分支 → 修改 → 提交 → PR。这比单纯写文档更有"参与感"——你的改动进入了真实项目的 review 队列。
