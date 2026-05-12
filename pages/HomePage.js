// pages/HomePage.js

export class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Define locators in the constructor
    this.dashboardMarquee = page.locator('marquee');
    this.menuLinks = page.locator('ul.menusubnav li a');
  }

  async getDashboardText() {
    // .innerText() or .textContent() on a locator handles the waiting for you
    const text = await this.dashboardMarquee.innerText();
    return text.trim();
  }

  async clickMenuLinkByText(text) {
    // getByRole is the preferred way to interact with links
    await this.page.getByRole('link', { name: text }).click();
  }

  async getAllMenuLinks() {
    // .allInnerTexts() is the modern, faster way to get a list of text from multiple elements
    return await this.menuLinks.allInnerTexts();
  }
}