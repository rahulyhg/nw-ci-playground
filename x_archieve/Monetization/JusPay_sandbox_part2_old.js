//comman library
const Acquisition_Login = require("../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../Shared_Items/Comman_Library/Engagement_Menu");

const Payment_Plans = require("../../Monetization/WebPages/Payment_Plans_Zend")
const Payment_Cart = require("../../Monetization/WebPages/Payment_Cart_JusPay")

let pp1, pp2;

module.exports = {
  '@tags': ['JusPay'],
  '@disabled': true,

    'Go to cart page' : function(browser) 
    {
        login = new Acquisition_Login(browser);
        menu = new Engagement_Menu(browser);
        pp1 =  new Payment_Plans(browser);
        pp2 = new Payment_Cart(browser);

        let email_id = "email_JSH66949304@bankas.in";
        let pass = "test";

        login.quickLogin(email_id, pass);

        let myShaadi_selector = "//div[@id='my_shaadi_middle']";
        browser.waitForElementVisible(myShaadi_selector);

        browser
        .url("http://local.shaadi.com:3000/payment")
        .waitForElementPresent("//div[@id='data_test_SSP_GPlus']")
        .click("//div[@id='data_test_SSP_G3']")
        .waitForElementVisible("//button[@id='data_test_continue_SSP_G3']")
        .click("//button[@id='data_test_continue_SSP_G3']")
        .waitForElementVisible("//iframe[contains(@name,'card_number')]");

    },

    'On cart page, default Credit card payment option should be displayed.' : function(browser) 
    {
        browser
        .waitForElementPresent("//div[@id='creditCardTab']/parent::div[contains(@style,'border-left: 3px solid rgb(0, 188, 213)')]");
    },

    'the Button -Next- should be displayed Instead of Pay Now' : function(browser) 
    {
        browser
        .waitForElementPresent("//button[@id='PayNowBtn' and contains(text(),'Next')]");
    },

    'verify all error message' : function(browser) 
    {
        pp2 = new Payment_Cart(browser);

        pp2.clickNext();
        browser
            .assert.containsText('//*[@id="credit_card_error"]/div',"Please enter a valid Card number.")
            .assert.containsText('//*[@id="month_year_error"]/div', "Please select valid expiry date.")
            .assert.containsText('//*[@id="cvv_error"]/div', "Please enter a valid CVV number.")
            .assert.containsText('//*[@id="cardholder_error"]/div', "Please enter the name of card holder.");
    },

    'Verify error message Blank Card Number' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        //pp2.setCardNumber("4242424242424242");
        pp2.setCardMonth("12");
        pp2.setCardYear("20");
        pp2.setCVV("123");
        pp2.setCardHolderName("test abcd");
        pp2.clickNext();

        browser
        .assert.containsText('//*[@id="credit_card_error"]/div',"Please enter a valid Card number.");
    },

    'Verify error message 16 zero in Card Number' : +function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        pp2.setCardNumber("0000000000000000");
        pp2.setCardMonth("12");
        pp2.setCardYear("20");
        pp2.setCVV("123");
        pp2.setCardHolderName("test abcd");
        pp2.clickNext();
        
        browser
        .assert.containsText('//*[@id="credit_card_error"]/div',"Please enter a valid Card number.");
    },

    'Verify error message blank Month' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        pp2.setCardNumber("4242424242424242");
        //pp2.setCardMonth("12");
        pp2.setCardYear("20");
        pp2.setCVV("123");
        pp2.setCardHolderName("test abcd");
        pp2.clickNext();

        browser
        .assert.containsText('//*[@id="month_year_error"]/div',"Please select valid expiry date.");
    },

    'Verify error message Negative value in Month' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        pp2.setCardNumber("4242424242424242");
        pp2.setCardMonth("--");
        pp2.setCardYear("--");
        pp2.setCVV("123");
        pp2.setCardHolderName("test abcd");
        pp2.clickNext();

        browser
        .assert.containsText('//*[@id="month_year_error"]/div',"Please select valid expiry date.");
    },

    'Verify error message Zero value in Month' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        pp2.setCardNumber("4242424242424242");
        pp2.setCardMonth("00");
        pp2.setCardYear("00");
        pp2.setCVV("123");
        pp2.setCardHolderName("test abcd");
        pp2.clickNext();

        browser
            .assert.containsText('//*[@id="month_year_error"]/div',"Please select valid expiry date.");
    },

    'Verify error message 13 value in Month' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        pp2.setCardNumber("4242424242424242");
        pp2.setCardMonth("13");
        pp2.setCardYear("25");
        pp2.setCVV("123");
        pp2.setCardHolderName("test abcd");
        pp2.clickNext();

        browser
            .assert.containsText('//*[@id="month_year_error"]/div',"Please select valid expiry date.");
    },

    'Verify error message Previous year' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        pp2.setCardNumber("4242424242424242");
        pp2.setCardMonth("5");
        pp2.setCardYear("17");
        pp2.setCVV("123");
        pp2.setCardHolderName("test abcd");
        pp2.clickNext();

        browser
            .assert.containsText('//*[@id="month_year_error"]/div',"Please select valid expiry date.");
    },

    'Verify error message current year but previous month' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        pp2.setCardNumber("4242424242424242");
        pp2.setCardMonth("8");
        pp2.setCardYear("18");
        pp2.setCVV("123");
        pp2.setCardHolderName("test abcd");
        pp2.clickNext();

        browser
        .assert.containsText('//*[@id="month_year_error"]/div',"Please select valid expiry date.");
    },

    'Verify error message blank Year' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        pp2.setCardNumber("4242424242424242");
        pp2.setCardMonth("12");
        //pp2.setCardYear("18");
        pp2.setCVV("123");
        pp2.setCardHolderName("test abcd");
        pp2.clickNext();

        browser
        .assert.containsText('//*[@id="month_year_error"]/div',"Please select valid expiry date.");
    },

    'Verify error message blank CVV' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        pp2.setCardNumber("4242424242424242");
        pp2.setCardMonth("11");
        pp2.setCardYear("20");
        //pp2.setCVV("20");
        pp2.setCardHolderName("test abcd");
        pp2.clickNext();

        browser
        .assert.containsText('//*[@id="cvv_error"]/div',"Please enter a valid CVV number.");
    },

    'Verify error message 1 or 2 number in CVV' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        pp2.setCardNumber("4242424242424242");
        pp2.setCardMonth("11");
        pp2.setCardYear("20");
        pp2.setCVV("12");
        pp2.setCardHolderName("test abcd");
        pp2.clickNext();

        browser
        .assert.containsText('//*[@id="cvv_error"]/div',"Please enter a valid CVV number.");
    },

    'Verify error message 1 or 2 number in CVV' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        pp2.setCardNumber("4242424242424242");
        pp2.setCardMonth("11");
        pp2.setCardYear("20");
        pp2.setCVV("12");
        pp2.setCardHolderName("test abcd");
        pp2.clickNext();

        browser
        .assert.containsText('//*[@id="cvv_error"]/div',"Please enter a valid CVV number.");
    },

    'Verify error message more than 3 number in CVV' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        pp2.setCardNumber("123123143423423423434");
        pp2.setCardMonth("11");
        pp2.setCardYear("20");
        pp2.setCVV("1211");
        pp2.setCardHolderName("test abcd");
        pp2.clickNext();

        browser
        .assert.containsText('//*[@id="cvv_error"]/div',"Please enter a valid CVV number.");

    },

    'Verify error message Alpha char in CVV' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        pp2.setCardNumber("4242424242424242");
        pp2.setCardMonth("11");
        pp2.setCardYear("20");
        pp2.setCVV("abc");
        pp2.setCardHolderName("test abcd");
        pp2.clickNext();

        browser
        .assert.containsText('//*[@id="cvv_error"]/div',"Please enter a valid CVV number.");

    },

    'Verify message Alpha and number in Card Name' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        pp2.setCardNumber("4242424242424242");
        pp2.setCardMonth("11");
        pp2.setCardYear("20");
        pp2.setCVV("111");
        pp2.setCardHolderName("111 test abcd ");
        pp2.clickNext();

        browser
        .assert.containsText('//*[@id="cardholder_error"]/div', "Please enter the name of card holder.");
    },

    'Verify message 50 char in Card Name' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        pp2.setCardNumber("4242424242424242");
        pp2.setCardMonth("11");
        pp2.setCardYear("20");
        pp2.setCVV("111");
        pp2.setCardHolderName("dharam parmar dharam parmar dharam parmar dharam parmar dharam parmar");
        pp2.clickNext();

        browser
        .assert.containsText('//*[@id="cardholder_error"]/div', "Please enter the name of card holder.");
    }
};


