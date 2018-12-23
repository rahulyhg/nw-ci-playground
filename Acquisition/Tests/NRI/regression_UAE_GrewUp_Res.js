//acquistion library
const Reg_Basic_Details = require("../../WebPages/Reg_Basic_Details");
const Home = require("../../WebPages/Home");
const Reg_Loc_Mar_Comm = require("../../WebPages/Reg_Location_Marital_Community");
//utilies
const Excel_Parser = require("../../../Shared_Items/Utilities/Excel_Parser");
const ods_parser = new Excel_Parser(process.cwd() + "/Acquisition/Tests/Comman_Test_Data/member_registration_data.ods");

let test_data;
let {test_url,AB} = require("../../../shaadi.conf");

module.exports =
  {
    '@tags': ['NRI', 'Regression', 'functional'],

    before: function (browser) {
      home = new Home(browser);
      reg_basic_details = new Reg_Basic_Details(browser);
      reg_loc_mar_comm = new Reg_Loc_Mar_Comm(browser);
    },

    'Living Since /Grew up In / Residency Regression ': function (browser) {
      const ods_parser = new Excel_Parser(process.cwd() + "/Acquisition/Tests/Comman_Test_Data/member_registration_data.ods");

      //let test_data, home, reg_basic_details, reg_loc_mar_comm, reg_education_work, reg_life_style;
      test_data = ods_parser.getSingleDataByAccountType("NRI-UAE-completeworkflow");
      const home = new Home(browser);
      const reg_basic_details = new Reg_Basic_Details(browser);


      home.visitHomePage();
      home.clickRegistration();

      reg_basic_details.setEmailid(test_data["emailid"], true);
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

    'Living Since field should not be present': function (browser) {
      browser.pause(5000)
      browser
        .useCss()
        .waitForElementNotPresent('input[id="livingSince"]')
        .useXpath();
    },


    'Grew up in and Residency status fields present on - only NRI countries ': function (browser) {

      browser
        .useCss()
      browser.assert.elementPresent('input[id="grewUpIn"]')
      browser.assert.elementPresent('input[id="residencyStatus"]')
      browser.useXpath()
    },

    'Ethnic origin present for NRI + Muslim': function (browser) {
      browser.useCss()
      browser.assert.elementPresent('input[id="ethnicity"]')
    },

    'Functionality of Ethnic origin -selection from dropdown': function (browser) {

      var ethnic_origins = ['India', 'Sri Lanka', 'Pakistan', 'Bangladesh', 'Nepal', 'Arabian', 'Afghanistan', 'Persian', 'Latino/Hispanic', 'White/Caucasian', 'Black/African', 'Pacific Islander', 'Native American', 'Singapore', 'Malaysia', 'Other'];

      ethnic_origins.forEach(country => {
        reg_loc_mar_comm.setEthnicOrigin(country)
      });

    },

    'Verify Currency for UAE to be AED ': function (browser) {
      reg_loc_mar_comm.setState(test_data["state"]);
      reg_loc_mar_comm.setCity(test_data["city"]);
      reg_loc_mar_comm.setGrewUpIn(test_data["grewupin"]);
      reg_loc_mar_comm.setResidencyStatus(test_data["residencystatus"]);
      reg_loc_mar_comm.setMarriedStatus(test_data["maritialstatus"]);
      reg_loc_mar_comm.setCaste(test_data["caste"]);
      reg_loc_mar_comm.clickContinue();

      browser.useCss().waitForElementPresent('input[id="income"]')
        .click('input[id="income"]')
        .assert.elementPresent('div[title = "AED 60K to 90K"]')
    }

  }
