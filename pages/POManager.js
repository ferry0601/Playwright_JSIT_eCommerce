const {LoginPage} = require('./LoginPage');
const {RegisterPageCustomer} = require('./RegisterPageCustomer');
const {RegisterPageMitra} = require('./RegisterPageMitra');

class POManager{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.registerCustomer = new RegisterPageCustomer(this.page);
        this.registerMitra = new RegisterPageMitra(this.page);
        
    }

    getLoginPage(){
        return this.loginPage;
    }

    getRegisterCustomer(){
        return this.registerCustomer;
    }

    getRegisterMitra(){
        return this.registerMitra;
    }
}

module.exports = {POManager};