//acquistion library
const Reg_Basic_Details = require("../../Acquisition/WebPages/Reg_Basic_Details");
const Home = require("../../Acquisition/WebPages/Home");

//test data on same folder
const test_data = require("./Acq_Test_Data.json");

module.exports =
{
  '@tags': ['sample'],

  'Verify Error message - Email, Password, created' : (browser) =>
  {
    const home = new Home(browser);
    const reg_basic_details = new Reg_Basic_Details(browser);

    home.visitHomePage(); // go to shaadi.com.
    home.clickRegistration(); // click on registration at middle of page.
    reg_basic_details.verifyEmailPassProfile(test_data["reg_1_1_error"]); //Verify the error message content.
  },
};