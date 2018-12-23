class Reg_Education_Works {
    constructor(_browser) {
        this.browser = _browser;
    }

    setEductionField(ed_value) {
        if (ed_value == undefined)
            throw new Error("education field cannot be undefined");

        this.setDropDownByClick("educationField", ed_value);
    }

    setCollege1(college_value) {
        if (college_value == undefined)
            throw new Error("college field cannot be undefined");

        this.setDropDownByKeyPress("highestCollege", college_value);
    }


    setEmployer(employer_value) {
        if (employer_value == undefined)
            throw new Error("college field cannot be undefined");

        this.setDropDownByKeyPress("employer", employer_value);
    }

    setCollege2(college_value) {
        if (college_value == undefined)
            throw new Error("college field cannot be undefined");

        this.setDropDownByKeyPress("anotherCollege", college_value);
    }


    setOccupation(occupation_value) {
        if (occupation_value == undefined)
            throw new Error("occupation field cannot be undefined");

        this.setDropDownByClick("workingAs", occupation_value);
    }

    setDropDownByKeyPress(dd_type, dd_value) {
        let ddSelector = "";
        if (dd_type == "educationField") ddSelector = 'input[id="educationField"]';
        else if (dd_type == "highestCollege") ddSelector = 'input[id="highestCollege"]';
        else if (dd_type == "anotherCollege") ddSelector = 'input[id="anotherCollege"]';
        else if (dd_type == "workingAs") ddSelector = 'input[id="workingAs"]';
        else if (dd_type == "employer") ddSelector = 'input[id="employer"]';
       
        this.browser
            .useCss()
            .waitForElementVisible(ddSelector)
            .setValue(ddSelector, dd_value)
            .keys('\uE007') //press enter
            .pause(1500) // neded to delay after ENTER
            .useXpath();
    }

    setEducationLevel(edu_value) {
        if (edu_value == undefined)
            throw new Error("education value field cannot be undefined");

        this.setDropDownByClick("educationLevel", edu_value);
    }

    setWorkingWith(workWith_value) {
        if (workWith_value == undefined)
            throw new Error("work with value field cannot be undefined");

        this.setDropDownByClick("workingWith", workWith_value);
    }

    setWorkingAs(workWith_value, usingKey = false) {
        if (workWith_value == undefined)
            throw new Error("work as value field cannot be undefined");

        if(usingKey)
            this.setDropDownByKeyPress("workingAs", workWith_value);
        else
            this.setDropDownByClick("workingAs", workWith_value);
    }

    setIncome(income_value) {
        if (income_value == undefined)
            throw new Error("Incomevalue field cannot be undefined");

        this.setDropDownByClick("income", income_value);
    }

    setDropDownByClick(dd_type, dd_value) {
        let ddSelector = "";
        if (dd_type == "educationLevel") ddSelector = 'input[id="educationLevel"]';
        else if (dd_type == "workingWith") ddSelector = 'input[id="workingWith"]';
        else if (dd_type == "income") ddSelector = 'input[id="income"]';
        else if(dd_type == "educationField") ddSelector = 'input[id="educationField"]';
        else if (dd_type == "workingAs") ddSelector = 'input[id="workingAs"]';

        this.browser
            .useCss()
            .waitForElementVisible(ddSelector)
            .click(ddSelector)
            .waitForElementVisible('div[title="' + dd_value + '"]')
            .click('div[title="' + dd_value + '"]')
            .useXpath();
    }

    clickContinue() {
        let continue_selector = "//button[@id='submit-form-biodata']";

        this.browser
            .click(continue_selector);
    }
}

module.exports = Reg_Education_Works;