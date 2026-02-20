class RegisterPageMitra{
    constructor(page){
        this.page=page;
        this.name = page.locator('[name="name"]');
        this.email = page.locator('[name="email"]');
        this.phone = page.locator('[name="phone"]');
        this.password = page.locator('[name="password"]');
        this.passwordConfirm = page.locator('[name="password_confirm"]');
        this.errorMessage = page.locator(".border.rounded-lg.mb-4");
        this.successMitra = page.getByRole('heading', { name: 'Pendaftaran Berhasil!' });
            // ================================
        this.mitrabtn = page.getByRole("link",{name:"Mitra"});
        this.nik = page.locator('[name="nik"]');
        this.store = page.locator('[name="store_name"]');
        this.store_category = page.locator('[name="store_category"]');
        this.store_description = page.locator('[name="store_description"]');
        this.store_address = page.locator('[name="store_address"]');
        this.user_npwp = page.locator('[name="npwp"]');
        this.user_bank = page.locator('[name="bank_name"]');
        this.user_rekening = page.locator('[name="bank_account"]');
        this.user_ktp = page.locator('[name="ktp_file"]');
        this.user_siup = page.locator('[name="siup_file"]');
        this.btnDaftarMitra = page.getByRole('button', { name: 'Daftar Sebagai Mitra' });
    }

    async navigateMitraForm(){
        await this.mitrabtn.click();
    }

    async submitFormMitra(name,nik,email,phone,storeName,kategori,deskripsi,alamat,npwp,bank,rekening,ktpPath,siupPath,password,passwordConfirm){
        await this.name.type(name);
        await this.nik.type(nik);
        await this.email.type(email);
        await this.phone.type(phone);
        await this.store.type(storeName);
        await this.store_category.click();
        await this.store_category.selectOption({ label: kategori });
        await this.store_description.type(deskripsi);
        await this.store_address.type(alamat);
        await this.user_npwp.type(npwp);
        await this.user_bank.type(bank);
        await this.user_rekening.type(rekening);
        await this.user_ktp.setInputFiles(ktpPath);
        await this.user_siup.setInputFiles(siupPath)
        await this.password.type(password);
        await this.passwordConfirm.type(passwordConfirm);
        await this.btnDaftarMitra.click();
    }

    getSuccessMitra(){
        return this.successMitra;
    }

    async getEmptyMessage() {
    const message = await this.name.evaluate(
      (el) => el.validationMessage,
    );
    return message;
    }

    getErrorMessage(){
        return this.errorMessage;
    }

}

module.exports = {RegisterPageMitra};