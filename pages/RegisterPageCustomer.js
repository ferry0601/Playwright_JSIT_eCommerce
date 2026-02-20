const {expect} = require('@playwright/test');
class RegisterPageCustomer {
  constructor(page) {
    this.page = page;
    this.customerbtn = page.getByRole("link", { name: "E-Commerce" }).first();
    this.name = page.locator('[name="name"]');
    this.email = page.locator('[name="email"]');
    this.phone = page.locator('[name="phone"]');
    this.password = page.locator('[name="password"]');
    this.passwordConfirm = page.locator('[name="password_confirm"]');
    this.btnDaftar = page.getByRole("button", { name: "Daftar Sekarang" });
    this.errorMessage = page.locator(".border.rounded-lg.mb-4");
    this.successCustomer = page.getByRole('heading', { name: 'Pendaftaran Berhasil!' });

  }

  async GoTo() {
    await this.page.goto("https://demo.koperasijsit.id/register");
  }

  async navigateCustomerForm() {
    await this.customerbtn.click();
  }

  async submitFormCustomer(name, email, phone, password, confirmPassword) {
    await this.name.type(name);
    await this.email.type(email);
    await this.phone.type(phone);
    await this.password.type(password);
    await this.passwordConfirm.type(confirmPassword);
    await this.btnDaftar.click();
  }

  getErrorLine() {
    return this.errorMessage;
  }

  async getEmptyMessage() {
    const message = await this.name.evaluate(
      (el) => el.validationMessage,
    );
    return message;
  }

  async getSuccessCustomer(){
    const message = await this.successCustomer.textContent();
    await expect(this.successCustomer).toContainText(message);
  }

}
module.exports = { RegisterPageCustomer };
