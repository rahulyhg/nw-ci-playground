class Requests
{
  constructor(_browser)
  {
      this.browser = _browser;
  }

  selectFilter(item_to_check)
  {
    let selector = "";
    if(item_to_check == "All") selector = "//input[@id='custom-All']";
    else if (item_to_check == "Photo Requests") selector = "//input[@id='custom-Photo Requests']";
    else if (item_to_check == "Phone Requests") selector = "//input[@id='custom-Phone Requests']";

    this.browser
    .waitForElementVisible(selector)
    .click(selector);

    this.browser
    .waitForElementNotPresent("//input[@id='custom-All' and @disabled]");
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
    if(tab_value == "Pending Requests") selector = "//li[contains(text(),'Pending Requests')]";
    if(tab_value == "Accepted Requests") selector = "//li[contains(text(),'Accepted Requests')]";
    if(tab_value == "Sent Requests") selector = "//li[contains(text(),'Sent Requests')]";

    this.browser
    .waitForElementVisible(selector)
    .click(selector);
  }
}
module.exports = Requests;
