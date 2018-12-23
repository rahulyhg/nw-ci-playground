//comman library
const Acquisition_Login = require("../../../Shared_Items/Comman_Library/Acquisition_Login");
const Payment_Cart = require("../../WebPages/Payment_Cart_JusPay");
const Payment_Plans_ReDesign = require("../../WebPages/Payment_Plans_ReDesign");
let { test_url, AB, environment } = require("../../../shaadi.conf");
const profile_test_data = require("../../Tests/testdata_profile.js");

let login, pp1, pp2;
this['before'] = function (browser) {
        login = new Acquisition_Login(browser);
        pp2 = new Payment_Cart(browser);
        pp1 = new Payment_Plans_ReDesign(browser);

        let username = profile_test_data["regression_EMI"][AB][environment][0];
        let pass = profile_test_data["regression_EMI"][AB][environment][1];

        login.quickLogin(username, pass);
}

this["Verify EMI not visible to premium plans"] = function (browser)
{
        browser
        .url(test_url + "/payment");
        pp1.selectPremiumPlan("goldplus");
                
        browser.waitForElementVisible("//div[@id='creditCardTab']")
        browser.waitForElementNotPresent("//*[@id='emiTab']")
}

this["Verify popular bank for EMI"] = function(browser)
{
        browser
        .url(test_url + "/payment");

        pp1.openSelectPlanDropDown();
        pp1.selectPersonalizedPlan("3month");
        pp2.clickPaymentTab("emi");
        
        browser
        .waitForElementVisible("//input[@type='radio' and @value='HDFC']")
        .waitForElementVisible("//input[@type='radio' and @value='ICICI']")
        .waitForElementVisible("//input[@type='radio' and @value='AXIS']");
}

this['verify HDFC EMI options'] = function (browser) {
        
        pp2.selectEMIBank("HDFC");

        ["1","2","3","4"].forEach(index => {

                let emi1 = "(//input[@class='cart_emi-EmiRadio' and @type='radio'])["+index+"]";

                browser
                        .waitForElementVisible(emi1)
                        .click(emi1)
                        .waitForElementVisible("//div[@class='cart_emi-PlanDetailsActive']//button[@id='PayNowBtn']")
                
                //TOTAL EMI AMOUNT
                browser.getText("//div[@class='cart_emi-PlanDetailsActive']//div[@data-test-selector='emi_total_amt']//span", (res) => {
                        let ans = res.value;
                        browser.getText("//div[@id='total_price']/span/span", (res1)=> {
                                browser.pause(3000)
                                browser.assert.deepEqual(ans, res1.value, "Total EMI amount comparision-" + ans);
                        })
                })
        
                pp2.click_ChooseThisPlan();
        
                browser
                        .waitForElementVisible("//div[@class='cart_emi-ChooseAnotherPlan']")
                        .waitForElementVisible("//div[@id='iframe_card_number']")
                        .waitForElementVisible("//div[@id='iframe_card_exp_month']")
                        .waitForElementVisible("//div[@id='iframe_card_exp_year']")
                        .waitForElementVisible("//div[@id='iframe_security_code']")
                        .waitForElementVisible("//div[@id='iframe_name_on_card']")
        
                browser
                        .click("//div[@class='cart_emi-ChooseAnotherPlan']")
                        .pause(1500)
        });
}

this['verify ICICI Bank emi options'] = function (browser) {

        pp2.selectEMIBank("ICICI");

        ["1","2","3","4"].forEach(index => {

                let emi1 = "(//input[@class='cart_emi-EmiRadio' and @type='radio'])["+index+"]";

                browser
                        .waitForElementVisible(emi1)
                        .click(emi1)
                        .waitForElementVisible("//div[@class='cart_emi-PlanDetailsActive']//button[@id='PayNowBtn']")
                
                //TOTAL EMI AMOUNT
                browser.getText("//div[@class='cart_emi-PlanDetailsActive']//div[@data-test-selector='emi_total_amt']//span", (res) => {
                        let ans = res.value;
                        browser.getText("//div[@id='total_price']/span/span", (res1)=> {
                                browser.pause(3000)
                                browser.assert.deepEqual(ans, res1.value, "Total EMI amount comparision-" + ans);
                        })
                })
        
                pp2.click_ChooseThisPlan();
        
                browser
                        .waitForElementVisible("//div[@class='cart_emi-ChooseAnotherPlan']")
                        .waitForElementVisible("//div[@id='iframe_card_number']")
                        .waitForElementVisible("//div[@id='iframe_card_exp_month']")
                        .waitForElementVisible("//div[@id='iframe_card_exp_year']")
                        .waitForElementVisible("//div[@id='iframe_security_code']")
                        .waitForElementVisible("//div[@id='iframe_name_on_card']")
        
                browser
                        .click("//div[@class='cart_emi-ChooseAnotherPlan']")
                        .pause(1500)
        });
}
this['verify Axis Bank emi options'] = function (browser) {

        pp2.selectEMIBank("AXIS");

        ["1","2","3","4"].forEach(index => {

                let emi1 = "(//input[@class='cart_emi-EmiRadio' and @type='radio'])["+index+"]";

                browser
                        .waitForElementVisible(emi1)
                        .click(emi1)
                        .waitForElementVisible("//div[@class='cart_emi-PlanDetailsActive']//button[@id='PayNowBtn']")
                
                //TOTAL EMI AMOUNT
                browser.getText("//div[@class='cart_emi-PlanDetailsActive']//div[@data-test-selector='emi_total_amt']//span", (res) => {
                        let ans = res.value;
                        browser.getText("//div[@id='total_price']/span/span", (res1)=> {
                                browser.pause(3000)
                                browser.assert.deepEqual(ans, res1.value, "Total EMI amount comparision -" + ans);
                        })
                })
        
                pp2.click_ChooseThisPlan();
        
                browser
                        .waitForElementVisible("//div[@class='cart_emi-ChooseAnotherPlan']")
                        .waitForElementVisible("//div[@id='iframe_card_number']")
                        .waitForElementVisible("//div[@id='iframe_card_exp_month']")
                        .waitForElementVisible("//div[@id='iframe_card_exp_year']")
                        .waitForElementVisible("//div[@id='iframe_security_code']")
                        .waitForElementVisible("//div[@id='iframe_name_on_card']")
        
                browser
                        .click("//div[@class='cart_emi-ChooseAnotherPlan']")
                        .pause(1500)
        });

};
