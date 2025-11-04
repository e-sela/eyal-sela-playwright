import { expect, Page } from '@playwright/test';

export class AmazonTest {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // 1️⃣ Navigate to Amazon
  async navigateToAmazon() {
    await this.page.goto('https://www.amazon.com/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  // 2️⃣ Search for product
  async searchProduct(productName: string) {
    const searchBox = this.page.locator('#twotabsearchtextbox');
    await searchBox.fill(productName);
    await this.page.locator('#nav-search-submit-button').click();
    await this.page.waitForSelector('[data-component-type="s-search-result"]');
  }

  // 3️⃣ Click a random result
  async clickRandomProduct() {
    const results = this.page.locator('[data-component-type="s-search-result"] h2 a');
    const count = await results.count();
    if (count === 0) throw new Error('No search results found!');
    const randomIndex = Math.floor(Math.random() * count);
    console.log(`Clicking product index: ${randomIndex + 1}/${count}`);
    await results.nth(randomIndex).click();
    await this.page.waitForSelector('#availability');
  }

  // 4️⃣ Verify "In Stock" and green text
  async verifyInStockAndGreen() {
    const availability = this.page.locator('#availability span');
    const text = await availability.innerText();
    console.log('Availability text:', text);
    expect(text).toContain('In Stock');

    const color = await availability.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    console.log('Color:', color);
    expect(color).toBe('rgb(0, 128, 0)');
  }
}