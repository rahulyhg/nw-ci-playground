class Reg_LifeStyle
{
    constructor(_browser)
    {
        this.browser = _browser;
    }

    setDiet(diet_value)
    {
        let diet_selector = 'input[id="diet"]';
        
        this.browser
        .useCss()
        .waitForElementVisible(diet_selector)
        .click(diet_selector)
        .waitForElementVisible('div[title="' + diet_value + '"]')
        .click('div[title="' + diet_value + '"]')
        .useXpath();
    }

    setHeight(height_value)
    {
        let height_selector = 'input[id="height"]';
        
        this.browser
        .useCss()
        .waitForElementVisible(height_selector)
        .click(height_selector)
        .waitForElementVisible('div[title="' + height_value + '"]')
        .click('div[title="' + height_value + '"]')
        .useXpath();
    }

    setBodyType(type)
    {
        let body_type_selector = '//div[@id="bodyType"]//label[contains(text(),"' + type + '")]';

        this.browser
        .waitForElementVisible(body_type_selector)
        .click(body_type_selector);
    }

    setSkinTone(skin_value)
    {
        let skin_selector = '//form[@id="lifestyle"]//label[(text()="' + skin_value + '")]';

        this.browser
        .waitForElementVisible(skin_selector)
        .click(skin_selector);
    }

    setSmoke(smoke_value)
    {
        let smoke_selector = '//div[@id="smokeHabbit"]//label[(text()="' + smoke_value + '")]';
        
        this.browser
        .waitForElementVisible(smoke_selector)
        .click(smoke_selector);
    }

    setDrink(drink_value)
    {
        let drink_selector = '//div[@id="drinkHabbit"]//label[(text()="' + drink_value + '")]';
        
        this.browser
        .waitForElementVisible(drink_selector)
        .click(drink_selector);
    }

    clickContinue()
    {
        let continue_selector  = '//button[@id="submit-form-lifestyle"]';

        this.browser
        .click(continue_selector)
    }

}

module.exports = Reg_LifeStyle;