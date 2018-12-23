const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");
const My_Matches = require("../../../Engagement/WebPages/Matches/My_Matches");

let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");

let page1_card = "(//div[contains(@id,'true_view')])[16]/parent::div[1]/parent::div//*[text()='Add Photo']";
let page2_card = "(//div[contains(@id,'true_view')])[11]/parent::div[1]/parent::div//*[text()='Add Photo']";

module.exports =
    {
        before : function(browser)
        {
            let login = new Acquisition_Login(browser);
            let username = profile_test_data["photo_card"][AB][environment][0];
            let pass = profile_test_data["photo_card"][AB][environment][1];
    
            login.quickLogin(username, pass);
        },


        'Verify photo card after 15 member cards - page 1': function (browser) {

            browser.url(test_url + "/search/new-matches");
            browser.pause(4000)

            browser.waitForElementPresent(page1_card)
        },

        'Verify submitting of photo card 1': function (browser) {
            browser.click(page1_card)

            browser.windowHandles(function (result) {
                // 0 == current main window, 1 == new tab
                var handle = result.value[1];
                browser.switchWindow(handle);
                browser.assert.urlContains('my-shaadi/photo');
                var handle = result.value[0];
                browser.switchWindow(handle);
            });
        },

        'verify photo card after 10 member cards - page 2': function (browser) {

            let page2 = '//div[contains(@class,"Pagination")]//descendant::button[4]'

            browser
                .waitForElementPresent(page2)
                .click(page2)
                .pause(3000)
                .waitForElementPresent(page2_card)
        },

        'Verify submitting of photo card 2': function (browser) {

            browser.click(page2_card)
            browser.windowHandles(function (result) {
                // 0 == current main window, 1 == new tab
                var handle = result.value[1];
                browser.switchWindow(handle);
                browser.assert.urlContains('my-shaadi/photo');
                var handle = result.value[0];
                browser.switchWindow(handle);
            });
        }
    }
