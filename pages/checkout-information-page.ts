import { Locator, Page } from '@playwright/test';

export class CheckoutInformationPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.getByText(
      'Checkout: Your Information',
      { exact: true },
    );

    this.firstNameInput = page.locator(
      '[data-test="firstName"]',
    );

    this.lastNameInput = page.locator(
      '[data-test="lastName"]',
    );

    this.postalCodeInput = page.locator(
      '[data-test="postalCode"]',
    );

    this.continueButton = page.locator(
      '[data-test="continue"]',
    );

    this.cancelButton = page.locator(
      '[data-test="cancel"]',
    );

    this.errorMessage = page.locator(
      '[data-test="error"]',
    );
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName);
  }

  async fillPostalCode(postalCode: string): Promise<void> {
    await this.postalCodeInput.fill(postalCode);
  }

  async fillCustomerInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillPostalCode(postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }
}
