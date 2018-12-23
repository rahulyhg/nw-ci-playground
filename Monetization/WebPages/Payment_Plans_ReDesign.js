let {test_url,AB} = require("../../shaadi.conf");
class Payment_Plans 
{
    constructor(_browser)
	{
		this.browser = _browser;
	}

    selectPremiumPlan(plan_type)
    {
        let plans = ["gold","goldplus","diamond","diamondplus","platinumplus"];

        if(!plans.includes(plan_type))
        {
            throw new Error("Incorrect plan selected. Valid are - " + plans);
        }

        let continue_selector = "";

        if(plan_type == "gold") continue_selector = '//div[@id="data_test_continue_SSP_G3"]';
        else if(plan_type == "goldplus") continue_selector = '//div[@id="data_test_continue_SSP_GPlus"]';
        else if(plan_type == "diamond") continue_selector = '//div[@id="data_test_continue_SSP_D6"]';
        else if(plan_type == "diamondplus") continue_selector = '//div[@id="data_test_continue_SSP_DPlus"]';
        else if(plan_type == "platinumplus") continue_selector = '//div[@id="data_test_continue_SSP_PPlus"]';

        if(AB == "A")
        {
            this.clickRadioPlan(plan_type);
        }
            

        if(plan_type == "platinumplus")
        {
            this.browser.getLocationInView(continue_selector);
        }
        
        this.browser
            .waitForElementVisible(continue_selector)
            .click(continue_selector);
    }

    selectPersonalizedPlan(plan_type)
    {
        this.clickPersonalizedPlan(plan_type);
        
        this.browser
        .waitForElementVisible("(//div[@id='panel']//div[@role='presentation'])[3]")
        .click("(//div[@id='panel']//div[@role='presentation'])[3]");
    }

    clickPersonalizedPlan(plan_type)
    {
        let selector = "";
        if(plan_type == "3month") selector = "(//div[@id='panel']//div[@role='presentation'])[1]";
        if(plan_type == "6month") selector = "(//div[@id='panel']//div[@role='presentation'])[2]";

        this.browser
        .waitForElementVisible(selector)
        .click(selector);
    }

    openSelectPlanDropDown()
    {
        this.browser
            .waitForElementVisible('//div[@data-test-selector="view_plans"]')
            .click('//div[@data-test-selector="view_plans"]')
            .waitForElementVisible('//div[@data-test-selector="personalised_features"]');
    }

    clickRadioPlan(plan_type)
    {
        let plans = ["gold","goldplus","diamond","diamondplus","platinumplus"];

        if(!plans.includes(plan_type))
        {
            throw new Error("Incorrect plan selected. Valid are - " + plans);
        }

        let radio_selector = "";

        if(plan_type == "gold") radio_selector = '//div[@data-test-selector="SSP_G3_wrapper"]//input[@data-test-selector="radio"]';
        else if(plan_type == "goldplus") radio_selector = '//div[@data-test-selector="SSP_GPlus_wrapper"]//input[@data-test-selector="radio"]';
        else if(plan_type == "diamond") radio_selector = '//div[@data-test-selector="SSP_D6_wrapper"]//input[@data-test-selector="radio"]';
        else if(plan_type == "diamondplus") radio_selector = '//div[@data-test-selector="SSP_DPlus_wrapper"]//input[@data-test-selector="radio"]';
        else if(plan_type == "platinumplus") radio_selector = '//div[@data-test-selector="SSP_PPlus_wrapper"]//input[@data-test-selector="radio"]';

        this.browser
        .waitForElementVisible(radio_selector)
        .click(radio_selector);
    }

    getActualPrice(plan_type)
    {
        let price_selector = "";

        if(plan_type == "gold") price_selector = '//div[@data-test-selector="SSP_G3_wrapper"]//div[@class="membership_prize"]';
        else if(plan_type == "goldplus") price_selector = '//div[@data-test-selector="SSP_GPlus_wrapper"]//div[@class="membership_prize"]';
        else if(plan_type == "diamond") price_selector = '//div[@data-test-selector="SSP_D6_wrapper"]//div[@class="membership_prize"]';
        else if(plan_type == "diamondplus") price_selector = '//div[@data-test-selector="SSP_DPlus_wrapper"]//div[@class="membership_prize"]';
        else if(plan_type == "platinumplus") price_selector = '//div[@data-test-selector="SSP_PPlus_wrapper"]//div[@class="membership_prize"]';
        else if(plan_type == "3month") price_selector = "//div[@class='select_plan_bg']//span[@id='data_test_PP_SP1_total']";
        else if(plan_type == "6month") price_selector = "//div[@class='select_plan_bg']//span[@id='data_test_PP_SP6_total']";

        return new Promise((resolve,err) =>{
            this.browser
            .getText(price_selector,(result) => {
                console.log(result.value);
                resolve(result.value);
            })
            
        })
    }

} //class

module.exports = Payment_Plans;