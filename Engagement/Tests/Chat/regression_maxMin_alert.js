//comman library
const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");
const profile_test_data = require("../../testdata_profiles.js");

let {test_url, AB, environment} = require("../../../shaadi.conf");
let login, username, pass;

module.exports =
{
  '@tags': ['regression'],

  before : function(browser)
  {
      login = new Acquisition_Login(browser);
      username = profile_test_data["chat_maxmin_alert"][AB][environment][0];
      pass = profile_test_data["chat_maxmin_alert"][AB][environment][1];

      login.quickLogin(username, pass);
  },

  'verifying minimize and maximize click on buddylist ' : function(browser)
    {
      let menu = new Engagement_Menu(browser);
      menu.visitMenuByURL("matches","my matches");

      browser.click('//*[@id="root"]/div/div/div[2]/div[2]/div[1]/div[1]/div[2]')//To minimize
      .pause(2000)
      .click('//button[text()="Active ("]')//To maximize
      .pause(1000)

      browser.end();
    },


  'Verifying cancel for offline functionality of buddylist on alert' : function(browser)
  {
    login = new Acquisition_Login(browser);
    menu = new Engagement_Menu(browser);

    login.quickLogin(username, pass);
    menu.visitMenuByURL("matches","my matches");

    browser.waitForElementVisible('//span[@icon="online"]', 3000)
    browser.click('//span[@icon="online"]')//checking member is online for chat
    browser.waitForElementVisible('//span[@icon="offline"]', 1000)
    browser.click('//span[@icon="offline"]')//clicking offline option from dropdown
    browser.dismissAlert();//cancelling going offline
    browser.pause(1000);
  },

  'Verifying accept for offline functionality of buddylist on alert' : function(browser)
  {    
    browser.waitForElementVisible('//span[@icon="online"]', 3000)
    browser.click('//span[@icon="online"]')//checking member is online for chat
    browser.waitForElementVisible('//span[@icon="offline"]', 1000)
    browser.click('//span[@icon="offline"]')//clicking offline option from dropdown
    browser.acceptAlert();//ok going offline
    browser.pause(1000);
  }

};
