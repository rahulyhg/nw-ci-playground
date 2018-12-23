const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');
const iedriver = require("iedriver");
const seleniumServer = require("selenium-server");
const reporter = require('./Shared_Items/Utilities/Report_Converter.js');

let testDriver = "";
if((process.argv).includes("--env=firefox")) testDriver = 'firefox';
if((process.argv).includes("--env=chrome")) testDriver = 'chrome';
if((process.argv).includes("--env=ie")) testDriver = 'ie';

module.exports = {

  throwOnMultipleElementsReturned : false,
  waitForConditionTimeout : 7000,

  before : async function(done) {
    await reporter.deleteOldXML();
    if(testDriver == 'firefox') geckodriver.start();
    if(testDriver == 'chrome') chromedriver.start();
    if(testDriver == 'ie') iedriver.start();
    done();
  },

  after : async function(done) {
    
    
    if(testDriver == 'firefox') geckodriver.stop();
    if(testDriver == 'chrome') chromedriver.stop();
    if(testDriver == 'ie') iedriver.stop();

    //chromedriver.stop();
    done();

    await reporter.convertHMTL();
  },

  beforeEach : function(browser,done) {
    browser.windowMaximize();
    done();
  },

  afterEach : function(browser,done) {
    browser
      .pause(2000)
      .end();

    done();
  }
};