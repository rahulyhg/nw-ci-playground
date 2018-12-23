//acquistion library
const Reg_Basic_Details = require("../../../Acquisition/WebPages/Reg_Basic_Details");
const Home = require("../../../Acquisition/WebPages/Home");
const Reg_Loc_Mar_Comm = require("../../../Acquisition/WebPages/Reg_Location_Marital_Community");
const Reg_Education_Work = require("../../../Acquisition/WebPages/Reg_Education_Work");
const Reg_LifeStyle = require("../../../Acquisition/WebPages/Reg_LifeStyle");
const Reg_About = require("../../../Acquisition/WebPages/Reg_About");

//utilies
const Excel_Parser = require("../../../Shared_Items/Utilities/Excel_Parser");
const ods_parser = new Excel_Parser(process.cwd() + "/Acquisition/Tests/Comman_Test_Data/member_registration_data.ods");

let test_data, home, reg_basic_details, reg_loc_mar_comm, reg_education_work, reg_life_style;
let {test_url,AB} = require("../../../shaadi.conf");


this['@tags'] = ['NRI', 'regression', 'functional'],

  this.before = (browser) => {
    home = new Home(browser);
    reg_basic_details = new Reg_Basic_Details(browser);
    reg_loc_mar_comm = new Reg_Loc_Mar_Comm(browser);
    reg_education_work = new Reg_Education_Work(browser);
    reg_life_style = new Reg_LifeStyle(browser);

  }

//["USA","CANADA","UK","AUS","NZ","UAE","JAP"]
["USA", "NZ", "UK", "AUS", "CAN"].forEach((item) => {

  this[`check for invalid ${item} zip and error label`] = function (browser) {

    test_data = ods_parser.getSingleDataByAccountType("NRI-USA-tc1");

    home.visitHomePage();
    home.clickRegistration();

    reg_basic_details.setEmailid(test_data["emailid"], true);
    reg_basic_details.setPassword(test_data["password"]);
    reg_basic_details.setCreatedFor(test_data["createdfor"]);

    reg_basic_details.clickNext();

    reg_basic_details.setFullName(test_data["firstname"], test_data["lastname"]);
    reg_basic_details.setDateOfBirth(test_data["date"], test_data["month"], test_data["year"]);
    reg_basic_details.setReligion(test_data["religion"]);
    reg_basic_details.setMotherTongue(test_data["mothertongue"]);

    let test_country_acc = "";

    if (item == "USA") test_country_acc = "NRI-USA-tc1";
    if (item == "UK") test_country_acc = "NRI-UK-tc1";
    if (item == "AUS") test_country_acc = "NRI-AUS-tc1";
    if (item == "NZ") test_country_acc = "NRI-NZ-tc1";
    if (item == "CAN") test_country_acc = "NRI-CAN-tc1";

    test_data = ods_parser.getSingleDataByAccountType(test_country_acc);

    reg_basic_details.setCountry(test_data["country"]);
    reg_basic_details.clickSignUp();
    
    browser
    .url(test_url + '/profile-creation/step/1?')
    .waitForElementVisible('//input[@id="state"]');
    
    if (item == "CAN") {
      browser.waitForElementNotPresent('//*[@id="zip"]')
    }
    else {
      reg_loc_mar_comm.setZipCode("xyz");
      reg_loc_mar_comm.clickContinue();

      browser
        .useCss()
        .verify.containsText("#zip-helper-text", "Please enter a valid ZIP code/Postal code.")
        //.verify.containsText("form#basic > div > div + div", "Please enter a valid ZIP code/Postal code.")
        .useXpath();
    }
  },

    this[`check for valid ${item} zip`] = function (browser) {
      if (item == "CAN") {
        console.log("zip not present")
      }
      else {
        reg_loc_mar_comm.setZipCode(test_data["zipcode"]);
        reg_loc_mar_comm.clickContinue();

        browser
          .useCss()
          .expect.element("#zip-helper-text").to.not.be.present;
        browser.useXpath();
      }
    
},

  this[`check ${item} currency symbol`] = function (browser) {
    if (item == "CAN") {
      reg_loc_mar_comm.setState(test_data["state"]);
      reg_loc_mar_comm.setCity(test_data["city"]);
    }
    reg_loc_mar_comm.setLivingCountrySince(test_data["livingincountrysince"]);
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
  },

  this[`verify skintone does not exist for ${item}`] = function (browser) {
    browser.expect.element('//button[@name="complexion"]').to.not.be.present;
  }

});









