const Base_Test = require("../../../Base/Base_Test");
const profile_test_data = require("../../Tests/testdata_profile.js");
const test_data = require("../Payment_Cart/pp2_test_data.json");


let baseTest, env, test_url, AB;

module.exports = {
  '@tags': ['regression'],
  '@disabled': true,

    before : function(browser)
    {

        baseTest = new Base_Test(browser);
        env = baseTest.shaadiConfig.environment;
        test_url = baseTest.shaadiConfig.test_url;
        AB =  baseTest.shaadiConfig.AB;

        let username = profile_test_data["regression_credit"][AB][env][0];
        let pass = profile_test_data["regression_credit"][AB][env][1];

        baseTest.login.quickLogin(username, pass);
    },

    'Go to PP2 page' : function(browser) 
    {    
        browser
        .url(test_url + "/payment")
        .waitForElementVisible("//div[@data-test-selector='payment_card']");

        baseTest.pp1_revamp.selectPremiumPlan("gold");
        browser.waitForElementVisible("//div[@id='creditCardTab']");
    },



    'verify all errors when text input is blank ' : function(browser) 
    {
        baseTest.pp2.clickPaymentTab("debit card");
        baseTest.pp2.clickNext();

        browser
        .assert.containsText('//*[@id="credit_card_error"]/div',test_data["CreditCard_Error"]["CC_Num_Error"])
        .assert.containsText('//*[@id="month_year_error"]/div', test_data["CreditCard_Error"]["CC_Date_Error"])
        .assert.containsText('//*[@id="cvv_error"]/div', test_data["CreditCard_Error"]["CC_Cvv_Error"])
        .assert.containsText('//*[@id="cardholder_error"]/div', test_data["CreditCard_Error"]["CC_Name_Error"])
    },

    'verify debit card number error when blank' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//div[@id='creditCardTab']");
        
        baseTest.pp2.clickPaymentTab("debit card");

        //baseTest.pp2.setCardNumber(test_data["CreditCard_Details"]["Visa_CC_Num"]);
        baseTest.pp2.setCardMonth(test_data["CreditCard_Details"]["Visa_CC_Month"]);
        baseTest.pp2.setCardYear(test_data["CreditCard_Details"]["Visa_CC_Year"]);
        baseTest.pp2.setCVV(test_data["CreditCard_Details"]["Visa_CC_Cvv"]);
        //baseTest.pp2.setCardHolderName(test_data["CreditCard_Details"]["Visa_CC_Name"]);
        
        baseTest.pp2.clickNext();

        browser
        .assert.containsText('//*[@id="credit_card_error"]/div', test_data["CreditCard_Error"]["CC_Num_Error"]);
    },

    'verify debit card number error when invalid' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//div[@id='creditCardTab']");

        baseTest.pp2.clickPaymentTab("debit card");

        baseTest.pp2.setCardNumber(test_data["CreditCard_Details"]["Invalid_CC_Num"]);
        baseTest.pp2.setCardMonth(test_data["CreditCard_Details"]["Visa_CC_Month"]);
        baseTest.pp2.setCardYear(test_data["CreditCard_Details"]["Visa_CC_Year"]);
        baseTest.pp2.setCVV(test_data["CreditCard_Details"]["Visa_CC_Cvv"]);
        //baseTest.pp2.setCardHolderName(test_data["CreditCard_Details"]["Visa_CC_Name"]);
        
        baseTest.pp2.clickNext();

        browser
        .assert.containsText('//*[@id="credit_card_error"]/div', test_data["CreditCard_Error"]["CC_Num_Error"]);
    },

    'verify debit card date error when blank' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//div[@id='creditCardTab']");

        baseTest.pp2.clickPaymentTab("debit card");

        baseTest.pp2.setCardNumber(test_data["CreditCard_Details"]["Visa_CC_Num"]);
        baseTest.pp2.setCVV(test_data["CreditCard_Details"]["Visa_CC_Cvv"]);
        //baseTest.pp2.setCardHolderName(test_data["CreditCard_Details"]["Visa_CC_Name"]);
        
        baseTest.pp2.clickNext();

        browser
        .assert.containsText('//*[@id="month_year_error"]/div', test_data["CreditCard_Error"]["CC_Date_Error"]);
    },

    'verify debit card date error when invalid' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//div[@id='creditCardTab']");

        baseTest.pp2.clickPaymentTab("debit card");

        baseTest.pp2.setCardNumber(test_data["CreditCard_Details"]["Visa_CC_Num"]);
        baseTest.pp2.setCardMonth(test_data["CreditCard_Details"]["Invalid_CC_Month"]);
        baseTest.pp2.setCardYear(test_data["CreditCard_Details"]["Invalid_CC_Year"]);
        baseTest.pp2.setCVV(test_data["CreditCard_Details"]["Visa_CC_Cvv"]);
        //baseTest.pp2.setCardHolderName(test_data["CreditCard_Details"]["Visa_CC_Name"]);
        
        baseTest.pp2.clickNext();

        browser
        .assert.containsText('//*[@id="month_year_error"]/div', test_data["CreditCard_Error"]["CC_Date_Error"]);
    },

    'verify debit card CVV error when blank' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//div[@id='creditCardTab']");

        baseTest.pp2.clickPaymentTab("debit card");

        baseTest.pp2.setCardNumber(test_data["CreditCard_Details"]["Visa_CC_Num"]);
        baseTest.pp2.setCardMonth(test_data["CreditCard_Details"]["Visa_CC_Month"]);
        baseTest.pp2.setCardYear(test_data["CreditCard_Details"]["Visa_CC_Year"]);
        //baseTest.pp2.setCVV(test_data["CreditCard_Details"]["Visa_CC_Cvv"]);
        //baseTest.pp2.setCardHolderName(test_data["CreditCard_Details"]["Visa_CC_Name"]);
        
        baseTest.pp2.clickNext();

        browser
        .assert.containsText('//*[@id="cvv_error"]/div', test_data["CreditCard_Error"]["CC_Cvv_Error"]);
    },

    'verify debit card date error when invalid' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//div[@id='creditCardTab']");

        baseTest.pp2.clickPaymentTab("debit card");

        baseTest.pp2.setCardNumber(test_data["CreditCard_Details"]["Visa_CC_Num"]);
        baseTest.pp2.setCardMonth(test_data["CreditCard_Details"]["Invalid_CC_Month"]);
        baseTest.pp2.setCardYear(test_data["CreditCard_Details"]["Invalid_CC_Year"]);
        baseTest.pp2.setCVV(test_data["CreditCard_Details"]["Invalid_CC_CVV"]);
        //baseTest.pp2.setCardHolderName(test_data["CreditCard_Details"]["Visa_CC_Name"]);
        
        baseTest.pp2.clickNext();

        browser
        .assert.containsText('//*[@id="cvv_error"]/div', test_data["CreditCard_Error"]["CC_Cvv_Error"]);
    },

    'verify debit card Holder name error when blank' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//div[@id='creditCardTab']");

        baseTest.pp2.setCardNumber(test_data["CreditCard_Details"]["Visa_CC_Num"]);
        baseTest.pp2.setCardMonth(test_data["CreditCard_Details"]["Visa_CC_Month"]);
        baseTest.pp2.setCardYear(test_data["CreditCard_Details"]["Visa_CC_Year"]);
        //baseTest.pp2.setCVV(test_data["CreditCard_Details"]["Visa_CC_Cvv"]);
        //baseTest.pp2.setCardHolderName(test_data["CreditCard_Details"]["Visa_CC_Name"]);
        
        baseTest.pp2.clickNext();

        browser
        .assert.containsText('//*[@id="cardholder_error"]/div', test_data["CreditCard_Error"]["CC_Name_Error"]);
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
        .waitForElementVisible("//div[@id='creditCardTab']");
    }
}


