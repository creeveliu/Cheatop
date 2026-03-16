# 项目说明

## 项目概览

- 这是一个面向工程师的 AI 工具速查表静态站点。
- 当前首个重点工具页是 `Claude Code`。
- 站点目标是帮助用户以最低认知成本快速查阅命令、参数、快捷键和工作流。
- 页面应优先服务快速检索、执行中二次确认，以及打印版随手查阅，而不是产品叙事或营销转化。

## 项目结构

### 关键目录

- `src/pages/`：Astro 页面入口
- `src/components/`：页面组件与速查表组件
- `src/content/tools/`：工具内容源
- `src/content/config.ts`：content collection schema
- `tests/e2e/`：Playwright 端到端测试
- `tests/smoke/`：基础冒烟验证
- `docs/plans/`：设计和实现计划文档

### 关键渲染流程

- 工具详情页由 `src/pages/tools/[slug].astro` 渲染。
- `getStaticPaths()` 从 `tools` collection 生成路由，使用 `tool.slug` 作为参数。
- 如果 `tool.data.sheet` 存在，则渲染 `src/components/ToolCheatsheet.astro`。
- 否则回退到普通文章式详情页，但项目当前重点是速查表呈现。

### 关键速查表文件

- `src/components/ToolCheatsheet.astro`：整页速查表布局
- `src/components/CheatsheetSection.astro`：分区表格 / 列表渲染
- `src/content/tools/claude-code.md`：当前核心工具内容

## 运行与验证

### 常用命令

- 开发：`pnpm dev`
- 构建：`pnpm build`
- 预览：`pnpm preview`
- 单元 / 冒烟测试：`pnpm test`
- E2E 测试：`pnpm test:e2e`

### 推荐验证命令

在声称完成前，优先运行：

```bash
pnpm astro sync
pnpm vitest tests/smoke/content-sync.test.ts
pnpm playwright test tests/e2e/homepage.spec.ts
pnpm playwright test tests/e2e/tool-page.spec.ts
```

如果改动只影响局部，至少运行与改动直接相关的测试。

## 项目约定

### 内容约定

- 工具内容主要来自 `src/content/tools/*.md` 的 frontmatter。
- 当前速查表页面大量内容来自结构化 `sheet` 数据，而不是正文 Markdown。
- `src/content/config.ts` 中不要把 `slug` 当作普通 schema 字段；页面路由应使用 Astro 提供的 `tool.slug`。
- table / list 单元格中的反引号命令应渲染成 `<code>`，不要直接输出原始 Markdown 字符串。

### 设计约定

- 视觉气质应当是：实用、专业、可信。
- 页面应更像可依赖的技术参考速查表，而不是博客页、SaaS 功能页或营销落地页。
- 默认采用深色主题，并保持克制、稳定、高对比。
- 优先保证信息定位效率，不要为了装饰牺牲密度和清晰度。
- 保持高密度但有秩序的信息排布，以及良好的打印友好性。

### 工程约定

- 保持 TDD：先写失败测试，再做最小实现。
- 不要做与当前任务无关的重构或风格性扩改。
- 在声明“完成”之前必须重新验证。

## 禁改项 / 护栏

- 不要把工具详情页退回普通博客 / 文档页风格。
- 不要把速查表页面做成偏展示型海报或重营销感页面。
- 不要牺牲速查表的信息密度来换取过度留白或展示性设计。
- 不要引入霓虹赛博风、强营销感、或 Apple 式过度极简导致的信息稀薄感。
- 不要随意改变 `src/content/config.ts` 的内容模型，除非任务明确要求。
- 不要破坏 `tool.data.sheet` 驱动的速查表渲染路径。

## 常见任务

### 新增工具页

1. 在 `src/content/tools/` 下新增一个工具内容文件。
2. 按 `src/content/config.ts` 的 schema 填写 frontmatter。
3. 如果需要 cheatsheet 版式，提供 `sheet` 结构化数据。
4. 确认工具页可通过 `/tools/<slug>/` 访问。
5. 补充或更新相关测试。

### 更新 Claude Code 速查表

1. 优先修改 `src/content/tools/claude-code.md` 中的 `sheet` 数据。
2. 如果是版式问题，再查看 `src/components/ToolCheatsheet.astro` 与 `src/components/CheatsheetSection.astro`。
3. 保持打印密度、快速扫读能力和代码样式渲染。
4. 运行工具页相关 Playwright 测试验证。

### 修改内容渲染规则

1. 先检查 `src/content/config.ts` 是否需要 schema 变更。
2. 再检查 `src/pages/tools/[slug].astro` 的渲染分支。
3. 若涉及表格 / 列表内联代码显示，确认 `ToolCheatsheet.astro` 和 `CheatsheetSection.astro` 的渲染逻辑仍正确。

### 验证内容或版式改动

至少检查：

1. `pnpm astro sync`
2. `pnpm vitest tests/smoke/content-sync.test.ts`
3. `pnpm playwright test tests/e2e/tool-page.spec.ts`

如果改动涉及首页，再加跑：

4. `pnpm playwright test tests/e2e/homepage.spec.ts`
