const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");
const Inbox_Invitations = require("../../../Engagement/WebPages/Inbox/Invitations");

let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");

module.exports =
{
    '@tags': ['regression'],

    before : function(browser)
    {
        let login = new Acquisition_Login(browser);
        let username = profile_test_data["growth_2wayRemoval"][AB][environment][0];
        let pass = profile_test_data["growth_2wayRemoval"][AB][environment][1];

        login.quickLogin(username, pass);
    },

    'verifying unmasked premium message on inbox-invitation page':(browser) =>{
        
        menu = new Engagement_Menu(browser);
        invitations = new Inbox_Invitations(browser);
     
        browser
            .url(test_url + "/inbox/pending/interests")
            .waitForElementVisible("//div[@data-test-selector='both_party_ab']");

        invitations.selectFilter("Premium Invitations");

        browser
            .waitForElementVisible("//div[@data-test-selector='both_party_ab']")
            .waitForElementNotPresent("//a[text()='Get Facebook Verified']");
            
        menu.clickLogout();
    },

    'verifying unmasked premium message on inbox-profile page':(browser) =>{
        
        login = new Acquisition_Login(browser);
        menu = new Engagement_Menu(browser);
        invitations = new Inbox_Invitations(browser);
     
        login.quickLogin('bpp8@bankas.in','test');
        browser
            .url(test_url + "/inbox/pending/interests")
            .waitForElementVisible("//div[@data-test-selector='both_party_ab']")
        invitations.selectFilter("Premium Invitations");
        browser.waitForElementVisible("//div[@data-test-selector='both_party_ab']")

        .click("//div[@type='inboxCard']/following-sibling::div[1]//a")
        
        browser.windowHandles(function(result) {
            var handle = result.value[1];
            browser.switchWindow(handle);
        })
        browser.waitForElementNotPresent("//a[text()='Get Facebook Verified']")

        menu.clickLogout();
    },

    'Verifying unmasked premium message at chat window':(browser) =>{
        
        login = new Acquisition_Login(browser);
        menu = new Engagement_Menu(browser);
        invitations = new Inbox_Invitations(browser);
        let profileName;
        let buddyName ;

        login.quickLogin('bpp8@bankas.in','test');

        browser
        .url(test_url + "/inbox/pending/interests")
        .waitForElementVisible("//div[@data-test-selector='both_party_ab']")
        
        .getText('//*[contains(@data-test-selector, "Premium")]//parent::span//parent::div//a[1]', function(result){
            profileName=result.value;
            browser.click('//*[contains(@data-test-selector, "Premium")]//parent::span//parent::div//a[1]')
            //opening profile page
            browser.windowHandles(function(result) {
                var handle = result.value[1];
                browser.switchWindow(handle);
            })
            .pause(5000)
            //Accept the profile
            browser.click('//button[@title="Accept"]')
            //refresh the page after 5000
            .pause(9000)
            .refresh()
            
        })
        browser.waitForElementVisible("//div[@data-test-selector='both_party_ab']")
        .pause(5000)
       
       
        // searching profile name at chat window
        .click('//button[@data-test-selector="Chats"]')
        browser.elements('xpath','//button[@data-test-selector="chatItem"]//strong',function(result){
            //console.log("listname : ",result.value.length)
            for (let index = 0; index < result.value.length; index++) {
                let buddyAttri = result.value[index];
                browser.elementIdText(buddyAttri.ELEMENT,function(res){
                    buddyName=res.value;
                    console.log("buddyName: ",buddyName)
                    console.log("profileName : ",profileName)
                    if (buddyName.includes(profileName)) {
                        console.log(buddyName ," matched ",profileName)
                        browser.click('//button[@data-test-selector="chatItem"]//div/div[1]/strong[contains(text(), "'+ buddyName +'")]')
                        browser.assert.containsText("//div[@data-test-selector='chatWindow']/div/div", profileName);
                        browser.assert.containsText("//div[@data-test-selector='chatWindow']//div[contains(text(),'"+profileName+"')]/parent::div/following-sibling::section", "Upgrade Now!");
                        return
                    }
                })
                
            }
        })
        menu.clickLogout();
    },
    
}