const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

const My_Photos = require("../../WebPages/My_Shaadi/My_Photos");
const test_data = require("./photos_test_data.json");

let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");

let login, menu , photos;

module.exports =
{
  '@tags': ['regression','my_photos'],

  before : function(browser) {

    login = new Acquisition_Login(browser);
    menu = new Engagement_Menu(browser);
    photos = new My_Photos(browser);

    let username = profile_test_data["photo_setting"][AB][environment][0];
    let pass = profile_test_data["photo_setting"][AB][environment][1];

    login.quickLogin(username, pass);
  },


  ' check how many radio buttons are visible' : function(browser)
  {
    menu = new Engagement_Menu(browser);
    menu.visitMenuByURL("my shaadi", "add photos")

    photos.clickSettingsTab();

    browser.useCss()
    browser.waitForElementVisible('input[type=radio]')
    
    browser.elements('css selector','input[type="radio"]',(radioItems) =>{
        let radios=radioItems.value;
        browser.assert.equal(radios.length, 2, "Radio button count is correct");
    })

    browser.useXpath()
   },
   
   'verify status of More link' : (browser) =>
  {
    browser.waitForElementVisible("//div[@id='more-visible-text']")
  },

  'verify All radio buttons clicked & preview displayed' : (browser) =>
  {
    photos.chooseDisplayOption(test_data["photo_display_settings1"]);
    photos.verifyPhotoPreview(test_data["photo_display_settings1"]);

    photos.chooseDisplayOption(test_data["photo_display_settings2"]);
    photos.verifyPhotoPreview(test_data["photo_display_settings2"]);

    photos.chooseDisplayOption(test_data["photo_display_settings3"]);
    photos.verifyPhotoPreview(test_data["photo_display_settings3"]);
  },


  'verify Settings can be changed' : (browser) =>
  {
    photos.clickSaveMySettings();
  },

  'verify photo preview visible after refresh' : (browser) =>
  {
    photos.chooseDisplayOption(test_data["photo_display_settings1"]);   //reset to default
    photos.clickSaveMySettings();
    browser.refresh();
    photos.verifyPhotoPreview(test_data["photo_display_settings1"]);
  },



};
