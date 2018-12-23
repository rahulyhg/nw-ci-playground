let {test_url, AB} = require("../../shaadi.conf");
class Engagement_Menu {

    constructor(_browser)
    {
        this.browser = _browser;
        this.SITE_URL = "https://www.shaadi.com";  //ZEND
        this.MY_SHAADI_URL = test_url;  //REACT
    }

    visitMenuByURL(top_nav, sub_nav){

        let top_menu_item = ["my shaadi","matches","search","inbox"];
        let sub_menu_item = ["dashboard","my profile","add photos","partner preferences","new matches","today matches",
                            "my matches","near me","recently viewed","more matches","invitations","accepted","requests","sent",
                            "contacts","deleted","basic search","advanced search","online now","special cases"];

        
        let menu_url = `${this.SITE_URL}/my-shaadi`;
        
        if(top_nav == undefined)
        {
            throw new Error("Top navigation parameter not specified");
        }

        top_nav = top_nav.toLowerCase();

        if(!top_menu_item.includes(top_nav))
            throw new Error("Top menu -"+ top_nav +"- is not correct. Expected - " + top_menu_item);

        if(sub_nav == undefined)
        {
            if(top_nav == "my shaadi") menu_url = `${this.SITE_URL}/my-shaadi`;
            else if(top_nav == "matches") menu_url = `${this.MY_SHAADI_URL}/profile/daily-recommendations`;
            else if(top_nav == "search") menu_url = `${this.SITE_URL}/search?loc=top-nav`;
            else if(top_nav == "inbox") menu_url = `${this.MY_SHAADI_URL}/inbox/pending/interests`;
            else if(top_nav == "upgrade") menu_url = `${this.SITE_URL}/payment?source=top_navbar_upgrade`;
            else if(top_nav == "logout") menu_url = `${this.SITE_URL}/registration/user/logout`;
            else if(top_nav == "my profile") menu_url = `${this.SITE_URL}/my-shaadi/profile`;
        }
        else
        {
            sub_nav = sub_nav.toLowerCase();

            if(!sub_menu_item.includes(sub_nav))
                throw new Error("sub menu -"+ sub_nav +"- is not correct. Expected - " + sub_menu_item);

            if(top_nav == "my shaadi"){
                switch(sub_nav){
                    case "dashboard": menu_url = `${this.SITE_URL}/my-shaadi`;break;
                    case "my profile": menu_url = `${this.SITE_URL}/my-shaadi/profile`;break;
                    case "add photos": menu_url = `${this.SITE_URL}/my-shaadi/photo/advance/?lnkref=TopNavMenu`;break;
                    case "partner preferences": menu_url = `${this.SITE_URL}/my-shaadi/partner-profile`;break;
                    case "settings": menu_url = `${this.SITE_URL}/my-shaadi/my-account`;break;
                    case "contact details": menu_url = `${this.SITE_URL}/my-shaadi/contact-details?lnkref=TopNavMenu`;break;
                    case "add horoscope details": menu_url = `${this.SITE_URL}/my-shaadi/astro`;break;
                }
            }

            if(top_nav == "matches"){
                switch(sub_nav){
                    case "new matches": menu_url = `${this.MY_SHAADI_URL}/search/new-matches?loc=top-nav`;break;
                    case "today matches": menu_url = `${this.SITE_URL}/profile/daily-recommendations?loc=top-nav&from=menu`;break;
                    case "my matches": menu_url = `${this.MY_SHAADI_URL}/search/partner?loc=top-nav`;break;
                    case "near me": menu_url = `${this.MY_SHAADI_URL}/search/near-me?loc=top-nav`;break;
                    case "recently viewed": menu_url = `${this.MY_SHAADI_URL}/profile/viewed?loc=top-nav`;break;
                    case "more matches": menu_url = `${this.MY_SHAADI_URL}/profile/discovery?loc=top-nav`;break;
                }
            }

            if(top_nav == "search"){
                throw new Error("search sub menus do not have urls");
            }

            if(top_nav == "inbox"){
                switch(sub_nav){
                    case "invitations": menu_url = `${this.MY_SHAADI_URL}/inbox/pending/interests`;break;
                    case "accepted": menu_url = `${this.MY_SHAADI_URL}/inbox/accepted/interests`;break;
                    case "requests": menu_url = `${this.MY_SHAADI_URL}/inbox/pending/requests`;break;
                    case "sent": menu_url = `${this.MY_SHAADI_URL}/inbox/sent/interests`;break;
                    case "contacts": menu_url = `${this.MY_SHAADI_URL}/inbox/contact-summary`;break;
                    case "deleted": menu_url = `${this.MY_SHAADI_URL}/inbox/archived/interests`;break;
                }
            }
        }//big else

        this.browser
        .pause(1000)
        .url(menu_url)
        .pause(1000)
        .useXpath();
    }//Visit_Menu_URL 

    visitMenu(top_nav, sub_nav){

        let top_menu_item = ["my shaadi","matches","search","inbox"];
        let sub_menu_item = ["dashboard","my profile","add photos","partner preferences","new matches","today matches",
                            "my matches","near me","recently viewed","more matches","invitations","accepted","requests","sent",
                            "contacts","deleted","basic search","advanced search","online now","special cases"];

        if(top_nav == undefined)
            throw new Error("Top menu not specified");
        
        top_nav = top_nav.toString().toLowerCase();

        if(!top_menu_item.includes(top_nav))
            throw new Error("Top menu -"+ top_nav +"- is not correct. Expected - " + top_menu_item);

        
        if(sub_nav == undefined)
        {
            this.clickTopMenu(top_nav)
        }
        else if(!sub_menu_item.includes(sub_nav))
        {
            throw new Error("sub menu -"+ sub_nav +"- is not correct. Expected - " + sub_menu_item);
        }
        else
        {
            // Check if the current top menu is same.
            this.browser.url(async (current_url)=> {
                let is_same_top_menu = await this.isSameTopMenu(top_nav, current_url.value);
                if(!is_same_top_menu)
                    this.clickTopMenu(top_nav);

                sub_nav = sub_nav.toString().toLowerCase();
                this.clickSubMenu(sub_nav);
            });
        }
    }//Visit_Menu

    clickTopMenu(menu_item)
    {
        this.browser.url((current_url)=> {
            let selector = "";

            //if on payment page , go tback to home page
            if((current_url.value).includes('/payment'))
                this.visitMenuByURL("my shaadi");

            //selector for menus, when on react page
            let is_React_Page = this.isReactPage(current_url.value);
            if(is_React_Page)
            {
                if(menu_item == "my shaadi") selector = ".randomingClassApr > nav > a:nth-child(1)";
                else if(menu_item == "matches") selector = ".randomingClassApr > nav > a:nth-child(2)";
                else if(menu_item == "search") selector = "div.randomingClassApr > nav > a:nth-child(3)";
                else if(menu_item == "inbox") selector = "div.randomingClassApr > nav > a:nth-child(4)";
            }
            //selector for menus, when on zend page
            else
            {
                if(menu_item == "my shaadi") selector = ".top_navbc > li > a";
                else if(menu_item == "matches") selector = "#daily_mymatches";
                else if(menu_item == "search") selector = "#tour_step2 > li:nth-child(2) > a";
                else if(menu_item == "inbox") selector = "#tour_step3 > li > a";
            }

            console.log("\x1b[42m","click menu item - " + menu_item);
            this.clickMenuItem(selector);
          });

          
    }

    clickMenuItem(selector)
    {
        this.browser
        .pause(1000)
        .useCss()
        .waitForElementVisible(selector,10000)
        .click(selector)
        .pause(8000) // TODO : remove pause and create next page weblelement identifier.
        .useXpath()

    }

    clickSubMenu(sub_menu)
    {
            let selector = "", is_React_Page = false;
            
            this.browser.url((current_url)=> {
                is_React_Page = this.isReactPage(current_url.value)

                if(is_React_Page)
                {
                    // my shaadi
                    if(sub_menu == "dashboard") selector = "#bottomBarNav > div > nav > a:nth-child(1)";
                    else if(sub_menu == "my profile") selector = "#bottomBarNav > div > nav > a:nth-child(2)";
                    else if(sub_menu == "add photos") selector = "#bottomBarNav > div > nav > a:nth-child(3)";
                    else if(sub_menu == "partner preferences") selector = "#bottomBarNav > div > nav > a:nth-child(4)";
                    
                    //matches
                    else if(sub_menu == "new matches") selector = "#bottomBarNav > div > nav > a:nth-child(1)";
                    else if(sub_menu == "today matches") selector = "#bottomBarNav > div > nav > a:nth-child(2)";
                    else if(sub_menu == "my matches") selector = "#bottomBarNav > div > nav > a:nth-child(3)";
                    else if(sub_menu == "near me") selector = "#bottomBarNav > div > nav > a:nth-child(4)";
                    else if(sub_menu == "recently viewed") selector = "#bottomBarNav > div > nav > a:nth-child(5)";
                    else if(sub_menu == "more matches") selector = "#bottomBarNav > div > nav > a:nth-child(6)";

                    //inbox
                    else if(sub_menu == "invitations") selector = "#bottomBarNav > div > nav > a:nth-child(1)";
                    else if(sub_menu == "accepted") selector = "#bottomBarNav > div > nav > a:nth-child(2)";
                    else if(sub_menu == "requests") selector = "#bottomBarNav > div > nav > a:nth-child(3)";
                    else if(sub_menu == "sent") selector = "#bottomBarNav > div > nav > a:nth-child(4)";
                    else if(sub_menu == "contacts") selector = "#bottomBarNav > div > nav > a:nth-child(5)";
                    else if(sub_menu == "deleted") selector = "#bottomBarNav > div > nav > a:nth-child(6)";
                }
                else
                {
                    // my shaadi
                    if(sub_menu == "dashboard") selector = "#subnavabc > ul > li:nth-child(1) > a";
                    else if(sub_menu == "my profile") selector = "#subnavabc > ul > li:nth-child(2) > a";
                    else if(sub_menu == "add photos") selector = "#subnavabc > ul > li:nth-child(3) > a";
                    else if(sub_menu == "partner preferences") selector = "#subnavabc > ul > li:nth-child(4) > a";

                    //search
                    else if(sub_menu == "basic search") selector = "#basic_search_top_nav > a";
                    else if(sub_menu == "advanced search") selector = "#smart_search_top_nav > a";
                    else if(sub_menu == "online now") selector = "#who_is_online_top_nav > a";
                    else if(sub_menu == "special cases") selector = "#special_case_top_nav > a";
                }
            
            console.log("\x1b[42m","click sub-menu item - " + sub_menu);
            this.clickMenuItem(selector);
        });
    }

    isReactPage(url)
    {
        let result = false;
        if((url).includes(this.MY_SHAADI_URL))
            result = true;

        return result;
    }

    isSameTopMenu(top_menu, cur_url)
    {
        const url = require('url');
        let result = false;
        let q = url.parse(cur_url);
        cur_url = q.host + q.pathname;

        if(top_menu == "my shaadi"){
            const myshaadi_sub_menu = [`${this.SITE_URL}/my-shaadi`,
                                        `${this.SITE_URL}/my-shaadi/profile`,
                                        `${this.MY_SHAADI_URL}/my-shaadi/photo`,
                                        `${this.SITE_URL}/my-shaadi/partner-profile`,
                                        `${this.SITE_URL}/my-shaadi/my-account`];
        
            if(myshaadi_sub_menu.some(x => x.includes(cur_url)))
                result = true;
        }
        else if(top_menu == "matches"){
            const matches_sub_menu = [`${this.MY_SHAADI_URL}/profile/daily-recommendations`,
                                        `${this.MY_SHAADI_URL}/search/new-matches`,
                                        `${this.MY_SHAADI_URL}/search/partner`,
                                        `${this.MY_SHAADI_URL}/search/near-me`,
                                        `${this.MY_SHAADI_URL}/profile/discovery`];

            if(matches_sub_menu.some(x => x.includes(cur_url)))
                result = true;

        }
        else if(top_menu == "search"){
            const search_sub_menu = [`${this.SITE_URL}/search?loc=top-nav`];

            if(search_sub_menu.some(x => x.includes(cur_url)))
                result = true;
        }
        else if(top_menu == "inbox"){
            const inbox_sub_menu = [`${this.MY_SHAADI_URL}/inbox/pending/interests`,
                                        `${this.MY_SHAADI_URL}/inbox/accepted/interests`,
                                        `${this.MY_SHAADI_URL}/inbox/pending/requests`,
                                        `${this.MY_SHAADI_URL}/inbox/sent/interests`,
                                        `${this.MY_SHAADI_URL}/inbox/archived/interests`];

            if(inbox_sub_menu.some(x => x.includes(cur_url)))
                result = true;
        }

        return result;
    }

    clickUpgrade()
    {
        let upgrade_link_selector_react = ".randomingClassApr > nav:nth-child(2) > a";
        let upgrade_link_selector = "#tour_step5 > div > a";


        this.browser.url((current_url)=> {

        let is_React_Page = this.isReactPage(current_url.value);
        let selector = "";

        if(is_React_Page)
            selector = upgrade_link_selector_react;
        else
            selector = upgrade_link_selector;

        this.browser
            .useCss()
            .waitForElementVisible(selector,10000)
            .click(selector)
            .useXpath();
        });
    }

    clickLogout()
    {
        
        let login_dropdown_selector = "#profileDropDown";
        let login_link_selector = "#profileDropDown + div > div:nth-child(2) > a:nth-child(6)";

        this.browser
        .useCss()
        .waitForElementVisible(login_dropdown_selector)
        .click(login_dropdown_selector)
        .waitForElementVisible(login_link_selector)
        .click(login_link_selector)
        .useXpath()
        .waitForElementVisible("//*[@class='logout_ic']")
        .click("//*[@class='logout_ic']");
        
        
    }

 

} //class

module.exports = Engagement_Menu;