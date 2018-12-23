const profile_test_data = require("../../Tests/testdata_profile.js");
const Base_Test = require("../../../Base/Base_Test");

let baseTest, env, test_url, AB;

module.exports = {
    '@tags': ['regression'],

    before: function (browser) {
        baseTest = new Base_Test(browser);
        env = baseTest.shaadiConfig.environment;
        test_url = baseTest.shaadiConfig.test_url;
        AB = baseTest.shaadiConfig.AB;

        let username = profile_test_data["juspay"][AB][env][0];
        let pass = profile_test_data["juspay"][AB][env][1];

        baseTest.login.quickLogin(username, pass);
    },

    'Go to cart page': function (browser) {
        browser
            .url(test_url + "/payment")
            .waitForElementVisible("//div[@data-test-selector='payment_card']");

        baseTest.pp1_revamp.selectPremiumPlan("gold");
        browser.waitForElementVisible("//div[@id='creditCardTab']");
    },

    'On cart page, default Credit card payment option should be displayed.': function (browser) {
        browser
            .waitForElementPresent("//div[@id='creditCardTab']/parent::div[contains(@style,'border-left: 3px solid rgb(0, 188, 213)')]");
    },

    'the Button -Next- should be displayed Instead of Pay Now': function (browser) {
        browser
            .waitForElementPresent("//button[@id='PayNowBtn' and contains(text(),'Next')]");
    },

    'Verify all entry should be blank and click on next button it should show error message.': function (browser) {

        baseTest.pp2_JusPay.clickNext();
        browser
            .assert.containsText('//*[@id="credit_card_error"]/div', "Please enter a valid Card number.")
            .assert.containsText('//*[@id="month_year_error"]/div', "Please select valid expiry date.")
            .assert.containsText('//*[@id="cvv_error"]/div', "Please enter a valid CVV number.")
            .assert.containsText('//*[@id="cardholder_error"]/div', "Please enter the name of card holder.");
    },

    'Verify only card number is blank and click on next button it should show error message.': function (browser) {
        browser
            .refresh()
            .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        //baseTest.pp2.setCardNumber("4242424242424242");
        baseTest.pp2_JusPay.setCardMonth("12");
        baseTest.pp2_JusPay.setCardYear("20");
        baseTest.pp2_JusPay.setCVV("123");
        baseTest.pp2_JusPay.setCardHolderName("test abcd");
        baseTest.pp2_JusPay.clickNext();

        browser
            .waitForElementPresent("//div[@id='creditCardTab']/parent::div[contains(@style,'border-left: 3px solid rgb(0, 188, 213)')]")
            .assert.containsText('//*[@id="credit_card_error"]/div', "Please enter a valid Card number.");
    },

    'Verify no error message 16 zero in Card Number': function (browser) {
        browser
            .refresh()
            .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        baseTest.pp2_JusPay.setCardNumber("00000000000000000000000");
        baseTest.pp2_JusPay.setCardMonth("12");
        baseTest.pp2_JusPay.setCardYear("20");
        //baseTest.pp2_JusPay.setCVV("123");
        baseTest.pp2_JusPay.setCardHolderName("test abcd");
        baseTest.pp2_JusPay.clickNext();

        browser
            .assert.containsText('//*[@id="credit_card_error"]/div', "");
    },

    'verify only month is blank and click on next button it should show error message.': function (browser) {
        browser
            .refresh()
            .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        baseTest.pp2_JusPay.setCardNumber("4242424242424242");
        //baseTest.pp2.setCardMonth("12");
        baseTest.pp2_JusPay.setCardYear("20");
        baseTest.pp2_JusPay.setCVV("123");
        baseTest.pp2_JusPay.setCardHolderName("test abcd");
        baseTest.pp2_JusPay.clickNext();

        browser
            .assert.containsText('//*[@id="month_year_error"]/div', "Please select valid expiry date.");
    },

    'Verify error message Negative value in Month': function (browser) {
        browser
            .refresh()
            .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        baseTest.pp2_JusPay.setCardNumber("4242424242424242");
        baseTest.pp2_JusPay.setCardMonth("--");
        baseTest.pp2_JusPay.setCardYear("--");
        baseTest.pp2_JusPay.setCVV("123");
        baseTest.pp2_JusPay.setCardHolderName("test abcd");
        baseTest.pp2_JusPay.clickNext();

        browser
            .assert.containsText('//*[@id="month_year_error"]/div', "Please select valid expiry date.");
    },

    'Verify error message Zero value in Month': function (browser) {
        browser
            .refresh()
            .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        baseTest.pp2_JusPay.setCardNumber("4242424242424242");
        baseTest.pp2_JusPay.setCardMonth("00");
        baseTest.pp2_JusPay.setCardYear("00");
        baseTest.pp2_JusPay.setCVV("123");
        baseTest.pp2_JusPay.setCardHolderName("test abcd");
        baseTest.pp2_JusPay.clickNext();

        browser
            .assert.containsText('//*[@id="month_year_error"]/div', "Please select valid expiry date.");
    },

    'Verify error message 13 value in Month and click on next button it should show error message.': function (browser) {
        browser
            .refresh()
            .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        baseTest.pp2_JusPay.setCardNumber("4242424242424242");
        baseTest.pp2_JusPay.setCardMonth("13");
        baseTest.pp2_JusPay.setCardYear("25");
        baseTest.pp2_JusPay.setCVV("123");
        baseTest.pp2_JusPay.setCardHolderName("test abcd");
        baseTest.pp2_JusPay.clickNext();

        browser
            .assert.containsText('//*[@id="month_year_error"]/div', "Please select valid expiry date.");
    },

    'Verify previous month and previous year and click on next button it should show error message.': function (browser) {
        browser
            .refresh()
            .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        baseTest.pp2_JusPay.setCardNumber("4242424242424242");
        baseTest.pp2_JusPay.setCardMonth("5");
        baseTest.pp2_JusPay.setCardYear("17");
        baseTest.pp2_JusPay.setCVV("123");
        baseTest.pp2_JusPay.setCardHolderName("test abcd");
        baseTest.pp2_JusPay.clickNext();

        browser
            .assert.containsText('//*[@id="month_year_error"]/div', "Please select valid expiry date.");
    },

    'Verify previous month of the same year and click on next button it should show error message.': function (browser) {
        browser
            .refresh()
            .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        baseTest.pp2_JusPay.setCardNumber("4242424242424242");
        baseTest.pp2_JusPay.setCardMonth("8");
        baseTest.pp2_JusPay.setCardYear("18");
        baseTest.pp2_JusPay.setCVV("123");
        baseTest.pp2_JusPay.setCardHolderName("test abcd");
        baseTest.pp2_JusPay.clickNext();

        browser
            .assert.containsText('//*[@id="month_year_error"]/div', "Please select valid expiry date.");
    },

    'verify only year is blank and click on next button it should show error message.': function (browser) {
        browser
            .refresh()
            .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        baseTest.pp2_JusPay.setCardNumber("4242424242424242");
        baseTest.pp2_JusPay.setCardMonth("12");
        //baseTest.pp2.setCardYear("18");
        baseTest.pp2_JusPay.setCVV("123");
        baseTest.pp2_JusPay.setCardHolderName("test abcd");
        baseTest.pp2_JusPay.clickNext();

        browser
            .assert.containsText('//*[@id="month_year_error"]/div', "Please select valid expiry date.");
    },

    'Verify cvv number is blank and click on next button it should showerror message.': function (browser) {
        browser
            .refresh()
            .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        baseTest.pp2_JusPay.setCardNumber("4242424242424242");
        baseTest.pp2_JusPay.setCardMonth("11");
        baseTest.pp2_JusPay.setCardYear("20");
        //baseTest.pp2.setCVV("20");
        baseTest.pp2_JusPay.setCardHolderName("test abcd");
        baseTest.pp2_JusPay.clickNext();

        browser
            .assert.containsText('//*[@id="cvv_error"]/div', "Please enter a valid CVV number.");
    },

    'Verify error message 1 or 2 number in CVV': function (browser) {
        browser
            .refresh()
            .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        baseTest.pp2_JusPay.setCardNumber("4242424242424242");
        baseTest.pp2_JusPay.setCardMonth("11");
        baseTest.pp2_JusPay.setCardYear("20");
        baseTest.pp2_JusPay.setCVV("12");
        baseTest.pp2_JusPay.setCardHolderName("test abcd");
        baseTest.pp2_JusPay.clickNext();

        browser
            .assert.containsText('//*[@id="cvv_error"]/div', "Please enter a valid CVV number.");
    },

    'verify Amex Card not supported' : function(browser) 
    {
        browser
        .refresh()
        .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        baseTest.pp2_JusPay.setCardNumber("378282246310005");
        baseTest.pp2_JusPay.setCardMonth("11");
        baseTest.pp2_JusPay.setCardYear("20");
        baseTest.pp2_JusPay.setCVV("1111");
        baseTest.pp2_JusPay.setCardHolderName("abcd 123");
        baseTest.pp2_JusPay.clickNext();
 
        //baseTest.pp2_JusPay.clickNext();

        browser
        .assert.containsText('//*[@id="credit_card_error"]/div', "This card is not supported.");
    },

    'Verify no error message more than 3 number in CVV': function (browser) //focus get lost
    {
        browser
            .refresh()
            .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        baseTest.pp2_JusPay.setCardNumber("123123143423423423434");
        baseTest.pp2_JusPay.setCardMonth("11");
        baseTest.pp2_JusPay.setCardYear("20");
        baseTest.pp2_JusPay.setCVV("1211");
        //baseTest.pp2_JusPay.setCardHolderName("test abcd");
        baseTest.pp2_JusPay.clickNext();

        browser
            .assert.containsText('//*[@id="cvv_error"]/div', "");

    },

    'Verify error message Alpha char in CVV': function (browser) {
        browser
            .refresh()
            .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        baseTest.pp2_JusPay.setCardNumber("4242424242424242");
        baseTest.pp2_JusPay.setCardMonth("11");
        baseTest.pp2_JusPay.setCardYear("20");
        baseTest.pp2_JusPay.setCVV("abc");
        baseTest.pp2_JusPay.setCardHolderName("test abcd");
        baseTest.pp2_JusPay.clickNext();

        browser
            .assert.containsText('//*[@id="cvv_error"]/div', "Please enter a valid CVV number.");

    },

    'Verify no error message Alpha and number in Card holder Name': function (browser) {
        browser
            .refresh()
            .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        baseTest.pp2_JusPay.setCardNumber("4242424242424242");
        baseTest.pp2_JusPay.setCardMonth("11");
        baseTest.pp2_JusPay.setCardYear("20");
        //baseTest.pp2_JusPay.setCVV("111");
        baseTest.pp2_JusPay.setCardHolderName("abcd 123");
        baseTest.pp2_JusPay.clickNext();

        browser
            .assert.containsText('//*[@id="cardholder_error"]/div', "");
    },

    'Verify card holder name is blank and click on next button it should show error message.': function (browser) {
        browser
            .refresh()
            .waitForElementVisible("//iframe[contains(@name,'card_number')]");

        baseTest.pp2_JusPay.setCardNumber("4242424242424242");
        baseTest.pp2_JusPay.setCardMonth("11");
        baseTest.pp2_JusPay.setCardYear("20");
        baseTest.pp2_JusPay.setCVV("111");
        baseTest.pp2_JusPay.setCardHolderName("");
        baseTest.pp2_JusPay.clickNext();

        browser
            .assert.containsText('//*[@id="cardholder_error"]/div', "Please enter the name of card holder.");
    },

    'Enter debit card details and than click click card - the details should not be displayed': function (browser) {
        
        browser
            .refresh()
            .waitForElementVisible("//iframe[contains(@name,'card_number')]");
        
        baseTest.pp2_JusPay.clickPaymentTab("debit card");

        baseTest.pp2_JusPay.setCardNumber("4242424242424242");
        baseTest.pp2_JusPay.setCardMonth("12");
        baseTest.pp2_JusPay.setCardYear("23");
        baseTest.pp2_JusPay.setCVV("123");
        baseTest.pp2_JusPay.setCardHolderName("test abcd");

        baseTest.pp2_JusPay.clickPaymentTab("credit card");

        browser
            .element("xpath", "//iframe[contains(@name,'card_number')]", (res) => {
                browser
                    .frame(res.value);

                browser.getValue("//input[@id='card_number']", function (res) {
                    console.log("CC : " + res.value);
                    browser.assert.deepEqual(res.value, "", "debit card should be empty");
                })

                browser.frameParent();
            });

        browser
            .element("xpath", "//iframe[contains(@name,'card_exp_month')]", (res) => {
                browser
                    .frame(res.value);

                browser.getValue("//input[@id='card_exp_month']", function (res) {
                    console.log("month : " + res.value);
                    browser.assert.deepEqual(res.value, "", "month should be empty");
                })

                browser.frameParent();
            });

        browser
            .element("xpath", "//iframe[contains(@name,'card_exp_year')]", (res) => {
                browser
                    .frame(res.value);

                browser.getValue("//input[@id='card_exp_year']", function (res) {
                    console.log("year : " + res.value);
                    browser.assert.deepEqual(res.value, "", "year should be empty");
                })

                browser.frameParent();
            });

        browser
            .element("xpath", "//iframe[contains(@name,'security_code')]", (res) => {
                browser
                    .frame(res.value);

                browser.getValue("//input[@id='security_code']", function (res) {
                    console.log("CVV : " + res.value);
                    browser.assert.deepEqual(res.value, "", "CVV should be empty");
                })

                browser.frameParent();
            });

        browser
            .element("xpath", "//iframe[contains(@name,'name_on_card')]", (res) => {
                browser
                    .frame(res.value);

                browser.getValue("//input[@id='name_on_card']", function (res) {
                    console.log("Name : " + res.value);
                    browser.assert.deepEqual(res.value, "", "Name should be empty");
                })

                browser.frameParent();
            });
    }
};


function selectPlan(client, plan) {
    if (plan == "gold") {
        client
            .click("//div[@id='data_test_SSP_G3']")
            .waitForElementVisible("//button[@id='data_test_continue_SSP_G3']")
            .click("//button[@id='data_test_continue_SSP_G3']")
            .waitForElementVisible("//iframe[contains(@name,'card_number')]");
    }
}


