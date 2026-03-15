import { expect, test } from "@playwright/test";

test("工具页应该渲染 Claude Code", async ({ page }) => {
  await page.goto("/tools/claude-code/");
  await expect(page.getByRole("heading", { name: "Claude Code" })).toBeVisible();
});

test("工具页应该包含快捷键内容", async ({ page }) => {
  await page.goto("/tools/claude-code/");
  await expect(page.getByText("Shift+Tab")).toBeVisible();
});

test("工具页应该展示 cheatsheet 核心分区", async ({ page }) => {
  await page.goto("/tools/claude-code/");
  await expect(page.getByRole("heading", { name: "关键 Flags" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "内建 Slash Commands" })).toBeVisible();
});

test("工具页应该把命令渲染成代码样式", async ({ page }) => {
  await page.goto("/tools/claude-code/");
  await expect(page.locator("code", { hasText: "claude" }).first()).toBeVisible();
});

test("工具页 hero meta 区域的命令应该渲染成代码样式", async ({ page }) => {
  await page.goto("/tools/claude-code/");
  await expect(page.locator(".sheet-meta code", { hasText: "curl -fsSL claude.ai/install.sh | bash" })).toBeVisible();
});
