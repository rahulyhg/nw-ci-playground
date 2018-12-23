const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");
let login, menu;
let url;
let shid;

module.exports =
  {
    '@tags': ['regression', 'profile_ignore'],

    before: function (browser) {
      login = new Acquisition_Login(browser);
      menu = new Engagement_Menu(browser);

      let username = profile_test_data["inbox_profile_ignore"][AB][environment][0];
      let pass = profile_test_data["inbox_profile_ignore"][AB][environment][1];

      login.quickLogin(username, pass);

    },

    'Verify Ignoring a profile': (browser) => {

      menu.visitMenuByURL("matches", "my matches");

      browser.useCss()
        .waitForElementVisible("div[type='list'] + div > div > div a")
        .click("div[type='list'] + div > div > div a")
        .pause(3000);

      let window0, window1;
      browser.windowHandles(res => {
        window0 = res.value[0];
        window1 = res.value[1];
        browser.switchWindow(window1);
      });

      browser.url(geturl => {
        url = geturl.value;
        url = url.split('profileid')[1];
        shid = url.substr(1, 11);
      });

      browser
        .perform(function () {

          browser
            .waitForElementVisible("div[data-test-selector='list_dropdown_wrap_profile_page']")
            .click("div[data-test-selector='list_dropdown_wrap_profile_page']")
            .pause(5000)
            .waitForElementVisible("div[data-test-selector='list_dropdown_wrap_profile_page'] > div > div:nth-child(2) > button")
            .click("div[data-test-selector='list_dropdown_wrap_profile_page'] > div > div:nth-child(2) > button")
            .pause(3000)

          menu.visitMenuByURL("matches", "recently viewed");
          browser
            .waitForElementVisible("//div[text()='Ignored Members']", 5000)
            .getLocationInView("//div[text()='Ignored Members']")
            .waitForElementVisible("//div[text()='Ignored Members']/parent::div//div[contains(@id,'track_visiblity_carousel_" + shid + "')]", 10000)
            .click("//div[text()='Ignored Members']/parent::div//div[contains(@id,'track_visiblity_carousel_" + shid + "')]");
        })
    }
  }