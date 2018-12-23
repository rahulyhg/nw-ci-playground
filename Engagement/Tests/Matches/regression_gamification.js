
const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

const Inbox_Invitations = require("../../WebPages/Inbox/Invitations");

let { test_url, AB, environment } = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");

let login, menu, invitations;

module.exports =
  {
    '@tags': ['regression'],

    before: function (browser) {
      login = new Acquisition_Login(browser);
      menu = new Engagement_Menu(browser);
      invitations = new Inbox_Invitations(browser);

      let username = profile_test_data["matches_gamification"][AB][environment][0];
      let pass = profile_test_data["matches_gamification"][AB][environment][1];

      login.quickLogin(username, pass);

    },

    'Go to profile page': function (browser) {

      menu.visitMenuByURL("matches", "my matches");

      browser.useCss()
        .waitForElementVisible("div[type='list'] + div > div > div a")
        .click("div[type='list'] + div > div > div a");

      let window0, window1;
      browser.windowHandles(res => {
        window0 = res.value[0];
        window1 = res.value[1];
      });

      browser.windowHandles(res => {
        browser.switchWindow(window1);
      });
    },

    'verify family gamification': +function (browser) {

      let link_selector = "//p[@data-test-selector='message']//button";
      let family_dd_values = ["Select", "Employed", "Business", "Retired", "Not Employed", "Passed Away", "Homemaker"];

      browser
        .useXpath()
        .waitForElementVisible(link_selector)
        .getLocationInView(link_selector)
        .click(link_selector);

      browser.elements("xpath", "(//div[@id='family']//form//select)//option", (items) => {

        for (let i = 0; i < items.value.length; i++) {

          browser.elementIdText(items.value[i].ELEMENT, (res) => {
            let answer = family_dd_values.includes(res.value);

            browser.assert.ok(answer, "checking " + res.value + " in drop down")
          });
        }
      })

    },

    'verify astrology gamification': function (browser) {
      /* astro details */

      let astro_selector = "//p[@data-test-selector='message']//a";
      browser
        .useXpath()
        .waitForElementVisible(astro_selector)
        .getLocationInView(astro_selector)
        .click(astro_selector);

      let window0, window1;
      browser.windowHandles(res => {
        window0 = res.value[0];
        window1 = res.value[1];
      });

      browser.windowHandles(res => {
        browser.switchWindow(window1);
      });
    },
  }