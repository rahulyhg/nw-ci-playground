//acquistion library
const Reg_Basic_Details = require("../../WebPages/Reg_Basic_Details");
const Home = require("../../WebPages/Home");
const Reg_Loc_Mar_Comm = require("../../WebPages/Reg_Location_Marital_Community");

const Reg_Education_Work = require("../../WebPages/Reg_Education_Work");
const Reg_LifeStyle = require("../../WebPages/Reg_LifeStyle");

const Excel_Parser = require("../../../Shared_Items/Utilities/Excel_Parser");
let { test_url, AB } = require("../../../shaadi.conf");

module.exports =
    {
        '@tags': ['lib_check', 'complete_flow', 'regression'],

        before: function (browser) {
            home = new Home(browser);
            reg_basic_details = new Reg_Basic_Details(browser);
            reg_loc_mar_comm = new Reg_Loc_Mar_Comm(browser);
            reg_education_work = new Reg_Education_Work(browser);
            reg_life_style = new Reg_LifeStyle(browser);
        },

        'Lifestyle Page cases': (browser) => {
            const ods_parser = new Excel_Parser(process.cwd() + "/Acquisition/Tests/Complete_Flow/acq_test_data.ods");
            const test_data = ods_parser.getDataByRow(6);

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

            browser.pause(2000)

            reg_education_work.setEducationLevel(test_data["educationlevel"]);
            reg_education_work.setEductionField(test_data["educationfield"]);
            reg_education_work.setIncome(test_data["annualincome"]);
            reg_education_work.clickContinue();
        },

        'Error validation on 2.3 Mandatory fields': function (browser) {
            browser.pause(2000)
            reg_life_style.clickContinue();

            browser.useCss()
            browser.verify.containsText("#height-helper-text", "Oops! You seem to have missed this")

            browser.useXpath()
            browser.assert.elementPresent('//*[@id="smokeHabbit"]//parent::div//parent::div//child::div[3][contains(text(),"Oops! You seem to have missed this")]')
            browser.assert.elementPresent('//*[@id="drinkHabbit"]//parent::div//parent::div//child::div[3][contains(text(),"Oops! You seem to have missed this")]')
        },

        'Verify Diet field dropdown functionality': function () {
            var diets = ['Veg', 'Non-Veg', 'Occasionally Non-Veg', 'Eggetarian', 'Jain', 'Vegan']
            diets.forEach(diet => {
                reg_life_style.setDiet(diet)
            })
        },

        'Verify Height field range ': function (browser) {
            var heights = ["4ft 5in - 134cm", "5ft 3in - 160cm", "7ft - 213cm"]
            heights.forEach(height => {
                reg_life_style.setHeight(height)
            })
        },

        'Body Type capsules functionality ': function (browser) {

            browser.expect.element('//div[@id="bodyType"]//button[1]//span[1]//label//input').to.have.attribute("type").equals("radio")
            browser.expect.element('//div[@id="bodyType"]//button[1]//span[1]//label//input').to.have.attribute("value").equals("Slim")
            browser.click('//div[@id="bodyType"]//button[1]')

            browser.expect.element('//div[@id="bodyType"]//button[2]//span[1]//label//input').to.have.attribute("type").equals("radio")
            browser.expect.element('//div[@id="bodyType"]//button[2]//span[1]//label//input').to.have.attribute("value").equals("Athletic")
            browser.click('//div[@id="bodyType"]//button[2]')

            browser.expect.element('//div[@id="bodyType"]//button[3]//span[1]//label//input').to.have.attribute("type").equals("radio")
            browser.expect.element('//div[@id="bodyType"]//button[3]//span[1]//label//input').to.have.attribute("value").equals("Average")
            browser.click('//div[@id="bodyType"]//button[3]')

            browser.expect.element('//div[@id="bodyType"]//button[4]//span[1]//label//input').to.have.attribute("type").equals("radio")
            browser.expect.element('//div[@id="bodyType"]//button[4]//span[1]//label//input').to.have.attribute("value").equals("Heavy")
            browser.click('//div[@id="bodyType"]//button[4]')
        },

        'Skin Tone capsules functionality': function (browser) {

            var tones = ["Very Fair", "Fair", "Tan","Dark"]
            tones.forEach(tone => {
                reg_life_style.setSkinTone(tone)
                    })            

        }
    }