const Base_Test = require("../../Base/Base_Test");
const profile_test_data = require("../../Monetization/Tests/testdata_profile.js");
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

        let username = profile_test_data["regression_personalised_label"][AB][env][0];
        let pass = profile_test_data["regression_personalised_label"][AB][env][1];
        baseTest.login.quickLogin(username, pass);
        browser.pause(3000);
    },

    'Go to PP1 page ': function (browser) {
        browser
            .url(test_url + "/payment")
            .waitForElementVisible("//div[@id='tabsMaincontent-1']");

        baseTest.pp1_zend.clickPlanCategory("Personalised Plans");
        browser.waitForElementVisible("//div[@id='tabsMaincontent-2']");

    },

    'verify -select shaadi- months': function (browser) {
        let select_3month = "//div[@id='select3']//div[@class='membership_column_sku']";
        let select_6month = "//div[@id='select6']//div[@class='membership_column_sku']";

        browser
            .assert.containsText(select_3month, "3 months")
            .assert.containsText(select_6month, "6 months");
    },

    'verify -Select 3 months- plan feature contents': function (browser) {
        let advisor_selector = "(//div[@id='select3']//div[@class='membership_features_sku']//div[@class='table_row'])[1]";
        let meeting_selector = "(//div[@id='select3']//div[@class='membership_features_sku']//div[@class='table_row'])[2]";
        let matches_selector = "(//div[@id='select3']//div[@class='membership_features_sku']//div[@class='table_row'])[3]";
        let benfits_selector = "(//div[@id='select3']//div[@class='membership_features_sku']//div[@class='table_row'])[4]";

        baseTest.pp1_zend.expandPlan("select3")

        browser
            .assert.containsText(advisor_selector, pp1_test_data["PremiumPlans"]["advisor_Feature"])
            .assert.containsText(meeting_selector, pp1_test_data["PremiumPlans"]["meeting_Feature"])
            .assert.containsText(matches_selector, pp1_test_data["PremiumPlans"]["matches_Feature"])
            .assert.containsText(benfits_selector, pp1_test_data["PremiumPlans"]["benefits_Feature"]);
    },

    'verify -Select 6 months- plan feature contents': function (browser) {
        let advisor_selector = "(//div[@id='select6']//div[@class='membership_features_sku']//div[@class='table_row'])[1]";
        let meeting_selector = "(//div[@id='select6']//div[@class='membership_features_sku']//div[@class='table_row'])[2]";
        let matches_selector = "(//div[@id='select6']//div[@class='membership_features_sku']//div[@class='table_row'])[3]";
        let benfits_selector = "(//div[@id='select6']//div[@class='membership_features_sku']//div[@class='table_row'])[4]";

        baseTest.pp1_zend.expandPlan("select6");

        browser
            .assert.containsText(advisor_selector, pp1_test_data["PremiumPlans"]["advisor_Feature"])
            .assert.containsText(meeting_selector, pp1_test_data["PremiumPlans"]["meeting_Feature"])
            .assert.containsText(matches_selector, pp1_test_data["PremiumPlans"]["matches_Feature"])
            .assert.containsText(benfits_selector, pp1_test_data["PremiumPlans"]["benefits_Feature"]);
    },

    'verify -select shaadi 3- per month calculation': async function (browser) {
        let prm_nonDiscount_Amt = baseTest.pp1_zend.getNonDiscountAmtByPlan_Select("select3");

        let nonDiscount_Amt = await prm_nonDiscount_Amt;
        let expected_per_month = Math.round(nonDiscount_Amt / 3) + 1;

        //check per month amount
        let plan_selector = "//div[@id='select3']//div[@class='price_column_sku']";

        browser
            .getText(plan_selector, (res) => {
                expected_per_month = expected_per_month.toLocaleString('en');
                browser.assert.ok((res.value).includes(expected_per_month), "check per month amount :" + expected_per_month);
            });
    },

    'verify -select shaadi 6- per month calculation': async function (browser) {
        let prm_nonDiscount_Amt = baseTest.pp1_zend.getNonDiscountAmtByPlan_Select("select6");

        let nonDiscount_Amt = await prm_nonDiscount_Amt;
        let expected_per_month = Math.round(nonDiscount_Amt / 6) + 1;

        //check per month amount
        let plan_selector = "//div[@id='select6']//div[@class='price_column_sku']";

        browser
            .getText(plan_selector, (res) => {
                expected_per_month = expected_per_month.toLocaleString('en');
                browser.assert.ok((res.value).includes(expected_per_month), "check per month amount :" + expected_per_month);
            });
    }
};




