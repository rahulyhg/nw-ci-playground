class Home_Login {

    constructor(_browser)
    {
        this.browser = _browser;
    }

    submitCredentials (user, pass)
    {
        if(user == undefined || pass == undefined)
        {
            throw new Error("User name or password is not provided");
        }

        let login_textbox_selector = "//*[@id='login_page']";
        let password_textbox_selector = '//*[@id="password_page"]';
        let sign_in_button_selector =  '//*[@id="frmlogin"]/div/div[3]/a';

        this.browser
        .waitForElementVisible(login_textbox_selector)
        .setValue(login_textbox_selector, user)
        .setValue(password_textbox_selector, pass)
		.click(sign_in_button_selector);
    }

    clickSignIn()
    {
        let button_selector = "//input[@type='submit']/following-sibling::a[1]";

        this.browser
        .waitForElementVisible(button_selector)
        .click(button_selector)
    }

    setEmailV2(email)
    {
        let email_selector = "//input[@id='email']";

        if(email == undefined)
            throw new Error("email is not provided");

        this.browser
        .waitForElementVisible(email_selector)
        .clearValue(email_selector)
        .setValue(email_selector, email);
    }

    setPasswordV2(password)
    {
        let pass_selector = "//input[@id='password']";

        if(password == undefined)
            throw new Error("email is not provided");

        this.browser
        .waitForElementVisible(pass_selector)
        .clearValue(pass_selector)
        .setValue(pass_selector, password);
    }

    clickSignInV2()
    {
        let signin_selector = "//input[@id='sign_in']";

        this.browser
        .waitForElementVisible(signin_selector)
        .click(signin_selector)
    }
}

module.exports = Home_Login;