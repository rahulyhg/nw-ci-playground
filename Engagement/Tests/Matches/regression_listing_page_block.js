const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

//library
const My_Matches = require("../../WebPages/Matches/My_Matches");

let login, menu , photos;
let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");

module.exports =
{

  before : function(browser)
  {
    let login = new Acquisition_Login(browser);
      let username = profile_test_data["listing_page_block"][AB][environment][0];
      let pass = profile_test_data["listing_page_block"][AB][environment][1];

      login.quickLogin(username, pass);
  },

  'verify blocking a profile on listing page' : (browser) =>
  {
      const login = new Acquisition_Login(browser);
      const menu = new Engagement_Menu(browser);
      

      login.quickLogin("sam192@dhairya.in","test");
      menu.visitMenuByURL("matches","my matches");

      browser
      //Clicking on dropdown
      .waitForElementVisible("//div[contains(@id, 'true_view_')]")
      .waitForElementVisible("//*[@id='root']/div/div/div[2]/div[1]/div[1]/div/div[2]/div[2]/div[1]/div[2]/div[1]//*[@data-test-selector='listDropdown']")
      .click("//*[@id='root']/div/div/div[2]/div[1]/div[1]/div/div[2]/div[2]/div[1]/div[2]/div[1]//*[@data-test-selector='listDropdown']")
      //.click("//div[contains(@id, 'true_view_')]/div/div/div[3]/div[1]/div[1]/div[2]/button")
      //Clicking on Block profile
      .waitForElementVisible("//div//button[@data-test-selector='blockProfile']")
      .click("//div//button[@data-test-selector='blockProfile']")
      //Clicking on Confirm Button on pop Up
      .waitForElementVisible("//div//button[text()='Confirm']")
      .click("//div//button[text()='Confirm']")
      .pause(2000)

  }

}