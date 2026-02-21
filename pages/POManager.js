const {LoginPage} = require('./LoginPage');
const {RegisterPageCustomer} = require('./RegisterPageCustomer');
const {RegisterPageMitra} = require('./RegisterPageMitra');
const {RegisterPageMember} = require('./RegisterPageMember');
const {PublicPage} = require('./PublicPage');

class POManager{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.registerCustomer = new RegisterPageCustomer(this.page);
        this.registerMitra = new RegisterPageMitra(this.page);
        this.registerMember = new RegisterPageMember(this.page);
        this.publicPage = new PublicPage(this.page);
        
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

    getRegisterMember(){
        return this.registerMember;
    }

    getPublicPage(){
        return this.publicPage;
    }
}

module.exports = {POManager};