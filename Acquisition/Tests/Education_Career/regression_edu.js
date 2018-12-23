//acquistion library
const Reg_Basic_Details = require("../../../Acquisition/WebPages/Reg_Basic_Details");
const Home = require("../../../Acquisition/WebPages/Home");
const Reg_Loc_Mar_Comm = require("../../../Acquisition/WebPages/Reg_Location_Marital_Community");
const Reg_Education_Work = require("../../../Acquisition/WebPages/Reg_Education_Work");

const Excel_Parser = require("../../../Shared_Items/Utilities/Excel_Parser");
let {test_url,AB} = require("../../../shaadi.conf");

module.exports =
    {
        '@tags': ['lib_check', 'complete_flow', 'regression'],

        before: function (browser) {
            home = new Home(browser);
            reg_basic_details = new Reg_Basic_Details(browser);
            reg_loc_mar_comm = new Reg_Loc_Mar_Comm(browser);
            reg_education_work = new Reg_Education_Work(browser);
        },

        'Education Page cases': (browser) => {
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
            reg_loc_mar_comm.clickContinue()
        },

        'Error validation on 2.2 Mandatory fields': function (browser) {
            browser.pause(2000)
            reg_education_work.clickContinue();
            browser.useCss()
            browser.verify.containsText("#educationLevel-helper-text", "Oops! You seem to have missed this")
            browser.verify.containsText("#educationField-helper-text", "Oops! You seem to have missed this")
            browser.verify.containsText("#income-helper-text", "Oops! You seem to have missed this")

        },

        'Verify Education Level field dropdown functionality': function (browser) {
            var levels = ['Doctorate', 'Masters', 'Honours degree', 'Bachelors', 'Undergraduate', 'Associates degree', 'Diploma', 'High school', 'Less than high school', 'Trade school']
            levels.forEach(level => {
                reg_education_work.setEducationLevel(level)
            })
        },

        'Doctorate and Masters should load 2 college fields': function (browser) {
            reg_education_work.setEducationLevel("Doctorate")
            browser.useCss().waitForElementVisible('input[id="highestCollege"]')
            browser.assert.elementPresent('input[id="highestCollege"]')
            browser.waitForElementVisible('input[id="anotherCollege"]')
            browser.assert.elementPresent('input[id="anotherCollege"]')
            browser.useXpath()
        },

        'Bachelors should load only 1 college field': function (browser) {
            reg_education_work.setEducationLevel("Bachelors")
            browser.useCss().waitForElementVisible('input[id="highestCollege"]')
            browser.assert.elementPresent('input[id="highestCollege"]')
            browser.assert.elementNotPresent('input[id="anotherCollege"]')
        },

        'High school/less than high school does not load college fields': function (browser) {
            reg_education_work.setEducationLevel("High school")
            browser.useCss()
                .pause(2000)
            browser.assert.elementNotPresent('input[id="highestCollege"]')
            browser.assert.elementNotPresent('input[id="anotherCollege"]')
            reg_education_work.setEducationLevel("Less than high school")
            browser.assert.elementNotPresent('input[id="highestCollege"]')
            browser.assert.elementNotPresent('input[id="anotherCollege"]')
        },

        'Verify dropdown functionality of education field': function (browser) {
            var edu_fields = ['Arts', 'Fashion', 'Law', 'Travel & Tourism']
            edu_fields.forEach(field => {
                reg_education_work.setEductionField(field)
            })
        },

        'Verify Annual income tooltip': function (browser) {
            browser.useCss().waitForElementVisible('span[id="tooltip-income"]')
            browser.click('span[id="tooltip-income"]')
            browser.verify.containsText('div[rotate="(-87deg)"]', "Your income will be used for matchmaking.")
            browser.pause(2000)
        },

        'College name autosuggest' : function (browser) {

            reg_education_work.setEducationLevel("Masters")
            reg_education_work.setCollege1("Rajiv")

            browser
                .waitForElementPresent("//div[@value='Rajiv Gandhi Centre for Biotechnology']")
                .waitForElementPresent("//div[@value='Rajiv Gandhi College of Engineering']")
        },

        'College name Abbreviation' : function (browser) {

            browser.refresh()            
            .waitForElementVisible("//input[@id='educationLevel']");
            reg_education_work.setEducationLevel("Masters")
            reg_education_work.setCollege1("VTU")

            browser
                .waitForElementPresent("//div[@value='Virginia Theological University']")
                .waitForElementPresent("//div[@value='Visvesvaraya Technological University']")
        },

        'Character which does not match autosuggest list' : function (browser) {            
            browser.refresh()            
            .waitForElementVisible("//input[@id='educationLevel']");

            reg_education_work.setEducationLevel("Masters")
            reg_education_work.setCollege1("abcdefghijklikmam")

            browser
                .expect.element("//input[@id='highestCollege']").to.have.attribute("value").equals("abcdefghijklikmam");
        }

    }