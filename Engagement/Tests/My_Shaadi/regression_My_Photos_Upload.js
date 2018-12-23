const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

const My_Photos = require("../../WebPages/My_Shaadi/My_Photos");
const test_data = require("./photos_test_data.json");
let {test_url,AB} = require("../../../shaadi.conf");

module.exports =
{
    '@tags': ['regression','my_photos'],

    before : function(browser)
    {
    	  let login = new Acquisition_Login(browser);
        let username = profile_test_data["myphoto_upload"][AB][environment][0];
        let pass = profile_test_data["myphoto_upload"][AB][environment][1];

        login.quickLogin(username, pass);
    },


  'Test for my photos page' : (browser) =>
  {
    const menu = new Engagement_Menu(browser);
    const photos = new My_Photos(browser);

    menu.visitMenuByURL("my shaadi","add photos");

    //upload photo
    photos.clickPhotoAlbumTab();
    photos.uploadPhotos(test_data["photo_path_root"]);

  }
};