const {POManager} = require('../pages/POManager');
const {test,expect, request} = require('@playwright/test');
const datasetLogin = JSON.parse(JSON.stringify(require('../utils/loginData.json')));
const dataEcommerce = JSON.parse(JSON.stringify(require('../utils/eCommerceData.json')));

let eCommercePage;
let filterproductPage;
let addCartPage;

test.beforeEach('test login',async ({page})=>{
    const poManager = new POManager(page);
    const data = datasetLogin.validuser[2];
    const loginPage = poManager.getLoginPage();
    filterproductPage = poManager.getFilterPage();
    eCommercePage = poManager.getECommercePage();
    addCartPage = poManager.getAddCartPage();
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
        await eCommercePage.selectOrderHarga(dataEcommerce.urutannya);
    });

    test('@ECommerce filter by category',async ({page})=>{
        await filterproductPage.checkfiltercategory();
    });

    test('@ECommerce filter by prices', async({page})=>{
        await filterproductPage.checkfilterprice();
    });

    test('@ECommerce filter by rating vendor',async ({page})=>{
        await filterproductPage.checkfilterrating();
    });

    test('@ECommerce reset filter', async ({page})=>{
        await filterproductPage.checkfilterrating();
        const reset = await filterproductPage.resetFilter();
        await expect(reset).toBeChecked();
    });

    test.only('@ECommerce testing checkout item kondisi (bayar di depan dan kirim alamat)',async ({page})=>{
        await addCartPage.searchandAddcart(dataEcommerce.nameProduct);
        await addCartPage.getCheckProductinCart(dataEcommerce.nameProduct);
        await addCartPage.metodePengiriman(dataEcommerce.pengiriman);
        await addCartPage.jasaPengiriman();
        await addCartPage.alamatKirim();
        await addCartPage.paymentMode(dataEcommerce.metodeBayar);
        const orderId = await addCartPage.checkoutandGetOrderId(dataEcommerce.successnote);
        console.log(orderId);


    });


});