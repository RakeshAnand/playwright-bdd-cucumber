import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/baseTest.js'; // 1. Import your custom test fixture
import customers from '../data/customers.json' assert { type: 'json' }; // 2. Import your data

const { Given, When, Then } = createBdd(test); // 3. Pass 'test' to createBdd

Given('I am on the Add New Customer page', async ({ customerPage }) => {
  // Change "navigateToCustomerPage" to "goto"
  await customerPage.goto(); 
});

When('I fill in the customer details for {string}', async ({ customerPage }, customerKey) => {
  const customer = customers[customerKey];
  if (!customer) {
    throw new Error(`Customer data not found for key: ${customerKey}`);
  }

  // Use the injected customerPage fixture
  await customerPage.enterCustomerName(customer.name);
  await customerPage.selectGender(customer.gender);
  await customerPage.enterDOB(customer.dob);
  await customerPage.enterAddress(customer.address);
  await customerPage.enterCity(customer.city);
  await customerPage.enterState(customer.state);
  await customerPage.enterPIN(customer.pin);
  await customerPage.enterMobile(customer.mobile);
  await customerPage.enterEmail(customer.email);
  await customerPage.enterPassword(customer.password);
});

When('I submit the customer form', async ({ customerPage }) => {
  await customerPage.submitForm();
});

Then('the customer should be added successfully', async ({ page }) => {
  // Use 'page' fixture directly for assertions if needed
  const successMessage = page.locator('p.heading3');
  await expect(successMessage).toContainText('Customer Registered Successfully!!!');
});