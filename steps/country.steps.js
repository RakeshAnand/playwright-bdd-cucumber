const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const { CountryPage } = require('../pages/CountryPage');
// support/timeout.js  OR at top of steps file
const { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000); // 60 seconds


Given('I am on the GlobalSQA country dropdown page', async function () {
  this.dropdownPage = new CountryPage(this.page);
  await this.dropdownPage.goto();
});

When('I select {string} from the country dropdown', async function (countryName) {
  await this.dropdownPage.selectCountry(countryName);
});

Then('the selected country should be {string}', async function (expectedCountry) {
  const selected = await this.dropdownPage.getSelectedCountry();
  expect(selected).to.equal(expectedCountry);
});
