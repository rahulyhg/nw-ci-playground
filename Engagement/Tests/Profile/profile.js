const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

const Profile = require("../../WebPages/Profile");

module.exports =
{
    '@tags': ['lib_check','lib_profile_page'],

  'Profile page feasibility' : (browser) =>
  {
    //object initialize
    const login = new Acquisition_Login(browser);
    const menu = new Engagement_Menu(browser);
    const profile = new Profile(browser);

    login.quickLogin("snehak@bankas.in","test");
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
    
    /*
    profile.clickConnectNow();
    profile.clickNextProfile();
    profile.clickPrevProfile();
*/
    browser
    .url("https://my.shaadi.com/profile?profileid=qSH52565308")
    .waitForElementPresent("div[data-test-selector='chat_link']");

    profile.clickNextPhoto();
    profile.clickNextPhoto();
    profile.clickNextPhoto();
    profile.clickPrevPhoto();
  }
};