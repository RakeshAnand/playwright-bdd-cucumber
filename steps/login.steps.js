const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');

Given('I navigate to the login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToLogin();
});

When('I enter valid credentials', async function () {
  await this.loginPage.login(process.env.LOGIN_USERNAME, process.env.PASSWORD);
});

Then('I should see the dashboard', async function () {
  this.homePage = new HomePage(this.page);   //  instantiate HomePage
  const marqueeText = await this.homePage.getDashboardText();  //  use homePage
  expect(marqueeText).to.include('Welcome');
});

//  New step to capture screenshot of dashboard
Then('I take a screenshot of the dashboard', async function () {
  const screenshotDir = path.join('reports', 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }
  const screenshotPath = path.join(screenshotDir, `DASHBOARD_${Date.now()}.png`);
  await this.page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`Dashboard screenshot saved at: ${screenshotPath}`);
});
