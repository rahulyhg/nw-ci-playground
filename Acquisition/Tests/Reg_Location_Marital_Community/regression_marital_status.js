//acquistion library
const Reg_Basic_Details = require("../../../Acquisition/WebPages/Reg_Basic_Details");
const Home = require("../../../Acquisition/WebPages/Home");
const Reg_Loc_Mar_Comm = require("../../../Acquisition/WebPages/Reg_Location_Marital_Community");

//utilies
const Excel_Parser =  require("../../../Shared_Items/Utilities/Excel_Parser");
let {test_url,AB} = require("../../../shaadi.conf");

module.exports =
{
  '@tags': ['regression','martial_status'],

  before : function(browser) {
    const ods_parser = new Excel_Parser(process.cwd() + "/Acquisition/Tests/Comman_Test_Data/member_registration_data.ods");
    const test_data = ods_parser.getSingleDataByAccountType("Martial-status-test1");

    const home = new Home(browser);
    const reg_basic_details = new Reg_Basic_Details(browser);
    

    home.visitHomePage();
    home.clickRegistration();
    
    reg_basic_details.setEmailid(test_data["emailid"],true);
    reg_basic_details.setPassword(test_data["password"]);
    reg_basic_details.setCreatedFor(test_data["createdfor"], test_data["gender"]);
    reg_basic_details.clickNext();

    reg_basic_details.setFullName(test_data["firstname"], test_data["lastname"]);
    reg_basic_details.setDateOfBirth(test_data["date"], test_data["month"], test_data["year"]);
    reg_basic_details.setReligion(test_data["religion"]);
    reg_basic_details.setMotherTongue(test_data["mothertongue"]);
    reg_basic_details.setCountry(test_data["country"]);
    reg_basic_details.clickSignUp();
    
    browser
    .url(test_url + '/profile-creation/step/1?')
    .waitForElementVisible('//input[@id="state"]');
  },

  'never married should not display children' : function(browser)
  {
    const reg_loc_mar_comm = new Reg_Loc_Mar_Comm(browser);

    reg_loc_mar_comm.setMarriedStatus("Never Married");
    browser.waitForElementNotPresent('//*[@id="haveChildren"]',2000);
  },

  'Verify martial status(married) selections and clicks' : function(browser)
  {
    const reg_loc_mar_comm = new Reg_Loc_Mar_Comm(browser);

    let statusArray = [ "Divorced" , "Widowed" , "Awaiting Divorce" , "Annulled"];
    statusArray.forEach( status => {
      reg_loc_mar_comm.setMarriedStatus(status);
    })
  },

  'Verify children options is visible and clicked' : function(browser)
  {
    const reg_loc_mar_comm = new Reg_Loc_Mar_Comm(browser);

    let statusArray = [ "Divorced" , "Widowed" , "Awaiting Divorce" , "Annulled"];
    statusArray.forEach( status => {
      reg_loc_mar_comm.setMarriedStatus(status);
      
      browser.waitForElementVisible("//div[@id='haveChildren']");
      
      //click No
      reg_loc_mar_comm.setHasChildren("No");
      browser.waitForElementNotPresent("//div[@id='noOfChildren']");

      //click Yes - living together
      reg_loc_mar_comm.setHasChildren("Yes. Living together");

      //verify children are clickable
      reg_loc_mar_comm.setChildren("1");
      reg_loc_mar_comm.setChildren("2");
      reg_loc_mar_comm.setChildren("3");
      reg_loc_mar_comm.setChildren("More than 3");
      
      //click Yes. Not living together
      reg_loc_mar_comm.setHasChildren("Yes. Not living together");

      //verify children are clickable
      reg_loc_mar_comm.setChildren("1");
      reg_loc_mar_comm.setChildren("2");
      reg_loc_mar_comm.setChildren("3");
      reg_loc_mar_comm.setChildren("More than 3");

    })
  },
};
