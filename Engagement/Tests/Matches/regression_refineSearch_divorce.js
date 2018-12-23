const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");
const Engage_Refine_Search = require("../../../Shared_Items/Comman_Library/Engagement_Refine_Search");

//library
const My_Matches = require("../../WebPages/Matches/My_Matches");

let login, menu , photos;
let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");

module.exports =
{
  '@tags': ['regression','refine_search'],

  before : function(browser)
  {
      let login = new Acquisition_Login(browser);
      let username = profile_test_data["refine_search_divorce"][AB][environment][0];
      let pass = profile_test_data["refine_search_divorce"][AB][environment][1];

      login.quickLogin(username, pass);
  },


  'filter check for divorced' : function(browser)
  {
    const menu = new Engagement_Menu(browser);
    const my_matches = new My_Matches(browser);
    const refine_search = new Engage_Refine_Search(browser);

    menu.visitMenuByURL("matches","my matches");

    refine_search.setMaritalStatus(["All"]);
    refine_search.setMaritalStatus(["Divorced"]);

    let totalMembers = 0;
    browser.elements("xpath","//div[starts-with(@id, 'true_view_')]", (res) => totalMembers = res.value.length);
    browser.elements("xpath","//div[starts-with(@id, 'true_view_')]//span[contains(text(),'Divorced')]", (res) => {
          browser.assert.deepStrictEqual(res.value.length, totalMembers,"Premium members count should be 20");
    });
}

};
