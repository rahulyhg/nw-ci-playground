//comman library
const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

const Payment_Plans = require("../../WebPages/Payment_Plans_Zend")
const Payment_Cart = require("../../WebPages/Payment_Cart_JusPay")
const profile_test_data = require("../../Tests/testdata_profile.js");

let pp1, pp2;

module.exports = {
  '@tags': ['JusPay'],
  '@disabled': true,

    before : function(browser)
    {
        login = new Acquisition_Login(browser);
        menu = new Engagement_Menu(browser);
        pp1 =  new Payment_Plans(browser);
        pp2 = new Payment_Cart(browser);

        test_url = browser.globals.local_url3000;
        env = "SANDBOX";

        if(!browser.globals.local_test)
        {
            test_url = browser.globals.prod_url_my;
            env = "PRD";
        }
        
        let username = profile_test_data["juspay"][env][0];
        let pass = profile_test_data["juspay"][env][1];

        login.quickLogin(username, pass);
    },

    'Go to cart page' : function(browser) 
    {
        

        browser
        .url(test_url + "/payment")
        .waitForElementPresent("//div[@id='data_test_SSP_GPlus']");

        selectPlan(browser, "gold");
    },

    'Submit CC information' : function(browser) 
    {
        pp2 = new Payment_Cart(browser);

        pp2.setCardNumber("4242424242424242");
        pp2.setCardMonth("12");
        pp2.setCardYear("23");
        pp2.setCVV("123");
        pp2.setCardHolderName("test abcd");

        pp2.clickNext();

    },

    'Verify JusPay API' : function(browser)
    {
        browser
        .waitForElementNotPresent("//div[@id='root']")
        .assert.urlContains("api.juspay.in")
        .pause(4000);
    },

    'Verify decline message' : function(browser)
    {
        browser
        .url(test_url + "/cart")
        .waitForElementVisible("//span[text()='Transaction cancelled. Please try another payment method.']");
    },

    'Blank Expiry month and Year, CVV in Maestro – it should not be shown error.' : function(browser)
    {
        browser
        .url(test_url + "/payment")
        .waitForElementPresent("//div[@id='data_test_SSP_GPlus']")
        
        selectPlan(browser, "gold");

        pp2.setCardNumber("6759649826438453");
        pp2.setCardHolderName("test 123");

        pp2.clickNext();

        browser.waitForElementNotPresent("//div[text() = 'Please select valid expiry date.']");
        browser.waitForElementNotPresent("//div[text() = 'Please enter a valid CVV number.']");
    },

    'Blank Expiry month and Year, CVV in Maestro – it should be redirected on Gateway.' : function(browser)
    {
        browser.waitForElementNotPresent("//div[@id='root']");
        browser.assert.urlContains("api.juspay.in");
    },

    'Enter Credit card details and then click Debit card - the details should not be displayed' : function(browser)
    {
        pp2 = new Payment_Cart(browser);

        browser
        .url(test_url + "/payment")
        .waitForElementPresent("//div[@id='data_test_SSP_GPlus']")
        
        selectPlan(browser, "gold");

        pp2.setCardNumber("4242424242424242");
        pp2.setCardMonth("12");
        pp2.setCardYear("23");
        pp2.setCVV("123");
        pp2.setCardHolderName("test abcd");
    
        pp2.clickPaymentTab("debit card");

        browser
        .element("xpath","//iframe[contains(@name,'card_number')]", (res) => {
            browser.frame(res.value);
            
            browser.getValue("//input[@id='card_number']", function(res){
                console.log("CC : " + res.value);
                browser.assert.deepEqual(res.value,"","debit card should be empty");
            })
            browser.frameParent();
        });

        browser
        .element("xpath","//iframe[contains(@name,'card_exp_month')]", (res) => {
            browser.frame(res.value);
            
            browser.getValue("//input[@id='card_exp_month']", function(res){
                console.log("month : " + res.value);
                browser.assert.deepEqual(res.value,"","month should be empty");
            })

            browser.frameParent();
        });

        browser
        .element("xpath","//iframe[contains(@name,'card_exp_year')]", (res) => {
            browser.frame(res.value);
            
            browser.getValue("//input[@id='card_exp_year']", function(res){
                console.log("year : " + res.value);
                browser.assert.deepEqual(res.value,"","year should be empty");
            })

            browser.frameParent();
        });

        browser
        .element("xpath","//iframe[contains(@name,'security_code')]", (res) => {
            browser.frame(res.value);
            
            browser.getValue("//input[@id='security_code']", function(res){
                console.log("CVV : " + res.value);
                browser.assert.deepEqual(res.value,"","CVV should be empty");
            })

            browser.frameParent();
        });

        browser
        .element("xpath","//iframe[contains(@name,'name_on_card')]", (res) => {
            browser.frame(res.value);
            
            browser.getValue("//input[@id='name_on_card']", function(res){
                console.log("Name : " + res.value);
                browser.assert.deepEqual(res.value,"","Name should be empty");
            })

            browser.frameParent();
        });

    },

    'Enter debit card details and than click click card - the details should not be displayed' : function(browser)
    {
        pp2 = new Payment_Cart(browser);

        browser
        .url(test_url + "/payment")
        .waitForElementPresent("//div[@id='data_test_SSP_GPlus']")
        
        selectPlan(browser, "gold");

        pp2.clickPaymentTab("debit card");

        pp2.setCardNumber("4242424242424242");
        pp2.setCardMonth("12");
        pp2.setCardYear("23");
        pp2.setCVV("123");
        pp2.setCardHolderName("test abcd");
    
        pp2.clickPaymentTab("credit card");

        browser
        .element("xpath","//iframe[contains(@name,'card_number')]", (res) => {
            browser
            .frame(res.value);
            
            browser.getValue("//input[@id='card_number']", function(res){
                console.log("CC : " + res.value);
                browser.assert.deepEqual(res.value,"","debit card should be empty");
            })

            browser.frameParent();
        });

        browser
        .element("xpath","//iframe[contains(@name,'card_exp_month')]", (res) => {
            browser
            .frame(res.value);
            
            browser.getValue("//input[@id='card_exp_month']", function(res){
                console.log("month : " + res.value);
                browser.assert.deepEqual(res.value,"","month should be empty");
            })

            browser.frameParent();
        });

        browser
        .element("xpath","//iframe[contains(@name,'card_exp_year')]", (res) => {
            browser
            .frame(res.value);
            
            browser.getValue("//input[@id='card_exp_year']", function(res){
                console.log("year : " + res.value);
                browser.assert.deepEqual(res.value,"","year should be empty");
            })

            browser.frameParent();
        });

        browser
        .element("xpath","//iframe[contains(@name,'security_code')]", (res) => {
            browser
            .frame(res.value);
            
            browser.getValue("//input[@id='security_code']", function(res){
                console.log("CVV : " + res.value);
                browser.assert.deepEqual(res.value,"","CVV should be empty");
            })

            browser.frameParent();
        });

        browser
        .element("xpath","//iframe[contains(@name,'name_on_card')]", (res) => {
            browser
            .frame(res.value);
            
            browser.getValue("//input[@id='name_on_card']", function(res){
                console.log("Name : " + res.value);
                browser.assert.deepEqual(res.value,"","Name should be empty");
            })

            browser.frameParent();
        });
    },

    'Verify Meastro card gateway - citruspay' : +function(browser) 
    {
        baseTest.pp2.clickPaymentTab("debit card");
        baseTest.pp2.setCardNumber(test_data["DebitCard_Details"]["Maestro_card"]);
        baseTest.pp2.setCardHolderName(test_data["DebitCard_Details"]["Visa_CC_Name"]);

        baseTest.pp2.clickNext();
        browser.assert.urlContains('citruspay');

        browser
        .waitForElementNotPresent("//div[@id='creditCardTab']")
        .waitForElementVisible("//div[@id='creditCardTab']")
        .waitForElementVisible("//span[text()='Bank Declined transaction. Try another card.']");

    },

    'Verify Rupay card gateway - citruspay' : +function(browser) 
    {
        baseTest.pp2.clickPaymentTab("debit card");
        baseTest.pp2.setCardNumber(test_data["DebitCard_Details"]["Rupay"]);
        baseTest.pp2.setCardMonth(test_data["DebitCard_Details"]["Visa_CC_Month"]);
        baseTest.pp2.setCardYear(test_data["DebitCard_Details"]["Visa_CC_Year"]);
        baseTest.pp2.setCVV(test_data["DebitCard_Details"]["Visa_CC_Cvv"]);
        baseTest.pp2.setCardHolderName(test_data["DebitCard_Details"]["Visa_CC_Name"]);

        baseTest.pp2.clickNext();
        browser.assert.urlContains('citruspay');

    },

    'Verify decline message for MIG gateway' : +function(browser) 
    {
        browser
        .url(test_url + "/cart")
        .waitForElementVisible("//div[@id='creditCardTab']");

        baseTest.pp2.setCardNumber(test_data["CreditCard_Details"]["Decline_Visa_CC_Num"]);
        baseTest.pp2.setCardMonth(test_data["CreditCard_Details"]["Visa_CC_Month"]);
        baseTest.pp2.setCardYear(test_data["CreditCard_Details"]["Visa_CC_Year"]);
        baseTest.pp2.setCVV(test_data["CreditCard_Details"]["Visa_CC_Cvv"]);
        baseTest.pp2.setCardHolderName(test_data["CreditCard_Details"]["Visa_CC_Name"]);

        baseTest.pp2.clickNext();
        
        browser
        .waitForElementNotPresent("//div[@id='creditCardTab']")
        .waitForElementVisible("//div[@id='creditCardTab']")
        .waitForElementVisible("//span[text()='Transaction cancelled. Please try another payment method.']");

    },

    'Verify MIG gateway for credit card' : +function(browser) 
    {
        baseTest.pp2.setCardNumber(test_data["CreditCard_Details"]["Visa_CC_Num"]);
        baseTest.pp2.setCardMonth(test_data["CreditCard_Details"]["Visa_CC_Month"]);
        baseTest.pp2.setCardYear(test_data["CreditCard_Details"]["Visa_CC_Year"]);
        baseTest.pp2.setCVV(test_data["CreditCard_Details"]["Visa_CC_Cvv"]);
        baseTest.pp2.setCardHolderName(test_data["CreditCard_Details"]["Visa_CC_Name"]);

        baseTest.pp2.clickNext();
        browser.assert.urlContains('https://migs.mastercard.com.au');

    },

    'verify if the card is block than  payment is not success and verify the declined message' : +function(browser) 
    {
        let CC = "4757145382500312"; //satandar

        browser
        .url(test_url + "/payment")
        .waitForElementPresent("//div[@id='data_test_SSP_GPlus']")
        
        selectPlan(browser, "gold");

        pp2.setCardNumber("4757145382500312");
        pp2.setCardMonth("09");
        pp2.setCardYear("19");
        pp2.setCVV("146");
        pp2.setCardHolderName("HR P D Anand");

        pp2.clickNext();

        
        browser.waitForElementNotPresent("//div[@id='root']");
        browser.assert.urlContains("api.juspay.in")
        browser.pause(4000);

        browser
        .url(test_url + "/cart")
        .waitForElementVisible("//span[text()='Transaction cancelled. Please try another payment method.']");

    },

};

function selectPlan(client,plan)
{
    if(plan == "gold")
    {
        client
        .click("//div[@id='data_test_SSP_G3']")
        .waitForElementVisible("//button[@id='data_test_continue_SSP_G3']")
        .click("//button[@id='data_test_continue_SSP_G3']")
        .waitForElementVisible("//iframe[contains(@name,'card_number')]");
    }
}


