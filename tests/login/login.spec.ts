import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import {
  loginErrorMessages,
  loginUsers,
} from '../../test-data/login-data';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC-LOG-001 - should log in with valid credentials', async ({
    page,
  }) => {
    await loginPage.login(
      loginUsers.standard.username,
      loginUsers.standard.password,
    );

    await expect(page).toHaveURL(/inventory\.html/);

    await expect(
      page.getByText('Products', { exact: true }),
    ).toBeVisible();

    await expect(
      page.locator('[data-test="inventory-list"]'),
    ).toBeVisible();
  });

  test('TC-LOG-002 - should prevent login with an invalid username', async ({
    page,
  }) => {
    await loginPage.login(
      loginUsers.invalidUsername.username,
      loginUsers.invalidUsername.password,
    );

    await expect(page).not.toHaveURL(/inventory\.html/);

    await expect(loginPage.errorMessage).toHaveText(
      loginErrorMessages.invalidCredentials,
    );

    await expect(loginPage.loginButton).toBeVisible();
  });

  test('TC-LOG-003 - should prevent login with an invalid password', async ({
    page,
  }) => {
    await loginPage.login(
      loginUsers.invalidPassword.username,
      loginUsers.invalidPassword.password,
    );

    await expect(page).not.toHaveURL(/inventory\.html/);

    await expect(loginPage.errorMessage).toHaveText(
      loginErrorMessages.invalidCredentials,
    );

    await expect(loginPage.loginButton).toBeVisible();
  });

  test('TC-LOG-004 - should require the username field', async ({
    page,
  }) => {
    await loginPage.fillPassword(loginUsers.standard.password);
    await loginPage.submit();

    await expect(page).not.toHaveURL(/inventory\.html/);

    await expect(loginPage.errorMessage).toHaveText(
      loginErrorMessages.usernameRequired,
    );

    await expect(loginPage.usernameInput).toBeVisible();
  });

  test('TC-LOG-005 - should require the password field', async ({
    page,
  }) => {
    await loginPage.fillUsername(loginUsers.standard.username);
    await loginPage.submit();

    await expect(page).not.toHaveURL(/inventory\.html/);

    await expect(loginPage.errorMessage).toHaveText(
      loginErrorMessages.passwordRequired,
    );

    await expect(loginPage.passwordInput).toBeVisible();
  });

  test('TC-LOG-006 - should prevent login when both fields are empty', async ({
    page,
  }) => {
    await loginPage.submit();

    await expect(page).not.toHaveURL(/inventory\.html/);

    await expect(loginPage.errorMessage).toHaveText(
      loginErrorMessages.usernameRequired,
    );

    await expect(loginPage.usernameInput).toHaveValue('');
    await expect(loginPage.passwordInput).toHaveValue('');
  });

  test('TC-LOG-007 - should prevent a locked-out user from logging in', async ({
    page,
  }) => {
    await loginPage.login(
      loginUsers.lockedOut.username,
      loginUsers.lockedOut.password,
    );

    await expect(page).not.toHaveURL(/inventory\.html/);

    await expect(loginPage.errorMessage).toHaveText(
      loginErrorMessages.lockedOut,
    );

    await expect(loginPage.loginButton).toBeVisible();
  });
});