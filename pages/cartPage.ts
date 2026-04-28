import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  cartItemByName(itemName: string): Locator {
    return this.page.locator('.inventory_item_name', { hasText: itemName });
  }

  removeButton(itemName: string): Locator {
    return this.page
      .locator('.cart_item')
      .filter({
        has: this.page.locator('.inventory_item_name', { hasText: itemName }),
      })
      .locator('button');
  }

  async verifyItemInCart(itemName: string): Promise<void> {
    await expect(this.cartItemByName(itemName)).toBeVisible();
  }

  async removeItem(itemName: string): Promise<void> {
    await this.removeButton(itemName).click();
  }

  async verifyItemNotInCart(itemName: string): Promise<void> {
    await expect(this.cartItemByName(itemName)).toHaveCount(0);
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}