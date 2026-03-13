import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("布局文件", () => {
  it("应该创建基础布局文件", () => {
    expect(existsSync("src/layouts/BaseLayout.astro")).toBe(true);
  });
});
