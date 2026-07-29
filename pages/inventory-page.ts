import { Locator, Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly inventoryList: Locator;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  readonly menuButton: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByText("Products", { exact: true });
    this.inventoryList = page.locator('[data-test="inventory-list"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.menuButton = page.getByRole("button", {
      name: "Open Menu",
    });
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  getProductName(product: Locator): Locator {
    return product.locator('[data-test="inventory-item-name"]');
  }

  getProductDescription(product: Locator): Locator {
    return product.locator('[data-test="inventory-item-desc"]');
  }

  getProductPrice(product: Locator): Locator {
    return product.locator('[data-test="inventory-item-price"]');
  }

  getProductImage(product: Locator): Locator {
    return product.locator("img.inventory_item_img");
  }

  getAddToCartButton(product: Locator): Locator {
    return product.getByRole("button", { name: "Add to cart" });
  }

  getProductByName(productName: string): Locator {
    return this.inventoryItems.filter({
      has: this.page.getByText(productName, { exact: true }),
    });
  }

  async openProductDetails(productName: string): Promise<void> {
    const product = this.getProductByName(productName);

    await this.getProductName(product).click();
  }

  async sortBy(option: "az" | "za" | "lohi" | "hilo"): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return this.inventoryItems
      .locator('[data-test="inventory-item-name"]')
      .allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.inventoryItems
      .locator('[data-test="inventory-item-price"]')
      .allTextContents();

    return priceTexts.map((priceText) =>
      Number(priceText.replace("$", "").trim()),
    );
  }
}
