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

        this.expandPlan(plan_type);
        this.browser
        .waitForElementVisible("//div[@id='"+plan_type+"']//button[text()='Continue']")
        .click("//div[@id='"+plan_type+"']//button[text()='Continue']")
    }

    expandPlan(planType)
    {
        let arrow_selector = "//div[@id='"+planType+"']//div[@class='folding_arrow']//span";

        this.browser.getAttribute(arrow_selector, "class", (res) => {
            
            if(res.value == "down_arrow_sku")
            {
                this.browser
                .waitForElementVisible(arrow_selector)
                .click(arrow_selector)
                .waitForElementVisible("//div[@id='"+planType+"']//button[text()='Continue']");
            }
        });
    }

    getDiscountByPlan(planType)
    {
        return new Promise((resolve,rej)=> {
            
            let plan_selector = "//div[@id='"+planType+"']//div[@class='price_column_sku']/span[1]";

            if(planType=="header")
                plan_selector = "//div[@class='top_header_gradient']";

            this.browser
            .waitForElementVisible(plan_selector)
            .getText(plan_selector, (res) => {
                let result = this.extractDiscount(res.value);
                resolve(result);
            });
        });
    }

    getNonDiscountAmtByPlan(planType)
    {
        return new Promise((resolve,rej)=> {
            let plan_selector = "//div[@id='"+planType+"']//div[@class='price_column_sku']/span[@class='strike_price_sku']";

            this.browser
            .waitForElementVisible(plan_selector)
            .getText(plan_selector, (res) => {
                let result = parseFloat((res.value).replace(/,/g,""));
                resolve(result);
            });
        });
    }

    getNonDiscountAmtByPlan_Select(planType)
    {
        return new Promise((resolve,rej)=> {
            let plan_selector = "//div[@id='"+planType+"']//div[@class='price_column_sku']//div[@class='font_16']";

            this.browser
            .waitForElementVisible(plan_selector)
            .getText(plan_selector, (res) => {
                let extractNum = (res.value).match(/\d+/g);
                let removeComma = extractNum.join('');
                let totalAmount = parseInt(removeComma);
                resolve(totalAmount);
            });
        });
    }

    extractDiscount(fullStr)
    {
        let perIndex = fullStr.indexOf("%");
        if(perIndex == -1) return 0;

        let capDiscount = 0;
        if(!isNaN(parseInt((fullStr.charAt(perIndex-2)))))
            capDiscount = fullStr.slice(perIndex-2,perIndex);
        else if(!isNaN(parseInt((fullStr.charAt(perIndex-1)))))
            capDiscount = fullStr.slice(perIndex-1,perIndex);

        return (parseInt(capDiscount));
    }

    getDiscountAmtPerMonthByPlan(planType)
    {
        return new Promise((resolve,rej)=> {
            let plan_selector = "//div[@id='"+planType+"']//div[@class='price_column_sku']/div[@class='normal_price_sku']";

            this.browser
            .waitForElementVisible(plan_selector)
            .getText(plan_selector, (res) => {
                let extractNum = (res.value).match(/\d+/g);
                let removeComma = extractNum.join('');
                let perMonthAmount = parseInt(removeComma);
                resolve(perMonthAmount);
            });
        });
    }

    clickPlanCategory(planCategory)
    {
        let selector = "";

        if(planCategory == "Premium Plans") selector = '//a[@id="premium_benefits_tab"]/span';
        else if(planCategory == "Personalised Plans") selector = '//a[@id="personalised_benefits_tab"]/span';

        this.browser
            .waitForElementVisible(selector)
            .click(selector);
    }
} //class

module.exports = Payment_Plans;