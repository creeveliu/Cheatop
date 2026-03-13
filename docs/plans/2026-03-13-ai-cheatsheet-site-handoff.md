# AI Cheatsheet Site Handoff

日期：2026-03-13

## 当前可用状态

- 项目已用 Astro 跑通，开发地址：`http://127.0.0.1:4321/`
- 首页已可展示工具卡片
- `Claude Code` 详情页已从普通文章页改为接近 `output/claude-code-cli-cheatsheet-zh.html` 的 cheatsheet 初版
- 当前内容以“网页阅读 + 打印速查”为目标，重点是 `hero + 双栏 section + 表格`

## 已完成实现

### 基础工程

- `package.json`
- `astro.config.mjs`
- `tsconfig.json`
- `playwright.config.ts`
- `src/layouts/BaseLayout.astro`
- `src/styles/global.css`

### 内容模型

- `src/content/config.ts`
  - 已去掉原计划里的 `slug` schema 字段
  - 原因：Astro 不会把 frontmatter `slug` 暴露到 `data`
  - 现改为页面层使用 `tool.slug`
- `src/content/tools/claude-code.md`
  - 已改为结构化 `sheet` frontmatter
  - 当前数据结构包括：
    - `title`
    - `dek`
    - `pills`
    - `meta`
    - `left`
    - `right`
    - `footer`

### 页面与组件

- `src/pages/index.astro`
  - 工具目录首页
- `src/pages/tools/[slug].astro`
  - 如果 `tool.data.sheet` 存在，则走 cheatsheet 专用渲染
  - 否则保留普通正文渲染兜底
- `src/components/ToolCard.astro`
- `src/components/ToolMeta.astro`
- `src/components/ToolCheatsheet.astro`
- `src/components/CheatsheetSection.astro`

## 当前设计方向

目标不再是“通用博客式工具详情页”，而是：

- 单页高密度 cheatsheet
- 接近打印稿的纸面视觉
- 暖色纸张底、细边框、浅渐变 section
- 通过表格快速扫读，而不是长文阅读

参考源文件：

- `output/claude-code-cli-cheatsheet-zh.html`

## 已处理的关键坑

### 1. Content schema 的 `slug` 问题

- 原计划要求把 `slug` 放进 schema
- 实际会导致 `astro sync` / `astro dev` 失败
- 已修正为使用 Astro 自带的 `tool.slug`

### 2. Playwright 无 `baseURL`

- 原计划在任务 4 前没有测试配置
- 直接跑 `page.goto("/")` 会报 invalid URL
- 已提前加入 `playwright.config.ts`

### 3. Cheatsheet 单元格里的命令没有高亮

- 原因：frontmatter 内写的是 Markdown 风格反引号，但组件用了 `set:html`
- 已在 `src/components/CheatsheetSection.astro` 中加入最小 inline renderer
- 现在 `` `claude` `` 会渲染成 `<code>`
- 同时 `<session-id>` 这类参数也会被安全转义，不会被当成 HTML

## 当前测试状态

已通过：

- `pnpm astro sync`
- `pnpm playwright test tests/e2e/homepage.spec.ts`
- `pnpm playwright test tests/e2e/tool-page.spec.ts`

## 下一步建议

下个会话建议继续做这些：

1. 继续压缩 Claude Code cheatsheet 的视觉细节
   - 更接近 A4 打印密度
   - 调整字号、间距、表格节奏
   - 减弱全站 header/footer 对详情页的干扰

2. 把首页从普通卡片目录改成更像“速查表目录”
   - 更强的编辑式信息层级
   - 更少 SaaS 卡片味

3. 增加第二个工具页
   - 验证 `sheet` 数据结构可复用

4. 继续补打印样式与搜索能力
   - 原计划任务 7、8、9、10、11 还未继续

## 相关文件

- `src/content/tools/claude-code.md`
- `src/content/config.ts`
- `src/pages/tools/[slug].astro`
- `src/components/ToolCheatsheet.astro`
- `src/components/CheatsheetSection.astro`
- `src/styles/global.css`
- `tests/e2e/tool-page.spec.ts`
