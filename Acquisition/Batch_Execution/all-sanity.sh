environment="PRD"
test_url="https://my.shaadi.com"
AB="A"

cd ..
cd ..
node nightwatch.js "Acquisition/Tests/Home_login/regression_Invalid_Login.js"
node nightwatch.js "Acquisition/Tests/Reg_Basic_Details/sanity_Email_Pass_Profile.js"
node nightwatch.js "Acquisition/Tests/Complete_Flow/complete_flow_IND.js"
node nightwatch.js "Acquisition/Tests/Complete_Flow/complete_flow_NRI_plus_USA_ROGnegative.js"
node nightwatch.js "Acquisition/Tests/Reg_Location_Marital_Community/regression_malayalee.js"
#ROG
