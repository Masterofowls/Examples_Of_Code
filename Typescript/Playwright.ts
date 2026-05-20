// Requires: npm i playwright
const { chromium } = require('playwright');

const main = async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://example.com');
  console.log('Title:', await page.title());

  await page.screenshot({ path: 'example.png', fullPage: true });
  console.log('Screenshot saved as example.png');

  await browser.close();
};

main().catch((error) => {
  console.error('Unexpected error:', error);
});
