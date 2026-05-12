// fixtures/baseTest.js
import { test as base } from 'playwright-bdd';
// ✅ Always add .js extension for ESM
import { LoginPage } from '../pages/LoginPage.js'; 
import { HomePage } from '../pages/HomePage.js';

export const test = base.extend({
  // Initialize LoginPage
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  // Initialize HomePage
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

// Note: You can export Given/When/Then from here, 
// but it's often cleaner to call createBdd(test) inside your steps file 
// so the steps are directly linked to the generator instance.