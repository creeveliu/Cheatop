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

test("页眉和版芯应该更像打印稿", async ({ page }) => {
  await page.goto("/tools/claude-code/");
  await expect(page.locator(".sheet")).toHaveCSS("border-radius", "24px");
  await expect(page.locator(".sheet-hero")).toHaveCSS("margin-bottom", "10px");
  await expect(page.locator(".sheet-meta-panel")).toHaveCSS("border-left-width", "1px");
});

test("正文分区和表格应该更紧凑", async ({ page }) => {
  await page.goto("/tools/claude-code/");
  await expect(page.locator(".sheet-section").first()).toHaveCSS("padding-top", "10px");
  await expect(page.locator(".sheet table").first()).toHaveCSS("font-size", "13.12px");
  await expect(page.locator(".sheet th").first()).toHaveCSS("padding-top", "4px");
  await expect(page.locator(".sheet-note").first()).toHaveCSS("font-size", "11.84px");
});

test("打印样式应该更适合单页输出", async ({ page }) => {
  await page.goto("/tools/claude-code/");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator("main")).toHaveCSS("padding-top", "0px");
  await expect(page.locator(".sheet")).toHaveCSS("box-shadow", "none");
  await expect(page.locator(".sheet-section").first()).toHaveCSS("padding-top", "8px");
  await expect(page.locator(".sheet-footer")).toHaveCSS("break-inside", "avoid");
});
