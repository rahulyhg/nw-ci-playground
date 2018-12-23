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
        //without OTP
        //login.quickLogin("snehak@bankas.in", "test");
        //With OTP
        login.quickLogin("pq19@bankas.in", "test");

    }

    this['beforeEach'] = function(browser)
    {
        browser
        .url(env_site +"/payment")
        .waitForElementVisible("//div[@id='data_test_topband']");

        pp1 =  new Payment_Plans(browser);
        pp1.selectPremiumPlan("goldplus");
        browser.waitForElementVisible("//div[@id='creditCardTab']");
        //pp2.clickPaymentTab("net banking");
        
        pp2.clickPaymentTab("pay at doorstep");
    }

    
    this['verify all verify payment at doorstep '] = function(browser) 
    {
        browser
        .waitForElementVisible('//*[@id="cust_city"]')
        .waitForElementVisible('//*[@id="PayNowBtn"]')
        .click('//*[@id="PayNowBtn"]')
        
        .assert.containsText('//div[@id="pay_city_error"]', 'Please select valid City.')
        .assert.containsText('//*[@id="pay_textarea_error"]', 'Please enter a valid Address.');

    }   
  
    this['verify all verify success payment at doorstep without OTP '] = function(browser) 
    {
        browser
        .waitForElementVisible('//*[@id="cust_city"]')
        .setValue('//*[@id="cust_city"]',city)
        .setValue('//*[@id="cust_address1"]', address)
        .waitForElementVisible('//*[@id="PayNowBtn"]')
        .click('//*[@id="PayNowBtn"]')
       .assert.containsText('//div[@class="sc-jnlKLf eGhcFh"]/span', 'Thank You! Your request has been received')
    }  
    
      
    this['verify all verify success payment at doorstep without OTP '] = function(browser) 
    {
        browser
        .waitForElementVisible('//*[@id="cust_city"]')
        .setValue('//*[@id="cust_city"]',city)
        .setValue('//*[@id="cust_address1"]', address)
        .waitForElementVisible('//*[@id="PayNowBtn"]')
        .click('//*[@id="PayNowBtn"]')
       .assert.containsText('//div[@class="sc-jnlKLf eGhcFh"]/span', 'Thank You! Your request has been received')
    }  
      
    this['verify error with OTP payment at doorstep'] = function(browser) 
    {
        browser
        .waitForElementVisible('//*[@id="cust_city"]')
        .setValue('//*[@id="cust_city"]',city)
        .setValue('//*[@id="cust_address1"]', address)
        .waitForElementVisible('//*[@id="PayNowBtn"]')
        .click('//*[@id="PayNowBtn"]')
        .waitForElementVisible('//*[@id="otp_1"]')
        .setValue('//*[@id="otp_1"]', '1')
        .waitForElementVisible('//*[@id="otp_2"]')
        .setValue('//*[@id="otp_2"]', '2')
        .waitForElementVisible('//*[@id="otp_3"]')
        .setValue('//*[@id="otp_3"]', '3')
        .waitForElementVisible('//*[@id="otp_4"]')
        .setValue('//*[@id="otp_4"]', '4')
        .waitForElementVisible('//*[@id="PayAtDoorStepBtn"]')
        .click('//*[@id="PayAtDoorStepBtn"]')
        .waitForElementVisible('//div[@id="otp_error"]/div')
        .assert.containsText('//div[@id="otp_error"]/div', 'The OTP you have entered is incorrect.')
       
    }

  

