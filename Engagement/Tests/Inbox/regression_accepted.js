const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

const Inbox_Accepted = require("../../WebPages/Inbox/Accepted");
const Chat = require("../../WebPages/Chat.js")

let login, menu, accepted;
let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");

module.exports =
{
  '@tags': ['regression','cta'],

  before : function(browser) 
  {
    login = new Acquisition_Login(browser);
    menu = new Engagement_Menu(browser);
    accepted = new Inbox_Accepted(browser);
    

    let username = profile_test_data["inbox_accepted"][AB][environment][0];
    let pass = profile_test_data["inbox_accepted"][AB][environment][1];

    login.quickLogin(username, pass);
  },

  '[FREE Member] verify upgrade layer when click on - write message' : function(browser)
  {
    menu.visitMenuByURL("inbox", "accepted");
    accepted = new Inbox_Accepted(browser);
    let chat = new Chat(browser);

    chat.toggleChat("online");

    accepted.selectFilter("Accepted by me");
    browser
    .click("//button[@type='inbox'and @title='Write Message']")
    .waitForElementVisible("//div[text()='Upgrade now to get full access']/following-sibling::button")
    .click("//div[text()='Upgrade now to get full access']/following-sibling::button")
  },

  '[FREE Member] verify upgrade layer when click on - view contact' : function(browser)
  {
  
    browser
    .click("//button[@type='inbox'and @title='View Contact']")
    .waitForElementVisible("//div[text()='Upgrade now to get full access']/following-sibling::button")
    .click("//div[text()='Upgrade now to get full access']/following-sibling::button")
  }
   
}
