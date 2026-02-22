const { expect } = require("@playwright/test");

class ECommercePage{
    constructor(page){
        this.page=page;
        this.menuseragamsiswa = page.getByRole('link',{name:'Seragam Siswa'}).first();
        this.menuseragamguru = page.getByRole('link',{name:'Seragam Guru'}).first();
        this.menubuku = page.getByRole('link',{name:'Buku'}).first();
        this.menuelektronik = page.getByRole('link',{name:'Elektronik'}).first();
        this.menumakanan = page.getByRole('link',{name:'Makanan'}).first();
        this.menuherbal = page.getByRole('link',{name:'Herbal'}).first();
        this.menuumum = page.getByRole('link',{name:'Umum'}).first();
        this.menubackpublicpage = page.getByRole('link',{name:'Portal Koperasi'}).first();
        this.cekJumlah = page.locator('.p-2 .block');
        this.titleDashboard = page.getByText('Koperasi Berkah Usaha Terpadu').first();
        this.cekSession = page.locator('div.font-medium.text-gray-900');
        this.menuakun = page.locator('[title="Akun"]');
        this.sortBy = page.locator('#sortSelect');
        this.harga = page.locator('p.text-sm.md\\:text-base.font-bold.text-blue-600:visible, \
                                    p.text-sm.md\\:text-base.font-bold.text-red-600:visible');

    }

    // async setToken(token){
    //     await this.page.addInitScript((value) =>{
    //     window.localStorage.setItem('token',value);
    //     },token);
    // }

    async GoTo(){
        await this.page.goto('https://demo.koperasijsit.id/login');
    }

    async cekProduktiapHalaman(){
        const menus = [
            this.menuseragamsiswa,
            this.menuseragamguru,
            this.menubuku,
            this.menuelektronik,
            this.menumakanan,
            this.menuherbal,
            this.menuumum
        ];
        for(const item of menus){
            await item.click();
            await expect(this.cekJumlah.first()).toBeVisible();
            const totalproduk = await this.cekJumlah.count()
            expect(await totalproduk).toBeGreaterThan(0);
        }
    }

    async backDashboardPage(){
        await this.menubackpublicpage.click();
        await expect(this.titleDashboard).toBeVisible();
        await this.menuakun.hover();
        await expect(this.cekSession).toBeVisible();

    }


    async selectOrderHarga(order) {
        await this.sortBy.selectOption({label:order});
        await this.harga.first().waitFor();
        const textPrices = await this.harga.allTextContents();
        const prices = textPrices.filter(text => text.includes('Rp')).map(price =>
            Number(price.replace(/\D/g, ''))
        );
        let sortedPrice;
        if (order === 'Harga Tertinggi') {
            sortedPrice = [...prices].sort((a, b) => b - a);
        } else if (order === 'Harga Terendah') {
            sortedPrice = [...prices].sort((a, b) => a - b);
        } else {
            throw new Error('Order harus "asc" atau "desc"');
        }
        expect(prices).toEqual(sortedPrice);
    }

}
module.exports = {ECommercePage};