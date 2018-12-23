const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

const Advanced_Search = require("../../WebPages/Search/Advanced_Search");
const test_data = require("./Search_Test_Data.json");


module.exports = {
  
  '@tags': ['lib_check','lib_basic_search'],
  
    'Fillout all basic search page details' : (browser) => {

    const login = new Acquisition_Login(browser);
    const menu = new Engagement_Menu(browser);
    const advance_search = new Advanced_Search(browser);

    //login
    login.quickLogin("snehak@bankas.in","test");

    menu.visitMenuByURL("search");
    //visit advance search page
    menu.visitMenu("search","basic search");

    advance_search.setAge(test_data["age"]);
    advance_search.setHeight(test_data["height"]);

    advance_search.setMarital(test_data["dropdown"]["marital"]);
    advance_search.setChildrenDetails(test_data["has_children"]);
    advance_search.setReligion(test_data["dropdown"]["religion"]);
    advance_search.setMotherTongue(test_data["dropdown"]["mother_tongue"]);
    browser.pause(4000); //load ajax  call
    advance_search.setCommunity(test_data["dropdown"]["community"]);
   

    advance_search.setCountryLive(test_data["dropdown"]["country_live"]);
    browser.pause(4000); //load ajax  call
    advance_search.setState(test_data["dropdown"]["state"]);
    browser.pause(4000); //load ajax  call
    advance_search.setCity(test_data["dropdown"]["city"]);
    
 
    advance_search.setPhotoSetting(test_data["photo_setting"]);
    advance_search.selectDoNotShow(test_data["do_not_show"]);

    advance_search.clickSubmit();
    }
  };
