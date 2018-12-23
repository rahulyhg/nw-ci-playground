const Acquisition_Login = require("../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../Shared_Items/Comman_Library/Engagement_Menu");

module.exports = 
{
  '@tags': ['template'],

  'Template' : (browser) => 
  {

    //object initialize
    const login = new Acquisition_Login(browser);
    const menu = new Engagement_Menu(browser);

    login.quickLogin("riya1@bankas.in","test");
    menu.visitMenu("inbox","requests");
  }
};
