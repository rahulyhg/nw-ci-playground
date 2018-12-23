const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Profile = require("../../WebPages/Profile");

let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");

module.exports =
    {
        '@tags': ['regression_SKU'],

        before : function(browser)
        {
            let login = new Acquisition_Login(browser);
            let username = profile_test_data["growth_profile_sku"][AB][environment][0];
            let pass = profile_test_data["growth_profile_sku"][AB][environment][1];

            login.quickLogin(username, pass);
        },

        'Verifing "free access" tag on profile page': function (browser) {

            browser
                .url(test_url + '/profile?txtprofileid=SH49272637')
                .waitForElementVisible("//div[@data-test-selector='sku_exclusive_feature']")
                .expect.element("//div[@data-test-selector='sku_exclusive_feature']").text.to.contain('FREE ACCESS');
        },

        'Verifing view contact button activated for free member @ profile page': function (browser) {
            
            browser
                .useCss()
                .click('div[data-test-selector="profile_connect_status"] button[title="Connect Now"]')
                .pause(3000)
                .saveScreenshot('D:/screenShots/CTAs.png');

            browser.getAttribute("div[data-test-selector='profile_connect_status'] button[title='View Contact']", "data-viewcontact", function (result) {
                browser.assert.ok(result.value, "Contact details will be shown.");
            });
        },

        'Verifing Write message button activated for free member @ profile page': function (browser) {

            browser.url(test_url + '/profile?txtprofileid=SH49272637')
                .waitForElementVisible("//div[@data-test-selector='sku_exclusive_feature']")
                .useCss()
                .click('div[data-test-selector="profile_connect_status"] button[title="Connect Now"]')
                .pause(3000)
                .saveScreenshot('D:/screenShots/CTAs.png');

            browser.getAttribute("div[data-test-selector='profile_connect_status'] button[title='Write Message']", "data-writemessage", function (result) {
                browser.assert.ok(result.value, "Write Message pop up can be shown.");
            });
        }
    }