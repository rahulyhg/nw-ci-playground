//comman library
const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");

module.exports = 
{
  '@tags': ['chat'],

  before : function(browser)
    {
        let login = new Acquisition_Login(browser);
    
        let username = profile_test_data["chat_others"][AB][environment][0];
        let pass = profile_test_data["chat_others"][AB][environment][1];

        login.quickLogin(username, pass);
    },

  'Verifying page refresh to check status is maintained' : function(browser)
  {
    menu = new Engagement_Menu(browser);
    
    browser.refresh();
    browser.waitForElementNotVisible('//span[@icon="online"]', 500)
  },

  'Verifying online functionality from offline status of buddylist' : function(browser)
  {
    login = new Acquisition_Login(browser);
    menu = new Engagement_Menu(browser);

    browser.waitForElementVisible('//button[text()="Go Online"]')
    browser.click('//button[text()="Go Online"]')//making online again
  },
};
