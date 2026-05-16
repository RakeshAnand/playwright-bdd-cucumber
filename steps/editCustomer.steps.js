// steps/editCustomer.steps.js
import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/baseTest.js';
import { expect } from '@playwright/test';
import { EditCustomerPage } from '../pages/EditCustomerPage.js';

// Direct JSON import (Node 22+ supports this)
import customersData from '../test-data/customers.json' assert { type: 'json' };

const { Given, When, Then } = createBdd(test);

Given('I navigate to the Edit Customer page', async ({ page }) => {
  const editCustomerPage = new EditCustomerPage(page);
  await editCustomerPage.goto();
});

When('I am on the Edit Customer page', async ({ page }) => {
  const editCustomerPage = new EditCustomerPage(page);
  await editCustomerPage.goto();
});

When('I enter Customer ID {string} and submit the form', async ({ page }, customerId) => {
  const editCustomerPage = new EditCustomerPage(page);
  await editCustomerPage.enterCustomerId(customerId);
  await editCustomerPage.submitForm();   // ✅ click the submit button
});

When('I print the customer details', async ({ page }) => {
  // 1. Remove 'this.' and pass 'page' directly into the constructor
  const editCustomerPage = new EditCustomerPage(page);
  
  // 2. Call your method on the local variable
  const details = await editCustomerPage.getCustomerDetails();

  console.log('--- Customer Details ---');
  console.log(`Name: ${details.name}`);
  console.log(`Gender: ${details.gender}`);
  console.log(`DOB: ${details.dob}`);
  console.log(`Address: ${details.address}`);
  console.log(`City: ${details.city}`);
  console.log(`State: ${details.state}`);
  console.log(`PIN: ${details.pin}`);
  console.log(`Mobile: ${details.mobile}`);
  console.log(`Email: ${details.email}`);
  console.log('------------------------');});

Then('the customer details should match the expected data for {string}', async ({ page }, customerKey) => {
  const expected = customersData[customerKey];
  const editCustomerPage = new EditCustomerPage(page);

  const actual = await editCustomerPage.getCustomerDetails();
  expect(actual).toEqual(expected);
});
