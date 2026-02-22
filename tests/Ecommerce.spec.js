const {POManager} = require('../pages/POManager');
const {test,expect, request} = require('@playwright/test');
const datasetLogin = JSON.parse(JSON.stringify(require('../utils/loginData.json')));


let eCommercePage;
let urutannya = "Harga Tertinggi";

test.beforeEach('test login',async ({page})=>{
    const poManager = new POManager(page);
    const data = datasetLogin.validuser[2];
    const loginPage = poManager.getLoginPage();
    eCommercePage = poManager.getECommercePage();
    await eCommercePage.GoTo();
    await loginPage.submitForm(data.email,data.password);
    
});
test.describe.parallel('E-Commerce test -- ',()=>{

    test('@ECommerce Cek Produk tiap Halaman Menu ',async ({page})=>{
        await eCommercePage.cekProduktiapHalaman();
    });

    test('@ECommerce akses public page dari portal koperasi e-commerce', async ({page})=>{
        await eCommercePage.backDashboardPage();
    });

    test('@ECommerce urutkan harga', async ({page})=>{
        await eCommercePage.selectOrderHarga(urutannya);
    });

});