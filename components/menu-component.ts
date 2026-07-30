import { Locator, Page } from '@playwright/test';

export class MenuComponent {
  readonly page: Page;
  readonly openMenuButton: Locator;
  readonly closeMenuButton: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.openMenuButton = page.getByRole('button', {
      name: 'Open Menu',
    });

    this.closeMenuButton = page.getByRole('button', {
      name: 'Close Menu',
    });

    this.allItemsLink = page.getByRole('link', {
      name: 'All Items',
    });

    this.aboutLink = page.getByRole('link', {
      name: 'About',
    });

    this.logoutLink = page.getByRole('link', {
      name: 'Logout',
    });
  }

  async open(): Promise<void> {
    await this.openMenuButton.click();
  }

  async close(): Promise<void> {
    await this.closeMenuButton.click();
  }

  async goToAllItems(): Promise<void> {
    await this.allItemsLink.click();
  }

  async openAbout(): Promise<void> {
    await this.aboutLink.click();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }
}
