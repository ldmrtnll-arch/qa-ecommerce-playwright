import {
  expect,
  test,
} from "../../fixtures/authenticated-test";
import { CartPage } from "../../pages/cart-page";
import { InventoryPage } from "../../pages/inventory-page";
import { ProductDetailsPage } from "../../pages/product-details-page";
import { inventoryProducts } from "../../test-data/inventory-data";

test.describe("Shopping cart", () => {
  let cartPage: CartPage;
  let inventoryPage: InventoryPage;
  let productDetailsPage: ProductDetailsPage;

  test.beforeEach(async ({ authenticatedPage }) => {
    cartPage = new CartPage(authenticatedPage);
    inventoryPage = new InventoryPage(authenticatedPage);
    productDetailsPage = new ProductDetailsPage(authenticatedPage);
  });

  test("TC-CAR-001 - should add one product to the cart from the inventory page", async ({
    page,
  }) => {
    const productName = inventoryProducts.backpack.name;

    await inventoryPage.addProductToCart(productName);

    await expect(inventoryPage.cartBadge).toHaveText("1");

    const inventoryProduct =
      inventoryPage.getProductByName(productName);

    await expect(
      inventoryPage.getAddToCartButton(inventoryProduct),
    ).not.toBeVisible();

    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.pageTitle).toBeVisible();
    await expect(cartPage.cartList).toBeVisible();
    await expect(cartPage.cartItems).toHaveCount(1);

    const cartProduct = cartPage.getProductByName(productName);

    await expect(cartProduct).toBeVisible();

    await expect(
      cartPage.getProductName(cartProduct),
    ).toHaveText(productName);

    await expect(
      cartPage.getProductQuantity(cartProduct),
    ).toHaveText("1");
  });

  test("TC-CAR-002 - should add two different products to the cart", async ({
    page,
  }) => {
    const firstProductName =
      inventoryProducts.backpack.name;

    const secondProductName =
      inventoryProducts.bikeLight.name;

    await inventoryPage.addProductToCart(firstProductName);
    await inventoryPage.addProductToCart(secondProductName);

    await expect(inventoryPage.cartBadge).toHaveText("2");

    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.pageTitle).toBeVisible();
    await expect(cartPage.cartItems).toHaveCount(2);

    const firstCartProduct =
      cartPage.getProductByName(firstProductName);

    const secondCartProduct =
      cartPage.getProductByName(secondProductName);

    await expect(firstCartProduct).toBeVisible();
    await expect(secondCartProduct).toBeVisible();

    await expect(
      cartPage.getProductName(firstCartProduct),
    ).toHaveText(firstProductName);

    await expect(
      cartPage.getProductName(secondCartProduct),
    ).toHaveText(secondProductName);

    await expect(
      cartPage.getProductQuantity(firstCartProduct),
    ).toHaveText("1");

    await expect(
      cartPage.getProductQuantity(secondCartProduct),
    ).toHaveText("1");
  });

  test("TC-CAR-003 - should add a product to the cart from the product details page", async ({
    page,
  }) => {
    const productName = inventoryProducts.backpack.name;

    await inventoryPage.openProductDetails(productName);

    await expect(page).toHaveURL(
      /inventory-item\.html\?id=\d+/,
    );

    await expect(
      productDetailsPage.productName,
    ).toHaveText(productName);

    await productDetailsPage.addToCart();

    await expect(
      productDetailsPage.cartBadge,
    ).toHaveText("1");

    await expect(
      page.getByRole("button", { name: "Remove" }),
    ).toBeVisible();

    await productDetailsPage.openCart();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.cartItems).toHaveCount(1);

    const cartProduct = cartPage.getProductByName(productName);

    await expect(cartProduct).toBeVisible();

    await expect(
      cartPage.getProductName(cartProduct),
    ).toHaveText(productName);

    await expect(
      cartPage.getProductQuantity(cartProduct),
    ).toHaveText("1");
  });

  test("TC-CAR-004 - should remove a product from the cart through the inventory page", async ({
    page,
  }) => {
    const productName = inventoryProducts.backpack.name;

    const inventoryProduct =
      inventoryPage.getProductByName(productName);

    await inventoryPage.addProductToCart(productName);

    await expect(inventoryPage.cartBadge).toHaveText("1");

    await expect(
      inventoryPage.getRemoveButton(inventoryProduct),
    ).toBeVisible();

    await inventoryPage.removeProductFromCart(productName);

    await expect(inventoryPage.cartBadge).not.toBeVisible();

    await expect(
      inventoryPage.getAddToCartButton(inventoryProduct),
    ).toBeVisible();

    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.pageTitle).toBeVisible();
    await expect(cartPage.cartItems).toHaveCount(0);
  });

  test("TC-CAR-005 - should remove a product from the cart page", async ({
    page,
  }) => {
    const firstProductName =
      inventoryProducts.backpack.name;

    const secondProductName =
      inventoryProducts.bikeLight.name;

    await inventoryPage.addProductToCart(firstProductName);
    await inventoryPage.addProductToCart(secondProductName);

    await expect(inventoryPage.cartBadge).toHaveText("2");

    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.cartItems).toHaveCount(2);

    const firstCartProduct =
      cartPage.getProductByName(firstProductName);

    const secondCartProduct =
      cartPage.getProductByName(secondProductName);

    await expect(firstCartProduct).toBeVisible();
    await expect(secondCartProduct).toBeVisible();

    await cartPage.removeProduct(firstProductName);

    await expect(firstCartProduct).not.toBeVisible();
    await expect(secondCartProduct).toBeVisible();

    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(inventoryPage.cartBadge).toHaveText("1");

    await expect(
      cartPage.getProductQuantity(secondCartProduct),
    ).toHaveText("1");
  });

  test("TC-CAR-006 - should continue shopping without losing cart items", async ({
    page,
  }) => {
    const productName = inventoryProducts.backpack.name;

    await inventoryPage.addProductToCart(productName);

    await expect(inventoryPage.cartBadge).toHaveText("1");

    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.cartItems).toHaveCount(1);

    const cartProduct = cartPage.getProductByName(productName);

    await expect(cartProduct).toBeVisible();

    await cartPage.continueShopping();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.pageTitle).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText("1");

    const inventoryProduct =
      inventoryPage.getProductByName(productName);

    await expect(
      inventoryPage.getRemoveButton(inventoryProduct),
    ).toBeVisible();

    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.cartItems).toHaveCount(1);

    await expect(
      cartPage.getProductByName(productName),
    ).toBeVisible();
  });

  test("TC-CAR-007 - should display consistent product data between inventory and cart", async ({
    page,
  }) => {
    const productName = inventoryProducts.backpack.name;

    const inventoryProduct =
      inventoryPage.getProductByName(productName);

    await expect(inventoryProduct).toBeVisible();

    const inventoryProductName = await inventoryPage
      .getProductName(inventoryProduct)
      .innerText();

    const inventoryProductDescription = await inventoryPage
      .getProductDescription(inventoryProduct)
      .innerText();

    const inventoryProductPrice = await inventoryPage
      .getProductPrice(inventoryProduct)
      .innerText();

    await inventoryPage.addProductToCart(productName);

    await expect(inventoryPage.cartBadge).toHaveText("1");

    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.cartItems).toHaveCount(1);

    const cartProduct = cartPage.getProductByName(productName);

    await expect(cartProduct).toBeVisible();

    await expect(
      cartPage.getProductName(cartProduct),
    ).toHaveText(inventoryProductName);

    await expect(
      cartPage.getProductDescription(cartProduct),
    ).toHaveText(inventoryProductDescription);

    await expect(
      cartPage.getProductPrice(cartProduct),
    ).toHaveText(inventoryProductPrice);

    await expect(
      cartPage.getProductQuantity(cartProduct),
    ).toHaveText("1");
  });

  test("TC-CAR-008 - should prevent the same product from being added twice", async ({
    page,
  }) => {
    const productName = inventoryProducts.backpack.name;

    await inventoryPage.addProductToCart(productName);

    await expect(inventoryPage.cartBadge).toHaveText("1");

    const inventoryProduct =
      inventoryPage.getProductByName(productName);

    await expect(
      inventoryPage.getRemoveButton(inventoryProduct),
    ).toBeVisible();

    await inventoryPage.openProductDetails(productName);

    await expect(page).toHaveURL(
      /inventory-item\.html\?id=\d+/,
    );

    await expect(
      productDetailsPage.productName,
    ).toHaveText(productName);

    await expect(
      productDetailsPage.addToCartButton,
    ).not.toBeVisible();

    await expect(
      productDetailsPage.removeButton,
    ).toBeVisible();

    await expect(
      productDetailsPage.cartBadge,
    ).toHaveText("1");

    await productDetailsPage.openCart();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.cartItems).toHaveCount(1);

    const cartProduct = cartPage.getProductByName(productName);

    await expect(cartProduct).toBeVisible();

    await expect(
      cartPage.getProductQuantity(cartProduct),
    ).toHaveText("1");
  });

  test("TC-CAR-009 - should prevent checkout with an empty cart", async ({
    page,
  }) => {
    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.pageTitle).toBeVisible();
    await expect(cartPage.cartItems).toHaveCount(0);
    await expect(inventoryPage.cartBadge).toBeHidden();

    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(
      /(cart|checkout-step-one)\.html/,
    );

    const checkoutWasBlocked = /cart\.html/.test(page.url());

    if (!checkoutWasBlocked) {
      test.info().annotations.push({
        type: "known-defect",
        description:
          "SauceDemo allows users to start checkout when the shopping cart is empty.",
      });
    }

    test.fail(
      !checkoutWasBlocked,
      "Known defect: SauceDemo allows users to start checkout when the shopping cart is empty.",
    );

    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.pageTitle).toBeVisible();
    await expect(cartPage.cartItems).toHaveCount(0);
  });
});