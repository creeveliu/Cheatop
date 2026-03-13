import { execSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("Astro content sync", () => {
  it("应该能成功同步 content collections", () => {
    let status = 0;

    try {
      execSync("pnpm astro sync", { stdio: "pipe" });
    } catch (error) {
      status = (error as { status?: number }).status ?? 1;
    }

    expect(status).toBe(0);
  });
});
