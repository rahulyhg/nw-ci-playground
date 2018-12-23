environment="PRD"
test_url="https://my.shaadi.com"
AB="A"

cd ..
cd ..
#NRI
node nightwatch.js 'Acquisition/Tests/NRI/regression_LivingSince_GrewUp_Res.js'
node nightwatch.js 'Acquisition/Tests/NRI/regression_NRI_plus.js'
node nightwatch.js 'Acquisition/Tests/NRI/regression_UAE_GrewUp_Res.js'