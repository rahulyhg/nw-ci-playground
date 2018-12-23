//acquistion library
const Reg_Basic_Details = require("../../../Acquisition/WebPages/Reg_Basic_Details");
const Home = require("../../../Acquisition/WebPages/Home");
const Reg_Loc_Mar_Comm = require("../../../Acquisition/WebPages/Reg_Location_Marital_Community");
const Reg_Education_Work = require("../../../Acquisition/WebPages/Reg_Education_Work");
const Reg_LifeStyle = require("../../../Acquisition/WebPages/Reg_LifeStyle");
const Reg_About = require("../../../Acquisition/WebPages/Reg_About");
const Excel_Parser = require("../../../Shared_Items/Utilities/Excel_Parser");
const ods_parser = new Excel_Parser(process.cwd() + "/Acquisition/Tests/Comman_Test_Data/member_registration_data.ods");

let { test_url, AB } = require("../../../shaadi.conf");

module.exports =
  {
    '@tags': ['regression', 'sanity'],

    before: function (browser) {
      // const ods_parser = new Excel_Parser(process.cwd() + "/Acquisition/Tests/Comman_Test_Data/member_registration_data.ods");
      const test_data = ods_parser.getSingleDataByAccountType("Malayalee-case1");

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

    'Verify fields which are loaded on 2.1 page': function (browser) {
      browser.useCss()

        .waitForElementVisible("input[id='caste']")
        .waitForElementVisible("input[id='gotra']")
        .waitForElementVisible("input[id='nakshatra']")
        .waitForElementVisible("div[id='suddhaJadhagam']")
        .waitForElementVisible("input[id='regionalSite']")

      browser.useXpath();
    },

    'Verify Regional Site field functionality': function (browser) {
      //verify default selection in regional site field
      browser.expect.element('//*[@id="regionalSite"]').to.have.attribute("value").equals("MalayaleeShaadi.com")
      //verify shaadi.com not present as default - negative case
      browser.expect.element('//*[@id="regionalSite"]').to.have.attribute("value").not.equals("Shaadi.com")
      //verify text under regional site field
      browser.expect.element('//*[@id="basic"]/div[8]/div[2]').text.to.equal("Register here, for best Malayalam matches from Shaadi.com.")
      //verify field label name
      browser.verify.containsText('//*[@id="regionalSite"]/div/div/div/label', "Choose a regional site")
      //verify placeholder of field
      browser.expect.element('//*[@id="regionalSite"]').to.have.attribute("placeholder").equals("Search here")
    },

    'Test regional site dropdown functionality for all domains': function (browser) {
      const Regionalcheck = new Reg_Loc_Mar_Comm(browser);

      //All domain names should be present and should be selectable
      var domains = ["Shaadi.com", "AssameseShaadi.com", "BengaliShaadi.com",
        "GujaratiShaadi.com", "HindiShaadi.com", "KannadaShaadi.com",
        "KashmiriShaadi.com", "KonkaniShaadi.com", "ManipuriShaadi.com",
        "MarathiShaadi.com", "OdiaShaadi.com", "PunjabiShaadi.com",
        "TamilShaadi.com", "TeluguShaadi.com", "TuluShaadi.com", "UrduShaadi.com"]

      domains.forEach(domain =>
        Regionalcheck.setRegionalSite(domain));

      //Set it back to Malayaleeshaadi.com
      Regionalcheck.setRegionalSite("MalayaleeShaadi.com")
    },

    'Verify Logo on page': function (browser) {

      browser.useCss()
      logo_image = 'img[src="https://img2.shaadi.com/imgs/logos/payment/malayalee.png"]'
      browser.waitForElementVisible(logo_image)
      browser.expect.element(logo_image).to.have.attribute("title").equals("The World's Leading Malayalee Matrimonial Site")
      browser.useXpath()
    },

    'Verify error message on community field': function (browser) {
      const Next = new Reg_Loc_Mar_Comm(browser);
      Next.clickContinue();

      browser.useCss()
      browser.expect.element("p[id='caste-helper-text']").text.to.be.equal("Oops! You seem to have missed this")
      browser.useXpath();
    },

    'Verify Community field functionality from dropdown': function (browser) {
      const communitycheck = new Reg_Loc_Mar_Comm(browser);
      communitycheck.setCaste("Brahmin - Karhade")
      communitycheck.setCaste("Ganiga")
      communitycheck.setCaste("Adi Andhra")
      communitycheck.setCaste("Brahmin - Gurukkal")
      communitycheck.setCaste("Chalawadi Holeya")
    },

    'Verify sub - community is dropdown depending on selected community': function (browser) {
      const communitycheck = new Reg_Loc_Mar_Comm(browser);
      //Negative case to test that selecting "Menon" as community will not display sub-community drop down
      communitycheck.isDropdownTextfieldSubcommunity("Menon", "textbox");

      communitycheck.isDropdownTextfieldSubcommunity("Nadar", "dropdown");
      communitycheck.isDropdownTextfieldSubcommunity("Nair", "dropdown");
      communitycheck.isDropdownTextfieldSubcommunity("Vishwakarma", "dropdown");

      browser.useXpath();
    },

    'caste No Bar checkbox functionality ': function (browser) {
      const communitycheck = new Reg_Loc_Mar_Comm(browser);
      communitycheck.setCaste("Brahmin - Karhade")
      //caste No bar check box should be present when community is selected
      browser.expect.element('//*[@id="casteNoBar"]').to.be.present;
      //caste no bar is checkbox type
      browser.expect.element('//*[@id="casteNoBar"]').to.have.attribute("type").equals('checkbox');
      //verify caste no bar text
      browser.verify.containsText('//*[@id="basic"]/div[6]/div/label/span[2]/span', "Not particular about my Partner's Community (Caste No Bar)");
      //verify UI when caste no bar is not checked
      browser.expect.element('//*[@id="casteNoBar"]').to.have.css('color').which.equals('rgba(0, 0, 0, 0.54)');

      communitycheck.setCasteNoBar();

      //verify UI after caste no bar is checked
      browser.expect.element('//*[@id="casteNoBar"]').to.have.css('color').which.equals('rgba(0, 188, 213, 1)');
    },

    'complete Reg for Malayaleeshaadi.com': function (browser) {

      const test_data = ods_parser.getSingleDataByAccountType("Malayalee-case1");

      const reg_education_work = new Reg_Education_Work(browser);
      const reg_life_style = new Reg_LifeStyle(browser);
      const reg_about = new Reg_About(browser);
      const communitycheck = new Reg_Loc_Mar_Comm(browser);

      communitycheck.setState(test_data["state"]);
      communitycheck.setCity(test_data["city"]);
      communitycheck.setMarriedStatus(test_data["maritialstatus"]);
      communitycheck.setCaste(test_data["caste"]);
      communitycheck.clickContinue();

      browser.pause(2000); //Page transition
      reg_education_work.setEducationLevel(test_data["educationlevel"]);
      reg_education_work.setEductionField(test_data["educationfield"]);
      reg_education_work.setCollege1(test_data["college"]);
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

      reg_about.setAboutYourself();
      reg_about.setMobileNumber(test_data["mobile"]);
      reg_about.clickCreateProfile();
    },

    'Verify if user redirected to malayalee domain': function (browser) {

      //Verify url has malayaleeshaadi in it
      browser.assert.urlContains('www.malayaleeshaadi.com/registration/photo');

      //Verify user landed on photo upload page
      browser.waitForElementVisible('//*[@id="uploadButtonsWrapper"]')

    }
  }


