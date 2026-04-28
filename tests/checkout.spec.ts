import { test } from '../fixtures/baseTest';
import { checkoutData } from '../test-data/checkoutData';

test.describe('Checkout', () => {
  test.beforeEach(async ({ loginAsStandardUser, inventoryPage }) => {
    await loginAsStandardUser();
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
  });

  test('should complete checkout successfully @smoke', async ({ cartPage, checkoutPage }) => {
    await test.step('Open checkout form', async () => {
      await cartPage.clickCheckout();
    });

    await test.step('Fill checkout information', async () => {
      await checkoutPage.fillCheckoutInfo(
        checkoutData.validUser.firstName,
        checkoutData.validUser.lastName,
        checkoutData.validUser.postalCode,
      );
      await checkoutPage.continue();
    });

    await test.step('Finish order and verify success', async () => {
      await checkoutPage.finish();
      await checkoutPage.verifyOrderSuccess();
    });
  });

  test('should show validation error when checkout info is missing', async ({
    cartPage,
    checkoutPage,
  }) => {
    await cartPage.clickCheckout();
    await checkoutPage.continue();
    await checkoutPage.verifyErrorContains('First Name is required');
  });
});