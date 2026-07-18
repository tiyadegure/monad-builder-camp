# Week 2 | Challenge | Open Source Contribution Log (Proof of Work)


## 贡献概览

| 项目 | 值 |
|------|-----|
| 项目 | [nishuzumi/moss](https://github.com/nishuzumi/moss) |
| 类型 | Documentation（中文 FAQ） |
| 方式 | Pull Request |
| PR 链接 | **https://github.com/nishuzumi/moss/pull/88** |
| 对应 Issue | #77（docs: 为中文新人加 FAQ） |
| 状态 | 已提交，待 Maintainer Review |
| 是否要求 Merge | 否 —— 重点是真实协作过程，不要求被合并 |

---

## 我做了什么（可验证）

### 1. Fork + Clone
```
gh repo fork nishuzumi/moss --clone
```
Fork 到个人账号 `tiyadegure/moss`，完整仓库副本到本地。

### 2. 新建分支
```
git checkout -b docs/chinese-faq
```

### 3. 真实改动（2 个文件，+71 行）

**新增 `docs/faq.zh-CN.md`** —— 10 个中文新人常见问题：
- Moss 是什么？
- Moss 会动我的钱吗？（不会，只模拟不签名）
- Moss 和钱包的关系
- 已支持的协议（WMON / ERC-20 / ERC-721 / Kuru）
- 如何接入 MCP server
- 模拟（simulate）的意义
- 为什么需要 Receipt 验证
- 是否需要付费或有余额账户
- 是否生产可用（明确标注 alpha、勿用于生产资金）
- 如何开始贡献

**修改 `README.zh-CN.md`** —— 加入 FAQ 链接，让文档可被发现。

### 4. Commit + Push
```
git commit -m "docs(zh): add Chinese FAQ and link from README"
git push origin docs/chinese-faq
```

### 5. 提交 PR
```
gh pr create --repo nishuzumi/moss --head tiyadegure:docs/chinese-faq --base main
```
→ 生成 **PR #88**

---

## 为什么这是有效的 Proof of Work

1. **真实项目**：Moss 是 Monad 生态真实的 AI Agent 协议框架，不是练习仓库
2. **真实流程**：Fork → 分支 → 修改 → 提交 → PR，完整开源协作链路
3. **可验证**：PR #88 公开可访问，任何人能看 diff、commit、时间线
4. **解决真实需求**：对应 Issue #77，中文社区确实在要 FAQ 文档
5. **质量可控**：文档风格与现有中文文档一致，内部链接全部有效

---

## 公开展示文案（可用于简历 / 作品集）

> **Open Source Contributor — Moss (Monad AI Agent Framework)**
> 为 Moss 项目提交中文 FAQ 文档（PR #88），覆盖 10 个新人常见问题，降低中文开发者上手门槛。完整走通 Fork → PR 开源协作流程。
> 链接：https://github.com/nishuzumi/moss/pull/88

---

## 学习收获

1. **开源协作不是"写代码"**：文档、教程、Issue 都是有效贡献，且更适合 Research 身份切入
2. **gh CLI 工作流**：fork / pr create 的真实命令和坑（--head 格式、--repo 指定）
3. **PR 是对话不是终点**：提交后进入 review 队列，可能被要求修改，这是正常流程
4. **引用 Issue 提升通过率**：PR body 明确"对应 #77"，Maintainer 一眼懂动机
5. **Proof of Work 的真实含义**：不是 star 数或 merge，而是"有公开可查的真实贡献记录"

---

## 后续（如被要求修改）

若 Maintainer 提修改意见：
- 在本地 `docs/chinese-faq` 分支改
- `git push` 自动更新 PR
- 直到 merge 或 close

当前 PR #88 仍在 open 状态，等待 review。

---

## 参考链接

- PR #88: https://github.com/nishuzumi/moss/pull/88
- Issue #77: https://github.com/nishuzumi/moss/issues/77
- Moss 仓库: https://github.com/nishuzumi/moss
- 个人 GitHub: https://github.com/tiyadegure
