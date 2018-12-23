const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

const Inbox_Invitations = require("../../WebPages/Inbox/Invitations");

let login, menu, invitations;

let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");

module.exports =
  {
    '@tags': ['regression'],

    before: function (browser) {
      
      login = new Acquisition_Login(browser);
      menu = new Engagement_Menu(browser);
      invitations = new Inbox_Invitations(browser);

      let username = profile_test_data["inbox_invitation"][AB][environment][0];
      let pass = profile_test_data["inbox_invitation"][AB][environment][1];

      login.quickLogin(username, pass);
    },

    after: function (browser) {
      browser.useXpath();
    },

    'Verify data content - He invited you to Connect': function (browser) {
      menu.visitMenuByURL("inbox", "invitations");
      browser.waitForElementVisible("//h5[text()='He invited you to Connect']");
    },

    'verify premium filter displays premium matches': function (browser) {

      browser.refresh()
      invitations.clickTab("Pending Invitations");
      invitations.selectFilter("Premium Invitations");

      let totalMembers = 0;
      browser.elements("xpath", "//div[@data-test-selector='inboxItem_CTA ']", (res) => totalMembers = res.value.length);
      browser.elements("xpath", "//div[@type='inboxCard' and not(@src)]/following-sibling::div[1]//div[contains(@data-test-selector,'Premium')]", (res1) => {
        browser.assert.deepStrictEqual(res1.value.length, totalMembers, "Premium members count should be " + totalMembers);
      });

    },

    'verify description short summary is visible': +function (browser) {
      invitations = new Inbox_Invitations(browser);

      browser.useXpath();

      browser
        .useCss()
        .waitForElementPresent("div[data-test-selector='data-test-both_party_ab'] > div:nth-child(3) > div");
    },

    'Verify invitation CTA - Accept - for FREE & PREMIUM both': function (browser) {
      const login = new Acquisition_Login(browser);
      const menu = new Engagement_Menu(browser);

      // Open profile
      browser.url(test_url  + "/inbox/pending/interests")
      browser.pause(5000)

      //Accept button
      browser.click("//button[text()='Accept']")
      browser.pause(5000)
      browser.elements('xpath', "//button[@title='Close']/parent::div//button[@title='Accept']", function (elems) {
        if (elems.value.length > 0) {
          browser.click('xpath', "//button[@title='Close']/parent::div//button[@title='Accept']")
        }
        else {
          console.log("Free user")
        }
      })

    },

    'Verify invitation CTA - Decline - for FREE & PREMIUM both': function (browser) {
      //Decine button 
      browser.click("//span[text()='Decline']")
      browser.pause(5000)
      browser.refresh()
    },

    'Verify invitation CTA - write message  - for FREE & PREMIUM both': function (browser) {
      //Write Message button 
      browser.waitForElementVisible("//button[text()='Write Message']", 5000)
      browser.click("//button[text()='Write Message']")
      browser.refresh()
    },

    'Verify invitation CTA - view contact  - for FREE & PREMIUM both' : function(browser)
    {
      browser.waitForElementVisible("//button[text()='View Contact']", 5000)
      browser.click("//button[text()='View Contact']",)
      browser.elements('xpath',"(//div[@data-contactmodaltype='undefined']//button)[1]",function(elems){
        if(elems.value.length > 0){
          browser.click('xpath',"(//div[@data-contactmodaltype='undefined']//button)[1]")
        }
        else{
          console.log("Free user")
        }
      })
    },

    'Verify profile link opens in new tab': function (browser) {
      browser.useCss();

      browser
      .waitForElementVisible("div[type='inboxCard'] + div > div > div a")
      .click("div[type='inboxCard'] + div > div > div a");


      let window0, window1;
      browser.windowHandles(res => {
        window0 = res.value[0];
        window1 = res.value[1];
      });

      browser.windowHandles(res => {
        browser.switchWindow(window1);
      });

      //window 1 URL
      browser.url((current_url) => {
        browser.assert.ok(current_url.value.includes("profile?profileid"), "URL contains profile");
        //browser.waitForElementVisible("//div[@data-test-selector='profile_photo_wrapper']");
      });

      

      browser.windowHandles(res => {
        browser.closeWindow();
        browser.window("POST", window0);
      });

    },


  }
