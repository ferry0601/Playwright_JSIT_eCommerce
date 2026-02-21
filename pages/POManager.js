const {LoginPage} = require('./LoginPage');
const {RegisterPageCustomer} = require('./RegisterPageCustomer');
const {RegisterPageMitra} = require('./RegisterPageMitra');
const {RegisterPageMember} = require('./RegisterPageMember');
const {PublicPageMenuList} = require('./PublicPageMenu');
const {DashboardPage} = require('./DashboardPage');

class POManager{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.registerCustomer = new RegisterPageCustomer(this.page);
        this.registerMitra = new RegisterPageMitra(this.page);
        this.registerMember = new RegisterPageMember(this.page);
        this.publicPageMenu = new PublicPageMenuList(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        
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

    getPublicPageMenu(){
        return this.publicPageMenu;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }
}

module.exports = {POManager};