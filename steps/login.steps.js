const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');
const fs = require('fs');
const path = require('path');

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
When('I take a screenshot of the dashboard', async function () {
  // Ensure reports/screenshots exists
  const dir = path.join(process.cwd(), 'reports', 'screenshots');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `dashboard-${timestamp}.png`;
  const filePath = path.join(dir, fileName);

  // Capture screenshot
  await this.page.screenshot({ path: filePath, fullPage: true });

  // Optionally attach to cucumber report (if your runner supports this.attach)
  if (this.attach) {
    const imageBuffer = fs.readFileSync(filePath);
    await this.attach(imageBuffer, 'image/png');
  }

  console.log(`Screenshot saved: ${filePath}`);
});
