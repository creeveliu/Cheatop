import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("项目初始化", () => {
  it("应该存在 Astro 配置文件", () => {
    expect(existsSync("astro.config.mjs")).toBe(true);
  });
});
