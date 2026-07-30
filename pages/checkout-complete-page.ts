import { Locator, Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly confirmationHeader: Locator;
  readonly confirmationMessage: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.getByText('Checkout: Complete!', { exact: true });

    this.confirmationHeader = page.locator('[data-test="complete-header"]');

    this.confirmationMessage = page.locator('[data-test="complete-text"]');

    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async returnToInventory(): Promise<void> {
    await this.backHomeButton.click();
  }
}
