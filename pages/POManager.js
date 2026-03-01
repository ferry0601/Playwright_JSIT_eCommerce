const {LoginPage} = require('./LoginPage');
const {RegisterPageCustomer} = require('./RegisterPageCustomer');
const {RegisterPageMitra} = require('./RegisterPageMitra');
const {RegisterPageMember} = require('./RegisterPageMember');
const {PublicPageMenuList} = require('./PublicPageMenu');
const {DashboardPage} = require('./DashboardPage');
const {ECommercePage} = require('./ECommercePage');
const {FilterProductPage} = require('./FilterProductPage');
const {AddCartPage} = require('./AddCartPage');

class POManager{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.registerCustomer = new RegisterPageCustomer(this.page);
        this.registerMitra = new RegisterPageMitra(this.page);
        this.registerMember = new RegisterPageMember(this.page);
        this.publicPageMenu = new PublicPageMenuList(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.eCommercePage = new ECommercePage(this.page);
        this.filterproductPage = new FilterProductPage(this.page);
        this.addCartPage = new AddCartPage(this.page);
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
    
    getECommercePage(){
        return this.eCommercePage;
    }

    getFilterPage(){
        return this.filterproductPage;
    }

    getAddCartPage(){
        return this.addCartPage;
    }
}

module.exports = {POManager};