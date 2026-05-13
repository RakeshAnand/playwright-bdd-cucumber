import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/baseTest.js';
import { expect } from '@playwright/test';
import path from 'path';

const { Given, When, Then } = createBdd(test);

Given('I navigate to the login page', async ({ loginPage }) => {
  await loginPage.navigateToLogin();
});

When('I enter valid credentials', async ({ loginPage }) => {
  // Ensure process.env variables are loaded in playwright.config.js
  await loginPage.login(process.env.LOGIN_USERNAME, process.env.PASSWORD);
});

Then('I should see the dashboard', async ({ homePage }) => {
  // ✅ IMPROVEMENT: Use Web-First Assertions
  // Instead of getting text then asserting, assert on the locator directly.
  // This adds automatic retries until the text appears.
  await expect(homePage.dashboardMarquee).toContainText('Welcome');
});

When('I take a screenshot of the dashboard', async ({ page }) => {
  // ✅ IMPROVEMENT: Playwright automatically creates missing directories
  // You don't need 'fs' to check or create the folder.
  const screenshotPath = path.join('playwright-report', 'screenshots', `dashboard-${Date.now()}.png`);
  
  await page.screenshot({ 
    path: screenshotPath, 
    fullPage: true 
  });
  
  console.log(`Screenshot saved: ${screenshotPath}`);
});