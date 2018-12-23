const profile_test_data = require("../../Tests/testdata_profile.js");
const Base_Test = require("../../../Base/Base_Test");

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
    },

    'Verify All premium membership' : function(browser) 
    {
        browser
        .url(test_url + "/payment")
        .waitForElementVisible("//div[@id='data_test_topband']");

        browser
        .assert.containsText('//div[@data-test-selector="SSP_G3_plans"]',"Gold")
        .assert.containsText('//div[@data-test-selector="SSP_GPlus_plans"]',"Gold Plus")
        .assert.containsText('//div[@data-test-selector="SSP_D6_plans"]',"Diamond")
        .assert.containsText('//div[@data-test-selector="SSP_DPlus_plans"]',"Diamond Plus")
        .assert.containsText('//div[@data-test-selector="SSP_PPlus_plans"]',"Platinum Plus");
    },

    'Verify all premium Features' : function(browser) 
    {
        browser
         .assert.containsText('//div[@class="features_text_bg"]/span[2]',"Duration & Price Per Month")
         .assert.containsText('//div[@class="features_text"]/span[2]',"Send unlimited Messages")
         .assert.containsText('//span[contains(text(),"View Contact Numbers")]',"View Contact Numbers")
         .assert.containsText('//span[contains(text(),"Get highlighted to your Matches")]',"Get highlighted to your Matches")
         .assert.containsText('//span[contains(text(),"Make Contact details visible to all")]',"Make Contact details visible to all")
     }, 

     'Verify Gold Membership details' : function(browser) 
     {
        baseTest.pp1_revamp.clickRadioPlan("gold");

        browser
        .isVisible("//div[@data-test-selector='SSP_G3_wrapper']//span[@data-test-selector='discount']" ,(result)=> {

            let selector = "";
            if(result.value) selector = '//span[@id="data_test_SSP_G3_original"]';
            else selector = '//span[@id="data_test_SSP_G3_actual"]';

            browser.assert.containsText(selector,"₹4,450")    
        })

        browser
        .assert.containsText('//span[@id="data_test_SSP_G3_month"]',"3 months");

        browser.getText('//span[@id="data_test_SSP_G3_permonth"]', (res) => {
            browser.assert.ok(isAlphaNumeric(res.value), "gold price is numeric");
        })
        
        browser.isVisible('//div[@data-test-selector="SSP_G3_wrapper"]//div[4]/div[@data-test-selector="tick"]');
        
        browser.assert.containsText('//div[@data-test-selector="SSP_G3_wrapper"]//div[@data-test-selector="count"]',"75");
        browser.assert.containsText('//div[@data-test-selector="SSP_G3_wrapper"]//div[6]',"-");
        browser.assert.containsText('//div[@data-test-selector="SSP_G3_wrapper"]//div[7]',"-");

        browser.waitForElementVisible('//div[@id="data_test_continue_SSP_G3"]');
     },

     'Verify Gold plus Membership details' : function(browser) 
     {
        baseTest.pp1_revamp.clickRadioPlan("goldplus");

        browser
        .isVisible("//div[@data-test-selector='SSP_GPlus_wrapper']//span[@data-test-selector='discount']" ,(result)=> {

            let selector = "";
            if(result.value)
                selector = '//span[@id="data_test_SSP_GPlus_original"]';
            else
                selector = '//span[@id="data_test_SSP_GPlus_actual"]';

            browser.assert.containsText(selector,"₹5,550")    
        })

        browser.assert.containsText('//span[@id="data_test_SSP_GPlus_month"]',"3 months")
        
        browser.getText('//span[@id="data_test_SSP_GPlus_permonth"]', (res) => {
            browser.assert.ok(isAlphaNumeric(res.value), "gold plus price is numeric");
        });

        browser.isVisible('//div[@data-test-selector="SSP_GPlus_wrapper"]//div[4]/div[@data-test-selector="tick"]');
        browser.isVisible('//div[@data-test-selector="SSP_GPlus_wrapper"]//div[6]/div[@data-test-selector="tick"]');
        
        browser.assert.containsText('//div[@data-test-selector="SSP_GPlus_wrapper"]//div[@data-test-selector="count"]',"150");
        browser.assert.containsText('//div[@data-test-selector="SSP_GPlus_wrapper"]//div[7]',"-");

        browser.waitForElementVisible('//div[@id="data_test_continue_SSP_GPlus"]');
     },
      
     'Verify Diamond Membership details' : function(browser) 
     {
        baseTest.pp1_revamp.clickRadioPlan("diamond");

        browser
        .isVisible("//div[@data-test-selector='SSP_D6_wrapper']//span[@data-test-selector='discount']" ,(result)=> {

            let selector = "";
            if(result.value)
                selector = '//span[@id="data_test_SSP_D6_original"]';
            else
                selector = '//span[@id="data_test_SSP_D6_actual"]';

            browser.assert.containsText(selector,"₹6,550")    
        })
        .assert.containsText('//span[@id="data_test_SSP_D6_month"]',"6 months");

        monthvalue = browser.getText('//span[@id="data_test_SSP_D6_permonth"]', (res) => {
            browser.assert.ok(isAlphaNumeric(res.value), "diamond price is numeric");
        })
        
        browser.isVisible('//div[@data-test-selector="SSP_D6_wrapper"]//div[4]/div[@data-test-selector="tick"]');
    
        browser.assert.containsText('//div[@data-test-selector="SSP_D6_wrapper"]//div[@data-test-selector="count"]',"150");
        
        browser.assert.containsText('//div[@data-test-selector="SSP_D6_wrapper"]//div[6]',"-");
        browser.assert.containsText('//div[@data-test-selector="SSP_D6_wrapper"]//div[7]',"-");

        browser.waitForElementVisible('//div[@id="data_test_continue_SSP_D6"]');
     },

     'Verify Diamond plus Membership details' : function(browser) 
     {
        baseTest.pp1_revamp.clickRadioPlan("diamondplus");

        browser
        .isVisible("//div[@data-test-selector='SSP_DPlus_wrapper']//span[@data-test-selector='discount']" ,(result)=> {

            let selector = "";
            if(result.value)
                selector = '//span[@id="data_test_SSP_DPlus_original"]';
            else
                selector = '//span[@id="data_test_SSP_DPlus_actual"]';

            browser.assert.containsText(selector,"₹8,650");
        })

        browser
        .assert.containsText('//div[@data-test-selector="top_seller"]','TOP SELLER')
        .assert.containsText('//span[@id="data_test_SSP_DPlus_month"]',"6 months");

        browser
        monthvalue = browser.getText('//span[@id="data_test_SSP_DPlus_permonth"]', (res) => {
            browser.assert.ok(isAlphaNumeric(res.value), "diamond plus price is numeric");
        })
        
        browser.isVisible('//div[@data-test-selector="SSP_DPlus_wrapper"]//div[4]/div[@data-test-selector="tick"]');
        browser.isVisible('//div[@data-test-selector="SSP_DPlus_wrapper"]//div[6]/div[@data-test-selector="tick"]');
        browser.isVisible('//div[@data-test-selector="SSP_DPlus_wrapper"]//div[7]/div[@data-test-selector="tick"]');

        browser.assert.containsText('//div[@data-test-selector="SSP_DPlus_wrapper"]//div[@data-test-selector="count"]',"300");
      
        browser.waitForElementVisible('//div[@id="data_test_continue_SSP_DPlus"]');
     },

     'Verify Platinum plus Membership details' : function(browser) 
     {
        baseTest.pp1_revamp.clickRadioPlan("platinumplus");

        browser
        .isVisible("//div[@data-test-selector='SSP_PPlus_wrapper']//span[@data-test-selector='discount']" ,(result)=> {

            let selector = "";
            if(result.value)
                selector = '//span[@id="data_test_SSP_PPlus_original"]';
            else
                selector = '//span[@id="data_test_SSP_PPlus_actual"]';

            browser.assert.containsText(selector,"₹14,650")    
        })

        browser
        .assert.containsText('//div[@data-test-selector="best_value"]','BEST VALUE')
        .assert.containsText('//span[@id="data_test_SSP_PPlus_month"]',"12 months")
        browser
        monthvalue = browser.getText('//span[@id="data_test_SSP_PPlus_permonth"]', (res) => {
            browser.assert.ok(isAlphaNumeric(res.value), "platinum plus price is numeric");
        });
    
        browser.isVisible('//div[@data-test-selector="SSP_PPlus_wrapper"]//div[4]/div[@data-test-selector="tick"]');
        browser.isVisible('//div[@data-test-selector="SSP_PPlus_wrapper"]//div[6]/div[@data-test-selector="tick"]');
        browser.isVisible('//div[@data-test-selector="SSP_PPlus_wrapper"]//div[7]/div[@data-test-selector="tick"]');
            
        browser.assert.containsText('//div[@data-test-selector="SSP_PPlus_wrapper"]//div[@data-test-selector="count"]',"600");
     
        browser.waitForElementVisible('//div[@id="data_test_continue_SSP_PPlus"]');
     },

     'if user click on Select shaadi plan, it should collapse down':  function(browser) 
     {
        browser
          .url(test_url + "/payment")
          .waitForElementVisible("//div[@id='data_test_topband']");
          baseTest.pp1_revamp.openSelectPlanDropDown();
          browser.waitForElementVisible('//div[@data-test-selector="personalised_features"]');

     },

     'Verify all select shaadi features':  function(browser) 
     {
        browser
        .assert.containsText('//div[@data-test-selector="personalised_features"]/div[1]',"Dedicated Relationship Advisor")
        .assert.containsText('//div[@data-test-selector="personalised_features"]/div[2]',"Handpicked Matches")
        .assert.containsText('//div[@data-test-selector="personalised_features"]/div[3]',"Introductions & Meeting")
        .assert.containsText('//div[@data-test-selector="personalised_features"]/div[4]',"All Premium Benefits")
     },

     'Verify by default, select shaadi 6 month is selected':  function(browser) 
     {
         let selector = "//div[@class='select_plan_bg']//span[@id='data_test_PP_SP6_total']";
         let radio1 = "//div[@class='select_plan_bg']//input[@data-test-selector='radio']";

        browser
            .waitForElementPresent(selector)
            .assert.containsText(selector,"₹51,500")
            .expect.element(radio1).to.be.selected;
     },

     'Verify All personalised membership (amount)' : function(browser)
     {
        browser.assert.containsText("(//div[@id='panel']//div[@role='presentation'])[1]","₹29,500 for 3 months\n₹9,834 per month");
        browser.assert.containsText("(//div[@id='panel']//div[@role='presentation'])[2]","₹51,500 for 6 months\n₹8,584 per month");
     },

     'Verify continue button directs to pp2 page' : function(browser)
     {
         browser.refresh()
        baseTest.pp1_revamp.selectPremiumPlan("goldplus");
        browser
        .waitForElementVisible("//div[@id='creditCardTab']")
        .assert.urlContains('cart')
     },

};      


function isAlphaNumeric(pwd) {
    return /\d/.test(pwd);
}