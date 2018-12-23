let path = require("path");
class My_Photos {

    constructor(_browser)
    {
        this.browser = _browser;
    }

    clickPhotoAlbumTab()
    {
        let photoAlbumTab_selector = "//span[contains(text(),'Photo Album')]";

        this.browser
        .waitForElementVisible(photoAlbumTab_selector)
        .click(photoAlbumTab_selector);
    }

    clickSettingsTab()
    {
        let setting_tab_selector = "//span[contains(text(),'Settings')]";
        
        this.browser
        .waitForElementVisible(setting_tab_selector)
        .click(setting_tab_selector);
    }

    uploadPhotos(photo_path)
    {
        let file_upload_selector = "//input[@type='file']";

        photo_path = path.resolve(process.cwd() + photo_path);

        this.browser
        .setValue(file_upload_selector, photo_path, (result) => {
            if(result.status !== 0){
                console.log("Error uploading");  
        }
        });

        this.clickContinue_PhotoUpload();
    }

    clickContinue_PhotoUpload()
    {
        let close_button_selector = "//button[@id='close-photo-upload-modal']";
        
        this.browser
        .waitForElementVisible(close_button_selector)
        .pause(5000) // fix it later with getCstyle
        .click(close_button_selector);
    }

    chooseDisplayOption(option)
    {
        let option_selector = "";

        if(option == "Visible to all Members")
            option_selector =  '//span[normalize-space(text())="Visible to all Members"]';
        else if(option == 'Visible to Members I like and to all Premium Members')
            option_selector = '//span[normalize-space(text())="Visible to Members I like and to all Premium Members"]';
        else if(option == 'Only Visible to Members I like')
        {
            option_selector = '//span[normalize-space(text())="Only Visible to Members I like"]';
            
            this.browser
            .waitForElementVisible("//div[@id='more-visible-text']")
            .click("//div[@id='more-visible-text']");
        }
        
        this.browser
        .click(option_selector);
    }

    clickSaveMySettings()
    {
        this.browser
        .click("//div[@id='save-photo-display-setting']")
        .waitForElementVisible('//div[normalize-space(text())="Settings saved"]');
    }

    verifyPhotoPreview(option)
    {
        if(option == "Visible to all Members")
        {
            this.browser
            .waitForElementVisible('//svg:svg');
        }
        else if(option == 'Visible to Members I like and to all Premium Members')
        {
            this.browser
            .waitForElementVisible('//div[normalize-space(text())="Premium Member view"]');
        }
        else if(option == 'Only Visible to Members I like')
        {
            this.browser
            .waitForElementVisible('//div[normalize-space(text())="Visible on Accept"]');
        }
    }
}

module.exports = My_Photos;