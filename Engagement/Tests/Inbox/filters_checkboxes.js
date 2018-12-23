const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

const Inbox_Invitations = require("../../WebPages/Inbox/Invitations");
const Inbox_Accepted = require("../../WebPages/Inbox/Accepted");
const Inbox_Requests = require("../../WebPages/Inbox/Requests");
const Inbox_Sent = require("../../WebPages/Inbox/Sent");
const Inbox_Deleted = require("../../WebPages/Inbox/Deleted");

module.exports = 
{
  '@tags': ['lib_check','lib_inbox_checkbox'],

  'inbox page feasibilty' : (browser) => 
  {

    //object initialize
    const login = new Acquisition_Login(browser);
    const menu = new Engagement_Menu(browser);
    const invitations = new Inbox_Invitations(browser);
    const accepted = new Inbox_Accepted(browser);
    const requests = new Inbox_Requests(browser);
    const sent = new Inbox_Sent(browser);
    const deleted = new Inbox_Deleted(browser);

    login.quickLogin("snehak@bankas.in","test");
    
    menu.visitMenuByURL("inbox","invitations");
    invitations.selectFilter("Premium Invitations");
    invitations.selectFilter("Matching Preferences");
    invitations.selectFilter("Expiring Soon");
    invitations.selectFilter("All");
    invitations.clickTab("Filtered Out");
    invitations.clickTab("Pending Invitations");
    invitations.usePagination("Next");

    menu.visitMenuByURL("inbox","accepted");
    accepted.selectFilter("Accepted by me");
    accepted.selectFilter("Accepted by him");
    accepted.selectFilter("All")
    accepted.usePagination("Next");

    menu.visitMenuByURL("inbox","requests");
    requests.selectFilter("Photo Requests");
    requests.selectFilter("Phone Requests");
    requests.selectFilter("All")
    requests.clickTab("Accepted Requests");
    requests.clickTab("Sent Requests");
    requests.clickTab("Pending Requests");
    requests.usePagination("Next");

    menu.visitMenuByURL("inbox","sent");
    sent.selectFilter("Viewed by him");
    sent.selectFilter("Not Viewed by him");
    sent.selectFilter("All"); 
    sent.usePagination("Next");

    menu.visitMenuByURL("inbox","deleted");
    deleted.selectFilter("Cancelled by me");
    deleted.selectFilter("Cancelled by him");
    deleted.selectFilter("All"); 
    deleted.usePagination("Next");   
  }
};
