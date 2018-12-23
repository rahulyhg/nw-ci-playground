const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

const Inbox_Deleted = require("../../WebPages/Inbox/Deleted");

let login, menu, delected;
let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");
const Chat = require("../../WebPages/Chat.js");

module.exports =
{
  '@tags': ['regression'],

  before : function(browser) 
  {
    login = new Acquisition_Login(browser);
    menu = new Engagement_Menu(browser);
    delected = new Inbox_Deleted(browser);

    let username = profile_test_data["inbox_deleted"][AB][environment][0];
    let pass = profile_test_data["inbox_deleted"][AB][environment][1];

    login.quickLogin(username, pass);
  },

  after : function(browser) {
    browser.useXpath();
  },

   'verify text - when cancelled by him' : function(browser)
   {
    delected = new Inbox_Deleted(browser);
    menu.visitMenuByURL("inbox", "deleted");

    delected.selectFilter("Cancelled by undefined");

    let decline_msg_selector = "div[type='inboxCard']:not([src]) + div + div span";
    browser
    .useCss()
    .waitForElementVisible(decline_msg_selector)
    .elements("css selector",decline_msg_selector, (items) => {

      let possibleText = ["He Cancelled your Invitation. This member cannot be contacted.","He Declined your Invitation. This member cannot be contacted.","He Cancelled his Invitation. This member cannot be contacted."];
      for(let i=0;i < items.value.length;i++)
      {
        browser.elementIdText(items.value[i].ELEMENT, (txt) => {
          console.log(txt.value)
          browser.assert.ok(possibleText.includes(txt.value),"[BY OTHER] Cancel / decline message is visible");
        });
      };
    });

    browser.useXpath();
   },

   'verify text - when cancelled by me' : function(browser)
   {
    delected.selectFilter("All");
    delected.selectFilter("Cancelled by me");

    let decline_msg_selector = "div[type='inboxCard']:not([src]) + div > div:nth-child(3)";

    browser
    .useCss()
    .waitForElementVisible(decline_msg_selector)
    .elements("css selector",decline_msg_selector, (items) => {

      let possibleText = ["You Declined his Invitation","You cancelled your Invitation"];
      for(let i=0;i < items.value.length;i++)
      {
        browser.elementIdText(items.value[i].ELEMENT, (txt) => {
          browser.assert.ok(possibleText.includes(txt.value),"[BY ME] Cancel / decline message is visible");
        });
      }
    });
    browser.useXpath();
   }
}
