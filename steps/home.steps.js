import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/baseTest.js'; // 1. IMPORT your custom test
import { expect } from '@playwright/test';

// 2. PASS your custom test to createBdd
const { Given, When, Then } = createBdd(test);

// 3. DESTRUCTURE the fixture { homePage } directly
When('I click on the {string} menu link', async ({ homePage }, linkText) => {
  // No need to create 'new HomePage' or use 'this'
  await homePage.clickMenuLinkByText(linkText);
});

Then('I should see all menu links listed', async ({ homePage }) => {
  const links = await homePage.getAllMenuLinks();
  console.log('Menu links:', links);

  // Assertion stays the same
  expect(links.length).toBeGreaterThan(0);
});