const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

//library
const My_Matches = require("../../WebPages/Matches/My_Matches");

let login, menu, photos;
let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");

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

this.before = (browser) => {
  login = new Acquisition_Login(browser);
  menu = new Engagement_Menu(browser);

  let username = profile_test_data["listing_page_misuse"][AB][environment][0];
  let pass = profile_test_data["listing_page_misuse"][AB][environment][1];

  login.quickLogin(username, pass);

  menu.visitMenuByURL("matches", "my matches");
  toggleChat(browser,"offline")
  browser.refresh()

}

reasons.forEach((reason, i) => {

  this[`verify - "${reason}"`] = function (browser) {


    const dropdownSelector = "//*[@id='root']/div/div/div[2]/div[1]/div[1]/div/div[2]/div[2]/div[1]/div[2]/div[div[contains(@id, 'true_view_')]][" + (i + 1) + "]//*[@data-test-selector='listDropdown']";
    const reportMisuseBtn = dropdownSelector + "//button[@data-test-selector='reportProfilePhoto']";
    browser
      .pause(5000)
      
      .waitForElementVisible(dropdownSelector)
      .click(dropdownSelector)
      .pause(2000)
      .waitForElementVisible(reportMisuseBtn)
      .click(reportMisuseBtn)
      .pause(2000)
      .click("//input[@value='" + reason + "']")
      .click("//button[contains(text(),'Continue')]")
      .pause(2000)
      .waitForElementVisible("//textarea[@data-test-selector='report_misuse_reason_text']")
      .setValue("//textarea[@data-test-selector='report_misuse_reason_text']", 'test')
      .waitForElementVisible("//button[contains(text(),'Submit')]")
      .click("//button[contains(text(),'Submit')]")
      .pause(10000)


  }
});


function toggleChat(browser,status)
    {
        browser.getText("//span[@icon='dropdown']/ancestor::div[6]//nav/button[3]",(result) => {
             if((result.value).includes("Active") && status == "offline")
            {
                browser.waitForElementVisible('//span[@icon="online"]')
                browser.click('//span[@icon="online"]')//checking member is online for chat
                browser.waitForElementVisible('//span[@icon="offline"]')
                browser.click('//span[@icon="offline"]')//clicking offline option from dropdown
                browser.pause(2000);
                browser.acceptAlert();//ok going offline
            }
            else if((result.value).includes("Go Online") && status == "online")
            {
                browser.waitForElementVisible('//button[text()="Go Online"]')
                browser.click('//button[text()="Go Online"]')//making online again
            }
        })
    }