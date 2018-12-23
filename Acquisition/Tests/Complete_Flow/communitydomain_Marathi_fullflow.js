//acquistion library
const Reg_Basic_Details = require("../../WebPages/Reg_Basic_Details");
const Home = require("../../WebPages/Home");
const Reg_Loc_Mar_Comm = require("../../WebPages/Reg_Location_Marital_Community");
const Reg_Education_Work = require("../../WebPages/Reg_Education_Work");
const Reg_LifeStyle = require("../../WebPages/Reg_LifeStyle");
const Reg_About = require("../../WebPages/Reg_About");


//utilies
const Excel_Parser =  require("../../../Shared_Items/Utilities/Excel_Parser");
let {test_url,AB} = require("../../../shaadi.conf");

module.exports =
{
  '@tags': ['lib_check','complete_flow','regression','sanity'],

  'complete flow - India - Community domain site' : (browser) =>
  {
    const ods_parser = new Excel_Parser(process.cwd() + "/Acquisition/Tests/Complete_Flow/acq_test_data.ods");
    const test_data = ods_parser.getDataByRow(6);

    const home = new Home(browser);
    const reg_basic_details = new Reg_Basic_Details(browser);
    const reg_loc_mar_comm = new Reg_Loc_Mar_Comm(browser);
    const reg_education_work = new Reg_Education_Work(browser);
    const reg_life_style = new Reg_LifeStyle(browser);
    const reg_about = new Reg_About(browser);

    
    visitCommunityHomePage("Marathi");
    home.clickRegistration();
    
    reg_basic_details.setEmailid(test_data["emailid"],true);
    reg_basic_details.setPassword(test_data["password"]);
    reg_basic_details.setCreatedFor(test_data["createdfor"], test_data["gender"]);
    reg_basic_details.clickNext();

    reg_basic_details.setFullName(test_data["firstname"], test_data["lastname"]);
    reg_basic_details.setDateOfBirth(test_data["date"], test_data["month"], test_data["year"]);
    reg_basic_details.setReligion(test_data["religion"]);

    //verify Mothertounge is already set
    browser.waitForElementVisible('//div[@id="s2id_layer_mother_tongue_select"]/a/span[contains(text(),"Marathi")]')
    
    reg_basic_details.setCountry(test_data["country"]);
    reg_basic_details.clickSignUp();
    
    //verify browser url has marathishaadi in it
     browser.assert.urlContains('https://my.marathishaadi.com/profile-creation/step/1?');
    browser.waitForElementVisible('//input[@id="state"]');

    reg_loc_mar_comm.setState(test_data["state"]);
    reg_loc_mar_comm.setCity(test_data["city"]);
    reg_loc_mar_comm.setMarriedStatus(test_data["maritialstatus"]);
    reg_loc_mar_comm.setCaste(test_data["caste"]);

    //verify regional site has default value marathishaadi.com
    browser.expect.element('//*[@id="regionalSite"]').to.have.attribute("value").equals("MarathiShaadi.com")
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

    

    function visitCommunityHomePage(community) {
        
      let registration_selector = '//a[@id="sign_up_btn"]';
      let url = 'https://www.' + community + 'shaadi.com'
      browser
          .url(url)
         
    }

    
  }
};

