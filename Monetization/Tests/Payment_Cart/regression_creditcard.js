const Base_Test = require("../../../Base/Base_Test");
const test_data = require("../Payment_Cart/pp2_test_data.json");
const profile_test_data = require("../../Tests/testdata_profile.js");

let baseTest, env, test_url, AB;

module.exports = {
  '@tags': ['regression'],

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
        baseTest.pp2.clickNext();

        browser
        .assert.containsText('//*[@id="credit_card_error"]/div',test_data["CreditCard_Error"]["CC_Num_Error"])
        .assert.containsText('//*[@id="month_year_error"]/div', test_data["CreditCard_Error"]["CC_Date_Error"])
        .assert.containsText('//*[@id="cvv_error"]/div', test_data["CreditCard_Error"]["CC_Cvv_Error"])
        .assert.containsText('//*[@id="cardholder_error"]/div', test_data["CreditCard_Error"]["CC_Name_Error"])
    },

    'verify credit card number error when blank' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//div[@id='creditCardTab']");

        //baseTest.pp2.setCardNumber(test_data["CreditCard_Details"]["Visa_CC_Num"]);
        baseTest.pp2.setCardMonth(test_data["CreditCard_Details"]["Visa_CC_Month"]);
        baseTest.pp2.setCardYear(test_data["CreditCard_Details"]["Visa_CC_Year"]);
        baseTest.pp2.setCVV(test_data["CreditCard_Details"]["Visa_CC_Cvv"]);
        //baseTest.pp2.setCardHolderName(test_data["CreditCard_Details"]["Visa_CC_Name"]);
        
        baseTest.pp2.clickNext();

        browser
        .assert.containsText('//*[@id="credit_card_error"]/div', test_data["CreditCard_Error"]["CC_Num_Error"]);
    },

    'verify credit card number error when invalid' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//div[@id='creditCardTab']");

        baseTest.pp2.setCardNumber(test_data["CreditCard_Details"]["Invalid_CC_Num"]);
        baseTest.pp2.setCardMonth(test_data["CreditCard_Details"]["Visa_CC_Month"]);
        baseTest.pp2.setCardYear(test_data["CreditCard_Details"]["Visa_CC_Year"]);
        baseTest.pp2.setCVV(test_data["CreditCard_Details"]["Visa_CC_Cvv"]);
        //baseTest.pp2.setCardHolderName(test_data["CreditCard_Details"]["Visa_CC_Name"]);
        
        baseTest.pp2.clickNext();

        browser
        .assert.containsText('//*[@id="credit_card_error"]/div', test_data["CreditCard_Error"]["CC_Num_Error"]);
    },

    'verify credit card date error when blank' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//div[@id='creditCardTab']");

        baseTest.pp2.setCardNumber(test_data["CreditCard_Details"]["Visa_CC_Num"]);
        baseTest.pp2.setCVV(test_data["CreditCard_Details"]["Visa_CC_Cvv"]);
        //baseTest.pp2.setCardHolderName(test_data["CreditCard_Details"]["Visa_CC_Name"]);
        
        baseTest.pp2.clickNext();

        browser
        .assert.containsText('//*[@id="month_year_error"]/div', test_data["CreditCard_Error"]["CC_Date_Error"]);
    },

    'verify credit card date error when invalid' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//div[@id='creditCardTab']");

        baseTest.pp2.setCardNumber(test_data["CreditCard_Details"]["Visa_CC_Num"]);
        baseTest.pp2.setCardMonth(test_data["CreditCard_Details"]["Invalid_CC_Month"]);
        baseTest.pp2.setCardYear(test_data["CreditCard_Details"]["Invalid_CC_Year"]);
        baseTest.pp2.setCVV(test_data["CreditCard_Details"]["Visa_CC_Cvv"]);
        //baseTest.pp2.setCardHolderName(test_data["CreditCard_Details"]["Visa_CC_Name"]);
        
        baseTest.pp2.clickNext();

        browser
        .assert.containsText('//*[@id="month_year_error"]/div', test_data["CreditCard_Error"]["CC_Date_Error"]);
    },

    'verify credit card CVV error when blank' :+function(browser) 
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
        .assert.containsText('//*[@id="cvv_error"]/div', test_data["CreditCard_Error"]["CC_Cvv_Error"]);
    },

    'verify credit card date error when invalid' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//div[@id='creditCardTab']");

        baseTest.pp2.setCardNumber(test_data["CreditCard_Details"]["Visa_CC_Num"]);
        baseTest.pp2.setCardMonth(test_data["CreditCard_Details"]["Invalid_CC_Month"]);
        baseTest.pp2.setCardYear(test_data["CreditCard_Details"]["Invalid_CC_Year"]);
        baseTest.pp2.setCVV(test_data["CreditCard_Details"]["Invalid_CC_CVV"]);
        //baseTest.pp2.setCardHolderName(test_data["CreditCard_Details"]["Visa_CC_Name"]);
        
        baseTest.pp2.clickNext();

        browser
        .assert.containsText('//*[@id="cvv_error"]/div', test_data["CreditCard_Error"]["CC_Cvv_Error"]);
    },

    'verify credit card Holder name error when blank' : function(browser) 
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

        browser.assert.containsText('//*[@id="cardholder_error"]/div', test_data["CreditCard_Error"]["CC_Name_Error"]);
    },

    'Enter debit card details and than click click card - the details should not be displayed': function (browser) {
        
        browser
            .refresh()
            .waitForElementVisible("//div[@id='creditCardTab']");
        
        baseTest.pp2.clickPaymentTab("debit card");

        baseTest.pp2.setCardNumber("4242424242424242");
        baseTest.pp2.setCardMonth("12");
        baseTest.pp2.setCardYear("23");
        baseTest.pp2.setCVV("123");
        baseTest.pp2.setCardHolderName("test abcd");

        baseTest.pp2.clickPaymentTab("credit card");
        browser.pause(400);

        browser.getAttribute("xpath",'//input[@id="cc_num"]',"value", (res) => {
            browser.assert.deepEqual(res.value, "", "credit card should be empty");
        });

        browser.getAttribute("xpath",'//input[@id="cc_cvv"]',"value", (res) => {
            browser.assert.deepEqual(res.value, "", "CVV should be empty");
        });

        browser.getAttribute("xpath",'//input[@id="cc_card_holder_name"]',"value", (res) => {
            browser.assert.deepEqual(res.value, "", "credit card name should be empty");
        });
    }
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