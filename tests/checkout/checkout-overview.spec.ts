import { expect, test } from '@playwright/test';
import { CartPage } from '../../pages/cart-page';
import { CheckoutCompletePage } from '../../pages/checkout-complete-page';
import { CheckoutInformationPage } from '../../pages/checkout-information-page';
import { CheckoutOverviewPage } from '../../pages/checkout-overview-page';
import { InventoryPage } from '../../pages/inventory-page';
import { LoginPage } from '../../pages/login-page';
import { checkoutCustomer } from '../../test-data/checkout-data';
import { inventoryProducts } from '../../test-data/inventory-data';
import { loginUsers } from '../../test-data/login-data';

test.describe('Checkout overview', () => {
  let cartPage: CartPage;
  let checkoutCompletePage: CheckoutCompletePage;
  let checkoutOverviewPage: CheckoutOverviewPage;
  let inventoryPage: InventoryPage;

  let expectedProductData = {
    description: '',
    price: '',
    quantity: '',
  };

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);
    const checkoutInformationPage = new CheckoutInformationPage(page);

    checkoutOverviewPage = new CheckoutOverviewPage(page);

    await loginPage.goto();

    await loginPage.login(
      loginUsers.standard.username,
      loginUsers.standard.password,
    );

    await expect(page).toHaveURL(/inventory\.html/);

    await inventoryPage.addProductToCart(inventoryProducts.backpack.name);

    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.cartItems).toHaveCount(1);

    const cartProduct = cartPage.getProductByName(
      inventoryProducts.backpack.name,
    );

    const cartProductDescription = cartPage.getProductDescription(cartProduct);

    const cartProductPrice = cartPage.getProductPrice(cartProduct);

    const cartProductQuantity = cartPage.getProductQuantity(cartProduct);

    await expect(cartProduct).toBeVisible();
    await expect(cartProductDescription).not.toHaveText('');
    await expect(cartProductPrice).toHaveText(/^\$\d+\.\d{2}$/);
    await expect(cartProductQuantity).toHaveText('1');

    expectedProductData = {
      description: (await cartProductDescription.innerText()).trim(),

      price: (await cartProductPrice.innerText()).trim(),

      quantity: (await cartProductQuantity.innerText()).trim(),
    };

    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one\.html/);

    await checkoutInformationPage.fillCustomerInformation(
      checkoutCustomer.valid.firstName,
      checkoutCustomer.valid.lastName,
      checkoutCustomer.valid.postalCode,
    );

    await checkoutInformationPage.continue();

    await expect(page).toHaveURL(/checkout-step-two\.html/);

    await expect(checkoutOverviewPage.pageTitle).toBeVisible();
  });

  test('TC-CHK2-001 - should display the selected product in the checkout overview', async () => {
    await expect(checkoutOverviewPage.checkoutItems).toHaveCount(1);

    const overviewProduct = checkoutOverviewPage.getProductByName(
      inventoryProducts.backpack.name,
    );

    await expect(overviewProduct).toBeVisible();

    await expect(
      checkoutOverviewPage.getProductName(overviewProduct),
    ).toHaveText(inventoryProducts.backpack.name);

    await expect(
      checkoutOverviewPage.getProductDescription(overviewProduct),
    ).toHaveText(expectedProductData.description);

    await expect(
      checkoutOverviewPage.getProductPrice(overviewProduct),
    ).toHaveText(expectedProductData.price);

    await expect(
      checkoutOverviewPage.getProductQuantity(overviewProduct),
    ).toHaveText(expectedProductData.quantity);
  });

  test('TC-CHK2-002 - should calculate the item subtotal correctly', async () => {
    const productPrice = Number(expectedProductData.price.replace('$', ''));

    const productQuantity = Number(expectedProductData.quantity);

    const expectedSubtotal = productPrice * productQuantity;

    expect(productPrice).not.toBeNaN();
    expect(productQuantity).not.toBeNaN();

    await expect(checkoutOverviewPage.itemTotalLabel).toHaveText(
      `Item total: $${expectedSubtotal.toFixed(2)}`,
    );
  });

  test('TC-CHK2-003 - should calculate the order total correctly', async () => {
    await expect(checkoutOverviewPage.itemTotalLabel).toHaveText(
      /^Item total: \$\d+\.\d{2}$/,
    );

    await expect(checkoutOverviewPage.taxLabel).toHaveText(
      /^Tax: \$\d+\.\d{2}$/,
    );

    await expect(checkoutOverviewPage.totalLabel).toHaveText(
      /^Total: \$\d+\.\d{2}$/,
    );

    const subtotalText = await checkoutOverviewPage.itemTotalLabel.innerText();

    const taxText = await checkoutOverviewPage.taxLabel.innerText();

    const totalText = await checkoutOverviewPage.totalLabel.innerText();

    const subtotal = Number(subtotalText.replace(/[^0-9.-]+/g, ''));

    const tax = Number(taxText.replace(/[^0-9.-]+/g, ''));

    const displayedTotal = Number(totalText.replace(/[^0-9.-]+/g, ''));

    expect(subtotal).not.toBeNaN();
    expect(tax).not.toBeNaN();
    expect(displayedTotal).not.toBeNaN();

    expect(subtotal).toBeGreaterThan(0);
    expect(tax).toBeGreaterThanOrEqual(0);

    const expectedTotal = subtotal + tax;

    expect(displayedTotal).toBeCloseTo(expectedTotal, 2);
  });

  test('TC-CHK2-004 - should cancel the checkout overview and return to the inventory', async ({
    page,
  }) => {
    await checkoutOverviewPage.cancel();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.cartItems).toHaveCount(1);

    const cartProduct = cartPage.getProductByName(
      inventoryProducts.backpack.name,
    );

    await expect(cartProduct).toBeVisible();

    await expect(cartPage.getProductName(cartProduct)).toHaveText(
      inventoryProducts.backpack.name,
    );

    await expect(cartPage.getProductQuantity(cartProduct)).toHaveText('1');
  });

  test('TC-CHK2-005 - should finish a valid purchase successfully', async ({
    page,
  }) => {
    await checkoutOverviewPage.finish();

    await expect(page).toHaveURL(/checkout-complete\.html/);

    await expect(checkoutCompletePage.pageTitle).toBeVisible();

    await expect(checkoutCompletePage.confirmationHeader).toHaveText(
      'Thank you for your order!',
    );

    await expect(checkoutCompletePage.confirmationMessage).toContainText(
      'Your order has been dispatched',
    );
  });

  test('TC-CHK2-006 - should clear the cart after completing the purchase', async ({
    page,
  }) => {
    await checkoutOverviewPage.finish();

    await expect(page).toHaveURL(/checkout-complete\.html/);

    await expect(checkoutCompletePage.confirmationHeader).toHaveText(
      'Thank you for your order!',
    );

    await expect(inventoryPage.cartBadge).toHaveCount(0);

    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.pageTitle).toBeVisible();
    await expect(cartPage.cartItems).toHaveCount(0);

    await expect(
      cartPage.getProductByName(inventoryProducts.backpack.name),
    ).toHaveCount(0);
  });

  test('TC-CNF-002 - should return to the inventory from the checkout confirmation page', async ({
    page,
  }) => {
    await checkoutOverviewPage.finish();

    await expect(page).toHaveURL(/checkout-complete\.html/);

    await expect(checkoutCompletePage.pageTitle).toBeVisible();

    await expect(checkoutCompletePage.backHomeButton).toBeVisible();
    await expect(checkoutCompletePage.backHomeButton).toBeEnabled();

    await checkoutCompletePage.returnToInventory();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.pageTitle).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });
});
