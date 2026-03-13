import { expect, test } from "@playwright/test";

test("首页应该显示 Claude Code", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Claude Code")).toBeVisible();
});
