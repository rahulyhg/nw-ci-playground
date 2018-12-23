const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

//library
const My_Matches = require("../../WebPages/Matches/My_Matches");

let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");

let login, menu , photos;

module.exports =
{
  before : function(browser)
  {
      let login = new Acquisition_Login(browser);
      let username = profile_test_data["listing_page_ignore"][AB][environment][0];
      let pass = profile_test_data["listing_page_ignore"][AB][environment][1];

      login.quickLogin(username, pass);
  },

  'verify Ignoring a profile on listing page' : (browser) =>
  {
      const menu = new Engagement_Menu(browser);
      
      menu.visitMenuByURL("matches","my matches");

      browser
      //Clicking on dropdown
      .waitForElementVisible("//div[contains(@id, 'true_view_')]")
      .waitForElementVisible("//*[@id='root']/div/div/div[2]/div[1]/div[1]/div/div[2]/div[2]/div[1]/div[2]/div[1]//*[@data-test-selector='listDropdown']")
      .click("//*[@id='root']/div/div/div[2]/div[1]/div[1]/div/div[2]/div[2]/div[1]/div[2]/div[1]//*[@data-test-selector='listDropdown']")
      //Clicking on Don't show again
      .waitForElementVisible("//div//button[@data-test-selector='dontShowAgain']")
      .click("//div//button[@data-test-selector='dontShowAgain']")
      .pause(2000);

  }

}