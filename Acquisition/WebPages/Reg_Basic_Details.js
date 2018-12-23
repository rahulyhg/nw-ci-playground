class Reg_Basic_Details 
{
    constructor(_browser)
    {
        this.browser = _browser;
    }

    setEmailid(email_value, addTimeStamp = false)
    {
      let email_selector = Reg_Basic_Details.selector_email_textbox_xpath;

      //Time stamp logic by Shwetha
      if(addTimeStamp)
      {
        let min = Math.ceil(1);
        let max = Math.floor(10000);
        let rnd = Math.floor(Math.random() * (max - min)) + min;
        email_value = "test_" +  rnd + email_value;
      }
        
      this.browser
      .waitForElementVisible(email_selector, ()=> {
        console.log(email_value);
      })
      .clearValue(email_selector)
      .setValue(email_selector, email_value);
    }

    setPassword(password_value)
    {
      let password_selector = '//*[@id="layer_password1"]';

      this.browser
      .waitForElementVisible(password_selector)
      .clearValue(password_selector)
      .setValue(password_selector, password_value);
    }

    setCreatedFor(person_by, gender = "")
    {
      let dd_arrow_selector = "//div[@id='s2id_layer_postedby']";
      
      this.browser
      .waitForElementVisible(dd_arrow_selector)
      .click(dd_arrow_selector);

      //select others
      if(person_by == "Friend" || person_by == "Relative")
      {
        let profile_dropdown_value = "//div[@id='select2-drop']//div[text()='------------Show More------------']";

        this.browser
          .waitForElementPresent(profile_dropdown_value)
          .click(profile_dropdown_value)
      }

      let profile_dropdown_value = "//div[@id='select2-drop']//div[text()='" + person_by + "']";

      this.browser
      .waitForElementPresent(profile_dropdown_value)
      .click(profile_dropdown_value)

      if(gender != "")
      {
        let gender_selector = "";
        if(gender == "Male") gender_selector = '//div[@id="layer_gender"]//label[@for="layer_gender-Male"]';
        if(gender == "Female") gender_selector = '//div[@id="layer_gender"]//label[@for="layer_gender-Female"]';

        this.browser
          .waitForElementVisible(gender_selector)
          .click(gender_selector)
          .click(gender_selector);
      }
      
    }

    clickNext()
    {
      let next_button = '//a[@id="btnSubmit"]';
      this.browser.click(next_button);
    }

    setFullName(first_name, last_name)
    {
      let first_name_selector ='//*[@id="layer_first_name"]';
      let last_name_selector ='//*[@id="layer_last_name"]';

      this.browser
      .waitForElementVisible(first_name_selector)
      .setValue(first_name_selector, first_name)
      .setValue(last_name_selector, last_name);
    }

    setDateOfBirth(day, month, year)
    {

        if(this.browser.options.desiredCapabilities.browserName == "firefox")
        {
          this.setDateOfBirth_FF(day,month,year);
        }
        else
        {
          let day_selector = '//select[@id="layer_day"]';

          let day_option = '//option[@value="'+ day +'"]';
          let month_option = '//option[@label="'+ month +'"]';
          let year_option = '//option[@value="'+ year +'"]';

          this.browser
          .waitForElementVisible(day_selector)
          .click(day_option)
          .click(month_option)
          .click(year_option);
        }
    }

    setDateOfBirth_FF(_day, _month, _year)
    {
      let dd_day_selector = "//div[@id='s2id_layer_day']";
      let dd_month_selector = "//div[@id='s2id_layer_month']";
      let dd_year_selector = "//div[@id='s2id_layer_year']";

      let day_dropdown_value = "//div[@id='select2-drop']//div[text()='" + _day + "']";
      let month_dropdown_value = "//div[@id='select2-drop']//div[text()='" + _month + "']";
      let year_dropdown_value = "//div[@id='select2-drop']//div[text()='" + _year + "']";

      //DAY
      this.browser
      .waitForElementPresent(dd_day_selector)
      .click(dd_day_selector);

      this.browser
      .waitForElementPresent(day_dropdown_value)
      .click(day_dropdown_value);

      //MONTH
     /* this.browser
      .waitForElementPresent(dd_month_selector)
      .click(dd_month_selector);*/

      this.browser
      .waitForElementPresent(month_dropdown_value)
      .click(month_dropdown_value);

      //YEAR
     /* this.browser
      .waitForElementPresent(dd_year_selector)
      .click(dd_year_selector);*/

      this.browser
      .waitForElementPresent(year_dropdown_value)
      .click(year_dropdown_value);
    }

    setReligion(religion_value)
    {
      //selector by Shwetha
      let religion_dropdown_arrow = '//div[@id="s2id_layer_community"]';

      this.browser
      .waitForElementVisible(religion_dropdown_arrow)
      .click(religion_dropdown_arrow)
      //.click('//option[@value="'+ religion_value +'"]')
      .click("//div[contains(@class, 'select2-result-label') and text()='" + religion_value + "']")
      //.keys('\uE007'); //press enter
    }

    setMotherTongue(tongue_value)
    {
      //selector by Shwetha
      let tongue_dropdown_arrow = '//div[@id="s2id_layer_mother_tongue"]';

      this.browser
      .waitForElementVisible(tongue_dropdown_arrow)
      .click(tongue_dropdown_arrow)
      //.click('//option[@value="'+ tongue_value +'"]')
      .click("//div[contains(@class, 'select2-result-label') and text()='" + tongue_value + "']")
      //.keys('\uE007'); //press enter
    }

    setCountry(country_value)
    {
      let country_dropdown_arrow = '//*[@id="s2id_layer_countryofresidence"]';
  
      this.browser
      .waitForElementVisible(country_dropdown_arrow)
      .click(country_dropdown_arrow)
      .click("//div[contains(@class, 'select2-result-label') and text()='" + country_value + "']")
      //.click('//option[@value="'+ country_value +'"]');
    }

    clickSignUp()
    {
      let signUp_selector = '//*[@data-test-id="reg_12_signup"]';
      
      this.browser
      .click(signUp_selector);
    }


    verifyEmailPassProfile(param)
    {
      let {email_error, password_error, postedBy_error} = param;

      let get_started_selector = '//a[@id="btnSubmit"]';
      let email_selector = '//*[@id="err_text_email"]';
      let password_selector = '//*[@id="err_text_password1"]';
      let postby_selector = '//*[@id="err_text_postedby"]';

      this.browser
      .click(get_started_selector, ()=>
      {
          this.browser
            .verify.containsText(email_selector, email_error)
            .verify.containsText(password_selector, password_error)
            .verify.containsText(postby_selector, postedBy_error)
      })
    }
}//class

Reg_Basic_Details.selector_email_textbox_xpath = '//*[@id="layer_email"]';
Reg_Basic_Details.selector_password_textbox_xpath = '//*[@id="layer_password1"]';

 module.exports = Reg_Basic_Details;