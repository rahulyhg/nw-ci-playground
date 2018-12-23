const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");

module.exports =
{
    '@tags': ['regression'],

    before : function(browser)
    {
    	let login = new Acquisition_Login(browser);
        let username = profile_test_data["regression_profile"][AB][environment][0];
        let pass = profile_test_data["regression_profile"][AB][environment][1];

        login.quickLogin(username, pass);
    },

  'Verify 6 sections of profile page' : (browser) =>
  {
    //object initialize
    const login = new Acquisition_Login(browser);
    const menu = new Engagement_Menu(browser);
    const profile = new Profile(browser);

    menu.visitMenuByURL("matches","my matches");

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

    browser
    .waitForElementPresent("div[data-test-selector='chat_link']");

    browser
    .verify.visible("span[icon='about']")
    .verify.visible("span[icon='contact_details']")
    .verify.visible("span[icon='lifestyle']")
    .verify.visible("span[icon='background']")
    .verify.visible("span[icon='education']")
    .verify.visible("span[icon='what']");

    browser.useXpath();    

  }
};