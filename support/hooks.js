// steps/hooks.js
const { Before, After, AfterStep } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

Before(async function () {
  // Load customer data once per scenario
  const dataPath = path.join(__dirname, '../test-data/customers.json');
  this.customers = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  // Launch browser
  this.browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized'] // start maximized
  });

  this.context = await this.browser.newContext({
    viewport: null // use full window size
  });

  this.page = await this.context.newPage();
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

// Capture screenshot on failure
AfterStep(async function ({ result }) {
  if (result.status === 'failed') {
    const dir = path.join(process.cwd(), 'reports', 'screenshots');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const screenshotPath = path.join(
      dir,
      `FAILED_${Date.now()}.png`
    );
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved: ${screenshotPath}`);
  }
});
