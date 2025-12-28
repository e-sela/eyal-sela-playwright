import { Page } from '@playwright/test';

export class MainShopping {
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

    async clickRandomProduct() {
        const results = this.page.locator('[role="listitem"] .s-image');
        const count = await results.count();
        if (count === 0) throw new Error('No search results found!');
        const randomIndex = Math.floor(Math.random() * 7);
        console.log(`Clicking product index: ${randomIndex}`);
        await results.nth(randomIndex).click();
    }

    async getavailabilityText(): Promise<string> {
        const availability = this.page.locator('#availability span');
        return await availability.innerText();
    }

    async getAvailabilityColor(): Promise<string> {
        const availability = this.page.locator('#availability span');
        const color = await availability.evaluate((el) => {
            return window.getComputedStyle(el).color;
        });
        return color;
    }
}