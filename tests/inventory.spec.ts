import { test, expect } from '../fixtures/baseTest';
import { sortNumbersAscending } from '../utils/testHelpers';

test.describe('Inventory', () => {
  test.beforeEach(async ({ loginAsStandardUser }) => {
    await loginAsStandardUser();
  });

  test('should load inventory page successfully @smoke', async ({ inventoryPage }) => {
    await inventoryPage.verifyInventoryPageLoaded();
    await inventoryPage.verifyInventoryItemCount(6);
  });

  test('should sort prices low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortProducts('lohi');

    const prices = await inventoryPage.getAllItemPrices();
    const expectedPrices = sortNumbersAscending(prices);

    expect(prices).toEqual(expectedPrices);
  });
});