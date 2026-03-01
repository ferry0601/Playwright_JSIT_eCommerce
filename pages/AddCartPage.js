const { expect } = require("@playwright/test");
const { stat } = require("node:fs");

class AddCartPage{
    constructor(page){
        this.page=page;
        this.alltitles = page.locator('.block h3');
        this.products = page.locator('.flex-col.flex-1');
        this.cartProduct = page.locator('.flex-1.min-w-0 a');
        this.btnBeli = page.locator('#buyBtn');
        this.pilihmetodePengiriman = page.locator('[name="shipping_method"]');
        this.jasakirim = page.locator('#shipping-service-section');
        this.alamatsave = page.locator('#saved_address_id');
        this.btnPesan = page.getByRole('button',{name:'Pesan Sekarang'});
        this.titleSuccess = page.locator('.font-bold.text-gray-800.mb-2');
        this.orderId = page.locator('.font-bold.text-blue-600');
        this.listItem = page.locator('#summaryItems');

    }

    async searchandAddcart(productName){
        await this.alltitles.first().waitFor();
        const title = await this.alltitles.allTextContents();
        const count = await this.products.count();

        for(let i=0;i<count;i++){
            const getText = await this.products.nth(i).locator('.block h3').textContent();
            if(getText?.trim() === productName){
                console.log(getText);
                await this.products.nth(i).locator('button', { hasText: 'Keranjang' }).click();
                await this.listItem.waitFor();
                
                return;
            }
        }

    }

    async getCheckProductinCart(productName){
        console.log("productName:", productName);
        await this.listItem.waitFor({state:'visible',timeout:15000})
        await expect(
            this.listItem.getByText(productName,{exact:false})
        ).toBeVisible({timeout:15000});
        await this.btnBeli.click();
    }

    async metodePengiriman(pengiriman){
        const metodekirim = await this.page.getByText(pengiriman).first();
        await metodekirim.waitFor();
        await metodekirim.click();
    }

    async jasaPengiriman(){
        await this.jasakirim.waitFor({state:'visible',timeout:15000});
        const radios = this.jasakirim.locator(' input[type="radio"]');
        const count = await radios.count();
        console.log("Radio count:", count);
        const randomRadio = Math.floor(Math.random() * count);
        await radios.nth(randomRadio).check();
    }

    async alamatKirim(){
        await this.alamatsave.check();
    }

    async paymentMode(metodeBayar){
        await this.page.getByText(metodeBayar).check();
    }

    async checkoutandGetOrderId(successnote){
        await this.btnPesan.click();
        await expect(this.titleSuccess).toHaveText(successnote);
        return await this.orderId.textContent();
    }

}
module.exports = {AddCartPage};