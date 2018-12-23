environment="PRD"
test_url="https://my.shaadi.com"
AB="A"

cd ..
cd ..

node nightwatch.js "Engagement\Tests\Chat\regression_maxMin_alert.js"
node nightwatch.js "Engagement\Tests\Chat\regression_membership_chat.js"
node nightwatch.js "Engagement\Tests\Chat\regression_others.js"