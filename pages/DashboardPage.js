const { expect } = require("@playwright/test");

class DashboardPage{
    constructor(page){
        this.page=page;
        this.eCommerce = page.getByRole('link',{name:'E-Commerce',exact: true});
        this.bacaberita = page.getByRole('link',{name:'Baca Selengkapnya'}).first();
        this.aksessemuaberita = page.getByRole('link',{name:'Lihat Semua Berita'});
        this.katalog = page.getByRole('button',{name:'Katalog'});
        this.vendor = page.getByRole('button',{name:'Vendor Terbaik'});
        this.sectionvendor = page.locator('#content-vendor');
        this.bukakoperasiEcommerce = page.getByRole('link',{name:'Buka E-Commerce Koperasi'});
        this.aksesregistrasi = page.getByRole('link',{name:'Daftar Sekarang'});
        this.sectionkatalog = page.locator('#content-kategori .grid a');
        this.listproduct = page.locator('.grid > div.bg-white');
        this.detailBerita = page.getByRole('heading',{name:'Penguatan Kemandirian Perekonomian Melalui Koperasi, JSIT Indonesia Wilayah Aceh Mengadakan Konsolidasi Webinarr'});
        this.listberita = page.locator('.grid .bg-white');
        this.gridRegistrasi = page.locator('div.grid').locator('a');
        this.keanggotaan = page.getByRole('button',{name:'Keanggotaan'});
        this.dataAnggota = page.getByRole('link',{name:'Data Anggota',exact:true});
        this.memberSearch = page.locator('#member-search');
        this.dropdown = page.locator('#search-dropdown');
        this.items = this.dropdown.locator('div[data-id]');
        this.resultname = page.locator('#result-name');
    
    }

    async goToEcommerceMenu(){
        await this.eCommerce.click();
        expect(await this.listproduct.first()).toBeVisible();
    }

    async aksesDetailBeritaBeranda(){
        await this.bacaberita.click();
        expect(await this.detailBerita).toBeVisible();
    }

    async akseslistBerita(){
        await this.aksessemuaberita.click();
        expect(await this.listberita.count()).toBeGreaterThan(1);
    }

    async checkviewProductBeranda(){
        await this.katalog.click();
        expect(await this.sectionkatalog.count()).toBeGreaterThan(0);
        await this.vendor.click();
        expect(await this.sectionvendor.count()).toBeGreaterThan(0);
    }

    async aksesEcommerceBeranda(){
        await this.bukakoperasiEcommerce.click();
        expect(await this.listproduct.first()).toBeVisible();
    }

    async aksesRegistrasiBeranda(){
        await this.aksesregistrasi.click();
        expect(await this.gridRegistrasi.count()).toBe(3);
    }

    async aksesDataAnggota(){
        await this.keanggotaan.click();
        await expect(this.dataAnggota).toBeVisible();
        await this.dataAnggota.click();
    }

    async getDataAnggota() {
        await this.memberSearch.fill('as');
        await expect(this.dropdown).toBeVisible();
        await expect(this.items.first()).toBeVisible();

        const count = await this.items.count();
       if (count === 0) {
            throw new Error('Dropdown kosong, tidak ada anggota ditemukan');
        }
        const randomIndex = Math.floor(Math.random() * count);
        const selectedItem = this.items.nth(randomIndex);
        const selectedName = (
            await selectedItem.locator('p.font-semibold').textContent()
        ).trim();

        await selectedItem.click();
        await expect(this.resultname).toHaveText(selectedName);
    }
}

module.exports = {DashboardPage};