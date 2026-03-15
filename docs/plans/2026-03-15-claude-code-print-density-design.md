# Claude Code Print Density Design

日期：2026-03-15

## 目标

在不牺牲屏幕可读性的前提下，把 `Claude Code` cheatsheet 页面进一步做成“可打印的技术速查纸”。页面在桌面浏览时应明显带有纸面排版感，在打印时则自然收敛成一张高密度 cheatsheet，而不是普通网页截图。

## 现状判断

- 当前详情页已经具备 `hero + 双栏 + table/list` 的基本结构。
- 现有深色主题统一了站点视觉，但 cheatsheet 本体仍偏“网页卡片”。
- 打印样式目前只去掉了 header/footer 和阴影，还没有针对纸面输出做更细的版式收束。

## 设计方向

本轮采用“屏幕与打印平衡”的路线：

- 屏幕端：
  - 保持舒适阅读，不把字号和行高压到不可读。
  - 通过更强的版芯、边框、信息条和节奏，强化“编辑排版感”。
- 打印端：
  - 去掉网页容器语气，强化单页纸面结构。
  - 让 `hero`、双栏正文、页脚注释能在 A4 输出里更稳定地拼成一页。

## 视觉策略

### 1. 更像页眉的 Hero

- `hero` 不再只是普通 banner，而是页眉区。
- 左侧标题区保留标题、dek、pill，但整体更紧凑。
- 右侧 meta 收成“核对信息栏”，强调时间、来源、安装、模型信息。
- 通过更明确的边框、细分隔线和更稳的背景层次，让它像页眉信息块。

### 2. 更高密度的正文区

- 继续保留双栏，但把 section 间距、表格单元格 padding、note 节奏压紧一档。
- section 标题更像印刷小标题，弱化“网页模块标题”的感觉。
- 表格优先服务扫读：表头更克制，单元格更紧凑，代码片段仍保持清晰区分。

### 3. 更明确的纸面结构

- cheatsheet 主体增加内层版芯感，例如更稳的容器圆角、内边框或分隔规则。
- 页脚信息改成更像文末出处区，而不是普通文本列表。
- 减弱全站 header/footer 对详情页的存在感，但不改全局壳结构。

### 4. 打印专用收束

- 打印时隐藏站点壳。
- 收紧页面外边距和 section 节奏。
- 去掉无意义背景和阴影，同时保留边框与信息层级。
- 保证双栏、页脚、note 不会出现明显的分页错位。

## 实现范围

本轮只做 `Claude Code` cheatsheet 的视觉与打印增强，不扩内容模型，不改首页结构，不引入搜索。

涉及文件预计包括：

- `src/components/ToolCheatsheet.astro`
- `src/components/CheatsheetSection.astro`
- `src/styles/global.css`
- `tests/e2e/tool-page.spec.ts`

## 验证策略

- 先补失败的 e2e 断言，覆盖：
  - hero 页眉区的结构与紧凑度
  - cheatsheet 容器的版芯样式
  - section/table 的密度收束
  - 打印样式关键规则是否存在
- 再做最小实现。
- 最终重新运行：
  - `pnpm astro sync`
  - `pnpm build`
  - `pnpm playwright test tests/e2e/homepage.spec.ts`
  - `pnpm playwright test tests/e2e/tool-page.spec.ts`
