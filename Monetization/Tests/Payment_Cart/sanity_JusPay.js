const profile_test_data = require("../../Tests/testdata_profile.js");
const Base_Test = require("../../../Base/Base_Test");
const test_data = require("../Payment_Cart/pp2_test_data.json");
const test_data1 = require("./netbanking_test_data.json");

let baseTest, env, test_url, AB;

module.exports = {
    '@tags': ['sanity'],

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

    'verify all errors when text input is blank ': function (browser) {
        baseTest.pp2.clickNext();

        browser
            .assert.containsText('//*[@id="credit_card_error"]/div', test_data["CreditCard_Error"]["CC_Num_Error"])
            .assert.containsText('//*[@id="month_year_error"]/div', test_data["CreditCard_Error"]["CC_Date_Error"])
            .assert.containsText('//*[@id="cvv_error"]/div', test_data["CreditCard_Error"]["CC_Cvv_Error"])
            .assert.containsText('//*[@id="cardholder_error"]/div', test_data["CreditCard_Error"]["CC_Name_Error"])
    },

    'verify credit card number error when invalid': function (browser) {
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
    },

    'verify all errors when text input is blank': function (browser) {
        browser
            .refresh()
            .waitForElementVisible("//div[@id='creditCardTab']");

        baseTest.pp2.clickPaymentTab("net banking");
        baseTest.pp2.clickNext();

        browser.assert.containsText('//*[@id="netbanking_error"]/div', 'Please select prefered Bank.');
    },

    'Verify popular banks are being selected': function (browser) {
        let popularData = ["NB_SBI", "NB_HDF", "NB_ICI", "NB_UTI", "NB_IDB", "NB_PNB"];

        popularData.forEach(item => {
            baseTest.pp2.selectNetBBank(test_data1[item][0]);
            browser.pause(1000)

            browser.execute('return document.querySelector("#bank_code").options[document.querySelector("#bank_code").selectedIndex].text', [], function (response) {
                let value1 = response.value;
                browser.assert.deepEqual(value1, test_data1[item][0], "Popular Bank is selected : " + test_data1[item][0])
            });
        });
    },

    'Verify Net banking - PNB': function (browser) {
        baseTest.pp2.clickNext();

        browser.waitForElementNotPresent("//div[@id='creditCardTab']")
            .pause(5000)
            .assert.urlContains("https://netbanking.netpnb.com/corp");
    },

    'Get diamond price from PP1  page': async function (browser) {
        browser
            .url(test_url + "/payment")
            .waitForElementVisible("//div[@id='data_test_topband']")

        actual_price = await baseTest.pp1_revamp.getActualPrice("diamond");
        baseTest.pp1_revamp.selectPremiumPlan("diamond");

    },

    'Verify diamond name/price/spotlight on PP2  page': function (browser) {
        browser
            .waitForElementVisible("//div[@id='creditCardTab']")
            .assert.urlContains('cart')

        browser
            .verify.containsText("//div[@id='your_price_amount']/span", actual_price)
            .verify.containsText("//div[@id='product_name']", "Diamond (6 Months)")
            .waitForElementVisible("//div[@id='add_blaster']")
    },

   
};

