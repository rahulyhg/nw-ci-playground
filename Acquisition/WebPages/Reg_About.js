class Reg_About
{
    constructor(_browser)
    {
        this.browser = _browser;
    }

    setAboutYourself(biodata)
    {

        let helpme_selector = '//form[@id="description"]//div[(text()="Help me write this")]';
        let copythis_selector = '//span[(text()="Copy this")]';

        this.browser
        .waitForElementVisible(helpme_selector)
        .click(helpme_selector)
        .pause(2000) // cannot find selector for copy this
        .waitForElementVisible(copythis_selector)
        .click(copythis_selector)
    }

    setMobileNumber(number)
    {
        let mobile_selector = '//input[@id="mobileNumber"]'

        this.browser
        .waitForElementVisible(mobile_selector)
        .clearValue(mobile_selector)
        .setValue(mobile_selector , number);
    }

    clickCreateProfile()
    {
        let create_selector = '//*[@id="submit-form-description"]';

        this.browser
        .waitForElementVisible(create_selector)
        .click(create_selector)
    }

    clickCopyThis()
    {
        let copyThis_selector = '//button[@layerbtn="LayerBtn"]/span';

        this.browser
        .waitForElementVisible(copyThis_selector)
        .click(copyThis_selector);
    }

    clickCopyThis_Cancel()
    {
        let copyThis_selector = "//button[@layerbtn='LayerBtn']/parent::div/div";

        this.browser
        .waitForElementVisible(copyThis_selector)
        .click(copyThis_selector);
    }

    clickPhysicalDisability()
    {
        let phy_dis_selector = "//input[@id='disability']//parent::span";

        this.browser
        .waitForElementVisible(phy_dis_selector)
        .click(phy_dis_selector);
    }

    setCountryCode(code_value)
    {
        let country_code_selector = "//input[@id='countryCode']";
        this.browser
        .waitForElementVisible(country_code_selector)
        .clearValue(country_code_selector)
        .waitForElementVisible("//div[@value='" + code_value +"']")
        .click("//div[@value='" + code_value +"']")
    }

}

module.exports = Reg_About;