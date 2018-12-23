//comman library
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
    let username = profile_test_data["growth_matches1"][AB][environment][0];
    let pass = profile_test_data["growth_matches1"][AB][environment][1];

    login.quickLogin(username, pass);
  },

  'Verifying "Upgrade Now" at top nav for free member ' : function(browser)
  {
    menu = new Engagement_Menu(browser);
 
    menu.visitMenuByURL("matches","my matches");
    
    browser
      .waitForElementVisible("//nav[@data-test-selector='topband_cta']")
      .expect.element("//nav[@data-test-selector='topband_cta']").text.to.contain('Upgrade Now');
  },

  'Verifying "Upgrade Now" at profile page for free member ' : function(browser)
  {
    let menu = new Engagement_Menu(browser);
 
    browser
      .useCss()
      .waitForElementVisible("div.matchesTourWrap")
      .click('div[id^="true_view"] a');

    browser.windowHandles(function(result) {
      var handle = result.value[1];
      browser.switchWindow(handle);
    })
    
    browser
      .useXpath()
      .waitForElementVisible("//div[@data-test-selector='contact_wrapper_cta']")
      .expect.element("//div[@data-test-selector='contact_wrapper_cta']").text.to.contain('Upgrade Now');

    menu.clickLogout();
  },

  'Verifying "renew premium" at top nav for lapsed profile ' : function(browser)
  {
    menu = new Engagement_Menu(browser);

    let username = profile_test_data["growth_matches2"][AB][environment][0];
    let pass = profile_test_data["growth_matches2"][AB][environment][1];

    login.quickLogin(username, pass);
    menu.visitMenuByURL("matches","my matches");
    
    browser
    .waitForElementVisible("//nav[@data-test-selector='topband_cta']")
    .expect.element("//nav[@data-test-selector='topband_cta']").text.to.contain('Renew Premium')
  },

  'Verifying "renew premium" at premium banner for lapsed profile ' : function(browser)
  {
    browser
      .waitForElementVisible("//div[@data-test-selector='match_list_cta']")
      .expect.element("//div[@data-test-selector='match_list_cta']").text.to.contain('RENEW PREMIUM');
    
  },
};
