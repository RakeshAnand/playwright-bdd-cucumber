// pages/LoginPage.js

export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // ✅ Excellent: Using Locators allows for auto-waiting and re-selection
    this.usernameInput = page.locator('input[name="uid"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[name="btnLogin"]');
  }

  async navigateToLogin() {
    // ✅ IMPROVEMENT: Ensure the URL exists and wait for 'domcontentloaded'
    // This helps prevent tests from starting before the page is ready.
    const url = process.env.BASE_URL;
    if (!url) {
      throw new Error("BASE_URL is not defined in the environment variables.");
    }
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async login(username, password) {
    // ✅ IMPROVEMENT: Ensure the inputs are ready before typing
    // Though fill() auto-waits, adding a visibility check is a pro-level safeguard.
    await this.usernameInput.waitFor({ state: 'visible' });
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}