// pages/CountryPage.js

export class CountryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.dropdownSelector = 'select'; // GlobalSQA dropdown is usually a standard <select> inside the iframe
    // We initialize the frameLocator here so it's ready to use
    this.frameLocator = page.frameLocator('iframe.demo-frame.lazyloaded, iframe.demo-frame');
  }

  async goto() {
    const url = process.env.DEMO_URL || 'https://www.globalsqa.com/demo-site/select-dropdown-menu/';
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Ensure the iframe is actually attached and visible before proceeding
    await this.frameLocator.locator(this.dropdownSelector).first().waitFor({ state: 'visible', timeout: 15000 });
  }

  async selectCountry(countryName) {
    // selectOption works directly on the locator within the frame
    await this.frameLocator.locator(this.dropdownSelector).first().selectOption({ label: countryName });
  }

  async getSelectedCountry() {
    // Playwright locator for the selected option text
    const selectedText = await this.frameLocator
      .locator(`${this.dropdownSelector} option:checked`)
      .first()
      .textContent();
      
    return selectedText ? selectedText.trim() : '';
  }
}