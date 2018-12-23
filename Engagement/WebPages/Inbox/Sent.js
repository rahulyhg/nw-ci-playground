class Sent
{
  constructor(_browser)
  {
      this.browser = _browser;
  }

  selectFilter(item_to_check)
  {
    let selector = "";
    if(item_to_check == "All") selector = "//input[@id='custom-All']";
    else if (item_to_check == "Viewed by her") selector = "//input[@id='custom-Viewed by her']";
    else if (item_to_check == "Not Viewed by her") selector = "//input[@id='custom-Not Viewed by her']";
    else if (item_to_check == "Viewed by him") selector = "//input[@id='custom-Viewed by him']";
    else if (item_to_check == "Not Viewed by him") selector = "//input[@id='custom-Not Viewed by him']";

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
} //class

module.exports = Sent;
