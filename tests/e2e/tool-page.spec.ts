import { expect, test } from "@playwright/test";

test("工具页应该渲染 Claude Code", async ({ page }) => {
  await page.goto("/tools/claude-code/");
  await expect(page.getByRole("heading", { name: "Claude Code" })).toBeVisible();
});

test("工具页应该包含快捷键内容", async ({ page }) => {
  await page.goto("/tools/claude-code/");
  await expect(page.getByText("Shift+Tab")).toBeVisible();
});
