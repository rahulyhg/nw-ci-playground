const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

const Profile = require("../../WebPages/Profile");

// let login, menu, photos;

// var reasons = [
//   "Phone number is incorrect/unreachable",
//   "Incorrect Profile information",
//   "Multiple profiles on Shaadi.com",
//   "Member is married/engaged",
//   "Member uses abusive/indecent language",
//   "Member is Stalking me with messages/calls",
//   "Member has no intent to marry",
//   "Asking for money/Scammer",
//   "Inappropriate Photo",
//   "Photo belongs to someone else",
// ];

// this.before = (browser) => {
//   login = new Acquisition_Login(browser);
//   menu = new Engagement_Menu(browser);


//   login.quickLogin("jarjar61@bankas.in", "test");
//   menu.visitMenuByURL("matches", "my matches");
//   toggleChat(browser,"offline")
//   browser.refresh()

// }

let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");

module.exports =
{
    '@tags': ['regression'],

    before : function(browser)
    {
    	let login = new Acquisition_Login(browser);
        let username = profile_test_data["profile_misuse"][AB][environment][0];
        let pass = profile_test_data["profile_misuse"][AB][environment][1];

        login.quickLogin(username, pass);
    },

  'Verifing 10 options of Report Misuse for profile page' : (browser) =>
  {
    //object initialize
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
    browser.pause(2000);

    var reasons = [
        "Phone number is incorrect/unreachable",
        "Incorrect Profile information",
        "Multiple profiles on Shaadi.com",
        "Member is married/engaged",
        "Member uses abusive/indecent language",
        "Member is Stalking me with messages/calls",
        "Member has no intent to marry",
        "Asking for money/Scammer",
        "Inappropriate Photo",
        "Photo belongs to someone else",
    ];
    for(var i = 1; i <= reasons.length; i++) {
        const reason = reasons[i-1];
    browser.useXpath()
    
    .click("//div[@data-test-selector='list_dropdown_wrap_profile_page']")
    .pause(1000)
    .click("//button[@data-test-selector='reportProfilePhotoProfilePage']")
    .pause(1000)
    .click("//input[@value='"+reason+"']")
    .click("//button[contains(text(),'Continue')]")
    .pause(2000)
    .waitForElementVisible("//textarea[@data-test-selector='report_misuse_reason_text']")
    .setValue("//textarea[@data-test-selector='report_misuse_reason_text']", 'test')
    .pause(3000)
    .click("//*[@data-test-selector='report_misuse_reason_submit']")
    .pause(10000)
    .click("//div[contains(text(),'Next')]")
    .pause(10000)
    }

  }
};