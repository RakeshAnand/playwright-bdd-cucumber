// CustomerPage.js
class CustomerPage {
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
    await this.page.goto(process.env.CUSTOMER_URL || 'https://demo.guru99.com/V4/manager/addcustomerpage.php');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async enterCustomerName(name) {
    await this.customerNameInput.fill(name);
  }

  async selectGender(gender) {
    if (gender.toLowerCase() === 'male') {
      await this.genderMaleRadio.check();
    } else {
      await this.genderFemaleRadio.check();
    }
  }

  async enterDOB(dob) {
    await this.dobInput.fill(dob); // format: mm/dd/yyyy
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

module.exports = { CustomerPage };
