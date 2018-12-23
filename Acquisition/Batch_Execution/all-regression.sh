environment="PRD"
test_url="https://my.shaadi.com"
AB="A"

cd ..
cd ..
node nightwatch.js "Acquisition/Tests/Home_login/regression_Invalid_Login.js"
node nightwatch.js "Acquisition/Tests/Reg_Basic_Details/regression_Email_Pass_Profile.js"

node nightwatch.js "Acquisition/Tests/Reg_Location_Marital_Community/regression_state_city_district_India_cases.js"
node nightwatch.js "Acquisition/Tests/Reg_Location_Marital_Community/regression_malayalee.js"
node nightwatch.js "Acquisition/Tests/Reg_Location_Marital_Community/regression_marital_status.js"
node nightwatch.js "Acquisition/Tests/Reg_Location_Marital_Community/regression_zipcode.js"
node nightwatch.js "Acquisition/Tests/Reg_Location_Marital_Community/community_for_different_religions.js"

node nightwatch.js "Acquisition/Tests/Education_Career/regression_WorkWith.js"
node nightwatch.js "Acquisition/Tests/Education_Career/regression_edu.js"

node nightwatch.js "Acquisition/Tests/Lifestyle_Cases/lifestyle.js"

node nightwatch.js 'Acquisition/Tests/About_YourSelf/regression_about_yourself.js'

#NRI
node nightwatch.js 'Acquisition/Tests/NRI/regression_LivingSince_GrewUp_Res.js'
node nightwatch.js 'Acquisition/Tests/NRI/regression_NRI_plus.js'
node nightwatch.js 'Acquisition/Tests/NRI/regression_UAE_GrewUp_Res.js'

node nightwatch.js 'Acquisition/Tests/Complete_Flow/complete_flow_NRI_plus_USA_ROGnegative.js'
