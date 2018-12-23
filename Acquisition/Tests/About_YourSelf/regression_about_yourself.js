//acquistion library
const Reg_Basic_Details = require("../../../Acquisition/WebPages/Reg_Basic_Details");
const Home = require("../../../Acquisition/WebPages/Home");
const Reg_Loc_Mar_Comm = require("../../../Acquisition/WebPages/Reg_Location_Marital_Community");
const Reg_Education_Work = require("../../../Acquisition/WebPages/Reg_Education_Work");
const Reg_LifeStyle = require("../../../Acquisition/WebPages/Reg_LifeStyle");
const Reg_About = require("../../../Acquisition/WebPages/Reg_About");

const Excel_Parser = require("../../../Shared_Items/Utilities/Excel_Parser");
let { test_url, AB } = require("../../../shaadi.conf");
let reg_about_yourself;

module.exports =
    {
        '@tags': ['lib_check', 'complete_flow', 'regression'],

        before: function (browser) {
            home = new Home(browser);
            reg_basic_details = new Reg_Basic_Details(browser);
            reg_loc_mar_comm = new Reg_Loc_Mar_Comm(browser);
            reg_education_work = new Reg_Education_Work(browser);
            reg_life_style = new Reg_LifeStyle(browser);
            reg_about_yourself = new Reg_About(browser);
        },

        'Reach to About yourself': (browser) => {
            const ods_parser = new Excel_Parser(process.cwd() + "/Acquisition/Tests/Complete_Flow/acq_test_data.ods");
            const test_data = ods_parser.getDataByRow(5);

            const home = new Home(browser);

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
        },



        'verify error label for - about yourself': function (browser) {
            let reg_about_yourself = new Reg_About(browser);

            reg_about_yourself.clickCreateProfile();

            browser
                .waitForElementVisible("//form[@id='description']//div[text()='Oops! You seem to have missed this']")
                .assert.containsText("//p[@id='mobileNumber-helper-text']", "Please enter a valid mobile number");
        },


        'Verify recommended text being copied correctly to textarea': function (browser) {
            let reg_about_yourself = new Reg_About(browser);



            reg_about_yourself.clickCreateProfile();

            let helpMeWriteText = "//div[text()='Let us help you write this']";
            browser
                .waitForElementVisible(helpMeWriteText)
                .click(helpMeWriteText);

            let recommended_text_selector = "//div[contains(text(),'Recommended Text to make your profile stand out')]/following-sibling::div";

            browser
                .waitForElementVisible(recommended_text_selector)
                .getText(recommended_text_selector, (res) => {

                    reg_about_yourself.clickCopyThis()
                    let boxText = ((res.value).replace(/\r?\n?/g, '')).trim();

                    browser
                        .getText("//textarea[@id='aboutMe']", (res1) => {
                            let boxText1 = ((res1.value).replace(/\r?\n?/g, '')).trim();
                            browser.assert.deepEqual(boxText, boxText1, "Recommended Text comparision");
                        })
                })
        },

        'use "help me" template and modifying the help me template': function (browser) {
            browser
                .click("//textarea[@id='aboutMe']")
                .clearValue("//textarea[@id='aboutMe']")
                .setValue("//textarea[@id='aboutMe']", "hello");

            reg_about_yourself.clickCreateProfile();

            browser
                .assert.containsText("//textarea[@id='aboutMe']", "hello");
        },

        'verify minimum character count and error for about yourself': function (browser) {

            browser
                .assert.containsText("//div[@id='about-me-help']/parent::div/div/span", "5")
                .waitForElementVisible("//div[text()= 'Please specify about the person looking to get married in minimum of 50 characters']");
        },

        'verify mobile number error': +function (browser) {

            browser
                .waitForElementVisible("//p[@id='mobileNumber-helper-text']")
                .assert.containsText("//p[@id='mobileNumber-helper-text']", "Please enter a valid mobile number");
        },

        'verify about yourself error and first popup': function (browser) {

            browser.refresh()

            reg_about_yourself.clickCreateProfile();

            let describeYourselfText = "//div[contains(text(),'Please describe ')]";

            browser
                .waitForElementVisible(describeYourselfText)
                .click(describeYourselfText);

            reg_about_yourself.clickCreateProfile();

            browser
                .waitForElementVisible("//div[text()='Oops! You seem to have missed this']");


        },

        'verify phone number series for INDIA not start with 0-5': function (browser) {
            browser
                .waitForElementVisible("//textarea[@id='aboutMe']")

            browser.expect.element("//input[@id='countryCode']").to.have.attribute("value").equals("+91");

            reg_about_yourself.clickPhysicalDisability();

            reg_about_yourself.setMobileNumber("01234");
            browser.expect.element("//input[@id='mobileNumber']").to.have.attribute("value").equals("");
            reg_about_yourself.setMobileNumber("1234");
            browser.expect.element("//input[@id='mobileNumber']").to.have.attribute("value").equals("");
            reg_about_yourself.setMobileNumber("2234");
            browser.expect.element("//input[@id='mobileNumber']").to.have.attribute("value").equals("");
            reg_about_yourself.setMobileNumber("3234");
            browser.expect.element("//input[@id='mobileNumber']").to.have.attribute("value").equals("");
            reg_about_yourself.setMobileNumber("4234");
            browser.expect.element("//input[@id='mobileNumber']").to.have.attribute("value").equals("");
            reg_about_yourself.setMobileNumber("5234");
            browser.expect.element("//input[@id='mobileNumber']").to.have.attribute("value").equals("");
        },
        'for IND phone number series should be 6,7,8,9': function (browser) {
            browser
                .waitForElementVisible("//textarea[@id='aboutMe']");

            reg_about_yourself.setMobileNumber("6123456789");
            browser.expect.element("//input[@id='mobileNumber']").to.have.attribute("value").equals("6123456789");
            reg_about_yourself.setMobileNumber("7123456789");
            browser.expect.element("//input[@id='mobileNumber']").to.have.attribute("value").equals("7123456789");
            reg_about_yourself.setMobileNumber("8123456789");
            browser.expect.element("//input[@id='mobileNumber']").to.have.attribute("value").equals("8123456789");
            reg_about_yourself.setMobileNumber("9123456789");
            browser.expect.element("//input[@id='mobileNumber']").to.have.attribute("value").equals("9123456789");


        },

        'phone number acceptable count should be 10 for IND': function (browser) {

            reg_about_yourself.setMobileNumber("612345678934rewrerter");
            browser.expect.element("//input[@id='mobileNumber']").to.have.attribute("value").equals("6123456789");
        },

        'phone number should clear once the country code is changed': function (browser) {

            reg_about_yourself.setCountryCode("+49|Germany");
            browser.pause(1000);
            browser.expect.element("//input[@id='mobileNumber']").to.have.attribute("value").equals("");


        },

        'for Germany, number count should be 12': function (browser) {

            reg_about_yourself.setMobileNumber("123456789123");
            browser.expect.element("//input[@id='mobileNumber']").to.have.attribute("value").equals("123456789123");
        },

        'for Austria, number count should be 12': function (browser) {

            reg_about_yourself.setCountryCode("+43|Austria");
            browser.pause(1000);
            reg_about_yourself.setMobileNumber("123456789123");
            browser.expect.element("//input[@id='mobileNumber']").to.have.attribute("value").equals("123456789123");
        }
    }