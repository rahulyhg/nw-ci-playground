const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../../Shared_Items/Comman_Library/Engagement_Menu");

let { test_url, AB, environment } = require("../../../shaadi.conf");
const profile_test_data = require("../../testdata_profiles.js");

let username, login, pass;
module.exports =
    {
        '@tags': ['moreMatches'],

        before: function (browser) {
            login = new Acquisition_Login(browser);
            username = profile_test_data["matches_moreMatches"][AB][environment][0];
            pass = profile_test_data["matches_moreMatches"][AB][environment][1];

            login.quickLogin(username, pass);
        },

        'verifying connect from more matches-recent visitor': (browser) => {

            menu = new Engagement_Menu(browser);

            browser.url(test_url + "/profile/discovery?loc=top-nav")
            browser.waitForElementVisible("//div[@data-test-selector='discovery_recent_visitors']")
                .elements("xpath", "//div[@data-test-selector='discovery_recent_visitors']//div[contains(@id,'track_visiblity_carousel')] ", function (result) {
                    browser.click("(//div[@data-test-selector='discovery_recent_visitors']//div[contains(@id,'track_visiblity_carousel')]//button[contains(text(), 'Yes')])[1]")
                })
            menu.clickLogout();
        },

        'verifying "See all" click  from more matches-recent visitor': (browser) => {

            menu = new Engagement_Menu(browser);
            login.quickLogin(username, pass);

            browser.url(test_url + "/profile/discovery?loc=top-nav")
            browser.waitForElementVisible("//div[@data-test-selector='discovery_recent_visitors']")
                .elements("xpath", "//div[@data-test-selector='discovery_recent_visitors'] ", function (result) {
                    // console.log("result : ",result.value.length)
                    browser.waitForElementVisible("//div[@data-test-selector='discovery_recent_visitors']//div/a[contains(text(),'See All')]")
                    browser.click("//div[@data-test-selector='discovery_recent_visitors']//div/a[contains(text(),'See All')]")
                })

            menu.clickLogout();
        },

        'verifying "next" navigation  at more matches-recent visitor block': (browser) => {

            menu = new Engagement_Menu(browser);

            login.quickLogin(username, pass);
            browser.url(test_url + "/profile/discovery?loc=top-nav")
            browser.waitForElementVisible("//div[@data-test-selector='discovery_recent_visitors']")
                .elements("xpath", "//div[@data-test-selector='discovery_recent_visitors']//div[contains(@id,'track_visiblity_carousel')] ", function (result) {
                    console.log("len : ", result.value.length)
                    if (result.value.length > 4) {
                        browser.click("//div[@data-test-selector='discovery_recent_visitors']//div[@data-nextdisplay= 'true']")
                            .pause(3000)
                        browser.click("//div[@data-test-selector='discovery_recent_visitors']//div[@data-prevdisplay= 'true']")
                    }

                })
            menu.clickLogout();
        },

        'verifying "more" navigation at the end of  more matches-recent visitor block': async (browser) => {

            menu = new Engagement_Menu(browser);
            login.quickLogin(username, pass);
            // visit menu - search -> advanced search
            menu.visitMenuByURL("matches", "more matches");

            browser.waitForElementVisible("//div[@data-test-selector='discovery_recent_visitors']")
            let next_selector = "//div[@data-test-selector='discovery_recent_visitors']//div[@data-nextdisplay='true']";

            function clickNext() {
                return new Promise((resolve, err) => {
                    browser.getAttribute("//div[@data-test-selector='discovery_recent_visitors']//div[@data-nextdisplay]", "data-nextdisplay", (item) => {
                        if (item.value == 'true')
                            browser.click(next_selector);
                        resolve(item.value); //RETURN VALUE
                    })
                })
            }

            //CLICK NEXT
            let isbreak = false;
            while (true) //INFINITE LOOP -> ALWAYS TRUE
            {
                await clickNext().then(item1 => {
                    // console.log(item1);

                    if (item1 == "false")
                        isbreak = true;
                });

                if (isbreak)
                    break;
            }
            //CLICK MORE
            let last_member_selector = "//div[@data-test-selector='discovery_recent_visitors']//div[contains(@id,'track_visiblity_carousel')]//div[contains(text(),'more')]";
            browser.click(last_member_selector);
            browser.pause(2000)
            menu.clickLogout();
        },

    }