// pages/LoginPage.js
class LoginPage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = 'input[name="uid"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'input[name="btnLogin"]';
  }

  async navigateToLogin() {
    await this.page.goto(process.env.BASE_URL);
    await this.page.waitForLoadState('load');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

}

module.exports = LoginPage;
