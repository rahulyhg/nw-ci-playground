const profile_test_data = require("../../Monetization/Tests/testdata_profile.js");
const Base_Test = require("../../Base/Base_Test");

let baseTest, env, test_url, AB;
module.exports = {
    '@tags': ['regression','sanity'],

    before : function(browser)
    {
        baseTest = new Base_Test(browser);
        env = baseTest.shaadiConfig.environment;
        test_url = baseTest.shaadiConfig.test_url;
        AB =  baseTest.shaadiConfig.AB;

        let username = profile_test_data["regression_redesign"][AB][env][0];
        let pass = profile_test_data["regression_redesign"][AB][env][1];

        baseTest.login.quickLogin(username, pass);
        browser.pause(5000);
    },

    
};      