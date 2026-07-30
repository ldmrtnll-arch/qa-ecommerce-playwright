import { Locator, Page } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly checkoutItems: Locator;
  readonly itemTotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.getByText('Checkout: Overview', {
      exact: true,
    });

    this.checkoutItems = page.locator('[data-test="inventory-item"]');
    this.itemTotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  getProductByName(productName: string): Locator {
    return this.checkoutItems.filter({
      has: this.page.getByText(productName, {
        exact: true,
      }),
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
  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }
  async finish(): Promise<void> {
    await this.finishButton.click();
  }
}
