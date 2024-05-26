import { test, expect } from "@playwright/test";

test.describe("Detail Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/show/21");
  });

  test("should display show details", async ({ page }) => {
    await expect(page.locator(".show-detail-header__title")).toBeVisible();
    await expect(page.locator(".show-detail-summary")).toBeVisible();
  });
});
