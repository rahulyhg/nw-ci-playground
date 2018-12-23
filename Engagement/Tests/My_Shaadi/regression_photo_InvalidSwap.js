const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

const My_Photos = require("../../WebPages/My_Shaadi/My_Photos");
const test_data = require("./photos_test_data.json");

let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");

module.exports =
{
    '@tags': ['regression','my_photos'],

    before : function(browser)
    {
    	let login = new Acquisition_Login(browser);
        let username = profile_test_data["photo_invalid_swap"][AB][environment][0];
        let pass = profile_test_data["photo_invalid_swap"][AB][environment][1];

        login.quickLogin(username, pass);
    },

  'Invalid photo upload' : (browser) =>
  {
    const menu = new Engagement_Menu(browser);
    const photos = new My_Photos(browser);

    menu.visitMenuByURL("my shaadi","add photos");

    //upload photo
    photos.clickPhotoAlbumTab();
    photos.uploadPhotos("/Engagement/Tests/My_Shaadi/test.txt");
    browser.waitForElementVisible("//div[contains(@class,'fieldset flash')]//div[contains(text(),'Invalid File type')]");
    photos.clickContinue_PhotoUpload();

  },
  'swap photos' : +function(browser) 
  {
    //NOT WORKING
    //get credential from atish.
    browser.url("http://www.shaadi.com")
    browser.pause(2000)
    browser.useXpath()
    browser.click('/html/body/div[1]/div[1]/div/div[2]/div/div[1]/a')
    browser.pause(2000)
    // performing the login functionality
    browser.waitForElementVisible('//*[@id="login_page"]', 2000)
    browser.setValue('//*[@id="login_page"]', "atish451@gmail.com")
    browser.waitForElementVisible('//*[@id="password_page"]', 2000)
    browser.setValue('//*[@id="password_page"]',"test123")
    browser.click('//*[@id="frmlogin"]/div/div[3]/a')
    browser.url("https://www.shaadi.com/my-shaadi")
    browser.pause(3000)
    //This will print user is Active or not
    browser.element('xpath','//*[@id="pg_wrap"]/div[3]/div[3]/div[2]',function(result){
      if (result.value){
        console.log("Member_is_Active")

      }
      else
      {
        console.log("Member_under_screening")
      }
      //console.log(result)
    })

    //navigating to My-photos
    browser.click('//*[@id="subnavabc"]/ul/li[3]/a')
    browser.pause(5000)
    //Performing the SWAP functionality
    browser.click('//*[@id="root"]/div/div/div[2]/div[1]/div[1]/div[2]/div[2]/div[2]/div[3]/div/div[2]/div/div/span')
    browser.pause(2000)
    browser.click('//*[@id="root"]/div/div/div[2]/div[1]/div[1]/div[2]/div[2]/div[2]/div[3]/div/div[2]/div/div/div[2]/div/ul/li[1]/a')
    //browser.click('//*[@id="import-from-fb-btn"]')
    browser.pause(4000)

  }
  
};