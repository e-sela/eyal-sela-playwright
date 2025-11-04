import { test } from '@playwright/test';
import { AmazonTest } from './amazon.po';

test('Amazon product availability test', async ({ page }) => {
  const amazon = new AmazonTest(page);

  await amazon.navigateToAmazon();
  await amazon.searchProduct('speed boats for kids');
  await amazon.clickRandomProduct();
  await amazon.verifyInStockAndGreen();
});
