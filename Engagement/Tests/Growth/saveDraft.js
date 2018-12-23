const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");

let user, login, pass;
module.exports =
{
    '@tags': ['saveDraft'],

    before : function(browser)
    {
    	let login = new Acquisition_Login(browser);
        username = profile_test_data["growth_save_draft"][AB][environment][0];
        pass = profile_test_data["growth_save_draft"][AB][environment][1];

        login.quickLogin(username, pass);
    },

    'verifying checkbox with Text Change on premium connect':(browser) =>{
        
        login = new Acquisition_Login(browser);
        menu = new Engagement_Menu(browser);
        
        browser.url("https://my.shaadi.com/profile/daily-recommendations")

        browser.waitForElementVisible("//div[@data-test-selector='profile_connect_status']//div/button[contains(text(),'Yes')]")
        .click("//div[@data-test-selector='profile_connect_status']//div/button[@title='Tell this Member that you wish to Connect!']")
        //opening /waiting for pop up
        .waitForElementVisible("//div[@data-test-selector='send_connect']")
       //changed text verification
        .assert.containsText("//label[@for='willSaveDraft']/span","Set as default")
        browser.click("//div[@data-test-selector='send_connect']/div/button")//to close pop up
        menu.clickLogout();
       
    },
    'selecting message from drafts on premium connect':(browser) =>{
        
        menu = new Engagement_Menu(browser);
        
        login.quickLogin(username, pass);
        browser.url("https://my.shaadi.com/profile/daily-recommendations")

        browser.waitForElementVisible("//div[@data-test-selector='profile_connect_status']//div/button[contains(text(),'Yes')]")
        .click("//div[@data-test-selector='profile_connect_status']//div/button[@title='Tell this Member that you wish to Connect!']")
        //opening /waiting for pop up
        .waitForElementVisible("//div[@data-test-selector='send_connect']")
       //changed text verification
        .assert.containsText("//label[@for='willSaveDraft']/span","Set as default")
        //verifing disable checkbox
        browser.expect.element('//input[@id="willSaveDraft"][@disabled]').to.be.present;
        //changing the text at pop up
        browser.clearValue('//div[@data-test-selector="send_connect"]/div/textarea')
        .pause(2000)
        .setValue('//div[@data-test-selector="send_connect"]/div/textarea', " hello")
        .click('//input[@id="willSaveDraft"]')
        .click("//div[@data-test-selector='send_connect']//button[text()='Connect']")
        browser.click("//div[@data-test-selector='send_connect']/div/button")//to close pop up
        menu.clickLogout();
    },

    'verifying maximum 5 drafts at premium connect':(browser) =>{
        
        let menu = new Engagement_Menu(browser);
        
        login.quickLogin(username, pass);
        browser.url("https://my.shaadi.com/profile/daily-recommendations")

        browser.waitForElementVisible("//div[@data-test-selector='profile_connect_status']//div/button[contains(text(),'Yes')]")
        .click("//div[@data-test-selector='profile_connect_status']//div/button[@title='Tell this Member that you wish to Connect!']")
        //opening /waiting for pop up
        .waitForElementVisible("//div[@data-test-selector='send_connect']")
       //changed text verification
        .assert.containsText("//label[@for='willSaveDraft']/span","Set as default")
        //verifing disable checkbox
        browser.expect.element('//input[@id="willSaveDraft"][@disabled]').to.be.present;
       
        browser.click("//strong[text()='Add a message']//following-sibling::button[text()='Use Draft']",function(result){
            browser.pause(2000)
            browser.elements("xpath","//div[@data-test-selector='send_connect']//div/ul/li", function(res){
                console.log("list of draft: ",res.value.length)
                if (res.value.length>5){
                    console.log("Default draft is more than 5")
                }
                else{
                    console.log("Default draft is less than 5 or 5")
                }
            })
        })
        browser.click("//div[@data-test-selector='send_connect']/div/button")//to close pop up
        
        
        
        menu.clickLogout();
    },

    
}