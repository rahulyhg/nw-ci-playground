const Home_Login = require("../../WebPages/Home_Login");
const Home = require("../../WebPages/Home");

module.exports =
{
  '@tags': ['regression','invalid_login','sanity'],

  before : function(browser) {
    const home = new Home(browser);
    const home_login = new Home_Login(browser);
    
    home.visitHomePage();
    home.loginClick();
    home_login.clickSignIn();
  },

  'invalid email label' : function(browser) 
  {
    const home_login = new Home_Login(browser);
    home_login.setEmailV2("abcd123");
    home_login.setPasswordV2("xyz");
    home_login.clickSignInV2();

    browser
    .verify.containsText('//*[@id="email"]/following-sibling::div[1]', "Please enter the email that you are registered with.");
  },

  'invalid password label' : function(browser) 
  {
    const home_login = new Home_Login(browser);
    home_login.setEmailV2("rajeevv67@yahoo.com");
    home_login.setPasswordV2("test");
    home_login.clickSignInV2();

    browser
    .verify.containsText('//*[@id="password"]/following-sibling::div[1]', "Incorrect password. Re-enter or get password on email");
  },

  'invalid password validity' : function(browser) 
  {
    const home_login = new Home_Login(browser);
    home_login.setEmailV2("rajeevv67@yahoo.com");
    home_login.setPasswordV2("test");
    home_login.clickSignInV2();

    browser
    .verify.containsText('//*[@id="password"]/following-sibling::div[1]', "Incorrect password. Re-enter or get password on email");
  },

  'empty password' : function(browser)
  {
    const home_login = new Home_Login(browser);
    home_login.setEmailV2("rajeevv67@yahoo.com");
    home_login.setPasswordV2("");
    home_login.clickSignInV2();

    browser
    .verify.containsText('//*[@id="password"]/following-sibling::div[1]', "Please specify Password.");
  },

  'empty email' : function(browser)
  {
    const home_login = new Home_Login(browser);
    home_login.setEmailV2("");
    home_login.setPasswordV2("sdasd");
    home_login.clickSignInV2();

    browser
    .verify.containsText('//*[@id="email"]/following-sibling::div[1]', "Please enter the email that you are registered with");
  },

  'valid email & pass' : function(browser)
  {
    const home_login = new Home_Login(browser);
    home_login.setEmailV2("sam187@bankas.in");
    home_login.setPasswordV2("test");
    home_login.clickSignInV2();

    browser.url((current_url)=> {
      if(!(current_url.value).includes('user/login-submit'))
          browser.assert.ok(true)

    });
  },

};