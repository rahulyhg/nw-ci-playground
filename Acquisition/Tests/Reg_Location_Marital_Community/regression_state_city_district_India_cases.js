//acquistion library
const Reg_Basic_Details = require("../../../Acquisition/WebPages/Reg_Basic_Details");
const Home = require("../../../Acquisition/WebPages/Home");
const Reg_Loc_Mar_Comm = require("../../../Acquisition/WebPages/Reg_Location_Marital_Community");
//utilies
const Excel_Parser = require("../../../Shared_Items/Utilities/Excel_Parser");
let { test_url, AB } = require("../../../shaadi.conf");

module.exports =
  {
    '@tags': ['regression'],

    before: function (browser) {
      const ods_parser = new Excel_Parser(process.cwd() + "/Acquisition/Tests/Comman_Test_Data/member_registration_data.ods");
      const test_data = ods_parser.getSingleDataByAccountType("Martial-status-test1");

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

    'City Disabled when State is not set': function (browser) {

      browser

        .waitForElementVisible("//input[@id='state']");

      browser
        .waitForElementPresent("//input[@id='city' and @disabled]");
    },

    'City Enabled when State is set ': function (browser) {
      const state_check = new Reg_Loc_Mar_Comm(browser);
      state_check.setState("Goa");

      browser
        .waitForElementNotPresent("//input[@id='city' and @disabled]");

    },

    'Check State City for Combination - Maharastra/Mumbai, Delhi-NCR/Delhi,Gujarat/Gandhinagar ': function (browser) {
      const state_check = new Reg_Loc_Mar_Comm(browser);

      state_check.setState("Maharashtra");
      state_check.setCity("Mumbai");

      state_check.setState("Delhi-NCR");
      state_check.setCity("Delhi");


      state_check.setState("Gujarat");
      state_check.setCity("Gandhinagar");
    },


    'Indian States are Present and are Selectable': function (browser) {
      const state_check = new Reg_Loc_Mar_Comm(browser);

      var states = ['Andhra Pradesh', 'Bihar', 'Delhi-NCR', 'Gujarat', 'Haryana', 'Jharkhand', 'Karnataka',
        'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Orissa', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Uttar Pradesh',
        'West Bengal', 'Andaman & Nicobar', 'Arunachal Pradesh', 'Assam', 'Chandigarh', 'Chhattisgarh', 'Dadra & Nagar Haveli', 'Daman & Diu',
        'Goa', 'Himachal Pradesh', 'Jammu & Kashmir', 'Lakshadweep', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
        'Pondicherry', 'Sikkim', 'Telangana', 'Tripura', 'Uttaranchal'];

      states.forEach(state => {
        state_check.setState(state)
      });


    },

    'District field visible when Other is selected in city for 5 South Indian States ': function (browser) {
      const state_check = new Reg_Loc_Mar_Comm(browser);

      state_check.setState("Kerala");
      state_check.setCity("Other");
      state_check.setDistrict("Kannur")

      state_check.setState("Telangana");
      state_check.setCity("Other");
      state_check.setDistrict("Nalgonda")

      state_check.setState("Karnataka");
      state_check.setCity("Other");
      state_check.setDistrict("Chitradurga")

      state_check.setState("Tamil Nadu");
      state_check.setCity("Other");
      state_check.setDistrict("Erode")

      state_check.setState("Andhra Pradesh");
      state_check.setCity("Other");
      state_check.setDistrict("Guntur")

      state_check.setState("Goa");
      state_check.setCity("Other");

    },


    'District field is not visible when -Other- is selected in city for other than 5 South Indian States': function (browser) {
      const state_check = new Reg_Loc_Mar_Comm(browser);

      state_check.setState("Maharashtra");
      state_check.setCity("Pune");

      browser.waitForElementNotPresent('input[id="district"]');
    },

    'Verify District Krishna exist for Andhra Pradesh': function (browser) {
      const state_check = new Reg_Loc_Mar_Comm(browser);

      state_check.setState("Andhra Pradesh");
      state_check.setCity("Other");
      state_check.setDistrict("Krishna");
    },


    'Verify -no result found- for state when garbage value is sent': function (browser) {
      const state_check = new Reg_Loc_Mar_Comm(browser);

      state_check.setState("asdasd", true);

      browser.useXpath().waitForElementVisible("//*[contains(text(), 'No Result Found')]")
      browser.useCss().clearValue('input[id="state"]')
      browser.pause(3000)

      browser.useXpath()
    },

    'Verify City with other  when garbage value is sent': function (browser) {
      const state_check = new Reg_Loc_Mar_Comm(browser);
      browser.refresh()

      state_check.setState("Karnataka", true);
      browser.useCss().setValue('input[id="city"]', "5dtfyt")

      browser.useXpath().waitForElementVisible("//*[contains(text(), 'Other')]")
    },

    'Verify -no result found- for district  when garbage value is sent': function (browser) {
      const state_check = new Reg_Loc_Mar_Comm(browser);

      state_check.setState("Andhra Pradesh");
      state_check.setCity("Other");
      state_check.setDistrict("3432xyz", true);

      browser.useXpath().waitForElementVisible("//*[contains(text(), 'No Result Found')]")
    }
  }

