/*
-----------    -------------  -------------------------------
Date           Who            Function
-----------    -------------  --------------------------------
28-Sep-2018    Bindu         Verify blocking a profile  

*/ 

const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

let login, menu;
let url;
let shid;

let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");

module.exports =
  {
    '@tags': ['regression', 'profile_block'],

    before: function (browser) {
      login = new Acquisition_Login(browser);
      menu = new Engagement_Menu(browser);

      let username = profile_test_data["inbox_profile_block"][AB][environment][0];
      let pass = profile_test_data["inbox_profile_block"][AB][environment][1];

      login.quickLogin(username, pass);
    },

    'Verify blocking a profile': (browser) => {
      
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
            .waitForElementVisible("div[data-test-selector='list_dropdown_wrap_profile_page'] > div > div:nth-child(3) > button")
            .click("div[data-test-selector='list_dropdown_wrap_profile_page'] > div > div:nth-child(3) > button")
            .pause(3000);
          browser.useXpath()
            .waitForElementVisible("//*[contains(text(), 'Confirm')]")
            .click("//*[contains(text(), 'Confirm')]")
            .pause(2000);
          menu.visitMenuByURL("matches", "recently viewed");
          browser
            .waitForElementVisible("//div[text()='Blocked Members']", 3000)
            .getLocationInView("//div[text()='Blocked Members']")
            .waitForElementVisible("//div[text()='Blocked Members']/parent::div//div[contains(@id,'track_visiblity_carousel_" + shid + "')]", 5000);
          browser.click("//div[text()='Blocked Members']/parent::div//div[contains(@id,'track_visiblity_carousel_" + shid + "')]")
        })
    }
  }
