//var conf = require('../../nightwatch.conf.js');
module.exports = {
    'Shaadi.com' : function (browser) {    
        //browser.url("https://www.shaadi.com/registration/user/login")							                            //Invoking the browser
        browser.url("http://www.shaadi.com")
        browser.pause(2000)
        browser.useXpath()
        browser.click('/html/body/div[1]/div[1]/div/div[2]/div/div[1]/a')
        browser.pause(2000)
        browser.waitForElementVisible('//*[@id="login_page"]', 2000)
        browser.setValue('//*[@id="login_page"]', "vighneshwar.manjrekar@gmail.com")
        browser.waitForElementVisible('//*[@id="password_page"]', 2000)
        browser.setValue('//*[@id="password_page"]',"intel@i7")
        browser.click('//*[@id="frmlogin"]/div/div[3]/a')
        browser.pause(3000)
        browser.url("https://my.shaadi.com/stop-page/id-verification")
        browser.pause(4000)
        browser.click('//*[@id="root"]/div/div/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[1]/label[1]')
        browser.pause(4000)
        browser.click('//input[@type="text"]')
        browser.setValue('//input[@type="text"]', "123456789999")
        browser.click('//input[@value="Submit"]')
        browser.pause(3000)
  
  
        browser.end();
    }
  }	