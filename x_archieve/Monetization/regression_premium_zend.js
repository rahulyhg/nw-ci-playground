const profile_test_data = require("../../Monetization/Tests/testdata_profile.js");
const Base_Test = require("../../Base/Base_Test");
const pp1_test_data = require("./pp1_test_data.json");

let baseTest, env, test_url, AB;

module.exports = {
    '@disabled': true,
    '@tags': ['pp1-label'],

    before: function (browser) {
        baseTest = new Base_Test(browser);
        env = baseTest.shaadiConfig.environment;
        test_url = baseTest.shaadiConfig.test_url;
        AB = baseTest.shaadiConfig.AB;

        let username = profile_test_data["regression_premium_label"][AB][env][0];
        let pass = profile_test_data["regression_premium_label"][AB][env][1];
        baseTest.login.quickLogin(username, pass);
    },

    'verify -best value & seller- image exist': function (browser) {
        browser
            .url(test_url + "/payment")
            .waitForElementVisible("//div[@id='tabsMaincontent-1']");

        browser.execute("return window.getComputedStyle(document.querySelector('.best_deal_sku')).getPropertyValue('background-image').includes('png');", (res) => {
            browser.assert.ok(res.value, "best value/seller image visible");
        });
    },

    'verify -gold plan- feature contents': function (browser) {
        let chat_selector = "(//div[@id='gold']//div[@class='membership_features_sku']//div[@class='table_row'])[1]";
        let view75_selector = "(//div[@id='gold']//div[@class='membership_features_sku']//div[@class='table_row'])[2]";
        let highlighted_selector = "(//div[@id='gold']//div[@class='membership_features_sku']//div[@class='strike_features_sku'])[1]";
        let feature_selector = "(//div[@id='gold']//div[@class='membership_features_sku']//div[@class='strike_features_sku'])[2]";

        baseTest.pp1_zend.expandPlan("gold")

        browser
            .assert.containsText(chat_selector, pp1_test_data["PremiumPlans"]["chat_Feature"])
            .assert.containsText(view75_selector, pp1_test_data["PremiumPlans"]["view75_Feature"])
            .assert.containsText(highlighted_selector, pp1_test_data["PremiumPlans"]["highlight_Feature"])
            .assert.containsText(feature_selector, pp1_test_data["PremiumPlans"]["top_Feature"]);
    },

    'verify -gold plus- plan feature contents': function (browser) {
        let chat_selector = "(//div[@id='goldplus']//div[@class='membership_features_sku']//div[@class='table_row'])[1]";
        let highlighted_selector = "(//div[@id='goldplus']//div[@class='membership_features_sku']//div[@class='table_row'])[2]";
        let view150_selector = "(//div[@id='goldplus']//div[@class='membership_features_sku']//div[@class='table_row'])[3]";
        let feature_selector = "(//div[@id='goldplus']//div[@class='membership_features_sku']//div[@class='table_row'])[4]";

        baseTest.pp1_zend.expandPlan("goldplus")

        browser
            .assert.containsText(chat_selector, pp1_test_data["PremiumPlans"]["chat_Feature"])
            .assert.containsText(highlighted_selector, pp1_test_data["PremiumPlans"]["highlight_Feature"])
            .assert.containsText(view150_selector, pp1_test_data["PremiumPlans"]["view150_Feature"])
            .assert.containsText(feature_selector, pp1_test_data["PremiumPlans"]["top_Feature"]);
    },

    'verify -diamond- feature contents': function (browser) {
        let chat_selector = "(//div[@id='diamond']//div[@class='membership_features_sku']//div[@class='table_row'])[1]";
        let view150_selector = "(//div[@id='diamond']//div[@class='membership_features_sku']//div[@class='table_row'])[2]";
        let highlighted_selector = "(//div[@id='diamond']//div[@class='membership_features_sku']//div[@class='strike_features_sku'])[1]";
        let feature_selector = "(//div[@id='diamond']//div[@class='membership_features_sku']//div[@class='strike_features_sku'])[2]";

        baseTest.pp1_zend.expandPlan("diamond")

        browser
            .assert.containsText(chat_selector, pp1_test_data["PremiumPlans"]["chat_Feature"])
            .assert.containsText(view150_selector, pp1_test_data["PremiumPlans"]["view150_Feature"])
            .assert.containsText(highlighted_selector, pp1_test_data["PremiumPlans"]["highlight_Feature"])
            .assert.containsText(feature_selector, pp1_test_data["PremiumPlans"]["top_Feature"]);
    },

    'verify -diamond plus- feature contents': function (browser) {
        let chat_selector = "(//div[@id='diamondplus']//div[@class='membership_features_sku']//div[@class='table_row'])[1]";
        let highlighted_selector = "(//div[@id='diamondplus']//div[@class='membership_features_sku']//div[@class='table_row'])[2]";
        let view300_selector = "(//div[@id='diamondplus']//div[@class='membership_features_sku']//div[@class='table_row'])[3]";
        let feature_selector = "(//div[@id='diamondplus']//div[@class='membership_features_sku']//div[@class='table_row'])[4]";

        baseTest.pp1_zend.expandPlan("diamondplus");

        browser
            .assert.containsText(chat_selector, pp1_test_data["PremiumPlans"]["chat_Feature"])
            .assert.containsText(highlighted_selector, pp1_test_data["PremiumPlans"]["highlight_Feature"])
            .assert.containsText(view300_selector, pp1_test_data["PremiumPlans"]["view300_Feature"])
            .assert.containsText(feature_selector, pp1_test_data["PremiumPlans"]["top_Feature"]);
    },

    'verify -platinum plus- feature contents': function (browser) {
        let chat_selector = "(//div[@id='platinumplus']//div[@class='membership_features_sku']//div[@class='table_row'])[1]";
        let highlighted_selector = "(//div[@id='platinumplus']//div[@class='membership_features_sku']//div[@class='table_row'])[2]";
        let view600_selector = "(//div[@id='platinumplus']//div[@class='membership_features_sku']//div[@class='table_row'])[3]";
        let feature_selector = "(//div[@id='platinumplus']//div[@class='membership_features_sku']//div[@class='table_row'])[4]";

        baseTest.pp1_zend.expandPlan("platinumplus");

        browser
            .assert.containsText(chat_selector, pp1_test_data["PremiumPlans"]["chat_Feature"])
            .assert.containsText(highlighted_selector, pp1_test_data["PremiumPlans"]["highlight_Feature"])
            .assert.containsText(view600_selector, pp1_test_data["PremiumPlans"]["view600_Feature"])
            .assert.containsText(feature_selector, pp1_test_data["PremiumPlans"]["top_Feature"]);
    },


    'verify plans Tab contents': function (browser) {
        let premium_tab_selector = '//a[@id="premium_benefits_tab"]';
        let personalized_tab_selector = '//a[@id="personalised_benefits_tab"]';

        browser
            .waitForElementVisible(premium_tab_selector)
            .waitForElementVisible(personalized_tab_selector)
            .assert.containsText(premium_tab_selector, 'Premium Plans')
            .assert.containsText(personalized_tab_selector, 'Personalised Plans');
    },

    'verify premium plans product names': function (browser) {
        let gold_plan_month_selector = '//div[@id="gold"]//div[@class="membership_column_sku"]';
        let goldplus_plan_month_selector = '//div[@id="goldplus"]//div[@class="membership_column_sku"]';
        let diamond_plan_month_selector = '//div[@id="diamond"]//div[@class="membership_column_sku"]';
        let diamondplus_plan_month_selector = '//div[@id="diamondplus"]//div[@class="membership_column_sku"]';
        let platinumPlus_plan_month_selector = '//div[@id="platinumplus"]//div[@class="membership_column_sku"]';

        browser
            .assert.containsText(gold_plan_month_selector, 'Gold\n3 months')
            .assert.containsText(goldplus_plan_month_selector, 'Gold Plus\n3 months')
            .assert.containsText(diamond_plan_month_selector, 'Diamond\n6 months')
            .assert.containsText(diamondplus_plan_month_selector, 'Diamond Plus\n6 months')
            .assert.containsText(platinumPlus_plan_month_selector, 'Platinum Plus\n12 months');
    },

    'verify maximum discount % on header': async function (browser) {
        let prm_platinumPlus_discount = baseTest.pp1_zend.getDiscountByPlan("platinumplus");
        let prm_header_discount = baseTest.pp1_zend.getDiscountByPlan("header");

        let platinumPlus_discount = await prm_platinumPlus_discount;
        let header_discount = await prm_header_discount;

        browser.assert.deepEqual(platinumPlus_discount, header_discount, "check max discount on header");
    },

    'verify Gold amount calculations': async function (browser) {
        //discount
        let prm_discount = baseTest.pp1_zend.getDiscountByPlan("gold");
        let prm_nonDiscount_Amt = baseTest.pp1_zend.getNonDiscountAmtByPlan("gold");
        let prm_DiscountPerMonth_Amt = baseTest.pp1_zend.getDiscountAmtPerMonthByPlan("gold");

        let actual_discount = await prm_discount;
        let actual_nonDiscount_Amt = await prm_nonDiscount_Amt;
        let actual_DiscountPerMonth_Amt = await prm_DiscountPerMonth_Amt;

        let expected_DiscountAmount = Math.round(actual_nonDiscount_Amt * (1 - (actual_discount / 100)));
        let expected_DiscountAmount_Month = Math.round(expected_DiscountAmount / 3);

        //check month
        browser.assert.deepEqual(actual_DiscountPerMonth_Amt, expected_DiscountAmount_Month, "Per month amount verify : " + expected_DiscountAmount_Month);

        //check discounted amount
        let plan_selector = "//div[@id='gold']//div[@class='price_column_sku']";
        browser
            .getText(plan_selector, (res) => {
                expected_DiscountAmount = expected_DiscountAmount.toLocaleString('en');
                browser.assert.ok((res.value).includes(expected_DiscountAmount), "check discounted plan amount :" + expected_DiscountAmount);
            });
    },

    'verify Gold plus amount calculations': async function (browser) {
        //discount
        let prm_discount = baseTest.pp1_zend.getDiscountByPlan("goldplus");
        let prm_nonDiscount_Amt = baseTest.pp1_zend.getNonDiscountAmtByPlan("goldplus");
        let prm_DiscountPerMonth_Amt = baseTest.pp1_zend.getDiscountAmtPerMonthByPlan("goldplus");

        let actual_discount = await prm_discount;
        let actual_nonDiscount_Amt = await prm_nonDiscount_Amt;
        let actual_DiscountPerMonth_Amt = await prm_DiscountPerMonth_Amt;

        let expected_DiscountAmount = Math.round(actual_nonDiscount_Amt * (1 - (actual_discount / 100)));
        let expected_DiscountAmount_Month = Math.round(expected_DiscountAmount / 3);

        //check month
        browser.assert.deepEqual(actual_DiscountPerMonth_Amt, expected_DiscountAmount_Month, "Per month amount verify : " + expected_DiscountAmount_Month);

        //check discounted amount
        let plan_selector = "//div[@id='goldplus']//div[@class='price_column_sku']";
        browser
            .getText(plan_selector, (res) => {
                expected_DiscountAmount = expected_DiscountAmount.toLocaleString('en');
                browser.assert.ok((res.value).includes(expected_DiscountAmount), "check discounted plan amount :" + expected_DiscountAmount);
            });
    },

    'verify Diamond amount calculations': async function (browser) {
        //discount
        let prm_discount = baseTest.pp1_zend.getDiscountByPlan("diamond");
        let prm_nonDiscount_Amt = baseTest.pp1_zend.getNonDiscountAmtByPlan("diamond");
        let prm_DiscountPerMonth_Amt = baseTest.pp1_zend.getDiscountAmtPerMonthByPlan("diamond");

        let actual_discount = await prm_discount;
        let actual_nonDiscount_Amt = await prm_nonDiscount_Amt;
        let actual_DiscountPerMonth_Amt = await prm_DiscountPerMonth_Amt;

        let expected_DiscountAmount = Math.round(actual_nonDiscount_Amt * (1 - (actual_discount / 100)));
        let expected_DiscountAmount_Month = Math.round(expected_DiscountAmount / 6);

        //check month
        browser.assert.deepEqual(actual_DiscountPerMonth_Amt, expected_DiscountAmount_Month, "Per month amount verify : " + expected_DiscountAmount_Month);

        //check discounted amount
        let plan_selector = "//div[@id='diamond']//div[@class='price_column_sku']";

        browser
            .getText(plan_selector, (res) => {
                expected_DiscountAmount = expected_DiscountAmount.toLocaleString('en');
                browser.assert.ok((res.value).includes(expected_DiscountAmount), "check discounted plan amount :" + expected_DiscountAmount);
            });
    },

    'verify diamond plus amount calculations': async function (browser) {
        //discount
        let prm_discount = baseTest.pp1_zend.getDiscountByPlan("diamondplus");
        let prm_nonDiscount_Amt = baseTest.pp1_zend.getNonDiscountAmtByPlan("diamondplus");
        let prm_DiscountPerMonth_Amt = baseTest.pp1_zend.getDiscountAmtPerMonthByPlan("diamondplus");

        let actual_discount = await prm_discount;
        let actual_nonDiscount_Amt = await prm_nonDiscount_Amt;
        let actual_DiscountPerMonth_Amt = await prm_DiscountPerMonth_Amt;

        let expected_DiscountAmount = Math.round(actual_nonDiscount_Amt * (1 - (actual_discount / 100)));
        let expected_DiscountAmount_Month = Math.round(expected_DiscountAmount / 6);

        //check month
        browser.assert.deepEqual(actual_DiscountPerMonth_Amt, expected_DiscountAmount_Month, "Per month amount verify : " + expected_DiscountAmount_Month);

        //check discounted amount
        let plan_selector = "//div[@id='diamondplus']//div[@class='price_column_sku']";
        browser
            .getText(plan_selector, (res) => {
                expected_DiscountAmount = expected_DiscountAmount.toLocaleString('en');
                browser.assert.ok((res.value).includes(expected_DiscountAmount), "check discounted plan amount :" + expected_DiscountAmount);
            });
    },

    'verify platinum plus amount calculations': +async function (browser) {
        //discount
        let prm_discount = baseTest.pp1_zend.getDiscountByPlan("platinumplus");
        let prm_nonDiscount_Amt = baseTest.pp1_zend.getNonDiscountAmtByPlan("platinumplus");
        let prm_DiscountPerMonth_Amt = baseTest.pp1_zend.getDiscountAmtPerMonthByPlan("platinumplus");

        let actual_discount = await prm_discount;
        let actual_nonDiscount_Amt = await prm_nonDiscount_Amt;
        let actual_DiscountPerMonth_Amt = await prm_DiscountPerMonth_Amt;

        let expected_DiscountAmount = Math.round(actual_nonDiscount_Amt * (1 - (actual_discount / 100)));
        let expected_DiscountAmount_Month = Math.round(expected_DiscountAmount / 12);

        //check month
        browser.assert.deepEqual(actual_DiscountPerMonth_Amt, expected_DiscountAmount_Month, "Per month amount verify : " + expected_DiscountAmount_Month);

        //check discounted amount
        let plan_selector = "//div[@id='platinumplus']//div[@class='price_column_sku']";
        browser
            .getText(plan_selector, (res) => {
                expected_DiscountAmount = expected_DiscountAmount.toLocaleString('en');
                browser.assert.ok((res.value).includes(expected_DiscountAmount), "check discounted plan amount :" + expected_DiscountAmount);
            });
    }
};




