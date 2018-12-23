//acquistion library
const Reg_Basic_Details = require("../../WebPages/Reg_Basic_Details");
const Home = require("../../WebPages/Home");

//test data on same folder
const test_data = require("./Acq_Test_Data.json");
let { test_url, AB } = require("../../../shaadi.conf");

module.exports =
  {
    '@tags': ['sanity', 'email_pass_profile'],

    before: function (browser) {
      const home = new Home(browser);

      home.visitHomePage(); // go to shaadi.com.
      home.clickRegistration(); // click on registration at middle of page.
    },

    'validate data content': function (browser) {

      browser.useCss();

      browser
        .verify.containsText(".reg_msg1", "Let's set up your account, while\nwe find Matches for you!")
        .verify.containsText("#reg1fields label[for='email']", "Enter your email id")
        .verify.containsText("#reg1fields label[for='password']", "Create a password")
        .verify.containsText("#reg1fields label[for='postedby']", "Create Profile for")
        .verify.containsText("#btnSubmit", "Next")
        .verify.containsText(".reg_layer_login_line", "Already a Member? Login")

      browser.useXpath();
    },


    'Validate empty error message - Email , Password, Profile created for.': function (browser) {
      const reg_basic_details = new Reg_Basic_Details(browser);
      reg_basic_details.verifyEmailPassProfile(test_data["empty_error_message_email_pass_profile"]); //Verify the error message content.
    },

    'Invalid email error message': function (browser) {
      const reg_basic_details = new Reg_Basic_Details(browser);

      let emails = test_data["invalid_email_error"]["emails"];

      for (const email of emails) {
        reg_basic_details.setEmailid(email);
        reg_basic_details.clickNext();

        browser
          .verify.containsText('//*[@id="err_text_invalid_email"]', test_data["invalid_email_error"]["error"], email);
      }
    },

    'Validate existing email error message': function (browser) {
      const reg_basic_details = new Reg_Basic_Details(browser);

      reg_basic_details.setEmailid(test_data["existing_email_error"]["email"]);
      reg_basic_details.clickNext();

      browser
        .waitForElementVisible('//div[contains(text(),"Already registered email, try another")]');

      browser
        .verify.containsText('//*[@id="err_text_duplicate_email"]', test_data["existing_email_error"]["error"]);
    },

    'validate password for less than 4 ': function (browser) {
      const reg_basic_details = new Reg_Basic_Details(browser);

      reg_basic_details.setPassword(test_data["password_error"]["less4_password"]);
      reg_basic_details.clickNext();

      browser
        .verify.containsText('//*[@id="err_text_password1"]', test_data["password_error"]["error"]);
    },

    'validate email and password cannot be same ': function (browser) {
      const reg_basic_details = new Reg_Basic_Details(browser);

      reg_basic_details.setEmailid(test_data["password_error"]["same_email_pass"]);
      reg_basic_details.setPassword(test_data["password_error"]["same_email_pass"]);
      reg_basic_details.clickNext();

      browser
        .verify.containsText('//*[@id="err_text_password1"]', test_data["password_error"]["error"]);
    },


    'success validation for email , pass and created': function (browser) {
      const reg_basic_details = new Reg_Basic_Details(browser);
      reg_basic_details.setEmailid("abcd8796768@asdasdvr.in")
      reg_basic_details.setPassword("asdsad233");
      reg_basic_details.setCreatedFor("Son");
      reg_basic_details.clickNext();

      browser.waitForElementVisible("//input[@id='layer_first_name']");

    }
  };