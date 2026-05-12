// pages/LoginPage.js

export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Store as Locators instead of just strings
    this.usernameInput = page.locator('input[name="uid"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[name="btnLogin"]');
  }

  async navigateToLogin() {
    // Ensure BASE_URL is defined in your .env
    await this.page.goto(process.env.BASE_URL);
  }

  async login(username, password) {
    // Locators make the actions more readable
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}