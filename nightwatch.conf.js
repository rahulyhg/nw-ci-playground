const seleniumServer = require("selenium-server");
const chromedriver = require("chromedriver");
const geckodriver = require("geckodriver");
const iedriver = require("iedriver");

const nwConfig =
{
    "src_folders" : [""],
    "output_folder" : "Result",
    "custom_commands_path" : "",
    "custom_assertions_path" : "",
    "page_objects_path" : "",
    "globals_path" : "global.js",  
    "live_output" : true,
    "disable_colors" : false,

    "selenium" : {
      "start_process": true,
      "host": "127.0.0.1",
      "port": 4242,
      "server_path": seleniumServer.path,
      "cli_args": {
        "webdriver.gecko.driver": geckodriver.path,
        "webdriver.chrome.driver": chromedriver.path,
        "webdriver.ie.driver" : iedriver.path32
      }
    },

    "test_settings" : {
      //NOT WORKING
      "not-working" : {
        "webdriver": {
          "port": 9515,
          "default_path_prefix": "",
          "server_path": ""
        },

        "desiredCapabilities" : {
          "browserName" : "chrome",
          "chromeOptions" : {},
          "loggingPrefs" :{
            "browser" : "ALL"
          }
        },

        "screenshots" : {
          "enabled" : true,
          "on_failure" : true,
          "on_error" : true,
          "path" : "Result"
        },

        "end_session_on_fail" : false,
        "skip_testcases_on_fail" : false,
        "use_xpath" : true
        
      },

      //CHROME
      "default" : {
        "desiredCapabilities" : {
          "browserName" : "chrome", 
          "acceptSslCerts": true,
          "javascriptEnabled": true,
        },

        "screenshots" : {
          "enabled" : true,
          "on_failure" : true,
          "on_error" : true,
          "path" : "Result"
        },

        "end_session_on_fail" : false,
        "skip_testcases_on_fail" : false,
        "use_xpath" : true
      },

      //Firefox
      "firefox" : {
        "desiredCapabilities" : {
          "browserName" : "firefox",
          "acceptSslCerts": true,
          "javascriptEnabled": true
        },

        "screenshots" : {
          "enabled" : true,
          "on_failure" : true,
          "on_error" : true,
          "path" : "Result"
        },

        "end_session_on_fail" : false,
        "skip_testcases_on_fail" : false,
        "use_xpath" : true
      },

      //IE
      "ie" : {
        "desiredCapabilities" : {
          "browserName" : "internet explorer", //firefox , chrome, internet explorer
          "acceptSslCerts": true,
          "javascriptEnabled": true,
          "ensureCleanSession" : true,
          "enablePersistentHover" :false,
          "requireWindowFocus" : true,
          'ie.ensureCleanSession' : true
          //"ignoreProtectedModeSettings" : true,
          //"ignoreZoomSetting" : true,
        },

        "screenshots" : {
          "enabled" : true,
          "on_failure" : true,
          "on_error" : true,
          "path" : "Result"
        },

        "end_session_on_fail" : false,
        "skip_testcases_on_fail" : false,
        "use_xpath" : true
      }
    }
}

module.exports = nwConfig;