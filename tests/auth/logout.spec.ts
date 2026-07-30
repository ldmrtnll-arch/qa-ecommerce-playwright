import { expect, test } from '@playwright/test';
import { MenuComponent } from '../../components/menu-component';
import { InventoryPage } from '../../pages/inventory-page';
import { LoginPage } from '../../pages/login-page';
import { loginUsers } from '../../test-data/login-data';

test.describe('Authentication session', () => {
  let inventoryPage: InventoryPage;
  let loginPage: LoginPage;
  let menu: MenuComponent;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    menu = new MenuComponent(page);

    await loginPage.goto();

    await loginPage.login(
      loginUsers.standard.username,
      loginUsers.standard.password,
    );

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.pageTitle).toBeVisible();
  });

  test('TC-AUT-001 - should log out and prevent restoration of the authenticated session', async ({
    page,
  }) => {
    await menu.open();

    await expect(menu.logoutLink).toBeVisible();
    await expect(menu.logoutLink).toBeEnabled();

    await menu.logout();

    await expect(page).toHaveURL(/saucedemo\.com\/?$/);

    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();

    await expect(loginPage.usernameInput).toHaveValue('');
    await expect(loginPage.passwordInput).toHaveValue('');

    await page.goBack();

    await expect(page).toHaveURL(/saucedemo\.com\/?$/);

    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();

    await expect(inventoryPage.pageTitle).toBeHidden();
  });
});
