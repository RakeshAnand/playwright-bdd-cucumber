const { Before, After,AfterStep  } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser, context, page;

Before(async function () {
  browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized'] // start maximized
  });
  context = await browser.newContext({
    viewport: null // use full window size
  });
  page = await context.newPage();
  this.browser = browser;
  this.context = context;
  this.page = page;
});

After(async function () {
  await this.browser.close();
});

// Capture screenshot on failure
AfterStep(async function ({ result }) {
  if (result.status === 'failed') {
    const screenshotPath = path.join(
      'reports',
      'screenshots',
      `FAILED_${Date.now()}.png`
    );
    await this.page.screenshot({ path: screenshotPath });
  }
});
