import {
  expect,
  test,
} from "../../fixtures/authenticated-test";
import { InventoryPage } from "../../pages/inventory-page";
import { ProductDetailsPage } from "../../pages/product-details-page";
import { inventoryProducts } from "../../test-data/inventory-data";

test.describe("Product inventory", () => {
  let inventoryPage: InventoryPage;
  let productDetailsPage: ProductDetailsPage;

  test.beforeEach(async ({ authenticatedPage }) => {
    inventoryPage = new InventoryPage(authenticatedPage);
    productDetailsPage = new ProductDetailsPage(authenticatedPage);
  });

  test("TC-INV-001 - should display the complete product catalog", async ({
    page,
  }) => {
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.pageTitle).toBeVisible();
    await expect(inventoryPage.inventoryList).toBeVisible();
    await expect(inventoryPage.inventoryItems).toHaveCount(6);

    const productCount = await inventoryPage.inventoryItems.count();

    for (let index = 0; index < productCount; index += 1) {
      const product = inventoryPage.inventoryItems.nth(index);

      await expect(product).toBeVisible();

      await expect(
        inventoryPage.getProductName(product),
      ).not.toHaveText("");

      await expect(
        inventoryPage.getProductDescription(product),
      ).not.toHaveText("");

      await expect(
        inventoryPage.getProductPrice(product),
      ).toHaveText(/^\$\d+\.\d{2}$/);

      await expect(
        inventoryPage.getProductImage(product),
      ).toBeVisible();

      await expect(
        inventoryPage.getAddToCartButton(product),
      ).toBeVisible();
    }

    await expect(inventoryPage.sortDropdown).toBeVisible();
    await expect(inventoryPage.menuButton).toBeVisible();
    await expect(inventoryPage.cartLink).toBeVisible();
  });

  test("TC-INV-002 - should display consistent product details", async ({
    page,
  }) => {
    const productName = inventoryProducts.backpack.name;
    const product = inventoryPage.getProductByName(productName);

    await expect(product).toBeVisible();

    const catalogName = await inventoryPage
      .getProductName(product)
      .innerText();

    const catalogDescription = await inventoryPage
      .getProductDescription(product)
      .innerText();

    const catalogPrice = await inventoryPage
      .getProductPrice(product)
      .innerText();

    await inventoryPage.openProductDetails(productName);

    await expect(page).toHaveURL(
      /inventory-item\.html\?id=\d+/,
    );

    await expect(
      productDetailsPage.productName,
    ).toHaveText(catalogName);

    await expect(
      productDetailsPage.productDescription,
    ).toHaveText(catalogDescription);

    await expect(
      productDetailsPage.productPrice,
    ).toHaveText(catalogPrice);

    await expect(
      productDetailsPage.productImage,
    ).toBeVisible();

    await expect(
      productDetailsPage.addToCartButton,
    ).toBeVisible();

    await expect(
      productDetailsPage.backToProductsButton,
    ).toBeVisible();
  });

  test(
    "TC-INV-003 - should sort products by name from A to Z",
    async () => {
      await inventoryPage.sortBy("za");

      const descendingProductNames =
        await inventoryPage.getProductNames();

      const expectedDescendingOrder = [
        ...descendingProductNames,
      ].sort((firstName, secondName) =>
        secondName.localeCompare(firstName),
      );

      expect(descendingProductNames).toEqual(
        expectedDescendingOrder,
      );

      await inventoryPage.sortBy("az");

      await expect(
        inventoryPage.sortDropdown,
      ).toHaveValue("az");

      const ascendingProductNames =
        await inventoryPage.getProductNames();

      const expectedAscendingOrder = [
        ...ascendingProductNames,
      ].sort((firstName, secondName) =>
        firstName.localeCompare(secondName),
      );

      expect(ascendingProductNames).toEqual(
        expectedAscendingOrder,
      );
    },
  );

  test(
    "TC-INV-004 - should sort products by name from Z to A",
    async () => {
      await inventoryPage.sortBy("az");

      const ascendingProductNames =
        await inventoryPage.getProductNames();

      const expectedAscendingOrder = [
        ...ascendingProductNames,
      ].sort((firstName, secondName) =>
        firstName.localeCompare(secondName),
      );

      expect(ascendingProductNames).toEqual(
        expectedAscendingOrder,
      );

      await inventoryPage.sortBy("za");

      await expect(
        inventoryPage.sortDropdown,
      ).toHaveValue("za");

      const descendingProductNames =
        await inventoryPage.getProductNames();

      const expectedDescendingOrder = [
        ...descendingProductNames,
      ].sort((firstName, secondName) =>
        secondName.localeCompare(firstName),
      );

      expect(descendingProductNames).toEqual(
        expectedDescendingOrder,
      );
    },
  );

  test(
    "TC-INV-005 - should sort products by price from low to high",
    async () => {
      await inventoryPage.sortBy("hilo");

      const descendingPrices =
        await inventoryPage.getProductPrices();

      const expectedDescendingOrder = [
        ...descendingPrices,
      ].sort(
        (firstPrice, secondPrice) =>
          secondPrice - firstPrice,
      );

      expect(descendingPrices).toEqual(
        expectedDescendingOrder,
      );

      await inventoryPage.sortBy("lohi");

      await expect(
        inventoryPage.sortDropdown,
      ).toHaveValue("lohi");

      const ascendingPrices =
        await inventoryPage.getProductPrices();

      const expectedAscendingOrder = [
        ...ascendingPrices,
      ].sort(
        (firstPrice, secondPrice) =>
          firstPrice - secondPrice,
      );

      expect(ascendingPrices).toEqual(
        expectedAscendingOrder,
      );
    },
  );

  test(
    "TC-INV-006 - should sort products by price from high to low",
    async () => {
      await inventoryPage.sortBy("lohi");

      const ascendingPrices =
        await inventoryPage.getProductPrices();

      const expectedAscendingOrder = [
        ...ascendingPrices,
      ].sort(
        (firstPrice, secondPrice) =>
          firstPrice - secondPrice,
      );

      expect(ascendingPrices).toEqual(
        expectedAscendingOrder,
      );

      await inventoryPage.sortBy("hilo");

      await expect(
        inventoryPage.sortDropdown,
      ).toHaveValue("hilo");

      const descendingPrices =
        await inventoryPage.getProductPrices();

      const expectedDescendingOrder = [
        ...descendingPrices,
      ].sort(
        (firstPrice, secondPrice) =>
          secondPrice - firstPrice,
      );

      expect(descendingPrices).toEqual(
        expectedDescendingOrder,
      );
    },
  );
});