environment="PRD"
test_url="https://my.shaadi.com"
AB="A"

cd ..
cd ..
node nightwatch.js "Acquisition/Tests/Reg_Location_Marital_Community/regression_state_city_district_India_cases.js"
node nightwatch.js "Acquisition/Tests/Reg_Location_Marital_Community/regression_malayalee.js"
node nightwatch.js "Acquisition/Tests/Reg_Location_Marital_Community/regression_marital_status.js"
node nightwatch.js "Acquisition/Tests/Reg_Location_Marital_Community/regression_zipcode.js"
node nightwatch.js "Acquisition/Tests/Reg_Location_Marital_Community/community_for_different_religions.js"
