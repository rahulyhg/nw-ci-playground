let {test_url, AB} = require("../../shaadi.conf");
class Engagement_Refine_Search {

    constructor(_browser)
    {
        this.browser = _browser;
        this.SITE_URL = "https://www.shaadi.com";
        this.MY_SHAADI_URL = test_url;
    }

    clickRadioButton(selector)
    {
        this.browser
        .waitForElementVisible(selector)
        .click(selector);

        let selector1 = "//span[text()='Loading...']";
        this.browser
        .waitForElementNotVisible(selector1);
    }

    setRecentlyViewed(recent_view_label)
    {
        if(recent_view_label == undefined)
            throw new Error ("Recently viewed cannnot be undefined");

        let selector = "";
        recent_view_label = recent_view_label.toLowerCase();

        if(recent_view_label == "unviewed matches") selector = "//input[@id='recentlyViewed-Unviewed Matches']";
        else if (recent_view_label == "viewed matches") selector = "//input[@id='recentlyViewed-Viewed Matches']";

        this.clickRadioButton(selector);
    }

    setMatches(matches_label)
    {
        if(matches_label == undefined)
            throw new Error ("matches cannnot be undefined");

        let selector = "";
        matches_label = matches_label.toLowerCase();

        if(matches_label == "all") selector = "//input[@id='matches-All']";
        else if (matches_label == "2-way matches") selector = "//input[@id='matches-2-way Matches']";

        this.clickRadioButton(selector);
    }

    setPhotoSetting(photo_settings_labels)
    {
        if(photo_settings_labels == undefined)
            throw new Error ("photo settings cannnot be undefined");
                   
        
            let selector =  "";
            let item  = photo_settings_labels.toLowerCase();

            if(item == "all") selector = "//input[@id='photostatus-All']";
            else if(item == "visible to all") selector = "//input[@id='photostatus-visible']";
            else if(item == 'protected photo') selector = "//input[@id='photostatus-protected']";

             this.clickCheckButton(selector);
        
        
    }

    clickCheckButton(selector1)
    {
        this.browser
        .waitForElementVisible(selector1)
        .click(selector1);

        let selector2 = "//span[text()='Loading...']";
        this.browser
        .waitForElementNotVisible(selector2);
    }

    setRecentlyJoined(recent_join_label)
    {
        if(recent_join_label == undefined)
        throw new Error ("Recently viewed cannnot be undefined");

        let selector = "";
        recent_join_label = recent_join_label.toLowerCase();

        if(recent_join_label == "all") selector = "//input[@id='recently_joined-All']";
        else if (recent_join_label == "within a day") selector = "//input[@id='recently_joined-1 Day']";
        else if (recent_join_label == "within a week") selector = "//input[@id='recently_joined-1 Month']";
        else if (recent_join_label == "within a month") selector = "//input[@id='recently_joined-1 Week']";

        this.clickRadioButton(selector);
    }

    setActiveMembers(active_members_label)
    {
        if(active_members_label == undefined)
        throw new Error ("Recently viewed cannnot be undefined");

        let selector = "";
        active_members_label = active_members_label.toLowerCase();

        if(active_members_label == "all") selector = "//input[@id='search_v3_relevance-All']";
        else if (active_members_label == "within a day") selector = "//input[@id='search_v3_relevance-1 Day']";
        else if (active_members_label == "within a week") selector = "//input[@id='search_v3_relevance-1 Week']";
        else if (active_members_label == "within a month") selector = "//input[@id='search_v3_relevance-1 Month']";

        this.clickRadioButton(selector);
    }

    setAnnualIncome(income_labels)
    {
        if(income_labels == undefined)
            throw new Error ("income cannnot be undefined");
                   
            income_labels.forEach(item => {
                let selector =  `//input[@id='annualincome-${item}']`;
                
                /*
                item  = item.toLowerCase();

                if(item == "all") selector = "//input[@id='annualincome-All']";
                else if(item == "inr 2 lakh to 4 lakh") selector = "//input[@id='annualincome-INR 2 Lakh to 4 Lakh']";
                else if(item == "upto inr 1 lakh") selector = "//input[@id='annualincome-Upto INR 1 Lakh']";
                else if(item == "inr 4 lakh to 7 lakh") selector = "//input[@id='annualincome-INR 4 Lakh to 7 Lakh']";
                else if(item == "inr 1 lakh to 2 lakh") selector = "//input[@id='annualincome-INR 1 Lakh to 2 Lakh']";
                else if(item == "inr 7 lakh to 10 lakh") selector = "//input[@id='annualincome-INR 7 Lakh to 10 Lakh']";
                else if(item == "inr 10 lakh to 15 lakh") selector = "//input[@id='annualincome-INR 10 Lakh to 15 Lakh']";
                else if(item == "dont want to specify") selector = "//input[@id='annualincome-Dont want to specify']";
                else if(item == "inr 15 lakh to 20 lakh") selector = "//input[@id='annualincome-INR 15 Lakh to 20 Lakh']";
                */
                
                this.clickCheckButton(selector);
        });
    }

    setMaritalStatus(martial_label)
    {
        if(martial_label == undefined)
            throw new Error ("martial status  cannnot be undefined");
                   
        martial_label.forEach(item => {
                let selector =  `//input[@id='maritalstatus-${item}']`;
                this.clickCheckButton(selector);
        });
    }

    setReligion(religion_label)
    {
        if(religion_label == undefined)
            throw new Error ("Religion cannnot be undefined");
               
        religion_label.forEach(item => {
            let selector =  `//input[@id='religion-${item}']`;
            this.clickCheckButton(selector);
        });
    }

    setCommunity(community_label)
    {
        if(community_label == undefined)
            throw new Error ("community cannnot be undefined");
               
            community_label.forEach(item => {
            let selector =  `//input[@id='caste-${item}']`;
            this.clickCheckButton(selector);
        });
    }

    setMotherTongue(mtongue_label)
    {
        if(mtongue_label == undefined)
            throw new Error ("Mother tongue cannnot be undefined");
           
            mtongue_label.forEach(item => {
            let selector =  `//input[@id='mothertongue-${item}']`;
            this.clickCheckButton(selector);
        });
    }

    setManglik(manglik_label)
    {
        if(manglik_label == undefined)
            throw new Error ("Manglik cannnot be undefined");
           
            manglik_label.forEach(item => {
            let selector =  `//input[@id='manglik-${item}']`;
            this.clickCheckButton(selector);
        });
    }

    setCountryLivingIn(countryLiving_label)
    {
        if(countryLiving_label == undefined)
            throw new Error ("Country living cannnot be undefined");
       
        countryLiving_label.forEach(item => {
            let selector =  `//input[@id='countryofresidence-${item}']`;
            this.clickCheckButton(selector);
        });
    }

    setStateLivingIn(stateLiving_label)
    {
        if(stateLiving_label == undefined)
            throw new Error ("state living cannnot be undefined");
       
        stateLiving_label.forEach(item => {
            let selector =  `//input[@id='stateofresidence-${item}']`;
            this.clickCheckButton(selector);
        });
    }

    setCountryGrewUpIn(countryGrew_label)
    {
        if(countryGrew_label == undefined)
            throw new Error ("Country grew cannnot be undefined");
       
        countryGrew_label.forEach(item => {
            let selector =  `//input[@id='grew_up_in-${item}']`;
            this.clickCheckButton(selector);
        });
    }

    setEducation(education_label)
    {
        if(education_label == undefined)
            throw new Error ("education cannnot be undefined");
   
        education_label.forEach(item => {
            let selector =  `//input[@id='education-${item}']`;
            this.clickCheckButton(selector);
        });
    }

    setWorkingWith(workingwith_label)
    {
        if(workingwith_label == undefined)
            throw new Error ("working with cannnot be undefined");

            workingwith_label.forEach(item => {
            let selector =  `//input[@id='working_with-${item}']`;
            this.clickCheckButton(selector);
        });
    }

    setProfessionalArea(ProfessionalArea_label)
    {
        if(ProfessionalArea_label == undefined)
            throw new Error ("Professional Area cannnot be undefined");

            ProfessionalArea_label.forEach(item => {
            let selector =  `//input[@id='occupation_area-${item}']`;
            this.clickCheckButton(selector);
        });
    }

    setProfileCreatedBy(ProfileCreatedBy_label)
    {
        if(ProfileCreatedBy_label == undefined)
            throw new Error ("Profile created by cannnot be undefined");

        ProfileCreatedBy_label.forEach(item => {
            let selector =  `//input[@id='relationship-${item}']`;
            this.clickCheckButton(selector);
        });
    }

    setSmoking(smoking_label)
    {
        if(smoking_label == undefined)
            throw new Error ("matches cannnot be undefined");

        let selector = "";
        smoking_label = smoking_label.toLowerCase();

        if(smoking_label == "all") selector = "//input[@id='smoke-All']";
        else if (smoking_label == "non smokers") selector = "//input[@id='smoke-Non Smokers']";

        this.clickRadioButton(selector);
    }

    setDrinking(drinking_label)
    {
        if(drinking_label == undefined)
            throw new Error ("drinking cannnot be undefined");

            drinking_label.forEach(item => {
            let selector =  `//input[@id='drink-${item}']`;
            this.clickCheckButton(selector);
        });
    }

    setEatingHabits(EatingHabits_label)
    {
        if(EatingHabits_label == undefined)
            throw new Error ("education cannnot be undefined");

            EatingHabits_label.forEach(item => {
            let selector =  `//input[@id='diet-${item}']`;
            this.clickCheckButton(selector);
        });
    }
} //class

module.exports = Engagement_Refine_Search;