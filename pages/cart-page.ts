import { Locator, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartList: Locator;
  readonly cartItems: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByText("Your Cart", { exact: true });
    this.cartList = page.locator('[data-test="cart-list"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');

    this.continueShoppingButton = page.getByRole("button", {
      name: "Continue Shopping",
    });

    this.checkoutButton = page.getByRole("button", {
      name: "Checkout",
    });
  }

  getProductByName(productName: string): Locator {
    return this.cartItems.filter({
      has: this.page.getByText(productName, { exact: true }),
    });
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

  getProductQuantity(product: Locator): Locator {
    return product.locator('[data-test="item-quantity"]');
  }

  getRemoveButton(product: Locator): Locator {
    return product.getByRole("button", { name: "Remove" });
  }

  async removeProduct(productName: string): Promise<void> {
    const product = this.getProductByName(productName);

    await this.getRemoveButton(product).click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
