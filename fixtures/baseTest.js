// fixtures/baseTest.js
import { test as base } from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage.js';
import { CustomerPage } from '../pages/CustomerPage.js';
import { HomePage } from '../pages/HomePage.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  customerPage: async ({ page }, use) => {
    await use(new CustomerPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});