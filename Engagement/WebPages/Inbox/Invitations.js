class Invitations
{
  constructor(_browser)
  {
    this.browser = _browser;
  }

  selectFilter(item_to_check)
  {
    let selector = "";
    if(item_to_check == "All") selector = "//input[@id='custom-All']";
    else if (item_to_check == "Premium Invitations") selector = "//input[@id='custom-Premium Invitations']";
    else if (item_to_check == "Matching Preferences") selector = "//input[@id='custom-Matching Preferences']";
    else if (item_to_check == "Expiring Soon") selector = "//input[@id='custom-Expiring Soon']";

    this.browser
    .waitForElementVisible(selector)
    .click(selector);

    this.browser
    .waitForElementNotPresent("//input[@id='custom-Premium Invitations' and @disabled]");
  }

  usePagination(navigator)
  {
    let selector = "";
    if(navigator == "Next") selector = "//button[contains(text(),'Next')]";
    if(navigator == "Prev") selector = "//button[contains(text()='Prev')]";

    this.browser
    .waitForElementVisible(selector)
    .click(selector);
  }

  clickTab(tab_value)
  {
    let selector = "";
    if(tab_value == "Pending Invitations") selector = "//li[contains(text(),'Pending Invitations')]";
    if(tab_value == "Filtered Out") selector = "//li[contains(text(),'Filtered Out')]";

    this.browser
    .waitForElementVisible(selector)
    .click(selector);
  }
};


module.exports = Invitations;