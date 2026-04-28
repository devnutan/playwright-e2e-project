import { test } from '../fixtures/baseTest';
import { users } from '../test-data/users';

test.describe('Login', () => {
  test('should login with valid credentials @smoke', async ({ loginPage, inventoryPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.goto();
      await loginPage.verifyLoginPageLoaded();
    });

    await test.step('Login with standard user', async () => {
      await loginPage.login(users.standard.username, users.standard.password);
    });

    await test.step('Verify inventory page is displayed', async () => {
      await inventoryPage.verifyInventoryPageLoaded();
    });
  });

  test('should show error for invalid credentials', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.goto();
    });

    await test.step('Attempt login with invalid credentials', async () => {
      await loginPage.login(users.invalid.username, users.invalid.password);
    });

    await test.step('Verify error message', async () => {
      await loginPage.verifyErrorMessageContains('Username and password do not match');
    });
  });

  test('should show error for locked out user', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await loginPage.verifyErrorMessageContains('Sorry, this user has been locked out');
  });
});