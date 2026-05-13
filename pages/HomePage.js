// pages/HomePage.js

export class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // ✅ Good: locators defined here are lazy-evaluated
    this.dashboardMarquee = page.locator('marquee');
    this.menuLinks = page.locator('ul.menusubnav li a');
  }

  /**
   * Returns the text for logging or debugging.
   * Note: For assertions, use expect(homePage.dashboardMarquee).toContainText() 
   * in the step file instead of this method.
   */
  async getDashboardText() {
    return (await this.dashboardMarquee.innerText()).trim();
  }

  async clickMenuLinkByText(linkName) {
    // ✅ IMPROVEMENT: Use the specific locator for scoped clicking
    // This is more robust than a generic page.getByRole if you have many links
    await this.page.getByRole('link', { name: linkName, exact: true }).click();
  }

  async getAllMenuLinks() {
    // ✅ Excellent: allInnerTexts() is much better than looping through elements
    return await this.menuLinks.allInnerTexts();
  }
}