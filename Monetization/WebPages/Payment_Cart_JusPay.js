class Payment_Cart 
{

	constructor(_browser)
	{
		this.browser = _browser;
	}

	clickPaymentTab(payment_type)
	{
		let tab_selector = "";

		payment_type = payment_type.toLowerCase();

		if(payment_type == "credit card") tab_selector = '//*[@id="creditCardTab"]';
		else if(payment_type == "debit card") tab_selector = '//*[@id="debitCardTab"]';
		else if(payment_type == "net banking") tab_selector = '//*[@id="netBankingTab"]';
		else if(payment_type == "pay at doorstep") tab_selector = '//*[@id="payAtDoorStepTab"]';
		else if(payment_type == "payment at bank") tab_selector = '//*[@id="paymentAtBankTab"]';
		else if(payment_type == "shaadi.com center") tab_selector = '//*[@id="shaadiCentreTab"]';
		else if(payment_type == "emi") tab_selector = '//*[@id="emiTab"]';
		else
		{
			throw new Error("invalid payment tab");
		}

		this.browser
		.waitForElementVisible(tab_selector)
		.click(tab_selector);
	}

	setCardNumber(card_num)
	{
		this.browser
        .element("xpath","//iframe[contains(@name,'card_number')]", (res) => {
            this.browser
            .frame(res.value)
            .setValue("//input[@id='card_number']",card_num)
            .frameParent();
        });
	}

	setCardMonth(month)
	{
		this.browser
        .element("xpath","//iframe[contains(@name,'card_exp_month')]", (res) => {
            this.browser
            .frame(res.value)
            .setValue("//input[@id='card_exp_month']",month)
            .frameParent()
        });
	}

	setCardYear(year)
	{
		this.browser
        .element("xpath","//iframe[contains(@name,'card_exp_year')]", (res) => {
            this.browser
            .frame(res.value)
            .setValue("//input[@id='card_exp_year']",year)
            .frameParent()
        });
	}

	setCVV(cvv)
	{
        this.browser
        .element("xpath","//iframe[contains(@name,'security_code')]", (res) => {
            this.browser
            .frame(res.value)
            .setValue("//input[@id='security_code']",cvv)
            .frameParent()
        });
	}

	setCardHolderName(name)
	{
		this.browser
        .element("xpath","//iframe[contains(@name,'name_on_card')]", (res) => {
            this.browser
            .frame(res.value)
            .setValue("//input[@id='name_on_card']",name)
            .frameParent()
        });

	}

	clickNext()
	{
		let selector = '//*[@id="PayNowBtn"]';

		this.browser
		.waitForElementVisible(selector)
		.click(selector);
	}

	setOTP(otp)
	{
		let opt1_selector = '//*[@id="otp_1"]';
		let opt2_selector = '//*[@id="otp_2"]';
		let opt3_selector = '//*[@id="otp_3"]';
		let opt4_selector = '//*[@id="otp_4"]';

		let {otp1, otp2, otp3, otp4} = otp.split('');

		this.browser
		.waitForElementVisible(opt1_selector)
		.waitForElementVisible(opt2_selector)
		.waitForElementVisible(opt3_selector)
		.waitForElementVisible(opt4_selector)
		.setValue(opt1_selector, otp1)
		.setValue(opt2_selector, otp2)
		.setValue(opt3_selector, otp3)
		.setValue(opt4_selector, otp4);
	}

	selectNetBBank(bank_code, isPopular = false)
	{
		let selector = "";
		bank_code = bank_code.toLowerCase();

		if(isPopular)  //HDFC, ICICI Bank, Axis Bank, SBI, IDBI bank, PNB
		{
			if(bank_code == "state bank of india") selector = "//input[@type='radio' and @value='SBI']";
			else if (bank_code == "hdfc Bank") selector = "//input[@type='radio' and @value='HDF']";
			else if (bank_code == "icici Bank") selector = "//input[@type='radio' and @value='ICI']";
			else if (bank_code == "axis Bank") selector = "//input[@type='radio' and @value='UTI']";
			else if (bank_code == "idbi Bank") selector = "//input[@type='radio' and @value='IDB']";
			else if (bank_code == "punjab national bank") selector = "//input[@type='radio' and @value='PNB']";
			else
			{
				throw new Error("invalid popular bank");
			}

			this.browser
			.waitForElementVisible(selector)
			.click(selector);
		}
		else
		{
			selector = '//*[@id="bank_code"]';

			this.browser
			.waitForElementVisible(selector)
			.setValue(selector, bank_code);
		}

	}

	setCustomerName_NetB(name)
	{
		let selector = '//*[@id="cust_name"]';
		
		this.browser
		.waitForElementVisible(selector)
		.setValue(name);
	}

	setCustomerPhone_NetB(phone)
	{
		let selector = '//*[@id="cust_phone"]';
		
		this.browser
		.waitForElementVisible(selector)
		.setValue(phone);
	}

	clickProceed()
	{
		this.clickNext();
	}

	clickResendOTPLink_PayAtBank()
	{
		this.browser
		.waitForElementVisible('//*[@id="otp_verification"]/div[1]/div[4]/span');
	}

	clickConfirmOrder_ShaadiCenter()
	{
		let selector =  '//*[@id="ShaadiCenterBtn"]';

		this.browser
		.waitForElementVisible(selector)
		.click(selector);
	}

	setCenterCity(city)
	{
		let dd_city_selector = '//*[@id="shaadiCenterCity"]';

		this.browser
		.waitForElementVisible(dd_city_selector)
		.setValue(dd_city_selector, city);
	}

	clickResendOTPLink_PayAtCenter()
	{
		this.clickResendOTPLink_PayAtBank();
	}

	clickConfirmOrder_PayAtDoor()
	{
		let selector =  '//*[@id="PayAtDoorStepBtn"]';

		this.browser
		.waitForElementVisible(selector)
		.click(selector);
	}


	
    verifyDebitNameError(param) {

        let cc = param["CC"];
        let month = param["month"];
        let year = param["year"];
        let CVV = param["CVV"]
        
        browser
		.useXpath()
		.waitForElementVisible('//*[@id="debitCardTab"]',4000)
		.click('//*[@id="debitCardTab"]')
		.waitForElementVisible('//*[@id="cc_num"]',4000)
		.setValue('//*[@id="cc_num"]',cc)
		.waitForElementVisible('//*[@id="cc_month"]',3000)
		.setValue('//*[@id="cc_month"]',month)
		.waitForElementVisible('//*[@id="cc_year"]',3000)
		.setValue('//*[@id="cc_year"]',year)
		.waitForElementVisible('//*[@id="cc_cvv"]',3000)
		.setValue('//*[@id="cc_cvv"]',CVV)
		.waitForElementVisible('//*[@id="cc_card_holder_name"]',3000)
		.clearValue('//*[@id="cc_card_holder_name"]')
		.waitForElementVisible('//*[@id="PayNowBtn"]',3000)
		.click('//*[@id="PayNowBtn"]')
		.assert.containsText('//*[@id="cardholder_error"]/div','Please enter the name of card holder.')
    }

    verifyDebitPaymentSuccess(param) {
        let cc = param["cc"];
        let month = param["month"];
        let year = param["year"];
        let CVV = param["CVV"];
        let holder_name = param["holder_name"];

        browser
		.useXpath()
		.waitForElementVisible('//*[@id="debitCardTab"]',4000)
		.click('//*[@id="debitCardTab"]')
		.waitForElementVisible('//*[@id="cc_num"]',4000)
		.setValue('//*[@id="cc_num"]',cc)
		.waitForElementVisible('//*[@id="cc_month"]',3000)
		.setValue('//*[@id="cc_month"]',month)
		.waitForElementVisible('//*[@id="cc_year"]',3000)
		.setValue('//*[@id="cc_year"]',year)
		.waitForElementVisible('//*[@id="cc_cvv"]',3000)
		.setValue('//*[@id="cc_cvv"]',CVV)
		.waitForElementVisible('//*[@id="cc_card_holder_name"]',3000)
		.setValue('//*[@id="cc_card_holder_name"]',holder_name)
		.click('//*[@id="PayNowBtn"]')
	}
	
	payDoorCityError(param)
	{
		let address1 = param["address1"];
		let verify_error = param["city_error"];

		this.browser
		.useXpath()
		.waitForElementVisible('//*[@id="payAtDoorStepTab"]',4000)
        .click('//*[@id="payAtDoorStepTab"]')
        .waitForElementVisible('//*[@id="cust_address1"]',4000)
		.setValue('//*[@id="cust_address1"]',address1)
        .waitForElementVisible('//*[@id="PayNowBtn"]',3000)
		.click('//*[@id="PayNowBtn"]')
		.assert.containsText('//*[@id="pay_city_error"]',verify_error);
	}

	getPlanAmount()
	{
		return new Promise((resolve,rej)=> {

			let plan_selector = '//*[@id="product_price"]';
			
			this.browser
			.waitForElementVisible(plan_selector)
			.getText(plan_selector, (res) => {
				resolve(res.value);
			})
		});
	 }

	getSavings()
	{
		return new Promise((resolve,rej)=> {

			let plan_selector = '//*[@id="savings_price"]';
			
			this.browser
			.waitForElementVisible(plan_selector)
			.getText(plan_selector, (res) => {
				resolve(res.value);
			})
		});
	}

	getYourPrice()
	{
		return new Promise((resolve,rej)=> {

			let plan_selector = '//*[@id="your_price_amount"]';
			
			this.browser
			.waitForElementVisible(plan_selector)
			.getText(plan_selector, (res) => {
				resolve(res.value);
			})
		});
	}

	getTotalAmount()
	{
		return new Promise((resolve,rej)=> {

			let plan_selector = '//*[@id="total_price"]';
			
			this.browser
			.waitForElementVisible(plan_selector)
			.getText(plan_selector, (res) => {
				resolve(res.value);
			})
		});
	}

	clickToolTip_shaadiCare()
	{
		let tip_parent_selector = '//*[@id="shaadicare_tooltip"]';
		let tool_tip_selector = 'html/body/div[2]/div/div/div/div[2]';
		
		this.browser
		.waitForElementVisible(tip_parent_selector)
		.click(tip_parent_selector)
		.waitForElementVisible(tool_tip_selector);
	}

	clickToolTip_shaadiSpotLight()
	{
		let tip_parent_selector = '//*[@id="profile_booster_tooltip"]';
		let tool_tip_selector = 'html/body/div[2]/div/div/div/div[2]';
		
		this.browser
		.waitForElementVisible(tip_parent_selector)
		.click(tip_parent_selector)
		.waitForElementVisible(tool_tip_selector);
	}

	clickToolTip_matchGuarantee()
	{
		let tip_parent_selector = '//*[@id="match_guarantee_tooltip"]';
		let tool_tip_selector = 'html/body/div[2]/div/div/div/div[2]';
		
		this.browser
		.waitForElementVisible(tip_parent_selector)
		.click(tip_parent_selector)
		.waitForElementVisible(tool_tip_selector);
	}

	selectEMIBank(bank_name)
	{
		this.browser
                .waitForElementVisible('//*[@id="bank_code"]')
                .click('//input[@value="'+bank_name+'"]')
	}

	click_ChooseThisPlan()
	{
		let button_selector = "//div[@class='cart_emi-PlanDetailsActive']//button[@id='PayNowBtn']";
		this.browser
			.waitForElementVisible(button_selector)
			.click(button_selector)
	}
}

module.exports = Payment_Cart;