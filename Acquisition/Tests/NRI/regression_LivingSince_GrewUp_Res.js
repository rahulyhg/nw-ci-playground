//acquistion library
const Reg_Basic_Details = require("../../WebPages/Reg_Basic_Details");
const Home = require("../../WebPages/Home");
const Reg_Loc_Mar_Comm = require("../../../Acquisition/WebPages/Reg_Location_Marital_Community");
//utilies
const Excel_Parser = require("../../../Shared_Items/Utilities/Excel_Parser");
const ods_parser = new Excel_Parser(process.cwd() + "/Acquisition/Tests/Comman_Test_Data/member_registration_data.ods");

let test_data;
let {test_url,AB} = require("../../../shaadi.conf");

module.exports =
  {
    '@tags': ['NRI', 'regression', 'functional'],

    before: function (browser) {
      home = new Home(browser);
      reg_basic_details = new Reg_Basic_Details(browser);
      reg_loc_mar_comm = new Reg_Loc_Mar_Comm(browser);
    },

    'Living Since /Grew up In / Residency Regression ': function (browser) {
      const ods_parser = new Excel_Parser(process.cwd() + "/Acquisition/Tests/Comman_Test_Data/member_registration_data.ods");

      //let test_data, home, reg_basic_details, reg_loc_mar_comm, reg_education_work, reg_life_style;
      test_data = ods_parser.getSingleDataByAccountType("NRI-USA-completeworkflow");
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

    'Error Validation on Living Since field': function (browser) {
      browser.pause(5000)
      reg_loc_mar_comm.clickContinue();
      browser
        .pause(2000)
        .useCss()
        .verify.containsText("#livingSince-helper-text", "Oops! You seem to have missed this")
        .useXpath();
    },
    

    'Living Since Has option "Birth" ': function (browser) {

      browser
        .useCss()
        .waitForElementVisible('input[id="livingSince"]')

      browser.click('input[id="livingSince"]')
      browser.assert.elementPresent('div[title="Birth"]');
    },

    'Living Since is not less than  Birth Year': function (browser) {

      let birthyear = test_data["year"]
      browser.assert.elementPresent('div[title="' + birthyear + '"]')
      birthyear -= 1
      browser.assert.elementNotPresent('div[title="' + birthyear + '"]')
    },

    'Verify selection of years in Living Since': function (browser) {
      var date = new Date();
      var currentYear = date.getFullYear();

      let birthyear = test_data["year"]

      while (currentYear > birthyear) {

        browser.assert.elementPresent('div[title="' + currentYear + '"]')
        browser.click('div[title="' + currentYear + '"]')

        browser.click('input[id="livingSince"]')

        currentYear -= 1
      }
    },

    'Error Validation on Grew Up in and Residency status field': function (browser) {
      browser.click('div[title="2004"]')
      reg_loc_mar_comm.clickContinue();
      browser
        .useCss()
        .verify.containsText("#grewUpIn-helper-text", "Oops! You seem to have missed this")
        .verify.containsText("#residencyStatus-helper-text", "Oops! You seem to have missed this")
        .useXpath();
    },


    'Grew Up in & Residency status Absent when Livingsince=Birth': function (browser) {

      reg_loc_mar_comm.setLivingCountrySince("Birth")

      browser.assert.elementNotPresent('input[id="grewUpIn"]')
      browser.assert.elementNotPresent('input[id="residencyStatus"]')
    },

    'Grew Up in & Residency status Present when Livingsince other than Birth': function (browser) {

      reg_loc_mar_comm.setLivingCountrySince("2016")
      browser.useCss()
      browser.waitForElementPresent('input[id="grewUpIn"]')
      browser.waitForElementPresent('input[id="residencyStatus"]')
      browser.useXpath()
    },

    'Grew Up in & Residency status Absent when members living since is less than age 5': function (browser) {
      reg_loc_mar_comm.setLivingCountrySince("Birth")
      let birthyear = test_data["year"]
      let minage = birthyear + 5;

      while (birthyear < minage) {
        reg_loc_mar_comm.setLivingCountrySince(birthyear)
        browser.assert.elementNotPresent('input[id="grewUpIn"]')
        browser.assert.elementNotPresent('input[id="residencyStatus"]')
        birthyear++;
      }
    },

    'Grew up In field drop down value validation': function (browser) {
      reg_loc_mar_comm.setLivingCountrySince("2005")
      var countries = ['Australia', 'India', 'Canada', 'United Kingdom', 'Belgium'];

      countries.forEach(grewUpIn => {
        reg_loc_mar_comm.setGrewUpIn(grewUpIn)
      });
    },

    'Grew up in cannot select more than 5 countries': function (browser) {
      browser.useCss().waitForElementPresent('div[id="btn-arrow-grewUpIn"]')
      browser.click('div[id="btn-arrow-grewUpIn"]')
      browser.useXpath().waitForElementVisible("//*[contains(text(), 'You can select only 5 countries')]")

    },

    'Error Validation on Residency status field': function (browser) {
      
      reg_loc_mar_comm.clickContinue();
      browser
        .pause(2000)
        .useCss()
        .verify.containsText("#residencyStatus-helper-text", "Oops! You seem to have missed this")
        .useXpath();
    },

    'Dropdown functionality validation on Residency status field' : function(browser){
      var residency_status = ['Citizen', 'Permanent Resident', 'Student Visa', 'Temporary Visa', 'Work Permit'];

      residency_status.forEach(resi_status => {
        reg_loc_mar_comm.setResidencyStatus(resi_status)
      });
    }

  }
