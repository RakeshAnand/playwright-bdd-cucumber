import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/baseTest.js'; 
import { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const { Given, When, Then } = createBdd(test);

Given('I navigate to the login page', async ({ loginPage }) => {
  await loginPage.navigateToLogin();
});

// If your Gherkin step has parameters (like {string}), 
// remember they come AFTER the fixtures object.
When('I enter valid credentials', async ({ loginPage }) => {
  await loginPage.login(process.env.LOGIN_USERNAME, process.env.PASSWORD);
});

Then('I should see the dashboard', async ({ homePage }) => {
  const marqueeText = await homePage.getDashboardText();
  
  // ✅ Fixed Playwright assertion syntax
  expect(marqueeText).toContain('Welcome');
});

When('I take a screenshot of the dashboard', async ({ page }) => {
  const dir = path.join(process.cwd(), 'playwright-report', 'screenshots');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const filePath = path.join(dir, `dashboard-${Date.now()}.png`);
  await page.screenshot({ path: filePath, fullPage: true });
  
  console.log(`Screenshot saved: ${filePath}`);
});