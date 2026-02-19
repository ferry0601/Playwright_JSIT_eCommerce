const { test, expect } = require("@playwright/test");
const { POManager } = require("../pages/POManager");
const { LoginPage } = require("../pages/LoginPage");
const dataset = JSON.parse(JSON.stringify(require("../utils/loginData.json")));

test.describe.parallel("Login Tests", () => {
  
  let loginPage;
  const logoutUser = dataset.validuser[0];

  test.beforeEach(async ({ page }) => {
    const poManager = new POManager(page);
    loginPage = poManager.getLoginPage();
    await loginPage.GoTo();
  });

  for (const data of dataset.validuser) {
    test(`@Login dengan kredensial valid ${data.email}`, async ({ page }) => {
      await loginPage.submitForm(data.email, data.password);
      await expect(loginPage.getSuccessLogin()).toContainText(data.success);
    });
  }

  for (const data of dataset.invaliduser) {
    test(`@Login dengan password atau email salah ${data.email}`, async ({
      page,
    }) => {
      await loginPage.submitForm(data.email, data.password);
      await expect(loginPage.getErrorLogin()).toContainText(data.errorLine);
    });
  }

  test('Logout akun',async ({page})=>{
    await loginPage.submitForm(logoutUser.email,logoutUser.password);
    await loginPage.logOut();
  })
});
