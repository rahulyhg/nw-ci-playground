environment="PRD"
test_url="https://my.shaadi.com"
AB="A"

cd ..
cd ..
node nightwatch.js "Acquisition/Tests/Education_Career/regression_WorkWith.js"
node nightwatch.js "Acquisition/Tests/Education_Career/regression_edu.js"