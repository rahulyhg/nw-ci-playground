//comman library
const Acquisition_Login = require("../../Shared_Items/Comman_Library/Acquisition_Login");
const Engagement_Menu = require("../../Shared_Items/Comman_Library/Engagement_Menu");
const Excel_Parser =  require("../../Shared_Items/Utilities/Excel_Parser");
const ods_parser = new Excel_Parser(process.cwd() + "/Monetization/Tests/match_price_testD.ods");
let test_datas = [];

let testD_count = ods_parser.getTestDataCount();
for (let index = 2; index <= testD_count+1; index++)
{
    test_datas.push(ods_parser.getDataByRow(index));
}

test_datas.forEach((test_data,ind) => {
    
    let capDiscount = gold = goldplus = diamond = diamondplus = platinumplus = 0;
    let expected = {}, actual = {};        

    this['Verify platinum discount on listing page. row:' + (ind+2)] = function(browser)
    {
        expected.gold = test_data["gold"];
        expected.goldplus = test_data["goldplus"];
        expected.diamond = test_data["diamond"];
        expected.diamondplus = test_data["diamondplus"];
        expected.platinumplus = test_data["platinumplus"];

        let planType = test_data["plantype"];
        let existingDis = test_data["existing"];
        
        

        if(existingDis == 0 || existingDis == "0")
        {
            expected.gold = "12";
            expected.goldplus = "20";
            expected.diamond = "30";
            expected.diamondplus = "40";
            expected.platinumplus = "50";
        }

        console.log("existing discount : " + existingDis);
        console.log("existing discount : " + JSON.stringify(expected));

        login = new Acquisition_Login(browser);
        menu = new Engagement_Menu(browser);

        browser.windowMaximize();
        login.quickLogin(test_data["email"],  test_data["password"]);
        
        /* THIS IS FOR PRODUCTION
        menu.visitMenuByURL("matches","my matches");
        let banner_selector = '(//div[contains(@id,"true_view")])[1]/parent::div/parent::div/div[4][@data-banner]';
        browser.waitForElementPresent(banner_selector);
        
        browser.getText(banner_selector,(result) => {
            let platinum = getDiscount(result.value);
            browser.assert.deepEqual(test_data["platinumplus"], platinum, "platinum - " + platinum);
        });*/
    },

    this['verify GOLD discount on PP1 page. row:' + (ind+2)] = function(browser)
    {

        browser.url("https://www.shaadi.com/payment");
        browser.waitForElementPresent("//div[@id='tabsMaincontent-1']");

        //THIS IS FOR PRODUCTION
       /* browser.getText("//div[@class='timer_heading']",(result) => {
            capDiscount = getDiscount(result.value);
        });*/

        browser.waitForElementVisible("//div[@id='gold']//div[@class='price_column_sku']");

        browser.getText("//div[@id='gold']//div[@class='price_column_sku']/span[1]",(result) => {
            gold = getDiscount(result.value);
            console.log("EXPECTED GOLD - " + expected.gold);
            console.log("ACTUAL GOLD - " + gold);
            browser.assert.deepEqual(expected.gold,gold,"GOLD - " + gold);
        });
    }

    this['verify GOLD+ discount on PP1 page. row:' + (ind+2)] = function(browser)
    {
        browser.getText("//div[@id='goldplus']//div[@class='price_column_sku']/span[1]",(result) => {
            goldplus = getDiscount(result.value)            
            console.log("EXPECTED GOLD+ - " + expected.goldplus);
            console.log("ACTUAL GOLD+ - " + goldplus);
            browser.assert.deepEqual(expected.goldplus,goldplus,"GOLD PLUS - " + goldplus);
        });
    }

    this['verify DIAMOND discount on PP1 page. row:' + (ind+2)] = function(browser)
    {
        browser.getText("//div[@id='diamond']//div[@class='price_column_sku']/span[1]",(result) => {
            diamond = getDiscount(result.value)
            console.log("EXPECTED DIAMOND - " + expected.diamond);
            console.log("ACTUAL DIAMOND - " + diamond);
            browser.assert.deepEqual(expected.diamond,diamond,"DIAMOND - " + diamond);
        });
    }

    this['verify DIAMOND+ discount on PP1 page. row:' + (ind+2)] = function(browser)
    {
        browser.getText("//div[@id='diamondplus']//div[@class='price_column_sku']/span[1]",(result) => {
            diamondplus = getDiscount(result.value)
            console.log("EXPECTED DIAMOND+ - " + expected.diamondplus);
            console.log("ACTUAL DIAMOND PLUS - " + diamondplus);
            browser.assert.deepEqual(expected.diamondplus,diamondplus,"DIAMOND PLUS - " + diamondplus);
        });
    }

    this['verify PLATINUM+ discount on PP1 page. row:' + (ind+2)] = function(browser)
    {
        browser.getText("//div[@id='platinumplus']//div[@class='price_column_sku']/span[1]",(result) => {
            platinumplus = getDiscount(result.value)
            console.log("EXPECTED PLATINUM+ - " + expected.platinumplus);
            console.log("ACTUAL PLATINUM PLUS - " + platinumplus);
            browser.assert.deepEqual(expected.platinumplus,platinumplus,"PLATINUM - " + platinumplus);
        });
    }

    this['close browser. row: ' + (ind+2)] = function(browser)
    {
        browser.end();
    }
});


function getDiscount(fullStr)
{
    let perIndex = fullStr.indexOf("%");

    let capDiscount = 0;
    if(!isNaN(parseInt((fullStr.charAt(perIndex-2)))))
        capDiscount = fullStr.slice(perIndex-2,perIndex);
    else if(!isNaN(parseInt((fullStr.charAt(perIndex-1)))))
        capDiscount = fullStr.slice(perIndex-1,perIndex);

    return (capDiscount);
}
