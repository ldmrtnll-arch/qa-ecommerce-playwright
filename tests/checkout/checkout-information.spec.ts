import { expect, test } from '@playwright/test';
import { CartPage } from '../../pages/cart-page';
import { CheckoutInformationPage } from '../../pages/checkout-information-page';
import { InventoryPage } from '../../pages/inventory-page';
import { LoginPage } from '../../pages/login-page';
import {
  checkoutCustomer,
  checkoutErrorMessages,
} from '../../test-data/checkout-data';
import { inventoryProducts } from '../../test-data/inventory-data';
import { loginUsers } from '../../test-data/login-data';

test.describe('Checkout information', () => {
  let cartPage: CartPage;
  let checkoutInformationPage: CheckoutInformationPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    cartPage = new CartPage(page);
    checkoutInformationPage = new CheckoutInformationPage(page);
    inventoryPage = new InventoryPage(page);

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

    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one\.html/);

    await expect(checkoutInformationPage.pageTitle).toBeVisible();
  });

  test('TC-CHK1-001 - should continue checkout with valid customer information', async ({
    page,
  }) => {
    await checkoutInformationPage.fillCustomerInformation(
      checkoutCustomer.valid.firstName,
      checkoutCustomer.valid.lastName,
      checkoutCustomer.valid.postalCode,
    );

    await expect(checkoutInformationPage.firstNameInput).toHaveValue(
      checkoutCustomer.valid.firstName,
    );

    await expect(checkoutInformationPage.lastNameInput).toHaveValue(
      checkoutCustomer.valid.lastName,
    );

    await expect(checkoutInformationPage.postalCodeInput).toHaveValue(
      checkoutCustomer.valid.postalCode,
    );

    await checkoutInformationPage.continue();

    await expect(page).toHaveURL(/checkout-step-two\.html/);

    await expect(
      page.getByText('Checkout: Overview', {
        exact: true,
      }),
    ).toBeVisible();

    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1);

    await expect(
      page.getByText(inventoryProducts.backpack.name, { exact: true }),
    ).toBeVisible();
  });

  test('TC-CHK1-002 - should require the first name field', async ({
    page,
  }) => {
    await checkoutInformationPage.fillLastName(checkoutCustomer.valid.lastName);

    await checkoutInformationPage.fillPostalCode(
      checkoutCustomer.valid.postalCode,
    );

    await checkoutInformationPage.continue();

    await expect(page).toHaveURL(/checkout-step-one\.html/);

    await expect(checkoutInformationPage.errorMessage).toHaveText(
      checkoutErrorMessages.firstNameRequired,
    );

    await expect(checkoutInformationPage.firstNameInput).toHaveValue('');

    await expect(checkoutInformationPage.lastNameInput).toHaveValue(
      checkoutCustomer.valid.lastName,
    );

    await expect(checkoutInformationPage.postalCodeInput).toHaveValue(
      checkoutCustomer.valid.postalCode,
    );

    await expect(checkoutInformationPage.continueButton).toBeVisible();
  });

  test('TC-CHK1-003 - should require the last name field', async ({ page }) => {
    await checkoutInformationPage.fillFirstName(
      checkoutCustomer.valid.firstName,
    );

    await checkoutInformationPage.fillPostalCode(
      checkoutCustomer.valid.postalCode,
    );

    await checkoutInformationPage.continue();

    await expect(page).toHaveURL(/checkout-step-one\.html/);

    await expect(checkoutInformationPage.errorMessage).toHaveText(
      checkoutErrorMessages.lastNameRequired,
    );

    await expect(checkoutInformationPage.firstNameInput).toHaveValue(
      checkoutCustomer.valid.firstName,
    );

    await expect(checkoutInformationPage.lastNameInput).toHaveValue('');

    await expect(checkoutInformationPage.postalCodeInput).toHaveValue(
      checkoutCustomer.valid.postalCode,
    );

    await expect(checkoutInformationPage.continueButton).toBeVisible();
  });

  test('TC-CHK1-004 - should require the postal code field', async ({
    page,
  }) => {
    await checkoutInformationPage.fillFirstName(
      checkoutCustomer.valid.firstName,
    );

    await checkoutInformationPage.fillLastName(checkoutCustomer.valid.lastName);

    await checkoutInformationPage.continue();

    await expect(page).toHaveURL(/checkout-step-one\.html/);

    await expect(checkoutInformationPage.errorMessage).toHaveText(
      checkoutErrorMessages.postalCodeRequired,
    );

    await expect(checkoutInformationPage.firstNameInput).toHaveValue(
      checkoutCustomer.valid.firstName,
    );

    await expect(checkoutInformationPage.lastNameInput).toHaveValue(
      checkoutCustomer.valid.lastName,
    );

    await expect(checkoutInformationPage.postalCodeInput).toHaveValue('');

    await expect(checkoutInformationPage.continueButton).toBeVisible();
  });

  test('TC-CHK1-005 - should prevent checkout when all fields are empty', async ({
    page,
  }) => {
    await checkoutInformationPage.continue();

    await expect(page).toHaveURL(/checkout-step-one\.html/);

    await expect(checkoutInformationPage.errorMessage).toHaveText(
      checkoutErrorMessages.firstNameRequired,
    );

    await expect(checkoutInformationPage.firstNameInput).toHaveValue('');

    await expect(checkoutInformationPage.lastNameInput).toHaveValue('');

    await expect(checkoutInformationPage.postalCodeInput).toHaveValue('');

    await expect(checkoutInformationPage.continueButton).toBeVisible();
  });

  test('TC-CHK1-006 - should cancel checkout information and return to the cart', async ({
    page,
  }) => {
    await checkoutInformationPage.fillCustomerInformation(
      checkoutCustomer.valid.firstName,
      checkoutCustomer.valid.lastName,
      checkoutCustomer.valid.postalCode,
    );

    await expect(checkoutInformationPage.firstNameInput).toHaveValue(
      checkoutCustomer.valid.firstName,
    );

    await expect(checkoutInformationPage.lastNameInput).toHaveValue(
      checkoutCustomer.valid.lastName,
    );

    await expect(checkoutInformationPage.postalCodeInput).toHaveValue(
      checkoutCustomer.valid.postalCode,
    );

    await checkoutInformationPage.cancel();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.pageTitle).toBeVisible();
    await expect(cartPage.cartItems).toHaveCount(1);

    const cartProduct = cartPage.getProductByName(
      inventoryProducts.backpack.name,
    );

    await expect(cartProduct).toBeVisible();

    await expect(cartPage.getProductName(cartProduct)).toHaveText(
      inventoryProducts.backpack.name,
    );

    await expect(cartPage.getProductQuantity(cartProduct)).toHaveText('1');

    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test.fail(
    'TC-CHK1-007 - should reject fields containing only spaces',
    {
      annotation: {
        type: 'known-defect',
        description:
          'SauceDemo currently accepts whitespace-only checkout information.',
      },
    },
    async ({ page }) => {
      await checkoutInformationPage.fillCustomerInformation(
        checkoutCustomer.whitespaceOnly.firstName,
        checkoutCustomer.whitespaceOnly.lastName,
        checkoutCustomer.whitespaceOnly.postalCode,
      );

      await expect(checkoutInformationPage.firstNameInput).toHaveValue(
        checkoutCustomer.whitespaceOnly.firstName,
      );

      await expect(checkoutInformationPage.lastNameInput).toHaveValue(
        checkoutCustomer.whitespaceOnly.lastName,
      );

      await expect(checkoutInformationPage.postalCodeInput).toHaveValue(
        checkoutCustomer.whitespaceOnly.postalCode,
      );

      await checkoutInformationPage.continue();

      await expect(page).toHaveURL(/checkout-step-one\.html/);

      await expect(checkoutInformationPage.errorMessage).toHaveText(
        checkoutErrorMessages.firstNameRequired,
      );
    },
  );

  test.fail(
    'TC-CHK1-008 - should reject an invalid postal code',
    {
      annotation: {
        type: 'known-limitation',
        description:
          'SauceDemo currently accepts non-numeric and special characters as a postal code.',
      },
    },
    async ({ page }) => {
      await checkoutInformationPage.fillCustomerInformation(
        checkoutCustomer.invalidPostalCode.firstName,
        checkoutCustomer.invalidPostalCode.lastName,
        checkoutCustomer.invalidPostalCode.postalCode,
      );

      await expect(checkoutInformationPage.firstNameInput).toHaveValue(
        checkoutCustomer.invalidPostalCode.firstName,
      );

      await expect(checkoutInformationPage.lastNameInput).toHaveValue(
        checkoutCustomer.invalidPostalCode.lastName,
      );

      await expect(checkoutInformationPage.postalCodeInput).toHaveValue(
        checkoutCustomer.invalidPostalCode.postalCode,
      );

      await checkoutInformationPage.continue();

      await expect(page).toHaveURL(/checkout-step-one\.html/);

      await expect(checkoutInformationPage.errorMessage).toBeVisible();
    },
  );
});
