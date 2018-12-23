class Advanced_Search {

    constructor(_browser)
    {
        this.browser = _browser;
    }

    setAge(param)
    {
        let age_from = param[0];
        let age_to = param[1];

        //Age
        let age_from_selector = '//*[@id="agefrom"]';
        let age_to_selector = '//*[@id="ageto"]';

        //click age from.
        this.browser
        .waitForElementVisible(age_from_selector)
        .click(age_from_selector)
        .click('//select[@id="agefrom"]//option[text()="'+ age_from +'"]');

        //click age to
        this.browser
        .waitForElementVisible(age_to_selector)
        .click(age_to_selector)
        .click('//select[@id="ageto"]//option[text()="'+ age_to +'"]');
    }

    setCase(case_value)
    {
        if(case_value == undefined)
        throw new Error ("special case cannnot be undefined");
    
        this.commanDropDownSelect("special_case",case_value);
    }

    setChildrenDetails(has_children)
    {
        let selector = "";
        has_children =  has_children.toLowerCase();

        let no_children_selector = '//*[@id="children-No"]';
        let does_not_matter_selector = '//*[@id="children-"]';
        let not_staying_selector = '//*[@id="children-NoYesNotlivingtogether"]';

        if(has_children == "no") selector = no_children_selector;
        else if(has_children == "doesn't matter") selector = does_not_matter_selector;
        else if(has_children == "ok, if not staying together") selector = not_staying_selector;
        else throw new Error("Incorrect has children . Allowed : no | Doesn't Matter | Ok, if not staying together");

        this.browser
        .waitForElementVisible(selector)
        .click(selector)
    }

    isManglik(manglik_option)
    {
        let selector = "";
        manglik_option =  manglik_option.toLowerCase();

        let yes_selector = '#manglikarray-Yes';
        let no_selector = '#manglikarray-No';
        let does_not_matter_selector = '#manglikarray-';

        if(manglik_option == "no mangliks") selector = no_selector;
        else if(manglik_option == "only mangliks") selector = yes_selector;
        else if(manglik_option == "doesn't matter") selector = does_not_matter_selector;
        else throw new Error("Incorrect manglik . Allowed : no mangliks | only mangliks | doesn't matter");

        this.browser
        .pause(500)
        .useCss()
        .click(selector)
        .useXpath();
    }

    setDiet(diet_value)
    {
        if(diet_value == undefined)
            throw new Error ("Diet cannnot be undefined");
        
        this.setLifeStyle("diet",diet_value);
    }

    setSmoke(smoke_value)
    {
        if(smoke_value == undefined)
            throw new Error ("smoke cannnot be undefined");
        
        this.setLifeStyle("smoke",smoke_value);
    }

    setDrink(drink_value)
    {
        if(drink_value == undefined)
            throw new Error ("drink cannnot be undefined");
        
        this.setLifeStyle("drink",drink_value);
    }

    setBodyType(body_type_value)
    {
        if(body_type_value == undefined)
            throw new Error ("body type cannnot be undefined");
        
        this.setLifeStyle("body_type",body_type_value);
    }

    setSkinTone(skin_tone_value)
    {
        if(skin_tone_value == undefined)
            throw new Error ("skin tone cannnot be undefined");
        
        this.setLifeStyle("skin_tone",skin_tone_value);
    }

    setLifeStyle(life_style_type , life_style_data)
    {
        life_style_type = life_style_type.toLowerCase();
        life_style_data = life_style_data.toLowerCase();

        this.browser
        .useCss()
        .getAttribute("#habit_details > span:nth-child(1)", "class", function(result) {
          
            if(result.value == "src_expand")
            {
                this
                .pause(500)
                .click('#habit_details')
                .pause(2000);
            }
        });

        let selector = "";

        if(life_style_type == "diet")
        {
            if(life_style_data == "doesn't matter") selector = "#dietarray-";
            else if(life_style_data == "veg") selector = "#dietarray-Veg";
            else if(life_style_data == "non-veg") selector = "#dietarray-OccasionallyNon-VegNon-Veg";
            else if(life_style_data == "jain") selector = "#dietarray-Jain";
            else if(life_style_data == "vegan") selector = "#dietarray-Vegan";
        }
        else if(life_style_type == "smoke")
        {
            if(life_style_data == "doesn't matter") selector = "#smokearray-";
            else if(life_style_data == "don't include profiles who smoke") selector = "#smokearray-No";
        }
        else if(life_style_type == "drink")
        {
            if(life_style_data == "doesn't matter") selector = "#drinkarray-";
            else if(life_style_data == "never drinks") selector = "#drinkarray-No";
            else if(life_style_data == "drinks occasionally") selector = "#drinkarray-NoOccasionally";
        }
        else if(life_style_type == "body_type")
        {
            if(life_style_data == "doesn't matter") selector = "#bodytypearray-";
            else if(life_style_data == "slim") selector = "#bodytypearray-Slim";
            else if(life_style_data == "Average/Athletic") selector = "#bodytypearray-AverageAthletic";
            else if(life_style_data == "heavy") selector = "#bodytypearray-Heavy";
        }
        else if(life_style_type == "skin_tone")
        {
            if(life_style_data == "doesn't matter") selector = "#complexionarray-";
            else if(life_style_data == "fair") selector = "#complexionarray-VeryFairFair";
            else if(life_style_data == "wheatish") selector = "#complexionarray-WheatishWheatishMediumWheatishBrown";
            else if(life_style_data == "dark") selector = "#complexionarray-Dark";
        }

        this.browser
        .waitForElementVisible(selector)
        .click(selector)
        .useXpath();
    }

    setKeywordSearch(keyword)
    {
        this.browser
        .useCss()
        .getAttribute("#habit_details+div+div > span:nth-child(1)", "class", (result) =>
        {
            if(result.value == "src_expand")
            {
                this.browser
                .waitForElementVisible('#habit_details+div+div')
                .click('#habit_details+div+div')
            }
        });

        this.browser
        .waitForElementVisible('.forminput')
        .setValue('.forminput', keyword)

        this.browser.useXpath();
    }

    setPhotoSetting(setting)
    {
        let selector = "";
        setting = setting.toLowerCase();

        //photo
        let visible_selector = "#photograph-Visible";
        let protected_selector = "#photograph-Protected";

        if(setting == "visible to all") selector = visible_selector;
        else if(setting == "protected photo") selector = protected_selector;

        this.browser
        .useCss()
        .waitForElementPresent(selector)
        .click(selector);

        this.browser.useXpath();
    }

    setProfileCreatedBy(creator)
    {
        let selector = "";
        creator = creator.toLowerCase();

                    
        //Profile created by
        let does_not_matter_selector = "#postedbyarray-";
        let self_selector = "#postedbyarray-Self";
        let parent_selector = "#postedbyarray-ParentGuardian";
        let friend_selector = "#postedbyarray-SiblingFriendOther";

        if(creator == "doesn't matter") selector = does_not_matter_selector;
        else if(creator == "self") selector = self_selector;
        else if(creator == "parent / guardian") selector = parent_selector;
        else if(creator == "sibling / friend / others") selector = friend_selector;
        
        this.browser
        .useCss()
        .waitForElementVisible(selector)
        .click(selector)
        .pause(1000);

        this.browser.useXpath();
    }

    hasHoroscope(astro_value)
    {
        let selector = "";
        astro_value = astro_value.toLowerCase();

        let does_not_matter_selector = "#astroprofile-";
        let yes_selector = "#astroprofile-Yes";

        if(astro_value == "doesn't matter") selector = does_not_matter_selector;
        else if(astro_value == "yes") selector = yes_selector;
        
        this.browser
        .useCss()
        .waitForElementVisible(selector)
        .click(selector)

        this.browser.useXpath();
    }

    selectDoNotShow(show_value)
    {
        let selector = "";
        show_value = show_value.toLowerCase();

        let filter_selector = "#filtered";
        let viewed_selector = "#viewedprofile";

        if(show_value == "profiles that i have filtered me out") selector = filter_selector;
        else if(show_value == "profiles that i have already viewed") selector = viewed_selector;
        
        this.browser
        .useCss()
        .waitForElementVisible(selector)
        .click(selector);

        this.browser.useXpath();
    }

    clickSubmit()
    {
        let selector = ".search_btn";
        
        this.browser
        .useCss()
        .click(selector)

        this.browser.useXpath();
    }


    setHeight(param)
    {
        let height_from_selector = '//*[@id="heightfrom"]';
        let height_to_selector = '//*[@id="heightto"]';

        let height_from = param[0];
        let height_to = param[1];

        this.browser
        .waitForElementVisible(height_from_selector)
        .click(height_from_selector);
        this.browser.click('//select[@id="heightfrom"]//option[text()="'+ height_from +'"]');
        
        
        this.browser
        .waitForElementVisible(height_to_selector)
        .click(height_to_selector)
        this.browser.click('//select[@id="heightto"]//option[text()="'+ height_to +'"]');
    }

    setMarital(marital_value)
    {
        if(marital_value == undefined)
            throw new Error ("marital cannnot be undefined");
        
        this.commanDropDownSelect("marital",marital_value);
    }

    setReligion(religion_value)
    {
        if(religion_value == undefined)
            throw new Error ("religion cannnot be undefined");
        
        this.commanDropDownSelect("religion",religion_value);
    }

    setMotherTongue(mt_value)
    {
        if(mt_value == undefined)
            throw new Error ("mother tongue cannnot be undefined");
        
        this.commanDropDownSelect("mother_tongue",mt_value);
    }

    setCommunity(comm_value)
    {
        if(comm_value == undefined)
            throw new Error ("community cannnot be undefined");
        
        this.commanDropDownSelect("community",comm_value);
    }

    setCountryLive(count_live_value)
    {
        if(count_live_value == undefined)
            throw new Error ("country live cannnot be undefined");
        
        this.commanDropDownSelect("country_live",count_live_value);
    }

    setState(state_value)
    {
        if(state_value == undefined)
            throw new Error ("state cannnot be undefined");
        
        this.commanDropDownSelect("state",state_value);
    }

    setCity(city_value)
    {
        if(city_value == undefined)
            throw new Error ("state cannnot be undefined");
        
        this.commanDropDownSelect("city",city_value);
    }

    setResidency(residency_value)
    {
        if(residency_value == undefined)
            throw new Error ("residency cannnot be undefined");
        
        this.commanDropDownSelect("residency",residency_value);
    }

    setCountryGrew(country_grew_value)
    {
        if(country_grew_value == undefined)
            throw new Error ("country grew cannnot be undefined");
        
        this.commanDropDownSelect("country_grew",country_grew_value);
    }

    setEducation(education_value)
    {
        if(education_value == undefined)
            throw new Error ("education grew cannnot be undefined");
        
        this.commanDropDownSelect("education",education_value);
    }

    setEducationArea(education_area_value)
    {
        if(education_area_value == undefined)
            throw new Error ("education area grew cannnot be undefined");
        
        this.commanDropDownSelect("education_area",education_area_value);
    }

    setWorking(working_value)
    {
        if(working_value == undefined)
            throw new Error ("working grew cannnot be undefined");
        
        this.commanDropDownSelect("working",working_value);
    }

    setProfession(profession_value)
    {
        if(profession_value == undefined)
            throw new Error ("profession cannnot be undefined");
        
        this.commanDropDownSelect("profession",profession_value);
    }

    commanDropDownSelect (dd_type, dd_test_data)
    {
        let dropdown_type = ["marital","religion","mother_tongue","community","country_live","state",
                            "city","residency","country_grew","education","education_area", "working","profession","special_case"];

                            console.log(dd_test_data)
        if(dd_type == undefined)
        {
            throw new Error("drop down type is not provided");
        }
        else if(!dropdown_type.includes(dd_type))
        {
            throw new Error("drop down -"+ dd_type +"- is not correct. Expected - " + dropdown_type);
        }

        //get selectors for the dropdown
        let {top_div , value_div} = this.getDropDowndivSelectors (dd_type);
        let isEmpty_Option = false;

        //check if dropdown is empty
        this.browser
        .useCss()
        .elements('css selector', `#${top_div} > span`,(item) => {

            this.browser.elementIdText(item.value[0].ELEMENT, (res) =>{
                    if(res.value == "Doesn't Matter")
                        isEmpty_Option = true;
                });
        });

        //If dropdown is not empty, make it empty
        if(!isEmpty_Option)
        {
            this.browser.elements('css selector', `#${top_div} > span`,(item) => {
                
                this.browser.click(`#${top_div}`);
                for(let i=0;i < item.value.length;i++){
                    this.browser
                    .elementIdClick(item.value[i].ELEMENT);
                }

                //close drop down box
                this.browser
                .waitForElementVisible(`#${top_div}`)
                .moveToElement(`#${top_div}`, 500, 10)
                .mouseButtonDown(0);
            });
        }

        //click on drop down box to open it again.
        this.browser.click(`#${top_div}`);
        
        //click on drop down options
        for(const item of dd_test_data)
        {
            this.browser
            .waitForElementVisible(`#${value_div} > ul > li[rel="${item}"]`)
            .click(`#${value_div} > ul > li[rel="${item}"]`);
        }

       
        //close drop down box
        this.browser
        .waitForElementVisible(`#${top_div}`)
        .moveToElement(`#${top_div}`, 500, 10)
        .mouseButtonDown(0);
        
        this.browser.useXpath();
    }

    
    getDropDowndivSelectors(dd_type)
    {
        let top_div, value_div;
        if(dd_type == "marital")
        {
            top_div = "ddSelOptHolder_maritalstatus";
            value_div = "ddOptionHolder_maritalstatus";

        }
        else if(dd_type == "religion")
        {
            top_div = "ddSelOptHolder_community";
            value_div = "ddOptionHolder_community";
        }
        else if(dd_type == "mother_tongue")
        {
            top_div = "ddSelOptHolder_mothertongue";
            value_div= "ddOptionHolder_mothertongue";
        }
        else if(dd_type == "community")
        {
            top_div = "ddSelOptHolder_caste";
            value_div= "ddOptionHolder_caste";
        }
        else if(dd_type == "country_live")
        {
            top_div = "ddSelOptHolder_countryofresidence";
            value_div = "ddOptionHolder_countryofresidence";
        }
        else if(dd_type == "state")
        {
            top_div = "ddSelOptHolder_stateofresidence";
            value_div = "ddOptionHolder_stateofresidence";
        }
        else if(dd_type == "city")
        {
            top_div = "ddSelOptHolder_nearest_city";
            value_div = "ddOptionHolder_nearest_city";
        }
        else if(dd_type == "residency")
        {
            top_div = "ddSelOptHolder_residencystatus";
            value_div = "ddOptionHolder_residencystatus";
        }
        else if(dd_type == "country_grew")
        {
            top_div = "ddSelOptHolder_grew_up_in";
            value_div = "ddOptionHolder_grew_up_in";
        }
        else if(dd_type == "education")
        {
            top_div = "ddSelOptHolder_education";
            value_div = "ddOptionHolder_education";
        }
        else if(dd_type == "education_area")
        {
            top_div = "ddSelOptHolder_education_area";
            value_div = "ddOptionHolder_education_area";
        }
        else if(dd_type == "working")
        {
            top_div = "ddSelOptHolder_working_with";
            value_div = "ddOptionHolder_working_with";
        }
        else if(dd_type == "profession")
        {
            top_div = "ddSelOptHolder_occupation_area";
            value_div = "ddOptionHolder_occupation_area";
        }

        else if(dd_type == "special_case")
        {
            top_div = "ddSelOptHolder_specialcases";
            value_div = "ddOptionHolder_specialcases";
        }

        let result = {
            "top_div" : top_div,
            "value_div" : value_div
        }
        return result;
    }

    selectLookingFor(gender_type)
    {
        let looking_for_types = ["bride","groom"];

        let selector = "";
        gender_type = gender_type.toLowerCase();

        if(!looking_for_types.includes(gender_type))
            throw new Error("Incorrect gender type :" + gender_type+". Allowed :" + looking_for_types);

        //Looking For
        let looking_for_male_selector = '//*[@id="gender-Male"]';
        let looking_for_female_selector = '//*[@id="gender-Female"]';
        
        if(gender_type == "groom") selector = looking_for_male_selector;
        else if(gender_type == "bride") selector = looking_for_female_selector;

        this.browser.click(selector)
    }

    verifyChildrenForDivorced(param)
    {
        let doesnt_matter = param[0], no = param[1] , ok = param[2];

        this.browser
        .pause(2000)
        .verify.containsText('//*[@for="children-No"]',no)
        .verify.containsText('//*[@for="children-"]',doesnt_matter)
        .verify.containsText('//*[@for="children-NoYesNotlivingtogether"]',ok);
    }

}//class

module.exports = Advanced_Search;