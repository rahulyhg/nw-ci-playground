//acquistion library
const Reg_Basic_Details = require("../../../Acquisition/WebPages/Reg_Basic_Details");
const Home = require("../../../Acquisition/WebPages/Home");
const Reg_Loc_Mar_Comm = require("../../../Acquisition/WebPages/Reg_Location_Marital_Community");
const Reg_Education_Work = require("../../../Acquisition/WebPages/Reg_Education_Work");
const Reg_LifeStyle = require("../../../Acquisition/WebPages/Reg_LifeStyle");

//utilies
const Excel_Parser = require("../../../Shared_Items/Utilities/Excel_Parser");
const ods_parser = new Excel_Parser(process.cwd() + "/Acquisition/Tests/Comman_Test_Data/member_registration_data.ods");

let test_data, home, reg_basic_details, reg_loc_mar_comm, reg_education_work, reg_life_style;
let { test_url, AB } = require("../../../shaadi.conf");

module.exports =
  {
    '@tags': ['zipcode', 'regression'],

    before: (browser) => {
      home = new Home(browser);
      reg_basic_details = new Reg_Basic_Details(browser);
      reg_loc_mar_comm = new Reg_Loc_Mar_Comm(browser);
      reg_education_work = new Reg_Education_Work(browser);
      reg_life_style = new Reg_LifeStyle(browser);

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
    },

    'verify state & city not visible': (browser) => {
      reg_basic_details.setCountry(test_data["country"]);
      reg_basic_details.clickSignUp();

      browser
        .url(test_url + '/profile-creation/step/1?')
        .waitForElementVisible('//input[@id="state"]');

      browser
        .pause(2000)
        .waitForElementNotPresent("//input[@id='state']")
        .waitForElementNotPresent("//input[@id='city']");
    },

    'verify no zip text': (browser) => {
      let no_zip_selector = '//*[@id="basic"]/div[2]/div/label/span[2]/span';
      browser.verify.containsText(no_zip_selector, "I don't know / couldn't find the zip code");
    },

    'verify state and city visible after checked': (browser) => {
      const reg_loc_mar_comm = new Reg_Loc_Mar_Comm(browser);
      reg_loc_mar_comm.checkNoZipCode();

      browser
        .verify.visible("//input[@id='state']")
        .verify.visible("//input[@id='city']")
    },

    'verify state city combination for USA': (browser) => {
      const reg_loc_mar_comm = new Reg_Loc_Mar_Comm(browser);

      reg_loc_mar_comm.setState("California");
      reg_loc_mar_comm.setCity("Los Angeles");

      browser.refresh()
    },

    'check for invalid USA zip and error label': (browser) => {
      const reg_loc_mar_comm = new Reg_Loc_Mar_Comm(browser);

      reg_loc_mar_comm.setZipCode("xyz");
      reg_loc_mar_comm.clickContinue();

      browser
        .useCss()
        .verify.containsText("p[id='zip-helper-text']", "Please enter a valid ZIP code/Postal code.")
        .useXpath();
    },

    'check for valid USA zip': (browser) => {
      const reg_loc_mar_comm = new Reg_Loc_Mar_Comm(browser);
      reg_loc_mar_comm.setZipCode("60660");
      reg_loc_mar_comm.clickContinue();

      browser
        .useCss()
        .expect.element('p[id="zip-helper-text"]').to.not.be.present;
      browser.useXpath();
    }

  };