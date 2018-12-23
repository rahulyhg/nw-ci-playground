let argv = require('yargs').argv;

let config = {
    "environment" : "PRD",  //required for profiles auth
    "test_url" : "https://my.shaadi.com", //required for branch testing
    "AB" : "A", // required for stupid ABs
};

if(argv.shd_env != undefined)
{
    if(argv.shd_env == "PRD" || argv.shd_env == "SANDBOX")
        config.environment = argv.shd_env;
}

if(argv.shd_url != undefined)
{
    if(argv.shd_url == "LOCAL3000") config.test_url = "http://local.shaadi.com:3000";
    if(argv.shd_url == "MY") config.test_url = "http://local.shaadi.com:3000";
    if(argv.shd_url == "STAGE") config.test_url = "http://stage.shaadi.com";
}

if(argv.shd_ab != undefined)
{
    if(argv.shd_ab == "A" || argv.shd_ab == "CUG" || argv.shd_ab == "B")
        config.AB = argv.shd_ab;
}

module.exports = config;