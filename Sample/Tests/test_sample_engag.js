//comman library
const Acquisition_Login = require("../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../Shared_Items/Comman_Library/Engagement_Menu");

//engagement library
const Advanced_Search = require("../../Engagement/WebPages/Search/Advanced_Search");

//test data
const test_data = require("./Engage_Test_Data.json")

module.exports = 
{
  '@tags': ['sample'],

  'Verify children drop down exist for divorced on advance search' : (browser) =>
  {
    const login = new Acquisition_Login(browser);
    const menu = new Engagement_Menu(browser);
    const advanced_search = new Advanced_Search(browser);

    //Login with user name, password
    let username = test_data["login_credentials"]["username"];
    let pass = test_data["login_credentials"]["password"];
    login.quickLogin(username, pass);

    // visit menu - search -> advanced search
    menu.visitMenu("search","advanced search");

    // select marital dropdown and select few items
    let marital_data = test_data["dropdown"]["marital"];
    advanced_search.setMarital(marital_data);

    // Verify the radio box data content.
    let children_divorce_radio_label = test_data["children_radio_item"];
    advanced_search.verifyChildrenForDivorced(children_divorce_radio_label);
  }
};