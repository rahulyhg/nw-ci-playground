const profile_test_data = require("../../Tests/testdata_profile.js");
const Base_Test = require("../../../Base/Base_Test");
const test_data = require("../Payment_Cart/pp2_test_data.json");
const test_data1 = require("./netbanking_test_data_old.json");

let baseTest, env, test_url, AB;

module.exports = {
    '@tags': ['sanity'],

    before: function (browser) {
        baseTest = new Base_Test(browser);
        env = baseTest.shaadiConfig.environment;
        test_url = baseTest.shaadiConfig.test_url;
        AB = baseTest.shaadiConfig.AB;

        let username = profile_test_data["regression_credit"][AB][env][0];
        let pass = profile_test_data["regression_credit"][AB][env][1];

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

        browser.getAttribute("xpath", '//input[@id="cc_num"]', "value", (res) => {
            browser.assert.deepEqual(res.value, "", "credit card should be empty");
        });

        browser.getAttribute("xpath", '//input[@id="cc_cvv"]', "value", (res) => {
            browser.assert.deepEqual(res.value, "", "CVV should be empty");
        });

        browser.getAttribute("xpath", '//input[@id="cc_card_holder_name"]', "value", (res) => {
            browser.assert.deepEqual(res.value, "", "credit card name should be empty");
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
        let popularData = ["SBI", "HDF", "ICI", "UTI", "IDB", "PNB"];

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

    'Get diamond price from PP1  page' : async function(browser) 
    {    
        browser
        .url(test_url + "/payment")
        .waitForElementVisible("//div[@id='data_test_topband']")
        
        actual_price = await baseTest.pp1_revamp.getActualPrice("diamond");
        baseTest.pp1_revamp.selectPremiumPlan("diamond");

    },

    'Verify diamond name/price/spotlight on PP2  page' : function(browser) 
    {    
        browser
        .waitForElementVisible("//div[@id='creditCardTab']")
        .assert.urlContains('cart')

        browser
        .verify.containsText("//div[@id='your_price_amount']/span", actual_price)
        .verify.containsText("//div[@id='product_name']", "Diamond (6 Months)")
        .waitForElementVisible("//div[@id='add_blaster']")
    },

    'Perform EMI sanity': function (browser) {

        browser
        .url(test_url + "/payment");

        baseTest.pp1_revamp.openSelectPlanDropDown();
        baseTest.pp1_revamp.selectPersonalizedPlan("3month");
        baseTest.pp2_JusPay.clickPaymentTab("emi");

        browser
            .waitForElementVisible("//input[@type='radio' and @value='HDFC']")
            .waitForElementVisible("//input[@type='radio' and @value='ICICI']")
            .waitForElementVisible("//input[@type='radio' and @value='AXIS']");

        baseTest.pp2_JusPay.selectEMIBank("HDFC");

        ["1", "2", "3", "4"].forEach(index => {

            let emi1 = "(//input[@class='cart_emi-EmiRadio' and @type='radio'])[" + index + "]";

            browser
                .waitForElementVisible(emi1)
                .click(emi1)
                .waitForElementVisible("//div[@class='cart_emi-PlanDetailsActive']//button[@id='PayNowBtn']")

            //TOTAL EMI AMOUNT
            browser.getText("//div[@class='cart_emi-PlanDetailsActive']//div[@data-test-selector='emi_total_amt']//span", (res) => {
                let ans = res.value;
                browser.getText("//div[@id='total_price']/span/span", (res1) => {
                    browser.pause(3000)
                    browser.assert.deepEqual(ans, res1.value, "Total EMI amount comparision-" + ans);
                })
            })

            baseTest.pp2_JusPay.click_ChooseThisPlan();

            browser
                .waitForElementVisible("//div[@class='cart_emi-ChooseAnotherPlan']")
                .waitForElementVisible("//div[@id='iframe_card_number']")
                .waitForElementVisible("//div[@id='iframe_card_exp_month']")
                .waitForElementVisible("//div[@id='iframe_card_exp_year']")
                .waitForElementVisible("//div[@id='iframe_security_code']")
                .waitForElementVisible("//div[@id='iframe_name_on_card']")

            browser
                .click("//div[@class='cart_emi-ChooseAnotherPlan']")
                .pause(1500)
        });
    }
};


