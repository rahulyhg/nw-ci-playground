//comman library
const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

const profile_test_data = require("../../testdata_profiles.js");
let {test_url, AB, environment} = require("../../../shaadi.conf");

module.exports =
{ 
  '@tags': ['regression'],

  before : function(browser)
  {
      let login = new Acquisition_Login(browser);
      let username = profile_test_data["chat_membership1"][AB][environment][0];
      let pass = profile_test_data["chat_membership1"][AB][environment][1];

      login.quickLogin(username, pass);
  },

  'Verifying free user click on chat icon from list' : function(browser) 
  {
    menu = new Engagement_Menu(browser);
    menu.visitMenuByURL("matches","my matches");

    browser.waitForElementVisible("//div[contains(@id,'true_view')]");

    browser.elements('xpath', '//button[@title="Chat Now"]',(item) =>{
      for(let i=0;i < item.value.length;i++){
        let icon=item.value[0]['ELEMENT'];
        browser.elementIdClick(icon)
        .pause(2000)
        .waitForElementVisible("//div[text()='Upgrade now to get full access']")
        break;
      }
      browser.end();
    })
  },

  'verifying premium click on chat icon on listing page ' : function(browser)
  {
    login = new Acquisition_Login(browser);
    menu = new Engagement_Menu(browser);

    let username = profile_test_data["chat_membership2"][AB][environment][0];
    let pass = profile_test_data["chat_membership2"][AB][environment][1];

    login.quickLogin(username, pass);
    menu.visitMenuByURL("matches","my matches");

    browser.waitForElementVisible("//div[contains(@id,'true_view')]");

    browser.elements('xpath', '//button[@title="Chat Now"]',(item) =>{
      for(let i=0;i < item.value.length;i++){
        console.log("ooo : ",item.value[0])
        let icon=item.value[0]['ELEMENT'];
        browser.elementIdClick(icon)
        .pause(2000)
        .waitForElementVisible('//input[@type="text"]')
        .setValue('//input[@type="text"]', ['hi', browser.Keys.ENTER])
        .pause(2000)
        .click('//button[text()="X"]');
        break;
      } 
      browser.end();
    })
  }
};