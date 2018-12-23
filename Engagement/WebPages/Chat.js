class Chat {
    constructor(_browser) {
        this.browser = _browser;
    }

    toggleChat(status) {
        let chat_selector = "//span[@icon='dropdown']/ancestor::div[6]//nav/button[3]";

        this.browser
            .waitForElementVisible(chat_selector)
            .getText(chat_selector, (result) => {

                console.log(result.value)
                if ((result.value).includes("Active") && status == "offline") {
                    console.log("GOING OFFLINE");
                    this.browser
                        .waitForElementVisible('//span[@icon="online"]')
                        .click('//span[@icon="online"]')//checking member is online for chat
                        .waitForElementVisible('//span[@icon="offline"]',9000)
                        .click('//span[@icon="offline"]')//clicking offline option from dropdown
                        .pause(300)
                        .acceptAlert()//ok going offline
                        .waitForElementVisible('//button[text()="Go Online"]')
                }
                else if ((result.value).includes("Go Online") && status == "online") {
                    console.log("GOING ONLINE");
                    this.browser
                        .waitForElementVisible('//button[text()="Go Online"]')
                        .click('//button[text()="Go Online"]')//making online again
                        .waitForElementPresent('//span[@icon="online"]')
                }
            })
    }

}

module.exports = Chat;
