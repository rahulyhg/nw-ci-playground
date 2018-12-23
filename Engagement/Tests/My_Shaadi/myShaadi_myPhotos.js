const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

const My_Photos = require("../../WebPages/My_Shaadi/My_Photos");
const test_data = require("./photos_test_data1.json");
const Chat = require("../../WebPages/Chat")

module.exports =
{
    '@tags': ['lib_check','lib_my_photos'],

  'Test for my photos page' : (browser) =>
  {
    //object initialize
    const login = new Acquisition_Login(browser);
    const menu = new Engagement_Menu(browser);
    const photos = new My_Photos(browser);
    const chat = new Chat(browser);

    login.quickLogin(test_data["user_name"], test_data["password"]);
    menu.visitMenuByURL("my shaadi","add photos");

    //upload photo
    photos.clickPhotoAlbumTab();
    photos.uploadPhotos(test_data["photo_path_root"]);

    //choose settings
    photos.clickSettingsTab();
    photos.chooseDisplayOption(test_data["photo_display_settings"]);
  }
};