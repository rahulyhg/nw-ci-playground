const profile_test_data = require("../../Tests/testdata_profile.js");
const Base_Test = require("../../../Base/Base_Test");
const test_data = require("../Payment_Cart/pp2_test_data.json");

let actual_price = "";
let baseTest, env, test_url, AB;

module.exports = {
  '@tags': ['sanity'],

    before : function(browser)
    {
        baseTest = new Base_Test(browser);
        env = baseTest.shaadiConfig.environment;
        test_url = baseTest.shaadiConfig.test_url;
        AB =  baseTest.shaadiConfig.AB;
        
        let username = profile_test_data["regression_orderSummary"][AB][env][0];
        let pass = profile_test_data["regression_orderSummary"][AB][env][1];

        baseTest.login.quickLogin(username, pass);
    },



    'Get diamond plus price from PP1  page' : async function(browser) 
    {    
        browser
        .url(test_url + "/payment")
        .waitForElementVisible("//div[@id='data_test_topband']")
        
        actual_price = await baseTest.pp1_revamp.getActualPrice("diamondplus");
        baseTest.pp1_revamp.selectPremiumPlan("diamondplus");

    },

    'Verify diamond plus name/price/spotlight on PP2  page' : function(browser) 
    {    
        browser
        .waitForElementVisible("//div[@id='creditCardTab']")
        .assert.urlContains('cart')

        browser
        .verify.containsText("//div[@id='your_price_amount']/span", actual_price)
        .verify.containsText("//div[@id='product_name']", "Diamond Plus (6 Months)")
        .waitForElementNotPresent("//div[@id='add_blaster']")
    },

   

    'Get Select3 price from PP1 page' : async function(browser) 
    {    
        browser
        .url(test_url + "/payment")
        .waitForElementVisible("//div[@id='data_test_topband']")
        
        baseTest.pp1_revamp.openSelectPlanDropDown();
        baseTest.pp1_revamp.clickPersonalizedPlan("3month");
        actual_price = await baseTest.pp1_revamp.getActualPrice("3month");
        baseTest.pp1_revamp.selectPersonalizedPlan("3month")

    },

    'Verify Select3 name/price on PP2  page' : function(browser) 
    {    
        browser
        .waitForElementVisible("//div[@id='creditCardTab']")
        .assert.urlContains('cart')

        browser
        .verify.containsText("//div[@id='your_price_amount']/span", actual_price)
        .verify.containsText("//div[@id='product_name']", "Select Shaadi (3 Months)")
    },

    'Verify Total Amount with Shaadi Cares Value' : function(browser) 
    {    
        browser
        .waitForElementVisible("//input[@id='shaadicare_checkbox' and @data-status='checked']")

        let num_actualPrice =  parseInt ((actual_price.match(/\d+/g)).join(''));

        browser.getText("//div[@id='total_price']/span", (res)=>{
            let num_ShaadiCareTotal = parseInt (((res.value).match(/\d+/g)).join(''));
            browser.assert.deepEqual(num_actualPrice + 20 ,num_ShaadiCareTotal, num_ShaadiCareTotal + " = " +  (num_actualPrice + 20))
        })
    },

    'Verify Total Amount without Shaadi Cares Value' : function(browser) 
    {    
        let shaadiCare_selector = "//input[@id='shaadicare_checkbox' and @data-status='checked']";
        browser
            .waitForElementVisible(shaadiCare_selector)
            .click(shaadiCare_selector)
            .verify.containsText("//div[@id='total_price']/span", actual_price)  ;
    },
};




