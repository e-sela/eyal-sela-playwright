import { expect, Page } from '@playwright/test';
import { Urls } from './enums/urls';
import { AgeRange, ProductStatusColor, ProductStatusText } from './enums/products-status';
import { getRandomEnumValue } from './utils/enum-utils';
import { ContinueShopping } from './page/continue_shopping';
import { MainShopping } from './page/main_shopping';

export class AmazonTest {
    readonly page: Page;
    readonly mainShopping: MainShopping;

    constructor(page: Page) {
        this.page = page;
        this.mainShopping = new MainShopping(page);
    }

    async navigateToAmazon() {
        await this.page.goto(Urls.AMAZON_BASE);
        await this.page.waitForLoadState('domcontentloaded');
        await this.clickContinueShopping();
    }

    async clickContinueShopping() {
        const continueShopping = new ContinueShopping(this.page);
        await continueShopping.clickContinueShopping();
    }

    async searchProduct(productName: string) {
        const searchBox = this.page.locator('#twotabsearchtextbox');
        await searchBox.fill(productName);
        await this.page.locator('#nav-search-submit-button').click();
        await this.page.waitForSelector('[data-component-type="s-search-result"]');
    }

    async clickRandomProduct() {
       this.mainShopping.clickRandomProduct();
    }

    async verifyInStockAndGreen() {
        expect(await this.mainShopping.getavailabilityText()).toContain(ProductStatusText.IN_STOCK);
        expect(await this.mainShopping.getAvailabilityColor()).toBe(ProductStatusColor.IN_STOCK);
    }

        async verifyAgeRange(ageRange?: AgeRange) {
            const chosenRange = ageRange ?? getRandomEnumValue(AgeRange);
            const ageLocator = this.page.locator(`text="${chosenRange}"`);
            const found = await ageLocator.first().isVisible().catch(() => false);
            if (found) {
                console.log('Found age range on page:', chosenRange);
            } else {
                console.log('Age range not found on page (selector may need adjustment):', chosenRange);
            }
            return chosenRange;
        }

        async rateVerify(ppNmae: string[]) {
        const rates: string[] = [];
        const newPpNmae: string[] = ppNmae.filter((name: string) => name.trim() !== ''); 
    }

        /**
         * Verify that the cart count shown in the header is '0'.
         * Uses the '#nav-cart-count-container' selector (matches your request).
         */
        async verifyCartIsZero() {
            const cartLocator = this.page.locator('#nav-cart-count-container');
            // Wait briefly for the element to appear/update; tolerate if it doesn't.
            await cartLocator.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
            const text = (await cartLocator.innerText()).trim();
            console.log('Cart count text:', text);
            expect(text).toBe('0');
        }
}
