const { expect } = require("@playwright/test");

class PublicPageMenuList{
    constructor(page){
        this.page=page;
        this.tentangkami = page.getByRole('button',{name:'Tentang Kami'});
        this.generalinfo = page.getByRole('link', { name: 'General Info' });
        this.visimisi = page.getByRole('link', { name: 'Visi Misi' });
        this.tujuan = page.getByRole('link', { name: 'Tujuan' });
        this.asas = page.getByRole('link', { name: 'Asas' });
        this.HeadergeneralInfo = page.getByRole('heading', { name: 'General Info' });
        this.HeaderVisiMisi = page.getByRole('heading', { name: 'Visi Misi' });
        this.HeaderTujuan = page.getByRole('heading', { name: 'Tujuan' });
        this.HeaderAsas = page.getByRole('heading', { name: 'Asas' });
        //===========================================================================
        this.keanggotaan = page.getByRole('button',{name:'Keanggotaan'});
        this.hakkewajiban = page.getByRole('link', { name: 'Hak dan Kewajiban Anggota' });
        this.dataanggota = page.getByRole('link', { name: 'Data Anggota' });
        this.struktur = page.getByRole('link', { name: 'Struktur Organisasi' });
        this.Headerhakkewajiban = page.getByRole('heading', { name: 'Hak & Kewajiban Anggota' });
        this.Headerdataanggota = page.getByRole('heading', { name: 'Data Anggota', exact: true });
        this.Headerstruktur = page.getByRole('heading',{name:'Struktur Organisasi',level:1});
        //============================================================================
        this.berita_kegiatan = page.getByRole('button',{name:'Berita & Kegiatan'});
        this.berita = page.getByRole('link',{name:'Berita'});
        this.kegiatan = page.getByRole('link',{name:'Kegiatan'}).first();
        this.Headerberita = page.getByRole('heading',{name:'Berita Terkini'});
        this.Headerkegiatan = page.getByRole('heading',{name:'Kegiatan Koperasi'});
        //===============================================================================
        this.profil = page.locator('[title="Akun"]');
        this.masuk = page.getByRole('link',{name:'Masuk'});
        this.daftar = page.getByRole('link',{name:'Daftar',exact: true});
        this.HeaderDaftar = page.getByRole('heading',{name:'Daftar Akun'});
        this.logoJSIT = page.getByRole('link',{name:'Koperasi JSIT'}).first();
        this.HeaderMasuk = page.getByText('Masuk ke akun Anda');

    }

    async GoTo(){
        await this.page.goto('https://demo.koperasijsit.id/',{waitUntil: 'domcontentloaded'});
        await this.tentangkami.waitFor({state:'visible'});
    }

    async checkMenuTentangKami(){
        const menus = [
            { menu: this.generalinfo, header: this.HeadergeneralInfo },
            { menu: this.visimisi, header: this.HeaderVisiMisi },
            { menu: this.tujuan, header: this.HeaderTujuan },
            { menu: this.asas, header: this.HeaderAsas }
        ];

        for(const item of menus){
            await this.tentangkami.hover();
            await expect(item.menu).toBeVisible();
            await item.menu.click();
            await expect(item.header).toBeVisible();
        }
    }

    async checkMenuKeanggotaan(){
        const menus = [
            { menu: this.hakkewajiban, header: this.Headerhakkewajiban },
            { menu: this.dataanggota, header: this.Headerdataanggota },
            { menu: this.struktur, header: this.Headerstruktur }
        ];

        for(const item of menus){
            await this.keanggotaan.hover();
            await expect(item.menu).toBeVisible();
            await item.menu.click();
            await expect(item.header).toBeVisible();
        }
    }

    async checkMenuBerita_Kegiatan(){
        const menus = [
            { menu: this.berita, header: this.Headerberita },
            { menu: this.kegiatan, header: this.Headerkegiatan }
        ];

        for(const item of menus){
            await this.berita_kegiatan.hover();
            await expect(item.menu).toBeVisible();
            await item.menu.click();
            await expect(item.header).toBeVisible();
        }
    }

    async checkMenuAkun(){
        const menus = [
            { menu: this.masuk, header: this.HeaderMasuk },
            { menu: this.daftar, header: this.HeaderDaftar }
        ];

        for(const item of menus){
            await this.profil.hover();
            await expect(item.menu).toBeVisible();
            await item.menu.click();
            await expect(item.header).toBeVisible();
            await this.logoJSIT.click();
        }
    }

    
}

module.exports = {PublicPageMenuList};