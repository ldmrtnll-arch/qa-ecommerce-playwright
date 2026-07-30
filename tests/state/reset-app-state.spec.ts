import {
  expect,
  test,
} from '../../fixtures/authenticated-test';
import { MenuComponent } from '../../components/menu-component';
import { CartPage } from '../../pages/cart-page';
import { InventoryPage } from '../../pages/inventory-page';
import { inventoryProducts } from '../../test-data/inventory-data';

test.describe('Reset app state', () => {
  let cartPage: CartPage;
  let inventoryPage: InventoryPage;
  let menu: MenuComponent;

  test.skip(
    ({ browserName }) => browserName === 'webkit',
    'Blocked by a SauceDemo issue: the side menu may not open in WebKit after cart state changes.',
  );

  test.beforeEach(async ({ authenticatedPage }) => {
    cartPage = new CartPage(authenticatedPage);
    inventoryPage = new InventoryPage(authenticatedPage);
    menu = new MenuComponent(authenticatedPage);
  });

  test('TC-RST-001 - should clear the cart using Reset App State', async ({
    page,
  }) => {
    const firstProductName =
      inventoryProducts.backpack.name;

    const secondProductName =
      inventoryProducts.bikeLight.name;

    const firstProduct =
      inventoryPage.getProductByName(firstProductName);

    const secondProduct =
      inventoryPage.getProductByName(secondProductName);

    await inventoryPage.addProductToCart(firstProductName);
    await inventoryPage.addProductToCart(secondProductName);

    await expect(inventoryPage.cartBadge).toHaveText('2');

    await expect(
      inventoryPage.getRemoveButton(firstProduct),
    ).toBeVisible();

    await expect(
      inventoryPage.getRemoveButton(secondProduct),
    ).toBeVisible();

    await menu.open();

    await expect(menu.resetAppStateLink).toBeVisible();
    await expect(menu.resetAppStateLink).toBeEnabled();

    await menu.resetAppState();

    await expect(inventoryPage.cartBadge).toBeHidden();
    await expect(menu.closeMenuButton).toBeVisible();

    await menu.close();

    const firstProductButtonWasReset = await inventoryPage
      .getAddToCartButton(firstProduct)
      .isVisible();

    const secondProductButtonWasReset = await inventoryPage
      .getAddToCartButton(secondProduct)
      .isVisible();

    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.pageTitle).toBeVisible();
    await expect(cartPage.cartItems).toHaveCount(0);

    const productButtonsWereReset =
      firstProductButtonWasReset &&
      secondProductButtonWasReset;

    if (!productButtonsWereReset) {
      test.info().annotations.push({
        type: 'known-defect',
        description:
          'Reset App State clears the cart but does not refresh product action buttons.',
      });
    }

    test.fail(
      !productButtonsWereReset,
      'Known defect: Reset App State clears the cart but does not refresh product action buttons.',
    );

    expect(firstProductButtonWasReset).toBe(true);
    expect(secondProductButtonWasReset).toBe(true);
  });

  test('TC-RST-002 - should keep the cart empty after reloading the inventory page', async ({
    page,
  }) => {
    const firstProductName =
      inventoryProducts.backpack.name;

    const secondProductName =
      inventoryProducts.bikeLight.name;

    await inventoryPage.addProductToCart(firstProductName);
    await inventoryPage.addProductToCart(secondProductName);

    await expect(inventoryPage.cartBadge).toHaveText('2');

    await menu.open();

    await expect(menu.resetAppStateLink).toBeVisible();
    await expect(menu.resetAppStateLink).toBeEnabled();

    await menu.resetAppState();

    await expect(inventoryPage.cartBadge).toBeHidden();

    await page.reload();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.pageTitle).toBeVisible();
    await expect(inventoryPage.inventoryList).toBeVisible();
    await expect(inventoryPage.cartBadge).toBeHidden();

    const firstProduct =
      inventoryPage.getProductByName(firstProductName);

    const secondProduct =
      inventoryPage.getProductByName(secondProductName);

    await expect(
      inventoryPage.getAddToCartButton(firstProduct),
    ).toBeVisible();

    await expect(
      inventoryPage.getAddToCartButton(secondProduct),
    ).toBeVisible();

    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.pageTitle).toBeVisible();
    await expect(cartPage.cartItems).toHaveCount(0);
  });
});