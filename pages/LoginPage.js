
class LoginPage{
    constructor(page){
        this.page = page;
        this.email = page.getByRole('textbox',{name:'Email'});
        this.password = page.getByRole('textbox',{name:'Password'});
        this.btnLogin = page.getByRole('button',{name:'Masuk'});
        this.logotext = page.getByText('Koperasi JSIT', { exact: true });
        this.errorLogin = page.locator('.border.px-4.py-3.rounded-lg.mb-6');
        this.userDropdown = page.locator('#user-dropdown-container');
        this.logout = page.getByRole('link',{name:'Keluar'});

    }

    async GoTo(){
        await this.page.goto('https://demo.koperasijsit.id/login');
    }

    async submitForm(email,password){
        await this.email.type(email);
        await this.password.type(password);
        await this.btnLogin.click();
    }

    getErrorLogin(){
        return this.errorLogin;
    }

    getSuccessLogin(){
        return this.logotext;
    }

    async logOut(){
        await this.userDropdown.waitFor();
        await this.userDropdown.click();
        await this.logout.click();
    }

    
}

module.exports = {LoginPage};