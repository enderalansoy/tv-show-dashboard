import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.waitForSelector(".show-list__item");
  });

  test("should display the correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/TV Show Dashboard/);
  });

  test("should display show list with items", async ({ page }) => {
    const showItems = page.locator(".show-list__item");
    const itemCount = await showItems.count();
    expect(itemCount).toBeGreaterThan(0);
  });

  test("should navigate to show detail page on click", async ({ page }) => {
    const firstShow = page.locator(".show-list__item").first();
    await firstShow.click();
    await expect(page).toHaveURL(/\/show\/\d+/);
    await expect(page.locator(".show-detail__info")).toBeVisible();
  });
});
