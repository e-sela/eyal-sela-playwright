import { expect, Page } from '@playwright/test';
import { Urls } from './enums/urls';
import { ProductStatusColor, ProductStatusText } from './enums/products-status';

export class AmazonTest {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToAmazon() {
        await this.page.goto(Urls.AMAZON_BASE);
        await this.page.waitForLoadState('domcontentloaded');
        await this.clickContinueShopping();
    }

    async clickContinueShopping() {
        const button = this.page.getByRole('button', { name: 'Continue shopping' });
        if (await button.isVisible()) {
            await button.click();
            console.log('✅ Clicked "Continue shopping" button');
        } else {
            console.log('ℹ️ "Continue shopping" button not found — skipping');
        }
    }

    async searchProduct(productName: string) {
        const searchBox = this.page.locator('#twotabsearchtextbox');
        await searchBox.fill(productName);
        await this.page.locator('#nav-search-submit-button').click();
        await this.page.waitForSelector('[data-component-type="s-search-result"]');
    }

    async clickRandomProduct() {
        const results = this.page.locator('[role="listitem"] .s-image');
        const count = await results.count();
        if (count === 0) throw new Error('No search results found!');
        const randomIndex = Math.min(0, 10);
        console.log(`Clicking product index: ${randomIndex}`);
        await results.nth(randomIndex).click();
        await this.page.waitForSelector('#availability');
    }

    async verifyInStockAndGreen() {
        const availability = this.page.locator('#availability span');
        const text = await availability.innerText();
        console.log('Availability text:', text);
        expect(text).toContain(ProductStatusText.IN_STOCK);

        const color = await availability.evaluate((el) => {
            return window.getComputedStyle(el).color;
        });
        console.log('Color:', color);
        expect(color).toBe(ProductStatusColor.IN_STOCK);
    }
}
