import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;
  readonly sortDropdown: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.locator('.inventory_container');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
  }

  addToCartButton(itemName: string): Locator {
    return this.page
      .locator('.inventory_item')
      .filter({
        has: this.page.locator('.inventory_item_name', { hasText: itemName }),
      })
      .locator('button');
  }

  async verifyInventoryPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.inventoryContainer).toBeVisible();
  }

  async verifyInventoryItemCount(expectedCount: number): Promise<void> {
    await expect(this.inventoryItems).toHaveCount(expectedCount);
  }

  async addItemToCart(itemName: string): Promise<void> {
    await this.addToCartButton(itemName).click();
  }

  async openCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  async verifyCartBadgeCount(count: string): Promise<void> {
    await expect(this.shoppingCartBadge).toHaveText(count);
  }

  async sortProducts(optionValue: string): Promise<void> {
    await this.sortDropdown.selectOption(optionValue);
  }

  async getAllItemPrices(): Promise<number[]> {
    const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
    return priceTexts.map((price) => Number(price.replace('$', '')));
  }
}