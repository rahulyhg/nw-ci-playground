const Home = require("../../Acquisition/WebPages/Home");
const Home_Login = require("../../Acquisition/WebPages/Home_Login");

class Acquisition_Login {
    
    constructor(_browser)
    {
        this.browser = _browser;
    }
    

    quickLogin(user, pass)
    {
        const home = new Home(this.browser);
        const login = new Home_Login(this.browser);

        home.visitHomePage();
        home.loginClick();        
        login.submitCredentials(user, pass);
    }
} 

module.exports = Acquisition_Login;