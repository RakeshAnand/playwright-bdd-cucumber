import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js'; // Ensure the import exists

const { Given, When, Then } = createBdd();

// ✅ Add {} as the first argument to capture fixtures
When('I click on the {string} menu link', async function ({}, linkText) {
  this.homePage = new HomePage(this.page);   
  await this.homePage.clickMenuLinkByText(linkText);
});

// ✅ Add {} as the first argument
Then('I should see all menu links listed', async function ({}) {
  this.homePage = new HomePage(this.page);   
  const links = await this.homePage.getAllMenuLinks();
  console.log('Menu links:', links);

  // ✅ Fixed assertion syntax for Playwright expect
  expect(links.length).toBeGreaterThan(0);
});