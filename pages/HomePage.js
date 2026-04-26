// pages/HomePage.js
class HomePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.dashboardMarquee = 'marquee';
    this.menuLinks = 'ul.menusubnav li a';
  }

  async getDashboardText() {
    await this.page.waitForSelector(this.dashboardMarquee);
    const marqueeText = await this.page.textContent(this.dashboardMarquee);
    return marqueeText.trim();
  }

  async clickMenuLinkByText(text) {
  await this.page.getByRole('link', { name: text }).click();
}

  async getAllMenuLinks() {
  return await this.page.$$eval(this.menuLinks, links =>
    links.map(link => link.textContent.trim())
  );
}
}

module.exports = HomePage;
