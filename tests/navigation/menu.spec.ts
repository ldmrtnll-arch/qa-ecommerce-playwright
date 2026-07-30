import { expect, test } from '@playwright/test';
import { MenuComponent } from '../../components/menu-component';
import { InventoryPage } from '../../pages/inventory-page';
import { LoginPage } from '../../pages/login-page';
import { ProductDetailsPage } from '../../pages/product-details-page';
import { inventoryProducts } from '../../test-data/inventory-data';
import { loginUsers } from '../../test-data/login-data';

test.describe('Side menu navigation', () => {
  let inventoryPage: InventoryPage;
  let menu: MenuComponent;
  let productDetailsPage: ProductDetailsPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    inventoryPage = new InventoryPage(page);
    menu = new MenuComponent(page);
    productDetailsPage = new ProductDetailsPage(page);

    await loginPage.goto();

    await loginPage.login(
      loginUsers.standard.username,
      loginUsers.standard.password,
    );

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.pageTitle).toBeVisible();
  });

  test('TC-MEN-001 - should return to the inventory using All Items', async ({
    page,
  }) => {
    await inventoryPage.openProductDetails(inventoryProducts.backpack.name);

    await expect(page).toHaveURL(/inventory-item\.html\?id=\d+/);

    await expect(productDetailsPage.productName).toHaveText(
      inventoryProducts.backpack.name,
    );

    await menu.open();

    await expect(menu.allItemsLink).toBeVisible();
    await expect(menu.allItemsLink).toBeEnabled();

    await menu.goToAllItems();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.pageTitle).toBeVisible();
    await expect(inventoryPage.inventoryList).toBeVisible();

    await expect(
      inventoryPage.getProductByName(inventoryProducts.backpack.name),
    ).toBeVisible();
  });

  test('TC-MEN-002 - should open the About page', async ({ page }) => {
    await menu.open();

    await expect(menu.aboutLink).toBeVisible();
    await expect(menu.aboutLink).toBeEnabled();

    const aboutHref = await menu.aboutLink.getAttribute('href');

    expect(aboutHref).not.toBeNull();

    const expectedAboutUrl = new URL(aboutHref!, page.url());

    await menu.openAbout();

    await expect(page).not.toHaveURL(/inventory\.html/);

    await expect
      .poll(() => new URL(page.url()).hostname)
      .toBe(expectedAboutUrl.hostname);
  });

  test('TC-MEN-003 - should close the side menu', async ({ page }) => {
    await menu.open();

    await expect(menu.closeMenuButton).toBeVisible();
    await expect(menu.allItemsLink).toBeVisible();
    await expect(menu.aboutLink).toBeVisible();

    await menu.close();

    await expect(menu.closeMenuButton).toBeHidden();
    await expect(menu.allItemsLink).toBeHidden();
    await expect(menu.aboutLink).toBeHidden();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.pageTitle).toBeVisible();
    await expect(inventoryPage.inventoryList).toBeVisible();

    await expect(menu.openMenuButton).toBeVisible();
    await expect(menu.openMenuButton).toBeEnabled();
  });
});
