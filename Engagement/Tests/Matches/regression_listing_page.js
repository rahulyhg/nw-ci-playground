const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");
const Engage_Refine_Search = require("../../../Shared_Items/Comman_Library/Engagement_Refine_Search");

//library
const My_Matches = require("../../WebPages/Matches/My_Matches");
let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");

let login, menu, photos;

module.exports =
  {
    before : function(browser)
    {
    	  let login = new Acquisition_Login(browser);
        let username = profile_test_data["listing_page"][AB][environment][0];
        let pass = profile_test_data["listing_page"][AB][environment][1];

        login.quickLogin(username, pass);
    },

    'Verify refine search - protected photo': function (browser) {
      const login = new Acquisition_Login(browser);
      const menu = new Engagement_Menu(browser);
      const photosetting =new Engage_Refine_Search(browser)
      
      menu.visitMenu("matches", "my matches");
      photosetting.setPhotoSetting('protected photo');

      //browser.click('//input[@id="photostatus-protected"]');
      browser.waitForElementPresent('//span[@type="list"]', function () {

      console.log("Lock icon found")
      });
    },

  'verify 4th listing is a banner': function (browser) {
      const login = new Acquisition_Login(browser);
      const menu = new Engagement_Menu(browser);


      login.quickLogin("snehak@bankas.in", "test");//USE SAME AUTH
      menu.visitMenuByURL("matches", "my matches");

      let banner_selector = '(//div[contains(@id,"true_view")])[1]/parent::div/parent::div/div[4][@data-banner]';

      browser.waitForElementPresent(banner_selector, 7000, false, function () { }, 'Upgrade Banner present after 3 Profiles on Listing Page');
      browser.end();
    },
    'verify profile page is opened from listing page': +function (browser) {
      const login = new Acquisition_Login(browser);
      const menu = new Engagement_Menu(browser);

      login.quickLogin("snehak@bankas.in", "test");//USE SAME AUTH
      menu.visitMenuByURL("matches", "my matches");


      browser
        .waitForElementPresent("//div[contains(@id,'true_view')]")

      let profileName = "";
      browser
        .useXpath()
        .getText("((//div[contains(@id,'true_view')])[1]//a)[1]", (result) => {
          profileName = result.value;
        });

      browser
        .useCss()
        .click('div[id^="true_view"] a');


      browser.windowHandles(function (result) {
        var handle = result.value[1];
        browser.switchWindow(handle);
      });


      browser.assert.urlContains('profile?profileid');

      browser
        .waitForElementPresent("div[data-test-selector='profile_photo_wrapper']");

      let newProfileName = "";
      browser.getAttribute("div[data-test-selector='profile_photo_wrapper'] + div span[title]", "title", (res) => {
        newProfileName = res.value;
        browser.assert.equal(newProfileName, profileName);
      });

      browser
        .useXpath();

    }
  };
