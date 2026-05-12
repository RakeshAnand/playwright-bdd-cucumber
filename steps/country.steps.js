import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { CountryPage } from '../pages/CountryPage.js';

const { Given, When, Then, Before } = createBdd(); 

// ✅ Added {} as the first argument
Before({ timeout: 60 * 1000 }, async function ({}) {
  // Scenario setup
});

// ✅ Added {} as the first argument
Given('I am on the GlobalSQA country dropdown page', async function ({}) {
  this.dropdownPage = new CountryPage(this.page);
  await this.dropdownPage.goto();
});

// ✅ Added {} as the first argument, countryName moves to the second slot
When('I select {string} from the country dropdown', async function ({}, countryName) {
  await this.dropdownPage.selectCountry(countryName);
});

// ✅ Added {} as the first argument, expectedCountry moves to the second slot
Then('the selected country should be {string}', async function ({}, expectedCountry) {
  const selected = await this.dropdownPage.getSelectedCountry();
  expect(selected).toBe(expectedCountry);
});