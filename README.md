# AI Cheat Sheets

一个基于 Astro 的静态站点，用来发布 AI 工具的高密度 cheatsheet。当前首个页面是 `Claude Code`，目标是兼顾网页阅读和 A4 打印速查。

## 当前状态

- 首页：工具目录
- 详情页：`/tools/claude-code/`
- 内容来源：`src/content/tools/*.md`
- 当前参考稿：`output/claude-code-cli-cheatsheet-zh.html`
- 当前交接文档：`docs/plans/2026-03-13-ai-cheatsheet-site-handoff.md`

## 技术栈

- Astro
- TypeScript
- Astro content collections
- Vitest
- Playwright
- 原生 CSS

## 开发命令

```bash
pnpm install
pnpm dev
pnpm test
pnpm playwright test
pnpm astro sync
pnpm build
```

默认开发地址：

- `http://127.0.0.1:4321/`

## 项目结构

```text
src/
  components/
  content/
    tools/
  layouts/
  pages/
  styles/
tests/
docs/plans/
output/
```

## 内容模型

工具内容放在 `src/content/tools/*.md`。

当前 `Claude Code` 页面采用结构化 `sheet` frontmatter，主要字段包括：

- `title`
- `summary`
- `officialDocs`
- `updatedAt`
- `tags`
- `sheet.title`
- `sheet.dek`
- `sheet.pills`
- `sheet.meta`
- `sheet.left`
- `sheet.right`
- `sheet.footer`

其中 `sheet.left` / `sheet.right` 由 section 数组组成，section 支持：

- `type: "table"`
- `type: "list"`
- `headers`
- `rows`
- `items`
- `note`

## 设计方向

当前不是通用博客详情页，而是更接近打印稿的 cheatsheet：

- 纸面感容器
- 双栏布局
- 高密度表格信息
- 适合快速扫读
- 保留打印样式

如果继续迭代，优先参考：

- `output/claude-code-cli-cheatsheet-zh.html`

## 测试

常用验证：

```bash
pnpm astro sync
pnpm vitest tests/smoke/content-sync.test.ts
pnpm playwright test tests/e2e/homepage.spec.ts
pnpm playwright test tests/e2e/tool-page.spec.ts
```

## 部署

GitHub 用于版本托管，Vercel 用于静态部署。

如果本机已登录：

```bash
gh repo create
git push -u origin main
vercel
vercel --prod
```
