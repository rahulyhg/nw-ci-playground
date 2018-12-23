//acquistion library
const Reg_Basic_Details = require("../../WebPages/Reg_Basic_Details");
const Home = require("../../WebPages/Home");
const Reg_Loc_Mar_Comm = require("../../WebPages/Reg_Location_Marital_Community");
const Excel_Parser = require("../../../Shared_Items/Utilities/Excel_Parser");
const ods_parser = new Excel_Parser(process.cwd() + "/Acquisition/Tests/Comman_Test_Data/member_registration_data.ods");

let { test_url, AB } = require("../../../shaadi.conf");

module.exports =
  {
    '@tags': ['regression', 'sanity'],

    'Community verification for different religions': function (browser) {
      // const ods_parser = new Excel_Parser(process.cwd() + "/Acquisition/Tests/Comman_Test_Data/member_registration_data.ods");
      const test_data = ods_parser.getSingleDataByAccountType("Malayalee-case1");

      const home = new Home(browser);
      const reg_basic_details = new Reg_Basic_Details(browser);      

      var religions = ["Sikh", "Muslim", "Parsi", "Christian", "Spiritual"]
      var muslim_communities = ["Khoja", "Shia", "Sunni"]
      var sikh_communities = ["Arora", "Jat", "Rajput"]
      var christian_communities = ["Catholic", "Methodist", "Convert"]

      religions.forEach(religion => {

        home.visitHomePage();
        home.clickRegistration();

        reg_basic_details.setEmailid(test_data["emailid"], true);
        reg_basic_details.setPassword(test_data["password"]);
        reg_basic_details.setCreatedFor(test_data["createdfor"], test_data["gender"]);
        reg_basic_details.clickNext();

        reg_basic_details.setFullName(test_data["firstname"], test_data["lastname"]);
        reg_basic_details.setDateOfBirth(test_data["date"], test_data["month"], test_data["year"]);
        reg_basic_details.setReligion(religion);
        reg_basic_details.setMotherTongue(test_data["mothertongue"]);
        reg_basic_details.setCountry(test_data["country"]);
        reg_basic_details.clickSignUp();

        browser
          .url(test_url + '/profile-creation/step/1?')

        browser.pause(2000)
        browser.useCss()

        caste_selector='input[id="caste"]';

        if (religion == "Sikh") {
          sikh_communities.forEach(community => {
            browser.waitForElementVisible(caste_selector)
           .click(caste_selector)
           browser.assert.elementPresent('div[title = '+ community +']')
           browser.click('div[title = '+ community +']')
          })
        }

        else if (religion == "Muslim") {
          muslim_communities.forEach(community => {
            browser.waitForElementVisible(caste_selector)
           .click(caste_selector)
           browser.assert.elementPresent('div[title = '+ community +']')
           browser.click('div[title = '+ community +']')
          })
        }

        else if (religion == "Christian") {
          christian_communities.forEach(community => {
            browser.waitForElementVisible(caste_selector)
           .click(caste_selector)
           browser.assert.elementPresent('div[title = '+ community +']')
           browser.click('div[title = '+ community +']')
          })
        }

        else if (religion == "Parsi") browser.assert.elementNotPresent('input[id="caste"]')
        else if (religion == "Spiritual") browser.assert.elementNotPresent('input[id="caste"]')

        browser.useXpath();
      })   
    }
  }
