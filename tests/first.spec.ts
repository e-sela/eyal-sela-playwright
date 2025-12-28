import { test } from '@playwright/test';
import { AmazonTest } from './amazon.po';


test.describe('Amazon search flows', () => {
  let amazon: AmazonTest;
  const toSearch: string = 'speed boats for kids';

  test.beforeEach(async ({ page }) => {
    amazon = new AmazonTest(page);
  });

  test('Amazon product availability test', async () => {
    await amazon.navigateToAmazon();
    await amazon.searchProduct(toSearch);
    await amazon.clickRandomProduct();
    await amazon.verifyInStockAndGreen();
  });

  test('Amazon product price test', async () => {
    await amazon.navigateToAmazon();
    await amazon.searchProduct(toSearch);
    await  amazon.verifyAgeRange();
  });

  test('Amazon cart count is zero after search', async () => {
    await amazon.navigateToAmazon();
    await amazon.searchProduct(toSearch);
    await amazon.verifyCartIsZero();
  });

});

