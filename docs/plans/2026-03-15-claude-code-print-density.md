# Claude Code Print Density Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 提升 `Claude Code` cheatsheet 页的信息密度与打印感，同时保持屏幕阅读可用性。

**Architecture:** 保持现有 `ToolCheatsheet` 与 `CheatsheetSection` 的结构化渲染路径，只对页眉结构、分隔语义和全局样式 token 做增强。测试以 Playwright 的 CSS 断言为主，确保改动不会退回普通网页卡片风格。

**Tech Stack:** Astro 5, TypeScript, Playwright, CSS

---

### Task 1: 收紧页眉与版芯结构

**Files:**
- Modify: `src/components/ToolCheatsheet.astro`
- Modify: `src/styles/global.css`
- Test: `tests/e2e/tool-page.spec.ts`

**Step 1: Write the failing test**

在 `tests/e2e/tool-page.spec.ts` 添加断言：
- `.sheet` 具有更明确的圆角
- `.sheet-hero` 具有更紧凑的底部间距
- `.sheet-hero-meta` 有左边框或内部信息条语义

**Step 2: Run test to verify it fails**

Run: `pnpm playwright test tests/e2e/tool-page.spec.ts -g "页眉和版芯应该更像打印稿"`  
Expected: FAIL with current CSS value mismatch

**Step 3: Write minimal implementation**

- 在 `ToolCheatsheet.astro` 为 hero/meta/footer 加更明确的结构 class
- 在 `global.css` 中增强 `.sheet`、`.sheet-hero`、`.sheet-hero-meta`

**Step 4: Run test to verify it passes**

Run: `pnpm playwright test tests/e2e/tool-page.spec.ts -g "页眉和版芯应该更像打印稿"`  
Expected: PASS

**Step 5: Commit**

```bash
git add tests/e2e/tool-page.spec.ts src/components/ToolCheatsheet.astro src/styles/global.css
git commit -m "feat: tighten cheatsheet hero shell"
```

### Task 2: 压紧 section 与表格密度

**Files:**
- Modify: `src/components/CheatsheetSection.astro`
- Modify: `src/styles/global.css`
- Test: `tests/e2e/tool-page.spec.ts`

**Step 1: Write the failing test**

在 `tests/e2e/tool-page.spec.ts` 添加断言：
- `.sheet-section` padding 更紧
- `th` / `td` padding 和字号更贴近速查表
- `.sheet-note` 字号和间距更克制

**Step 2: Run test to verify it fails**

Run: `pnpm playwright test tests/e2e/tool-page.spec.ts -g "正文分区和表格应该更紧凑"`  
Expected: FAIL with CSS mismatch

**Step 3: Write minimal implementation**

- 收紧 section、table、note、list 的节奏
- 保持代码片段仍可辨认

**Step 4: Run test to verify it passes**

Run: `pnpm playwright test tests/e2e/tool-page.spec.ts -g "正文分区和表格应该更紧凑"`  
Expected: PASS

**Step 5: Commit**

```bash
git add tests/e2e/tool-page.spec.ts src/components/CheatsheetSection.astro src/styles/global.css
git commit -m "feat: compress cheatsheet sections"
```

### Task 3: 补强打印输出规则

**Files:**
- Modify: `src/styles/global.css`
- Test: `tests/e2e/tool-page.spec.ts`

**Step 1: Write the failing test**

在 `tests/e2e/tool-page.spec.ts` 添加断言：
- 打印时 `.sheet` 去阴影与外边框
- `main` 在 print 里无多余边距
- `section` 与 `footer` 避免明显分页断裂

**Step 2: Run test to verify it fails**

Run: `pnpm playwright test tests/e2e/tool-page.spec.ts -g "打印样式应该更适合单页输出"`  
Expected: FAIL because current print styles are incomplete

**Step 3: Write minimal implementation**

- 增加更细的 `@media print` 规则
- 为关键块添加 `break-inside` / `page-break-inside` 保护

**Step 4: Run test to verify it passes**

Run: `pnpm playwright test tests/e2e/tool-page.spec.ts -g "打印样式应该更适合单页输出"`  
Expected: PASS

**Step 5: Commit**

```bash
git add tests/e2e/tool-page.spec.ts src/styles/global.css
git commit -m "feat: refine cheatsheet print stylesheet"
```

### Task 4: 完整验证

**Files:**
- Verify only

**Step 1: Run content sync**

Run: `pnpm astro sync`  
Expected: PASS

**Step 2: Run build**

Run: `pnpm build`  
Expected: PASS

**Step 3: Run homepage e2e**

Run: `pnpm playwright test tests/e2e/homepage.spec.ts`  
Expected: PASS

**Step 4: Run tool-page e2e**

Run: `pnpm playwright test tests/e2e/tool-page.spec.ts`  
Expected: PASS

**Step 5: Commit**

```bash
git add docs/plans/2026-03-15-claude-code-print-density-design.md docs/plans/2026-03-15-claude-code-print-density.md
git commit -m "docs: add cheatsheet print density plan"
```
