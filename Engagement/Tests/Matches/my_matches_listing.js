const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");
const Engage_Refine_Search = require("../../../Shared_Items/Comman_Library/Engagement_Refine_Search");

//library
const My_Matches = require("../../WebPages/Matches/My_Matches");

module.exports = {
  
  '@tags': ['lib_check','lib_my_matches'],
  
    'various items to check on listing pages' : (browser) => {

        //object initialize
        const login = new Acquisition_Login(browser);
        const menu = new Engagement_Menu(browser);
        const my_matches = new My_Matches(browser);

        login.quickLogin("snehak@bankas.in","test");
        menu.visitMenuByURL("matches","my matches");

        my_matches.selectSortOrder("Last Logged In");
        my_matches.togglePrefMatches();        
        my_matches.usePagination("Next");
      
    }
  };
