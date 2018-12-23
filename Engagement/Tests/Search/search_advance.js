const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

const Advanced_Search = require("../../WebPages/Search/Advanced_Search");
const test_data = require("./Search_Test_Data.json");


module.exports = {
  
  '@tags': ['lib_check','lib_adv_search'],
  
    'Fillout all advance search page details' : (browser) => {

    const login = new Acquisition_Login(browser);
    const menu = new Engagement_Menu(browser);
    const advance_search = new Advanced_Search(browser);

    //login
    login.quickLogin("snehak@bankas.in","test");

    menu.visitMenuByURL("search");
    //visit advance search page
    menu.visitMenu("search","advanced search");

    
    advance_search.selectLookingFor(test_data["looking_for"]);
    advance_search.setAge(test_data["age"]);
    advance_search.setHeight(test_data["height"]);

    advance_search.setMarital(test_data["dropdown"]["marital"]);
    advance_search.setChildrenDetails(test_data["has_children"]);
    advance_search.setReligion(test_data["dropdown"]["religion"]);
    advance_search.setMotherTongue(test_data["dropdown"]["mother_tongue"]);
    browser.pause(4000); //load ajax  call 
    advance_search.setCommunity(test_data["dropdown"]["community"]);
   

    advance_search.isManglik(test_data["is_Manglik"]);
    advance_search.setCountryLive(test_data["dropdown"]["country_live"]);
    browser.pause(4000); //load ajax  call 
    advance_search.setState(test_data["dropdown"]["state"]);
    browser.pause(4000); //load ajax  call 
    advance_search.setCity(test_data["dropdown"]["city"]);
    advance_search.setResidency(test_data["dropdown"]["residency"]);
    advance_search.setCountryGrew(test_data["dropdown"]["country_grew"]);
    advance_search.setEducation(test_data["dropdown"]["education"]);
    advance_search.setEducationArea(test_data["dropdown"]["education_area"]);
    advance_search.setWorking(test_data["dropdown"]["working"]);
    advance_search.setProfession(test_data["dropdown"]["profession"]);
    

    advance_search.setDiet(test_data["life_style"]["diet"]);
    advance_search.setSmoke(test_data["life_style"]["smoke"]);
    advance_search.setDrink(test_data["life_style"]["drink"]);
    advance_search.setBodyType(test_data["life_style"]["body_type"]);
    advance_search.setSkinTone(test_data["life_style"]["skin_tone"]);
    advance_search.setKeywordSearch(test_data["keyword_search"]);

    advance_search.setPhotoSetting(test_data["photo_setting"]);
    advance_search.setProfileCreatedBy(test_data["created_by"]);
    advance_search.hasHoroscope(test_data["has_horoscope"]);
    advance_search.selectDoNotShow(test_data["do_not_show"]);
    advance_search.clickSubmit();
    }
  };
