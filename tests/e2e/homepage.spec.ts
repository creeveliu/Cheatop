import { expect, test } from "@playwright/test";

test("首页应该显示 Claude Code", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Claude Code" })).toBeVisible();
});

test("首页应该默认使用深色主题", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(10, 13, 18)");
});

test("首页标题和卡片应该使用更收敛的圆角与字号", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".directory-hero h1")).toHaveCSS("font-size", "56px");
  await expect(page.locator(".directory-meta p").first()).toHaveCSS("border-radius", "14px");
  await expect(page.locator(".tool-card")).toHaveCSS("border-radius", "16px");
});
