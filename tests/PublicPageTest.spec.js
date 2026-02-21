const { test, expect } = require("@playwright/test");
const { POManager } = require("../pages/POManager");


  
let publicPage;
test.beforeEach(async ({ page }) => {
    const poManager = new POManager(page);
    publicPage = poManager.getPublicPage();
    await publicPage.GoTo();
  });

test.describe.parallel("Public Pages Tests", () => {
  test('@CheckMenu List Menu',async ({page})=>{
    await publicPage.checkMenuTentangKami();
  });

});