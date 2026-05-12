import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { CustomerPage } from '../pages/CustomerPage.js';

const { Given, When, Then } = createBdd();

// ✅ Added {} as the first argument
Given('I am on the Add New Customer page', async function ({}) {
  this.customerPage = new CustomerPage(this.page);
  await this.customerPage.goto();
});

// ✅ Added {} as the first argument, customerKey moves to the second slot
When('I fill in the customer details for {string}', async function ({}, customerKey) {
  const customer = this.customers[customerKey];
  if (!customer) {
    throw new Error(`Customer data not found for key: ${customerKey}`);
  }

  await this.customerPage.enterCustomerName(customer.name);
  await this.customerPage.selectGender(customer.gender);
  await this.customerPage.enterDOB(customer.dob);
  await this.customerPage.enterAddress(customer.address);
  await this.customerPage.enterCity(customer.city);
  await this.customerPage.enterState(customer.state);
  await this.customerPage.enterPIN(customer.pin);
  await this.customerPage.enterMobile(customer.mobile);
  await this.customerPage.enterEmail(customer.email);
  await this.customerPage.enterPassword(customer.password);
});

// ✅ Added {} as the first argument
When('I submit the customer form', async function ({}) {
  await this.customerPage.submitForm();
});

// ✅ Added {} as the first argument
Then('the customer should be added successfully', async function ({}) {
  const successMessage = this.page.locator('table tr td p.heading3');
  await expect(successMessage).toContainText('Customer Registered Successfully');
});