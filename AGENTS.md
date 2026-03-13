# AGENTS.md

## 项目目标

构建一个 AI 工具 cheatsheet 静态站点。当前首个工具页是 `Claude Code`，设计方向偏高密度打印稿，而不是普通文章页。

## 接手前先读

每次新会话开始前，先读取：

1. `docs/plans/2026-03-13-ai-cheatsheet-site-handoff.md`
2. `src/content/tools/claude-code.md`
3. `output/claude-code-cli-cheatsheet-zh.html`

## 当前实现事实

- 详情页通过 `src/pages/tools/[slug].astro` 渲染
- 如果 `tool.data.sheet` 存在，页面走 cheatsheet 专用组件
- cheatsheet 组件：
  - `src/components/ToolCheatsheet.astro`
  - `src/components/CheatsheetSection.astro`
- 当前页面大量内容来自结构化 frontmatter，而不是正文 Markdown

## 重要约束

- 保持 TDD
- 每次改动先写失败测试，再做最小实现
- 在声称完成前必须重新验证
- 优先保持 `Claude Code` 页面接近参考 HTML 的版式与信息密度
- 不要把工具详情页退回普通博客/文档页风格

## 内容约束

- `src/content/config.ts` 不要把 `slug` 当作普通 schema 字段
- 页面路由使用 Astro 提供的 `tool.slug`
- table/list 单元格中的反引号命令需要渲染成 `<code>`，不要直接输出原始 Markdown 字符串

## 优先验证命令

```bash
pnpm astro sync
pnpm vitest tests/smoke/content-sync.test.ts
pnpm playwright test tests/e2e/homepage.spec.ts
pnpm playwright test tests/e2e/tool-page.spec.ts
```

## 下一步优先级

1. 继续打磨 `Claude Code` cheatsheet 的视觉细节和打印密度
2. 把首页改得更像 cheatsheet 目录而不是普通卡片页
3. 增加第二个工具页验证 schema 的可复用性
4. 再继续搜索、打印样式和其余计划任务
