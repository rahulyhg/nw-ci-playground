class My_Matches
{
  constructor(_browser)
  {
      this.browser = _browser;
  }

  selectSortOrder(sort_value)
  {
    let sort_box_xpath = "//p[contains(text(),'Sorry, no new Matches that meet your Partner Prefe')]/following-sibling::div[1]/div/div[1]/div[2]";
    let sort_button_xpath = sort_box_xpath;

    if (sort_value == "Default Order") sort_button_xpath += "//button[1]";
    else if (sort_value == "Newest First") sort_button_xpath += "//button[2]";
    else if (sort_value == "Last Logged In") sort_button_xpath += "//button[3]";

    
    let selector2 = "//span[text()='Loading...']";
    this.browser
    .waitForElementNotVisible(selector2,12000);

    this.browser
    .waitForElementVisible(sort_box_xpath)
    .click(sort_box_xpath)
    .waitForElementVisible(sort_button_xpath)
    .click(sort_button_xpath);
  }

  togglePrefMatches()
  {
    let toggle_selector = ".matchesTourWrap label";
    
    this.browser
    .useCss()
    .waitForElementVisible(toggle_selector)
    .click(toggle_selector)
    .useXpath();

    let selector2 = "//span[text()='Loading...']";
    this.browser
    .waitForElementNotVisible(selector2,12000);
  }

  usePagination(navigator)
  {
    let selector = "";
    if(navigator == "Next") selector = "//button[contains(text(),'Next')]";
    if(navigator == "Prev") selector = "//button[contains(text()='Prev')]";

    this.browser
    .waitForElementVisible(selector)
    .click(selector);

    let selector2 = "//span[text()='Loading...']";
    this.browser
    .waitForElementNotVisible(selector2,12000);
  }

  selectDropDown(dd_value)
  {
    let dropdown_selector = "div[type='list']:not([src]) + div > div > div > div  + div > button";

    this.browser
    .useCss()
    .waitForElementVisible(selector)
    .click(selector)
    


    
  }
}

module.exports = My_Matches;
