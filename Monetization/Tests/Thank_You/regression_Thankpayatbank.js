//comman library
const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

const Payment_Plans = require("../../WebPages/Payment_Plans_Zend");
const Payment_Cart = require("../../WebPages/Payment_Cart");

let login,pp1,pp2,env_site;
let address = "B, Ground Floor, Film Centre Building, 68 Tardeo Rd, Tardeo, Near AC Market, Mumbai, Maharashtra 400034";
let city = 'Mumbai';
let total,TotalAmount;
    this['before'] = function(browser)
    {
        env_site = "http://www.shaadi.com"; 
        login = new Acquisition_Login(browser);
        menu = new Engagement_Menu(browser);
        pp1 = new Payment_Plans(browser);
        pp2 = new Payment_Cart(browser);
        //without OTP
        login.quickLogin("snehak@bankas.in", "test");
        //With OTP
        //login.quickLogin("pq19@bankas.in", "test");

    }

    this['beforeEach'] = async function(browser)
    {
        browser
        .url(env_site +"/payment")
        .waitForElementVisible("//div[@id='tabsMaincontent-1']");
        pp1 =  new Payment_Plans(browser);
        pp1.selectPremiumPlan("goldplus");
        total = await pp2.getTotalAmount();
        console.log(total);
        browser.waitForElementVisible("//div[@id='creditCardTab']")
        pp2.clickPaymentTab("payment at bank");
    }
 
    this['verify all verify payment at bank without OTP'] = function(browser) 
    {
        browser
        .waitForElementVisible('//input[@id="cust_name"]')
        .waitForElementVisible('//input[@id="cust_phone"]')
        pp2.clickProceed();
        browser
        .pause(2000)
        .assert.urlContains('thank')
        .assert.containsText('//div[@class="sc-jnlKLf eGhcFh"]/span', 'Thank You! Your request has been received')
        browser.waitForElementVisible('//div[@id="data_test_value_selected_plan"]')
        .assert.containsText('//div[@id="data_test_value_selected_plan"]', 'Gold Plus (3 months)')
       .getText('//*[@id="data_test_value_total_amount"]', function (totalamount) {
				TotalAmount = totalamount.value;
                console.log(TotalAmount);
                browser.assert.deepEqual(total,TotalAmount,"Equal amount");
         });
}


