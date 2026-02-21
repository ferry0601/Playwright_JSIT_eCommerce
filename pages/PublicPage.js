const { expect } = require("@playwright/test");

class PublicPage{
    constructor(page){
        this.page=page;
        this.tentangkami = page.getByRole('button',{name:'Tentang Kami'});
        this.generalinfo = page.getByRole('link', { name: 'General Info' });
        this.HeadergeneralInfo = page.getByRole('heading', { name: 'General Info' });

    }

    async GoTo(){
        await this.page.goto('https://demo.koperasijsit.id/',{waitUntil: 'domcontentloaded'});
    }

    async checkMenuTentangKami(){
        await this.tentangkami.hover();
        await this.generalinfo.click();
        await expect(this.HeadergeneralInfo).toBeVisible();
    }
}

module.exports = {PublicPage};