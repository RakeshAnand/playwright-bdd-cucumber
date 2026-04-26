const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const HomePage = require('../pages/HomePage');

When('I click on the {string} menu link', async function (linkText) {
  this.homePage = new HomePage(this.page);   //  instantiate once
  await this.homePage.clickMenuLinkByText(linkText);
});

Then('I should see all menu links listed', async function () {
  this.homePage = new HomePage(this.page);   //  same instance
  const links = await this.homePage.getAllMenuLinks();
  console.log('Menu links:', links);

  // Example assertion: ensure at least one link exists
  expect(links.length).to.be.greaterThan(0);
});