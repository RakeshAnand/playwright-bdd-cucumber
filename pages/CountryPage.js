// pages/CountryPage.js
class CountryPage {
  constructor(page) {
    this.page = page;
    this.dropdownSelector = '#country';
    this.frameLocator = null;
  }

  async goto() {
    const url = process.env.DEMO_URL || 'https://www.globalsqa.com/demo-site/select-dropdown-menu/';
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Use frameLocator chainable API
    this.frameLocator = this.page.frameLocator('iframe.demo-frame');

    // If demo-frame is not present, try to find the frame that contains #country
    try {
      await this.frameLocator.locator(this.dropdownSelector).waitFor({ state: 'visible', timeout: 15000 });
    } catch (err) {
      // fallback: search frames for the select element
      const frames = this.page.frames();
      let found = false;
      for (const f of frames) {
        try {
          const handle = await f.waitForSelector(this.dropdownSelector, { timeout: 2000 });
          if (handle) {
            // replace frameLocator with a frame-based locator
            this.frameLocator = this.page.frameLocator(`iframe[name="${f.name()}"]`);
            found = true;
            break;
          }
        } catch (e) {
          // ignore and continue
        }
      }
      if (!found) throw new Error('Country dropdown not found in any iframe');
    }
  }

  async selectCountry(countryName) {
    await this.frameLocator.locator(this.dropdownSelector).selectOption({ label: countryName });
  }

  async getSelectedCountry() {
    return (await this.frameLocator.locator(`${this.dropdownSelector} option:checked`).textContent()).trim();
  }
}

module.exports = { CountryPage };
