

class RegisterPageMember{
    constructor(page){
        this.page=page;
        this.name = page.locator('[name="name"]');
        this.email = page.locator('[name="email"]');
        this.phone = page.locator('[name="phone"]');
        this.password = page.locator('[name="password"]');
        this.passwordConfirm = page.locator('[name="password_confirm"]');
        this.errorMessage = page.locator(".border.rounded-lg.mb-4");
        this.successMember = page.getByRole('heading', { name: 'Pendaftaran Berhasil!' });
            // ================================
        this.memberbtn = page.getByRole("link",{name:"Anggota Koperasi"});
        this.checkbox = page.locator('#agree-terms');
        this.nextbtn = page.locator('#next-btn');
        this.gender = page.locator('[name="gender"]');
        this.birthplace = page.locator('[name="birth_place"]');
        this.birthdate = page.locator('[name="birth_date"]');
        this.nik = page.locator('[name="nik"]');
        this.address = page.locator('[name="address"]');
        this.province = page.locator('[name="province"]');
        this.kota = page.locator('[name="city"]');
        this.kecamatan = page.locator('[name="district"]');
        this.kelurahan = page.locator('[name="village"]');
        this.sekolah = page.locator('[name="school"]');
        this.yayasan = page.locator('[name="foundation"]');
        this.pekerjaan = page.locator('[name="occupation"]');
        this.user_npwp = page.locator('[name="npwp"]');
        this.user_bank = page.locator('[name="bank_name"]');
        this.user_rekening = page.locator('[name="bank_account"]');
        this.user_ktp = page.locator('[name="ktp_file"]');
        this.user_pasphoto = page.locator('[name="photo_file"]');
        this.btnDaftarMember = page.getByRole('button', { name: 'Daftar Sekarang' });
    }

    async navigateMemberForm(){
        await this.memberbtn.click();
        await this.checkbox.check();
        await this.nextbtn.click();
    }

    async submitFormMember(name,kelamin,tempatLahir,tanggalLahir,nik,phone,email,alamat,provinsi,kota,kecamatan,kelurahan,sekolah,yayasan,pekerjaan,npwp,
        bank,rekening,ktpPath,pasPhotoPath,password,passwordConfirm){
        await this.name.type(name);
        await this.gender.selectOption({ label: kelamin });
        await this.birthplace.type(tempatLahir);
        await this.birthdate.type(tanggalLahir);

        await this.nik.type(nik);
        await this.phone.type(phone);
        await this.email.type(email);

        await this.address.type(alamat);
        await this.province.type(provinsi);
        await this.kota.type(kota);
        await this.kecamatan.type(kecamatan);
        await this.kelurahan.type(kelurahan);

        await this.sekolah.type(sekolah);
        await this.yayasan.type(yayasan);
        await this.pekerjaan.type(pekerjaan);
        await this.user_npwp.type(npwp);

        await this.user_bank.type(bank);
        await this.user_rekening.type(rekening);
        await this.user_ktp.setInputFiles(ktpPath);
        await this.user_pasphoto.setInputFiles(pasPhotoPath);
        await this.password.type(password);
        await this.passwordConfirm.type(passwordConfirm);
        await this.btnDaftarMember.click();
    }

    getSuccessMember(){
        return this.successMember;
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

module.exports = {RegisterPageMember};