/*
-----------    -------------  -------------------------------
Date           Who            Function
-----------    -------------  --------------------------------
04-Sep-2018    Babuji         Verify is member is free or premium


*/ 

const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");
let {test_url, AB, environment} = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");

module.exports =
  {
    '@tags': ['regression', 'premium_check'],

    before : function(browser)
    {
    	  let login = new Acquisition_Login(browser);
        let username = profile_test_data["premium_free_check"][AB][environment][0];
        let pass = profile_test_data["premium_free_check"][AB][environment][1];

        login.quickLogin(username, pass);
    },

    'Verify is member is free or premium': (browser) => {
      const menu = new Engagement_Menu(browser);

      menu.visitMenuByURL("matches", "my matches");
      browser.elements('xpath', '//a[text()="Upgrade"]', function (result) {
        console.log("Type of Account  :", result.value.length)
        if (result.value.length > 0)
          typeAcc = "Free";
        else
          typeAcc = "Premium";
        console.log("Type of Account  :", typeAcc)
      });

    }
  };