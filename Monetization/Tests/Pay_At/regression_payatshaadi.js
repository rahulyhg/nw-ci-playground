//comman library
const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

const Payment_Plans = require("../../WebPages/Payment_Plans_ReDesign");
const Payment_Cart = require("../../WebPages/Payment_Cart");


let login,pp1,pp2,env_site;
let address = "B, Ground Floor, Film Centre Building, 68 Tardeo Rd, Tardeo, Near AC Market, Mumbai, Maharashtra 400034";
let city = 'Mumbai';

    this['before'] = function(browser)
    {
        env_site = "http://www.shaadi.com"; 
        login = new Acquisition_Login(browser);
        menu = new Engagement_Menu(browser);
        pp1 = new Payment_Plans(browser);
        pp2 = new Payment_Cart(browser);
        
        login.quickLogin("pq19@bankas.in", "test");
    }

    this['beforeEach'] = function(browser)
    {
        pp2 = new Payment_Cart(browser);

        browser
        .url(env_site +"/payment")
        .waitForElementVisible("//div[@id='data_test_topband']");

        pp1.selectPremiumPlan("goldplus");
        browser.waitForElementVisible("//div[@id='creditCardTab']");
          
        pp2.clickPaymentTab("shaadi.com center");
    }

    
    this['verify all verify shaadi.com center without OTP'] = function(browser) 
    {
        pp2.setCenterCity('Agra');
        pp2.clickProceed();
    }     

    this['verify shaadi.com center with OTP'] = function(browser) 
    {  
        pp2.setCenterCity('Agra');
        pp2.clickProceed();
        pp2.setOTP(1,2,3,4);
        pp2.clickConfirmOrder_ShaadiCenter();
        browser.waitForElementVisible('//div[@id="otp_error"]/div')
        .assert.containsText('//div[@id="otp_error"]/div', 'The OTP you have entered is incorrect.')
        .pause(6500)
       
    }

  

