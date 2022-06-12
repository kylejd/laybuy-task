import { test, expect } from "@playwright/test";

test("should nagivate to the login page, log in and log out", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page).toHaveURL("/login");

  await page.fill("input[name=password]", "123");
  await page.fill("input[name=email]", "test@test.com");

  await page.locator('button:has-text("Sign In")').click();

  await expect(page).toHaveURL("/");

  await expect(page.locator("Hello!")).toBeDefined();

  await page.locator('button:has-text("Sign Out")').click();

  await expect(page).toHaveURL("/login");
});
