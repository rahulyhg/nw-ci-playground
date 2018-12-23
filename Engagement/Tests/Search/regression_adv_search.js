
const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

const Advanced_Search = require("../../WebPages/Search/Advanced_Search");
let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");

module.exports = {

    '@tags': ['regression'],

    before : function(browser)
    {
    	let login = new Acquisition_Login(browser);
        let username = profile_test_data["adv_search"][AB][environment][0];
        let pass = profile_test_data["adv_search"][AB][environment][1];

        login.quickLogin(username, pass);
    },

    'Verify Default selected “Looking for” should be Bride': (browser) => {
        browser.waitForElementPresent('//input[@id="gender-Male" and @checked = "checked"]');
    },

    'Verify bride minimum age': (browser) => {

        const advance_search = new Advanced_Search(browser);

        advance_search.selectLookingFor("Bride");

        browser.execute("return document.getElementById('agefrom').options[0].value", [], function (response) {
            let value = response.value;
            browser.assert.deepEqual(value, 18, "bride minimum age should be 18")
        });
    },

    'Verify groom minimum age': (browser) => {

        const advance_search = new Advanced_Search(browser);

        advance_search.selectLookingFor("Groom");

        browser.execute("return document.getElementById('agefrom').options[0].value", [], function (response) {
            let value = response.value;
            browser.assert.deepEqual(value, 21, "bride minimum age should be 21")

        });
    },

    'Have children should not be displayed for - never married': (browser) => {

        const advance_search = new Advanced_Search(browser);
        advance_search.setMarital(["Never%20Married"]);

        browser.waitForElementNotVisible("//div[@id='have_children']");

    },

    'Have children should be displayed for - Divorced': function (browser) {

        const advance_search = new Advanced_Search(browser);
        advance_search.setMarital(["Divorced"]);

        browser
            .waitForElementVisible("//div[@id='have_children']")
            .verify.containsText('//*[@for="children-No"]', "No")
            .verify.containsText('//*[@for="children-"]', "Doesn't Matter")
            .verify.containsText('//*[@for="children-NoYesNotlivingtogether"]', "Ok, if not staying together");
    },


    'verify modify search click works': (browser) => {

        const advance_search = new Advanced_Search(browser);

        advance_search.clickSubmit();

        browser
            .waitForElementVisible("//a[text()='Modify Search']")
            .click("//a[text()='Modify Search']")
            .waitForElementPresent("//form[@id='smart']");

        browser.assert.urlContains("search_type=smart_search&modify_srch=Y");
    },

    'Verify Dosham field for Hindu Religion': (browser) => {

        const advance_search = new Advanced_Search(browser);
        advance_search.setReligion(["Hindu"]);

        let dosham = '//*[@id="show_hide_manglik"]';
        browser.waitForElementVisible(dosham, 3000, 'Dosham field present for Hindu Religion')
        browser.click('//*[@id="manglikarray-"]')
        browser.waitForElementNotVisible('//*[@id="manglikarray2-DontKnow"]', 3000, 'Checkbox for Include Profiles who don\'t know if they are Manglik or not is not Present for Doesn\'t Know');
        browser.click('//*[@id="manglikarray-Yes"]')
        browser.waitForElementVisible('//*[@id="manglikarray2-DontKnow"]', 3000, 'Checkbox for Include Profiles who don\'t know if they are Manglik or not is Present for Manglik-Yes')
        browser.click('//*[@id="manglikarray-No"]')
        browser.waitForElementVisible('//*[@id="manglikarray2-DontKnow"]', 3000, 'Checkbox for Include Profiles who don\'t know if they are Manglik or not is Present for Manglik-No')
    },

    'Verify Dosham field for Jain Religion': (browser) => {

        const advance_search = new Advanced_Search(browser);
        advance_search.setReligion(["Jain"]);

        let dosham = '//*[@id="show_hide_manglik"]';
        browser.waitForElementVisible(dosham, 3000, 'Dosham field present for Jain Religion')
        browser.click('//*[@id="manglikarray-Yes"]')
        browser.waitForElementVisible('//*[@id="manglikarray2-DontKnow"]', 3000, 'Checkbox for Include Profiles who don\'t know if they are Manglik or not is Present for Manglik-Yes')
        browser.click('//*[@id="manglikarray-No"]')
        browser.waitForElementVisible('//*[@id="manglikarray2-DontKnow"]', 3000, 'Checkbox for Include Profiles who don\'t know if they are Manglik or not is Present for Manglik-No')
    },
    'Verify Dosham field not present for Christian Religion': (browser) => {

        const advance_search = new Advanced_Search(browser);
        advance_search.setReligion(["Christian"]);

        let dosham = '//*[@id="show_hide_manglik"]';
        browser.waitForElementNotVisible(dosham, 3000, 'Dosham field not present for Christian Religion');
    },
    'Verify Dosham field not present for Muslim Religion': (browser) => {

        const advance_search = new Advanced_Search(browser);
        advance_search.setReligion(["Muslim"]);

        let dosham = '//*[@id="show_hide_manglik"]';
        browser.waitForElementNotVisible(dosham, 3000, 'Dosham field not present for Muslim Religion');
    },
    'Verify Dosham field not present for Sikh Religion': (browser) => {

        const advance_search = new Advanced_Search(browser);
        advance_search.setReligion(["Sikh"]);

        let dosham = '//*[@id="show_hide_manglik"]';
        browser.waitForElementNotVisible(dosham, 3000, 'Dosham field not present for Sikh Religion');
        browser.pause(2000);
    },
    'Verify Dosham field not present for Parsi Religion': (browser) => {

        const advance_search = new Advanced_Search(browser);
        advance_search.setReligion(["Parsi"]);

        let dosham = '//*[@id="show_hide_manglik"]';
        browser.waitForElementNotVisible(dosham, 3000, 'Dosham field not present for Parsi Religion');
    },
    'Verify Dosham field not present for Buddhist Religion': (browser) => {

        const advance_search = new Advanced_Search(browser);
        advance_search.setReligion(["Buddhist"]);

        let dosham = '//*[@id="show_hide_manglik"]';
        browser.waitForElementNotVisible(dosham, 3000, 'Dosham field not present for Buddhist Religion');
    },
    'Verify Dosham field not present for Jewish Religion': (browser) => {

        const advance_search = new Advanced_Search(browser);
        advance_search.setReligion(["Jewish"]);

        let dosham = '//*[@id="show_hide_manglik"]';
        browser.waitForElementNotVisible(dosham, 3000, 'Dosham field not present for Jewish Religion');
    },
    'Verify Dosham field not present for No Religion': (browser) => {

        const advance_search = new Advanced_Search(browser);
        advance_search.setReligion(["No%20Religion"]);

        let dosham = '//*[@id="show_hide_manglik"]';
        browser.waitForElementNotVisible(dosham, 3000, 'Dosham field not present for No Religion Religion');
    },
    'Verify Dosham field not present for Spiritual': (browser) => {

        const advance_search = new Advanced_Search(browser);
        advance_search.setReligion(["Spiritual%20-%20not%20religious"]);

        let dosham = '//*[@id="show_hide_manglik"]';
        browser.waitForElementNotVisible(dosham, 3000, 'Dosham field not present for Spiritual');
    },
    'Verify Dosham field not present for Other': (browser) => {

        const advance_search = new Advanced_Search(browser);
        advance_search.setReligion(["Other"]);

        let dosham = '//*[@id="show_hide_manglik"]';
        browser.waitForElementNotVisible(dosham, 3000, 'Dosham field not present for Other');
    }

};
