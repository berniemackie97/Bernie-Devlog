import { expect, test } from "@playwright/test";

const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL ?? "http://127.0.0.1:4321";

test.describe("Magazine stack", () => {
  test("issues archive highlights stack styling", async ({ page }) => {
    await page.goto(`${BASE_URL}/issues/page/1`);
    await expect(page.getByRole("heading", { name: "Stacks fresh from the newsroom" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Open the issue/i }).first()).toBeVisible();
  });
});
