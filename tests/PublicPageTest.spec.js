const { test, expect } = require("@playwright/test");
const { POManager } = require("../pages/POManager");


  
let publicPageMenu;
test.beforeEach(async ({ page }) => {
    const poManager = new POManager(page);
    publicPageMenu = poManager.getPublicPageMenu();
    await publicPageMenu.GoTo();
  });

test.describe.parallel("Public Pages Tests", () => {
  test('@PublicPage checkMenu List Menu',async ({page})=>{
    await publicPageMenu.checkMenuTentangKami();
    await publicPageMenu.checkMenuKeanggotaan();
    await publicPageMenu.checkMenuBerita_Kegiatan();
    await publicPageMenu.checkMenuAkun();
  });

});