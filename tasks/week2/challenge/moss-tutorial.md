# Week 2 | Challenge | 制作一份 Moss 新手教程

## 任务信息

- 任务类型：Challenge · 制作一份 Moss 新手教程
- 选择方向：**Moss 入门指南**（30 分钟跑通第一个 Agent 链上模拟）
- 学分：30
- 教程链接：https://degure-blog.pages.dev/blog/moss-tutorial/

## 教程内容说明（提交用，50-100 字）

面向新人的 Moss 上手教程，从环境配置到第一次模拟一笔 Kuru swap。覆盖四步流程（discover / load / action / simulate）、MCP 接入方式、Receipt 安全模型解读、开源贡献入口与常见坑，配流程图帮助开发者 30 分钟跑通首个链上模拟，无需私钥或钱包。

---

## 教程结构

1. Moss 在做什么（Agent / Moss / 链 的关系定位）
2. 环境准备（Node 22 + pnpm 11）
3. 四步跑通第一个模拟
   - Fork & Clone
   - Install & Build
   - 跑示例（WMON wrap / Kuru swap）
   - 读懂 Receipt 证据
4. 接入 AI Agent（MCP server 配置）
5. 四步流程逐层图解
6. 开源贡献入口（含真实 PR #88 案例）
7. 常见坑对照表
8. 下一步学习

## 设计说明

- 教程发布在个人 blog（Kami 设计语言：暖羊皮纸底、墨蓝强调色、衬线字体）
- 图解用 CSS 卡片 + 流程图，无外部图片依赖，移动端响应式
- 全文无 emoji，符合 Kami 克制编辑风格
- 实战命令均可在 Monad 主网状态上直接运行，不需要私钥或 funded 账户

## 提交材料

- 教程链接：https://degure-blog.pages.dev/blog/moss-tutorial/
- 仓库源文件：degure-blog/src/content/blog/moss-tutorial.mdx
- 相关 PR：https://github.com/nishuzumi/moss/pull/88（教程里引用的真实贡献案例）

## 参考链接

- Moss 仓库：https://github.com/nishuzumi/moss
- Getting Started：https://github.com/nishuzumi/moss/blob/main/docs/getting-started.md
- MCP Tools：https://github.com/nishuzumi/moss/blob/main/docs/mcp-tools.md
- Protocol Onboarding：https://github.com/nishuzumi/moss/blob/main/docs/protocol-onboarding.md
