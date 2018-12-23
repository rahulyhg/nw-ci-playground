const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");

module.exports =
{
  before : function(browser)
  {
      let login = new Acquisition_Login(browser);
      let username = profile_test_data["inbox_sent"][AB][environment][0];
      let pass = profile_test_data["inbox_sent"][AB][environment][1];

      login.quickLogin(username, pass);
  },
  
  'Verify Inbox Request' : function(browser)
  {
    const menu = new Engagement_Menu(browser);
  
    menu.visitMenuByURL("matches","my matches");

    // Open inbox request
    browser
      .url(test_url + "/inbox/sent/interests")
      .waitForElementVisible("button[text()='Remind']")

  // return window.getComputedStyle(document.querySelector('button[title="Remind"]')).getPropertyValue('background').includes('disabled.svg');  
  //   browser.execute("return window.getComputedStyle(document.querySelector('.best_deal_sku')).getPropertyValue('background-image').includes('png');", (res)=> {
    browser.execute("window.getComputedStyle(document.querySelector('button[text()='Remind']')).getPropertyValue('background').includes('disabled.svg');", (res)=> {
      
      if(res.value === true)
        console.log("Reminder will send After 24hours")
      else
        console.log("Reminder send")
    
    });

  browser.click("//button[text()='Remind']",)
    browser.pause(5000)
    browser.elements('xpath',"//button[@title='Close']/parent::div//button[@title='Send Reminder']",function(elems){
     if(elems.value.length > 0){
       browser.click('xpath',"//button[@title='Close']/parent::div//button[@title='Send Reminder']")
     }
     else{
       console.log("Free user")
     }
   })  
},
'Verify invitation CTA - Cancel - for FREE & PREMIUM both' : function(browser)
{
    //Cancel button 
    browser.click("//button[text()='Cancel']",)
    browser.pause(5000)
    browser.refresh()
},
};