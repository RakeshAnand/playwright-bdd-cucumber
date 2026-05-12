// CustomerPage.js

export class CustomerPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.customerNameInput = page.locator('input[name="name"]');
    this.genderMaleRadio = page.locator('input[value="m"]');
    this.genderFemaleRadio = page.locator('input[value="f"]');
    this.dobInput = page.locator('input[name="dob"]');
    this.addressTextarea = page.locator('textarea[name="addr"]');
    this.cityInput = page.locator('input[name="city"]');
    this.stateInput = page.locator('input[name="state"]');
    this.pinInput = page.locator('input[name="pinno"]');
    this.mobileInput = page.locator('input[name="telephoneno"]');
    this.emailInput = page.locator('input[name="emailid"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('input[name="sub"]');
  }

  async goto() {
    const url = process.env.CUSTOMER_URL || 'https://demo.guru99.com/V4/manager/addcustomerpage.php';
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async enterCustomerName(name) {
    await this.customerNameInput.fill(name);
  }

  async selectGender(gender) {
    if (gender.toLowerCase() === 'male' || gender.toLowerCase() === 'm') {
      await this.genderMaleRadio.check();
    } else {
      await this.genderFemaleRadio.check();
    }
  }

  async enterDOB(dob) {
    // Note: Some browsers/sites require the date format yyyy-mm-dd for input[type="date"]
    await this.dobInput.fill(dob); 
  }

  async enterAddress(address) {
    await this.addressTextarea.fill(address);
  }

  async enterCity(city) {
    await this.cityInput.fill(city);
  }

  async enterState(state) {
    await this.stateInput.fill(state);
  }

  async enterPIN(pin) {
    await this.pinInput.fill(pin);
  }

  async enterMobile(mobile) {
    await this.mobileInput.fill(mobile);
  }

  async enterEmail(email) {
    await this.emailInput.fill(email);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async submitForm() {
    await this.submitButton.click();
  }
}