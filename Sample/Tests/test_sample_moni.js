// comman library
const Acquisition_Login = require("../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../Shared_Items/Comman_Library/Engagement_Menu");

//monization library
const Payment_Plans = require("../../Monetization/WebPages/Payment_Plans_Zend");
const Payment_Cart = require("../../Monetization/WebPages/Payment_Cart");

//test data
const test_data = require("./Moni_Test_Data.json")

module.exports = 
{
  '@tags': ['sample'],

  'Verify Pay at Door city error' : (browser) =>
  {
    //object initialize
    const login = new Acquisition_Login(browser);
    const menu = new Engagement_Menu(browser);
    const payment_plan = new Payment_Plans(browser);
    const payment_cart = new Payment_Cart(browser);

    let username = test_data["login_credentials"]["username"];
    let pass = test_data["login_credentials"]["password"];
    login.quickLogin(username, pass);

    browser.url("https://www.shaadi.com/payment");

    let plan_type = test_data["plan_type"];
    payment_plan.selectPlan(plan_type);

    payment_cart.payDoorCityError(test_data["paydoor_city_error"]);
  }
};
