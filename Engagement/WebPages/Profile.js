class Profile
{
  constructor(_browser)
  {
      this.browser = _browser;
  }

  clickConnectNow()
  {
    let connect_now_selector = "//div[@data-test-selector='profile_connect_status']//button[@title='Connect Now']";
    let write_msg_selector = "//button[@data-test-selector='profile_connect_status']//button[text()='Write Message']";

    this.browser
    .waitForElementVisible(connect_now_selector)
    .click(connect_now_selector)
    .waitForElementVisible(write_msg_selector);
  }

  clickNextProfile()
  {
    let next_selector = "//div[text()='Next']";

    this.browser
    .waitForElementVisible(next_selector)
    .click(next_selector);
  }

  clickPrevProfile()
  {
    let prev_selector = "//div[text()='Prev']";

    this.browser
    .waitForElementVisible(prev_selector)
    .click(prev_selector);
  }

  clickBackToTop()
  {
    let back2top_selector = "//button[text()='Back to Top']";

    this.browser
    .waitForElementVisible(back2top_selector)
    .click(back2top_selector);
  }

  clickNextPhoto()
  {
    let back2top_selector = "//button[@icon='next']";

    this.browser
    .waitForElementVisible(back2top_selector)
    .click(back2top_selector);
  }

  clickPrevPhoto()
  {
    let back2top_selector = "//button[@icon='prev']";

    this.browser
    .waitForElementVisible(back2top_selector)
    .click(back2top_selector);
  }

}

module.exports = Profile;
