import { Locator, Page } from '@playwright/test';

export class ProductDetailsPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly productImage: Locator;
  readonly addToCartButton: Locator;
  readonly backToProductsButton: Locator;

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
    this.backToProductsButton = page.getByRole('button', {
      name: 'Back to products',
    });
  }
}