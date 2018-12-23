//comman library
const _shaadiConfig = require("../shaadi.conf");

//comman
const Acquisition_Login = require("../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../Shared_Items/Comman_Library/Engagement_Menu");

//PP1
const Payment_Plans_ReDesign = require("../Monetization/WebPages/Payment_Plans_ReDesign");

//PP2
const Payment_Cart = require("../Monetization/WebPages/Payment_Cart");
const Payment_Cart_JusPay = require("../Monetization/WebPages/Payment_Cart_JusPay");

class BaseTest
{
    constructor(browser)
    {
        this.login = new Acquisition_Login(browser);
        this.menu = new Engagement_Menu(browser);
        this.pp1_revamp = new Payment_Plans_ReDesign(browser);
        this.pp2 = new Payment_Cart(browser);
        this.pp2_JusPay = new Payment_Cart_JusPay(browser);

        this.shaadiConfig = _shaadiConfig;
    }
}

module.exports = BaseTest;