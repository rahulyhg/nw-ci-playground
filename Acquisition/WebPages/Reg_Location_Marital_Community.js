class Reg_Location_Marital_Community {
    constructor(_browser) {
        this.browser = _browser;
    }

    setLivingCountrySince(since_value) {
        let since_selector = 'input[id="livingSince"]';

        this.browser
            .useCss()
            .waitForElementVisible(since_selector)
            .click(since_selector)
            .click('div[title="' + since_value + '"]')
            .useXpath();
    }

    setGrewUpIn(grewUpIn , usingKey = false){
        if (grewUpIn == undefined)
            throw new Error("State cannot be undefined");

        this.setDropDown("grewUpIn", grewUpIn, usingKey)

    }

    setResidencyStatus(residency_status , usingKey = false){
        if (residency_status == undefined)
            throw new Error("State cannot be undefined");

        this.setDropDown("residency_status", residency_status, usingKey)

    }

    setEthnicOrigin(ethnic_origin , usingKey = false){
        if (ethnic_origin == undefined)
            throw new Error("State cannot be undefined");

        this.setDropDown("ethnic_origin", ethnic_origin, usingKey)

    }


    setMarriedStatus(status_value) {
        let status_selector = 'input[id="maritalStatus"]';

        this.browser
            .useCss()
            .waitForElementVisible(status_selector)
            .click(status_selector)
            .waitForElementVisible('div[title="' + status_value + '"]')
            .click('div[title="' + status_value + '"]')
            .useXpath();
    }


    clickContinue() {
        this.browser.useCss()        
        let continue_selector = 'button[id="submit-form-basic"]';

        this.browser
        .waitForElementVisible(continue_selector)
        this.browser.click(continue_selector);
            
        this.browser.useXpath();
    }

    setState(state_value, usingKey = false) {
        if (state_value == undefined)
            throw new Error("State cannot be undefined");

        this.setDropDown("state", state_value, usingKey)
    }

    setCity(city_value, usingKey = false) {
        if (city_value == undefined)
            throw new Error("City cannot be undefined");

        this.setDropDown("city", city_value, usingKey)
    }

    setCaste(caste_value, usingKey = false) {
        if (caste_value == undefined)
            throw new Error("caste cannot be undefined");

        this.setDropDown("caste", caste_value, usingKey)
    }

    setDropDown(dd_type, dd_value, usingKey = false) {
        let ddSelector = "";
        if (dd_type == "state") ddSelector = 'input[id="state"]';
        else if (dd_type == "city") ddSelector = 'input[id="city"]';
        else if (dd_type == "caste") ddSelector = 'input[id="caste"]';
        else if (dd_type == "district") ddSelector = 'input[id="district"]';
        else if (dd_type == "domain") ddSelector = 'input[id="regionalSite"]';
        else if (dd_type == "grewUpIn") ddSelector ='div[id="btn-arrow-grewUpIn"]';
        else if (dd_type == "residency_status") ddSelector ='button[name="residencyStatus"]';
        else if (dd_type == "ethnic_origin") ddSelector ='input[id="ethnicity"]';
          this.browser
            .useCss()
            .waitForElementVisible(ddSelector);

        if (dd_type == "city")
            this.browser.pause(3000) //TODO -  find way to remove pause

        if (dd_type == "district")
            this.browser.pause(3000)

            if (dd_type == "grewUpIn")
            this.browser.pause(3000)
            
           //TODO -  find way to remove pause

        if (usingKey) {            
            this.browser            
                .setValue(ddSelector, dd_value)
                .keys('\uE007') //press enter
                .pause(500) // needed for delay after ENTER
                .useXpath();
        }
        else {
            let value_selector = 'div[title="' + dd_value + '"]';
            this.browser
                .click(ddSelector)
                .waitForElementVisible(value_selector)
                .click(value_selector);
        }

        this.browser.useXpath();
    }


    setHasChildren(option_value) {
        let selector = "";
        if (option_value == "No") selector = "//div[@id='haveChildren']//button[1]//label[text()='No']";
        else if (option_value == "Yes. Living together") selector = "//div[@id='haveChildren']//button[2]//label[text()='Yes. Living together']";
        else if (option_value == "Yes. Not living together") selector = "//div[@id='haveChildren']//button[3]//label[text()='Yes. Not living together']";

        this.browser
            .waitForElementVisible(selector)
            .click(selector)
    }

    setChildren(option_value) {
        let selector = "";
        if (option_value == "1") selector = "//div[@id='noOfChildren']//button[1]//label[text()='1']";
        else if (option_value == "2") selector = "//div[@id='noOfChildren']//button[2]//label[text()='2']";
        else if (option_value == "3") selector = "//div[@id='noOfChildren']//button[3]//label[text()='3']";
        else if (option_value == "More than 3") selector = "//div[@id='noOfChildren']//button[4]//label[text()='More than 3']";

        this.browser
            .waitForElementVisible(selector)
            .click(selector)
    }

    setCasteNoBar(){
        this.browser
        .waitForElementPresent('//*[@id="casteNoBar"]')
        .click('//*[@id="casteNoBar"]')
    }

    setRegionalSite(domain_value,usingKey = false){
        if (domain_value == undefined)
        throw new Error("Regional site cannot be undefined");

        this.setDropDown("domain", domain_value, usingKey)
    }

    setZipCode(zip_value) {

        if (zip_value == undefined)
            throw new Error("Zip code cannot be undefined");

        let ddSelector = 'input[id="zip"]';
        this.browser
            .useCss()
            .waitForElementVisible(ddSelector);
        
        this.browser
            .refresh()
            //.clearValue(ddSelector)
            .pause(3000)
            .setValue(ddSelector, zip_value)
            .pause(2000) // ajax calls
            .keys('\uE007') //press enter
            .pause(500) // needed for delay after ENTER
            .useXpath();
    }

   

    checkNoZipCode() {
        let noZip_selector = "//input[@id='zipStatus']";

        this.browser
            .waitForElementPresent(noZip_selector)
            .click(noZip_selector);
    }

    setDistrict(city_value, usingKey = false) {
        if (city_value == undefined)
            throw new Error("District cannot be undefined");

        this.setDropDown("district", city_value, usingKey)
    }

    isDropdownTextfieldSubcommunity(caste_value, dropdown_or_textbox) {

        this.setCaste(caste_value)
        this.browser.useCss();

        if (dropdown_or_textbox == "textbox") {
            this.browser.pause(1000)
            this.browser.expect.element("input[id='subCaste']").to.not.have.attribute("readonly")
        }

        else {
            this.browser.pause(1000)
            this.browser.assert.attributeEquals("input[id='subCaste']", "readonly", "true");
        }

    }

}
module.exports = Reg_Location_Marital_Community;

