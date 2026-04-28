import { test } from '../fixtures/baseTest';

test.describe('Cart', () => {
  test.beforeEach(async ({ loginAsStandardUser }) => {
    await loginAsStandardUser();
  });

  test('should add item to cart @smoke', async ({ inventoryPage, cartPage }) => {
    await test.step('Add item from inventory page', async () => {
      await inventoryPage.addItemToCart('Sauce Labs Backpack');
      await inventoryPage.verifyCartBadgeCount('1');
    });

    await test.step('Open cart and verify item', async () => {
      await inventoryPage.openCart();
      await cartPage.verifyItemInCart('Sauce Labs Backpack');
    });
  });

  test('should remove item from cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.verifyItemInCart('Sauce Labs Backpack');

    await cartPage.removeItem('Sauce Labs Backpack');
    await cartPage.verifyItemNotInCart('Sauce Labs Backpack');
  });
});