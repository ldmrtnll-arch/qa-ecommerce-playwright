import {
  expect,
  test as base,
  type Page,
} from "@playwright/test";
import { InventoryPage } from "../pages/inventory-page";
import { LoginPage } from "../pages/login-page";
import { loginUsers } from "../test-data/login-data";

type AuthenticatedFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthenticatedFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();

    await loginPage.login(
      loginUsers.standard.username,
      loginUsers.standard.password,
    );

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.pageTitle).toBeVisible();
    await expect(inventoryPage.inventoryList).toBeVisible();

    await use(page);
  },
});

export { expect };