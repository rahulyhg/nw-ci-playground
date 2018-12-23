//acquistion library
const Reg_Basic_Details = require("../../WebPages/Reg_Basic_Details");
const Home = require("../../WebPages/Home");
const Reg_Loc_Mar_Comm = require("../../WebPages/Reg_Location_Marital_Community");
const Reg_Education_Work = require("../../WebPages/Reg_Education_Work");
const Reg_LifeStyle = require("../../WebPages/Reg_LifeStyle");
const Reg_About = require("../../WebPages/Reg_About");
let {test_url,AB} = require("../../../shaadi.conf");

//utilies
const Excel_Parser =  require("../../../Shared_Items/Utilities/Excel_Parser");

module.exports =
{
  '@tags': ['lib_check','complete_flow','regression','sanity'],

  'complete flow - India' : (browser) =>
  {
    const ods_parser = new Excel_Parser(process.cwd() + "/Acquisition/Tests/Complete_Flow/acq_test_data.ods");
    const test_data = ods_parser.getDataByRow(5);

    const home = new Home(browser);
    const reg_basic_details = new Reg_Basic_Details(browser);
    const reg_loc_mar_comm = new Reg_Loc_Mar_Comm(browser);
    const reg_education_work = new Reg_Education_Work(browser);
    const reg_life_style = new Reg_LifeStyle(browser);
    const reg_about = new Reg_About(browser);

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

    reg_loc_mar_comm.setState(test_data["state"]);
    reg_loc_mar_comm.setCity(test_data["city"]);
    reg_loc_mar_comm.setMarriedStatus(test_data["maritialstatus"]);
    reg_loc_mar_comm.setCaste(test_data["caste"]);
    reg_loc_mar_comm.clickContinue();

    browser.pause(2000); //Page transition
    reg_education_work.setEducationLevel(test_data["educationlevel"]);
    reg_education_work.setEductionField(test_data["educationfield"]);
    reg_education_work.setCollege1(test_data["college"]);
    reg_education_work.setWorkingWith(test_data["workwith"]);
    reg_education_work.setOccupation(test_data["occupation"]);
    reg_education_work.setIncome(test_data["annualincome"]);
    reg_education_work.clickContinue();

    browser.pause(2000); //Page transition
    reg_life_style.setDiet(test_data["diet"]);
    reg_life_style.setHeight(test_data["height"]);
    reg_life_style.setBodyType(test_data["bodytype"]);

    reg_life_style.setSkinTone(test_data["skintone"]);
    reg_life_style.setSmoke(test_data["smoke"]);
    reg_life_style.setDrink(test_data["drink"]);
    
    reg_life_style.clickContinue();

    reg_about.setAboutYourself();
    reg_about.setMobileNumber(test_data["mobile"]);
    reg_about.clickCreateProfile();
  }
};