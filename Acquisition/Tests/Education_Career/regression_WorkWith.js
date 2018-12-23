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

        'Reach to education & career page': (browser) => {
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

            browser
            .waitForElementVisible("//input[@id='educationLevel']");
        },

        'Verify employer not visible at start' : function(browser)  {
            let reg_education_work = new Reg_Education_Work(browser);
            
            browser
                .waitForElementNotPresent("//input[@id='employer']");
        },

        'Business /self employed - As & Business name' : function(browser)  {
            let reg_education_work = new Reg_Education_Work(browser);

            reg_education_work.setWorkingWith("Business / Self Employed");
            browser.waitForElementVisible("//input[@id='employer']");
            browser.expect.element("//input[@id='employer']").to.have.attribute("placeholder").equals("Type business name here");
        },

        'selecting "Not working" on second attempt  "working As" & "employer name" & "Annual incomee" not displayed' : function(browser) {
            let reg_education_work = new Reg_Education_Work(browser);

            reg_education_work.setWorkingWith("Not Working");
            browser
            .waitForElementNotPresent("//input[@id='workingAs']")
            .waitForElementNotPresent("//input[@id='employer']")
            .waitForElementNotPresent("//input[@id='income']");
        },

        'Verify drop down selection for "work with" ' : function(browser)  {
            let reg_education_work = new Reg_Education_Work(browser);

            reg_education_work.setWorkingWith("Private Company");
            reg_education_work.setWorkingWith("Government / Public Sector");
            reg_education_work.setWorkingWith("Defense / Civil Services");
            reg_education_work.setWorkingWith("Business / Self Employed");
            reg_education_work.setWorkingWith("Not Working");
        },

        'Verify drop down selection for "Working As"' : function(browser)  {
            let reg_education_work = new Reg_Education_Work(browser);

            browser
                .refresh()
                .waitForElementVisible("//input[@id='educationLevel']");

            reg_education_work.setWorkingAs ("Actor");
            reg_education_work.setWorkingAs ("Farming");
        },

        'Verify gibbrish for "Working As" ' : function(browser)  {
            let reg_education_work = new Reg_Education_Work(browser);

            reg_education_work.setWorkingAs ("fsdff23",true);
            browser.waitForElementPresent("//div[text()='No Result Found']");
            
        },

        'set Employer name ' : function(browser)  {
            let reg_education_work = new Reg_Education_Work(browser);

            reg_education_work.setWorkingWith("Private Company");
            reg_education_work.setEmployer("People Interactive");
        },

        "On initial page load , working AS should have 'student' , 'retired', 'not working ' options" : function(browser) {
            let reg_education_work = new Reg_Education_Work(browser);

            browser
                .refresh()
                .waitForElementVisible("//input[@id='educationLevel']");

            reg_education_work.setWorkingAs("Student");
            reg_education_work.setWorkingAs("Retired");
            reg_education_work.setWorkingAs("Not working");
        },

        "Once work with is selected ,  working with should not have 'student' , 'retired', 'not working ' options" : function(browser) {

            reg_education_work.setWorkingWith("Private Company");

            browser
                .waitForElementNotPresent('//div[@itle="Student"]')
                .waitForElementNotPresent('//div[@itle="Retired"]')
                .waitForElementNotPresent('//div[@itle="Not working"]');

        },

        'Employer name Abbreviation' : function (browser) {

            browser.refresh()
            .waitForElementVisible("//input[@id='educationLevel']");
            
            reg_education_work.setWorkingWith("Private Company");
            reg_education_work.setEmployer("abcdefghijklikmam");
            
            browser
                .expect.element("//input[@id='employer']").to.have.attribute("value").equals("abcdefghijklikmam");

            browser.pause();
        },
    }