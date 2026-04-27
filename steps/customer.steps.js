// customer.steps.js
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const { CustomerPage } = require('../pages/CustomerPage');

// Use customers loaded in hooks.js
// (hooks.js should set this.customers = JSON.parse(...))

Given('I am on the Add New Customer page', async function () {
  this.customerPage = new CustomerPage(this.page);
  await this.customerPage.goto();
});

When('I fill in the customer details for {string}', async function (customerKey) {
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

When('I submit the customer form', async function () {
  await this.customerPage.submitForm();
});

Then('the customer should be added successfully', async function () {
  const successText = await this.page.textContent('table tr td p.heading3');
  expect(successText).to.include('Customer Registered Successfully');
});
