class Home 
{
    constructor(_browser)
    {
        this.browser = _browser;
    }

    visitHomePage()
    {
        let registration_selector = '//a[@id="sign_up_btn"]';
    
        this.browser
        .url("https://www.shaadi.com")
        .waitForElementVisible("body")
        .waitForElementVisible("//body")
        .waitForElementVisible(registration_selector);
    }

    clickRegistration()
    {
        let registration_selector = '//a[@id="sign_up_btn"]';
        let login_textbox_selector = "//input[@id='layer_email']";
        
        this.browser
        .waitForElementPresent(registration_selector)
        .getLocationInView(registration_selector)
        .pause(500) // to get the webelement in view
        .click(registration_selector)
        .waitForElementVisible(login_textbox_selector);
    }

    loginClick() 
    {
        let login_link_selector = "//a[@class='member_login']";
        let login_textbox_selector = "//input[@id='login_page']";

        this.browser
		.waitForElementVisible(login_link_selector)
        .click(login_link_selector)
        .waitForElementVisible(login_textbox_selector);
    }

}

module.exports = Home;