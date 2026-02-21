const { test, expect } = require("@playwright/test");
const { POManager } = require("../pages/POManager");


  
let publicPageMenu;
let dashboardPage;

test.beforeEach(async ({ page }) => {
    const poManager = new POManager(page);
    publicPageMenu = poManager.getPublicPageMenu();
    dashboardPage = poManager.getDashboardPage();
    await publicPageMenu.GoTo();
  });

test.describe.parallel("Public Pages Tests", () => {
  test('@PublicPage checkMenu List Menu',async ({page})=>{
    await publicPageMenu.checkMenuTentangKami();
    await publicPageMenu.checkMenuKeanggotaan();
    await publicPageMenu.checkMenuBerita_Kegiatan();
    await publicPageMenu.checkMenuAkun();
  });

  test('@Publicpage akses eCommerce dari list menu',async ({page})=>{
    await dashboardPage.goToEcommerceMenu();
  });

  test('@Publicpage akses detail berita dari beranda',async ({page})=>{
    await dashboardPage.aksesDetailBeritaBeranda();
  });

  test('@Publicpage akses list halaman berita dari beranda',async({page})=>{
    await dashboardPage.akseslistBerita();
  });

  test('@Publicpage check produk yang tampil di beranda',async({page})=>{
    await dashboardPage.checkviewProductBeranda();
  });

  test('@Publicpage akses Ecommerce dari section katalog di beranda',async ({page})=>{
    await dashboardPage.aksesEcommerceBeranda();
  });

  test('@Publicpage akses halaman daftar dari section bawah beranda',async ({page})=>{
    await dashboardPage.aksesRegistrasiBeranda();
  });

  test('@Publicpage gunakan fitur cari data anggota',async ({page})=>{
    await dashboardPage.aksesDataAnggota();
    await dashboardPage.getDataAnggota();
  });

});