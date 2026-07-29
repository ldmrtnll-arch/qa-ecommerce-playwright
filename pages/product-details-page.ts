import { Locator, Page } from '@playwright/test';

export class ProductDetailsPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly productImage: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly backToProductsButton: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productName = page.locator(
      '[data-test="inventory-item-name"]',
    );

    this.productDescription = page.locator(
      '[data-test="inventory-item-desc"]',
    );

    this.productPrice = page.locator(
      '[data-test="inventory-item-price"]',
    );

    this.productImage = page.locator(
      'img.inventory_details_img',
    );

    this.addToCartButton = page.getByRole('button', {
      name: 'Add to cart',
    });

    this.removeButton = page.getByRole('button', {
      name: 'Remove',
    });

    this.backToProductsButton = page.getByRole('button', {
      name: 'Back to products',
    });

    this.cartLink = page.locator(
      '[data-test="shopping-cart-link"]',
    );

    this.cartBadge = page.locator(
      '[data-test="shopping-cart-badge"]',
    );
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
