// pages/EditCustomerPage.js
export class EditCustomerPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.customerIdInput = page.locator('input[name="cusid"]');
    this.submitBtn = page.locator('input[name="AccSubmit"]');

    // Editable fields
    this.customerNameInput = page.locator('input[name="name"]');
    this.genderRadioMale = page.locator('input[name="gender"]');
    this.genderRadioFemale = page.locator('input[name="gender"]');
    this.dobInput = page.locator('input[name="dob"]');
    this.addressTextarea = page.locator('textarea[name="addr"]');
    this.cityInput = page.locator('input[name="city"]');
    this.stateInput = page.locator('input[name="state"]');
    this.pinInput = page.locator('input[name="pinno"]');
    this.mobileInput = page.locator('input[name="telephoneno"]');
    this.emailInput = page.locator('input[name="emailid"]');
  }

  async goto() {
    await this.page.goto('https://www.demo.guru99.com/V4/manager/editCustomerPage.php', {
      waitUntil: 'domcontentloaded',
    });
  }

  async enterCustomerId(customerId) {
  await this.customerIdInput.fill(customerId);
  }

  async submitForm() {
  await this.submitBtn.click();
  }

  async getCustomerDetails() {
    // Force a short wait on the very first field to verify you are on the right screen
    await this.customerNameInput.waitFor({ state: 'attached', timeout: 5000 });
    return {
      name: await this.customerNameInput.inputValue(),
      gender: await this.genderRadioMale.inputValue(),
      dob: await this.dobInput.inputValue(),
      address: await this.addressTextarea.inputValue(),
      city: await this.cityInput.inputValue(),
      state: await this.stateInput.inputValue(),
      pin: await this.pinInput.inputValue(),
      mobile: await this.mobileInput.inputValue(),
      email: await this.emailInput.inputValue(),
    };
  }
}

export default EditCustomerPage;
