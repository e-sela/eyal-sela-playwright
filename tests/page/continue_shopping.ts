import { Page } from '@playwright/test';

export class ContinueShopping {
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async clickContinueShopping() {
    const button = this.page.getByRole('button', { name: 'Continue shopping' });
    if (await button.isVisible()) {
      await button.click();
      console.log('Clicked "Continue shopping" button');
    } else {
      console.log('"Continue shopping" button not found — skipping');
    }
  }
}