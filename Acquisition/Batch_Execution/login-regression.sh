environment="PRD"
test_url="https://my.shaadi.com"
AB="A"

cd ..
cd ..
node nightwatch.js "Acquisition/Tests/Home_login/regression_Invalid_Login.js"
node nightwatch.js "Acquisition/Tests/Reg_Basic_Details/regression_Email_Pass_Profile.js"