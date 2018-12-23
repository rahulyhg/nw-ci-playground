const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");
const Engage_Refine_Search = require("../../../Shared_Items/Comman_Library/Engagement_Refine_Search");

const test_data =  require("./refine_search_test_data.json")
module.exports = {
  
  '@tags': ['lib_check','lib_refine_search'],
  
    'Refine search menu' : (browser) => {

    const login = new Acquisition_Login(browser);
    const menu = new Engagement_Menu(browser);
    const refine_search = new Engage_Refine_Search(browser);

    //login
    login.quickLogin("snehak@bankas.in","test");
    menu.visitMenuByURL("matches","my matches");

    refine_search.setRecentlyViewed(test_data["recently_viewed"]);
    refine_search.setMatches(test_data["matches"]);

    refine_search.setPhotoSetting("Protected Photo");
    refine_search.setRecentlyJoined(test_data["recently_joined"]);

    refine_search.setActiveMembers(test_data["active_members"]);
    refine_search.setAnnualIncome(test_data["annual_income"]);

    refine_search.setMaritalStatus(test_data["marital_status"]);
    refine_search.setReligion(test_data["religion"]);

    refine_search.setReligion(test_data["religion"]);
    refine_search.setCommunity(test_data["community"]);
    refine_search.setMotherTongue(test_data["mother_tongue"]);

    refine_search.setManglik(test_data["manglik"]);

    refine_search.setCountryLivingIn(test_data["country_living"]);
    refine_search.setStateLivingIn(test_data["state_living"]);
    refine_search.setCountryGrewUpIn(test_data["country_grew"]);
    refine_search.setCountryGrewUpIn(test_data["country_grew"]);

    refine_search.setEducation(test_data["education"]);

    refine_search.setWorkingWith(test_data["working_with"]);
    refine_search.setProfessionalArea(test_data["profession_area"]);
    refine_search.setProfileCreatedBy(test_data["profile_created_by"]);
    refine_search.setSmoking(test_data["smoking"]);
    refine_search.setDrinking(test_data["drinking"]);
    refine_search.setEatingHabits(test_data["eating_habits"]);
      
    }
  };
