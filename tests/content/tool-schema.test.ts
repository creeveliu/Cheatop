import { describe, expect, it } from "vitest";
import { toolCategories } from "../../src/lib/tool";

describe("工具元信息", () => {
  it("应该定义支持的分类", () => {
    expect(toolCategories).toContain("CLI");
  });
});
