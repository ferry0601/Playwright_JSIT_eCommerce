const { expect } = require("@playwright/test");
const { ECDH } = require("node:crypto");

class FilterProductPage{
    constructor(page){
        this.page=page;
        this.filtercategory = page.locator('[name="category"]');
        this.filterprices = page.locator('[name="price"]');
        this.filterrate = page.locator('[name="rating"]');
        this.btnFilter = page.getByRole('button',{name:'Terapkan Filter'});
        this.valuerate = page.locator('.flex.items-center.gap-0\\.5 span');
        this.nameproduct = page.locator('.p-2 h3');
        this.harga = page.locator('p.text-sm.md\\:text-base.font-bold.text-blue-600:visible, \
                                    p.text-sm.md\\:text-base.font-bold.text-red-600:visible');

    }

    async checkfiltercategory(){
        const count = await this.filtercategory.count();
        for(let i=0;i<count;i++){
            await this.filtercategory.nth(i).check();
            await this.btnFilter.click();
            const total = await this.nameproduct.count();
            expect(await total).toBeGreaterThanOrEqual(0);
        }
    }

    async checkfilterprice() {
        const count = await this.filterprices.count();
        for (let i = 0; i < count; i++) {
            const currentFilter = this.filterprices.nth(i);
            const rangeText = await currentFilter.textContent();
            await currentFilter.check();
            await this.btnFilter.click();
            await expect(this.nameproduct.first()).toBeVisible();
            const prices = await this.harga.allTextContents();
            const numericPrice = prices.map(p =>
                Number(p.replace(/[^0-9]/g, ''))
            );
            const cleaned = rangeText.replace(/\./g, '');
            const numbers = cleaned.match(/\d+/g)?.map(Number);
            for (const price of numericPrice) {
                if (numbers?.length === 2) {
                    const [min, max] = numbers;
                    expect(price).toBeGreaterThanOrEqual(min);
                    expect(price).toBeLessThanOrEqual(max);
                }
                else if (numbers?.length === 1) {
                    expect(price).toBeGreaterThanOrEqual(numbers[0]);
                }
            }
        }
    }

    async checkfilterrating() {
        await this.filterrate.first().waitFor();
        console.log("Filter rate count:", count);
        for (let i = 0; i < count; i++) {
            const currentFilter = this.filterrate.nth(i);
            const minRate = Number(
                await currentFilter.getAttribute('value')
            );
            await currentFilter.check();
            await Promise.all([
                this.page.waitForLoadState('networkidle'),
                this.btnFilter.click()
            ]);
            await expect(this.nameproduct.first()).toBeVisible();
            const ratings = await this.valuerate.allTextContents();
            const numericRate = ratings.map(r => Number(r));
            for (const rate of numericRate) {
                expect(rate).toBeGreaterThanOrEqual(minRate);
            }
        }
    }


}

module.exports = {FilterProductPage};