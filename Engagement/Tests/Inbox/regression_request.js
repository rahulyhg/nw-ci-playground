const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");
const Inbox_Requests = require("../../WebPages/Inbox/Requests");

let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");
let requests;

module.exports =
    {
        before : function(browser)
        {
            let login = new Acquisition_Login(browser);
            requests = new Inbox_Requests(browser);
            let username = profile_test_data["inbox_request"][AB][environment][0];
            let pass = profile_test_data["inbox_request"][AB][environment][1];
    
            login.quickLogin(username, pass);
        },

        'Verify photo CTA ': function (browser) {

            const menu = new Engagement_Menu(browser);

            // 9aug_adapt5@bankas.in
            menu.visitMenuByURL("matches", "my matches");
            browser.url(test_url + "/inbox/pending/requests")

            requests.selectFilter("Photo Requests")

            browser.elements('xpath', "//a[@title='Add Photo']", function (elems) {
                if (elems.value.length > 0) {
                    browser
                    .click('xpath', "//a[@title='Add Photo']")
                    .waitForElementPresent("//button[@id='import-from-fb-btn']")
                    .assert.urlContains('my-shaadi/photo')
                }
                else {
                    browser.assert.ok(false,"No Add photo button Found, There are no Pending Requests");
                }
            })
        },

        'Verify phone CTA ': function (browser) {
            // Open inbox request
            browser.url(test_url + "/inbox/pending/requests")

            requests.selectFilter("Phone Requests")
            browser.elements('xpath', "//a[@title='Verify Phone No.']", function (elems) {
                if (elems.value.length > 0) {
                    browser
                    .click('xpath', "//a[@title='Verify Phone No.']")
                    .waitForElementPresent("//div[@id='mobile_number_view']")
                    .assert.urlContains('my-shaadi/contact-details')
                }
                else {
                    browser.assert.ok(false,"No Verify Phone No button Found, There are no Pending Requests");
                }
            })
        },

        'Verify profile link open from  - accepted request': +function (browser) {
            // Open inbox accepted request
            browser.url(test_url + "/inbox/accepted/requests")

            browser.elements('xpath', "//div[@type='inboxCard']/following-sibling::div[1]//a", function (elems) {
                if (elems.value.length > 0) {
                    browser.click('xpath', "//div[@type='inboxCard']/following-sibling::div[1]//a")
                }
                else {
                    browser.assert.ok(false,"There are no Accepted Requests");
                }
            })
        },

        'Verify profile link open from  - sent request': +function (browser) {
            // Open inbox sent request
            browser.url(test_url + "/inbox/sent/requests")
                .pause(5000)

            browser.elements('xpath', "//div[@type='inboxCard']/following-sibling::div[1]//a", function (elems) {
                if (elems.value.length > 0) {
                    browser.click('xpath', "//div[@type='inboxCard']/following-sibling::div[1]//a")
                }
                else {
                    browser.assert.ok(false,"There are no Sent Requests");
                }
            })
        },
    };