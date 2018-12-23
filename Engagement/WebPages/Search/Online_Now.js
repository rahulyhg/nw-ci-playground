class Online_Now {

    constructor(_browser)
    {
        this.browser = _browser;
    }

    setChatStatus(status_value)
    {
        let selector = "";
        let chat_select_selector = '//input[@id="avchat-Yes"]';
        
        if(status_value == undefined)
            throw new Error ("mother tongue cannnot be undefined");

        status_value = status_value.toLowerCase();

        if(status_value == "only profiles available for chat")
            selector = chat_select_selector;

            console.log(selector);

        this.browser
        .waitForElementVisible(selector)
        .click(selector);

    }
}

module.exports = Online_Now;