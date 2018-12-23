const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");
const Engage_Refine_Search = require("../../../Shared_Items/Comman_Library/Engagement_Refine_Search");

//library
const My_Matches = require("../../WebPages/Matches/My_Matches");

let login, menu , photos;
let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");

let username, pass, login;
module.exports =
{
  '@tags': ['regression','refine_search'],
  
  before : function(browser)
  {
      login = new Acquisition_Login(browser);
      username = profile_test_data["matches_DR_local"][AB][environment][0];
      pass = profile_test_data["matches_DR_local"][AB][environment][1];

      login.quickLogin(username, pass);
  },
  
  'DR contains contact details - PREMIUM' : function(browser)
  {
    const menu = new Engagement_Menu(browser);

    browser
    .url(test_url)
    .waitForElementPresent("//div[contains(@id,'true_view')]");

    browser
    .url(test_url + "/profile/daily-recommendations")
    .waitForElementVisible("//div[@id='data_test_contact_wrapper']")

    browser.getText("//div[@id='data_test_contact_number']", (res)=> {
        browser.assert.ok((res.value).includes("XXX"),"contact number is masked")
    })

    browser.getText("//div[@id='data_test_contact_email']", (res)=> {
        browser.assert.ok((res.value).includes("XXX"), "contact email is masked")
    })

    browser.waitForElementVisible("//div[@id='data_test_contact_wrapper']//a[contains(text(),'View Details')]");

    menu.clickLogout();
  },

  'DR contains contact details - FREE' : function(browser)
  {
    const login = new Acquisition_Login(browser);

    login.quickLogin(username, pass);

    browser
    .url(test_url)
    .waitForElementPresent("//div[contains(@id,'true_view')]");

    browser
    .url(test_url+ "/profile/daily-recommendations")
    .waitForElementVisible("//div[@id='data_test_contact_wrapper']")
    
    browser.getText("//div[@id='data_test_contact_number']", (res)=> {
        browser.assert.ok((res.value).includes("XXX"),"contact number is masked")
    })

    browser.getText("//div[@id='data_test_contact_email']", (res)=> {
        browser.assert.ok((res.value).includes("XXX"), "contact email is masked")
    })

    browser.getText("//div[@id='data_test_contact_wrapper']//a", (res)=> {
        browser.assert.ok((res.value).includes("Upgrade"), "Upgrade link exist")
    })

    browser.getAttribute("//div[@id='data_test_contact_wrapper']//a","href", (res)=> {
        browser.assert.ok((res.value).includes("/payment"), "Upgrade link as payment URL")
    })

    browser.getAttribute("//div[@id='data_test_contact_wrapper']//a","target", (res)=> {
        browser.assert.ok((res.value).includes("_blank"), "Upgrade link can open as new page")
    })

    browser.click("//div[@id='data_test_contact_wrapper']//a");

    let window0, window1;
    browser.windowHandles(res => {
        window0 = res.value[0];
        window1 = res.value[1];
    });
        
    browser.windowHandles(res => {
        browser.switchWindow(window1);
    });

    //window 1 URL
    browser.url((current_url)=> {
        browser.assert.ok(current_url.value.includes("payment?source=profilepage_contactdetailscard"),"Page redirects to payment page");
    });

  },
};
